/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FlowchartConstants } from './ngx-flowchart.models';
import { of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var FcModelService = /** @class */ (function () {
    function FcModelService(modelValidation, model, modelChanged, detectChangesSubject, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
        var _this = this;
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
    FcModelService.prototype.connectorsRectInfos;
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
 * @record
 */
function ConnectorRectInfoMap() { }
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
    ConnectorsModel.prototype.getConnectorRectInfo = /**
     * @param {?} connectorId
     * @return {?}
     */
    function (connectorId) {
        return this.modelService.connectorsRectInfos[connectorId];
    };
    /**
     * @param {?} connectorId
     * @param {?} connectorRectInfo
     * @return {?}
     */
    ConnectorsModel.prototype.setConnectorRectInfo = /**
     * @param {?} connectorId
     * @param {?} connectorRectInfo
     * @return {?}
     */
    function (connectorId, connectorRectInfo) {
        this.modelService.connectorsRectInfos[connectorId] = connectorRectInfo;
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
        var connectorRectInfo = this.getConnectorRectInfo(connectorId);
        /** @type {?} */
        var canvas = this.modelService.canvasHtmlElement;
        if (connectorRectInfo === null || connectorRectInfo === undefined || canvas === null) {
            return { x: 0, y: 0 };
        }
        /** @type {?} */
        var x = connectorRectInfo.type === FlowchartConstants.leftConnectorType ?
            connectorRectInfo.nodeRectInfo.left() : connectorRectInfo.nodeRectInfo.right();
        /** @type {?} */
        var y = connectorRectInfo.nodeRectInfo.top() + connectorRectInfo.nodeRectInfo.height() / 2;
        if (!centered) {
            x -= connectorRectInfo.width / 2;
            y -= connectorRectInfo.height / 2;
        }
        /** @type {?} */
        var coords = {
            x: Math.round(x),
            y: Math.round(y)
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFTTCxrQkFBa0IsRUFDbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7SUE0QkUsd0JBQVksZUFBeUMsRUFDekMsS0FBYyxFQUNkLFlBQStCLEVBQy9CLG9CQUFrQyxFQUNsQyxlQUFzQixFQUN0QixRQUE4QyxFQUM5QyxVQUE4RCxFQUM5RCxpQkFBeUMsRUFDekMsbUJBQTJDLEVBQzNDLG1CQUEyQyxFQUMzQyxpQkFBOEIsRUFDOUIsY0FBMEI7UUFYdEMsaUJBbUNDO1FBeERELHdCQUFtQixHQUF5QixFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQW1CLEVBQUUsQ0FBQztRQUN2QyxzQkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBQ3RDLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ25DLG1CQUFjLEdBQWUsSUFBSSxDQUFDO1FBV2pCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBbUI5QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFL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QUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7O1lBQzdELElBQUksR0FBVyxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O1lBQ2IsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUzs7OztRQUNqRCxVQUFDLE9BQU87WUFDTixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDdkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQ0YsQ0FBQztJQUNKLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFuRUQsQ0FBeUIsZUFBZSxHQW1FdkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEZjQ29ubmVjdG9yLFxuICBGY0Nvbm5lY3RvclJlY3RJbmZvLFxuICBGY0Nvb3JkcyxcbiAgRmNFZGdlLFxuICBGY0l0ZW1JbmZvLFxuICBGY01vZGVsLFxuICBGY05vZGUsXG4gIEZjUmVjdEJveCxcbiAgRmxvd2NoYXJ0Q29uc3RhbnRzXG59IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEZjTW9kZWxTZXJ2aWNlIHtcblxuICBtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZTtcbiAgbW9kZWw6IEZjTW9kZWw7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGV0ZWN0Q2hhbmdlc1N1YmplY3Q6IFN1YmplY3Q8YW55PjtcbiAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXTtcblxuICBjb25uZWN0b3JzUmVjdEluZm9zOiBDb25uZWN0b3JSZWN0SW5mb01hcCA9IHt9O1xuICBub2Rlc0h0bWxFbGVtZW50czogSHRtbEVsZW1lbnRNYXAgPSB7fTtcbiAgY2FudmFzSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgZHJhZ0ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcbiAgc3ZnSHRtbEVsZW1lbnQ6IFNWR0VsZW1lbnQgPSBudWxsO1xuXG4gIGRyb3BOb2RlOiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGNyZWF0ZUVkZ2U6IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+O1xuICBlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcblxuICBkcm9wVGFyZ2V0SWQ6IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVib3VuY2VyID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbm5lY3RvcnM6IENvbm5lY3RvcnNNb2RlbDtcbiAgbm9kZXM6IE5vZGVzTW9kZWw7XG4gIGVkZ2VzOiBFZGdlc01vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgbW9kZWxDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PixcbiAgICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlc1N1YmplY3Q6IFN1YmplY3Q8YW55PixcbiAgICAgICAgICAgICAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXSxcbiAgICAgICAgICAgICAgZHJvcE5vZGU6IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY3JlYXRlRWRnZTogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT4sXG4gICAgICAgICAgICAgIGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBjYW52YXNIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgIHN2Z0h0bWxFbGVtZW50OiBTVkdFbGVtZW50KSB7XG5cbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbiA9IG1vZGVsVmFsaWRhdGlvbjtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5tb2RlbENoYW5nZWQgPSBtb2RlbENoYW5nZWQ7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdCA9IGRldGVjdENoYW5nZXNTdWJqZWN0O1xuICAgIHRoaXMuY2FudmFzSHRtbEVsZW1lbnQgPSBjYW52YXNIdG1sRWxlbWVudDtcbiAgICB0aGlzLnN2Z0h0bWxFbGVtZW50ID0gc3ZnSHRtbEVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVNb2RlbCh0aGlzLm1vZGVsKTtcbiAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cyA9IHNlbGVjdGVkT2JqZWN0cztcblxuICAgIHRoaXMuZHJvcE5vZGUgPSBkcm9wTm9kZSB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMuY3JlYXRlRWRnZSA9IGNyZWF0ZUVkZ2UgfHwgKChldmVudCwgZWRnZSkgPT4gb2Yoey4uLmVkZ2UsIGxhYmVsOiAnbGFiZWwnfSkpO1xuICAgIHRoaXMuZWRnZUFkZGVkQ2FsbGJhY2sgPSBlZGdlQWRkZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMubm9kZVJlbW92ZWRDYWxsYmFjayA9IG5vZGVSZW1vdmVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLmVkZ2VSZW1vdmVkQ2FsbGJhY2sgPSBlZGdlUmVtb3ZlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG5cbiAgICB0aGlzLmNvbm5lY3RvcnMgPSBuZXcgQ29ubmVjdG9yc01vZGVsKHRoaXMpO1xuICAgIHRoaXMubm9kZXMgPSBuZXcgTm9kZXNNb2RlbCh0aGlzKTtcbiAgICB0aGlzLmVkZ2VzID0gbmV3IEVkZ2VzTW9kZWwodGhpcyk7XG5cbiAgICB0aGlzLmRlYm91bmNlclxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kZWxDaGFuZ2VkLmVtaXQoKSk7XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5TW9kZWxDaGFuZ2VkKCkge1xuICAgIHRoaXMuZGVib3VuY2VyLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRlY3RDaGFuZ2VzKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdC5uZXh0KCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09PSAtMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0T2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZXNlbGVjdCBhbiB1bnNlbGVjdGVkIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgIT09IC0xO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUucmVhZG9ubHkpIHtcbiAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKGVkZ2UgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfSk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCk7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0T2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgaW5SZWN0Qm94KHg6IG51bWJlciwgeTogbnVtYmVyLCByZWN0Qm94OiBGY1JlY3RCb3gpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA+PSByZWN0Qm94LmxlZnQgJiYgeCA8PSByZWN0Qm94LnJpZ2h0ICYmXG4gICAgICB5ID49IHJlY3RCb3gudG9wICYmIHkgPD0gcmVjdEJveC5ib3R0b207XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbUluZm9BdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNJdGVtSW5mbyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IHRoaXMuZ2V0Tm9kZUF0UG9pbnQoeCwgeSksXG4gICAgICBlZGdlOiB0aGlzLmdldEVkZ2VBdFBvaW50KHgsIHkpXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjTm9kZSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMubW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5vZGVzLmdldEh0bWxFbGVtZW50KG5vZGUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHggPj0gbm9kZUVsZW1lbnRCb3gubGVmdCAmJiB4IDw9IG5vZGVFbGVtZW50Qm94LnJpZ2h0XG4gICAgICAgICYmIHkgPj0gbm9kZUVsZW1lbnRCb3gudG9wICYmIHkgPD0gbm9kZUVsZW1lbnRCb3guYm90dG9tKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjRWRnZSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkO1xuICAgIGxldCBlZGdlSW5kZXggPSAtMTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLXBhdGgtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1wYXRoLScubGVuZ3RoKSk7XG4gICAgICB9IGVsc2UgaWYgKGlkLnN0YXJ0c1dpdGgoJ2ZjLWVkZ2UtbGFiZWwtJykpIHtcbiAgICAgICAgZWRnZUluZGV4ID0gTnVtYmVyKGlkLnN1YnN0cmluZygnZmMtZWRnZS1sYWJlbC0nLmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRnZUluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsLmVkZ2VzW2VkZ2VJbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbEluUmVjdChyZWN0Qm94OiBGY1JlY3RCb3gpIHtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudCh2YWx1ZS5pZCk7XG4gICAgICBjb25zdCBub2RlRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoIXZhbHVlLnJlYWRvbmx5KSB7XG4gICAgICAgIGNvbnN0IHggPSBub2RlRWxlbWVudEJveC5sZWZ0ICsgbm9kZUVsZW1lbnRCb3gud2lkdGggLyAyO1xuICAgICAgICBjb25zdCB5ID0gbm9kZUVsZW1lbnRCb3gudG9wICsgbm9kZUVsZW1lbnRCb3guaGVpZ2h0IC8gMjtcbiAgICAgICAgaWYgKHRoaXMuaW5SZWN0Qm94KHgsIHksIHJlY3RCb3gpKSB7XG4gICAgICAgICAgdGhpcy5ub2Rlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50Qm94ID0gdGhpcy5jYW52YXNIdG1sRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLm1vZGVsLmVkZ2VzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZWRnZXMuc291cmNlQ29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgZW5kID0gdGhpcy5lZGdlcy5kZXN0Q29vcmQodmFsdWUpO1xuICAgICAgY29uc3QgeCA9IChzdGFydC54ICsgZW5kLngpIC8gMiArIGNhbnZhc0VsZW1lbnRCb3gubGVmdDtcbiAgICAgIGNvbnN0IHkgPSAoc3RhcnQueSArIGVuZC55KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LnRvcDtcbiAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNlbGVjdCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5lZGdlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuZWRnZXMuZGVzZWxlY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgZWRnZXNUb0RlbGV0ZSA9IHRoaXMuZWRnZXMuZ2V0U2VsZWN0ZWRFZGdlcygpO1xuICAgIGVkZ2VzVG9EZWxldGUuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgfSk7XG4gICAgY29uc3Qgbm9kZXNUb0RlbGV0ZSA9IHRoaXMubm9kZXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIG5vZGVzVG9EZWxldGUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgdGhpcy5ub2Rlcy5kZWxldGUobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wVGFyZ2V0SWQgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBpc0Ryb3BTb3VyY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJhZ0ltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGlmICghdGhpcy5kcmFnSW1hZ2UpIHtcbiAgICAgIHRoaXMuZHJhZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3JztcbiAgICAgIHRoaXMuZHJhZ0ltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0ltYWdlO1xuICB9XG59XG5cbmludGVyZmFjZSBIdG1sRWxlbWVudE1hcCB7IFtpZDogc3RyaW5nXTogSFRNTEVsZW1lbnQ7IH1cblxuaW50ZXJmYWNlIENvbm5lY3RvclJlY3RJbmZvTWFwIHsgW2lkOiBzdHJpbmddOiBGY0Nvbm5lY3RvclJlY3RJbmZvOyB9XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0RmNNb2RlbDxUPiB7XG5cbiAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGVkKG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLnRvZ2dsZVNlbGVjdGVkT2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChvYmplY3Q6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuaXNTZWxlY3RlZE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdChvYmplY3Q6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuaXNFZGl0T2JqZWN0KG9iamVjdCk7XG4gIH1cbn1cblxuY2xhc3MgQ29ubmVjdG9yc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjQ29ubmVjdG9yPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvbm5lY3RvciB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbW9kZWwubm9kZXMpIHtcbiAgICAgIGZvciAoY29uc3QgY29ubmVjdG9yIG9mIG5vZGUuY29ubmVjdG9ycykge1xuICAgICAgICBpZiAoY29ubmVjdG9yLmlkID09PSBjb25uZWN0b3JJZCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yUmVjdEluZm8oY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29ubmVjdG9yUmVjdEluZm8ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzUmVjdEluZm9zW2Nvbm5lY3RvcklkXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb25uZWN0b3JSZWN0SW5mbyhjb25uZWN0b3JJZDogc3RyaW5nLCBjb25uZWN0b3JSZWN0SW5mbzogRmNDb25uZWN0b3JSZWN0SW5mbykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnNSZWN0SW5mb3NbY29ubmVjdG9ySWRdID0gY29ubmVjdG9yUmVjdEluZm87XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29vcmRzKGNvbm5lY3RvcklkOiBzdHJpbmcsIGNlbnRlcmVkPzogYm9vbGVhbik6IEZjQ29vcmRzIHtcbiAgICBjb25zdCBjb25uZWN0b3JSZWN0SW5mbyA9IHRoaXMuZ2V0Q29ubmVjdG9yUmVjdEluZm8oY29ubmVjdG9ySWQpO1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgIGlmIChjb25uZWN0b3JSZWN0SW5mbyA9PT0gbnVsbCB8fCBjb25uZWN0b3JSZWN0SW5mbyA9PT0gdW5kZWZpbmVkIHx8IGNhbnZhcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt4OiAwLCB5OiAwfTtcbiAgICB9XG4gICAgbGV0IHggPSBjb25uZWN0b3JSZWN0SW5mby50eXBlID09PSBGbG93Y2hhcnRDb25zdGFudHMubGVmdENvbm5lY3RvclR5cGUgP1xuICAgICAgY29ubmVjdG9yUmVjdEluZm8ubm9kZVJlY3RJbmZvLmxlZnQoKSA6IGNvbm5lY3RvclJlY3RJbmZvLm5vZGVSZWN0SW5mby5yaWdodCgpO1xuICAgIGxldCB5ID0gY29ubmVjdG9yUmVjdEluZm8ubm9kZVJlY3RJbmZvLnRvcCgpICsgY29ubmVjdG9yUmVjdEluZm8ubm9kZVJlY3RJbmZvLmhlaWdodCgpIC8gMjtcbiAgICBpZiAoIWNlbnRlcmVkKSB7XG4gICAgICB4IC09IGNvbm5lY3RvclJlY3RJbmZvLndpZHRoIC8gMjtcbiAgICAgIHkgLT0gY29ubmVjdG9yUmVjdEluZm8uaGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgY29uc3QgY29vcmRzOiBGY0Nvb3JkcyA9IHtcbiAgICAgIHg6IE1hdGgucm91bmQoeCksXG4gICAgICB5OiBNYXRoLnJvdW5kKHkpXG4gICAgfTtcbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgcHVibGljIGdldENvb3Jkcyhjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb29yZHMoY29ubmVjdG9ySWQsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDZW50ZXJlZENvb3JkKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENvb3Jkcyhjb25uZWN0b3JJZCwgdHJ1ZSk7XG4gIH1cbn1cblxuY2xhc3MgTm9kZXNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY05vZGU+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JzQnlUeXBlKG5vZGU6IEZjTm9kZSwgdHlwZTogc3RyaW5nKTogQXJyYXk8RmNDb25uZWN0b3I+IHtcbiAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLmZpbHRlcigoY29ubmVjdG9yKSA9PiB7XG4gICAgICByZXR1cm4gY29ubmVjdG9yLnR5cGUgPT09IHR5cGU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRDb25uZWN0b3Iobm9kZTogRmNOb2RlLCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSB7XG4gICAgbm9kZS5jb25uZWN0b3JzLnB1c2goY29ubmVjdG9yKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTm9kZShub2RlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbm9kZS5jb25uZWN0b3JzLnNwbGljZShub2RlLmNvbm5lY3RvcnMuaW5kZXhPZihjb25uZWN0b3IpLCAxKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUobm9kZTogRmNOb2RlKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdChub2RlKTtcbiAgICB9XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBjb25zdCBpbmRleCA9IG1vZGVsLm5vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCB1bmRlZmluZWQnKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVsZXRlIG5vdCBleGlzdGluZyBub2RlJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RvcklkcyA9IHRoaXMuZ2V0Q29ubmVjdG9ySWRzKG5vZGUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWwuZWRnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVkZ2UgPSBtb2RlbC5lZGdlc1tpXTtcbiAgICAgIGlmIChjb25uZWN0b3JJZHMuaW5kZXhPZihlZGdlLnNvdXJjZSkgIT09IC0xIHx8IGNvbm5lY3Rvcklkcy5pbmRleE9mKGVkZ2UuZGVzdGluYXRpb24pICE9PSAtMSkge1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gICAgbW9kZWwubm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub2RlUmVtb3ZlZENhbGxiYWNrKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkTm9kZXMoKTogQXJyYXk8RmNOb2RlPiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICByZXR1cm4gbW9kZWwubm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaXNTZWxlY3RlZChub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDbGlja2VkKG5vZGU6IEZjTm9kZSwgY3RybEtleT86IGJvb2xlYW4pIHtcbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMudG9nZ2xlU2VsZWN0ZWQobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5zZWxlY3Qobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZShub2RlOiBGY05vZGUpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHRyeSB7XG4gICAgICBtb2RlbC5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTm9kZXMobW9kZWwubm9kZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBtb2RlbC5ub2Rlcy5zcGxpY2UobW9kZWwubm9kZXMuaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9ySWRzKG5vZGU6IEZjTm9kZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMubWFwKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHJldHVybiBjb25uZWN0b3IuaWQ7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZUJ5Q29ubmVjdG9ySWQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjTm9kZSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbW9kZWwubm9kZXMpIHtcbiAgICAgIGNvbnN0IGNvbm5lY3RvcklkcyA9IHRoaXMuZ2V0Q29ubmVjdG9ySWRzKG5vZGUpO1xuICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGNvbm5lY3RvcklkKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRIdG1sRWxlbWVudChub2RlSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXNIdG1sRWxlbWVudHNbbm9kZUlkXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRIdG1sRWxlbWVudChub2RlSWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlc0h0bWxFbGVtZW50c1tub2RlSWRdID0gZWxlbWVudDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxufVxuXG5jbGFzcyBFZGdlc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjRWRnZT4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIHNvdXJjZUNvb3JkKGVkZ2U6IEZjRWRnZSk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGVkZ2Uuc291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0Q29vcmQoZWRnZTogRmNFZGdlKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoZWRnZS5kZXN0aW5hdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGVkZ2U6IEZjRWRnZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgY29uc3QgaW5kZXggPSBtb2RlbC5lZGdlcy5pbmRleE9mKGVkZ2UpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVsZXRlIG5vdCBleGlzdGluZyBlZGdlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoZWRnZSkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3QoZWRnZSk7XG4gICAgfVxuICAgIG1vZGVsLmVkZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZVJlbW92ZWRDYWxsYmFjayhlZGdlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEVkZ2VzKCk6IEFycmF5PEZjRWRnZT4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgcmV0dXJuIG1vZGVsLmVkZ2VzLmZpbHRlcigoZWRnZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmlzU2VsZWN0ZWQoZWRnZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZTogRmNFZGdlLCBjdHJsS2V5PzogYm9vbGVhbikge1xuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy50b2dnbGVTZWxlY3RlZChlZGdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnNlbGVjdChlZGdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHV0RWRnZShlZGdlOiBGY0VkZ2UpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIG1vZGVsLmVkZ2VzLnB1c2goZWRnZSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gIH1cblxuICBwdWJsaWMgX2FkZEVkZ2UoZXZlbnQ6IEV2ZW50LCBzb3VyY2VDb25uZWN0b3I6IEZjQ29ubmVjdG9yLCBkZXN0Q29ubmVjdG9yOiBGY0Nvbm5lY3RvciwgbGFiZWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUNvbm5lY3Rvcihzb3VyY2VDb25uZWN0b3IpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUNvbm5lY3RvcihkZXN0Q29ubmVjdG9yKTtcbiAgICBjb25zdCBlZGdlOiBGY0VkZ2UgPSB7fTtcbiAgICBlZGdlLnNvdXJjZSA9IHNvdXJjZUNvbm5lY3Rvci5pZDtcbiAgICBlZGdlLmRlc3RpbmF0aW9uID0gZGVzdENvbm5lY3Rvci5pZDtcbiAgICBlZGdlLmxhYmVsID0gbGFiZWw7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyhtb2RlbC5lZGdlcy5jb25jYXQoW2VkZ2VdKSwgbW9kZWwubm9kZXMpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNyZWF0ZUVkZ2UoZXZlbnQsIGVkZ2UpLnN1YnNjcmliZShcbiAgICAgIChjcmVhdGVkKSA9PiB7XG4gICAgICAgIG1vZGVsLmVkZ2VzLnB1c2goY3JlYXRlZCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlQWRkZWRDYWxsYmFjayhjcmVhdGVkKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=