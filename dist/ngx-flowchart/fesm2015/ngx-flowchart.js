import { InjectionToken, Injectable, Component, ChangeDetectionStrategy, ElementRef, IterableDiffers, ChangeDetectorRef, NgZone, HostBinding, Input, HostListener, Directive, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
/**
 * @record
 */
function FcNodeComponentConfig() { }
if (false) {
    /** @type {?} */
    FcNodeComponentConfig.prototype.nodeComponentType;
}
/** @type {?} */
const htmlPrefix = 'fc';
/** @type {?} */
const leftConnectorType = 'leftConnector';
/** @type {?} */
const rightConnectorType = 'rightConnector';
/** @type {?} */
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
/**
 * @record
 */
function FcCoords() { }
if (false) {
    /** @type {?|undefined} */
    FcCoords.prototype.x;
    /** @type {?|undefined} */
    FcCoords.prototype.y;
}
/**
 * @record
 */
function FcOffset() { }
if (false) {
    /** @type {?} */
    FcOffset.prototype.top;
    /** @type {?} */
    FcOffset.prototype.left;
}
/**
 * @record
 */
function FcRectBox() { }
if (false) {
    /** @type {?} */
    FcRectBox.prototype.top;
    /** @type {?} */
    FcRectBox.prototype.left;
    /** @type {?} */
    FcRectBox.prototype.right;
    /** @type {?} */
    FcRectBox.prototype.bottom;
}
/**
 * @record
 */
function FcConnector() { }
if (false) {
    /** @type {?} */
    FcConnector.prototype.id;
    /** @type {?} */
    FcConnector.prototype.type;
}
/**
 * @record
 */
function FcNode() { }
if (false) {
    /** @type {?} */
    FcNode.prototype.id;
    /** @type {?} */
    FcNode.prototype.name;
    /** @type {?} */
    FcNode.prototype.connectors;
    /** @type {?|undefined} */
    FcNode.prototype.readonly;
    /* Skipping unhandled member: [key: string]: any;*/
}
/**
 * @record
 */
function FcEdge() { }
if (false) {
    /** @type {?|undefined} */
    FcEdge.prototype.label;
    /** @type {?|undefined} */
    FcEdge.prototype.source;
    /** @type {?|undefined} */
    FcEdge.prototype.destination;
    /** @type {?|undefined} */
    FcEdge.prototype.active;
}
/**
 * @record
 */
function FcItemInfo() { }
if (false) {
    /** @type {?|undefined} */
    FcItemInfo.prototype.node;
    /** @type {?|undefined} */
    FcItemInfo.prototype.edge;
}
/**
 * @record
 */
function FcModel() { }
if (false) {
    /** @type {?} */
    FcModel.prototype.nodes;
    /** @type {?} */
    FcModel.prototype.edges;
}
/**
 * @record
 */
function UserCallbacks() { }
if (false) {
    /** @type {?|undefined} */
    UserCallbacks.prototype.dropNode;
    /** @type {?|undefined} */
    UserCallbacks.prototype.createEdge;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeAdded;
    /** @type {?|undefined} */
    UserCallbacks.prototype.nodeRemoved;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeRemoved;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeDoubleClick;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeMouseOver;
    /** @type {?|undefined} */
    UserCallbacks.prototype.isValidEdge;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeEdit;
    /** @type {?|undefined} */
    UserCallbacks.prototype.nodeCallbacks;
}
/**
 * @record
 */
function UserNodeCallbacks() { }
if (false) {
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.nodeEdit;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.doubleClick;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.mouseDown;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.mouseEnter;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.mouseLeave;
}
/**
 * @record
 */
function FcCallbacks() { }
if (false) {
    /** @type {?} */
    FcCallbacks.prototype.nodeDragstart;
    /** @type {?} */
    FcCallbacks.prototype.nodeDragend;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragstart;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragend;
    /** @type {?} */
    FcCallbacks.prototype.edgeDrop;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragoverConnector;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragoverMagnet;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragleaveMagnet;
    /** @type {?} */
    FcCallbacks.prototype.nodeMouseOver;
    /** @type {?} */
    FcCallbacks.prototype.nodeMouseOut;
    /** @type {?} */
    FcCallbacks.prototype.connectorMouseEnter;
    /** @type {?} */
    FcCallbacks.prototype.connectorMouseLeave;
    /** @type {?} */
    FcCallbacks.prototype.nodeClicked;
}
/**
 * @record
 */
function FcAdjacentList() { }
class BaseError {
    constructor() {
        Error.apply(this, arguments);
    }
}
BaseError.prototype = new Error();
class ModelvalidationError extends BaseError {
    /**
     * @param {?} message
     */
    constructor(message) {
        super();
        this.message = message;
    }
}
if (false) {
    /** @type {?} */
    ModelvalidationError.prototype.message;
}
/**
 * @param {?} graph
 * @return {?}
 */
function fcTopSort(graph) {
    /** @type {?} */
    const adjacentList = {};
    graph.nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    (node) => {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    }));
    graph.edges.forEach((/**
     * @param {?} edge
     * @return {?}
     */
    (edge) => {
        /** @type {?} */
        const sourceNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            (connector) => {
                return connector.id === edge.source;
            }));
        }))[0];
        /** @type {?} */
        const destinationNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            (connector) => {
                return connector.id === edge.destination;
            }));
        }))[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    }));
    /** @type {?} */
    const orderedNodes = [];
    /** @type {?} */
    const sourceNodes = [];
    for (const node of Object.keys(adjacentList)) {
        /** @type {?} */
        const edges = adjacentList[node];
        if (edges.incoming === 0) {
            sourceNodes.push(node);
        }
    }
    while (sourceNodes.length !== 0) {
        /** @type {?} */
        const sourceNode = sourceNodes.pop();
        for (let i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
            /** @type {?} */
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
    /** @type {?} */
    let hasEdges = false;
    for (const node of Object.keys(adjacentList)) {
        /** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcModelService {
    /**
     * @param {?} modelValidation
     * @param {?} model
     * @param {?} cd
     * @param {?} selectedObjects
     * @param {?} dropNode
     * @param {?} createEdge
     * @param {?} edgeAddedCallback
     * @param {?} nodeRemovedCallback
     * @param {?} edgeRemovedCallback
     * @param {?} canvasHtmlElement
     * @param {?} svgHtmlElement
     */
    constructor(modelValidation, model, cd, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
        this.connectorsHtmlElements = {};
        this.nodesHtmlElements = {};
        this.canvasHtmlElement = null;
        this.dragImage = null;
        this.svgHtmlElement = null;
        this.modelValidation = modelValidation;
        this.model = model;
        this.cd = cd;
        this.canvasHtmlElement = canvasHtmlElement;
        this.svgHtmlElement = svgHtmlElement;
        this.modelValidation.validateModel(this.model);
        this.selectedObjects = selectedObjects;
        this.dropNode = dropNode || ((/**
         * @return {?}
         */
        () => { }));
        this.createEdge = createEdge || ((/**
         * @param {?} event
         * @param {?} edge
         * @return {?}
         */
        (event, edge) => of(Object.assign({}, edge, { label: 'label' }))));
        this.edgeAddedCallback = edgeAddedCallback || ((/**
         * @return {?}
         */
        () => { }));
        this.nodeRemovedCallback = nodeRemovedCallback || ((/**
         * @return {?}
         */
        () => { }));
        this.edgeRemovedCallback = edgeRemovedCallback || ((/**
         * @return {?}
         */
        () => { }));
        this.connectors = new ConnectorsModel(this);
        this.nodes = new NodesModel(this);
        this.edges = new EdgesModel(this);
    }
    /**
     * @return {?}
     */
    detectChanges() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.cd.detectChanges();
        }), 0);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    selectObject(object) {
        if (this.isEditable()) {
            if (this.selectedObjects.indexOf(object) === -1) {
                this.selectedObjects.push(object);
            }
        }
    }
    /**
     * @param {?} object
     * @return {?}
     */
    deselectObject(object) {
        if (this.isEditable()) {
            /** @type {?} */
            const index = this.selectedObjects.indexOf(object);
            if (index === -1) {
                throw new Error('Tried to deselect an unselected object');
            }
            this.selectedObjects.splice(index, 1);
        }
    }
    /**
     * @param {?} object
     * @return {?}
     */
    toggleSelectedObject(object) {
        if (this.isSelectedObject(object)) {
            this.deselectObject(object);
        }
        else {
            this.selectObject(object);
        }
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isSelectedObject(object) {
        return this.selectedObjects.indexOf(object) !== -1;
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        node => {
            if (!node.readonly) {
                this.nodes.select(node);
            }
        }));
        this.model.edges.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        edge => {
            this.edges.select(edge);
        }));
        this.detectChanges();
    }
    /**
     * @return {?}
     */
    deselectAll() {
        this.selectedObjects.splice(0, this.selectedObjects.length);
        this.detectChanges();
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isEditObject(object) {
        return this.selectedObjects.length === 1 &&
            this.selectedObjects.indexOf(object) !== -1;
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} rectBox
     * @return {?}
     */
    inRectBox(x, y, rectBox) {
        return x >= rectBox.left && x <= rectBox.right &&
            y >= rectBox.top && y <= rectBox.bottom;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getItemInfoAtPoint(x, y) {
        return {
            node: this.getNodeAtPoint(x, y),
            edge: this.getEdgeAtPoint(x, y)
        };
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getNodeAtPoint(x, y) {
        for (const node of this.model.nodes) {
            /** @type {?} */
            const element = this.nodes.getHtmlElement(node.id);
            /** @type {?} */
            const nodeElementBox = element.getBoundingClientRect();
            if (x >= nodeElementBox.left && x <= nodeElementBox.right
                && y >= nodeElementBox.top && y <= nodeElementBox.bottom) {
                return node;
            }
        }
        return null;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    getEdgeAtPoint(x, y) {
        /** @type {?} */
        const element = document.elementFromPoint(x, y);
        /** @type {?} */
        const id = element.id;
        /** @type {?} */
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
    /**
     * @param {?} rectBox
     * @return {?}
     */
    selectAllInRect(rectBox) {
        this.model.nodes.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const element = this.nodes.getHtmlElement(value.id);
            /** @type {?} */
            const nodeElementBox = element.getBoundingClientRect();
            if (!value.readonly) {
                /** @type {?} */
                const x = nodeElementBox.left + nodeElementBox.width / 2;
                /** @type {?} */
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
        }));
        /** @type {?} */
        const canvasElementBox = this.canvasHtmlElement.getBoundingClientRect();
        this.model.edges.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const start = this.edges.sourceCoord(value);
            /** @type {?} */
            const end = this.edges.destCoord(value);
            /** @type {?} */
            const x = (start.x + end.x) / 2 + canvasElementBox.left;
            /** @type {?} */
            const y = (start.y + end.y) / 2 + canvasElementBox.top;
            if (this.inRectBox(x, y, rectBox)) {
                this.edges.select(value);
            }
            else {
                if (this.edges.isSelected(value)) {
                    this.edges.deselect(value);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    deleteSelected() {
        /** @type {?} */
        const edgesToDelete = this.edges.getSelectedEdges();
        edgesToDelete.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        (edge) => {
            this.edges.delete(edge);
        }));
        /** @type {?} */
        const nodesToDelete = this.nodes.getSelectedNodes();
        nodesToDelete.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            this.nodes.delete(node);
        }));
    }
    /**
     * @return {?}
     */
    isEditable() {
        return this.dropTargetId === undefined;
    }
    /**
     * @return {?}
     */
    isDropSource() {
        return this.dropTargetId !== undefined;
    }
    /**
     * @return {?}
     */
    getDragImage() {
        if (!this.dragImage) {
            this.dragImage = new Image();
            this.dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            this.dragImage.style.visibility = 'hidden';
        }
        return this.dragImage;
    }
    /**
     * @param {?} edgeAddedCallback
     * @param {?} nodeRemovedCallback
     * @param {?} edgeRemovedCallback
     * @return {?}
     */
    registerCallbacks(edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback) {
        this.edgeAddedCallback = edgeAddedCallback;
        this.nodeRemovedCallback = nodeRemovedCallback;
        this.edgeRemovedCallback = edgeRemovedCallback;
    }
}
if (false) {
    /** @type {?} */
    FcModelService.prototype.modelValidation;
    /** @type {?} */
    FcModelService.prototype.model;
    /** @type {?} */
    FcModelService.prototype.cd;
    /** @type {?} */
    FcModelService.prototype.selectedObjects;
    /** @type {?} */
    FcModelService.prototype.connectorsHtmlElements;
    /** @type {?} */
    FcModelService.prototype.nodesHtmlElements;
    /** @type {?} */
    FcModelService.prototype.canvasHtmlElement;
    /** @type {?} */
    FcModelService.prototype.dragImage;
    /** @type {?} */
    FcModelService.prototype.svgHtmlElement;
    /** @type {?} */
    FcModelService.prototype.dropNode;
    /** @type {?} */
    FcModelService.prototype.createEdge;
    /** @type {?} */
    FcModelService.prototype.edgeAddedCallback;
    /** @type {?} */
    FcModelService.prototype.nodeRemovedCallback;
    /** @type {?} */
    FcModelService.prototype.edgeRemovedCallback;
    /** @type {?} */
    FcModelService.prototype.dropTargetId;
    /** @type {?} */
    FcModelService.prototype.connectors;
    /** @type {?} */
    FcModelService.prototype.nodes;
    /** @type {?} */
    FcModelService.prototype.edges;
}
/**
 * @record
 */
