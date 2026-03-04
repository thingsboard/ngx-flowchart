import * as i0 from '@angular/core';
import { InjectionToken, Injectable, ViewContainerRef, HostListener, ViewChild, HostBinding, Input, Inject, Component, Directive, EventEmitter, Output, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';

const FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
const FC_NOTE_COMPONENT_CONFIG = new InjectionToken('fc-note.component.config');
const htmlPrefix = 'fc';
const leftConnectorType = 'leftConnector';
const rightConnectorType = 'rightConnector';
const FlowchartConstants = {
    htmlPrefix,
    leftConnectorType,
    rightConnectorType,
    curvedStyle: 'curved',
    lineStyle: 'line',
    dragAnimationRepaint: 'repaint',
    dragAnimationShadow: 'shadow',
    canvasClass: htmlPrefix + '-canvas',
    selectedClass: htmlPrefix + '-selected',
    editClass: htmlPrefix + '-edit',
    activeClass: htmlPrefix + '-active',
    hoverClass: htmlPrefix + '-hover',
    draggingClass: htmlPrefix + '-dragging',
    edgeClass: htmlPrefix + '-edge',
    edgeLabelClass: htmlPrefix + '-edge-label',
    connectorClass: htmlPrefix + '-connector',
    magnetClass: htmlPrefix + '-magnet',
    nodeClass: htmlPrefix + '-node',
    nodeOverlayClass: htmlPrefix + '-node-overlay',
    leftConnectorClass: htmlPrefix + '-' + leftConnectorType + 's',
    rightConnectorClass: htmlPrefix + '-' + rightConnectorType + 's',
    canvasResizeThreshold: 100,
    canvasResizeStep: 100,
    noteClass: htmlPrefix + '-note'
};
class BaseError {
    constructor(...args) {
        Error.apply(this, ...args);
    }
}
Object.defineProperty(BaseError, 'prototype', new Error());
class ModelvalidationError extends BaseError {
    constructor(message) {
        super();
        this.message = message;
    }
}
const fcTopSort = (graph) => {
    const adjacentList = {};
    graph.nodes.forEach((node) => {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    });
    graph.edges.forEach((edge) => {
        const sourceNode = graph.nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.source))[0];
        const destinationNode = graph.nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.destination))[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    });
    const orderedNodes = [];
    const sourceNodes = [];
    for (const node of Object.keys(adjacentList)) {
        const edges = adjacentList[node];
        if (edges.incoming === 0) {
            sourceNodes.push(node);
        }
    }
    while (sourceNodes.length !== 0) {
        const sourceNode = sourceNodes.pop();
        for (let i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
            const destinationNode = adjacentList[sourceNode].outgoing[i];
            adjacentList[destinationNode].incoming--;
            if (adjacentList[destinationNode].incoming === 0) {
                sourceNodes.push(destinationNode);
            }
            adjacentList[sourceNode].outgoing.splice(i, 1);
            i--;
        }
        orderedNodes.push(sourceNode);
    }
    let hasEdges = false;
    for (const node of Object.keys(adjacentList)) {
        const edges = adjacentList[node];
        if (edges.incoming !== 0) {
            hasEdges = true;
        }
    }
    if (hasEdges) {
        return null;
    }
    else {
        return orderedNodes;
    }
};

class AbstractFcModel {
    constructor(modelService) {
        this.modelService = modelService;
    }
    select(object) {
        this.modelService.selectObject(object);
    }
    deselect(object) {
        this.modelService.deselectObject(object);
    }
    toggleSelected(object) {
        this.modelService.toggleSelectedObject(object);
    }
    isSelected(object) {
        return this.modelService.isSelectedObject(object);
    }
    isEdit(object) {
        return this.modelService.isEditObject(object);
    }
}
class ConnectorsModel extends AbstractFcModel {
    constructor(modelService) {
        super(modelService);
    }
    getConnector(connectorId) {
        const model = this.modelService.model;
        for (const node of model.nodes) {
            for (const connector of node.connectors) {
                if (connector.id === connectorId) {
                    return connector;
                }
            }
        }
    }
    getConnectorRectInfo(connectorId) {
        return this.modelService.connectorsRectInfos[connectorId];
    }
    setConnectorRectInfo(connectorId, connectorRectInfo) {
        this.modelService.connectorsRectInfos[connectorId] = connectorRectInfo;
        this.modelService.detectChanges();
    }
    _getCoords(connectorId, centered) {
        const connectorRectInfo = this.getConnectorRectInfo(connectorId);
        const canvas = this.modelService.canvasHtmlElement;
        if (connectorRectInfo === null || connectorRectInfo === undefined || canvas === null) {
            return { x: 0, y: 0 };
        }
        let x = connectorRectInfo.type === FlowchartConstants.leftConnectorType ?
            connectorRectInfo.nodeRectInfo.left() : connectorRectInfo.nodeRectInfo.right();
        let y = connectorRectInfo.nodeRectInfo.top() + connectorRectInfo.nodeRectInfo.height() / 2;
        if (!centered) {
            x -= connectorRectInfo.width / 2;
            y -= connectorRectInfo.height / 2;
        }
        return {
            x: Math.round(x),
            y: Math.round(y)
        };
    }
    getCoords(connectorId) {
        return this._getCoords(connectorId, false);
    }
    getCenteredCoord(connectorId) {
        return this._getCoords(connectorId, true);
    }
}
class NodesModel extends AbstractFcModel {
    constructor(modelService) {
        super(modelService);
    }
    getConnectorsByType(node, type) {
        return node.connectors.filter((connector) => connector.type === type);
    }
    _addConnector(node, connector) {
        node.connectors.push(connector);
        try {
            this.modelService.modelValidation.validateNode(node);
        }
        catch (error) {
            node.connectors.splice(node.connectors.indexOf(connector), 1);
            throw error;
        }
    }
    delete(node) {
        if (this.isSelected(node)) {
            this.deselect(node);
        }
        const model = this.modelService.model;
        const index = model.nodes.indexOf(node);
        if (index === -1) {
            if (node === undefined) {
                throw new Error('Passed undefined');
            }
            throw new Error('Tried to delete not existing node');
        }
        const connectorIds = this.getConnectorIds(node);
        for (let i = 0; i < model.edges.length; i++) {
            const edge = model.edges[i];
            if (connectorIds.indexOf(edge.source) !== -1 || connectorIds.indexOf(edge.destination) !== -1) {
                this.modelService.edges.delete(edge);
                i--;
            }
        }
        model.nodes.splice(index, 1);
        this.modelService.notifyModelChanged();
        this.modelService.nodeRemovedCallback(node);
    }
    getSelectedNodes() {
        const model = this.modelService.model;
        return model.nodes.filter((node) => this.modelService.nodes.isSelected(node));
    }
    handleClicked(node, ctrlKey) {
        if (ctrlKey) {
            this.modelService.nodes.toggleSelected(node);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.nodes.select(node);
        }
    }
    _addNode(node) {
        const model = this.modelService.model;
        try {
            model.nodes.push(node);
            this.modelService.modelValidation.validateNodes(model.nodes);
        }
        catch (error) {
            model.nodes.splice(model.nodes.indexOf(node), 1);
            throw error;
        }
    }
    getConnectorIds(node) {
        return node.connectors.map((connector) => connector.id);
    }
    getNodeByConnectorId(connectorId) {
        const model = this.modelService.model;
        for (const node of model.nodes) {
            const connectorIds = this.getConnectorIds(node);
            if (connectorIds.indexOf(connectorId) > -1) {
                return node;
            }
        }
        return null;
    }
    getHtmlElement(nodeId) {
        return this.modelService.nodesHtmlElements[nodeId];
    }
    setHtmlElement(nodeId, element) {
        this.modelService.nodesHtmlElements[nodeId] = element;
        this.modelService.detectChanges();
    }
}
class EdgesModel extends AbstractFcModel {
    constructor(modelService) {
        super(modelService);
    }
    sourceCoord(edge) {
        return this.modelService.connectors.getCenteredCoord(edge.source);
    }
    destCoord(edge) {
        return this.modelService.connectors.getCenteredCoord(edge.destination);
    }
    delete(edge) {
        const model = this.modelService.model;
        const index = model.edges.indexOf(edge);
        if (index === -1) {
            throw new Error('Tried to delete not existing edge');
        }
        if (this.isSelected(edge)) {
            this.deselect(edge);
        }
        model.edges.splice(index, 1);
        this.modelService.notifyModelChanged();
        this.modelService.edgeRemovedCallback(edge);
    }
    getSelectedEdges() {
        const model = this.modelService.model;
        return model.edges.filter((edge) => this.modelService.edges.isSelected(edge));
    }
    handleEdgeMouseClick(edge, ctrlKey) {
        if (ctrlKey) {
            this.modelService.edges.toggleSelected(edge);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.edges.select(edge);
        }
    }
    putEdge(edge) {
        const model = this.modelService.model;
        model.edges.push(edge);
        this.modelService.notifyModelChanged();
    }
    _addEdge(event, sourceConnector, destConnector, label) {
        this.modelService.modelValidation.validateConnector(sourceConnector);
        this.modelService.modelValidation.validateConnector(destConnector);
        const edge = {};
        edge.source = sourceConnector.id;
        edge.destination = destConnector.id;
        edge.label = label;
        const model = this.modelService.model;
        this.modelService.modelValidation.validateEdges(model.edges.concat([edge]), model.nodes);
        this.modelService.createEdge(event, edge).subscribe((created) => {
            model.edges.push(created);
            this.modelService.notifyModelChanged();
            this.modelService.edgeAddedCallback(created);
        });
    }
}
class NotesModel extends AbstractFcModel {
    constructor(modelService) {
        super(modelService);
    }
    delete(note) {
        if (this.isSelected(note)) {
            this.deselect(note);
        }
        const model = this.modelService.model;
        if (!model.notes) {
            return;
        }
        const index = model.notes.indexOf(note);
        if (index === -1) {
            throw new Error('Tried to delete not existing note');
        }
        model.notes.splice(index, 1);
        this.modelService.notifyModelChanged();
        this.modelService.noteRemovedCallback(note);
    }
    getSelectedNotes() {
        const model = this.modelService.model;
        if (!model.notes) {
            return [];
        }
        return model.notes.filter((note) => this.isSelected(note));
    }
    handleClicked(note, ctrlKey) {
        if (ctrlKey) {
            this.toggleSelected(note);
        }
        else {
            this.modelService.deselectAll();
            this.select(note);
        }
    }
}
class FcModelService {
    constructor(modelValidation, model, modelChanged, detectChangesSubject, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement, noteRemovedCallback) {
        this.connectorsRectInfos = {};
        this.nodesHtmlElements = {};
        this.canvasHtmlElement = null;
        this.dragImage = null;
        this.svgHtmlElement = null;
        this.debouncer = new Subject();
        this.modelValidation = modelValidation;
        this.model = model;
        this.modelChanged = modelChanged;
        this.detectChangesSubject = detectChangesSubject;
        this.canvasHtmlElement = canvasHtmlElement;
        this.svgHtmlElement = svgHtmlElement;
        this.modelValidation.validateModel(this.model);
        this.selectedObjects = selectedObjects;
        this.dropNode = dropNode || (() => { });
        this.createEdge = createEdge || ((event, edge) => of({ ...edge, label: 'label' }));
        this.edgeAddedCallback = edgeAddedCallback || (() => { });
        this.nodeRemovedCallback = nodeRemovedCallback || (() => { });
        this.edgeRemovedCallback = edgeRemovedCallback || (() => { });
        this.noteRemovedCallback = noteRemovedCallback || (() => { });
        this.connectors = new ConnectorsModel(this);
        this.nodes = new NodesModel(this);
        this.edges = new EdgesModel(this);
        this.notes = new NotesModel(this);
        this.debouncer
            .pipe(debounceTime(100))
            .subscribe(() => this.modelChanged.emit());
    }
    notifyModelChanged() {
        this.debouncer.next(null);
    }
    detectChanges() {
        setTimeout(() => {
            this.detectChangesSubject.next(null);
        }, 0);
    }
    selectObject(object) {
        if (this.isEditable()) {
            if (this.selectedObjects.indexOf(object) === -1) {
                this.selectedObjects.push(object);
            }
        }
    }
    deselectObject(object) {
        if (this.isEditable()) {
            const index = this.selectedObjects.indexOf(object);
            if (index === -1) {
                throw new Error('Tried to deselect an unselected object');
            }
            this.selectedObjects.splice(index, 1);
        }
    }
    toggleSelectedObject(object) {
        if (this.isSelectedObject(object)) {
            this.deselectObject(object);
        }
        else {
            this.selectObject(object);
        }
    }
    isSelectedObject(object) {
        return this.selectedObjects.indexOf(object) !== -1;
    }
    selectAll() {
        this.model.nodes.forEach(node => {
            if (!node.readonly) {
                this.nodes.select(node);
            }
        });
        this.model.edges.forEach(edge => {
            this.edges.select(edge);
        });
        if (this.model.notes) {
            this.model.notes.forEach(note => {
                if (!note.readonly) {
                    this.notes.select(note);
                }
            });
        }
        this.detectChanges();
    }
    deselectAll() {
        this.selectedObjects.splice(0, this.selectedObjects.length);
        this.detectChanges();
    }
    isEditObject(object) {
        return this.selectedObjects.length === 1 &&
            this.selectedObjects.indexOf(object) !== -1;
    }
    inRectBox(x, y, rectBox) {
        return x >= rectBox.left && x <= rectBox.right &&
            y >= rectBox.top && y <= rectBox.bottom;
    }
    getItemInfoAtPoint(x, y) {
        return {
            node: this.getNodeAtPoint(x, y),
            edge: this.getEdgeAtPoint(x, y),
            note: this.getNoteAtPoint(x, y)
        };
    }
    getNoteAtPoint(x, y) {
        if (!this.model.notes) {
            return null;
        }
        const canvasBox = this.canvasHtmlElement.getBoundingClientRect();
        for (const note of this.model.notes) {
            const noteLeft = canvasBox.left + note.x;
            const noteTop = canvasBox.top + note.y;
            if (x >= noteLeft && x <= noteLeft + note.width &&
                y >= noteTop && y <= noteTop + note.height) {
                return note;
            }
        }
        return null;
    }
    getNodesInNoteBounds(note) {
        const canvasBox = this.canvasHtmlElement.getBoundingClientRect();
        const noteLeft = canvasBox.left + note.x;
        const noteTop = canvasBox.top + note.y;
        const noteRight = noteLeft + note.width;
        const noteBottom = noteTop + note.height;
        const result = [];
        for (const node of this.model.nodes) {
            if (node.readonly) {
                continue;
            }
            const element = this.nodes.getHtmlElement(node.id);
            if (!element) {
                continue;
            }
            const nodeBox = element.getBoundingClientRect();
            const nodeCenterX = nodeBox.left + nodeBox.width / 2;
            const nodeCenterY = nodeBox.top + nodeBox.height / 2;
            if (nodeCenterX >= noteLeft && nodeCenterX <= noteRight &&
                nodeCenterY >= noteTop && nodeCenterY <= noteBottom) {
                result.push(node);
            }
        }
        return result;
    }
    getNotesInNoteBounds(note) {
        if (!this.model.notes) {
            return [];
        }
        const result = [];
        for (const other of this.model.notes) {
            if (other === note || other.readonly) {
                continue;
            }
            const centerX = other.x + other.width / 2;
            const centerY = other.y + other.height / 2;
            if (centerX >= note.x && centerX <= note.x + note.width &&
                centerY >= note.y && centerY <= note.y + note.height) {
                result.push(other);
            }
        }
        return result;
    }
    getNodeAtPoint(x, y) {
        for (const node of this.model.nodes) {
            const element = this.nodes.getHtmlElement(node.id);
            const nodeElementBox = element.getBoundingClientRect();
            if (x >= nodeElementBox.left && x <= nodeElementBox.right
                && y >= nodeElementBox.top && y <= nodeElementBox.bottom) {
                return node;
            }
        }
        return null;
    }
    getEdgeAtPoint(x, y) {
        const element = document.elementFromPoint(x, y);
        const id = element.id;
        let edgeIndex = -1;
        if (id) {
            if (id.startsWith('fc-edge-path-')) {
                edgeIndex = Number(id.substring('fc-edge-path-'.length));
            }
            else if (id.startsWith('fc-edge-label-')) {
                edgeIndex = Number(id.substring('fc-edge-label-'.length));
            }
        }
        if (edgeIndex > -1) {
            return this.model.edges[edgeIndex];
        }
        return null;
    }
    selectAllInRect(rectBox) {
        this.model.nodes.forEach((value) => {
            const element = this.nodes.getHtmlElement(value.id);
            const nodeElementBox = element.getBoundingClientRect();
            if (!value.readonly) {
                const x = nodeElementBox.left + nodeElementBox.width / 2;
                const y = nodeElementBox.top + nodeElementBox.height / 2;
                if (this.inRectBox(x, y, rectBox)) {
                    this.nodes.select(value);
                }
                else {
                    if (this.nodes.isSelected(value)) {
                        this.nodes.deselect(value);
                    }
                }
            }
        });
        const canvasElementBox = this.canvasHtmlElement.getBoundingClientRect();
        this.model.edges.forEach((value) => {
            const start = this.edges.sourceCoord(value);
            const end = this.edges.destCoord(value);
            const x = (start.x + end.x) / 2 + canvasElementBox.left;
            const y = (start.y + end.y) / 2 + canvasElementBox.top;
            if (this.inRectBox(x, y, rectBox)) {
                this.edges.select(value);
            }
            else {
                if (this.edges.isSelected(value)) {
                    this.edges.deselect(value);
                }
            }
        });
        if (this.model.notes) {
            this.model.notes.forEach((value) => {
                if (!value.readonly) {
                    const x = canvasElementBox.left + value.x + value.width / 2;
                    const y = canvasElementBox.top + value.y + value.height / 2;
                    if (this.inRectBox(x, y, rectBox)) {
                        this.notes.select(value);
                    }
                    else {
                        if (this.notes.isSelected(value)) {
                            this.notes.deselect(value);
                        }
                    }
                }
            });
        }
    }
    deleteSelected() {
        const edgesToDelete = this.edges.getSelectedEdges();
        edgesToDelete.forEach((edge) => {
            this.edges.delete(edge);
        });
        const nodesToDelete = this.nodes.getSelectedNodes();
        nodesToDelete.forEach((node) => {
            this.nodes.delete(node);
        });
        const notesToDelete = this.notes.getSelectedNotes();
        notesToDelete.forEach((note) => {
            this.notes.delete(note);
        });
    }
    isEditable() {
        return this.dropTargetId === undefined;
    }
    isDropSource() {
        return this.dropTargetId !== undefined;
    }
    getDragImage() {
        if (!this.dragImage) {
            this.dragImage = new Image();
            this.dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            this.dragImage.style.visibility = 'hidden';
        }
        return this.dragImage;
    }
}

