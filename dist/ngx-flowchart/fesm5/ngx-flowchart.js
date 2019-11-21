import { __extends, __values, __assign } from 'tslib';
import { InjectionToken, Injectable, Component, ChangeDetectionStrategy, ElementRef, IterableDiffers, ChangeDetectorRef, NgZone, HostBinding, Input, HostListener, Directive, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
/**
 * @record
 */
function FcNodeComponentConfig() { }
if (false) {
    /** @type {?} */
    FcNodeComponentConfig.prototype.nodeComponentType;
}
/** @type {?} */
var htmlPrefix = 'fc';
/** @type {?} */
var leftConnectorType = 'leftConnector';
/** @type {?} */
var rightConnectorType = 'rightConnector';
/** @type {?} */
var FlowchartConstants = {
    htmlPrefix: htmlPrefix,
    leftConnectorType: leftConnectorType,
    rightConnectorType: rightConnectorType,
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
var BaseError = /** @class */ (function () {
    function BaseError() {
        Error.apply(this, arguments);
    }
    return BaseError;
}());
BaseError.prototype = new Error();
var ModelvalidationError = /** @class */ (function (_super) {
    __extends(ModelvalidationError, _super);
    function ModelvalidationError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return ModelvalidationError;
}(BaseError));
if (false) {
    /** @type {?} */
    ModelvalidationError.prototype.message;
}
/**
 * @param {?} graph
 * @return {?}
 */
function fcTopSort(graph) {
    var e_1, _a, e_2, _b;
    /** @type {?} */
    var adjacentList = {};
    graph.nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    }));
    graph.edges.forEach((/**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        /** @type {?} */
        var sourceNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            function (connector) {
                return connector.id === edge.source;
            }));
        }))[0];
        /** @type {?} */
        var destinationNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            function (connector) {
                return connector.id === edge.destination;
            }));
        }))[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    }));
    /** @type {?} */
    var orderedNodes = [];
    /** @type {?} */
    var sourceNodes = [];
    try {
        for (var _c = __values(Object.keys(adjacentList)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var node = _d.value;
            /** @type {?} */
            var edges = adjacentList[node];
            if (edges.incoming === 0) {
                sourceNodes.push(node);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    while (sourceNodes.length !== 0) {
        /** @type {?} */
        var sourceNode = sourceNodes.pop();
        for (var i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
            /** @type {?} */
            var destinationNode = adjacentList[sourceNode].outgoing[i];
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
    var hasEdges = false;
    try {
        for (var _e = __values(Object.keys(adjacentList)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var node = _f.value;
            /** @type {?} */
            var edges = adjacentList[node];
            if (edges.incoming !== 0) {
                hasEdges = true;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
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
var FcModelService = /** @class */ (function () {
    function FcModelService(modelValidation, model, cd, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
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
        function () { }));
        this.createEdge = createEdge || ((/**
         * @param {?} event
         * @param {?} edge
         * @return {?}
         */
        function (event, edge) { return of(__assign({}, edge, { label: 'label' })); }));
        this.edgeAddedCallback = edgeAddedCallback || ((/**
         * @return {?}
         */
        function () { }));
        this.nodeRemovedCallback = nodeRemovedCallback || ((/**
         * @return {?}
         */
        function () { }));
        this.edgeRemovedCallback = edgeRemovedCallback || ((/**
         * @return {?}
         */
        function () { }));
        this.connectors = new ConnectorsModel(this);
        this.nodes = new NodesModel(this);
        this.edges = new EdgesModel(this);
    }
    /**
     * @return {?}
     */
    FcModelService.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.cd.detectChanges();
        }), 0);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FcModelService.prototype.selectObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (this.isEditable()) {
            if (this.selectedObjects.indexOf(object) === -1) {
                this.selectedObjects.push(object);
            }
        }
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FcModelService.prototype.deselectObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (this.isEditable()) {
            /** @type {?} */
            var index = this.selectedObjects.indexOf(object);
            if (index === -1) {
                throw new Error('Tried to deselect an unselected object');
            }
            this.selectedObjects.splice(index, 1);
        }
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FcModelService.prototype.toggleSelectedObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (this.isSelectedObject(object)) {
            this.deselectObject(object);
        }
        else {
            this.selectObject(object);
        }
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FcModelService.prototype.isSelectedObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return this.selectedObjects.indexOf(object) !== -1;
    };
    /**
     * @return {?}
     */
    FcModelService.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (!node.readonly) {
                _this.nodes.select(node);
            }
        }));
        this.model.edges.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        function (edge) {
            _this.edges.select(edge);
        }));
        this.detectChanges();
    };
    /**
     * @return {?}
     */
    FcModelService.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        this.selectedObjects.splice(0, this.selectedObjects.length);
        this.detectChanges();
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FcModelService.prototype.isEditObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return this.selectedObjects.length === 1 &&
            this.selectedObjects.indexOf(object) !== -1;
    };
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} rectBox
     * @return {?}
     */
    FcModelService.prototype.inRectBox = /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} rectBox
     * @return {?}
     */
    function (x, y, rectBox) {
        return x >= rectBox.left && x <= rectBox.right &&
            y >= rectBox.top && y <= rectBox.bottom;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    FcModelService.prototype.getItemInfoAtPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        return {
            node: this.getNodeAtPoint(x, y),
            edge: this.getEdgeAtPoint(x, y)
        };
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    FcModelService.prototype.getNodeAtPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        var e_1, _a;
        try {
            for (var _b = __values(this.model.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                /** @type {?} */
                var element = this.nodes.getHtmlElement(node.id);
                /** @type {?} */
                var nodeElementBox = element.getBoundingClientRect();
                if (x >= nodeElementBox.left && x <= nodeElementBox.right
                    && y >= nodeElementBox.top && y <= nodeElementBox.bottom) {
                    return node;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    FcModelService.prototype.getEdgeAtPoint = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var element = document.elementFromPoint(x, y);
        /** @type {?} */
        var id = element.id;
        /** @type {?} */
        var edgeIndex = -1;
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
    };
    /**
     * @param {?} rectBox
     * @return {?}
     */
    FcModelService.prototype.selectAllInRect = /**
     * @param {?} rectBox
     * @return {?}
     */
    function (rectBox) {
        var _this = this;
        this.model.nodes.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var element = _this.nodes.getHtmlElement(value.id);
            /** @type {?} */
            var nodeElementBox = element.getBoundingClientRect();
            if (!value.readonly) {
                /** @type {?} */
                var x = nodeElementBox.left + nodeElementBox.width / 2;
                /** @type {?} */
                var y = nodeElementBox.top + nodeElementBox.height / 2;
                if (_this.inRectBox(x, y, rectBox)) {
                    _this.nodes.select(value);
                }
                else {
                    if (_this.nodes.isSelected(value)) {
                        _this.nodes.deselect(value);
                    }
                }
            }
        }));
        /** @type {?} */
        var canvasElementBox = this.canvasHtmlElement.getBoundingClientRect();
        this.model.edges.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var start = _this.edges.sourceCoord(value);
            /** @type {?} */
            var end = _this.edges.destCoord(value);
            /** @type {?} */
            var x = (start.x + end.x) / 2 + canvasElementBox.left;
            /** @type {?} */
            var y = (start.y + end.y) / 2 + canvasElementBox.top;
            if (_this.inRectBox(x, y, rectBox)) {
                _this.edges.select(value);
            }
            else {
                if (_this.edges.isSelected(value)) {
                    _this.edges.deselect(value);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    FcModelService.prototype.deleteSelected = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var edgesToDelete = this.edges.getSelectedEdges();
        edgesToDelete.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        function (edge) {
            _this.edges.delete(edge);
        }));
        /** @type {?} */
        var nodesToDelete = this.nodes.getSelectedNodes();
        nodesToDelete.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            _this.nodes.delete(node);
        }));
    };
    /**
     * @return {?}
     */
    FcModelService.prototype.isEditable = /**
     * @return {?}
     */
    function () {
        return this.dropTargetId === undefined;
    };
    /**
     * @return {?}
     */
    FcModelService.prototype.isDropSource = /**
     * @return {?}
     */
    function () {
        return this.dropTargetId !== undefined;
    };
    /**
     * @return {?}
     */
    FcModelService.prototype.getDragImage = /**
     * @return {?}
     */
    function () {
        if (!this.dragImage) {
            this.dragImage = new Image();
            this.dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            this.dragImage.style.visibility = 'hidden';
        }
        return this.dragImage;
    };
    /**
     * @param {?} edgeAddedCallback
     * @param {?} nodeRemovedCallback
     * @param {?} edgeRemovedCallback
     * @return {?}
     */
    FcModelService.prototype.registerCallbacks = /**
     * @param {?} edgeAddedCallback
     * @param {?} nodeRemovedCallback
     * @param {?} edgeRemovedCallback
     * @return {?}
     */
    function (edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback) {
        this.edgeAddedCallback = edgeAddedCallback;
        this.nodeRemovedCallback = nodeRemovedCallback;
        this.edgeRemovedCallback = edgeRemovedCallback;
    };
    return FcModelService;
}());
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
var /**
 * @abstract
 * @template T
 */