function HtmlElementMap() { }
/**
 * @abstract
 * @template T
 */
class AbstractFcModel {
    /**
     * @protected
     * @param {?} modelService
     */
    constructor(modelService) {
        this.modelService = modelService;
    }
    /**
     * @param {?} object
     * @return {?}
     */
    select(object) {
        this.modelService.selectObject(object);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    deselect(object) {
        this.modelService.deselectObject(object);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    toggleSelected(object) {
        this.modelService.toggleSelectedObject(object);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isSelected(object) {
        return this.modelService.isSelectedObject(object);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    isEdit(object) {
        return this.modelService.isEditObject(object);
    }
}
if (false) {
    /** @type {?} */
    AbstractFcModel.prototype.modelService;
}
class ConnectorsModel extends AbstractFcModel {
    /**
     * @param {?} modelService
     */
    constructor(modelService) {
        super(modelService);
    }
    /**
     * @param {?} connectorId
     * @return {?}
     */
    getConnector(connectorId) {
        /** @type {?} */
        const model = this.modelService.model;
        for (const node of model.nodes) {
            for (const connector of node.connectors) {
                if (connector.id === connectorId) {
                    return connector;
                }
            }
        }
    }
    /**
     * @param {?} connectorId
     * @return {?}
     */
    getHtmlElement(connectorId) {
        return this.modelService.connectorsHtmlElements[connectorId];
    }
    /**
     * @param {?} connectorId
     * @param {?} element
     * @return {?}
     */
    setHtmlElement(connectorId, element) {
        this.modelService.connectorsHtmlElements[connectorId] = element;
        this.modelService.detectChanges();
    }
    /**
     * @private
     * @param {?} connectorId
     * @param {?=} centered
     * @return {?}
     */
    _getCoords(connectorId, centered) {
        /** @type {?} */
        const element = this.getHtmlElement(connectorId);
        /** @type {?} */
        const canvas = this.modelService.canvasHtmlElement;
        if (element === null || element === undefined || canvas === null) {
            return { x: 0, y: 0 };
        }
        /** @type {?} */
        const connectorElementBox = element.getBoundingClientRect();
        /** @type {?} */
        const canvasElementBox = canvas.getBoundingClientRect();
        /** @type {?} */
        let coords = {
            x: connectorElementBox.left - canvasElementBox.left,
            y: connectorElementBox.top - canvasElementBox.top
        };
        if (centered) {
            coords = {
                x: Math.round(coords.x + element.offsetWidth / 2),
                y: Math.round(coords.y + element.offsetHeight / 2)
            };
        }
        return coords;
    }
    /**
     * @param {?} connectorId
     * @return {?}
     */
    getCoords(connectorId) {
        return this._getCoords(connectorId, false);
    }
    /**
     * @param {?} connectorId
     * @return {?}
     */
    getCenteredCoord(connectorId) {
        return this._getCoords(connectorId, true);
    }
}
class NodesModel extends AbstractFcModel {
    /**
     * @param {?} modelService
     */
    constructor(modelService) {
        super(modelService);
    }
    /**
     * @param {?} node
     * @param {?} type
     * @return {?}
     */
    getConnectorsByType(node, type) {
        return node.connectors.filter((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => {
            return connector.type === type;
        }));
    }
    /**
     * @private
     * @param {?} node
     * @param {?} connector
     * @return {?}
     */
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
    /**
     * @param {?} node
     * @return {?}
     */
    delete(node) {
        if (this.isSelected(node)) {
            this.deselect(node);
        }
        /** @type {?} */
        const model = this.modelService.model;
        /** @type {?} */
        const index = model.nodes.indexOf(node);
        if (index === -1) {
            if (node === undefined) {
                throw new Error('Passed undefined');
            }
            throw new Error('Tried to delete not existing node');
        }
        /** @type {?} */
        const connectorIds = this.getConnectorIds(node);
        for (let i = 0; i < model.edges.length; i++) {
            /** @type {?} */
            const edge = model.edges[i];
            if (connectorIds.indexOf(edge.source) !== -1 || connectorIds.indexOf(edge.destination) !== -1) {
                this.modelService.edges.delete(edge);
                i--;
            }
        }
        model.nodes.splice(index, 1);
        this.modelService.nodeRemovedCallback(node);
    }
    /**
     * @return {?}
     */
    getSelectedNodes() {
        /** @type {?} */
        const model = this.modelService.model;
        return model.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return this.modelService.nodes.isSelected(node);
        }));
    }
    /**
     * @param {?} node
     * @param {?=} ctrlKey
     * @return {?}
     */
    handleClicked(node, ctrlKey) {
        if (ctrlKey) {
            this.modelService.nodes.toggleSelected(node);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.nodes.select(node);
        }
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    _addNode(node) {
        /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    getConnectorIds(node) {
        return node.connectors.map((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => {
            return connector.id;
        }));
    }
    /**
     * @param {?} connectorId
     * @return {?}
     */
    getNodeByConnectorId(connectorId) {
        /** @type {?} */
        const model = this.modelService.model;
        for (const node of model.nodes) {
            /** @type {?} */
            const connectorIds = this.getConnectorIds(node);
            if (connectorIds.indexOf(connectorId) > -1) {
                return node;
            }
        }
        return null;
    }
    /**
     * @param {?} nodeId
     * @return {?}
     */
    getHtmlElement(nodeId) {
        return this.modelService.nodesHtmlElements[nodeId];
    }
    /**
     * @param {?} nodeId
     * @param {?} element
     * @return {?}
     */
    setHtmlElement(nodeId, element) {
        this.modelService.nodesHtmlElements[nodeId] = element;
        this.modelService.detectChanges();
    }
}
class EdgesModel extends AbstractFcModel {
    /**
     * @param {?} modelService
     */
    constructor(modelService) {
        super(modelService);
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    ready(edge) {
        /** @type {?} */
        const source = this.modelService.connectors.getHtmlElement(edge.source);
        /** @type {?} */
        const destination = this.modelService.connectors.getHtmlElement(edge.destination);
        return source !== undefined && destination !== undefined;
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    sourceCoord(edge) {
        return this.modelService.connectors.getCenteredCoord(edge.source);
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    destCoord(edge) {
        return this.modelService.connectors.getCenteredCoord(edge.destination);
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    delete(edge) {
        /** @type {?} */
        const model = this.modelService.model;
        /** @type {?} */
        const index = model.edges.indexOf(edge);
        if (index === -1) {
            throw new Error('Tried to delete not existing edge');
        }
        if (this.isSelected(edge)) {
            this.deselect(edge);
        }
        model.edges.splice(index, 1);
        this.modelService.edgeRemovedCallback(edge);
    }
    /**
     * @return {?}
     */
    getSelectedEdges() {
        /** @type {?} */
        const model = this.modelService.model;
        return model.edges.filter((/**
         * @param {?} edge
         * @return {?}
         */
        (edge) => {
            return this.modelService.edges.isSelected(edge);
        }));
    }
    /**
     * @param {?} edge
     * @param {?=} ctrlKey
     * @return {?}
     */
    handleEdgeMouseClick(edge, ctrlKey) {
        if (ctrlKey) {
            this.modelService.edges.toggleSelected(edge);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.edges.select(edge);
        }
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    putEdge(edge) {
        /** @type {?} */
        const model = this.modelService.model;
        model.edges.push(edge);
    }
    /**
     * @param {?} event
     * @param {?} sourceConnector
     * @param {?} destConnector
     * @param {?} label
     * @return {?}
     */
    _addEdge(event, sourceConnector, destConnector, label) {
        this.modelService.modelValidation.validateConnector(sourceConnector);
        this.modelService.modelValidation.validateConnector(destConnector);
        /** @type {?} */
        const edge = {};
        edge.source = sourceConnector.id;
        edge.destination = destConnector.id;
        edge.label = label;
        /** @type {?} */
        const model = this.modelService.model;
        this.modelService.modelValidation.validateEdges(model.edges.concat([edge]), model.nodes);
        this.modelService.createEdge(event, edge).subscribe((/**
         * @param {?} created
         * @return {?}
         */
        (created) => {
            model.edges.push(created);
            this.modelService.edgeAddedCallback(created);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcModelValidationService {
    constructor() { }
    /**
     * @param {?} model
     * @return {?}
     */
    validateModel(model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    validateNodes(nodes) {
        /** @type {?} */
        const ids = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        }));
        /** @type {?} */
        const connectorIds = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            node.connectors.forEach((/**
             * @param {?} connector
             * @return {?}
             */
            (connector) => {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            }));
        }));
        return nodes;
    }
    /**
     * @param {?} node
     * @return {?}
     */
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
        node.connectors.forEach((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => {
            this.validateConnector(connector);
        }));
        return node;
    }
    /**
     * @private
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    _validateEdges(edges, nodes) {
        edges.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        (edge) => {
            this._validateEdge(edge, nodes);
        }));
        edges.forEach((/**
         * @param {?} edge1
         * @param {?} index1
         * @return {?}
         */
        (edge1, index1) => {
            edges.forEach((/**
             * @param {?} edge2
             * @param {?} index2
             * @return {?}
             */
            (edge2, index2) => {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            }));
        }));
        if (fcTopSort({ nodes, edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    }
    /**
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    validateEdges(edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    }
    /**
     * @private
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
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
        /** @type {?} */
        const sourceNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => connector.id === edge.source))))[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        /** @type {?} */
        const destinationNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => connector.id === edge.destination))))[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    }
    /**
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    validateEdge(edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    }
    /**
     * @param {?} connector
     * @return {?}
     */
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
FcModelValidationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FcModelValidationService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const nodeDropScope = {
    dropElement: null
};
class FcNodeDraggingService {
    /**
     * @param {?} modelService
     * @param {?} applyFunction
     * @param {?} automaticResize
     * @param {?} dragAnimation
     */
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
    /**
     * @private
     * @param {?} coordinate
     * @param {?} max
     * @return {?}
     */
    getCoordinate(coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    }
    /**
     * @private
     * @param {?} x
     * @return {?}
     */
    getXCoordinate(x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    }
    /**
     * @private
     * @param {?} y
     * @return {?}
     */
    getYCoordinate(y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    }
    /**
     * @private
     * @param {?} draggedNode
     * @param {?} nodeElement
     * @return {?}
     */
    resizeCanvas(draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            /** @type {?} */
            const canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isDraggingNode(node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
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
        /** @type {?} */
        const elements = [];
        /** @type {?} */
        const nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            /** @type {?} */
            const selectedNodes = this.modelService.nodes.getSelectedNodes();
            for (const selectedNode of selectedNodes) {
                /** @type {?} */
                const element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
                elements.push(element);
                nodes.push(selectedNode);
            }
        }
        else {
            elements.push($((/** @type {?} */ (event.target))));
            nodes.push(node);
        }
        /** @type {?} */
        const offsetsX = [];
        /** @type {?} */
        const offsetsY = [];
        for (const element of elements) {
            offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
            offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
        }
        /** @type {?} */
        const originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = (/** @type {?} */ (elements[0][0].cloneNode(true)));
            /** @type {?} */
            const offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
            /** @type {?} */
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
                /** @type {?} */
                const target = (/** @type {?} */ (event.target));
                this.destinationHtmlElements.push(target);
                this.oldDisplayStyles.push(target.style.display);
                target.style.display = 'none';
                this.nodeDraggingScope.shadowDragStarted = true;
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
                /** @type {?} */
                const dragOffset = this.dragOffsets[i];
                /** @type {?} */
                const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                /** @type {?} */
                const shadowElement = $(`<div style="position: absolute; opacity: 0.7; ` +
                    `top: ${this.getYCoordinate(dragOffset.y + event.clientY)}px; ` +
                    `left: ${this.getXCoordinate(dragOffset.x + event.clientX)}px; ">` +
                    `<div class="innerNode"><p style="padding: 0 15px;">${draggedNode.name}</p> </div></div>`);
                /** @type {?} */
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
            for (let i = 0; i < this.draggedElements.length; i++) {
                this.destinationHtmlElements.push(this.draggedElements[i]);
                this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                this.destinationHtmlElements[i].style.display = 'none';
            }
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                this.nodeDraggingScope.shadowDragStarted = true;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        /** @type {?} */
        let dropNode = null;
        /** @type {?} */
        const originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        /** @type {?} */
        const infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            /** @type {?} */
            let dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    /** @type {?} */
                    const offset = $(this.modelService.canvasHtmlElement).offset();
                    /** @type {?} */
                    const x = event.clientX - offset.left;
                    /** @type {?} */
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
            return this.applyFunction((/**
             * @return {?}
             */
            () => {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    const dragOffset = this.dragOffsets[i];
                    draggedNode.x = Math.round(this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                return false;
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        if (nodeDropScope.dropElement) {
            /** @type {?} */
            const offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    this.destinationHtmlElements[0].style.display = this.oldDisplayStyles[0];
                    this.nodeDraggingScope.shadowDragStarted = false;
                }));
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
                return this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                        /** @type {?} */
                        const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                        /** @type {?} */
                        const dragOffset = this.dragOffsets[i];
                        draggedNode.x = this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = this.getYCoordinate(dragOffset.y + event.clientY);
                        this.resizeCanvas(draggedNode, this.draggedElements[i]);
                    }
                    event.preventDefault();
                    return false;
                }));
            }
        }
        else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                if (this.nodeDraggingScope.shadowDragStarted) {
                    this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                            this.destinationHtmlElements[i].style.display = this.oldDisplayStyles[i];
                        }
                        this.nodeDraggingScope.shadowDragStarted = false;
                    }));
                }
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    const dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
        this.applyFunction((/**
         * @return {?}
         */
        () => {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (this.modelService.isDropSource()) {
                return;
            }
            if (this.nodeDraggingScope.shadowElements.length) {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    const shadowElement = this.nodeDraggingScope.shadowElements[i];
                    draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
                    draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
                    this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
                }
                this.nodeDraggingScope.shadowElements.length = 0;
            }
            if (this.nodeDraggingScope.draggedNodes.length) {
                this.nodeDraggingScope.draggedNodes.length = 0;
                this.draggedElements.length = 0;
                this.dragOffsets.length = 0;
            }
        }));
    }
}
if (false) {
    /** @type {?} */
    FcNodeDraggingService.prototype.nodeDraggingScope;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.dragOffsets;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.draggedElements;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.destinationHtmlElements;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.oldDisplayStyles;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.modelService;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.automaticResize;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.dragAnimation;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.applyFunction;
}
/**
 * @record
 */