class FcModelValidationService {
    validateModel(model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    }
    validateNodes(nodes) {
        const ids = [];
        nodes.forEach((node) => {
            this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        });
        const connectorIds = [];
        nodes.forEach((node) => {
            node.connectors.forEach((connector) => {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            });
        });
        return nodes;
    }
    validateNode(node) {
        if (node.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (typeof node.name !== 'string') {
            throw new ModelvalidationError('Name not valid.');
        }
        if (typeof node.x !== 'number' || node.x < 0 || Math.round(node.x) !== node.x) {
            throw new ModelvalidationError('Coordinates not valid.');
        }
        if (typeof node.y !== 'number' || node.y < 0 || Math.round(node.y) !== node.y) {
            throw new ModelvalidationError('Coordinates not valid.');
        }
        if (!Array.isArray(node.connectors)) {
            throw new ModelvalidationError('Connectors not valid.');
        }
        node.connectors.forEach((connector) => {
            this.validateConnector(connector);
        });
        return node;
    }
    _validateEdges(edges, nodes) {
        edges.forEach((edge) => {
            this._validateEdge(edge, nodes);
        });
        edges.forEach((edge1, index1) => {
            edges.forEach((edge2, index2) => {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            });
        });
        if (fcTopSort({ nodes, edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    }
    validateEdges(edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    }
    _validateEdge(edge, nodes) {
        if (edge.source === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        if (edge.destination === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (edge.source === edge.destination) {
            throw new ModelvalidationError('Edge with same source and destination connectors.');
        }
        const sourceNode = nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.source))[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        const destinationNode = nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.destination))[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    }
    validateEdge(edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    }
    validateConnector(connector) {
        if (connector.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
            throw new ModelvalidationError('Type not valid.');
        }
        return connector;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcModelValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcModelValidationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcModelValidationService, decorators: [{
            type: Injectable
        }] });

const regex = /(auto|scroll)/;
const style = (node, prop) => getComputedStyle(node, null).getPropertyValue(prop);
const scroll = (node) => regex.test(style(node, 'overflow') +
    style(node, 'overflow-y') +
    style(node, 'overflow-x'));
const scrollparent = (node) => !node || node === document.body
    ? document.body
    : scroll(node)
        ? node
        : scrollparent(node.parentNode);

const nodeDropScope = {
    dropElement: null
};
class FcNodeDraggingService {
    constructor(modelService, applyFunction, automaticResize, dragAnimation) {
        this.nodeDraggingScope = {
            shadowDragStarted: false,
            dropElement: null,
            draggedNodes: [],
            shadowElements: []
        };
        this.dragOffsets = [];
        this.draggedElements = [];
        this.destinationHtmlElements = [];
        this.oldDisplayStyles = [];
        this.lastScrollLeft = 0;
        this.lastScrollTop = 0;
        this.modelService = modelService;
        this.automaticResize = automaticResize;
        this.dragAnimation = dragAnimation;
        this.applyFunction = applyFunction;
        this.scrollParent = scrollparent(this.modelService.canvasHtmlElement);
    }
    getCoordinate(coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    }
    getXCoordinate(x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    }
    getYCoordinate(y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    }
    compensateScrollDrift() {
        const scrollDx = this.scrollParent.scrollLeft - this.lastScrollLeft;
        const scrollDy = this.scrollParent.scrollTop - this.lastScrollTop;
        if (scrollDx !== 0 || scrollDy !== 0) {
            for (const offset of this.dragOffsets) {
                offset.x += scrollDx;
                offset.y += scrollDy;
            }
            this.lastScrollLeft = this.scrollParent.scrollLeft;
            this.lastScrollTop = this.scrollParent.scrollTop;
        }
    }
    resizeCanvas(draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            const canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    }
    isDraggingNode(node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    }
    dragstart(event, node) {
        if (node.readonly) {
            return;
        }
        this.dragOffsets.length = 0;
        this.draggedElements.length = 0;
        this.nodeDraggingScope.draggedNodes.length = 0;
        this.nodeDraggingScope.shadowElements.length = 0;
        this.destinationHtmlElements.length = 0;
        this.oldDisplayStyles.length = 0;
        const elements = [];
        const nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            const selectedNodes = this.modelService.nodes.getSelectedNodes();
            for (const selectedNode of selectedNodes) {
                const element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
                elements.push(element);
                nodes.push(selectedNode);
            }
        }
        else {
            elements.push($(event.target));
            nodes.push(node);
        }
        const offsetsX = [];
        const offsetsY = [];
        for (const element of elements) {
            offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
            offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
        }
        const originalEvent = event.originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = elements[0][0].cloneNode(true);
            const offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
            const dropNodeInfo = {
                node,
                dropTargetId: this.modelService.dropTargetId,
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            originalEvent.dataTransfer.setData('text', JSON.stringify(dropNodeInfo));
            if (originalEvent.dataTransfer.setDragImage) {
                originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
            }
            else {
                const target = event.target;
                const cloneNode = target.cloneNode(true);
                target.parentNode.insertBefore(cloneNode, target);
                target.style.visibility = 'collapse';
                setTimeout(() => {
                    target.parentNode.removeChild(cloneNode);
                    target.style.visibility = 'visible';
                }, 0);
            }
            return;
        }
        this.lastScrollLeft = this.scrollParent.scrollLeft;
        this.lastScrollTop = this.scrollParent.scrollTop;
        this.nodeDraggingScope.draggedNodes = nodes;
        for (let i = 0; i < elements.length; i++) {
            this.draggedElements.push(elements[i][0]);
            this.dragOffsets.push({
                x: offsetsX[i],
                y: offsetsY[i]
            });
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            for (let i = 0; i < this.draggedElements.length; i++) {
                const dragOffset = this.dragOffsets[i];
                const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                const shadowElement = $(`<div style="position: absolute; opacity: 0.7; ` +
                    `top: ${this.getYCoordinate(dragOffset.y + event.clientY)}px; ` +
                    `left: ${this.getXCoordinate(dragOffset.x + event.clientX)}px; ">` +
                    `<div class="innerNode"><p style="padding: 0 15px;">${draggedNode.name}</p> </div></div>`);
                const targetInnerNode = $(this.draggedElements[i]).children()[0];
                shadowElement.children()[0].style.backgroundColor = targetInnerNode.style.backgroundColor;
                this.nodeDraggingScope.shadowElements.push(shadowElement);
                this.modelService.canvasHtmlElement.appendChild(this.nodeDraggingScope.shadowElements[i][0]);
            }
        }
        originalEvent.dataTransfer.setData('text', 'Just to support firefox');
        if (originalEvent.dataTransfer.setDragImage) {
            originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
        }
        else {
            this.draggedElements.forEach((draggedElement) => {
                const cloneNode = draggedElement.cloneNode(true);
                draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
                draggedElement.style.visibility = 'collapse';
                setTimeout(() => {
                    draggedElement.parentNode.removeChild(cloneNode);
                    draggedElement.style.visibility = 'visible';
                }, 0);
            });
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                for (let i = 0; i < this.draggedElements.length; i++) {
                    this.destinationHtmlElements.push(this.draggedElements[i]);
                    this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                    this.destinationHtmlElements[i].style.display = 'none';
                }
                this.nodeDraggingScope.shadowDragStarted = true;
            }
        }
    }
    drop(event) {
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        let dropNode = null;
        const originalEvent = event.originalEvent || event;
        const infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            let dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { /**/ }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    const offset = $(this.modelService.canvasHtmlElement).offset();
                    const x = event.clientX - offset.left;
                    const y = event.clientY - offset.top;
                    dropNode.x = Math.round(this.getXCoordinate(dropNodeInfo.offsetX + x));
                    dropNode.y = Math.round(this.getYCoordinate(dropNodeInfo.offsetY + y));
                }
            }
        }
        if (dropNode) {
            this.modelService.dropNode(event, dropNode);
            event.preventDefault();
            return false;
        }
        else if (this.nodeDraggingScope.draggedNodes.length) {
            this.compensateScrollDrift();
            return this.applyFunction(() => {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    const dragOffset = this.dragOffsets[i];
                    draggedNode.x = Math.round(this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                this.modelService.notifyModelChanged();
                return false;
            });
        }
    }
    dragover(event) {
        if (nodeDropScope.dropElement) {
            const offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction(() => {
                    this.destinationHtmlElements[0].style.display = this.oldDisplayStyles[0];
                    this.nodeDraggingScope.shadowDragStarted = false;
                });
            }
            event.preventDefault();
            return;
        }
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return;
        }
        if (!this.nodeDraggingScope.draggedNodes.length) {
            event.preventDefault();
            return;
        }
        this.compensateScrollDrift();
        if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                return this.applyFunction(() => {
                    for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                        const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                        const dragOffset = this.dragOffsets[i];
                        draggedNode.x = this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = this.getYCoordinate(dragOffset.y + event.clientY);
                        this.resizeCanvas(draggedNode, this.draggedElements[i]);
                    }
                    event.preventDefault();
                    this.modelService.notifyModelChanged();
                    return false;
                });
            }
        }
        else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                if (this.nodeDraggingScope.shadowDragStarted) {
                    this.applyFunction(() => {
                        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                            this.destinationHtmlElements[i].style.display = this.oldDisplayStyles[i];
                        }
                        this.nodeDraggingScope.shadowDragStarted = false;
                    });
                }
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    const dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    }
    dragend(_event) {
        this.applyFunction(() => {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (this.modelService.isDropSource()) {
                return;
            }
            if (this.nodeDraggingScope.shadowElements.length) {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    const shadowElement = this.nodeDraggingScope.shadowElements[i];
                    draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
                    draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
                    this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
                }
                this.nodeDraggingScope.shadowElements.length = 0;
                this.modelService.notifyModelChanged();
            }
            if (this.nodeDraggingScope.draggedNodes.length) {
                this.nodeDraggingScope.draggedNodes.length = 0;
                this.draggedElements.length = 0;
                this.dragOffsets.length = 0;
            }
        });
    }
}

