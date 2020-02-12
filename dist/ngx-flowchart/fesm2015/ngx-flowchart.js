import { InjectionToken, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, ElementRef, ComponentFactoryResolver, ɵɵdefineComponent, ɵɵstaticViewQuery, ViewContainerRef, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵlistener, ɵɵattribute, ɵɵstyleProp, ɵɵNgOnChangesFeature, ɵɵtemplate, ɵɵtemplateRefExtractor, Component, Inject, Input, HostBinding, ViewChild, HostListener, ɵɵdefineDirective, Directive, ɵɵgetCurrentView, ɵɵnamespaceSVG, ɵɵelementStart, ɵɵrestoreView, ɵɵnextContext, ɵɵelementEnd, ɵɵadvance, ɵɵelement, ɵɵclassMapInterpolate2, ɵɵnamespaceHTML, ɵɵelementContainerStart, ɵɵelementContainerEnd, ɵɵproperty, ɵɵtext, ɵɵtextInterpolate, ɵɵpureFunction2, EventEmitter, IterableDiffers, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, Output, ɵɵInheritDefinitionFeature, ɵɵclassMap, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgForOf, NgIf, NgStyle, CommonModule } from '@angular/common';

const FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
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
    canvasResizeThreshold: 200,
    canvasResizeStep: 200
};
class BaseError {
    constructor() {
        Error.apply(this, arguments);
    }
}
Object.defineProperty(BaseError, 'prototype', new Error());
class ModelvalidationError extends BaseError {
    constructor(message) {
        super();
        this.message = message;
    }
}
function fcTopSort(graph) {
    const adjacentList = {};
    graph.nodes.forEach((node) => {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    });
    graph.edges.forEach((edge) => {
        const sourceNode = graph.nodes.filter((node) => {
            return node.connectors.some((connector) => {
                return connector.id === edge.source;
            });
        })[0];
        const destinationNode = graph.nodes.filter((node) => {
            return node.connectors.some((connector) => {
                return connector.id === edge.destination;
            });
        })[0];
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
}

class FcModelService {
    constructor(modelValidation, model, modelChanged, detectChangesSubject, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
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
        this.createEdge = createEdge || ((event, edge) => of(Object.assign(Object.assign({}, edge), { label: 'label' })));
        this.edgeAddedCallback = edgeAddedCallback || (() => { });
        this.nodeRemovedCallback = nodeRemovedCallback || (() => { });
        this.edgeRemovedCallback = edgeRemovedCallback || (() => { });
        this.connectors = new ConnectorsModel(this);
        this.nodes = new NodesModel(this);
        this.edges = new EdgesModel(this);
        this.debouncer
            .pipe(debounceTime(100))
            .subscribe(() => this.modelChanged.emit());
    }
    notifyModelChanged() {
        this.debouncer.next();
    }
    detectChanges() {
        setTimeout(() => {
            this.detectChangesSubject.next();
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
            edge: this.getEdgeAtPoint(x, y)
        };
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
        const coords = {
            x: Math.round(x),
            y: Math.round(y)
        };
        return coords;
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
        return node.connectors.filter((connector) => {
            return connector.type === type;
        });
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
        return model.nodes.filter((node) => {
            return this.modelService.nodes.isSelected(node);
        });
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
        return node.connectors.map((connector) => {
            return connector.id;
        });
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
        return model.edges.filter((edge) => {
            return this.modelService.edges.isSelected(edge);
        });
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

class FcModelValidationService {
    constructor() {
    }
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
}
FcModelValidationService.ɵfac = function FcModelValidationService_Factory(t) { return new (t || FcModelValidationService)(); };
FcModelValidationService.ɵprov = ɵɵdefineInjectable({ token: FcModelValidationService, factory: FcModelValidationService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FcModelValidationService, [{
        type: Injectable
    }], function () { return []; }, null); })();

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
        this.modelService = modelService;
        this.automaticResize = automaticResize;
        this.dragAnimation = dragAnimation;
        this.applyFunction = applyFunction;
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
            catch (e) { }
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
    dragend(event) {
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

class FcEdgeDrawingService {
    constructor() {
    }
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
}
FcEdgeDrawingService.ɵfac = function FcEdgeDrawingService_Factory(t) { return new (t || FcEdgeDrawingService)(); };
FcEdgeDrawingService.ɵprov = ɵɵdefineInjectable({ token: FcEdgeDrawingService, factory: FcEdgeDrawingService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FcEdgeDrawingService, [{
        type: Injectable
    }], function () { return []; }, null); })();

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
        this.dragOffset.x = -canvas.getBoundingClientRect().left;
        this.dragOffset.y = -canvas.getBoundingClientRect().top;
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
    dragleaveMagnet(event) {
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
    nodeMouseOver(event, node) {
        return this.applyFunction(() => {
            this.mouseoverscope.node = node;
        });
    }
    nodeMouseOut(event, node) {
        return this.applyFunction(() => {
            this.mouseoverscope.node = null;
        });
    }
    connectorMouseEnter(event, connector) {
        return this.applyFunction(() => {
            this.mouseoverscope.connector = connector;
        });
    }
    connectorMouseLeave(event, connector) {
        return this.applyFunction(() => {
            this.mouseoverscope.connector = null;
        });
    }
    edgeMouseEnter(event, edge) {
        this.mouseoverscope.edge = edge;
    }
    edgeMouseLeave(event, edge) {
        this.mouseoverscope.edge = null;
    }
}

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

const _c0 = ["nodeContent"];
function FcNodeContainerComponent_ng_template_0_Template(rf, ctx) { }
class FcNodeContainerComponent {
    constructor(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    get nodeId() {
        return this.node.id;
    }
    get top() {
        return this.node.y + 'px';
    }
    get left() {
        return this.node.x + 'px';
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
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        const componentRef = this.nodeContentContainer.createComponent(componentFactory);
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
}
FcNodeContainerComponent.ɵfac = function FcNodeContainerComponent_Factory(t) { return new (t || FcNodeContainerComponent)(ɵɵdirectiveInject(FC_NODE_COMPONENT_CONFIG), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ComponentFactoryResolver)); };
FcNodeContainerComponent.ɵcmp = ɵɵdefineComponent({ type: FcNodeContainerComponent, selectors: [["fc-node"]], viewQuery: function FcNodeContainerComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵstaticViewQuery(_c0, true, ViewContainerRef);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeContentContainer = _t.first);
    } }, hostVars: 5, hostBindings: function FcNodeContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mousedown", function FcNodeContainerComponent_mousedown_HostBindingHandler($event) { return ctx.mousedown($event); })("dragstart", function FcNodeContainerComponent_dragstart_HostBindingHandler($event) { return ctx.dragstart($event); })("dragend", function FcNodeContainerComponent_dragend_HostBindingHandler($event) { return ctx.dragend($event); })("click", function FcNodeContainerComponent_click_HostBindingHandler($event) { return ctx.click($event); })("mouseover", function FcNodeContainerComponent_mouseover_HostBindingHandler($event) { return ctx.mouseover($event); })("mouseout", function FcNodeContainerComponent_mouseout_HostBindingHandler($event) { return ctx.mouseout($event); });
    } if (rf & 2) {
        ɵɵattribute("id", ctx.nodeId);
        ɵɵstyleProp("top", ctx.top)("left", ctx.left);
    } }, inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, features: [ɵɵNgOnChangesFeature()], decls: 2, vars: 0, consts: [["nodeContent", ""]], template: function FcNodeContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, FcNodeContainerComponent_ng_template_0_Template, 0, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    } }, styles: ["[_nghost-%COMP%]{position:absolute;z-index:1}.fc-dragging[_nghost-%COMP%]{z-index:10}[_nghost-%COMP%]     .fc-leftConnectors, [_nghost-%COMP%]     .fc-rightConnectors{position:absolute;top:0;height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;z-index:-10}[_nghost-%COMP%]     .fc-leftConnectors .fc-magnet, [_nghost-%COMP%]     .fc-rightConnectors .fc-magnet{-webkit-box-align:center;align-items:center}[_nghost-%COMP%]     .fc-leftConnectors{left:-20px}[_nghost-%COMP%]     .fc-rightConnectors{right:-20px}[_nghost-%COMP%]     .fc-magnet{display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;height:60px;-webkit-box-pack:center;justify-content:center}[_nghost-%COMP%]     .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}[_nghost-%COMP%]     .fc-connector.fc-hover{background-color:#000}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FcNodeContainerComponent, [{
        type: Component,
        args: [{
                selector: 'fc-node',
                template: '<ng-template #nodeContent></ng-template>',
                styleUrls: ['./node.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [FC_NODE_COMPONENT_CONFIG]
            }] }, { type: ElementRef }, { type: ComponentFactoryResolver }]; }, { callbacks: [{
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
        }] }); })();
class FcNodeComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: () => {
                return this.node.y;
            },
            left: () => {
                return this.node.x;
            },
            bottom: () => {
                return this.node.y + this.height;
            },
            right: () => {
                return this.node.x + this.width;
            },
            width: () => {
                return this.width;
            },
            height: () => {
                return this.height;
            }
        };
    }
    ngOnInit() {
    }
}
FcNodeComponent.ɵfac = function FcNodeComponent_Factory(t) { return new (t || FcNodeComponent)(); };
FcNodeComponent.ɵdir = ɵɵdefineDirective({ type: FcNodeComponent, inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FcNodeComponent, [{
        type: Directive
    }], null, { callbacks: [{
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
        }] }); })();

function NgxFlowchartComponent__svg_g_7_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g");
    ɵɵelementStart(1, "path", 12);
    ɵɵlistener("mousedown", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mousedown_1_listener($event) { ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r10 = ɵɵnextContext(); return ctx_r10.edgeMouseDown($event, edge_r8); })("click", function NgxFlowchartComponent__svg_g_7_Template__svg_path_click_1_listener($event) { ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r12 = ɵɵnextContext(); return ctx_r12.edgeClick($event, edge_r8); })("dblclick", function NgxFlowchartComponent__svg_g_7_Template__svg_path_dblclick_1_listener($event) { ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r13 = ɵɵnextContext(); return ctx_r13.edgeDoubleClick($event, edge_r8); })("mouseover", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseover_1_listener($event) { ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r14 = ɵɵnextContext(); return ctx_r14.edgeMouseOver($event, edge_r8); })("mouseenter", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseenter_1_listener($event) { ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r15 = ɵɵnextContext(); return ctx_r15.edgeMouseEnter($event, edge_r8); })("mouseleave", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseleave_1_listener($event) { ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r16 = ɵɵnextContext(); return ctx_r16.edgeMouseLeave($event, edge_r8); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const edge_r8 = ctx.$implicit;
    const $index_r9 = ctx.index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵattribute("id", "fc-edge-path-" + $index_r9)("class", ctx_r2.modelService.edges.isSelected(edge_r8) && ctx_r2.flowchartConstants.selectedClass + " " + ctx_r2.flowchartConstants.edgeClass || edge_r8 === ctx_r2.mouseoverService.mouseoverscope.edge && ctx_r2.flowchartConstants.hoverClass + " " + ctx_r2.flowchartConstants.edgeClass || edge_r8.active && ctx_r2.flowchartConstants.activeClass + " " + ctx_r2.flowchartConstants.edgeClass || ctx_r2.flowchartConstants.edgeClass)("d", ctx_r2.getEdgeDAttribute(edge_r8))("marker-end", "url(#" + (ctx_r2.modelService.edges.isSelected(edge_r8) ? ctx_r2.arrowDefIdSelected : ctx_r2.arrowDefId) + ")");
} }
function NgxFlowchartComponent__svg_g_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g");
    ɵɵelement(1, "path");
    ɵɵelement(2, "circle", 13);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵattribute("class", ctx_r3.flowchartConstants.edgeClass + " " + ctx_r3.flowchartConstants.draggingClass)("d", ctx_r3.edgeDrawingService.getEdgeDAttribute(ctx_r3.edgeDraggingService.edgeDragging.dragPoint1, ctx_r3.edgeDraggingService.edgeDragging.dragPoint2, ctx_r3.edgeStyle));
    ɵɵadvance(1);
    ɵɵattribute("cx", ctx_r3.edgeDraggingService.edgeDragging.dragPoint2.x)("cy", ctx_r3.edgeDraggingService.edgeDragging.dragPoint2.y);
} }
function NgxFlowchartComponent__svg_g_9_Template(rf, ctx) { if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "g", 14);
    ɵɵelement(1, "path", 15);
    ɵɵelement(2, "circle", 13);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassMapInterpolate2("shadow-svg-class ", ctx_r4.flowchartConstants.edgeClass, " ", ctx_r4.flowchartConstants.draggingClass, "");
} }
function NgxFlowchartComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵnamespaceHTML();
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "fc-node", 16);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const node_r17 = ctx.$implicit;
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("selected", ctx_r5.modelService.nodes.isSelected(node_r17))("edit", ctx_r5.modelService.nodes.isEdit(node_r17))("underMouse", node_r17 === ctx_r5.mouseoverService.mouseoverscope.node)("node", node_r17)("mouseOverConnector", ctx_r5.mouseoverService.mouseoverscope.connector)("modelservice", ctx_r5.modelService)("dragging", ctx_r5.nodeDraggingService.isDraggingNode(node_r17))("callbacks", ctx_r5.callbacks)("userNodeCallbacks", ctx_r5.userNodeCallbacks);
} }
function NgxFlowchartComponent_div_11_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = ɵɵnextContext(2);
    ɵɵattribute("id", "fc-edge-label-dragging");
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r18.edgeDraggingService.edgeDragging.dragLabel);
} }
const _c0$1 = function (a0, a1) { return { top: a0, left: a1 }; };
function NgxFlowchartComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵnamespaceHTML();
    ɵɵelementStart(0, "div", 17);
    ɵɵelementStart(1, "div", 18);
    ɵɵtemplate(2, NgxFlowchartComponent_div_11_span_2_Template, 2, 2, "span", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction2(3, _c0$1, ctx_r6.edgeDrawingService.getEdgeCenter(ctx_r6.edgeDraggingService.edgeDragging.dragPoint1, ctx_r6.edgeDraggingService.edgeDragging.dragPoint2).y + "px", ctx_r6.edgeDrawingService.getEdgeCenter(ctx_r6.edgeDraggingService.edgeDragging.dragPoint1, ctx_r6.edgeDraggingService.edgeDragging.dragPoint2).x + "px"));
    ɵɵattribute("class", "fc-noselect " + ctx_r6.flowchartConstants.edgeLabelClass);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r6.edgeDraggingService.edgeDragging.dragLabel);
} }
function NgxFlowchartComponent_div_12_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 22);
    ɵɵlistener("click", function NgxFlowchartComponent_div_12_div_2_Template_div_click_0_listener($event) { ɵɵrestoreView(_r25); const edge_r19 = ɵɵnextContext().$implicit; const ctx_r24 = ɵɵnextContext(); return ctx_r24.edgeEdit($event, edge_r19); });
    ɵɵelement(1, "i", 23);
    ɵɵelementEnd();
} }
function NgxFlowchartComponent_div_12_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r28 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24);
    ɵɵlistener("click", function NgxFlowchartComponent_div_12_div_3_Template_div_click_0_listener($event) { ɵɵrestoreView(_r28); const edge_r19 = ɵɵnextContext().$implicit; const ctx_r27 = ɵɵnextContext(); return ctx_r27.edgeRemove($event, edge_r19); });
    ɵɵtext(1, " \u00D7 ");
    ɵɵelementEnd();
} }
function NgxFlowchartComponent_div_12_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = ɵɵnextContext();
    const $index_r20 = ctx_r30.index;
    const edge_r19 = ctx_r30.$implicit;
    ɵɵattribute("id", "fc-edge-label-" + $index_r20);
    ɵɵadvance(1);
    ɵɵtextInterpolate(edge_r19.label);
} }
function NgxFlowchartComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r32 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵnamespaceHTML();
    ɵɵelementStart(0, "div", 19);
    ɵɵlistener("mousedown", function NgxFlowchartComponent_div_12_Template_div_mousedown_0_listener($event) { ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r31 = ɵɵnextContext(); return ctx_r31.edgeMouseDown($event, edge_r19); })("click", function NgxFlowchartComponent_div_12_Template_div_click_0_listener($event) { ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r33 = ɵɵnextContext(); return ctx_r33.edgeClick($event, edge_r19); })("dblclick", function NgxFlowchartComponent_div_12_Template_div_dblclick_0_listener($event) { ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r34 = ɵɵnextContext(); return ctx_r34.edgeDoubleClick($event, edge_r19); })("mouseover", function NgxFlowchartComponent_div_12_Template_div_mouseover_0_listener($event) { ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r35 = ɵɵnextContext(); return ctx_r35.edgeMouseOver($event, edge_r19); })("mouseenter", function NgxFlowchartComponent_div_12_Template_div_mouseenter_0_listener($event) { ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r36 = ɵɵnextContext(); return ctx_r36.edgeMouseEnter($event, edge_r19); })("mouseleave", function NgxFlowchartComponent_div_12_Template_div_mouseleave_0_listener($event) { ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r37 = ɵɵnextContext(); return ctx_r37.edgeMouseLeave($event, edge_r19); });
    ɵɵelementStart(1, "div", 18);
    ɵɵtemplate(2, NgxFlowchartComponent_div_12_div_2_Template, 2, 0, "div", 20);
    ɵɵtemplate(3, NgxFlowchartComponent_div_12_div_3_Template, 2, 0, "div", 21);
    ɵɵtemplate(4, NgxFlowchartComponent_div_12_span_4_Template, 2, 2, "span", 7);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const edge_r19 = ctx.$implicit;
    const ctx_r7 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction2(5, _c0$1, ctx_r7.edgeDrawingService.getEdgeCenter(ctx_r7.modelService.edges.sourceCoord(edge_r19), ctx_r7.modelService.edges.destCoord(edge_r19)).y + "px", ctx_r7.edgeDrawingService.getEdgeCenter(ctx_r7.modelService.edges.sourceCoord(edge_r19), ctx_r7.modelService.edges.destCoord(edge_r19)).x + "px"));
    ɵɵattribute("class", "fc-noselect " + (ctx_r7.modelService.edges.isEdit(edge_r19) && ctx_r7.flowchartConstants.editClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || ctx_r7.modelService.edges.isSelected(edge_r19) && ctx_r7.flowchartConstants.selectedClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || edge_r19 === ctx_r7.mouseoverService.mouseoverscope.edge && ctx_r7.flowchartConstants.hoverClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || edge_r19.active && ctx_r7.flowchartConstants.activeClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || ctx_r7.flowchartConstants.edgeLabelClass));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r7.modelService.isEditable());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r7.modelService.isEditable());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", edge_r19.label);
} }
class NgxFlowchartComponent {
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
        this.nodesDiffer = this.differs.find([]).create((index, item) => {
            return item;
        });
        this.edgesDiffer = this.differs.find([]).create((index, item) => {
            return item;
        });
        this.detectChangesSubject = new Subject();
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
        this.detectChangesSubject
            .pipe(debounceTime(50))
            .subscribe(() => this.cd.detectChanges());
    }
    get canvasClass() {
        return FlowchartConstants.canvasClass;
    }
    get fitModelSizeByDefault() {
        return this.fitModelSizeByDefaultValue;
    }
    set fitModelSizeByDefault(value) {
        this.fitModelSizeByDefaultValue = coerceBooleanProperty(value);
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
            if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                throw new Error('All callbacks should be functions.');
            }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        const element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.detectChangesSubject, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        const applyFunction = this.zone.run.bind(this.zone);
        this.nodeDraggingService = new FcNodeDraggingService(this.modelService, applyFunction, this.automaticResize, this.dragAnimation);
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
            let nodesChanged = false;
            let edgesChanged = false;
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
            if (nodesChanged) {
                this.adjustCanvasSize(this.fitModelSizeByDefault);
            }
            if (nodesChanged || edgesChanged) {
                this.detectChangesSubject.next();
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
        this.model.nodes.forEach((node) => {
            maxX = Math.max(node.x + this.nodeWidth, maxX);
            maxY = Math.max(node.y + this.nodeHeight, maxY);
        });
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
    canvasClick(event) { }
    edgeMouseDown(event, edge) {
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
}
NgxFlowchartComponent.ɵfac = function NgxFlowchartComponent_Factory(t) { return new (t || NgxFlowchartComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(IterableDiffers), ɵɵdirectiveInject(FcModelValidationService), ɵɵdirectiveInject(FcEdgeDrawingService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NgZone)); };
NgxFlowchartComponent.ɵcmp = ɵɵdefineComponent({ type: NgxFlowchartComponent, selectors: [["fc-canvas"]], hostVars: 1, hostBindings: function NgxFlowchartComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("dragover", function NgxFlowchartComponent_dragover_HostBindingHandler($event) { return ctx.dragover($event); })("drop", function NgxFlowchartComponent_drop_HostBindingHandler($event) { return ctx.drop($event); })("mousedown", function NgxFlowchartComponent_mousedown_HostBindingHandler($event) { return ctx.mousedown($event); })("mousemove", function NgxFlowchartComponent_mousemove_HostBindingHandler($event) { return ctx.mousemove($event); })("mouseup", function NgxFlowchartComponent_mouseup_HostBindingHandler($event) { return ctx.mouseup($event); });
    } if (rf & 2) {
        ɵɵattribute("class", ctx.canvasClass);
    } }, inputs: { model: "model", selectedObjects: "selectedObjects", edgeStyle: "edgeStyle", userCallbacks: "userCallbacks", automaticResize: "automaticResize", dragAnimation: "dragAnimation", nodeWidth: "nodeWidth", nodeHeight: "nodeHeight", dropTargetId: "dropTargetId", fitModelSizeByDefault: "fitModelSizeByDefault" }, outputs: { modelChanged: "modelChanged" }, decls: 14, vars: 8, consts: [[1, "fc-canvas-container", 3, "click"], [1, "fc-canvas-svg"], ["markerWidth", "5", "markerHeight", "5", "viewBox", "-6 -6 12 12", "refX", "10", "refY", "0", "markerUnits", "strokeWidth", "orient", "auto", 1, "fc-arrow-marker"], ["points", "-2,0 -5,5 5,0 -5,-5", "stroke", "gray", "fill", "gray", "stroke-width", "1px"], ["markerWidth", "5", "markerHeight", "5", "viewBox", "-6 -6 12 12", "refX", "10", "refY", "0", "markerUnits", "strokeWidth", "orient", "auto", 1, "fc-arrow-marker-selected"], ["points", "-2,0 -5,5 5,0 -5,-5", "stroke", "red", "fill", "red", "stroke-width", "1px"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["style", "display:none", 3, "class", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngStyle", "mousedown", "click", "dblclick", "mouseover", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["id", "select-rectangle", "hidden", "", 1, "fc-select-rectangle"], [3, "mousedown", "click", "dblclick", "mouseover", "mouseenter", "mouseleave"], ["r", "4", 1, "edge-endpoint"], [2, "display", "none"], ["d", ""], [3, "selected", "edit", "underMouse", "node", "mouseOverConnector", "modelservice", "dragging", "callbacks", "userNodeCallbacks"], [3, "ngStyle"], [1, "fc-edge-label-text"], [3, "ngStyle", "mousedown", "click", "dblclick", "mouseover", "mouseenter", "mouseleave"], ["class", "fc-noselect fc-nodeedit", 3, "click", 4, "ngIf"], ["class", "fc-noselect fc-nodedelete", 3, "click", 4, "ngIf"], [1, "fc-noselect", "fc-nodeedit", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-pencil"], [1, "fc-noselect", "fc-nodedelete", 3, "click"]], template: function NgxFlowchartComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("click", function NgxFlowchartComponent_Template_div_click_0_listener($event) { return ctx.canvasClick($event); });
        ɵɵnamespaceSVG();
        ɵɵelementStart(1, "svg", 1);
        ɵɵelementStart(2, "defs");
        ɵɵelementStart(3, "marker", 2);
        ɵɵelement(4, "polygon", 3);
        ɵɵelementEnd();
        ɵɵelementStart(5, "marker", 4);
        ɵɵelement(6, "polygon", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(7, NgxFlowchartComponent__svg_g_7_Template, 2, 4, "g", 6);
        ɵɵtemplate(8, NgxFlowchartComponent__svg_g_8_Template, 3, 4, "g", 7);
        ɵɵtemplate(9, NgxFlowchartComponent__svg_g_9_Template, 3, 4, "g", 8);
        ɵɵelementEnd();
        ɵɵtemplate(10, NgxFlowchartComponent_ng_container_10_Template, 2, 9, "ng-container", 6);
        ɵɵtemplate(11, NgxFlowchartComponent_div_11_Template, 3, 6, "div", 9);
        ɵɵtemplate(12, NgxFlowchartComponent_div_12_Template, 5, 8, "div", 10);
        ɵɵnamespaceHTML();
        ɵɵelement(13, "div", 11);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵattribute("id", ctx.arrowDefId);
        ɵɵadvance(2);
        ɵɵattribute("id", ctx.arrowDefIdSelected);
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.model.edges);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.dragAnimation === ctx.flowchartConstants.dragAnimationRepaint && ctx.edgeDraggingService.edgeDragging.isDragging);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.dragAnimation === ctx.flowchartConstants.dragAnimationShadow);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.model.nodes);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.dragAnimation === ctx.flowchartConstants.dragAnimationRepaint && ctx.edgeDraggingService.edgeDragging.isDragging);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.model.edges);
    } }, directives: [NgForOf, NgIf, FcNodeContainerComponent, NgStyle], styles: ["[_nghost-%COMP%]{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[_nghost-%COMP%]   .fc-canvas-container[_ngcontent-%COMP%]{display:block;position:relative;width:100%;height:100%}[_nghost-%COMP%]   .fc-canvas-container[_ngcontent-%COMP%]   svg.fc-canvas-svg[_ngcontent-%COMP%]{display:block;position:relative;width:100%;height:100%}[_nghost-%COMP%]   .fc-edge[_ngcontent-%COMP%]{stroke:gray;stroke-width:4;-webkit-transition:stroke-width .2s;transition:stroke-width .2s;fill:transparent}[_nghost-%COMP%]   .fc-edge.fc-hover[_ngcontent-%COMP%]{stroke:gray;stroke-width:6;fill:transparent}[_nghost-%COMP%]   .fc-edge.fc-selected[_ngcontent-%COMP%]{stroke:red;stroke-width:4;fill:transparent}[_nghost-%COMP%]   .fc-edge.fc-active[_ngcontent-%COMP%]{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}[_nghost-%COMP%]   .fc-edge.fc-dragging[_ngcontent-%COMP%]{pointer-events:none}[_nghost-%COMP%]   .fc-arrow-marker[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{stroke:gray;fill:gray}[_nghost-%COMP%]   .fc-arrow-marker-selected[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{stroke:red;fill:red}[_nghost-%COMP%]   .edge-endpoint[_ngcontent-%COMP%]{fill:gray}[_nghost-%COMP%]   .fc-noselect[_ngcontent-%COMP%]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]{position:absolute;opacity:.8;-webkit-transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-transform-origin:bottom left;transform-origin:bottom left;margin:0 auto}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-nodeedit[_ngcontent-%COMP%]{top:-30px;right:14px}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-nodedelete[_ngcontent-%COMP%]{top:-30px;right:-13px}[_nghost-%COMP%]   .fc-edge-label.fc-hover[_ngcontent-%COMP%]{-webkit-transform:scale(1.25);transform:scale(1.25)}[_nghost-%COMP%]   .fc-edge-label.fc-edit[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], [_nghost-%COMP%]   .fc-edge-label.fc-selected[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{border:solid red;color:#fff;font-weight:600;background-color:red}[_nghost-%COMP%]   .fc-select-rectangle[_ngcontent-%COMP%]{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}[_nghost-%COMP%]     .fc-nodeedit{display:none;font-size:15px}[_nghost-%COMP%]     .fc-nodedelete{display:none;font-size:18px}[_nghost-%COMP%]     .fc-edit .fc-nodedelete, [_nghost-%COMP%]     .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}[_nghost-%COMP%]     .fc-edit .fc-nodeedit{top:-24px;right:16px}[_nghost-%COMP%]     .fc-edit .fc-nodedelete{top:-24px;right:-13px}"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxFlowchartComponent, [{
        type: Component,
        args: [{
                selector: 'fc-canvas',
                templateUrl: './ngx-flowchart.component.html',
                styleUrls: ['./ngx-flowchart.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ElementRef }, { type: IterableDiffers }, { type: FcModelValidationService }, { type: FcEdgeDrawingService }, { type: ChangeDetectorRef }, { type: NgZone }]; }, { canvasClass: [{
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
        }] }); })();

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
}
FcMagnetDirective.ɵfac = function FcMagnetDirective_Factory(t) { return new (t || FcMagnetDirective)(ɵɵdirectiveInject(ElementRef)); };
FcMagnetDirective.ɵdir = ɵɵdefineDirective({ type: FcMagnetDirective, selectors: [["", "fc-magnet", ""]], hostBindings: function FcMagnetDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("dragover", function FcMagnetDirective_dragover_HostBindingHandler($event) { return ctx.dragover($event); })("dragleave", function FcMagnetDirective_dragleave_HostBindingHandler($event) { return ctx.dragleave($event); })("drop", function FcMagnetDirective_drop_HostBindingHandler($event) { return ctx.drop($event); })("dragend", function FcMagnetDirective_dragend_HostBindingHandler($event) { return ctx.dragend($event); });
    } }, inputs: { callbacks: "callbacks", connector: "connector" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FcMagnetDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fc-magnet]'
            }]
    }], function () { return [{ type: ElementRef }]; }, { callbacks: [{
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
        }] }); })();

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
    dragover(event) {
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
}
FcConnectorDirective.ɵfac = function FcConnectorDirective_Factory(t) { return new (t || FcConnectorDirective)(ɵɵdirectiveInject(ElementRef)); };
FcConnectorDirective.ɵdir = ɵɵdefineDirective({ type: FcConnectorDirective, selectors: [["", "fc-connector", ""]], hostBindings: function FcConnectorDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("dragover", function FcConnectorDirective_dragover_HostBindingHandler($event) { return ctx.dragover($event); })("drop", function FcConnectorDirective_drop_HostBindingHandler($event) { return ctx.drop($event); })("dragend", function FcConnectorDirective_dragend_HostBindingHandler($event) { return ctx.dragend($event); })("dragstart", function FcConnectorDirective_dragstart_HostBindingHandler($event) { return ctx.dragstart($event); })("mouseenter", function FcConnectorDirective_mouseenter_HostBindingHandler($event) { return ctx.mouseenter($event); })("mouseleave", function FcConnectorDirective_mouseleave_HostBindingHandler($event) { return ctx.mouseleave($event); });
    } }, inputs: { callbacks: "callbacks", modelservice: "modelservice", connector: "connector", nodeRectInfo: "nodeRectInfo", mouseOverConnector: "mouseOverConnector" }, features: [ɵɵNgOnChangesFeature()] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FcConnectorDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fc-connector]'
            }]
    }], function () { return [{ type: ElementRef }]; }, { callbacks: [{
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
        }] }); })();

function DefaultFcNodeComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵelement(1, "div", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const connector_r42 = ctx.$implicit;
    const ctx_r38 = ɵɵnextContext();
    ɵɵproperty("connector", connector_r42)("callbacks", ctx_r38.callbacks);
    ɵɵadvance(1);
    ɵɵproperty("connector", connector_r42)("nodeRectInfo", ctx_r38.nodeRectInfo)("mouseOverConnector", ctx_r38.mouseOverConnector)("callbacks", ctx_r38.callbacks)("modelservice", ctx_r38.modelservice);
} }
function DefaultFcNodeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵelement(1, "div", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const connector_r43 = ctx.$implicit;
    const ctx_r39 = ɵɵnextContext();
    ɵɵproperty("connector", connector_r43)("callbacks", ctx_r39.callbacks);
    ɵɵadvance(1);
    ɵɵproperty("connector", connector_r43)("nodeRectInfo", ctx_r39.nodeRectInfo)("mouseOverConnector", ctx_r39.mouseOverConnector)("callbacks", ctx_r39.callbacks)("modelservice", ctx_r39.modelservice);
} }
function DefaultFcNodeComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r45 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵlistener("click", function DefaultFcNodeComponent_div_9_Template_div_click_0_listener($event) { ɵɵrestoreView(_r45); const ctx_r44 = ɵɵnextContext(); return ctx_r44.userNodeCallbacks.nodeEdit($event, ctx_r44.node); });
    ɵɵelement(1, "i", 8);
    ɵɵelementEnd();
} }
function DefaultFcNodeComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r47 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 9);
    ɵɵlistener("click", function DefaultFcNodeComponent_div_10_Template_div_click_0_listener($event) { ɵɵrestoreView(_r47); const ctx_r46 = ɵɵnextContext(); return ctx_r46.modelservice.nodes.delete(ctx_r46.node); });
    ɵɵtext(1, " \u00D7 ");
    ɵɵelementEnd();
} }
class DefaultFcNodeComponent extends FcNodeComponent {
    constructor() {
        super();
    }
}
DefaultFcNodeComponent.ɵfac = function DefaultFcNodeComponent_Factory(t) { return new (t || DefaultFcNodeComponent)(); };
DefaultFcNodeComponent.ɵcmp = ɵɵdefineComponent({ type: DefaultFcNodeComponent, selectors: [["fc-default-node"]], features: [ɵɵInheritDefinitionFeature], decls: 11, vars: 14, consts: [[3, "dblclick"], [1, "innerNode"], ["fc-magnet", "", 3, "connector", "callbacks", 4, "ngFor", "ngForOf"], ["class", "fc-nodeedit", 3, "click", 4, "ngIf"], ["class", "fc-nodedelete", 3, "click", 4, "ngIf"], ["fc-magnet", "", 3, "connector", "callbacks"], ["fc-connector", "", 3, "connector", "nodeRectInfo", "mouseOverConnector", "callbacks", "modelservice"], [1, "fc-nodeedit", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-pencil"], [1, "fc-nodedelete", 3, "click"]], template: function DefaultFcNodeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("dblclick", function DefaultFcNodeComponent_Template_div_dblclick_0_listener($event) { return ctx.userNodeCallbacks.doubleClick($event, ctx.node); });
        ɵɵelement(1, "div");
        ɵɵelementStart(2, "div", 1);
        ɵɵelementStart(3, "p");
        ɵɵtext(4);
        ɵɵelementEnd();
        ɵɵelementStart(5, "div");
        ɵɵtemplate(6, DefaultFcNodeComponent_div_6_Template, 2, 7, "div", 2);
        ɵɵelementEnd();
        ɵɵelementStart(7, "div");
        ɵɵtemplate(8, DefaultFcNodeComponent_div_8_Template, 2, 7, "div", 2);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(9, DefaultFcNodeComponent_div_9_Template, 2, 0, "div", 3);
        ɵɵtemplate(10, DefaultFcNodeComponent_div_10_Template, 2, 0, "div", 4);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵclassMap(ctx.flowchartConstants.nodeOverlayClass);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ctx.node.name);
        ɵɵadvance(1);
        ɵɵclassMap(ctx.flowchartConstants.leftConnectorClass);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.modelservice.nodes.getConnectorsByType(ctx.node, ctx.flowchartConstants.leftConnectorType));
        ɵɵadvance(1);
        ɵɵclassMap(ctx.flowchartConstants.rightConnectorClass);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.modelservice.nodes.getConnectorsByType(ctx.node, ctx.flowchartConstants.rightConnectorType));
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.modelservice.isEditable() && !ctx.node.readonly);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.modelservice.isEditable() && !ctx.node.readonly);
    } }, directives: [NgForOf, NgIf, FcMagnetDirective, FcConnectorDirective], styles: ["[_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%]{position:absolute;pointer-events:none;left:0;top:0;right:0;bottom:0;background-color:#000;opacity:0}[_nghost-%COMP%]   .fc-hover[_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%], .fc-hover   [_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%]{opacity:.25;-webkit-transition:opacity .2s;transition:opacity .2s}[_nghost-%COMP%]   .fc-selected[_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%], .fc-selected   [_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%]{opacity:.25}[_nghost-%COMP%]   .innerNode[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}[_nghost-%COMP%]   .innerNode[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0 15px;text-align:center}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DefaultFcNodeComponent, [{
        type: Component,
        args: [{
                selector: 'fc-default-node',
                templateUrl: './default-node.component.html',
                styleUrls: ['./default-node.component.scss']
            }]
    }], function () { return []; }, null); })();

