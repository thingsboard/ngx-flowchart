/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var FcModelService = /** @class */ (function () {
    function FcModelService(modelValidation, model, modelChanged, cd, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
        var _this = this;
        this.connectorsHtmlElements = {};
        this.nodesHtmlElements = {};
        this.canvasHtmlElement = null;
        this.dragImage = null;
        this.svgHtmlElement = null;
        this.debouncer = new Subject();
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
        this.debouncer
            .pipe(debounceTime(100))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.modelChanged.emit(); }));
    }
    /**
     * @return {?}
     */
    FcModelService.prototype.notifyModelChanged = /**
     * @return {?}
     */
    function () {
        this.debouncer.next();
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
    /**
     * @type {?}
     * @private
     */
    FcModelService.prototype.modelChanged;
    /**
     * @type {?}
     * @private
     */
    FcModelService.prototype.debouncer;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QztJQTRCRSx3QkFBWSxlQUF5QyxFQUN6QyxLQUFjLEVBQ2QsWUFBK0IsRUFDL0IsRUFBcUIsRUFDckIsZUFBc0IsRUFDdEIsUUFBOEMsRUFDOUMsVUFBOEQsRUFDOUQsaUJBQXlDLEVBQ3pDLG1CQUEyQyxFQUMzQyxtQkFBMkMsRUFDM0MsaUJBQThCLEVBQzlCLGNBQTBCO1FBWHRDLGlCQW1DQztRQXhERCwyQkFBc0IsR0FBbUIsRUFBRSxDQUFDO1FBQzVDLHNCQUFpQixHQUFtQixFQUFFLENBQUM7UUFDdkMsc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUN0QyxjQUFTLEdBQXFCLElBQUksQ0FBQztRQUNuQyxtQkFBYyxHQUFlLElBQUksQ0FBQztRQVdqQixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQW1COUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBRXZDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJOzs7UUFBQyxjQUFPLENBQUMsRUFBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJOzs7OztRQUFDLFVBQUMsS0FBSyxFQUFFLElBQUksSUFBSyxPQUFBLEVBQUUsc0JBQUssSUFBSSxJQUFFLEtBQUssRUFBRSxPQUFPLElBQUUsRUFBN0IsQ0FBNkIsRUFBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsSUFBSTs7O1FBQUMsY0FBTyxDQUFDLEVBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLElBQUk7OztRQUFDLGNBQU8sQ0FBQyxFQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixJQUFJOzs7UUFBQyxjQUFPLENBQUMsRUFBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxTQUFTO2FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QixTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFTSwyQ0FBa0I7OztJQUF6QjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVNLHNDQUFhOzs7SUFBcEI7UUFBQSxpQkFJQztRQUhDLFVBQVU7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7OztJQUVNLHFDQUFZOzs7O0lBQW5CLFVBQW9CLE1BQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkM7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU0sdUNBQWM7Ozs7SUFBckIsVUFBc0IsTUFBVztRQUMvQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTs7Z0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNsRCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Ozs7SUFFTSw2Q0FBb0I7Ozs7SUFBM0IsVUFBNEIsTUFBVztRQUNyQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFTSx5Q0FBZ0I7Ozs7SUFBdkIsVUFBd0IsTUFBVztRQUNqQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7SUFFTSxrQ0FBUzs7O0lBQWhCO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxJQUFJO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSTtZQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRU0sb0NBQVc7OztJQUFsQjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVNLHFDQUFZOzs7O0lBQW5CLFVBQW9CLE1BQVc7UUFDN0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7O0lBRU8sa0NBQVM7Ozs7Ozs7SUFBakIsVUFBa0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFrQjtRQUN4RCxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSztZQUM1QyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxDQUFDOzs7Ozs7SUFFTSwyQ0FBa0I7Ozs7O0lBQXpCLFVBQTBCLENBQVMsRUFBRSxDQUFTO1FBQzVDLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVNLHVDQUFjOzs7OztJQUFyQixVQUFzQixDQUFTLEVBQUUsQ0FBUzs7O1lBQ3hDLEtBQW1CLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtnQkFBaEMsSUFBTSxJQUFJLFdBQUE7O29CQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztvQkFDNUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLEtBQUs7dUJBQ3BELENBQUMsSUFBSSxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUMxRCxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQUVNLHVDQUFjOzs7OztJQUFyQixVQUFzQixDQUFTLEVBQUUsQ0FBUzs7WUFDbEMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUN6QyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7O1lBQ2pCLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xDLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUMxRDtpQkFBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDMUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtRQUNELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRU0sd0NBQWU7Ozs7SUFBdEIsVUFBdUIsT0FBa0I7UUFBekMsaUJBOEJDO1FBN0JDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQUs7O2dCQUN2QixPQUFPLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7Z0JBQzdDLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUU7WUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7O29CQUNiLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxLQUFLLEdBQUcsQ0FBQzs7b0JBQ2xELENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDeEQsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUU7b0JBQ2pDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDTCxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNoQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDNUI7aUJBQ0Y7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDOztZQUNHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRTtRQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxLQUFLOztnQkFDdkIsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3JDLEdBQUcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7O2dCQUNqQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSTs7Z0JBQ2pELENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHO1lBQ3RELElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtpQkFBTTtnQkFDTCxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNoQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVNLHVDQUFjOzs7SUFBckI7UUFBQSxpQkFTQzs7WUFSTyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUNuRCxhQUFhLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsSUFBSTtZQUN6QixLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQzs7WUFDRyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUNuRCxhQUFhLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsSUFBSTtZQUN6QixLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFTSxtQ0FBVTs7O0lBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRU0scUNBQVk7OztJQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUM7SUFDekMsQ0FBQzs7OztJQUVNLHFDQUFZOzs7SUFBbkI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsZ0ZBQWdGLENBQUM7WUFDdEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7O0lBRU0sMENBQWlCOzs7Ozs7SUFBeEIsVUFBeUIsaUJBQXlDLEVBQ3pDLG1CQUEyQyxFQUMzQyxtQkFBMkM7UUFDbEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7SUFDakQsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQTVPRCxJQTRPQzs7OztJQTFPQyx5Q0FBMEM7O0lBQzFDLCtCQUFlOztJQUNmLDRCQUFzQjs7SUFDdEIseUNBQXVCOztJQUV2QixnREFBNEM7O0lBQzVDLDJDQUF1Qzs7SUFDdkMsMkNBQXNDOztJQUN0QyxtQ0FBbUM7O0lBQ25DLHdDQUFrQzs7SUFFbEMsa0NBQStDOztJQUMvQyxvQ0FBK0Q7O0lBQy9ELDJDQUEwQzs7SUFDMUMsNkNBQTRDOztJQUM1Qyw2Q0FBNEM7O0lBRTVDLHNDQUFxQjs7Ozs7SUFFckIsc0NBQWlEOzs7OztJQUNqRCxtQ0FBZ0Q7O0lBRWhELG9DQUE0Qjs7SUFDNUIsK0JBQWtCOztJQUNsQiwrQkFBa0I7Ozs7O0FBb05wQiw2QkFBdUQ7Ozs7O0FBRXZEOzs7OztJQUlFLHlCQUFzQixZQUE0QjtRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVNLGdDQUFNOzs7O0lBQWIsVUFBYyxNQUFTO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRU0sa0NBQVE7Ozs7SUFBZixVQUFnQixNQUFTO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRU0sd0NBQWM7Ozs7SUFBckIsVUFBc0IsTUFBUztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRU0sb0NBQVU7Ozs7SUFBakIsVUFBa0IsTUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFTSxnQ0FBTTs7OztJQUFiLFVBQWMsTUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7OztJQXpCQyx1Q0FBNkI7O0FBMkIvQjtJQUE4QiwyQ0FBNEI7SUFFeEQseUJBQVksWUFBNEI7ZUFDdEMsa0JBQU0sWUFBWSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0sc0NBQVk7Ozs7SUFBbkIsVUFBb0IsV0FBbUI7OztZQUMvQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLOztZQUNyQyxLQUFtQixJQUFBLEtBQUEsaUJBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtnQkFBM0IsSUFBTSxJQUFJLFdBQUE7O29CQUNiLEtBQXdCLElBQUEsb0JBQUEsaUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFBLGdCQUFBLDRCQUFFO3dCQUFwQyxJQUFNLFNBQVMsV0FBQTt3QkFDbEIsSUFBSSxTQUFTLENBQUMsRUFBRSxLQUFLLFdBQVcsRUFBRTs0QkFDaEMsT0FBTyxTQUFTLENBQUM7eUJBQ2xCO3FCQUNGOzs7Ozs7Ozs7YUFDRjs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Ozs7SUFFTSx3Q0FBYzs7OztJQUFyQixVQUFzQixXQUFtQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7O0lBRU0sd0NBQWM7Ozs7O0lBQXJCLFVBQXNCLFdBQW1CLEVBQUUsT0FBb0I7UUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7O0lBRU8sb0NBQVU7Ozs7OztJQUFsQixVQUFtQixXQUFtQixFQUFFLFFBQWtCOztZQUNsRCxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7O1lBQzFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQjtRQUNsRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ2hFLE9BQU8sRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztTQUNyQjs7WUFDSyxtQkFBbUIsR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUU7O1lBQ3JELGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTs7WUFDbkQsTUFBTSxHQUFhO1lBQ3JCLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSTtZQUNuRCxDQUFDLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUc7U0FDbEQ7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sR0FBRztnQkFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ25ELENBQUM7U0FDSDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRU0sbUNBQVM7Ozs7SUFBaEIsVUFBaUIsV0FBbUI7UUFDbEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVNLDBDQUFnQjs7OztJQUF2QixVQUF3QixXQUFtQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUF0REQsQ0FBOEIsZUFBZSxHQXNENUM7QUFFRDtJQUF5QixzQ0FBdUI7SUFFOUMsb0JBQVksWUFBNEI7ZUFDdEMsa0JBQU0sWUFBWSxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQUVNLHdDQUFtQjs7Ozs7SUFBMUIsVUFBMkIsSUFBWSxFQUFFLElBQVk7UUFDbkQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLFNBQVM7WUFDdEMsT0FBTyxTQUFTLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztRQUNqQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxrQ0FBYTs7Ozs7O0lBQXJCLFVBQXNCLElBQVksRUFBRSxTQUFzQjtRQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxJQUFJO1lBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3REO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7SUFFTSwyQkFBTTs7OztJQUFiLFVBQWMsSUFBWTtRQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjs7WUFDSyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLOztZQUMvQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3REOztZQUNLLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUNyQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDN0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLEVBQUUsQ0FBQzthQUNMO1NBQ0Y7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7OztJQUVNLHFDQUFnQjs7O0lBQXZCO1FBQUEsaUJBS0M7O1lBSk8sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztRQUNyQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsSUFBSTtZQUM3QixPQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLGtDQUFhOzs7OztJQUFwQixVQUFxQixJQUFZLEVBQUUsT0FBaUI7UUFDbEQsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sNkJBQVE7Ozs7O0lBQWhCLFVBQWlCLElBQVk7O1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFDckMsSUFBSTtZQUNGLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7OztJQUVNLG9DQUFlOzs7O0lBQXRCLFVBQXVCLElBQVk7UUFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLFNBQVM7WUFDbkMsT0FBTyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSx5Q0FBb0I7Ozs7SUFBM0IsVUFBNEIsV0FBbUI7OztZQUN2QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLOztZQUNyQyxLQUFtQixJQUFBLEtBQUEsaUJBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtnQkFBM0IsSUFBTSxJQUFJLFdBQUE7O29CQUNQLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDL0MsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUMxQyxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRU0sbUNBQWM7Ozs7SUFBckIsVUFBc0IsTUFBYztRQUNsQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7O0lBRU0sbUNBQWM7Ozs7O0lBQXJCLFVBQXNCLE1BQWMsRUFBRSxPQUFvQjtRQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFSCxpQkFBQztBQUFELENBQUMsQUFwR0QsQ0FBeUIsZUFBZSxHQW9HdkM7QUFFRDtJQUF5QixzQ0FBdUI7SUFFOUMsb0JBQVksWUFBNEI7ZUFDdEMsa0JBQU0sWUFBWSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0sMEJBQUs7Ozs7SUFBWixVQUFhLElBQVk7O1lBQ2pCLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7WUFDakUsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2pGLE9BQU8sTUFBTSxLQUFLLFNBQVMsSUFBSSxXQUFXLEtBQUssU0FBUyxDQUFDO0lBQzNELENBQUM7Ozs7O0lBRU0sZ0NBQVc7Ozs7SUFBbEIsVUFBbUIsSUFBWTtRQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7OztJQUVNLDhCQUFTOzs7O0lBQWhCLFVBQWlCLElBQVk7UUFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Ozs7SUFFTSwyQkFBTTs7OztJQUFiLFVBQWMsSUFBWTs7WUFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSzs7WUFDL0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7O0lBRU0scUNBQWdCOzs7SUFBdkI7UUFBQSxpQkFLQzs7WUFKTyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxJQUFJO1lBQzdCLE9BQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU0seUNBQW9COzs7OztJQUEzQixVQUE0QixJQUFZLEVBQUUsT0FBaUI7UUFDekQsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7Ozs7SUFFTSw0QkFBTzs7OztJQUFkLFVBQWUsSUFBWTs7WUFDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztRQUNyQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7Ozs7SUFFTSw2QkFBUTs7Ozs7OztJQUFmLFVBQWdCLEtBQVksRUFBRSxlQUE0QixFQUFFLGFBQTBCLEVBQUUsS0FBYTtRQUFyRyxpQkFnQkM7UUFmQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7WUFDN0QsSUFBSSxHQUFXLEVBQUU7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7WUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ2pELFVBQUMsT0FBTztZQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN2QyxLQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFDRixDQUFDO0lBQ0osQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQXpFRCxDQUF5QixlQUFlLEdBeUV2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNDb25uZWN0b3IsIEZjQ29vcmRzLCBGY0VkZ2UsIEZjSXRlbUluZm8sIEZjTW9kZWwsIEZjTm9kZSwgRmNSZWN0Qm94IH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgRmNNb2RlbFNlcnZpY2Uge1xuXG4gIG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlO1xuICBtb2RlbDogRmNNb2RlbDtcbiAgY2Q6IENoYW5nZURldGVjdG9yUmVmO1xuICBzZWxlY3RlZE9iamVjdHM6IGFueVtdO1xuXG4gIGNvbm5lY3RvcnNIdG1sRWxlbWVudHM6IEh0bWxFbGVtZW50TWFwID0ge307XG4gIG5vZGVzSHRtbEVsZW1lbnRzOiBIdG1sRWxlbWVudE1hcCA9IHt9O1xuICBjYW52YXNIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBkcmFnSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICBzdmdIdG1sRWxlbWVudDogU1ZHRWxlbWVudCA9IG51bGw7XG5cbiAgZHJvcE5vZGU6IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY3JlYXRlRWRnZTogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT47XG4gIGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuXG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSByZWFkb25seSBkZWJvdW5jZXIgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29ubmVjdG9yczogQ29ubmVjdG9yc01vZGVsO1xuICBub2RlczogTm9kZXNNb2RlbDtcbiAgZWRnZXM6IEVkZ2VzTW9kZWw7XG5cbiAgY29uc3RydWN0b3IobW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIG1vZGVsOiBGY01vZGVsLFxuICAgICAgICAgICAgICBtb2RlbENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+LFxuICAgICAgICAgICAgICBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHNlbGVjdGVkT2JqZWN0czogYW55W10sXG4gICAgICAgICAgICAgIGRyb3BOb2RlOiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGNyZWF0ZUVkZ2U6IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+LFxuICAgICAgICAgICAgICBlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY2FudmFzSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICBzdmdIdG1sRWxlbWVudDogU1ZHRWxlbWVudCkge1xuXG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24gPSBtb2RlbFZhbGlkYXRpb247XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMubW9kZWxDaGFuZ2VkID0gbW9kZWxDaGFuZ2VkO1xuICAgIHRoaXMuY2QgPSBjZDtcbiAgICB0aGlzLmNhbnZhc0h0bWxFbGVtZW50ID0gY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgdGhpcy5zdmdIdG1sRWxlbWVudCA9IHN2Z0h0bWxFbGVtZW50O1xuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTW9kZWwodGhpcy5tb2RlbCk7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMgPSBzZWxlY3RlZE9iamVjdHM7XG5cbiAgICB0aGlzLmRyb3BOb2RlID0gZHJvcE5vZGUgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLmNyZWF0ZUVkZ2UgPSBjcmVhdGVFZGdlIHx8ICgoZXZlbnQsIGVkZ2UpID0+IG9mKHsuLi5lZGdlLCBsYWJlbDogJ2xhYmVsJ30pKTtcbiAgICB0aGlzLmVkZ2VBZGRlZENhbGxiYWNrID0gZWRnZUFkZGVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLm5vZGVSZW1vdmVkQ2FsbGJhY2sgPSBub2RlUmVtb3ZlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5lZGdlUmVtb3ZlZENhbGxiYWNrID0gZWRnZVJlbW92ZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuXG4gICAgdGhpcy5jb25uZWN0b3JzID0gbmV3IENvbm5lY3RvcnNNb2RlbCh0aGlzKTtcbiAgICB0aGlzLm5vZGVzID0gbmV3IE5vZGVzTW9kZWwodGhpcyk7XG4gICAgdGhpcy5lZGdlcyA9IG5ldyBFZGdlc01vZGVsKHRoaXMpO1xuXG4gICAgdGhpcy5kZWJvdW5jZXJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgxMDApKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGVsQ2hhbmdlZC5lbWl0KCkpO1xuICB9XG5cbiAgcHVibGljIG5vdGlmeU1vZGVsQ2hhbmdlZCgpIHtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRWRpdGFibGUoKSkge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRWRpdGFibGUoKSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVzZWxlY3QgYW4gdW5zZWxlY3RlZCBvYmplY3QnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGVkT2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZE9iamVjdChvYmplY3QpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlLnJlYWRvbmx5KSB7XG4gICAgICAgIHRoaXMubm9kZXMuc2VsZWN0KG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubW9kZWwuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgIHRoaXMuZWRnZXMuc2VsZWN0KGVkZ2UpO1xuICAgIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkT2JqZWN0cy5sZW5ndGgpO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5sZW5ndGggPT09IDEgJiZcbiAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSAhPT0gLTE7XG4gIH1cblxuICBwcml2YXRlIGluUmVjdEJveCh4OiBudW1iZXIsIHk6IG51bWJlciwgcmVjdEJveDogRmNSZWN0Qm94KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHggPj0gcmVjdEJveC5sZWZ0ICYmIHggPD0gcmVjdEJveC5yaWdodCAmJlxuICAgICAgeSA+PSByZWN0Qm94LnRvcCAmJiB5IDw9IHJlY3RCb3guYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGdldEl0ZW1JbmZvQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjSXRlbUluZm8ge1xuICAgIHJldHVybiB7XG4gICAgICBub2RlOiB0aGlzLmdldE5vZGVBdFBvaW50KHgsIHkpLFxuICAgICAgZWRnZTogdGhpcy5nZXRFZGdlQXRQb2ludCh4LCB5KVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZUF0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY05vZGUge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm1vZGVsLm5vZGVzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudChub2RlLmlkKTtcbiAgICAgIGNvbnN0IG5vZGVFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICh4ID49IG5vZGVFbGVtZW50Qm94LmxlZnQgJiYgeCA8PSBub2RlRWxlbWVudEJveC5yaWdodFxuICAgICAgICAmJiB5ID49IG5vZGVFbGVtZW50Qm94LnRvcCAmJiB5IDw9IG5vZGVFbGVtZW50Qm94LmJvdHRvbSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWRnZUF0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY0VkZ2Uge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xuICAgIGNvbnN0IGlkID0gZWxlbWVudC5pZDtcbiAgICBsZXQgZWRnZUluZGV4ID0gLTE7XG4gICAgaWYgKGlkKSB7XG4gICAgICBpZiAoaWQuc3RhcnRzV2l0aCgnZmMtZWRnZS1wYXRoLScpKSB7XG4gICAgICAgIGVkZ2VJbmRleCA9IE51bWJlcihpZC5zdWJzdHJpbmcoJ2ZjLWVkZ2UtcGF0aC0nLmxlbmd0aCkpO1xuICAgICAgfSBlbHNlIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLWxhYmVsLScpKSB7XG4gICAgICAgIGVkZ2VJbmRleCA9IE51bWJlcihpZC5zdWJzdHJpbmcoJ2ZjLWVkZ2UtbGFiZWwtJy5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVkZ2VJbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbC5lZGdlc1tlZGdlSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGxJblJlY3QocmVjdEJveDogRmNSZWN0Qm94KSB7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubm9kZXMuZ2V0SHRtbEVsZW1lbnQodmFsdWUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCF2YWx1ZS5yZWFkb25seSkge1xuICAgICAgICBjb25zdCB4ID0gbm9kZUVsZW1lbnRCb3gubGVmdCArIG5vZGVFbGVtZW50Qm94LndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgeSA9IG5vZGVFbGVtZW50Qm94LnRvcCArIG5vZGVFbGVtZW50Qm94LmhlaWdodCAvIDI7XG4gICAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICAgIHRoaXMubm9kZXMuc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5ub2Rlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5kZXNlbGVjdCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudEJveCA9IHRoaXMuY2FudmFzSHRtbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmVkZ2VzLnNvdXJjZUNvb3JkKHZhbHVlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHRoaXMuZWRnZXMuZGVzdENvb3JkKHZhbHVlKTtcbiAgICAgIGNvbnN0IHggPSAoc3RhcnQueCArIGVuZC54KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gKHN0YXJ0LnkgKyBlbmQueSkgLyAyICsgY2FudmFzRWxlbWVudEJveC50b3A7XG4gICAgICBpZiAodGhpcy5pblJlY3RCb3goeCwgeSwgcmVjdEJveCkpIHtcbiAgICAgICAgdGhpcy5lZGdlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZWRnZXMuaXNTZWxlY3RlZCh2YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLmVkZ2VzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVNlbGVjdGVkKCkge1xuICAgIGNvbnN0IGVkZ2VzVG9EZWxldGUgPSB0aGlzLmVkZ2VzLmdldFNlbGVjdGVkRWRnZXMoKTtcbiAgICBlZGdlc1RvRGVsZXRlLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIHRoaXMuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgIH0pO1xuICAgIGNvbnN0IG5vZGVzVG9EZWxldGUgPSB0aGlzLm5vZGVzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICBub2Rlc1RvRGVsZXRlLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMubm9kZXMuZGVsZXRlKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNEcm9wU291cmNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyb3BUYXJnZXRJZCAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldERyYWdJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuZHJhZ0ltYWdlKSB7XG4gICAgICB0aGlzLmRyYWdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5kcmFnSW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNyc7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRyYWdJbWFnZTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckNhbGxiYWNrcyhlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5lZGdlQWRkZWRDYWxsYmFjayA9IGVkZ2VBZGRlZENhbGxiYWNrO1xuICAgIHRoaXMubm9kZVJlbW92ZWRDYWxsYmFjayA9IG5vZGVSZW1vdmVkQ2FsbGJhY2s7XG4gICAgdGhpcy5lZGdlUmVtb3ZlZENhbGxiYWNrID0gZWRnZVJlbW92ZWRDYWxsYmFjaztcbiAgfVxuXG59XG5cbmludGVyZmFjZSBIdG1sRWxlbWVudE1hcCB7IFtpZDogc3RyaW5nXTogSFRNTEVsZW1lbnQ7IH1cblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGY01vZGVsPFQ+IHtcblxuICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0KG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLnNlbGVjdE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0KG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWQob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0KG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5pc0VkaXRPYmplY3Qob2JqZWN0KTtcbiAgfVxufVxuXG5jbGFzcyBDb25uZWN0b3JzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNDb25uZWN0b3I+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3IoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29ubmVjdG9yIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtb2RlbC5ub2Rlcykge1xuICAgICAgZm9yIChjb25zdCBjb25uZWN0b3Igb2Ygbm9kZS5jb25uZWN0b3JzKSB7XG4gICAgICAgIGlmIChjb25uZWN0b3IuaWQgPT09IGNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRIdG1sRWxlbWVudChjb25uZWN0b3JJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzSHRtbEVsZW1lbnRzW2Nvbm5lY3RvcklkXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRIdG1sRWxlbWVudChjb25uZWN0b3JJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnNIdG1sRWxlbWVudHNbY29ubmVjdG9ySWRdID0gZWxlbWVudDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb29yZHMoY29ubmVjdG9ySWQ6IHN0cmluZywgY2VudGVyZWQ/OiBib29sZWFuKTogRmNDb29yZHMge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEh0bWxFbGVtZW50KGNvbm5lY3RvcklkKTtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgfHwgY2FudmFzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4ge3g6IDAsIHk6IDB9O1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50Qm94ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBjb29yZHM6IEZjQ29vcmRzID0ge1xuICAgICAgeDogY29ubmVjdG9yRWxlbWVudEJveC5sZWZ0IC0gY2FudmFzRWxlbWVudEJveC5sZWZ0LFxuICAgICAgeTogY29ubmVjdG9yRWxlbWVudEJveC50b3AgLSBjYW52YXNFbGVtZW50Qm94LnRvcFxuICAgIH07XG4gICAgaWYgKGNlbnRlcmVkKSB7XG4gICAgICBjb29yZHMgPSB7XG4gICAgICAgIHg6IE1hdGgucm91bmQoY29vcmRzLnggKyBlbGVtZW50Lm9mZnNldFdpZHRoIC8gMiksXG4gICAgICAgIHk6IE1hdGgucm91bmQoY29vcmRzLnkgKyBlbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgcHVibGljIGdldENvb3Jkcyhjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb29yZHMoY29ubmVjdG9ySWQsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDZW50ZXJlZENvb3JkKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENvb3Jkcyhjb25uZWN0b3JJZCwgdHJ1ZSk7XG4gIH1cbn1cblxuY2xhc3MgTm9kZXNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY05vZGU+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JzQnlUeXBlKG5vZGU6IEZjTm9kZSwgdHlwZTogc3RyaW5nKTogQXJyYXk8RmNDb25uZWN0b3I+IHtcbiAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLmZpbHRlcigoY29ubmVjdG9yKSA9PiB7XG4gICAgICByZXR1cm4gY29ubmVjdG9yLnR5cGUgPT09IHR5cGU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRDb25uZWN0b3Iobm9kZTogRmNOb2RlLCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSB7XG4gICAgbm9kZS5jb25uZWN0b3JzLnB1c2goY29ubmVjdG9yKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTm9kZShub2RlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbm9kZS5jb25uZWN0b3JzLnNwbGljZShub2RlLmNvbm5lY3RvcnMuaW5kZXhPZihjb25uZWN0b3IpLCAxKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUobm9kZTogRmNOb2RlKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdChub2RlKTtcbiAgICB9XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBjb25zdCBpbmRleCA9IG1vZGVsLm5vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCB1bmRlZmluZWQnKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVsZXRlIG5vdCBleGlzdGluZyBub2RlJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RvcklkcyA9IHRoaXMuZ2V0Q29ubmVjdG9ySWRzKG5vZGUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWwuZWRnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVkZ2UgPSBtb2RlbC5lZGdlc1tpXTtcbiAgICAgIGlmIChjb25uZWN0b3JJZHMuaW5kZXhPZihlZGdlLnNvdXJjZSkgIT09IC0xIHx8IGNvbm5lY3Rvcklkcy5pbmRleE9mKGVkZ2UuZGVzdGluYXRpb24pICE9PSAtMSkge1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gICAgbW9kZWwubm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub2RlUmVtb3ZlZENhbGxiYWNrKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkTm9kZXMoKTogQXJyYXk8RmNOb2RlPiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICByZXR1cm4gbW9kZWwubm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaXNTZWxlY3RlZChub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGlja2VkKG5vZGU6IEZjTm9kZSwgY3RybEtleT86IGJvb2xlYW4pIHtcbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMudG9nZ2xlU2VsZWN0ZWQobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZShub2RlOiBGY05vZGUpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHRyeSB7XG4gICAgICBtb2RlbC5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTm9kZXMobW9kZWwubm9kZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBtb2RlbC5ub2Rlcy5zcGxpY2UobW9kZWwubm9kZXMuaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9ySWRzKG5vZGU6IEZjTm9kZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMubWFwKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHJldHVybiBjb25uZWN0b3IuaWQ7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZUJ5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjTm9kZSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGNvbm5lY3RvcklkcyA9IHRoaXMuZ2V0Q29ubmVjdG9ySWRzKG5vZGUpO1xuICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGNvbm5lY3RvcklkKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIdG1sRWxlbWVudChub2RlSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXNIdG1sRWxlbWVudHNbbm9kZUlkXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRIdG1sRWxlbWVudChub2RlSWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlc0h0bWxFbGVtZW50c1tub2RlSWRdID0gZWxlbWVudDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxufVxuXG5jbGFzcyBFZGdlc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjRWRnZT4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIHJlYWR5KGVkZ2U6IEZjRWRnZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0SHRtbEVsZW1lbnQoZWRnZS5zb3VyY2UpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRIdG1sRWxlbWVudChlZGdlLmRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gc291cmNlICE9PSB1bmRlZmluZWQgJiYgZGVzdGluYXRpb24gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb29yZChlZGdlOiBGY0VkZ2UpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChlZGdlLnNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdENvb3JkKGVkZ2U6IEZjRWRnZSk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGVkZ2UuZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShlZGdlOiBGY0VkZ2UpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGNvbnN0IGluZGV4ID0gbW9kZWwuZWRnZXMuaW5kZXhPZihlZGdlKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlbGV0ZSBub3QgZXhpc3RpbmcgZWRnZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVkZ2UpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KGVkZ2UpO1xuICAgIH1cbiAgICBtb2RlbC5lZGdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VSZW1vdmVkQ2FsbGJhY2soZWRnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRFZGdlcygpOiBBcnJheTxGY0VkZ2U+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHJldHVybiBtb2RlbC5lZGdlcy5maWx0ZXIoKGVkZ2UpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5pc1NlbGVjdGVkKGVkZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUVkZ2VNb3VzZUNsaWNrKGVkZ2U6IEZjRWRnZSwgY3RybEtleT86IGJvb2xlYW4pIHtcbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMudG9nZ2xlU2VsZWN0ZWQoZWRnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHB1dEVkZ2UoZWRnZTogRmNFZGdlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBtb2RlbC5lZGdlcy5wdXNoKGVkZ2UpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICB9XG5cbiAgcHVibGljIF9hZGRFZGdlKGV2ZW50OiBFdmVudCwgc291cmNlQ29ubmVjdG9yOiBGY0Nvbm5lY3RvciwgZGVzdENvbm5lY3RvcjogRmNDb25uZWN0b3IsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVDb25uZWN0b3Ioc291cmNlQ29ubmVjdG9yKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVDb25uZWN0b3IoZGVzdENvbm5lY3Rvcik7XG4gICAgY29uc3QgZWRnZTogRmNFZGdlID0ge307XG4gICAgZWRnZS5zb3VyY2UgPSBzb3VyY2VDb25uZWN0b3IuaWQ7XG4gICAgZWRnZS5kZXN0aW5hdGlvbiA9IGRlc3RDb25uZWN0b3IuaWQ7XG4gICAgZWRnZS5sYWJlbCA9IGxhYmVsO1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXMobW9kZWwuZWRnZXMuY29uY2F0KFtlZGdlXSksIG1vZGVsLm5vZGVzKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5jcmVhdGVFZGdlKGV2ZW50LCBlZGdlKS5zdWJzY3JpYmUoXG4gICAgICAoY3JlYXRlZCkgPT4ge1xuICAgICAgICBtb2RlbC5lZGdlcy5wdXNoKGNyZWF0ZWQpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZUFkZGVkQ2FsbGJhY2soY3JlYXRlZCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19