var NoteDragMode;
(function (NoteDragMode) {
    NoteDragMode["None"] = "none";
    NoteDragMode["Pending"] = "pending";
    NoteDragMode["Move"] = "move";
    NoteDragMode["ResizeN"] = "resize-n";
    NoteDragMode["ResizeNE"] = "resize-ne";
    NoteDragMode["ResizeE"] = "resize-e";
    NoteDragMode["ResizeSE"] = "resize-se";
    NoteDragMode["ResizeS"] = "resize-s";
    NoteDragMode["ResizeSW"] = "resize-sw";
    NoteDragMode["ResizeW"] = "resize-w";
    NoteDragMode["ResizeNW"] = "resize-nw";
})(NoteDragMode || (NoteDragMode = {}));
const NOTE_MIN_WIDTH = 80;
const NOTE_MIN_HEIGHT = 60;
const DRAG_THRESHOLD = 4;
class FcNoteDraggingService {
    constructor(modelService, applyFunction, automaticResize) {
        this.state = {
            mode: NoteDragMode.None,
            pendingNote: null,
            notes: [],
            offsets: [],
            nodes: [],
            nodeOffsets: [],
            resizeNote: null,
            startMouseX: 0,
            startMouseY: 0,
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0
        };
        this.modelService = modelService;
        this.automaticResize = automaticResize;
        this.applyFunction = applyFunction;
        this.scrollParent = scrollparent(this.modelService.canvasHtmlElement);
        this.onMouseMove = this.mousemove.bind(this);
        this.onMouseUp = this.mouseup.bind(this);
    }
    updateScroll(event) {
        const rect = this.scrollParent.getBoundingClientRect();
        const oldScrollLeft = this.scrollParent.scrollLeft;
        const oldScrollTop = this.scrollParent.scrollTop;
        if (event.clientY - rect.top < 25) {
            this.scrollParent.scrollTop -= 25 - (event.clientY - rect.top);
        }
        else if (rect.bottom - event.clientY < 40) {
            this.scrollParent.scrollTop += 40 - (rect.bottom - event.clientY);
        }
        if (event.clientX - rect.left < 25) {
            this.scrollParent.scrollLeft -= 25 - (event.clientX - rect.left);
        }
        else if (rect.right - event.clientX < 40) {
            this.scrollParent.scrollLeft += 40 - (rect.right - event.clientX);
        }
        // Compensate so that notes stay under the cursor after scroll
        const scrollDx = this.scrollParent.scrollLeft - oldScrollLeft;
        const scrollDy = this.scrollParent.scrollTop - oldScrollTop;
        if (scrollDx !== 0 || scrollDy !== 0) {
            for (const offset of this.state.offsets) {
                offset.x += scrollDx;
                offset.y += scrollDy;
            }
            for (const offset of this.state.nodeOffsets) {
                offset.x += scrollDx;
                offset.y += scrollDy;
            }
            // For resize: adjust startMouse so that dx/dy account for the scroll shift
            if (this.state.resizeNote) {
                this.state.startMouseX -= scrollDx;
                this.state.startMouseY -= scrollDy;
            }
        }
    }
    resizeCanvas(note) {
        if (this.automaticResize) {
            const canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < note.x + note.width + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < note.y + note.height + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    }
    isDraggingNote(note) {
        return this.state.mode !== NoteDragMode.None && this.state.mode !== NoteDragMode.Pending &&
            (this.state.notes.includes(note) || this.state.resizeNote === note);
    }
    startMove(event, note) {
        if (note.readonly || this.state.mode !== NoteDragMode.None) {
            return;
        }
        event.stopPropagation();
        // Do not touch selection here — wait for the drag threshold before committing.
        // This avoids a brief flash of magnet nodes being selected when the user just clicks.
        this.state = {
            mode: NoteDragMode.Pending,
            pendingNote: note,
            notes: [],
            offsets: [],
            nodes: [],
            nodeOffsets: [],
            resizeNote: null,
            startMouseX: event.clientX,
            startMouseY: event.clientY,
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0
        };
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    commitMove(event) {
        const note = this.state.pendingNote;
        const notesToMove = [];
        const nodesToMove = [];
        if (this.modelService.notes.isSelected(note)) {
            // Group drag: move exactly what the user selected — no magnet.
            notesToMove.push(...this.modelService.notes.getSelectedNotes());
            nodesToMove.push(...this.modelService.nodes.getSelectedNodes());
        }
        else {
            // Solo drag: deselect everything, then magnet — pick up nodes and nested notes
            // whose center lies within this note's bounds.
            this.modelService.deselectAll();
            this.modelService.notes.select(note);
            notesToMove.push(note);
            const magnetNodes = this.modelService.getNodesInNoteBounds(note);
            magnetNodes.forEach(n => this.modelService.nodes.select(n));
            nodesToMove.push(...magnetNodes);
            const magnetNotes = this.modelService.getNotesInNoteBounds(note);
            magnetNotes.forEach(n => this.modelService.notes.select(n));
            notesToMove.push(...magnetNotes);
        }
        // Offsets encode (canvas_pos - mouse_pos) so that on each mousemove:
        // new_pos = offset + current_mouse = start_pos + delta_mouse
        const offsets = notesToMove.map(n => ({
            x: n.x - event.clientX,
            y: n.y - event.clientY
        }));
        const nodeOffsets = nodesToMove.map(n => ({
            x: n.x - event.clientX,
            y: n.y - event.clientY
        }));
        this.state = {
            ...this.state,
            mode: NoteDragMode.Move,
            pendingNote: null,
            notes: notesToMove,
            offsets,
            nodes: nodesToMove,
            nodeOffsets
        };
    }
    startResize(event, note, mode) {
        if (note.readonly || this.state.mode !== NoteDragMode.None) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this.state = {
            mode,
            pendingNote: null,
            notes: [],
            offsets: [],
            nodes: [],
            nodeOffsets: [],
            resizeNote: note,
            startMouseX: event.clientX,
            startMouseY: event.clientY,
            startX: note.x,
            startY: note.y,
            startWidth: note.width,
            startHeight: note.height
        };
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    mousemove(event) {
        if (this.state.mode === NoteDragMode.Pending) {
            const absDx = Math.abs(event.clientX - this.state.startMouseX);
            const absDy = Math.abs(event.clientY - this.state.startMouseY);
            if (absDx > DRAG_THRESHOLD || absDy > DRAG_THRESHOLD) {
                // Threshold crossed — commit selection and switch to Move.
                // Offsets are computed from this event so the note starts tracking
                // from its current canvas position without any visual jump.
                this.applyFunction(() => this.commitMove(event));
            }
            return;
        }
        this.updateScroll(event);
        this.applyFunction(() => {
            const dx = event.clientX - this.state.startMouseX;
            const dy = event.clientY - this.state.startMouseY;
            if (this.state.mode === NoteDragMode.Move) {
                // Find the max correction needed so no element goes below 0
                let minX = 0;
                let minY = 0;
                for (const offset of this.state.offsets) {
                    minX = Math.min(minX, offset.x + event.clientX);
                    minY = Math.min(minY, offset.y + event.clientY);
                }
                for (const offset of this.state.nodeOffsets) {
                    minX = Math.min(minX, offset.x + event.clientX);
                    minY = Math.min(minY, offset.y + event.clientY);
                }
                const clampedClientX = event.clientX - minX;
                const clampedClientY = event.clientY - minY;
                for (let i = 0; i < this.state.notes.length; i++) {
                    const note = this.state.notes[i];
                    const offset = this.state.offsets[i];
                    note.x = Math.round(offset.x + clampedClientX);
                    note.y = Math.round(offset.y + clampedClientY);
                    this.resizeCanvas(note);
                }
                for (let i = 0; i < this.state.nodes.length; i++) {
                    const node = this.state.nodes[i];
                    const offset = this.state.nodeOffsets[i];
                    node.x = Math.round(offset.x + clampedClientX);
                    node.y = Math.round(offset.y + clampedClientY);
                }
            }
            else if (this.state.resizeNote) {
                const note = this.state.resizeNote;
                const mode = this.state.mode;
                // Horizontal component
                const resizesE = mode === NoteDragMode.ResizeE || mode === NoteDragMode.ResizeSE || mode === NoteDragMode.ResizeNE;
                const resizesW = mode === NoteDragMode.ResizeW || mode === NoteDragMode.ResizeSW || mode === NoteDragMode.ResizeNW;
                // Vertical component
                const resizesS = mode === NoteDragMode.ResizeS || mode === NoteDragMode.ResizeSE || mode === NoteDragMode.ResizeSW;
                const resizesN = mode === NoteDragMode.ResizeN || mode === NoteDragMode.ResizeNE || mode === NoteDragMode.ResizeNW;
                if (resizesE) {
                    note.width = Math.max(NOTE_MIN_WIDTH, Math.round(this.state.startWidth + dx));
                }
                if (resizesW) {
                    const rightEdge = this.state.startX + this.state.startWidth;
                    note.x = Math.max(0, Math.round(Math.min(rightEdge - NOTE_MIN_WIDTH, this.state.startX + dx)));
                    note.width = rightEdge - note.x;
                }
                if (resizesS) {
                    note.height = Math.max(NOTE_MIN_HEIGHT, Math.round(this.state.startHeight + dy));
                }
                if (resizesN) {
                    const bottomEdge = this.state.startY + this.state.startHeight;
                    note.y = Math.max(0, Math.round(Math.min(bottomEdge - NOTE_MIN_HEIGHT, this.state.startY + dy)));
                    note.height = bottomEdge - note.y;
                }
                this.resizeCanvas(note);
            }
        });
    }
    mouseup(_event) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.applyFunction(() => {
            if (this.state.mode !== NoteDragMode.Pending) {
                this.modelService.notifyModelChanged();
            }
            this.state.mode = NoteDragMode.None;
            this.state.pendingNote = null;
            this.state.notes = [];
            this.state.offsets = [];
            this.state.nodes = [];
            this.state.nodeOffsets = [];
            this.state.resizeNote = null;
        });
    }
}

class FcEdgeDrawingService {
    getEdgeDAttribute(pt1, pt2, style) {
        let dAddribute = `M ${pt1.x}, ${pt1.y} `;
        if (style === FlowchartConstants.curvedStyle) {
            const sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            const destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += `C ${sourceTangent.x}, ${sourceTangent.y} ${(destinationTangent.x - 50)}, ${destinationTangent.y} ${pt2.x}, ${pt2.y}`;
        }
        else {
            dAddribute += `L ${pt2.x}, ${pt2.y}`;
        }
        return dAddribute;
    }
    getEdgeCenter(pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    }
    computeEdgeTangentOffset(pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    }
    computeEdgeSourceTangent(pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
    computeEdgeDestinationTangent(pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcEdgeDrawingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcEdgeDrawingService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcEdgeDrawingService, decorators: [{
            type: Injectable
        }] });

class FcEdgeDraggingService {
    constructor(modelValidation, edgeDrawingService, modelService, model, isValidEdgeCallback, applyFunction, dragAnimation, edgeStyle) {
        this.edgeDragging = {
            isDragging: false,
            dragPoint1: null,
            dragPoint2: null,
            shadowDragStarted: false
        };
        this.draggedEdgeSource = null;
        this.dragOffset = {};
        this.destinationHtmlElement = null;
        this.oldDisplayStyle = '';
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.modelService = modelService;
        this.model = model;
        this.isValidEdgeCallback = isValidEdgeCallback || (() => true);
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    dragstart(event, connector) {
        let swapConnector;
        let dragLabel;
        let prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            for (const edge of this.model.edges) {
                if (edge.destination === connector.id) {
                    swapConnector = this.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this.applyFunction(() => {
                        this.modelService.edges.delete(edge);
                    });
                    break;
                }
            }
        }
        this.edgeDragging.isDragging = true;
        if (swapConnector !== undefined) {
            this.draggedEdgeSource = swapConnector;
            this.edgeDragging.dragPoint1 = this.modelService.connectors.getCenteredCoord(swapConnector.id);
            this.edgeDragging.dragLabel = dragLabel;
            this.edgeDragging.prevEdge = prevEdge;
        }
        else {
            this.draggedEdgeSource = connector;
            this.edgeDragging.dragPoint1 = this.modelService.connectors.getCenteredCoord(connector.id);
        }
        const canvas = this.modelService.canvasHtmlElement;
        if (!canvas) {
            throw new Error('No canvas while edgedraggingService found.');
        }
        const canvasBox = canvas.getBoundingClientRect();
        this.dragOffset.x = -canvasBox.left;
        this.dragOffset.y = -canvasBox.top;
        this.edgeDragging.dragPoint2 = {
            x: event.clientX + this.dragOffset.x,
            y: event.clientY + this.dragOffset.y
        };
        const originalEvent = event.originalEvent || event;
        originalEvent.dataTransfer.setData('Text', 'Just to support firefox');
        if (originalEvent.dataTransfer.setDragImage) {
            originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
        }
        else {
            this.destinationHtmlElement = event.target;
            this.oldDisplayStyle = this.destinationHtmlElement.style.display;
            this.destinationHtmlElement.style.display = 'none';
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                this.edgeDragging.shadowDragStarted = true;
            }
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.edgeDragging.gElement === undefined) {
                this.edgeDragging.gElement = $(document.querySelectorAll('.shadow-svg-class'));
                this.edgeDragging.pathElement = $(document.querySelectorAll('.shadow-svg-class')).find('path');
                this.edgeDragging.circleElement = $(document.querySelectorAll('.shadow-svg-class')).find('circle');
            }
            this.edgeDragging.gElement.css('display', 'block');
            this.edgeDragging.pathElement.attr('d', this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
            this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
            this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
        }
        event.stopPropagation();
    }
    dragover(event) {
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction(() => {
                        this.edgeDragging.shadowDragStarted = false;
                    });
                }
                this.edgeDragging.dragPoint2 = {
                    x: event.clientX + this.dragOffset.x,
                    y: event.clientY + this.dragOffset.y
                };
                this.edgeDragging.pathElement.attr('d', this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
                this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
                this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
            }
            else if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
                return this.applyFunction(() => {
                    if (this.destinationHtmlElement !== null) {
                        this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                    }
                    this.edgeDragging.dragPoint2 = {
                        x: event.clientX + this.dragOffset.x,
                        y: event.clientY + this.dragOffset.y
                    };
                });
            }
        }
    }
    dragoverConnector(event, connector) {
        if (this.edgeDragging.isDragging) {
            this.dragover(event);
            try {
                this.modelValidation.validateEdges(this.model.edges.concat([{
                        source: this.draggedEdgeSource.id,
                        destination: connector.id
                    }]), this.model.nodes);
            }
            catch (error) {
                if (error instanceof ModelvalidationError) {
                    return true;
                }
                else {
                    throw error;
                }
            }
            if (this.isValidEdgeCallback(this.draggedEdgeSource, connector)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }
    }
    dragleaveMagnet(_event) {
        this.edgeDragging.magnetActive = false;
    }
    dragoverMagnet(event, connector) {
        if (this.edgeDragging.isDragging) {
            this.dragover(event);
            try {
                this.modelValidation.validateEdges(this.model.edges.concat([{
                        source: this.draggedEdgeSource.id,
                        destination: connector.id
                    }]), this.model.nodes);
            }
            catch (error) {
                if (error instanceof ModelvalidationError) {
                    return true;
                }
                else {
                    throw error;
                }
            }
            if (this.isValidEdgeCallback(this.draggedEdgeSource, connector)) {
                if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                    this.edgeDragging.magnetActive = true;
                    this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
                    this.edgeDragging.pathElement.attr('d', this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
                    this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
                    this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                else if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
                    return this.applyFunction(() => {
                        this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    });
                }
            }
        }
    }
    dragend(event) {
        if (this.edgeDragging.isDragging) {
            this.edgeDragging.isDragging = false;
            this.edgeDragging.dragPoint1 = null;
            this.edgeDragging.dragPoint2 = null;
            this.edgeDragging.dragLabel = null;
            event.stopPropagation();
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                this.edgeDragging.gElement.css('display', 'none');
            }
            if (this.edgeDragging.prevEdge) {
                const edge = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction(() => {
                    this.modelService.edges.putEdge(edge);
                });
            }
        }
    }
    drop(event, targetConnector) {
        if (this.edgeDragging.isDragging) {
            try {
                this.modelValidation.validateEdges(this.model.edges.concat([{
                        source: this.draggedEdgeSource.id,
                        destination: targetConnector.id
                    }]), this.model.nodes);
            }
            catch (error) {
                if (error instanceof ModelvalidationError) {
                    return true;
                }
                else {
                    throw error;
                }
            }
            if (this.isValidEdgeCallback(this.draggedEdgeSource, targetConnector)) {
                this.edgeDragging.prevEdge = null;
                this.modelService.edges._addEdge(event, this.draggedEdgeSource, targetConnector, this.edgeDragging.dragLabel);
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    }
}

class FcMouseOverService {
    constructor(applyFunction) {
        this.mouseoverscope = {
            connector: null,
            edge: null,
            node: null
        };
        this.applyFunction = applyFunction;
    }
    nodeMouseOver(_event, node) {
        return this.applyFunction(() => {
            this.mouseoverscope.node = node;
        });
    }
    nodeMouseOut(_event, _node) {
        return this.applyFunction(() => {
            this.mouseoverscope.node = null;
        });
    }
    connectorMouseEnter(_event, connector) {
        return this.applyFunction(() => {
            this.mouseoverscope.connector = connector;
        });
    }
    connectorMouseLeave(_event, _connector) {
        return this.applyFunction(() => {
            this.mouseoverscope.connector = null;
        });
    }
    edgeMouseEnter(_event, edge) {
        this.mouseoverscope.edge = edge;
    }
    edgeMouseLeave(_event, _edge) {
        this.mouseoverscope.edge = null;
    }
}

class FcRectangleSelectService {
    constructor(modelService, selectElement, applyFunction) {
        this.selectRect = {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        };
        this.modelService = modelService;
        this.selectElement = selectElement;
        this.$canvasElement = $(this.modelService.canvasHtmlElement);
        this.$scrollParent = $(scrollparent(this.modelService.canvasHtmlElement));
        this.applyFunction = applyFunction;
    }
    mousedown(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && this.selectElement.hidden) {
            this.selectElement.hidden = false;
            const offset = this.$canvasElement.offset();
            this.selectRect.x1 = Math.round(e.pageX - offset.left);
            this.selectRect.y1 = Math.round(e.pageY - offset.top);
            this.selectRect.x2 = this.selectRect.x1;
            this.selectRect.y2 = this.selectRect.y1;
            this.updateSelectRect();
        }
    }
    mousemove(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            const offset = this.$canvasElement.offset();
            this.selectRect.x2 = Math.round(e.pageX - offset.left);
            this.selectRect.y2 = Math.round(e.pageY - offset.top);
            this.updateScroll(offset);
            this.updateSelectRect();
        }
    }
    updateScroll(offset) {
        const rect = this.$scrollParent[0].getBoundingClientRect();
        const bottom = rect.bottom - offset.top;
        const right = rect.right - offset.left;
        const top = rect.top - offset.top;
        const left = rect.left - offset.left;
        if (this.selectRect.y2 - top < 25) {
            const topScroll = 25 - (this.selectRect.y2 - top);
            const scroll = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll - topScroll);
        }
        else if (bottom - this.selectRect.y2 < 40) {
            const bottomScroll = 40 - (bottom - this.selectRect.y2);
            const scroll = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll + bottomScroll);
        }
        if (this.selectRect.x2 - left < 25) {
            const leftScroll = 25 - (this.selectRect.x2 - left);
            const scroll = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll - leftScroll);
        }
        else if (right - this.selectRect.x2 < 40) {
            const rightScroll = 40 - (right - this.selectRect.x2);
            const scroll = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll + rightScroll);
        }
    }
    mouseup(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            const rectBox = this.selectElement.getBoundingClientRect();
            this.selectElement.hidden = true;
            this.selectObjects(rectBox);
        }
    }
    updateSelectRect() {
        const x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
        const x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
        const y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
        const y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
        this.selectElement.style.left = x3 + 'px';
        this.selectElement.style.top = y3 + 'px';
        this.selectElement.style.width = x4 - x3 + 'px';
        this.selectElement.style.height = y4 - y3 + 'px';
    }
    selectObjects(rectBox) {
        this.applyFunction(() => {
            this.modelService.selectAllInRect(rectBox);
        });
    }
}