function NodeDraggingScope() { }
if (false) {
    /** @type {?} */
    NodeDraggingScope.prototype.draggedNodes;
    /** @type {?} */
    NodeDraggingScope.prototype.shadowElements;
    /** @type {?} */
    NodeDraggingScope.prototype.shadowDragStarted;
    /** @type {?} */
    NodeDraggingScope.prototype.dropElement;
}
/**
 * @record
 */
function NodeDropElement() { }
if (false) {
    /** @type {?|undefined} */
    NodeDropElement.prototype.offsetInfo;
}
/**
 * @record
 */
function NodeDropScope() { }
if (false) {
    /** @type {?} */
    NodeDropScope.prototype.dropElement;
}
/**
 * @record
 */
function DropNodeInfo() { }
if (false) {
    /** @type {?} */
    DropNodeInfo.prototype.node;
    /** @type {?} */
    DropNodeInfo.prototype.dropTargetId;
    /** @type {?} */
    DropNodeInfo.prototype.offsetX;
    /** @type {?} */
    DropNodeInfo.prototype.offsetY;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcEdgeDrawingService {
    constructor() {
    }
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @param {?} style
     * @return {?}
     */
    getEdgeDAttribute(pt1, pt2, style) {
        /** @type {?} */
        let dAddribute = `M ${pt1.x}, ${pt1.y} `;
        if (style === FlowchartConstants.curvedStyle) {
            /** @type {?} */
            const sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            /** @type {?} */
            const destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += `C ${sourceTangent.x}, ${sourceTangent.y} ${(destinationTangent.x - 50)}, ${destinationTangent.y} ${pt2.x}, ${pt2.y}`;
        }
        else {
            dAddribute += `L ${pt2.x}, ${pt2.y}`;
        }
        return dAddribute;
    }
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    getEdgeCenter(pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    }
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    computeEdgeTangentOffset(pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    }
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    computeEdgeSourceTangent(pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    computeEdgeDestinationTangent(pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
}
FcEdgeDrawingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FcEdgeDrawingService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcEdgeDraggingService {
    /**
     * @param {?} modelValidation
     * @param {?} edgeDrawingService
     * @param {?} modelService
     * @param {?} model
     * @param {?} isValidEdgeCallback
     * @param {?} applyFunction
     * @param {?} dragAnimation
     * @param {?} edgeStyle
     */
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
        this.isValidEdgeCallback = isValidEdgeCallback || ((/**
         * @return {?}
         */
        () => true));
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    dragstart(event, connector) {
        /** @type {?} */
        let swapConnector;
        /** @type {?} */
        let dragLabel;
        /** @type {?} */
        let prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            for (const edge of this.model.edges) {
                if (edge.destination === connector.id) {
                    swapConnector = this.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        this.modelService.edges.delete(edge);
                    }));
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
        /** @type {?} */
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
        /** @type {?} */
        const originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        originalEvent.dataTransfer.setData('Text', 'Just to support firefox');
        if (originalEvent.dataTransfer.setDragImage) {
            originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
        }
        else {
            this.destinationHtmlElement = (/** @type {?} */ (event.target));
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
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        this.edgeDragging.shadowDragStarted = false;
                    }));
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
                return this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    if (this.destinationHtmlElement !== null) {
                        this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                    }
                    this.edgeDragging.dragPoint2 = {
                        x: event.clientX + this.dragOffset.x,
                        y: event.clientY + this.dragOffset.y
                    };
                }));
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    dragleaveMagnet(event) {
        this.edgeDragging.magnetActive = false;
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
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
                    return this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }));
                }
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
                /** @type {?} */
                const edge = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    this.modelService.edges.putEdge(edge);
                }));
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} targetConnector
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    FcEdgeDraggingService.prototype.edgeDragging;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.draggedEdgeSource;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.dragOffset;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.destinationHtmlElement;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.oldDisplayStyle;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.modelValidation;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.edgeDrawingService;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.modelService;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.model;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.isValidEdgeCallback;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.applyFunction;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.dragAnimation;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.edgeStyle;
}
/**
 * @record
 */