AbstractFcModel = /** @class */ (function () {
    function AbstractFcModel(modelService) {
        this.modelService = modelService;
    }
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractFcModel.prototype.select = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.modelService.selectObject(object);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractFcModel.prototype.deselect = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.modelService.deselectObject(object);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractFcModel.prototype.toggleSelected = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.modelService.toggleSelectedObject(object);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractFcModel.prototype.isSelected = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return this.modelService.isSelectedObject(object);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    AbstractFcModel.prototype.isEdit = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return this.modelService.isEditObject(object);
    };
    return AbstractFcModel;
}());
if (false) {
    /** @type {?} */
    AbstractFcModel.prototype.modelService;
}
var ConnectorsModel = /** @class */ (function (_super) {
    __extends(ConnectorsModel, _super);
    function ConnectorsModel(modelService) {
        return _super.call(this, modelService) || this;
    }
    /**
     * @param {?} connectorId
     * @return {?}
     */
    ConnectorsModel.prototype.getConnector = /**
     * @param {?} connectorId
     * @return {?}
     */
    function (connectorId) {
        var e_2, _a, e_3, _b;
        /** @type {?} */
        var model = this.modelService.model;
        try {
            for (var _c = __values(model.nodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var node = _d.value;
                try {
                    for (var _e = (e_3 = void 0, __values(node.connectors)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var connector = _f.value;
                        if (connector.id === connectorId) {
                            return connector;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * @param {?} connectorId
     * @return {?}
     */
    ConnectorsModel.prototype.getHtmlElement = /**
     * @param {?} connectorId
     * @return {?}
     */
    function (connectorId) {
        return this.modelService.connectorsHtmlElements[connectorId];
    };
    /**
     * @param {?} connectorId
     * @param {?} element
     * @return {?}
     */
    ConnectorsModel.prototype.setHtmlElement = /**
     * @param {?} connectorId
     * @param {?} element
     * @return {?}
     */
    function (connectorId, element) {
        this.modelService.connectorsHtmlElements[connectorId] = element;
        this.modelService.detectChanges();
    };
    /**
     * @private
     * @param {?} connectorId
     * @param {?=} centered
     * @return {?}
     */
    ConnectorsModel.prototype._getCoords = /**
     * @private
     * @param {?} connectorId
     * @param {?=} centered
     * @return {?}
     */
    function (connectorId, centered) {
        /** @type {?} */
        var element = this.getHtmlElement(connectorId);
        /** @type {?} */
        var canvas = this.modelService.canvasHtmlElement;
        if (element === null || element === undefined || canvas === null) {
            return { x: 0, y: 0 };
        }
        /** @type {?} */
        var connectorElementBox = element.getBoundingClientRect();
        /** @type {?} */
        var canvasElementBox = canvas.getBoundingClientRect();
        /** @type {?} */
        var coords = {
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
    };
    /**
     * @param {?} connectorId
     * @return {?}
     */
    ConnectorsModel.prototype.getCoords = /**
     * @param {?} connectorId
     * @return {?}
     */
    function (connectorId) {
        return this._getCoords(connectorId, false);
    };
    /**
     * @param {?} connectorId
     * @return {?}
     */
    ConnectorsModel.prototype.getCenteredCoord = /**
     * @param {?} connectorId
     * @return {?}
     */
    function (connectorId) {
        return this._getCoords(connectorId, true);
    };
    return ConnectorsModel;
}(AbstractFcModel));
var NodesModel = /** @class */ (function (_super) {
    __extends(NodesModel, _super);
    function NodesModel(modelService) {
        return _super.call(this, modelService) || this;
    }
    /**
     * @param {?} node
     * @param {?} type
     * @return {?}
     */
    NodesModel.prototype.getConnectorsByType = /**
     * @param {?} node
     * @param {?} type
     * @return {?}
     */
    function (node, type) {
        return node.connectors.filter((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) {
            return connector.type === type;
        }));
    };
    /**
     * @private
     * @param {?} node
     * @param {?} connector
     * @return {?}
     */
    NodesModel.prototype._addConnector = /**
     * @private
     * @param {?} node
     * @param {?} connector
     * @return {?}
     */
    function (node, connector) {
        node.connectors.push(connector);
        try {
            this.modelService.modelValidation.validateNode(node);
        }
        catch (error) {
            node.connectors.splice(node.connectors.indexOf(connector), 1);
            throw error;
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    NodesModel.prototype.delete = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (this.isSelected(node)) {
            this.deselect(node);
        }
        /** @type {?} */
        var model = this.modelService.model;
        /** @type {?} */
        var index = model.nodes.indexOf(node);
        if (index === -1) {
            if (node === undefined) {
                throw new Error('Passed undefined');
            }
            throw new Error('Tried to delete not existing node');
        }
        /** @type {?} */
        var connectorIds = this.getConnectorIds(node);
        for (var i = 0; i < model.edges.length; i++) {
            /** @type {?} */
            var edge = model.edges[i];
            if (connectorIds.indexOf(edge.source) !== -1 || connectorIds.indexOf(edge.destination) !== -1) {
                this.modelService.edges.delete(edge);
                i--;
            }
        }
        model.nodes.splice(index, 1);
        this.modelService.nodeRemovedCallback(node);
    };
    /**
     * @return {?}
     */
    NodesModel.prototype.getSelectedNodes = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var model = this.modelService.model;
        return model.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return _this.modelService.nodes.isSelected(node);
        }));
    };
    /**
     * @param {?} node
     * @param {?=} ctrlKey
     * @return {?}
     */
    NodesModel.prototype.handleClicked = /**
     * @param {?} node
     * @param {?=} ctrlKey
     * @return {?}
     */
    function (node, ctrlKey) {
        if (ctrlKey) {
            this.modelService.nodes.toggleSelected(node);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.nodes.select(node);
        }
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    NodesModel.prototype._addNode = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var model = this.modelService.model;
        try {
            model.nodes.push(node);
            this.modelService.modelValidation.validateNodes(model.nodes);
        }
        catch (error) {
            model.nodes.splice(model.nodes.indexOf(node), 1);
            throw error;
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    NodesModel.prototype.getConnectorIds = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node.connectors.map((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) {
            return connector.id;
        }));
    };
    /**
     * @param {?} connectorId
     * @return {?}
     */
    NodesModel.prototype.getNodeByConnectorId = /**
     * @param {?} connectorId
     * @return {?}
     */
    function (connectorId) {
        var e_4, _a;
        /** @type {?} */
        var model = this.modelService.model;
        try {
            for (var _b = __values(model.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                /** @type {?} */
                var connectorIds = this.getConnectorIds(node);
                if (connectorIds.indexOf(connectorId) > -1) {
                    return node;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return null;
    };
    /**
     * @param {?} nodeId
     * @return {?}
     */
    NodesModel.prototype.getHtmlElement = /**
     * @param {?} nodeId
     * @return {?}
     */
    function (nodeId) {
        return this.modelService.nodesHtmlElements[nodeId];
    };
    /**
     * @param {?} nodeId
     * @param {?} element
     * @return {?}
     */
    NodesModel.prototype.setHtmlElement = /**
     * @param {?} nodeId
     * @param {?} element
     * @return {?}
     */
    function (nodeId, element) {
        this.modelService.nodesHtmlElements[nodeId] = element;
        this.modelService.detectChanges();
    };
    return NodesModel;
}(AbstractFcModel));
var EdgesModel = /** @class */ (function (_super) {
    __extends(EdgesModel, _super);
    function EdgesModel(modelService) {
        return _super.call(this, modelService) || this;
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    EdgesModel.prototype.ready = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        /** @type {?} */
        var source = this.modelService.connectors.getHtmlElement(edge.source);
        /** @type {?} */
        var destination = this.modelService.connectors.getHtmlElement(edge.destination);
        return source !== undefined && destination !== undefined;
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    EdgesModel.prototype.sourceCoord = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        return this.modelService.connectors.getCenteredCoord(edge.source);
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    EdgesModel.prototype.destCoord = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        return this.modelService.connectors.getCenteredCoord(edge.destination);
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    EdgesModel.prototype.delete = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        /** @type {?} */
        var model = this.modelService.model;
        /** @type {?} */
        var index = model.edges.indexOf(edge);
        if (index === -1) {
            throw new Error('Tried to delete not existing edge');
        }
        if (this.isSelected(edge)) {
            this.deselect(edge);
        }
        model.edges.splice(index, 1);
        this.modelService.edgeRemovedCallback(edge);
    };
    /**
     * @return {?}
     */
    EdgesModel.prototype.getSelectedEdges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var model = this.modelService.model;
        return model.edges.filter((/**
         * @param {?} edge
         * @return {?}
         */
        function (edge) {
            return _this.modelService.edges.isSelected(edge);
        }));
    };
    /**
     * @param {?} edge
     * @param {?=} ctrlKey
     * @return {?}
     */
    EdgesModel.prototype.handleEdgeMouseClick = /**
     * @param {?} edge
     * @param {?=} ctrlKey
     * @return {?}
     */
    function (edge, ctrlKey) {
        if (ctrlKey) {
            this.modelService.edges.toggleSelected(edge);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.edges.select(edge);
        }
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    EdgesModel.prototype.putEdge = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        /** @type {?} */
        var model = this.modelService.model;
        model.edges.push(edge);
    };
    /**
     * @param {?} event
     * @param {?} sourceConnector
     * @param {?} destConnector
     * @param {?} label
     * @return {?}
     */
    EdgesModel.prototype._addEdge = /**
     * @param {?} event
     * @param {?} sourceConnector
     * @param {?} destConnector
     * @param {?} label
     * @return {?}
     */
    function (event, sourceConnector, destConnector, label) {
        var _this = this;
        this.modelService.modelValidation.validateConnector(sourceConnector);
        this.modelService.modelValidation.validateConnector(destConnector);
        /** @type {?} */
        var edge = {};
        edge.source = sourceConnector.id;
        edge.destination = destConnector.id;
        edge.label = label;
        /** @type {?} */
        var model = this.modelService.model;
        this.modelService.modelValidation.validateEdges(model.edges.concat([edge]), model.nodes);
        this.modelService.createEdge(event, edge).subscribe((/**
         * @param {?} created
         * @return {?}
         */
        function (created) {
            model.edges.push(created);
            _this.modelService.edgeAddedCallback(created);
        }));
    };
    return EdgesModel;
}(AbstractFcModel));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FcModelValidationService = /** @class */ (function () {
    function FcModelValidationService() {
    }
    /**
     * @param {?} model
     * @return {?}
     */
    FcModelValidationService.prototype.validateModel = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype.validateNodes = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var _this = this;
        /** @type {?} */
        var ids = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            _this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        }));
        /** @type {?} */
        var connectorIds = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            node.connectors.forEach((/**
             * @param {?} connector
             * @return {?}
             */
            function (connector) {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            }));
        }));
        return nodes;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FcModelValidationService.prototype.validateNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        var _this = this;
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
        function (connector) {
            _this.validateConnector(connector);
        }));
        return node;
    };
    /**
     * @private
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype._validateEdges = /**
     * @private
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    function (edges, nodes) {
        var _this = this;
        edges.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        function (edge) {
            _this._validateEdge(edge, nodes);
        }));
        edges.forEach((/**
         * @param {?} edge1
         * @param {?} index1
         * @return {?}
         */
        function (edge1, index1) {
            edges.forEach((/**
             * @param {?} edge2
             * @param {?} index2
             * @return {?}
             */
            function (edge2, index2) {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            }));
        }));
        if (fcTopSort({ nodes: nodes, edges: edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    };
    /**
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype.validateEdges = /**
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    function (edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    };
    /**
     * @private
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype._validateEdge = /**
     * @private
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    function (edge, nodes) {
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
        var sourceNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) { return connector.id === edge.source; })); }))[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        /** @type {?} */
        var destinationNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) { return connector.id === edge.destination; })); }))[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    };
    /**
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype.validateEdge = /**
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    function (edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    };
    /**
     * @param {?} connector
     * @return {?}
     */
    FcModelValidationService.prototype.validateConnector = /**
     * @param {?} connector
     * @return {?}
     */
    function (connector) {
        if (connector.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
            throw new ModelvalidationError('Type not valid.');
        }
        return connector;
    };
    FcModelValidationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FcModelValidationService.ctorParameters = function () { return []; };
    return FcModelValidationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nodeDropScope = {
    dropElement: null
};
var FcNodeDraggingService = /** @class */ (function () {
    function FcNodeDraggingService(modelService, applyFunction, automaticResize, dragAnimation) {
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
    FcNodeDraggingService.prototype.getCoordinate = /**
     * @private
     * @param {?} coordinate
     * @param {?} max
     * @return {?}
     */
    function (coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    };
    /**
     * @private
     * @param {?} x
     * @return {?}
     */
    FcNodeDraggingService.prototype.getXCoordinate = /**
     * @private
     * @param {?} x
     * @return {?}
     */
    function (x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    };
    /**
     * @private
     * @param {?} y
     * @return {?}
     */
    FcNodeDraggingService.prototype.getYCoordinate = /**
     * @private
     * @param {?} y
     * @return {?}
     */
    function (y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    };
    /**
     * @private
     * @param {?} draggedNode
     * @param {?} nodeElement
     * @return {?}
     */
    FcNodeDraggingService.prototype.resizeCanvas = /**
     * @private
     * @param {?} draggedNode
     * @param {?} nodeElement
     * @return {?}
     */
    function (draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            /** @type {?} */
            var canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FcNodeDraggingService.prototype.isDraggingNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    };
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FcNodeDraggingService.prototype.dragstart = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        var e_1, _a, e_2, _b;
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
        var elements = [];
        /** @type {?} */
        var nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            /** @type {?} */
            var selectedNodes = this.modelService.nodes.getSelectedNodes();
            try {
                for (var selectedNodes_1 = __values(selectedNodes), selectedNodes_1_1 = selectedNodes_1.next(); !selectedNodes_1_1.done; selectedNodes_1_1 = selectedNodes_1.next()) {
                    var selectedNode = selectedNodes_1_1.value;
                    /** @type {?} */
                    var element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
                    elements.push(element);
                    nodes.push(selectedNode);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (selectedNodes_1_1 && !selectedNodes_1_1.done && (_a = selectedNodes_1.return)) _a.call(selectedNodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            elements.push($((/** @type {?} */ (event.target))));
            nodes.push(node);
        }
        /** @type {?} */
        var offsetsX = [];
        /** @type {?} */
        var offsetsY = [];
        try {
            for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var element = elements_1_1.value;
                offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
                offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_b = elements_1.return)) _b.call(elements_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        /** @type {?} */
        var originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = (/** @type {?} */ (elements[0][0].cloneNode(true)));
            /** @type {?} */
            var offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
            /** @type {?} */
            var dropNodeInfo = {
                node: node,
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
                var target = (/** @type {?} */ (event.target));
                this.destinationHtmlElements.push(target);
                this.oldDisplayStyles.push(target.style.display);
                target.style.display = 'none';
                this.nodeDraggingScope.shadowDragStarted = true;
            }
            return;
        }
        this.nodeDraggingScope.draggedNodes = nodes;
        for (var i = 0; i < elements.length; i++) {
            this.draggedElements.push(elements[i][0]);
            this.dragOffsets.push({
                x: offsetsX[i],
                y: offsetsY[i]
            });
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            for (var i = 0; i < this.draggedElements.length; i++) {
                /** @type {?} */
                var dragOffset = this.dragOffsets[i];
                /** @type {?} */
                var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                /** @type {?} */
                var shadowElement = $("<div style=\"position: absolute; opacity: 0.7; " +
                    ("top: " + this.getYCoordinate(dragOffset.y + event.clientY) + "px; ") +
                    ("left: " + this.getXCoordinate(dragOffset.x + event.clientX) + "px; \">") +
                    ("<div class=\"innerNode\"><p style=\"padding: 0 15px;\">" + draggedNode.name + "</p> </div></div>"));
                /** @type {?} */
                var targetInnerNode = $(this.draggedElements[i]).children()[0];
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
            for (var i = 0; i < this.draggedElements.length; i++) {
                this.destinationHtmlElements.push(this.draggedElements[i]);
                this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                this.destinationHtmlElements[i].style.display = 'none';
            }
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                this.nodeDraggingScope.shadowDragStarted = true;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeDraggingService.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        /** @type {?} */
        var dropNode = null;
        /** @type {?} */
        var originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        /** @type {?} */
        var infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            /** @type {?} */
            var dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    /** @type {?} */
                    var offset = $(this.modelService.canvasHtmlElement).offset();
                    /** @type {?} */
                    var x = event.clientX - offset.left;
                    /** @type {?} */
                    var y = event.clientY - offset.top;
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
            function () {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    var dragOffset = _this.dragOffsets[i];
                    draggedNode.x = Math.round(_this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(_this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                return false;
            }));
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeDraggingService.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (nodeDropScope.dropElement) {
            /** @type {?} */
            var offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction((/**
                 * @return {?}
                 */
                function () {
                    _this.destinationHtmlElements[0].style.display = _this.oldDisplayStyles[0];
                    _this.nodeDraggingScope.shadowDragStarted = false;
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
                function () {
                    for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                        /** @type {?} */
                        var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                        /** @type {?} */
                        var dragOffset = _this.dragOffsets[i];
                        draggedNode.x = _this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = _this.getYCoordinate(dragOffset.y + event.clientY);
                        _this.resizeCanvas(draggedNode, _this.draggedElements[i]);
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
                    function () {
                        for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                            _this.destinationHtmlElements[i].style.display = _this.oldDisplayStyles[i];
                        }
                        _this.nodeDraggingScope.shadowDragStarted = false;
                    }));
                }
                for (var i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    var dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeDraggingService.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.applyFunction((/**
         * @return {?}
         */
        function () {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (_this.modelService.isDropSource()) {
                return;
            }
            if (_this.nodeDraggingScope.shadowElements.length) {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    var shadowElement = _this.nodeDraggingScope.shadowElements[i];
                    draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
                    draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
                    _this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
                }
                _this.nodeDraggingScope.shadowElements.length = 0;
            }
            if (_this.nodeDraggingScope.draggedNodes.length) {
                _this.nodeDraggingScope.draggedNodes.length = 0;
                _this.draggedElements.length = 0;
                _this.dragOffsets.length = 0;
            }
        }));
    };
    return FcNodeDraggingService;
}());
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
var FcEdgeDrawingService = /** @class */ (function () {
    function FcEdgeDrawingService() {
    }
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @param {?} style
     * @return {?}
     */
    FcEdgeDrawingService.prototype.getEdgeDAttribute = /**
     * @param {?} pt1
     * @param {?} pt2
     * @param {?} style
     * @return {?}
     */
    function (pt1, pt2, style) {
        /** @type {?} */
        var dAddribute = "M " + pt1.x + ", " + pt1.y + " ";
        if (style === FlowchartConstants.curvedStyle) {
            /** @type {?} */
            var sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            /** @type {?} */
            var destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += "C " + sourceTangent.x + ", " + sourceTangent.y + " " + (destinationTangent.x - 50) + ", " + destinationTangent.y + " " + pt2.x + ", " + pt2.y;
        }
        else {
            dAddribute += "L " + pt2.x + ", " + pt2.y;
        }
        return dAddribute;
    };
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.getEdgeCenter = /**
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    };
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.computeEdgeTangentOffset = /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    };
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.computeEdgeSourceTangent = /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.computeEdgeDestinationTangent = /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    FcEdgeDrawingService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FcEdgeDrawingService.ctorParameters = function () { return []; };
    return FcEdgeDrawingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FcEdgeDraggingService = /** @class */ (function () {
    function FcEdgeDraggingService(modelValidation, edgeDrawingService, modelService, model, isValidEdgeCallback, applyFunction, dragAnimation, edgeStyle) {
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
        function () { return true; }));
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragstart = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var e_1, _a;
        var _this = this;
        /** @type {?} */
        var swapConnector;
        /** @type {?} */
        var dragLabel;
        /** @type {?} */
        var prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            var _loop_1 = function (edge) {
                if (edge.destination === connector.id) {
                    swapConnector = this_1.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this_1.applyFunction((/**
                     * @return {?}
                     */
                    function () {
                        _this.modelService.edges.delete(edge);
                    }));
                    return "break";
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.model.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var edge = _c.value;
                    var state_1 = _loop_1(edge);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
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
        var canvas = this.modelService.canvasHtmlElement;
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
        var originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction((/**
                     * @return {?}
                     */
                    function () {
                        _this.edgeDragging.shadowDragStarted = false;
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
                function () {
                    if (_this.destinationHtmlElement !== null) {
                        _this.destinationHtmlElement.style.display = _this.oldDisplayStyle;
                    }
                    _this.edgeDragging.dragPoint2 = {
                        x: event.clientX + _this.dragOffset.x,
                        y: event.clientY + _this.dragOffset.y
                    };
                }));
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragoverConnector = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragleaveMagnet = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.edgeDragging.magnetActive = false;
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragoverMagnet = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var _this = this;
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
                    function () {
                        _this.edgeDragging.dragPoint2 = _this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }));
                }
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
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
                var edge_1 = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction((/**
                 * @return {?}
                 */
                function () {
                    _this.modelService.edges.putEdge(edge_1);
                }));
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} targetConnector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.drop = /**
     * @param {?} event
     * @param {?} targetConnector
     * @return {?}
     */
    function (event, targetConnector) {
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
    };
    return FcEdgeDraggingService;
}());
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
var FcMouseOverService = /** @class */ (function () {
    function FcMouseOverService(applyFunction) {
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
    FcMouseOverService.prototype.nodeMouseOver = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.node = node;
        }));
    };
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FcMouseOverService.prototype.nodeMouseOut = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.node = null;
        }));
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcMouseOverService.prototype.connectorMouseEnter = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.connector = connector;
        }));
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcMouseOverService.prototype.connectorMouseLeave = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.connector = null;
        }));
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    FcMouseOverService.prototype.edgeMouseEnter = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverscope.edge = edge;
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    FcMouseOverService.prototype.edgeMouseLeave = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverscope.edge = null;
    };
    return FcMouseOverService;
}());
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
var regex = /(auto|scroll)/;
/** @type {?} */
var style = (/**
 * @param {?} node
 * @param {?} prop
 * @return {?}
 */
function (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
});
var ɵ0 = style;
/** @type {?} */
var scroll = (/**
 * @param {?} node
 * @return {?}
 */
function (node) {
    return regex.test(style(node, 'overflow') +
        style(node, 'overflow-y') +
        style(node, 'overflow-x'));
});
var ɵ1 = scroll;
/** @type {?} */
var scrollparent = (/**
 * @param {?} node
 * @return {?}
 */
function (node) {
    return !node || node === document.body
        ? document.body
        : scroll(node)
            ? node
            : scrollparent((/** @type {?} */ (node.parentNode)));
});
var ɵ2 = scrollparent;

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
var FcRectangleSelectService = /** @class */ (function () {
    function FcRectangleSelectService(modelService, selectElement, applyFunction) {
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
    FcRectangleSelectService.prototype.mousedown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && this.selectElement.hidden) {
            this.selectElement.hidden = false;
            /** @type {?} */
            var offset = this.$canvasElement.offset();
            this.selectRect.x1 = Math.round(e.pageX - offset.left);
            this.selectRect.y1 = Math.round(e.pageY - offset.top);
            this.selectRect.x2 = this.selectRect.x1;
            this.selectRect.y2 = this.selectRect.y1;
            this.updateSelectRect();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FcRectangleSelectService.prototype.mousemove = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            var offset = this.$canvasElement.offset();
            this.selectRect.x2 = Math.round(e.pageX - offset.left);
            this.selectRect.y2 = Math.round(e.pageY - offset.top);
            this.updateScroll(offset);
            this.updateSelectRect();
        }
    };
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    FcRectangleSelectService.prototype.updateScroll = /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        /** @type {?} */
        var rect = this.$scrollParent[0].getBoundingClientRect();
        /** @type {?} */
        var bottom = rect.bottom - offset.top;
        /** @type {?} */
        var right = rect.right - offset.left;
        /** @type {?} */
        var top = rect.top - offset.top;
        /** @type {?} */
        var left = rect.left - offset.left;
        if (this.selectRect.y2 - top < 25) {
            /** @type {?} */
            var topScroll = 25 - (this.selectRect.y2 - top);
            /** @type {?} */
            var scroll_1 = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll_1 - topScroll);
        }
        else if (bottom - this.selectRect.y2 < 40) {
            /** @type {?} */
            var bottomScroll = 40 - (bottom - this.selectRect.y2);
            /** @type {?} */
            var scroll_2 = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll_2 + bottomScroll);
        }
        if (this.selectRect.x2 - left < 25) {
            /** @type {?} */
            var leftScroll = 25 - (this.selectRect.x2 - left);
            /** @type {?} */
            var scroll_3 = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll_3 - leftScroll);
        }
        else if (right - this.selectRect.x2 < 40) {
            /** @type {?} */
            var rightScroll = 40 - (right - this.selectRect.x2);
            /** @type {?} */
            var scroll_4 = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll_4 + rightScroll);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FcRectangleSelectService.prototype.mouseup = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            var rectBox = (/** @type {?} */ (this.selectElement.getBoundingClientRect()));
            this.selectElement.hidden = true;
            this.selectObjects(rectBox);
        }
    };
    /**
     * @private
     * @return {?}
     */
    FcRectangleSelectService.prototype.updateSelectRect = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        var x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        var y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
        /** @type {?} */
        var y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
        this.selectElement.style.left = x3 + 'px';
        this.selectElement.style.top = y3 + 'px';
        this.selectElement.style.width = x4 - x3 + 'px';
        this.selectElement.style.height = y4 - y3 + 'px';
    };
    /**
     * @private
     * @param {?} rectBox
     * @return {?}
     */
    FcRectangleSelectService.prototype.selectObjects = /**
     * @private
     * @param {?} rectBox
     * @return {?}
     */
    function (rectBox) {
        var _this = this;
        this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.modelService.selectAllInRect(rectBox);
        }));
    };
    return FcRectangleSelectService;
}());
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
var NgxFlowchartComponent = /** @class */ (function () {
    function NgxFlowchartComponent(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
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
        function (index, item) {
            return item;
        }));
        this.edgesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item;
        }));
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
    }
    Object.defineProperty(NgxFlowchartComponent.prototype, "canvasClass", {
        get: /**
         * @return {?}
         */
        function () {
            return FlowchartConstants.canvasClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        var _this = this;
        if (!this.dropTargetId && this.edgeStyle !== FlowchartConstants.curvedStyle && this.edgeStyle !== FlowchartConstants.lineStyle) {
            throw new Error('edgeStyle not supported.');
        }
        this.nodeHeight = this.nodeHeight || 200;
        this.nodeWidth = this.nodeWidth || 200;
        this.dragAnimation = this.dragAnimation || FlowchartConstants.dragAnimationRepaint;
        this.userCallbacks = this.userCallbacks || {};
        this.automaticResize = this.automaticResize || false;
        try {
            for (var _b = __values(Object.keys(this.userCallbacks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                /** @type {?} */
                var callback = this.userCallbacks[key];
                if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                    throw new Error('All callbacks should be functions.');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.cd, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        /** @type {?} */
        var applyFunction = this.zone.run.bind(this.zone);
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
            function (event, node) {
                _this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            })
        };
        this.adjustCanvasSize(true);
    };
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.model) {
            /** @type {?} */
            var nodesChange = this.nodesDiffer.diff(this.model.nodes);
            /** @type {?} */
            var edgesChange = this.edgesDiffer.diff(this.model.edges);
            /** @type {?} */
            var nodesChanged_1 = false;
            /** @type {?} */
            var edgesChanged_1 = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                function () {
                    nodesChanged_1 = true;
                }));
                nodesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                function () {
                    nodesChanged_1 = true;
                }));
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                function () {
                    edgesChanged_1 = true;
                }));
                edgesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                function () {
                    edgesChanged_1 = true;
                }));
            }
            if (nodesChanged_1) {
                this.adjustCanvasSize(true);
            }
            if (nodesChanged_1 || edgesChanged_1) {
                this.cd.detectChanges();
            }
        }
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.getEdgeDAttribute = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    };
    /**
     * @param {?=} fit
     * @return {?}
     */
    NgxFlowchartComponent.prototype.adjustCanvasSize = /**
     * @param {?=} fit
     * @return {?}
     */
    function (fit) {
        var _this = this;
        /** @type {?} */
        var maxX = 0;
        /** @type {?} */
        var maxY = 0;
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            maxX = Math.max(node.x + _this.nodeWidth, maxX);
            maxY = Math.max(node.y + _this.nodeHeight, maxY);
        }));
        /** @type {?} */
        var width;
        /** @type {?} */
        var height;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.canvasClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseDown = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeClick = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeRemove = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeEdit = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeDoubleClick = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseOver = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseEnter = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseLeave = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mousedown(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mousemove(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mouseup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mouseup(event);
    };
    NgxFlowchartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-canvas',
                    template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
                }] }
    ];
    /** @nocollapse */
    NgxFlowchartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: FcModelValidationService },
        { type: FcEdgeDrawingService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
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
    return NgxFlowchartComponent;
}());
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
var FcMagnetDirective = /** @class */ (function () {
    function FcMagnetDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    FcMagnetDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.dragleave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.callbacks.edgeDragleaveMagnet(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.callbacks.edgeDrop(event, this.connector);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.callbacks.edgeDragend(event);
    };
    FcMagnetDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fc-magnet]'
                },] }
    ];
    /** @nocollapse */
    FcMagnetDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FcMagnetDirective.propDecorators = {
        callbacks: [{ type: Input }],
        connector: [{ type: Input }],
        dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        dragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }]
    };
    return FcMagnetDirective;
}());
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
var FcConnectorDirective = /** @class */ (function () {
    function FcConnectorDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    FcConnectorDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        this.modelservice.connectors.setHtmlElement(this.connector.id, element[0]);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FcConnectorDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var e_1, _a;
        /** @type {?} */
        var updateConnector = false;
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
                /** @type {?} */
                var change = changes[propName];
                if (!change.firstChange && change.currentValue !== change.previousValue) {
                    if (propName === 'mouseOverConnector') {
                        updateConnector = true;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (updateConnector && this.modelservice.isEditable()) {
            this.updateConnectorClass();
        }
    };
    /**
     * @private
     * @return {?}
     */
    FcConnectorDirective.prototype.updateConnectorClass = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.dragstart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.mouseenter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.mouseleave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    };
    FcConnectorDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fc-connector]'
                },] }
    ];
    /** @nocollapse */
    FcConnectorDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return FcConnectorDirective;
}());
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
var FcNodeContainerComponent = /** @class */ (function () {
    function FcNodeContainerComponent(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    Object.defineProperty(FcNodeContainerComponent.prototype, "nodeId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "top", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.y + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "left", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.x + 'px';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FcNodeContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        /** @type {?} */
        var componentRef = this.nodeContentContainer.createComponent(componentFactory);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FcNodeContainerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var e_1, _a;
        /** @type {?} */
        var updateNode = false;
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
                /** @type {?} */
                var change = changes[propName];
                if (!change.firstChange && change.currentValue !== change.previousValue) {
                    if (['selected', 'edit', 'underMouse', 'mouseOverConnector', 'dragging'].includes(propName)) {
                        updateNode = true;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (updateNode) {
            this.updateNodeClass();
            this.updateNodeComponent();
        }
    };
    /**
     * @private
     * @return {?}
     */
    FcNodeContainerComponent.prototype.updateNodeClass = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    };
    /**
     * @private
     * @return {?}
     */
    FcNodeContainerComponent.prototype.updateNodeComponent = /**
     * @private
     * @return {?}
     */
    function () {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    };
    /**
     * @private
     * @param {?} element
     * @param {?} clazz
     * @param {?} set
     * @return {?}
     */
    FcNodeContainerComponent.prototype.toggleClass = /**
     * @private
     * @param {?} element
     * @param {?} clazz
     * @param {?} set
     * @return {?}
     */
    function (element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.dragstart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.mouseover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.mouseout = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    };
    FcNodeContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-node',
                    template: '<ng-template #nodeContent></ng-template>',
                    styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}"]
                }] }
    ];
    /** @nocollapse */
    FcNodeContainerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FC_NODE_COMPONENT_CONFIG,] }] },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
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
    return FcNodeContainerComponent;
}());
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
var FcNodeComponent = /** @class */ (function () {
    function FcNodeComponent() {
        this.flowchartConstants = FlowchartConstants;
    }
    /**
     * @return {?}
     */
    FcNodeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
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
    return FcNodeComponent;
}());
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
var DefaultFcNodeComponent = /** @class */ (function (_super) {
    __extends(DefaultFcNodeComponent, _super);
    function DefaultFcNodeComponent() {
        return _super.call(this) || this;
    }
    DefaultFcNodeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-default-node',
                    template: "<div\n  (dblclick)=\"userNodeCallbacks.doubleClick($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n    &times;\n  </div>\n</div>\n",
                    styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;left:0;top:0;right:0;bottom:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    DefaultFcNodeComponent.ctorParameters = function () { return []; };
    return DefaultFcNodeComponent;
}(FcNodeComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0$1 = {
    nodeComponentType: DefaultFcNodeComponent
};
var NgxFlowchartModule = /** @class */ (function () {
    function NgxFlowchartModule() {
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
    return NgxFlowchartModule;
}());

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