class FcNodeContainerComponent {
    get nodeId() {
        return this.node.id;
    }
    get top() {
        return this.node.y + 'px';
    }
    get left() {
        return this.node.x + 'px';
    }
    constructor(nodeComponentConfig, elementRef) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (() => { });
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (() => { });
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (() => { });
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (() => { });
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (() => { });
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        const componentRef = this.nodeContentContainer.createComponent(this.nodeComponentConfig.nodeComponentType);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    }
    ngAfterViewInit() {
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    }
    ngOnChanges(changes) {
        let updateNode = false;
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            if (!change.firstChange && change.currentValue !== change.previousValue) {
                if (['selected', 'edit', 'underMouse', 'mouseOverConnector', 'dragging'].includes(propName)) {
                    updateNode = true;
                }
            }
        }
        if (updateNode) {
            this.updateNodeClass();
            this.updateNodeComponent();
        }
    }
    updateNodeClass() {
        const element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    }
    updateNodeComponent() {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    }
    toggleClass(element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    }
    mousedown(event) {
        event.stopPropagation();
    }
    dragstart(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    }
    dragend(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    }
    click(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    }
    mouseover(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    }
    mouseout(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNodeContainerComponent, deps: [{ token: FC_NODE_COMPONENT_CONFIG }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.17", type: FcNodeContainerComponent, isStandalone: false, selector: "fc-node", inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, host: { listeners: { "mousedown": "mousedown($event)", "dragstart": "dragstart($event)", "dragend": "dragend($event)", "click": "click($event)", "mouseover": "mouseover($event)", "mouseout": "mouseout($event)" }, properties: { "attr.id": "this.nodeId", "style.top": "this.top", "style.left": "this.left" } }, viewQueries: [{ propertyName: "nodeContentContainer", first: true, predicate: ["nodeContent"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-template #nodeContent></ng-template>', isInline: true, styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNodeContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-node', template: '<ng-template #nodeContent></ng-template>', standalone: false, styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FC_NODE_COMPONENT_CONFIG]
                }] }, { type: i0.ElementRef }], propDecorators: { callbacks: [{
                type: Input
            }], userNodeCallbacks: [{
                type: Input
            }], node: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], underMouse: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], dragging: [{
                type: Input
            }], nodeId: [{
                type: HostBinding,
                args: ['attr.id']
            }], top: [{
                type: HostBinding,
                args: ['style.top']
            }], left: [{
                type: HostBinding,
                args: ['style.left']
            }], nodeContentContainer: [{
                type: ViewChild,
                args: ['nodeContent', { read: ViewContainerRef, static: true }]
            }], mousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], dragstart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }], click: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], mouseover: [{
                type: HostListener,
                args: ['mouseover', ['$event']]
            }], mouseout: [{
                type: HostListener,
                args: ['mouseout', ['$event']]
            }] } });
class FcNodeComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: () => this.node.y,
            left: () => this.node.x,
            bottom: () => this.node.y + this.height,
            right: () => this.node.x + this.width,
            width: () => this.width,
            height: () => this.height
        };
    }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: FcNodeComponent, isStandalone: true, inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNodeComponent, decorators: [{
            type: Directive
        }], propDecorators: { callbacks: [{
                type: Input
            }], userNodeCallbacks: [{
                type: Input
            }], node: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], underMouse: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], dragging: [{
                type: Input
            }] } });

class FcNoteContainerComponent {
    get noteId() { return this.note.id; }
    get top() { return this.note.y + 'px'; }
    get left() { return this.note.x + 'px'; }
    get width() { return this.note.width + 'px'; }
    get height() { return this.note.height + 'px'; }
    constructor(noteComponentConfig, elementRef) {
        this.noteComponentConfig = noteComponentConfig;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!this.userNoteCallbacks) {
            this.userNoteCallbacks = {};
        }
        this.userNoteCallbacks.noteEdit = this.userNoteCallbacks.noteEdit || (() => { });
        this.userNoteCallbacks.doubleClick = this.userNoteCallbacks.doubleClick || (() => { });
        this.userNoteCallbacks.mouseEnter = this.userNoteCallbacks.mouseEnter || (() => { });
        this.userNoteCallbacks.mouseLeave = this.userNoteCallbacks.mouseLeave || (() => { });
        const element = this.elementRef.nativeElement;
        element.classList.add(FlowchartConstants.noteClass);
        this.updateNoteClass();
        this.noteContentContainer.clear();
        const componentRef = this.noteContentContainer.createComponent(this.noteComponentConfig.noteComponentType);
        this.noteComponent = componentRef.instance;
        this.noteComponent.note = this.note;
        this.noteComponent.modelservice = this.modelservice;
        this.noteComponent.userNoteCallbacks = this.userNoteCallbacks;
        this.updateNoteComponent();
    }
    ngAfterViewInit() { }
    ngOnChanges(changes) {
        let update = false;
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            if (!change.firstChange && change.currentValue !== change.previousValue) {
                if (['selected', 'edit', 'dragging'].includes(propName)) {
                    update = true;
                }
            }
        }
        if (update) {
            this.updateNoteClass();
            this.updateNoteComponent();
        }
    }
    updateNoteClass() {
        const el = this.elementRef.nativeElement;
        this.toggleClass(el, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(el, FlowchartConstants.editClass, this.edit);
        this.toggleClass(el, FlowchartConstants.draggingClass, this.dragging);
    }
    updateNoteComponent() {
        if (!this.noteComponent) {
            return;
        }
        this.noteComponent.selected = this.selected;
        this.noteComponent.edit = this.edit;
    }
    toggleClass(el, clazz, set) {
        if (set) {
            el.classList.add(clazz);
        }
        else {
            el.classList.remove(clazz);
        }
    }
    mousedown(event) {
        if (!this.note.readonly && this.modelservice.isEditable()) {
            if (event.target.closest('.fc-note-resize-handle')) {
                return;
            }
            event.stopPropagation();
            this.noteDraggingService.startMove(event, this.note);
        }
    }
    click(event) {
        if (!this.note.readonly) {
            this.modelservice.notes.handleClicked(this.note, event.ctrlKey);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    mouseenter(event) {
        if (!this.note.readonly && this.userNoteCallbacks) {
            this.userNoteCallbacks.mouseEnter(event, this.note);
        }
    }
    mouseleave(event) {
        if (!this.note.readonly && this.userNoteCallbacks) {
            this.userNoteCallbacks.mouseLeave(event, this.note);
        }
    }
    startResize(event, mode) {
        if (!this.note.readonly && this.modelservice.isEditable()) {
            this.noteDraggingService.startResize(event, this.note, mode);
        }
    }
    get noteDragMode() {
        return NoteDragMode;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNoteContainerComponent, deps: [{ token: FC_NOTE_COMPONENT_CONFIG }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.17", type: FcNoteContainerComponent, isStandalone: false, selector: "fc-note", inputs: { note: "note", modelservice: "modelservice", noteDraggingService: "noteDraggingService", userNoteCallbacks: "userNoteCallbacks", selected: "selected", edit: "edit", dragging: "dragging" }, host: { listeners: { "mousedown": "mousedown($event)", "click": "click($event)", "mouseenter": "mouseenter($event)", "mouseleave": "mouseleave($event)" }, properties: { "attr.id": "this.noteId", "style.top": "this.top", "style.left": "this.left", "style.width": "this.width", "style.height": "this.height" } }, viewQueries: [{ propertyName: "noteContentContainer", first: true, predicate: ["noteContent"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"fc-note-content-wrapper\">\n  <ng-template #noteContent></ng-template>\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-h fc-note-resize-n\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeN)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-ne\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeNE)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-v fc-note-resize-e\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeE)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-se\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeSE)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-h fc-note-resize-s\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeS)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-sw\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeSW)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-v fc-note-resize-w\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeW)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-nw\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeNW)\">\n</div>\n", styles: [":host{position:absolute;z-index:0;box-sizing:border-box;display:block;cursor:move;-webkit-user-select:none;user-select:none}:host.fc-dragging{opacity:.85}:host.fc-selected{box-shadow:0 0 0 3px #00000059}:host .fc-note-content-wrapper{position:relative;z-index:0;width:100%;height:100%}:host .fc-note-resize-handle{position:absolute;z-index:10}:host .fc-note-resize-corner{width:14px;height:14px}:host .fc-note-resize-edge-h{left:14px;right:14px;height:8px}:host .fc-note-resize-edge-v{top:14px;bottom:14px;width:8px}:host .fc-note-resize-nw{top:0;left:0;cursor:nw-resize}:host .fc-note-resize-ne{top:0;right:0;cursor:ne-resize}:host .fc-note-resize-se{bottom:0;right:0;cursor:se-resize}:host .fc-note-resize-sw{bottom:0;left:0;cursor:sw-resize}:host .fc-note-resize-n{top:0;cursor:n-resize}:host .fc-note-resize-s{bottom:0;cursor:s-resize}:host .fc-note-resize-e{right:0;cursor:e-resize}:host .fc-note-resize-w{left:0;cursor:w-resize}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNoteContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-note', standalone: false, template: "<div class=\"fc-note-content-wrapper\">\n  <ng-template #noteContent></ng-template>\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-h fc-note-resize-n\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeN)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-ne\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeNE)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-v fc-note-resize-e\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeE)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-se\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeSE)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-h fc-note-resize-s\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeS)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-sw\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeSW)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-edge-v fc-note-resize-w\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeW)\">\n</div>\n<div class=\"fc-note-resize-handle fc-note-resize-corner fc-note-resize-nw\"\n     (mousedown)=\"startResize($event, noteDragMode.ResizeNW)\">\n</div>\n", styles: [":host{position:absolute;z-index:0;box-sizing:border-box;display:block;cursor:move;-webkit-user-select:none;user-select:none}:host.fc-dragging{opacity:.85}:host.fc-selected{box-shadow:0 0 0 3px #00000059}:host .fc-note-content-wrapper{position:relative;z-index:0;width:100%;height:100%}:host .fc-note-resize-handle{position:absolute;z-index:10}:host .fc-note-resize-corner{width:14px;height:14px}:host .fc-note-resize-edge-h{left:14px;right:14px;height:8px}:host .fc-note-resize-edge-v{top:14px;bottom:14px;width:8px}:host .fc-note-resize-nw{top:0;left:0;cursor:nw-resize}:host .fc-note-resize-ne{top:0;right:0;cursor:ne-resize}:host .fc-note-resize-se{bottom:0;right:0;cursor:se-resize}:host .fc-note-resize-sw{bottom:0;left:0;cursor:sw-resize}:host .fc-note-resize-n{top:0;cursor:n-resize}:host .fc-note-resize-s{bottom:0;cursor:s-resize}:host .fc-note-resize-e{right:0;cursor:e-resize}:host .fc-note-resize-w{left:0;cursor:w-resize}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FC_NOTE_COMPONENT_CONFIG]
                }] }, { type: i0.ElementRef }], propDecorators: { note: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], noteDraggingService: [{
                type: Input
            }], userNoteCallbacks: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], dragging: [{
                type: Input
            }], noteContentContainer: [{
                type: ViewChild,
                args: ['noteContent', { read: ViewContainerRef, static: true }]
            }], noteId: [{
                type: HostBinding,
                args: ['attr.id']
            }], top: [{
                type: HostBinding,
                args: ['style.top']
            }], left: [{
                type: HostBinding,
                args: ['style.left']
            }], width: [{
                type: HostBinding,
                args: ['style.width']
            }], height: [{
                type: HostBinding,
                args: ['style.height']
            }], mousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], click: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], mouseenter: [{
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }], mouseleave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }] } });
class FcNoteComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
    }
    ngOnInit() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNoteComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: FcNoteComponent, isStandalone: true, inputs: { note: "note", selected: "selected", edit: "edit", modelservice: "modelservice", userNoteCallbacks: "userNoteCallbacks" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcNoteComponent, decorators: [{
            type: Directive
        }], propDecorators: { note: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], userNoteCallbacks: [{
                type: Input
            }] } });