function EdgeDragging() { }
if (false) {
    /** @type {?} */
    EdgeDragging.prototype.isDragging;
    /** @type {?} */
    EdgeDragging.prototype.shadowDragStarted;
    /** @type {?} */
    EdgeDragging.prototype.dragPoint1;
    /** @type {?} */
    EdgeDragging.prototype.dragPoint2;
    /** @type {?|undefined} */
    EdgeDragging.prototype.dragLabel;
    /** @type {?|undefined} */
    EdgeDragging.prototype.prevEdge;
    /** @type {?|undefined} */
    EdgeDragging.prototype.magnetActive;
    /** @type {?|undefined} */
    EdgeDragging.prototype.gElement;
    /** @type {?|undefined} */
    EdgeDragging.prototype.pathElement;
    /** @type {?|undefined} */
    EdgeDragging.prototype.circleElement;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcMouseOverService {
    /**
     * @param {?} applyFunction
     */
    constructor(applyFunction) {
        this.mouseoverscope = {
            connector: null,
            edge: null,
            node: null
        };
        this.applyFunction = applyFunction;
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    nodeMouseOver(event, node) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.node = node;
        }));
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    nodeMouseOut(event, node) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.node = null;
        }));
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    connectorMouseEnter(event, connector) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.connector = connector;
        }));
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    connectorMouseLeave(event, connector) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.connector = null;
        }));
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseEnter(event, edge) {
        this.mouseoverscope.edge = edge;
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseLeave(event, edge) {
        this.mouseoverscope.edge = null;
    }
}
if (false) {
    /** @type {?} */
    FcMouseOverService.prototype.mouseoverscope;
    /**
     * @type {?}
     * @private
     */
    FcMouseOverService.prototype.applyFunction;
}
/**
 * @record
 */