class NgxFlowchartModule {
}
NgxFlowchartModule.ɵmod = ɵɵdefineNgModule({ type: NgxFlowchartModule });
NgxFlowchartModule.ɵinj = ɵɵdefineInjector({ factory: function NgxFlowchartModule_Factory(t) { return new (t || NgxFlowchartModule)(); }, providers: [
        FcModelValidationService,
        FcEdgeDrawingService,
        {
            provide: FC_NODE_COMPONENT_CONFIG,
            useValue: {
                nodeComponentType: DefaultFcNodeComponent
            }
        }
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxFlowchartModule, { declarations: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        FcNodeContainerComponent,
        DefaultFcNodeComponent], imports: [CommonModule], exports: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        DefaultFcNodeComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxFlowchartModule, [{
        type: NgModule,
        args: [{
                entryComponents: [
                    DefaultFcNodeComponent
                ],
                declarations: [NgxFlowchartComponent,
                    FcMagnetDirective,
                    FcConnectorDirective,
                    FcNodeContainerComponent,
                    DefaultFcNodeComponent],
                providers: [
                    FcModelValidationService,
                    FcEdgeDrawingService,
                    {
                        provide: FC_NODE_COMPONENT_CONFIG,
                        useValue: {
                            nodeComponentType: DefaultFcNodeComponent
                        }
                    }
                ],
                imports: [
                    CommonModule
                ],
                exports: [NgxFlowchartComponent,
                    FcMagnetDirective,
                    FcConnectorDirective,
                    DefaultFcNodeComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-flowchart
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultFcNodeComponent, FC_NODE_COMPONENT_CONFIG, FcConnectorDirective, FcMagnetDirective, FcNodeComponent, FlowchartConstants, ModelvalidationError, NgxFlowchartComponent, NgxFlowchartModule, fcTopSort };
//# sourceMappingURL=ngx-flowchart.js.map