class NgxFlowchartComponent {
    get canvasClass() {
        return FlowchartConstants.canvasClass;
    }
    get fitModelSizeByDefault() {
        return this.fitModelSizeByDefaultValue;
    }
    set fitModelSizeByDefault(value) {
        this.fitModelSizeByDefaultValue = coerceBooleanProperty(value);
    }
    constructor(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.modelChanged = new EventEmitter();
        this.fitModelSizeByDefaultValue = true;
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create((_index, item) => item);
        this.edgesDiffer = this.differs.find([]).create((_index, item) => item);
        this.notesDiffer = this.differs.find([]).create((_index, item) => item);
        this.detectChangesSubject = new Subject();
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
        this.detectChangesSubject
            .pipe(debounceTime(50))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnInit() {
        if (!this.dropTargetId && this.edgeStyle !== FlowchartConstants.curvedStyle && this.edgeStyle !== FlowchartConstants.lineStyle) {
            throw new Error('edgeStyle not supported.');
        }
        this.nodeHeight = this.nodeHeight || 200;
        this.nodeWidth = this.nodeWidth || 200;
        this.dragAnimation = this.dragAnimation || FlowchartConstants.dragAnimationRepaint;
        this.userCallbacks = this.userCallbacks || {};
        this.automaticResize = this.automaticResize || false;
        for (const key of Object.keys(this.userCallbacks)) {
            const callback = this.userCallbacks[key];
            if (typeof callback !== 'function' && key !== 'nodeCallbacks' && key !== 'noteCallbacks') {
                throw new Error('All callbacks should be functions.');
            }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        this.userNoteCallbacks = this.userCallbacks.noteCallbacks || {};
        const element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.detectChangesSubject, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'), this.userCallbacks.noteRemoved);
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        const applyFunction = this.zone.run.bind(this.zone);
        this.nodeDraggingService = new FcNodeDraggingService(this.modelService, applyFunction, this.automaticResize, this.dragAnimation);
        this.noteDraggingService = new FcNoteDraggingService(this.modelService, applyFunction, this.automaticResize);
        this.edgeDraggingService = new FcEdgeDraggingService(this.modelValidation, this.edgeDrawingService, this.modelService, this.model, this.userCallbacks.isValidEdge || null, applyFunction, this.dragAnimation, this.edgeStyle);
        this.mouseoverService = new FcMouseOverService(applyFunction);
        this.rectangleSelectService = new FcRectangleSelectService(this.modelService, element[0].querySelector('#select-rectangle'), applyFunction);
        this.callbacks = {
            nodeDragstart: this.nodeDraggingService.dragstart.bind(this.nodeDraggingService),
            nodeDragend: this.nodeDraggingService.dragend.bind(this.nodeDraggingService),
            edgeDragstart: this.edgeDraggingService.dragstart.bind(this.edgeDraggingService),
            edgeDragend: this.edgeDraggingService.dragend.bind(this.edgeDraggingService),
            edgeDrop: this.edgeDraggingService.drop.bind(this.edgeDraggingService),
            edgeDragoverConnector: this.edgeDraggingService.dragoverConnector.bind(this.edgeDraggingService),
            edgeDragoverMagnet: this.edgeDraggingService.dragoverMagnet.bind(this.edgeDraggingService),
            edgeDragleaveMagnet: this.edgeDraggingService.dragleaveMagnet.bind(this.edgeDraggingService),
            nodeMouseOver: this.mouseoverService.nodeMouseOver.bind(this.mouseoverService),
            nodeMouseOut: this.mouseoverService.nodeMouseOut.bind(this.mouseoverService),
            connectorMouseEnter: this.mouseoverService.connectorMouseEnter.bind(this.mouseoverService),
            connectorMouseLeave: this.mouseoverService.connectorMouseLeave.bind(this.mouseoverService),
            nodeClicked: (event, node) => {
                this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            }
        };
        this.adjustCanvasSize(this.fitModelSizeByDefault);
    }
    ngDoCheck() {
        if (this.model) {
            const nodesChange = this.nodesDiffer.diff(this.model.nodes);
            const edgesChange = this.edgesDiffer.diff(this.model.edges);
            const notesChange = this.notesDiffer.diff(this.model.notes || []);
            let nodesChanged = false;
            let edgesChanged = false;
            let notesChanged = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem(() => {
                    nodesChanged = true;
                });
                nodesChange.forEachRemovedItem(() => {
                    nodesChanged = true;
                });
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem(() => {
                    edgesChanged = true;
                });
                edgesChange.forEachRemovedItem(() => {
                    edgesChanged = true;
                });
            }
            if (notesChange !== null) {
                notesChange.forEachAddedItem(() => {
                    notesChanged = true;
                });
                notesChange.forEachRemovedItem(() => {
                    notesChanged = true;
                });
            }
            if (nodesChanged || notesChanged) {
                this.adjustCanvasSize(this.fitModelSizeByDefault);
            }
            if (nodesChanged || edgesChanged || notesChanged) {
                this.detectChangesSubject.next(null);
            }
        }
    }
    getEdgeDAttribute(edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    }
    adjustCanvasSize(fit) {
        let maxX = 0;
        let maxY = 0;
        const element = $(this.elementRef.nativeElement);
        const padding = this.dropTargetId ? 0 : FlowchartConstants.canvasResizeThreshold;
        this.model.nodes.forEach((node) => {
            maxX = Math.max(node.x + this.nodeWidth + padding, maxX);
            maxY = Math.max(node.y + this.nodeHeight + padding, maxY);
        });
        if (this.model.notes) {
            this.model.notes.forEach((note) => {
                maxX = Math.max(note.x + note.width + padding, maxX);
                maxY = Math.max(note.y + note.height + padding, maxY);
            });
        }
        let width;
        let height;
        if (fit) {
            width = maxX;
            height = maxY;
        }
        else {
            width = Math.max(maxX, element.prop('offsetWidth'));
            height = Math.max(maxY, element.prop('offsetHeight'));
        }
        element.css('width', width + 'px');
        element.css('height', height + 'px');
    }
    canvasClick(_event) { }
    edgeMouseDown(event, _edge) {
        event.stopPropagation();
    }
    edgeClick(event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    }
    edgeRemove(event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    }
    edgeEdit(event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    }
    edgeDoubleClick(event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    }
    edgeMouseOver(event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    }
    edgeMouseEnter(event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    }
    edgeMouseLeave(event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    }
    dragover(event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    }
    drop(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    }
    mousedown(event) {
        this.rectangleSelectService.mousedown(event);
    }
    mousemove(event) {
        this.rectangleSelectService.mousemove(event);
    }
    mouseup(event) {
        this.rectangleSelectService.mouseup(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: NgxFlowchartComponent, deps: [{ token: i0.ElementRef }, { token: i0.IterableDiffers }, { token: FcModelValidationService }, { token: FcEdgeDrawingService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.17", type: NgxFlowchartComponent, isStandalone: false, selector: "fc-canvas", inputs: { model: "model", selectedObjects: "selectedObjects", edgeStyle: "edgeStyle", userCallbacks: "userCallbacks", automaticResize: "automaticResize", dragAnimation: "dragAnimation", nodeWidth: "nodeWidth", nodeHeight: "nodeHeight", dropTargetId: "dropTargetId", fitModelSizeByDefault: "fitModelSizeByDefault" }, outputs: { modelChanged: "modelChanged" }, host: { listeners: { "dragover": "dragover($event)", "drop": "drop($event)", "mousedown": "mousedown($event)", "mousemove": "mousemove($event)", "mouseup": "mouseup($event)" }, properties: { "attr.class": "this.canvasClass" } }, ngImport: i0, template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  @for (note of (model.notes || []); track note) {\n    <fc-note\n      [note]=\"note\"\n      [selected]=\"modelService.notes.isSelected(note)\"\n      [edit]=\"modelService.notes.isEdit(note)\"\n      [dragging]=\"noteDraggingService.isDraggingNote(note)\"\n      [modelservice]=\"modelService\"\n      [noteDraggingService]=\"noteDraggingService\"\n      [userNoteCallbacks]=\"userNoteCallbacks\">\n    </fc-note>\n  }\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    @for (edge of model.edges; track edge) {\n      <g>\n        <path\n          [id]=\"'fc-edge-path-'+$index\"\n          (mousedown)=\"edgeMouseDown($event, edge)\"\n          (click)=\"edgeClick($event, edge)\"\n          (dblclick)=\"edgeDoubleClick($event, edge)\"\n          (mouseover)=\"edgeMouseOver($event, edge)\"\n          (mouseenter)=\"edgeMouseEnter($event, edge)\"\n          (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n          [attr.d]=\"getEdgeDAttribute(edge)\"\n          [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n        </path>\n      </g>\n    }\n    @if (dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging) {\n      <g>\n        <path [class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n        [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n        <circle class=\"edge-endpoint\" r=\"4\"\n          [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n          [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n        </circle>\n      </g>\n    }\n    @if (dragAnimation === flowchartConstants.dragAnimationShadow) {\n      <g\n        class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n        style=\"display:none\">\n        <path d=\"\"></path>\n        <circle class=\"edge-endpoint\" r=\"4\"></circle>\n      </g>\n    }\n  </svg>\n  @for (node of model.nodes; track node) {\n    <fc-node\n      [selected]=\"modelService.nodes.isSelected(node)\"\n      [edit]=\"modelService.nodes.isEdit(node)\"\n      [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n      [node]=\"node\"\n      [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n      [modelservice]=\"modelService\"\n      [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n      [callbacks]=\"callbacks\"\n      [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  }\n  @if (dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging) {\n    <div\n      [class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n      [style]=\"{\n        top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n        left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n      }\">\n      <div class=\"fc-edge-label-text\">\n        @if (edgeDraggingService.edgeDragging.dragLabel) {\n          <span [attr.id]=\"'fc-edge-label-dragging'\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n        }\n      </div>\n    </div>\n  }\n  @for (edge of model.edges; track edge) {\n    <div\n      (mousedown)=\"edgeMouseDown($event, edge)\"\n      (click)=\"edgeClick($event, edge)\"\n      (dblclick)=\"edgeDoubleClick($event, edge)\"\n      (mouseover)=\"edgeMouseOver($event, edge)\"\n      (mouseenter)=\"edgeMouseEnter($event, edge)\"\n      (mouseleave)=\"edgeMouseLeave($event, edge)\"\n      [class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                        (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                        edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                        edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                        flowchartConstants.edgeLabelClass)\"\n      [style]=\"{\n        top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n        left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n      }\">\n      <div class=\"fc-edge-label-text\">\n        @if (modelService.isEditable()) {\n          <div class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n            <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n          </div>\n        }\n        @if (modelService.isEditable()) {\n          <div class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n            &times;\n          </div>\n        }\n        @if (edge.label) {\n          <span [attr.id]=\"'fc-edge-label-'+$index\">{{edge.label}}</span>\n        }\n      </div>\n    </div>\n  }\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n", styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%;pointer-events:none}:host .fc-edge{pointer-events:stroke;stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{animation:dash 3s linear infinite;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-selected .fc-edge-label-text span,:host .fc-edge-label.fc-edit .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:#147dff1a;z-index:2}@keyframes dash{0%{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodeedit,:host ::ng-deep .fc-edit .fc-nodedelete{display:block;position:absolute;border:solid 2px #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}\n"], dependencies: [{ kind: "component", type: FcNodeContainerComponent, selector: "fc-node", inputs: ["callbacks", "userNodeCallbacks", "node", "selected", "edit", "underMouse", "mouseOverConnector", "modelservice", "dragging"] }, { kind: "component", type: FcNoteContainerComponent, selector: "fc-note", inputs: ["note", "modelservice", "noteDraggingService", "userNoteCallbacks", "selected", "edit", "dragging"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: NgxFlowchartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-canvas', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  @for (note of (model.notes || []); track note) {\n    <fc-note\n      [note]=\"note\"\n      [selected]=\"modelService.notes.isSelected(note)\"\n      [edit]=\"modelService.notes.isEdit(note)\"\n      [dragging]=\"noteDraggingService.isDraggingNote(note)\"\n      [modelservice]=\"modelService\"\n      [noteDraggingService]=\"noteDraggingService\"\n      [userNoteCallbacks]=\"userNoteCallbacks\">\n    </fc-note>\n  }\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    @for (edge of model.edges; track edge) {\n      <g>\n        <path\n          [id]=\"'fc-edge-path-'+$index\"\n          (mousedown)=\"edgeMouseDown($event, edge)\"\n          (click)=\"edgeClick($event, edge)\"\n          (dblclick)=\"edgeDoubleClick($event, edge)\"\n          (mouseover)=\"edgeMouseOver($event, edge)\"\n          (mouseenter)=\"edgeMouseEnter($event, edge)\"\n          (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n          [attr.d]=\"getEdgeDAttribute(edge)\"\n          [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n        </path>\n      </g>\n    }\n    @if (dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging) {\n      <g>\n        <path [class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n        [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n        <circle class=\"edge-endpoint\" r=\"4\"\n          [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n          [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n        </circle>\n      </g>\n    }\n    @if (dragAnimation === flowchartConstants.dragAnimationShadow) {\n      <g\n        class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n        style=\"display:none\">\n        <path d=\"\"></path>\n        <circle class=\"edge-endpoint\" r=\"4\"></circle>\n      </g>\n    }\n  </svg>\n  @for (node of model.nodes; track node) {\n    <fc-node\n      [selected]=\"modelService.nodes.isSelected(node)\"\n      [edit]=\"modelService.nodes.isEdit(node)\"\n      [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n      [node]=\"node\"\n      [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n      [modelservice]=\"modelService\"\n      [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n      [callbacks]=\"callbacks\"\n      [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  }\n  @if (dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging) {\n    <div\n      [class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n      [style]=\"{\n        top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n        left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n      }\">\n      <div class=\"fc-edge-label-text\">\n        @if (edgeDraggingService.edgeDragging.dragLabel) {\n          <span [attr.id]=\"'fc-edge-label-dragging'\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n        }\n      </div>\n    </div>\n  }\n  @for (edge of model.edges; track edge) {\n    <div\n      (mousedown)=\"edgeMouseDown($event, edge)\"\n      (click)=\"edgeClick($event, edge)\"\n      (dblclick)=\"edgeDoubleClick($event, edge)\"\n      (mouseover)=\"edgeMouseOver($event, edge)\"\n      (mouseenter)=\"edgeMouseEnter($event, edge)\"\n      (mouseleave)=\"edgeMouseLeave($event, edge)\"\n      [class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                        (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                        edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                        edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                        flowchartConstants.edgeLabelClass)\"\n      [style]=\"{\n        top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n        left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n      }\">\n      <div class=\"fc-edge-label-text\">\n        @if (modelService.isEditable()) {\n          <div class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n            <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n          </div>\n        }\n        @if (modelService.isEditable()) {\n          <div class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n            &times;\n          </div>\n        }\n        @if (edge.label) {\n          <span [attr.id]=\"'fc-edge-label-'+$index\">{{edge.label}}</span>\n        }\n      </div>\n    </div>\n  }\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n", styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%;pointer-events:none}:host .fc-edge{pointer-events:stroke;stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{animation:dash 3s linear infinite;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-selected .fc-edge-label-text span,:host .fc-edge-label.fc-edit .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:#147dff1a;z-index:2}@keyframes dash{0%{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodeedit,:host ::ng-deep .fc-edit .fc-nodedelete{display:block;position:absolute;border:solid 2px #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.IterableDiffers }, { type: FcModelValidationService }, { type: FcEdgeDrawingService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], propDecorators: { canvasClass: [{
                type: HostBinding,
                args: ['attr.class']
            }], model: [{
                type: Input
            }], selectedObjects: [{
                type: Input
            }], edgeStyle: [{
                type: Input
            }], userCallbacks: [{
                type: Input
            }], automaticResize: [{
                type: Input
            }], dragAnimation: [{
                type: Input
            }], nodeWidth: [{
                type: Input
            }], nodeHeight: [{
                type: Input
            }], dropTargetId: [{
                type: Input
            }], modelChanged: [{
                type: Output
            }], fitModelSizeByDefault: [{
                type: Input
            }], dragover: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], drop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], mousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], mousemove: [{
                type: HostListener,
                args: ['mousemove', ['$event']]
            }], mouseup: [{
                type: HostListener,
                args: ['mouseup', ['$event']]
            }] } });

class FcMagnetDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    }
    dragover(event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    }
    dragleave(event) {
        this.callbacks.edgeDragleaveMagnet(event);
    }
    drop(event) {
        return this.callbacks.edgeDrop(event, this.connector);
    }
    dragend(event) {
        this.callbacks.edgeDragend(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcMagnetDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: FcMagnetDirective, isStandalone: false, selector: "[fc-magnet]", inputs: { callbacks: "callbacks", connector: "connector" }, host: { listeners: { "dragover": "dragover($event)", "dragleave": "dragleave($event)", "drop": "drop($event)", "dragend": "dragend($event)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcMagnetDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fc-magnet]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { callbacks: [{
                type: Input
            }], connector: [{
                type: Input
            }], dragover: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], dragleave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }], drop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }] } });

class FcConnectorDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        const connectorRectInfo = {
            type: this.connector.type,
            width: this.elementRef.nativeElement.offsetWidth,
            height: this.elementRef.nativeElement.offsetHeight,
            nodeRectInfo: this.nodeRectInfo
        };
        this.modelservice.connectors.setConnectorRectInfo(this.connector.id, connectorRectInfo);
    }
    ngOnChanges(changes) {
        let updateConnector = false;
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            if (!change.firstChange && change.currentValue !== change.previousValue) {
                if (propName === 'mouseOverConnector') {
                    updateConnector = true;
                }
            }
        }
        if (updateConnector && this.modelservice.isEditable()) {
            this.updateConnectorClass();
        }
    }
    updateConnectorClass() {
        const element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    }
    dragover(_event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    }
    drop(event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    }
    dragend(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    }
    dragstart(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    }
    mouseenter(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    }
    mouseleave(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcConnectorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: FcConnectorDirective, isStandalone: false, selector: "[fc-connector]", inputs: { callbacks: "callbacks", modelservice: "modelservice", connector: "connector", nodeRectInfo: "nodeRectInfo", mouseOverConnector: "mouseOverConnector" }, host: { listeners: { "dragover": "dragover($event)", "drop": "drop($event)", "dragend": "dragend($event)", "dragstart": "dragstart($event)", "mouseenter": "mouseenter($event)", "mouseleave": "mouseleave($event)" } }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: FcConnectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fc-connector]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { callbacks: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], connector: [{
                type: Input
            }], nodeRectInfo: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], dragover: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], drop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }], dragstart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], mouseenter: [{
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }], mouseleave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }] } });