function MouseOverScope() { }
if (false) {
    /** @type {?} */
    MouseOverScope.prototype.connector;
    /** @type {?} */
    MouseOverScope.prototype.edge;
    /** @type {?} */
    MouseOverScope.prototype.node;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const regex = /(auto|scroll)/;
/** @type {?} */
const style = (/**
 * @param {?} node
 * @param {?} prop
 * @return {?}
 */
(node, prop) => getComputedStyle(node, null).getPropertyValue(prop));
const ɵ0 = style;
/** @type {?} */
const scroll = (/**
 * @param {?} node
 * @return {?}
 */
(node) => regex.test(style(node, 'overflow') +
    style(node, 'overflow-y') +
    style(node, 'overflow-x')));
const ɵ1 = scroll;
/** @type {?} */
const scrollparent = (/**
 * @param {?} node
 * @return {?}
 */
(node) => !node || node === document.body
    ? document.body
    : scroll(node)
        ? node
        : scrollparent((/** @type {?} */ (node.parentNode))));
const ɵ2 = scrollparent;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Rectangle() { }
if (false) {
    /** @type {?} */
    Rectangle.prototype.x1;
    /** @type {?} */
    Rectangle.prototype.x2;
    /** @type {?} */
    Rectangle.prototype.y1;
    /** @type {?} */
    Rectangle.prototype.y2;
}
class FcRectangleSelectService {
    /**
     * @param {?} modelService
     * @param {?} selectElement
     * @param {?} applyFunction
     */
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
    /**
     * @param {?} e
     * @return {?}
     */
    mousedown(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && this.selectElement.hidden) {
            this.selectElement.hidden = false;
            /** @type {?} */
            const offset = this.$canvasElement.offset();
            this.selectRect.x1 = Math.round(e.pageX - offset.left);
            this.selectRect.y1 = Math.round(e.pageY - offset.top);
            this.selectRect.x2 = this.selectRect.x1;
            this.selectRect.y2 = this.selectRect.y1;
            this.updateSelectRect();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mousemove(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            const offset = this.$canvasElement.offset();
            this.selectRect.x2 = Math.round(e.pageX - offset.left);
            this.selectRect.y2 = Math.round(e.pageY - offset.top);
            this.updateScroll(offset);
            this.updateSelectRect();
        }
    }
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    updateScroll(offset) {
        /** @type {?} */
        const rect = this.$scrollParent[0].getBoundingClientRect();
        /** @type {?} */
        const bottom = rect.bottom - offset.top;
        /** @type {?} */
        const right = rect.right - offset.left;
        /** @type {?} */
        const top = rect.top - offset.top;
        /** @type {?} */
        const left = rect.left - offset.left;
        if (this.selectRect.y2 - top < 25) {
            /** @type {?} */
            const topScroll = 25 - (this.selectRect.y2 - top);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll - topScroll);
        }
        else if (bottom - this.selectRect.y2 < 40) {
            /** @type {?} */
            const bottomScroll = 40 - (bottom - this.selectRect.y2);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll + bottomScroll);
        }
        if (this.selectRect.x2 - left < 25) {
            /** @type {?} */
            const leftScroll = 25 - (this.selectRect.x2 - left);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll - leftScroll);
        }
        else if (right - this.selectRect.x2 < 40) {
            /** @type {?} */
            const rightScroll = 40 - (right - this.selectRect.x2);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll + rightScroll);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseup(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            const rectBox = (/** @type {?} */ (this.selectElement.getBoundingClientRect()));
            this.selectElement.hidden = true;
            this.selectObjects(rectBox);
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateSelectRect() {
        /** @type {?} */
        const x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        const x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        const y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
        /** @type {?} */
        const y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
        this.selectElement.style.left = x3 + 'px';
        this.selectElement.style.top = y3 + 'px';
        this.selectElement.style.width = x4 - x3 + 'px';
        this.selectElement.style.height = y4 - y3 + 'px';
    }
    /**
     * @private
     * @param {?} rectBox
     * @return {?}
     */
    selectObjects(rectBox) {
        this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.modelService.selectAllInRect(rectBox);
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.selectRect;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.modelService;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.selectElement;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.$canvasElement;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.$scrollParent;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.applyFunction;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFlowchartComponent {
    /**
     * @param {?} elementRef
     * @param {?} differs
     * @param {?} modelValidation
     * @param {?} edgeDrawingService
     * @param {?} cd
     * @param {?} zone
     */
    constructor(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => {
            return item;
        }));
        this.edgesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => {
            return item;
        }));
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
    }
    /**
     * @return {?}
     */
    get canvasClass() {
        return FlowchartConstants.canvasClass;
    }
    /**
     * @return {?}
     */
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
            /** @type {?} */
            const callback = this.userCallbacks[key];
            if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                throw new Error('All callbacks should be functions.');
            }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.cd, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        /** @type {?} */
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
            nodeClicked: (/**
             * @param {?} event
             * @param {?} node
             * @return {?}
             */
            (event, node) => {
                this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            })
        };
        this.adjustCanvasSize(true);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.model) {
            /** @type {?} */
            const nodesChange = this.nodesDiffer.diff(this.model.nodes);
            /** @type {?} */
            const edgesChange = this.edgesDiffer.diff(this.model.edges);
            /** @type {?} */
            let nodesChanged = false;
            /** @type {?} */
            let edgesChanged = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                () => {
                    nodesChanged = true;
                }));
                nodesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                () => {
                    nodesChanged = true;
                }));
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                () => {
                    edgesChanged = true;
                }));
                edgesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                () => {
                    edgesChanged = true;
                }));
            }
            if (nodesChanged) {
                this.adjustCanvasSize(true);
            }
            if (nodesChanged || edgesChanged) {
                this.cd.detectChanges();
            }
        }
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    getEdgeDAttribute(edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    }
    /**
     * @param {?=} fit
     * @return {?}
     */
    adjustCanvasSize(fit) {
        /** @type {?} */
        let maxX = 0;
        /** @type {?} */
        let maxY = 0;
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            maxX = Math.max(node.x + this.nodeWidth, maxX);
            maxY = Math.max(node.y + this.nodeHeight, maxY);
        }));
        /** @type {?} */
        let width;
        /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    canvasClick(event) { }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseDown(event, edge) {
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeClick(event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeRemove(event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeEdit(event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeDoubleClick(event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseOver(event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseEnter(event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseLeave(event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        this.rectangleSelectService.mousedown(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousemove(event) {
        this.rectangleSelectService.mousemove(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseup(event) {
        this.rectangleSelectService.mouseup(event);
    }
}
NgxFlowchartComponent.decorators = [
    { type: Component, args: [{
                selector: 'fc-canvas',
                template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
            }] }
];
/** @nocollapse */
NgxFlowchartComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: IterableDiffers },
    { type: FcModelValidationService },
    { type: FcEdgeDrawingService },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
NgxFlowchartComponent.propDecorators = {
    canvasClass: [{ type: HostBinding, args: ['attr.class',] }],
    model: [{ type: Input }],
    selectedObjects: [{ type: Input }],
    edgeStyle: [{ type: Input }],
    userCallbacks: [{ type: Input }],
    automaticResize: [{ type: Input }],
    dragAnimation: [{ type: Input }],
    nodeWidth: [{ type: Input }],
    nodeHeight: [{ type: Input }],
    dropTargetId: [{ type: Input }],
    dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    mousemove: [{ type: HostListener, args: ['mousemove', ['$event'],] }],
    mouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxFlowchartComponent.prototype.model;
    /** @type {?} */
    NgxFlowchartComponent.prototype.selectedObjects;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeStyle;
    /** @type {?} */
    NgxFlowchartComponent.prototype.userCallbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.automaticResize;
    /** @type {?} */
    NgxFlowchartComponent.prototype.dragAnimation;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeWidth;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeHeight;
    /** @type {?} */
    NgxFlowchartComponent.prototype.dropTargetId;
    /** @type {?} */
    NgxFlowchartComponent.prototype.callbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.modelService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeDraggingService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeDraggingService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.mouseoverService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.rectangleSelectService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.arrowDefId;
    /** @type {?} */
    NgxFlowchartComponent.prototype.arrowDefIdSelected;
    /** @type {?} */
    NgxFlowchartComponent.prototype.flowchartConstants;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.nodesDiffer;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.edgesDiffer;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.modelValidation;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeDrawingService;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.zone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcMagnetDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragleave(event) {
        this.callbacks.edgeDragleaveMagnet(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        return this.callbacks.edgeDrop(event, this.connector);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
        this.callbacks.edgeDragend(event);
    }
}
FcMagnetDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fc-magnet]'
            },] }
];
/** @nocollapse */
FcMagnetDirective.ctorParameters = () => [
    { type: ElementRef }
];
FcMagnetDirective.propDecorators = {
    callbacks: [{ type: Input }],
    connector: [{ type: Input }],
    dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    dragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    FcMagnetDirective.prototype.callbacks;
    /** @type {?} */
    FcMagnetDirective.prototype.connector;
    /** @type {?} */
    FcMagnetDirective.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcConnectorDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        this.modelservice.connectors.setHtmlElement(this.connector.id, element[0]);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let updateConnector = false;
        for (const propName of Object.keys(changes)) {
            /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    updateConnectorClass() {
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragstart(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseenter(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseleave(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    }
}
FcConnectorDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fc-connector]'
            },] }
];
/** @nocollapse */
FcConnectorDirective.ctorParameters = () => [
    { type: ElementRef }
];
FcConnectorDirective.propDecorators = {
    callbacks: [{ type: Input }],
    modelservice: [{ type: Input }],
    connector: [{ type: Input }],
    mouseOverConnector: [{ type: Input }],
    dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }],
    dragstart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    mouseenter: [{ type: HostListener, args: ['mouseenter', ['$event'],] }],
    mouseleave: [{ type: HostListener, args: ['mouseleave', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    FcConnectorDirective.prototype.callbacks;
    /** @type {?} */
    FcConnectorDirective.prototype.modelservice;
    /** @type {?} */
    FcConnectorDirective.prototype.connector;
    /** @type {?} */
    FcConnectorDirective.prototype.mouseOverConnector;
    /** @type {?} */
    FcConnectorDirective.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FcNodeContainerComponent {
    /**
     * @param {?} nodeComponentConfig
     * @param {?} elementRef
     * @param {?} componentFactoryResolver
     */
    constructor(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    get nodeId() {
        return this.node.id;
    }
    /**
     * @return {?}
     */
    get top() {
        return this.node.y + 'px';
    }
    /**
     * @return {?}
     */
    get left() {
        return this.node.x + 'px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || ((/**
         * @return {?}
         */
        () => { }));
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || ((/**
         * @return {?}
         */
        () => { }));
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || ((/**
         * @return {?}
         */
        () => { }));
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || ((/**
         * @return {?}
         */
        () => { }));
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || ((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        /** @type {?} */
        const componentRef = this.nodeContentContainer.createComponent(componentFactory);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let updateNode = false;
        for (const propName of Object.keys(changes)) {
            /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    updateNodeClass() {
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    }
    /**
     * @private
     * @return {?}
     */
    updateNodeComponent() {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    }
    /**
     * @private
     * @param {?} element
     * @param {?} clazz
     * @param {?} set
     * @return {?}
     */
    toggleClass(element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragstart(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    click(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseover(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseout(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    }
}
FcNodeContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'fc-node',
                template: '<ng-template #nodeContent></ng-template>',
                styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}"]
            }] }
];
/** @nocollapse */
FcNodeContainerComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FC_NODE_COMPONENT_CONFIG,] }] },
    { type: ElementRef },
    { type: ComponentFactoryResolver }
];
FcNodeContainerComponent.propDecorators = {
    callbacks: [{ type: Input }],
    userNodeCallbacks: [{ type: Input }],
    node: [{ type: Input }],
    selected: [{ type: Input }],
    edit: [{ type: Input }],
    underMouse: [{ type: Input }],
    mouseOverConnector: [{ type: Input }],
    modelservice: [{ type: Input }],
    dragging: [{ type: Input }],
    nodeId: [{ type: HostBinding, args: ['attr.id',] }],
    top: [{ type: HostBinding, args: ['style.top',] }],
    left: [{ type: HostBinding, args: ['style.left',] }],
    nodeContentContainer: [{ type: ViewChild, args: ['nodeContent', { read: ViewContainerRef, static: true },] }],
    mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    dragstart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }],
    click: [{ type: HostListener, args: ['click', ['$event'],] }],
    mouseover: [{ type: HostListener, args: ['mouseover', ['$event'],] }],
    mouseout: [{ type: HostListener, args: ['mouseout', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    FcNodeContainerComponent.prototype.callbacks;
    /** @type {?} */
    FcNodeContainerComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    FcNodeContainerComponent.prototype.node;
    /** @type {?} */
    FcNodeContainerComponent.prototype.selected;
    /** @type {?} */
    FcNodeContainerComponent.prototype.edit;
    /** @type {?} */
    FcNodeContainerComponent.prototype.underMouse;
    /** @type {?} */
    FcNodeContainerComponent.prototype.mouseOverConnector;
    /** @type {?} */
    FcNodeContainerComponent.prototype.modelservice;
    /** @type {?} */
    FcNodeContainerComponent.prototype.dragging;
    /** @type {?} */
    FcNodeContainerComponent.prototype.nodeComponent;
    /** @type {?} */
    FcNodeContainerComponent.prototype.nodeContentContainer;
    /**
     * @type {?}
     * @private
     */
    FcNodeContainerComponent.prototype.nodeComponentConfig;
    /**
     * @type {?}
     * @private
     */
    FcNodeContainerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    FcNodeContainerComponent.prototype.componentFactoryResolver;
}
/**
 * @abstract
 */
class FcNodeComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
FcNodeComponent.propDecorators = {
    callbacks: [{ type: Input }],
    userNodeCallbacks: [{ type: Input }],
    node: [{ type: Input }],
    selected: [{ type: Input }],
    edit: [{ type: Input }],
    underMouse: [{ type: Input }],
    mouseOverConnector: [{ type: Input }],
    modelservice: [{ type: Input }],
    dragging: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FcNodeComponent.prototype.callbacks;
    /** @type {?} */
    FcNodeComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    FcNodeComponent.prototype.node;
    /** @type {?} */
    FcNodeComponent.prototype.selected;
    /** @type {?} */
    FcNodeComponent.prototype.edit;
    /** @type {?} */
    FcNodeComponent.prototype.underMouse;
    /** @type {?} */
    FcNodeComponent.prototype.mouseOverConnector;
    /** @type {?} */
    FcNodeComponent.prototype.modelservice;
    /** @type {?} */
    FcNodeComponent.prototype.dragging;
    /** @type {?} */
    FcNodeComponent.prototype.flowchartConstants;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DefaultFcNodeComponent extends FcNodeComponent {
    constructor() {
        super();
    }
}
DefaultFcNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'fc-default-node',
                template: "<div\n  (dblclick)=\"userNodeCallbacks.doubleClick($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n    &times;\n  </div>\n</div>\n",
                styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;left:0;top:0;right:0;bottom:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}"]
            }] }
];
/** @nocollapse */
DefaultFcNodeComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0$1 = {
    nodeComponentType: DefaultFcNodeComponent
};
class NgxFlowchartModule {
}
NgxFlowchartModule.decorators = [
    { type: NgModule, args: [{
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
                        useValue: ɵ0$1
                    }
                ],
                imports: [
                    CommonModule
                ],
                exports: [NgxFlowchartComponent,
                    FcMagnetDirective,
                    FcConnectorDirective,
                    DefaultFcNodeComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FC_NODE_COMPONENT_CONFIG, FcNodeComponent, FlowchartConstants, ModelvalidationError, NgxFlowchartComponent, NgxFlowchartModule, fcTopSort, FcNodeContainerComponent as ɵa, FcModelValidationService as ɵb, FcEdgeDrawingService as ɵc, DefaultFcNodeComponent as ɵd, FcMagnetDirective as ɵe, FcConnectorDirective as ɵf };
//# sourceMappingURL=ngx-flowchart.js.map
