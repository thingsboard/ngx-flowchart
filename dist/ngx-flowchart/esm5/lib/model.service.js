/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { of } from 'rxjs';
var FcModelService = /** @class */ (function () {
    function FcModelService(modelValidation, model, modelChanged, cd, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
        this.connectorsHtmlElements = {};
        this.nodesHtmlElements = {};
        this.canvasHtmlElement = null;
        this.dragImage = null;
        this.svgHtmlElement = null;
        this.modelValidation = modelValidation;
        this.model = model;
        this.modelChanged = modelChanged;
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
    FcModelService.prototype.notifyModelChanged = /**
     * @return {?}
     */
    function () {
        this.modelChanged.emit();
    };
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
    FcModelService.prototype.modelChanged;
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
        this.modelService.notifyModelChanged();
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
        this.modelService.notifyModelChanged();
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
        this.modelService.notifyModelChanged();
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
            _this.modelService.notifyModelChanged();
            _this.modelService.edgeAddedCallback(created);
        }));
    };
    return EdgesModel;
}(AbstractFcModel));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdEM7SUEyQkUsd0JBQVksZUFBeUMsRUFDekMsS0FBYyxFQUNkLFlBQStCLEVBQy9CLEVBQXFCLEVBQ3JCLGVBQXNCLEVBQ3RCLFFBQThDLEVBQzlDLFVBQThELEVBQzlELGlCQUF5QyxFQUN6QyxtQkFBMkMsRUFDM0MsbUJBQTJDLEVBQzNDLGlCQUE4QixFQUM5QixjQUEwQjtRQS9CdEMsMkJBQXNCLEdBQW1CLEVBQUUsQ0FBQztRQUM1QyxzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBZSxJQUFJLENBQUM7UUE2QmhDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUV2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSTs7O1FBQUMsY0FBTyxDQUFDLEVBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSTs7Ozs7UUFB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QTRCLEVBQUUsYUFBMEIsRUFBRSxLQUFhO1FBQXJHLGlCQWdCQztRQWZDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDOztZQUM3RCxJQUFJLEdBQVcsRUFBRTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztZQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVM7Ozs7UUFDakQsVUFBQyxPQUFPO1lBQ04sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUNGLENBQUM7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBekVELENBQXlCLGVBQWUsR0F5RXZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNDb29yZHMsIEZjRWRnZSwgRmNJdGVtSW5mbywgRmNNb2RlbCwgRmNOb2RlLCBGY1JlY3RCb3ggfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBGY01vZGVsU2VydmljZSB7XG5cbiAgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2U7XG4gIG1vZGVsOiBGY01vZGVsO1xuICBjZDogQ2hhbmdlRGV0ZWN0b3JSZWY7XG4gIHNlbGVjdGVkT2JqZWN0czogYW55W107XG5cbiAgY29ubmVjdG9yc0h0bWxFbGVtZW50czogSHRtbEVsZW1lbnRNYXAgPSB7fTtcbiAgbm9kZXNIdG1sRWxlbWVudHM6IEh0bWxFbGVtZW50TWFwID0ge307XG4gIGNhbnZhc0h0bWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIGRyYWdJbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG51bGw7XG4gIHN2Z0h0bWxFbGVtZW50OiBTVkdFbGVtZW50ID0gbnVsbDtcblxuICBkcm9wTm9kZTogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBjcmVhdGVFZGdlOiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPjtcbiAgZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG5cbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG5cbiAgbW9kZWxDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBjb25uZWN0b3JzOiBDb25uZWN0b3JzTW9kZWw7XG4gIG5vZGVzOiBOb2Rlc01vZGVsO1xuICBlZGdlczogRWRnZXNNb2RlbDtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWw6IEZjTW9kZWwsXG4gICAgICAgICAgICAgIG1vZGVsQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4sXG4gICAgICAgICAgICAgIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXSxcbiAgICAgICAgICAgICAgZHJvcE5vZGU6IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY3JlYXRlRWRnZTogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT4sXG4gICAgICAgICAgICAgIGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBjYW52YXNIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgIHN2Z0h0bWxFbGVtZW50OiBTVkdFbGVtZW50KSB7XG5cbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbiA9IG1vZGVsVmFsaWRhdGlvbjtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5tb2RlbENoYW5nZWQgPSBtb2RlbENoYW5nZWQ7XG4gICAgdGhpcy5jZCA9IGNkO1xuICAgIHRoaXMuY2FudmFzSHRtbEVsZW1lbnQgPSBjYW52YXNIdG1sRWxlbWVudDtcbiAgICB0aGlzLnN2Z0h0bWxFbGVtZW50ID0gc3ZnSHRtbEVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVNb2RlbCh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cyA9IHNlbGVjdGVkT2JqZWN0cztcblxuICAgIHRoaXMuZHJvcE5vZGUgPSBkcm9wTm9kZSB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMuY3JlYXRlRWRnZSA9IGNyZWF0ZUVkZ2UgfHwgKChldmVudCwgZWRnZSkgPT4gb2Yoey4uLmVkZ2UsIGxhYmVsOiAnbGFiZWwnfSkpO1xuICAgIHRoaXMuZWRnZUFkZGVkQ2FsbGJhY2sgPSBlZGdlQWRkZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMubm9kZVJlbW92ZWRDYWxsYmFjayA9IG5vZGVSZW1vdmVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLmVkZ2VSZW1vdmVkQ2FsbGJhY2sgPSBlZGdlUmVtb3ZlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG5cbiAgICB0aGlzLmNvbm5lY3RvcnMgPSBuZXcgQ29ubmVjdG9yc01vZGVsKHRoaXMpO1xuICAgIHRoaXMubm9kZXMgPSBuZXcgTm9kZXNNb2RlbCh0aGlzKTtcbiAgICB0aGlzLmVkZ2VzID0gbmV3IEVkZ2VzTW9kZWwodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5TW9kZWxDaGFuZ2VkKCkge1xuICAgIHRoaXMubW9kZWxDaGFuZ2VkLmVtaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRlY3RDaGFuZ2VzKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09PSAtMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZXNlbGVjdCBhbiB1bnNlbGVjdGVkIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgIT09IC0xO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUucmVhZG9ubHkpIHtcbiAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKGVkZ2UgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0T2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgaW5SZWN0Qm94KHg6IG51bWJlciwgeTogbnVtYmVyLCByZWN0Qm94OiBGY1JlY3RCb3gpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA+PSByZWN0Qm94LmxlZnQgJiYgeCA8PSByZWN0Qm94LnJpZ2h0ICYmXG4gICAgICB5ID49IHJlY3RCb3gudG9wICYmIHkgPD0gcmVjdEJveC5ib3R0b207XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbUluZm9BdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNJdGVtSW5mbyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IHRoaXMuZ2V0Tm9kZUF0UG9pbnQoeCwgeSksXG4gICAgICBlZGdlOiB0aGlzLmdldEVkZ2VBdFBvaW50KHgsIHkpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjTm9kZSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMubW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5vZGVzLmdldEh0bWxFbGVtZW50KG5vZGUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHggPj0gbm9kZUVsZW1lbnRCb3gubGVmdCAmJiB4IDw9IG5vZGVFbGVtZW50Qm94LnJpZ2h0XG4gICAgICAgICYmIHkgPj0gbm9kZUVsZW1lbnRCb3gudG9wICYmIHkgPD0gbm9kZUVsZW1lbnRCb3guYm90dG9tKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjRWRnZSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkO1xuICAgIGxldCBlZGdlSW5kZXggPSAtMTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLXBhdGgtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1wYXRoLScubGVuZ3RoKSk7XG4gICAgICB9IGVsc2UgaWYgKGlkLnN0YXJ0c1dpdGgoJ2ZjLWVkZ2UtbGFiZWwtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1sYWJlbC0nLmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRnZUluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsLmVkZ2VzW2VkZ2VJbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbEluUmVjdChyZWN0Qm94OiBGY1JlY3RCb3gpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudCh2YWx1ZS5pZCk7XG4gICAgICBjb25zdCBub2RlRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoIXZhbHVlLnJlYWRvbmx5KSB7XG4gICAgICAgIGNvbnN0IHggPSBub2RlRWxlbWVudEJveC5sZWZ0ICsgbm9kZUVsZW1lbnRCb3gud2lkdGggLyAyO1xuICAgICAgICBjb25zdCB5ID0gbm9kZUVsZW1lbnRCb3gudG9wICsgbm9kZUVsZW1lbnRCb3guaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYgKHRoaXMuaW5SZWN0Qm94KHgsIHksIHJlY3RCb3gpKSB7XG4gICAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50Qm94ID0gdGhpcy5jYW52YXNIdG1sRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLm1vZGVsLmVkZ2VzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZWRnZXMuc291cmNlQ29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgZW5kID0gdGhpcy5lZGdlcy5kZXN0Q29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgeCA9IChzdGFydC54ICsgZW5kLngpIC8gMiArIGNhbnZhc0VsZW1lbnRCb3gubGVmdDtcbiAgICAgIGNvbnN0IHkgPSAoc3RhcnQueSArIGVuZC55KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LnRvcDtcbiAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNlbGVjdCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5lZGdlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuZWRnZXMuZGVzZWxlY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgZWRnZXNUb0RlbGV0ZSA9IHRoaXMuZWRnZXMuZ2V0U2VsZWN0ZWRFZGdlcygpO1xuICAgIGVkZ2VzVG9EZWxldGUuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgfSk7XG4gICAgY29uc3Qgbm9kZXNUb0RlbGV0ZSA9IHRoaXMubm9kZXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIG5vZGVzVG9EZWxldGUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgdGhpcy5ub2Rlcy5kZWxldGUobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wVGFyZ2V0SWQgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBpc0Ryb3BTb3VyY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJhZ0ltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGlmICghdGhpcy5kcmFnSW1hZ2UpIHtcbiAgICAgIHRoaXMuZHJhZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3JztcbiAgICAgIHRoaXMuZHJhZ0ltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0ltYWdlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ2FsbGJhY2tzKGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQpIHtcbiAgICB0aGlzLmVkZ2VBZGRlZENhbGxiYWNrID0gZWRnZUFkZGVkQ2FsbGJhY2s7XG4gICAgdGhpcy5ub2RlUmVtb3ZlZENhbGxiYWNrID0gbm9kZVJlbW92ZWRDYWxsYmFjaztcbiAgICB0aGlzLmVkZ2VSZW1vdmVkQ2FsbGJhY2sgPSBlZGdlUmVtb3ZlZENhbGxiYWNrO1xuICB9XG5cbn1cblxuaW50ZXJmYWNlIEh0bWxFbGVtZW50TWFwIHsgW2lkOiBzdHJpbmddOiBIVE1MRWxlbWVudDsgfVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZjTW9kZWw8VD4ge1xuXG4gIG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uuc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWxlY3RlZChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS50b2dnbGVTZWxlY3RlZE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWQob2JqZWN0OiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXQob2JqZWN0OiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmlzRWRpdE9iamVjdChvYmplY3QpO1xuICB9XG59XG5cbmNsYXNzIENvbm5lY3RvcnNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY0Nvbm5lY3Rvcj4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rvcihjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb25uZWN0b3Ige1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG1vZGVsLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbm5lY3RvciBvZiBub2RlLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgaWYgKGNvbm5lY3Rvci5pZCA9PT0gY29ubmVjdG9ySWQpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEh0bWxFbGVtZW50KGNvbm5lY3RvcklkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnNIdG1sRWxlbWVudHNbY29ubmVjdG9ySWRdO1xuICB9XG5cbiAgcHVibGljIHNldEh0bWxFbGVtZW50KGNvbm5lY3RvcklkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9yc0h0bWxFbGVtZW50c1tjb25uZWN0b3JJZF0gPSBlbGVtZW50O1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvb3Jkcyhjb25uZWN0b3JJZDogc3RyaW5nLCBjZW50ZXJlZD86IGJvb2xlYW4pOiBGY0Nvb3JkcyB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0SHRtbEVsZW1lbnQoY29ubmVjdG9ySWQpO1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBjYW52YXMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7eDogMCwgeTogMH07XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RvckVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnRCb3ggPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGNvb3JkczogRmNDb29yZHMgPSB7XG4gICAgICB4OiBjb25uZWN0b3JFbGVtZW50Qm94LmxlZnQgLSBjYW52YXNFbGVtZW50Qm94LmxlZnQsXG4gICAgICB5OiBjb25uZWN0b3JFbGVtZW50Qm94LnRvcCAtIGNhbnZhc0VsZW1lbnRCb3gudG9wXG4gICAgfTtcbiAgICBpZiAoY2VudGVyZWQpIHtcbiAgICAgIGNvb3JkcyA9IHtcbiAgICAgICAgeDogTWF0aC5yb3VuZChjb29yZHMueCArIGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKSxcbiAgICAgICAgeTogTWF0aC5yb3VuZChjb29yZHMueSArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMilcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29vcmRzKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENvb3Jkcyhjb25uZWN0b3JJZCwgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q29vcmRzKGNvbm5lY3RvcklkLCB0cnVlKTtcbiAgfVxufVxuXG5jbGFzcyBOb2Rlc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjTm9kZT4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3RvcnNCeVR5cGUobm9kZTogRmNOb2RlLCB0eXBlOiBzdHJpbmcpOiBBcnJheTxGY0Nvbm5lY3Rvcj4ge1xuICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuZmlsdGVyKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHJldHVybiBjb25uZWN0b3IudHlwZSA9PT0gdHlwZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZENvbm5lY3Rvcihub2RlOiBGY05vZGUsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICBub2RlLmNvbm5lY3RvcnMucHVzaChjb25uZWN0b3IpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVOb2RlKG5vZGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBub2RlLmNvbm5lY3RvcnMuc3BsaWNlKG5vZGUuY29ubmVjdG9ycy5pbmRleE9mKGNvbm5lY3RvciksIDEpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlbGV0ZShub2RlOiBGY05vZGUpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KG5vZGUpO1xuICAgIH1cbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGNvbnN0IGluZGV4ID0gbW9kZWwubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFzc2VkIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZWxldGUgbm90IGV4aXN0aW5nIG5vZGUnKTtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdG9ySWRzID0gdGhpcy5nZXRDb25uZWN0b3JJZHMobm9kZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5lZGdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWRnZSA9IG1vZGVsLmVkZ2VzW2ldO1xuICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGVkZ2Uuc291cmNlKSAhPT0gLTEgfHwgY29ubmVjdG9ySWRzLmluZGV4T2YoZWRnZS5kZXN0aW5hdGlvbikgIT09IC0xKSB7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICBtb2RlbC5ub2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVSZW1vdmVkQ2FsbGJhY2sobm9kZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWROb2RlcygpOiBBcnJheTxGY05vZGU+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHJldHVybiBtb2RlbC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5pc1NlbGVjdGVkKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrZWQobm9kZTogRmNOb2RlLCBjdHJsS2V5PzogYm9vbGVhbikge1xuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy50b2dnbGVTZWxlY3RlZChub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLnNlbGVjdChub2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlKG5vZGU6IEZjTm9kZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgdHJ5IHtcbiAgICAgIG1vZGVsLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVOb2Rlcyhtb2RlbC5ub2Rlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG1vZGVsLm5vZGVzLnNwbGljZShtb2RlbC5ub2Rlcy5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JJZHMobm9kZTogRmNOb2RlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5tYXAoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rvci5pZDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZDogc3RyaW5nKTogRmNOb2RlIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtb2RlbC5ub2Rlcykge1xuICAgICAgY29uc3QgY29ubmVjdG9ySWRzID0gdGhpcy5nZXRDb25uZWN0b3JJZHMobm9kZSk7XG4gICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoY29ubmVjdG9ySWQpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldEh0bWxFbGVtZW50KG5vZGVJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5ub2Rlc0h0bWxFbGVtZW50c1tub2RlSWRdO1xuICB9XG5cbiAgcHVibGljIHNldEh0bWxFbGVtZW50KG5vZGVJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzSHRtbEVsZW1lbnRzW25vZGVJZF0gPSBlbGVtZW50O1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG59XG5cbmNsYXNzIEVkZ2VzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNFZGdlPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZHkoZWRnZTogRmNFZGdlKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRIdG1sRWxlbWVudChlZGdlLnNvdXJjZSk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldEh0bWxFbGVtZW50KGVkZ2UuZGVzdGluYXRpb24pO1xuICAgIHJldHVybiBzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBkZXN0aW5hdGlvbiAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvb3JkKGVkZ2U6IEZjRWRnZSk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGVkZ2Uuc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0Q29vcmQoZWRnZTogRmNFZGdlKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoZWRnZS5kZXN0aW5hdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGVkZ2U6IEZjRWRnZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgY29uc3QgaW5kZXggPSBtb2RlbC5lZGdlcy5pbmRleE9mKGVkZ2UpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVsZXRlIG5vdCBleGlzdGluZyBlZGdlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWRnZSkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3QoZWRnZSk7XG4gICAgfVxuICAgIG1vZGVsLmVkZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZVJlbW92ZWRDYWxsYmFjayhlZGdlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEVkZ2VzKCk6IEFycmF5PEZjRWRnZT4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgcmV0dXJuIG1vZGVsLmVkZ2VzLmZpbHRlcigoZWRnZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmlzU2VsZWN0ZWQoZWRnZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZTogRmNFZGdlLCBjdHJsS2V5PzogYm9vbGVhbikge1xuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy50b2dnbGVTZWxlY3RlZChlZGdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnNlbGVjdChlZGdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHV0RWRnZShlZGdlOiBGY0VkZ2UpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIG1vZGVsLmVkZ2VzLnB1c2goZWRnZSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gIH1cblxuICBwdWJsaWMgX2FkZEVkZ2UoZXZlbnQ6IEV2ZW50LCBzb3VyY2VDb25uZWN0b3I6IEZjQ29ubmVjdG9yLCBkZXN0Q29ubmVjdG9yOiBGY0Nvbm5lY3RvciwgbGFiZWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUNvbm5lY3Rvcihzb3VyY2VDb25uZWN0b3IpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUNvbm5lY3RvcihkZXN0Q29ubmVjdG9yKTtcbiAgICBjb25zdCBlZGdlOiBGY0VkZ2UgPSB7fTtcbiAgICBlZGdlLnNvdXJjZSA9IHNvdXJjZUNvbm5lY3Rvci5pZDtcbiAgICBlZGdlLmRlc3RpbmF0aW9uID0gZGVzdENvbm5lY3Rvci5pZDtcbiAgICBlZGdlLmxhYmVsID0gbGFiZWw7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyhtb2RlbC5lZGdlcy5jb25jYXQoW2VkZ2VdKSwgbW9kZWwubm9kZXMpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNyZWF0ZUVkZ2UoZXZlbnQsIGVkZ2UpLnN1YnNjcmliZShcbiAgICAgIChjcmVhdGVkKSA9PiB7XG4gICAgICAgIG1vZGVsLmVkZ2VzLnB1c2goY3JlYXRlZCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlQWRkZWRDYWxsYmFjayhjcmVhdGVkKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=