/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { of } from 'rxjs';
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
        function (event, edge) { return of(tslib_1.__assign({}, edge, { label: 'label' })); }));
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
            for (var _b = tslib_1.__values(this.model.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export { FcModelService };
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
    tslib_1.__extends(ConnectorsModel, _super);
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
            for (var _c = tslib_1.__values(model.nodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var node = _d.value;
                try {
                    for (var _e = (e_3 = void 0, tslib_1.__values(node.connectors)), _f = _e.next(); !_f.done; _f = _e.next()) {
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
    tslib_1.__extends(NodesModel, _super);
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
            for (var _b = tslib_1.__values(model.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    tslib_1.__extends(EdgesModel, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdEM7SUF5QkUsd0JBQVksZUFBeUMsRUFDekMsS0FBYyxFQUNkLEVBQXFCLEVBQ3JCLGVBQXNCLEVBQ3RCLFFBQThDLEVBQzlDLFVBQThELEVBQzlELGlCQUF5QyxFQUN6QyxtQkFBMkMsRUFDM0MsbUJBQTJDLEVBQzNDLGlCQUE4QixFQUM5QixjQUEwQjtRQTVCdEMsMkJBQXNCLEdBQW1CLEVBQUUsQ0FBQztRQUM1QyxzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBZSxJQUFJLENBQUM7UUEwQmhDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUV2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSTs7O1FBQUMsY0FBTyxDQUFDLEVBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSTs7Ozs7UUFBQyxVQUFDLEtBQUssRUFBRSxJQUFJLElBQUssT0FBQSxFQUFFLHNCQUFLLElBQUks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LEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7WUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ2pELFVBQUMsT0FBTztZQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUNGLENBQUM7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBdEVELENBQXlCLGVBQWUsR0FzRXZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNDb29yZHMsIEZjRWRnZSwgRmNJdGVtSW5mbywgRmNNb2RlbCwgRmNOb2RlLCBGY1JlY3RCb3ggfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRmNNb2RlbFNlcnZpY2Uge1xuXG4gIG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlO1xuICBtb2RlbDogRmNNb2RlbDtcbiAgY2Q6IENoYW5nZURldGVjdG9yUmVmO1xuICBzZWxlY3RlZE9iamVjdHM6IGFueVtdO1xuXG4gIGNvbm5lY3RvcnNIdG1sRWxlbWVudHM6IEh0bWxFbGVtZW50TWFwID0ge307XG4gIG5vZGVzSHRtbEVsZW1lbnRzOiBIdG1sRWxlbWVudE1hcCA9IHt9O1xuICBjYW52YXNIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBkcmFnSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICBzdmdIdG1sRWxlbWVudDogU1ZHRWxlbWVudCA9IG51bGw7XG5cbiAgZHJvcE5vZGU6IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY3JlYXRlRWRnZTogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT47XG4gIGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuXG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuXG4gIGNvbm5lY3RvcnM6IENvbm5lY3RvcnNNb2RlbDtcbiAgbm9kZXM6IE5vZGVzTW9kZWw7XG4gIGVkZ2VzOiBFZGdlc01vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBzZWxlY3RlZE9iamVjdHM6IGFueVtdLFxuICAgICAgICAgICAgICBkcm9wTm9kZTogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBjcmVhdGVFZGdlOiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPixcbiAgICAgICAgICAgICAgZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGNhbnZhc0h0bWxFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgc3ZnSHRtbEVsZW1lbnQ6IFNWR0VsZW1lbnQpIHtcblxuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uID0gbW9kZWxWYWxpZGF0aW9uO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLmNkID0gY2Q7XG4gICAgdGhpcy5jYW52YXNIdG1sRWxlbWVudCA9IGNhbnZhc0h0bWxFbGVtZW50O1xuICAgIHRoaXMuc3ZnSHRtbEVsZW1lbnQgPSBzdmdIdG1sRWxlbWVudDtcbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU1vZGVsKHRoaXMubW9kZWwpO1xuICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzID0gc2VsZWN0ZWRPYmplY3RzO1xuXG4gICAgdGhpcy5kcm9wTm9kZSA9IGRyb3BOb2RlIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5jcmVhdGVFZGdlID0gY3JlYXRlRWRnZSB8fCAoKGV2ZW50LCBlZGdlKSA9PiBvZih7Li4uZWRnZSwgbGFiZWw6ICdsYWJlbCd9KSk7XG4gICAgdGhpcy5lZGdlQWRkZWRDYWxsYmFjayA9IGVkZ2VBZGRlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5ub2RlUmVtb3ZlZENhbGxiYWNrID0gbm9kZVJlbW92ZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMuZWRnZVJlbW92ZWRDYWxsYmFjayA9IGVkZ2VSZW1vdmVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcblxuICAgIHRoaXMuY29ubmVjdG9ycyA9IG5ldyBDb25uZWN0b3JzTW9kZWwodGhpcyk7XG4gICAgdGhpcy5ub2RlcyA9IG5ldyBOb2Rlc01vZGVsKHRoaXMpO1xuICAgIHRoaXMuZWRnZXMgPSBuZXcgRWRnZXNNb2RlbCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRlY3RDaGFuZ2VzKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09PSAtMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZXNlbGVjdCBhbiB1bnNlbGVjdGVkIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgIT09IC0xO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUucmVhZG9ubHkpIHtcbiAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKGVkZ2UgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0T2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgaW5SZWN0Qm94KHg6IG51bWJlciwgeTogbnVtYmVyLCByZWN0Qm94OiBGY1JlY3RCb3gpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA+PSByZWN0Qm94LmxlZnQgJiYgeCA8PSByZWN0Qm94LnJpZ2h0ICYmXG4gICAgICB5ID49IHJlY3RCb3gudG9wICYmIHkgPD0gcmVjdEJveC5ib3R0b207XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbUluZm9BdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNJdGVtSW5mbyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IHRoaXMuZ2V0Tm9kZUF0UG9pbnQoeCwgeSksXG4gICAgICBlZGdlOiB0aGlzLmdldEVkZ2VBdFBvaW50KHgsIHkpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjTm9kZSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMubW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5vZGVzLmdldEh0bWxFbGVtZW50KG5vZGUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHggPj0gbm9kZUVsZW1lbnRCb3gubGVmdCAmJiB4IDw9IG5vZGVFbGVtZW50Qm94LnJpZ2h0XG4gICAgICAgICYmIHkgPj0gbm9kZUVsZW1lbnRCb3gudG9wICYmIHkgPD0gbm9kZUVsZW1lbnRCb3guYm90dG9tKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjRWRnZSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkO1xuICAgIGxldCBlZGdlSW5kZXggPSAtMTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLXBhdGgtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1wYXRoLScubGVuZ3RoKSk7XG4gICAgICB9IGVsc2UgaWYgKGlkLnN0YXJ0c1dpdGgoJ2ZjLWVkZ2UtbGFiZWwtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1sYWJlbC0nLmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRnZUluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsLmVkZ2VzW2VkZ2VJbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbEluUmVjdChyZWN0Qm94OiBGY1JlY3RCb3gpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudCh2YWx1ZS5pZCk7XG4gICAgICBjb25zdCBub2RlRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoIXZhbHVlLnJlYWRvbmx5KSB7XG4gICAgICAgIGNvbnN0IHggPSBub2RlRWxlbWVudEJveC5sZWZ0ICsgbm9kZUVsZW1lbnRCb3gud2lkdGggLyAyO1xuICAgICAgICBjb25zdCB5ID0gbm9kZUVsZW1lbnRCb3gudG9wICsgbm9kZUVsZW1lbnRCb3guaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYgKHRoaXMuaW5SZWN0Qm94KHgsIHksIHJlY3RCb3gpKSB7XG4gICAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50Qm94ID0gdGhpcy5jYW52YXNIdG1sRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLm1vZGVsLmVkZ2VzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZWRnZXMuc291cmNlQ29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgZW5kID0gdGhpcy5lZGdlcy5kZXN0Q29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgeCA9IChzdGFydC54ICsgZW5kLngpIC8gMiArIGNhbnZhc0VsZW1lbnRCb3gubGVmdDtcbiAgICAgIGNvbnN0IHkgPSAoc3RhcnQueSArIGVuZC55KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LnRvcDtcbiAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNlbGVjdCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5lZGdlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuZWRnZXMuZGVzZWxlY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgZWRnZXNUb0RlbGV0ZSA9IHRoaXMuZWRnZXMuZ2V0U2VsZWN0ZWRFZGdlcygpO1xuICAgIGVkZ2VzVG9EZWxldGUuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgfSk7XG4gICAgY29uc3Qgbm9kZXNUb0RlbGV0ZSA9IHRoaXMubm9kZXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIG5vZGVzVG9EZWxldGUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgdGhpcy5ub2Rlcy5kZWxldGUobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wVGFyZ2V0SWQgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBpc0Ryb3BTb3VyY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJhZ0ltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGlmICghdGhpcy5kcmFnSW1hZ2UpIHtcbiAgICAgIHRoaXMuZHJhZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3JztcbiAgICAgIHRoaXMuZHJhZ0ltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0ltYWdlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ2FsbGJhY2tzKGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQpIHtcbiAgICB0aGlzLmVkZ2VBZGRlZENhbGxiYWNrID0gZWRnZUFkZGVkQ2FsbGJhY2s7XG4gICAgdGhpcy5ub2RlUmVtb3ZlZENhbGxiYWNrID0gbm9kZVJlbW92ZWRDYWxsYmFjaztcbiAgICB0aGlzLmVkZ2VSZW1vdmVkQ2FsbGJhY2sgPSBlZGdlUmVtb3ZlZENhbGxiYWNrO1xuICB9XG5cbn1cblxuaW50ZXJmYWNlIEh0bWxFbGVtZW50TWFwIHsgW2lkOiBzdHJpbmddOiBIVE1MRWxlbWVudDsgfVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZjTW9kZWw8VD4ge1xuXG4gIG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uuc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWxlY3RlZChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS50b2dnbGVTZWxlY3RlZE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWQob2JqZWN0OiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXQob2JqZWN0OiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmlzRWRpdE9iamVjdChvYmplY3QpO1xuICB9XG59XG5cbmNsYXNzIENvbm5lY3RvcnNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY0Nvbm5lY3Rvcj4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rvcihjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb25uZWN0b3Ige1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG1vZGVsLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbm5lY3RvciBvZiBub2RlLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgaWYgKGNvbm5lY3Rvci5pZCA9PT0gY29ubmVjdG9ySWQpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEh0bWxFbGVtZW50KGNvbm5lY3RvcklkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnNIdG1sRWxlbWVudHNbY29ubmVjdG9ySWRdO1xuICB9XG5cbiAgcHVibGljIHNldEh0bWxFbGVtZW50KGNvbm5lY3RvcklkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9yc0h0bWxFbGVtZW50c1tjb25uZWN0b3JJZF0gPSBlbGVtZW50O1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvb3Jkcyhjb25uZWN0b3JJZDogc3RyaW5nLCBjZW50ZXJlZD86IGJvb2xlYW4pOiBGY0Nvb3JkcyB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0SHRtbEVsZW1lbnQoY29ubmVjdG9ySWQpO1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBjYW52YXMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7eDogMCwgeTogMH07XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RvckVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnRCb3ggPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGNvb3JkczogRmNDb29yZHMgPSB7XG4gICAgICB4OiBjb25uZWN0b3JFbGVtZW50Qm94LmxlZnQgLSBjYW52YXNFbGVtZW50Qm94LmxlZnQsXG4gICAgICB5OiBjb25uZWN0b3JFbGVtZW50Qm94LnRvcCAtIGNhbnZhc0VsZW1lbnRCb3gudG9wXG4gICAgfTtcbiAgICBpZiAoY2VudGVyZWQpIHtcbiAgICAgIGNvb3JkcyA9IHtcbiAgICAgICAgeDogTWF0aC5yb3VuZChjb29yZHMueCArIGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSxcbiAgICAgICAgeTogTWF0aC5yb3VuZChjb29yZHMueSArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMilcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29vcmRzKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENvb3Jkcyhjb25uZWN0b3JJZCwgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q29vcmRzKGNvbm5lY3RvcklkLCB0cnVlKTtcbiAgfVxufVxuXG5jbGFzcyBOb2Rlc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjTm9kZT4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3RvcnNCeVR5cGUobm9kZTogRmNOb2RlLCB0eXBlOiBzdHJpbmcpOiBBcnJheTxGY0Nvbm5lY3Rvcj4ge1xuICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuZmlsdGVyKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHJldHVybiBjb25uZWN0b3IudHlwZSA9PT0gdHlwZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZENvbm5lY3Rvcihub2RlOiBGY05vZGUsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICBub2RlLmNvbm5lY3RvcnMucHVzaChjb25uZWN0b3IpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVOb2RlKG5vZGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBub2RlLmNvbm5lY3RvcnMuc3BsaWNlKG5vZGUuY29ubmVjdG9ycy5pbmRleE9mKGNvbm5lY3RvciksIDEpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlbGV0ZShub2RlOiBGY05vZGUpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KG5vZGUpO1xuICAgIH1cbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGNvbnN0IGluZGV4ID0gbW9kZWwubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFzc2VkIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZWxldGUgbm90IGV4aXN0aW5nIG5vZGUnKTtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdG9ySWRzID0gdGhpcy5nZXRDb25uZWN0b3JJZHMobm9kZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5lZGdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWRnZSA9IG1vZGVsLmVkZ2VzW2ldO1xuICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGVkZ2Uuc291cmNlKSAhPT0gLTEgfHwgY29ubmVjdG9ySWRzLmluZGV4T2YoZWRnZS5kZXN0aW5hdGlvbikgIT09IC0xKSB7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICBtb2RlbC5ub2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVSZW1vdmVkQ2FsbGJhY2sobm9kZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWROb2RlcygpOiBBcnJheTxGY05vZGU+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHJldHVybiBtb2RlbC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5pc1NlbGVjdGVkKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrZWQobm9kZTogRmNOb2RlLCBjdHJsS2V5PzogYm9vbGVhbikge1xuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy50b2dnbGVTZWxlY3RlZChub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLnNlbGVjdChub2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlKG5vZGU6IEZjTm9kZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgdHJ5IHtcbiAgICAgIG1vZGVsLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVOb2Rlcyhtb2RlbC5ub2Rlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG1vZGVsLm5vZGVzLnNwbGljZShtb2RlbC5ub2Rlcy5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JJZHMobm9kZTogRmNOb2RlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5tYXAoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rvci5pZDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZDogc3RyaW5nKTogRmNOb2RlIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtb2RlbC5ub2Rlcykge1xuICAgICAgY29uc3QgY29ubmVjdG9ySWRzID0gdGhpcy5nZXRDb25uZWN0b3JJZHMobm9kZSk7XG4gICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoY29ubmVjdG9ySWQpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldEh0bWxFbGVtZW50KG5vZGVJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5ub2Rlc0h0bWxFbGVtZW50c1tub2RlSWRdO1xuICB9XG5cbiAgcHVibGljIHNldEh0bWxFbGVtZW50KG5vZGVJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzSHRtbEVsZW1lbnRzW25vZGVJZF0gPSBlbGVtZW50O1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG59XG5cbmNsYXNzIEVkZ2VzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNFZGdlPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZHkoZWRnZTogRmNFZGdlKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRIdG1sRWxlbWVudChlZGdlLnNvdXJjZSk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldEh0bWxFbGVtZW50KGVkZ2UuZGVzdGluYXRpb24pO1xuICAgIHJldHVybiBzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBkZXN0aW5hdGlvbiAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvb3JkKGVkZ2U6IEZjRWRnZSk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGVkZ2Uuc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0Q29vcmQoZWRnZTogRmNFZGdlKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoZWRnZS5kZXN0aW5hdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGVkZ2U6IEZjRWRnZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgY29uc3QgaW5kZXggPSBtb2RlbC5lZGdlcy5pbmRleE9mKGVkZ2UpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVsZXRlIG5vdCBleGlzdGluZyBlZGdlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWRnZSkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3QoZWRnZSk7XG4gICAgfVxuICAgIG1vZGVsLmVkZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZVJlbW92ZWRDYWxsYmFjayhlZGdlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEVkZ2VzKCk6IEFycmF5PEZjRWRnZT4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgcmV0dXJuIG1vZGVsLmVkZ2VzLmZpbHRlcigoZWRnZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmlzU2VsZWN0ZWQoZWRnZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZTogRmNFZGdlLCBjdHJsS2V5PzogYm9vbGVhbikge1xuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy50b2dnbGVTZWxlY3RlZChlZGdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnNlbGVjdChlZGdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHV0RWRnZShlZGdlOiBGY0VkZ2UpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIG1vZGVsLmVkZ2VzLnB1c2goZWRnZSk7XG4gIH1cblxuICBwdWJsaWMgX2FkZEVkZ2UoZXZlbnQ6IEV2ZW50LCBzb3VyY2VDb25uZWN0b3I6IEZjQ29ubmVjdG9yLCBkZXN0Q29ubmVjdG9yOiBGY0Nvbm5lY3RvciwgbGFiZWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUNvbm5lY3Rvcihzb3VyY2VDb25uZWN0b3IpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUNvbm5lY3RvcihkZXN0Q29ubmVjdG9yKTtcbiAgICBjb25zdCBlZGdlOiBGY0VkZ2UgPSB7fTtcbiAgICBlZGdlLnNvdXJjZSA9IHNvdXJjZUNvbm5lY3Rvci5pZDtcbiAgICBlZGdlLmRlc3RpbmF0aW9uID0gZGVzdENvbm5lY3Rvci5pZDtcbiAgICBlZGdlLmxhYmVsID0gbGFiZWw7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyhtb2RlbC5lZGdlcy5jb25jYXQoW2VkZ2VdKSwgbW9kZWwubm9kZXMpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNyZWF0ZUVkZ2UoZXZlbnQsIGVkZ2UpLnN1YnNjcmliZShcbiAgICAgIChjcmVhdGVkKSA9PiB7XG4gICAgICAgIG1vZGVsLmVkZ2VzLnB1c2goY3JlYXRlZCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VBZGRlZENhbGxiYWNrKGNyZWF0ZWQpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==