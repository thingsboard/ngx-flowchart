/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var FcModelService = /** @class */ (function () {
    function FcModelService(modelValidation, model, modelChanged, detectChangesSubject, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
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
        this.detectChangesSubject = detectChangesSubject;
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
            _this.detectChangesSubject.next();
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
    return FcModelService;
}());
export { FcModelService };
if (false) {
    /** @type {?} */
    FcModelService.prototype.modelValidation;
    /** @type {?} */
    FcModelService.prototype.model;
    /**
     * @type {?}
     * @private
     */
    FcModelService.prototype.detectChangesSubject;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QztJQTRCRSx3QkFBWSxlQUF5QyxFQUN6QyxLQUFjLEVBQ2QsWUFBK0IsRUFDL0Isb0JBQWtDLEVBQ2xDLGVBQXNCLEVBQ3RCLFFBQThDLEVBQzlDLFVBQThELEVBQzlELGlCQUF5QyxFQUN6QyxtQkFBMkMsRUFDM0MsbUJBQTJDLEVBQzNDLGlCQUE4QixFQUM5QixjQUEwQjtRQVh0QyxpQkFtQ0M7UUF4REQsMkJBQXNCLEdBQW1CLEVBQUUsQ0FBQztRQUM1QyxzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBZSxJQUFJLENBQUM7UUFXakIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFtQjlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFD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aWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjQ29ubmVjdG9yLCBGY0Nvb3JkcywgRmNFZGdlLCBGY0l0ZW1JbmZvLCBGY01vZGVsLCBGY05vZGUsIEZjUmVjdEJveCB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEZjTW9kZWxTZXJ2aWNlIHtcblxuICBtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZTtcbiAgbW9kZWw6IEZjTW9kZWw7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGV0ZWN0Q2hhbmdlc1N1YmplY3Q6IFN1YmplY3Q8YW55PjtcbiAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXTtcblxuICBjb25uZWN0b3JzSHRtbEVsZW1lbnRzOiBIdG1sRWxlbWVudE1hcCA9IHt9O1xuICBub2Rlc0h0bWxFbGVtZW50czogSHRtbEVsZW1lbnRNYXAgPSB7fTtcbiAgY2FudmFzSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgZHJhZ0ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcbiAgc3ZnSHRtbEVsZW1lbnQ6IFNWR0VsZW1lbnQgPSBudWxsO1xuXG4gIGRyb3BOb2RlOiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGNyZWF0ZUVkZ2U6IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+O1xuICBlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcblxuICBkcm9wVGFyZ2V0SWQ6IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVib3VuY2VyID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbm5lY3RvcnM6IENvbm5lY3RvcnNNb2RlbDtcbiAgbm9kZXM6IE5vZGVzTW9kZWw7XG4gIGVkZ2VzOiBFZGdlc01vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgbW9kZWxDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PixcbiAgICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlc1N1YmplY3Q6IFN1YmplY3Q8YW55PixcbiAgICAgICAgICAgICAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXSxcbiAgICAgICAgICAgICAgZHJvcE5vZGU6IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY3JlYXRlRWRnZTogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT4sXG4gICAgICAgICAgICAgIGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBjYW52YXNIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgIHN2Z0h0bWxFbGVtZW50OiBTVkdFbGVtZW50KSB7XG5cbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbiA9IG1vZGVsVmFsaWRhdGlvbjtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5tb2RlbENoYW5nZWQgPSBtb2RlbENoYW5nZWQ7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdCA9IGRldGVjdENoYW5nZXNTdWJqZWN0O1xuICAgIHRoaXMuY2FudmFzSHRtbEVsZW1lbnQgPSBjYW52YXNIdG1sRWxlbWVudDtcbiAgICB0aGlzLnN2Z0h0bWxFbGVtZW50ID0gc3ZnSHRtbEVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVNb2RlbCh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cyA9IHNlbGVjdGVkT2JqZWN0cztcblxuICAgIHRoaXMuZHJvcE5vZGUgPSBkcm9wTm9kZSB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMuY3JlYXRlRWRnZSA9IGNyZWF0ZUVkZ2UgfHwgKChldmVudCwgZWRnZSkgPT4gb2Yoey4uLmVkZ2UsIGxhYmVsOiAnbGFiZWwnfSkpO1xuICAgIHRoaXMuZWRnZUFkZGVkQ2FsbGJhY2sgPSBlZGdlQWRkZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMubm9kZVJlbW92ZWRDYWxsYmFjayA9IG5vZGVSZW1vdmVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLmVkZ2VSZW1vdmVkQ2FsbGJhY2sgPSBlZGdlUmVtb3ZlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG5cbiAgICB0aGlzLmNvbm5lY3RvcnMgPSBuZXcgQ29ubmVjdG9yc01vZGVsKHRoaXMpO1xuICAgIHRoaXMubm9kZXMgPSBuZXcgTm9kZXNNb2RlbCh0aGlzKTtcbiAgICB0aGlzLmVkZ2VzID0gbmV3IEVkZ2VzTW9kZWwodGhpcyk7XG5cbiAgICB0aGlzLmRlYm91bmNlclxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kZWxDaGFuZ2VkLmVtaXQoKSk7XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5TW9kZWxDaGFuZ2VkKCkge1xuICAgIHRoaXMuZGVib3VuY2VyLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRlY3RDaGFuZ2VzKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdC5uZXh0KCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09PSAtMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZXNlbGVjdCBhbiB1bnNlbGVjdGVkIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgIT09IC0xO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUucmVhZG9ubHkpIHtcbiAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKGVkZ2UgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0T2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgaW5SZWN0Qm94KHg6IG51bWJlciwgeTogbnVtYmVyLCByZWN0Qm94OiBGY1JlY3RCb3gpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA+PSByZWN0Qm94LmxlZnQgJiYgeCA8PSByZWN0Qm94LnJpZ2h0ICYmXG4gICAgICB5ID49IHJlY3RCb3gudG9wICYmIHkgPD0gcmVjdEJveC5ib3R0b207XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbUluZm9BdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNJdGVtSW5mbyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IHRoaXMuZ2V0Tm9kZUF0UG9pbnQoeCwgeSksXG4gICAgICBlZGdlOiB0aGlzLmdldEVkZ2VBdFBvaW50KHgsIHkpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjTm9kZSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMubW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5vZGVzLmdldEh0bWxFbGVtZW50KG5vZGUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHggPj0gbm9kZUVsZW1lbnRCb3gubGVmdCAmJiB4IDw9IG5vZGVFbGVtZW50Qm94LnJpZ2h0XG4gICAgICAgICYmIHkgPj0gbm9kZUVsZW1lbnRCb3gudG9wICYmIHkgPD0gbm9kZUVsZW1lbnRCb3guYm90dG9tKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjRWRnZSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkO1xuICAgIGxldCBlZGdlSW5kZXggPSAtMTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLXBhdGgtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1wYXRoLScubGVuZ3RoKSk7XG4gICAgICB9IGVsc2UgaWYgKGlkLnN0YXJ0c1dpdGgoJ2ZjLWVkZ2UtbGFiZWwtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1sYWJlbC0nLmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRnZUluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsLmVkZ2VzW2VkZ2VJbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbEluUmVjdChyZWN0Qm94OiBGY1JlY3RCb3gpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudCh2YWx1ZS5pZCk7XG4gICAgICBjb25zdCBub2RlRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoIXZhbHVlLnJlYWRvbmx5KSB7XG4gICAgICAgIGNvbnN0IHggPSBub2RlRWxlbWVudEJveC5sZWZ0ICsgbm9kZUVsZW1lbnRCb3gud2lkdGggLyAyO1xuICAgICAgICBjb25zdCB5ID0gbm9kZUVsZW1lbnRCb3gudG9wICsgbm9kZUVsZW1lbnRCb3guaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYgKHRoaXMuaW5SZWN0Qm94KHgsIHksIHJlY3RCb3gpKSB7XG4gICAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50Qm94ID0gdGhpcy5jYW52YXNIdG1sRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLm1vZGVsLmVkZ2VzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZWRnZXMuc291cmNlQ29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgZW5kID0gdGhpcy5lZGdlcy5kZXN0Q29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgeCA9IChzdGFydC54ICsgZW5kLngpIC8gMiArIGNhbnZhc0VsZW1lbnRCb3gubGVmdDtcbiAgICAgIGNvbnN0IHkgPSAoc3RhcnQueSArIGVuZC55KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LnRvcDtcbiAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNlbGVjdCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5lZGdlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuZWRnZXMuZGVzZWxlY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgZWRnZXNUb0RlbGV0ZSA9IHRoaXMuZWRnZXMuZ2V0U2VsZWN0ZWRFZGdlcygpO1xuICAgIGVkZ2VzVG9EZWxldGUuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgfSk7XG4gICAgY29uc3Qgbm9kZXNUb0RlbGV0ZSA9IHRoaXMubm9kZXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIG5vZGVzVG9EZWxldGUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgdGhpcy5ub2Rlcy5kZWxldGUobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wVGFyZ2V0SWQgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBpc0Ryb3BTb3VyY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJhZ0ltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGlmICghdGhpcy5kcmFnSW1hZ2UpIHtcbiAgICAgIHRoaXMuZHJhZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3JztcbiAgICAgIHRoaXMuZHJhZ0ltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0ltYWdlO1xuICB9XG59XG5cbmludGVyZmFjZSBIdG1sRWxlbWVudE1hcCB7IFtpZDogc3RyaW5nXTogSFRNTEVsZW1lbnQ7IH1cblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGY01vZGVsPFQ+IHtcblxuICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0KG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLnNlbGVjdE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0KG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWQob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0KG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5pc0VkaXRPYmplY3Qob2JqZWN0KTtcbiAgfVxufVxuXG5jbGFzcyBDb25uZWN0b3JzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNDb25uZWN0b3I+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3IoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29ubmVjdG9yIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtb2RlbC5ub2Rlcykge1xuICAgICAgZm9yIChjb25zdCBjb25uZWN0b3Igb2Ygbm9kZS5jb25uZWN0b3JzKSB7XG4gICAgICAgIGlmIChjb25uZWN0b3IuaWQgPT09IGNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRIdG1sRWxlbWVudChjb25uZWN0b3JJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzSHRtbEVsZW1lbnRzW2Nvbm5lY3RvcklkXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRIdG1sRWxlbWVudChjb25uZWN0b3JJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnNIdG1sRWxlbWVudHNbY29ubmVjdG9ySWRdID0gZWxlbWVudDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb29yZHMoY29ubmVjdG9ySWQ6IHN0cmluZywgY2VudGVyZWQ/OiBib29sZWFuKTogRmNDb29yZHMge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEh0bWxFbGVtZW50KGNvbm5lY3RvcklkKTtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgfHwgY2FudmFzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4ge3g6IDAsIHk6IDB9O1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50Qm94ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBjb29yZHM6IEZjQ29vcmRzID0ge1xuICAgICAgeDogY29ubmVjdG9yRWxlbWVudEJveC5sZWZ0IC0gY2FudmFzRWxlbWVudEJveC5sZWZ0LFxuICAgICAgeTogY29ubmVjdG9yRWxlbWVudEJveC50b3AgLSBjYW52YXNFbGVtZW50Qm94LnRvcFxuICAgIH07XG4gICAgaWYgKGNlbnRlcmVkKSB7XG4gICAgICBjb29yZHMgPSB7XG4gICAgICAgIHg6IE1hdGgucm91bmQoY29vcmRzLnggKyBlbGVtZW50Lm9mZnNldFdpZHRoIC8gMiksXG4gICAgICAgIHk6IE1hdGgucm91bmQoY29vcmRzLnkgKyBlbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgcHVibGljIGdldENvb3Jkcyhjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb29yZHMoY29ubmVjdG9ySWQsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDZW50ZXJlZENvb3JkKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENvb3Jkcyhjb25uZWN0b3JJZCwgdHJ1ZSk7XG4gIH1cbn1cblxuY2xhc3MgTm9kZXNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY05vZGU+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JzQnlUeXBlKG5vZGU6IEZjTm9kZSwgdHlwZTogc3RyaW5nKTogQXJyYXk8RmNDb25uZWN0b3I+IHtcbiAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLmZpbHRlcigoY29ubmVjdG9yKSA9PiB7XG4gICAgICByZXR1cm4gY29ubmVjdG9yLnR5cGUgPT09IHR5cGU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRDb25uZWN0b3Iobm9kZTogRmNOb2RlLCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSB7XG4gICAgbm9kZS5jb25uZWN0b3JzLnB1c2goY29ubmVjdG9yKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTm9kZShub2RlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbm9kZS5jb25uZWN0b3JzLnNwbGljZShub2RlLmNvbm5lY3RvcnMuaW5kZXhPZihjb25uZWN0b3IpLCAxKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUobm9kZTogRmNOb2RlKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdChub2RlKTtcbiAgICB9XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBjb25zdCBpbmRleCA9IG1vZGVsLm5vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCB1bmRlZmluZWQnKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVsZXRlIG5vdCBleGlzdGluZyBub2RlJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RvcklkcyA9IHRoaXMuZ2V0Q29ubmVjdG9ySWRzKG5vZGUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWwuZWRnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVkZ2UgPSBtb2RlbC5lZGdlc1tpXTtcbiAgICAgIGlmIChjb25uZWN0b3JJZHMuaW5kZXhPZihlZGdlLnNvdXJjZSkgIT09IC0xIHx8IGNvbm5lY3Rvcklkcy5pbmRleE9mKGVkZ2UuZGVzdGluYXRpb24pICE9PSAtMSkge1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gICAgbW9kZWwubm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub2RlUmVtb3ZlZENhbGxiYWNrKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkTm9kZXMoKTogQXJyYXk8RmNOb2RlPiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICByZXR1cm4gbW9kZWwubm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaXNTZWxlY3RlZChub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGlja2VkKG5vZGU6IEZjTm9kZSwgY3RybEtleT86IGJvb2xlYW4pIHtcbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMudG9nZ2xlU2VsZWN0ZWQobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZShub2RlOiBGY05vZGUpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHRyeSB7XG4gICAgICBtb2RlbC5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTm9kZXMobW9kZWwubm9kZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBtb2RlbC5ub2Rlcy5zcGxpY2UobW9kZWwubm9kZXMuaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9ySWRzKG5vZGU6IEZjTm9kZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMubWFwKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHJldHVybiBjb25uZWN0b3IuaWQ7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZUJ5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjTm9kZSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGNvbm5lY3RvcklkcyA9IHRoaXMuZ2V0Q29ubmVjdG9ySWRzKG5vZGUpO1xuICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGNvbm5lY3RvcklkKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIdG1sRWxlbWVudChub2RlSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXNIdG1sRWxlbWVudHNbbm9kZUlkXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRIdG1sRWxlbWVudChub2RlSWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlc0h0bWxFbGVtZW50c1tub2RlSWRdID0gZWxlbWVudDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxufVxuXG5jbGFzcyBFZGdlc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjRWRnZT4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIHJlYWR5KGVkZ2U6IEZjRWRnZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0SHRtbEVsZW1lbnQoZWRnZS5zb3VyY2UpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRIdG1sRWxlbWVudChlZGdlLmRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gc291cmNlICE9PSB1bmRlZmluZWQgJiYgZGVzdGluYXRpb24gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb29yZChlZGdlOiBGY0VkZ2UpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChlZGdlLnNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdENvb3JkKGVkZ2U6IEZjRWRnZSk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGVkZ2UuZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShlZGdlOiBGY0VkZ2UpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGNvbnN0IGluZGV4ID0gbW9kZWwuZWRnZXMuaW5kZXhPZihlZGdlKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlbGV0ZSBub3QgZXhpc3RpbmcgZWRnZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVkZ2UpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KGVkZ2UpO1xuICAgIH1cbiAgICBtb2RlbC5lZGdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VSZW1vdmVkQ2FsbGJhY2soZWRnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRFZGdlcygpOiBBcnJheTxGY0VkZ2U+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHJldHVybiBtb2RlbC5lZGdlcy5maWx0ZXIoKGVkZ2UpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5pc1NlbGVjdGVkKGVkZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUVkZ2VNb3VzZUNsaWNrKGVkZ2U6IEZjRWRnZSwgY3RybEtleT86IGJvb2xlYW4pIHtcbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMudG9nZ2xlU2VsZWN0ZWQoZWRnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHB1dEVkZ2UoZWRnZTogRmNFZGdlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBtb2RlbC5lZGdlcy5wdXNoKGVkZ2UpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICB9XG5cbiAgcHVibGljIF9hZGRFZGdlKGV2ZW50OiBFdmVudCwgc291cmNlQ29ubmVjdG9yOiBGY0Nvbm5lY3RvciwgZGVzdENvbm5lY3RvcjogRmNDb25uZWN0b3IsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVDb25uZWN0b3Ioc291cmNlQ29ubmVjdG9yKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVDb25uZWN0b3IoZGVzdENvbm5lY3Rvcik7XG4gICAgY29uc3QgZWRnZTogRmNFZGdlID0ge307XG4gICAgZWRnZS5zb3VyY2UgPSBzb3VyY2VDb25uZWN0b3IuaWQ7XG4gICAgZWRnZS5kZXN0aW5hdGlvbiA9IGRlc3RDb25uZWN0b3IuaWQ7XG4gICAgZWRnZS5sYWJlbCA9IGxhYmVsO1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXMobW9kZWwuZWRnZXMuY29uY2F0KFtlZGdlXSksIG1vZGVsLm5vZGVzKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5jcmVhdGVFZGdlKGV2ZW50LCBlZGdlKS5zdWJzY3JpYmUoXG4gICAgICAoY3JlYXRlZCkgPT4ge1xuICAgICAgICBtb2RlbC5lZGdlcy5wdXNoKGNyZWF0ZWQpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZUFkZGVkQ2FsbGJhY2soY3JlYXRlZCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19