class DefaultFcNodeComponent extends FcNodeComponent {
    constructor() {
        super();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: DefaultFcNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.17", type: DefaultFcNodeComponent, isStandalone: false, selector: "fc-default-node", usesInheritance: true, ngImport: i0, template: "<div\n  (dblclick)=\"userNodeCallbacks?.doubleClick?.($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      @for (connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType); track connector) {\n        <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\">\n          <div fc-connector [connector]=\"connector\"\n            [nodeRectInfo]=\"nodeRectInfo\"\n            [mouseOverConnector]=\"mouseOverConnector\"\n            [callbacks]=\"callbacks\"\n          [modelservice]=\"modelservice\"></div>\n        </div>\n      }\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      @for (connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType); track connector) {\n        <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\">\n          <div fc-connector [connector]=\"connector\"\n            [nodeRectInfo]=\"nodeRectInfo\"\n            [mouseOverConnector]=\"mouseOverConnector\"\n            [callbacks]=\"callbacks\"\n          [modelservice]=\"modelservice\"></div>\n        </div>\n      }\n    </div>\n  </div>\n  @if (modelservice.isEditable() && !node.readonly) {\n    <div class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n    </div>\n  }\n  @if (modelservice.isEditable() && !node.readonly) {\n    <div class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n      &times;\n    </div>\n  }\n</div>\n", styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;inset:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}\n"], dependencies: [{ kind: "directive", type: FcMagnetDirective, selector: "[fc-magnet]", inputs: ["callbacks", "connector"] }, { kind: "directive", type: FcConnectorDirective, selector: "[fc-connector]", inputs: ["callbacks", "modelservice", "connector", "nodeRectInfo", "mouseOverConnector"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: DefaultFcNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-default-node', standalone: false, template: "<div\n  (dblclick)=\"userNodeCallbacks?.doubleClick?.($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      @for (connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType); track connector) {\n        <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\">\n          <div fc-connector [connector]=\"connector\"\n            [nodeRectInfo]=\"nodeRectInfo\"\n            [mouseOverConnector]=\"mouseOverConnector\"\n            [callbacks]=\"callbacks\"\n          [modelservice]=\"modelservice\"></div>\n        </div>\n      }\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      @for (connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType); track connector) {\n        <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\">\n          <div fc-connector [connector]=\"connector\"\n            [nodeRectInfo]=\"nodeRectInfo\"\n            [mouseOverConnector]=\"mouseOverConnector\"\n            [callbacks]=\"callbacks\"\n          [modelservice]=\"modelservice\"></div>\n        </div>\n      }\n    </div>\n  </div>\n  @if (modelservice.isEditable() && !node.readonly) {\n    <div class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n      <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n    </div>\n  }\n  @if (modelservice.isEditable() && !node.readonly) {\n    <div class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n      &times;\n    </div>\n  }\n</div>\n", styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;inset:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}\n"] }]
        }], ctorParameters: () => [] });

class DefaultFcNoteComponent extends FcNoteComponent {
    constructor() {
        super();
    }
    noteEdit(event) {
        event.stopPropagation();
        if (this.userNoteCallbacks?.noteEdit) {
            this.userNoteCallbacks.noteEdit(event, this.note);
        }
    }
    noteDelete(event) {
        event.stopPropagation();
        this.modelservice.notes.delete(this.note);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: DefaultFcNoteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.17", type: DefaultFcNoteComponent, isStandalone: false, selector: "fc-default-note", usesInheritance: true, ngImport: i0, template: "@if (modelservice.isEditable() && !note.readonly && edit) {\n  <div class=\"fc-noselect fc-nodeedit\"\n       (mousedown)=\"$event.stopPropagation()\"\n       (click)=\"noteEdit($event)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div class=\"fc-noselect fc-nodedelete\"\n       (mousedown)=\"$event.stopPropagation()\"\n       (click)=\"noteDelete($event)\">\n    &times;\n  </div>\n}\n<div class=\"fc-default-note-content\"\n     (dblclick)=\"userNoteCallbacks?.doubleClick?.($event, note)\">\n  <div class=\"fc-default-note-text\">{{ note.content || '' }}</div>\n</div>\n", styles: [":host{display:block;width:100%;height:100%;box-sizing:border-box}:host .fc-nodeedit,:host .fc-nodedelete{display:block;position:absolute;border:solid 2px #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer;z-index:10}:host .fc-nodeedit{top:-24px;right:16px;font-size:15px}:host .fc-nodedelete{top:-24px;right:-13px;font-size:18px}:host .fc-default-note-content{position:relative;width:100%;height:100%;background-color:#fff9c4;border:1px solid #E6D600;border-radius:4px;box-sizing:border-box;padding:8px;overflow:auto}:host .fc-default-note-content .fc-default-note-text{white-space:pre-wrap;word-break:break-word;font-size:13px;color:#333;min-height:100%}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: DefaultFcNoteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-default-note', standalone: false, template: "@if (modelservice.isEditable() && !note.readonly && edit) {\n  <div class=\"fc-noselect fc-nodeedit\"\n       (mousedown)=\"$event.stopPropagation()\"\n       (click)=\"noteEdit($event)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div class=\"fc-noselect fc-nodedelete\"\n       (mousedown)=\"$event.stopPropagation()\"\n       (click)=\"noteDelete($event)\">\n    &times;\n  </div>\n}\n<div class=\"fc-default-note-content\"\n     (dblclick)=\"userNoteCallbacks?.doubleClick?.($event, note)\">\n  <div class=\"fc-default-note-text\">{{ note.content || '' }}</div>\n</div>\n", styles: [":host{display:block;width:100%;height:100%;box-sizing:border-box}:host .fc-nodeedit,:host .fc-nodedelete{display:block;position:absolute;border:solid 2px #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer;z-index:10}:host .fc-nodeedit{top:-24px;right:16px;font-size:15px}:host .fc-nodedelete{top:-24px;right:-13px;font-size:18px}:host .fc-default-note-content{position:relative;width:100%;height:100%;background-color:#fff9c4;border:1px solid #E6D600;border-radius:4px;box-sizing:border-box;padding:8px;overflow:auto}:host .fc-default-note-content .fc-default-note-text{white-space:pre-wrap;word-break:break-word;font-size:13px;color:#333;min-height:100%}\n"] }]
        }], ctorParameters: () => [] });

class NgxFlowchartModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: NgxFlowchartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.17", ngImport: i0, type: NgxFlowchartModule, declarations: [NgxFlowchartComponent,
            FcMagnetDirective,
            FcConnectorDirective,
            FcNodeContainerComponent,
            DefaultFcNodeComponent,
            FcNoteContainerComponent,
            DefaultFcNoteComponent], imports: [CommonModule], exports: [NgxFlowchartComponent,
            FcMagnetDirective,
            FcConnectorDirective,
            DefaultFcNodeComponent,
            FcNoteContainerComponent,
            DefaultFcNoteComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: NgxFlowchartModule, providers: [
            FcModelValidationService,
            FcEdgeDrawingService,
            {
                provide: FC_NODE_COMPONENT_CONFIG,
                useValue: {
                    nodeComponentType: DefaultFcNodeComponent
                }
            },
            {
                provide: FC_NOTE_COMPONENT_CONFIG,
                useValue: {
                    noteComponentType: DefaultFcNoteComponent
                }
            }
        ], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: NgxFlowchartModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxFlowchartComponent,
                        FcMagnetDirective,
                        FcConnectorDirective,
                        FcNodeContainerComponent,
                        DefaultFcNodeComponent,
                        FcNoteContainerComponent,
                        DefaultFcNoteComponent
                    ],
                    providers: [
                        FcModelValidationService,
                        FcEdgeDrawingService,
                        {
                            provide: FC_NODE_COMPONENT_CONFIG,
                            useValue: {
                                nodeComponentType: DefaultFcNodeComponent
                            }
                        },
                        {
                            provide: FC_NOTE_COMPONENT_CONFIG,
                            useValue: {
                                noteComponentType: DefaultFcNoteComponent
                            }
                        }
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        NgxFlowchartComponent,
                        FcMagnetDirective,
                        FcConnectorDirective,
                        DefaultFcNodeComponent,
                        FcNoteContainerComponent,
                        DefaultFcNoteComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-flowchart
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultFcNodeComponent, DefaultFcNoteComponent, FC_NODE_COMPONENT_CONFIG, FC_NOTE_COMPONENT_CONFIG, FcConnectorDirective, FcMagnetDirective, FcNodeComponent, FcNoteComponent, FcNoteContainerComponent, FlowchartConstants, ModelvalidationError, NgxFlowchartComponent, NgxFlowchartModule, NoteDragMode, fcTopSort };
//# sourceMappingURL=ngx-flowchart.mjs.map
