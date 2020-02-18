import { __extends, __values, __assign, __decorate, __metadata, __param } from 'tslib';
import { InjectionToken, Injectable, EventEmitter, ElementRef, IterableDiffers, ChangeDetectorRef, NgZone, HostBinding, Input, Output, HostListener, Component, ChangeDetectionStrategy, Directive, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';

var FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
var htmlPrefix = 'fc';
var leftConnectorType = 'leftConnector';
var rightConnectorType = 'rightConnector';
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
var BaseError = /** @class */ (function () {
    function BaseError() {
        Error.apply(this, arguments);
    }
    return BaseError;
}());
Object.defineProperty(BaseError, 'prototype', new Error());
var ModelvalidationError = /** @class */ (function (_super) {
    __extends(ModelvalidationError, _super);
    function ModelvalidationError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return ModelvalidationError;
}(BaseError));
function fcTopSort(graph) {
    var e_1, _a, e_2, _b;
    var adjacentList = {};
    graph.nodes.forEach(function (node) {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    });
    graph.edges.forEach(function (edge) {
        var sourceNode = graph.nodes.filter(function (node) {
            return node.connectors.some(function (connector) {
                return connector.id === edge.source;
            });
        })[0];
        var destinationNode = graph.nodes.filter(function (node) {
            return node.connectors.some(function (connector) {
                return connector.id === edge.destination;
            });
        })[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    });
    var orderedNodes = [];
    var sourceNodes = [];
    try {
        for (var _c = __values(Object.keys(adjacentList)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var node = _d.value;
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
        var sourceNode = sourceNodes.pop();
        for (var i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
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
    var hasEdges = false;
    try {
        for (var _e = __values(Object.keys(adjacentList)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var node = _f.value;
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
        this.dropNode = dropNode || (function () { });
        this.createEdge = createEdge || (function (event, edge) { return of(__assign(__assign({}, edge), { label: 'label' })); });
        this.edgeAddedCallback = edgeAddedCallback || (function () { });
        this.nodeRemovedCallback = nodeRemovedCallback || (function () { });
        this.edgeRemovedCallback = edgeRemovedCallback || (function () { });
        this.connectors = new ConnectorsModel(this);
        this.nodes = new NodesModel(this);
        this.edges = new EdgesModel(this);
        this.debouncer
            .pipe(debounceTime(100))
            .subscribe(function () { return _this.modelChanged.emit(); });
    }
    FcModelService.prototype.notifyModelChanged = function () {
        this.debouncer.next();
    };
    FcModelService.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            _this.detectChangesSubject.next();
        }, 0);
    };
    FcModelService.prototype.selectObject = function (object) {
        if (this.isEditable()) {
            if (this.selectedObjects.indexOf(object) === -1) {
                this.selectedObjects.push(object);
            }
        }
    };
    FcModelService.prototype.deselectObject = function (object) {
        if (this.isEditable()) {
            var index = this.selectedObjects.indexOf(object);
            if (index === -1) {
                throw new Error('Tried to deselect an unselected object');
            }
            this.selectedObjects.splice(index, 1);
        }
    };
    FcModelService.prototype.toggleSelectedObject = function (object) {
        if (this.isSelectedObject(object)) {
            this.deselectObject(object);
        }
        else {
            this.selectObject(object);
        }
    };
    FcModelService.prototype.isSelectedObject = function (object) {
        return this.selectedObjects.indexOf(object) !== -1;
    };
    FcModelService.prototype.selectAll = function () {
        var _this = this;
        this.model.nodes.forEach(function (node) {
            if (!node.readonly) {
                _this.nodes.select(node);
            }
        });
        this.model.edges.forEach(function (edge) {
            _this.edges.select(edge);
        });
        this.detectChanges();
    };
    FcModelService.prototype.deselectAll = function () {
        this.selectedObjects.splice(0, this.selectedObjects.length);
        this.detectChanges();
    };
    FcModelService.prototype.isEditObject = function (object) {
        return this.selectedObjects.length === 1 &&
            this.selectedObjects.indexOf(object) !== -1;
    };
    FcModelService.prototype.inRectBox = function (x, y, rectBox) {
        return x >= rectBox.left && x <= rectBox.right &&
            y >= rectBox.top && y <= rectBox.bottom;
    };
    FcModelService.prototype.getItemInfoAtPoint = function (x, y) {
        return {
            node: this.getNodeAtPoint(x, y),
            edge: this.getEdgeAtPoint(x, y)
        };
    };
    FcModelService.prototype.getNodeAtPoint = function (x, y) {
        var e_1, _a;
        try {
            for (var _b = __values(this.model.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                var element = this.nodes.getHtmlElement(node.id);
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
    FcModelService.prototype.getEdgeAtPoint = function (x, y) {
        var element = document.elementFromPoint(x, y);
        var id = element.id;
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
    FcModelService.prototype.selectAllInRect = function (rectBox) {
        var _this = this;
        this.model.nodes.forEach(function (value) {
            var element = _this.nodes.getHtmlElement(value.id);
            var nodeElementBox = element.getBoundingClientRect();
            if (!value.readonly) {
                var x = nodeElementBox.left + nodeElementBox.width / 2;
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
        });
        var canvasElementBox = this.canvasHtmlElement.getBoundingClientRect();
        this.model.edges.forEach(function (value) {
            var start = _this.edges.sourceCoord(value);
            var end = _this.edges.destCoord(value);
            var x = (start.x + end.x) / 2 + canvasElementBox.left;
            var y = (start.y + end.y) / 2 + canvasElementBox.top;
            if (_this.inRectBox(x, y, rectBox)) {
                _this.edges.select(value);
            }
            else {
                if (_this.edges.isSelected(value)) {
                    _this.edges.deselect(value);
                }
            }
        });
    };
    FcModelService.prototype.deleteSelected = function () {
        var _this = this;
        var edgesToDelete = this.edges.getSelectedEdges();
        edgesToDelete.forEach(function (edge) {
            _this.edges.delete(edge);
        });
        var nodesToDelete = this.nodes.getSelectedNodes();
        nodesToDelete.forEach(function (node) {
            _this.nodes.delete(node);
        });
    };
    FcModelService.prototype.isEditable = function () {
        return this.dropTargetId === undefined;
    };
    FcModelService.prototype.isDropSource = function () {
        return this.dropTargetId !== undefined;
    };
    FcModelService.prototype.getDragImage = function () {
        if (!this.dragImage) {
            this.dragImage = new Image();
            this.dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            this.dragImage.style.visibility = 'hidden';
        }
        return this.dragImage;
    };
    return FcModelService;
}());
var AbstractFcModel = /** @class */ (function () {
    function AbstractFcModel(modelService) {
        this.modelService = modelService;
    }
    AbstractFcModel.prototype.select = function (object) {
        this.modelService.selectObject(object);
    };
    AbstractFcModel.prototype.deselect = function (object) {
        this.modelService.deselectObject(object);
    };
    AbstractFcModel.prototype.toggleSelected = function (object) {
        this.modelService.toggleSelectedObject(object);
    };
    AbstractFcModel.prototype.isSelected = function (object) {
        return this.modelService.isSelectedObject(object);
    };
    AbstractFcModel.prototype.isEdit = function (object) {
        return this.modelService.isEditObject(object);
    };
    return AbstractFcModel;
}());
var ConnectorsModel = /** @class */ (function (_super) {
    __extends(ConnectorsModel, _super);
    function ConnectorsModel(modelService) {
        return _super.call(this, modelService) || this;
    }
    ConnectorsModel.prototype.getConnector = function (connectorId) {
        var e_2, _a, e_3, _b;
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
    ConnectorsModel.prototype.getConnectorRectInfo = function (connectorId) {
        return this.modelService.connectorsRectInfos[connectorId];
    };
    ConnectorsModel.prototype.setConnectorRectInfo = function (connectorId, connectorRectInfo) {
        this.modelService.connectorsRectInfos[connectorId] = connectorRectInfo;
        this.modelService.detectChanges();
    };
    ConnectorsModel.prototype._getCoords = function (connectorId, centered) {
        var connectorRectInfo = this.getConnectorRectInfo(connectorId);
        var canvas = this.modelService.canvasHtmlElement;
        if (connectorRectInfo === null || connectorRectInfo === undefined || canvas === null) {
            return { x: 0, y: 0 };
        }
        var x = connectorRectInfo.type === FlowchartConstants.leftConnectorType ?
            connectorRectInfo.nodeRectInfo.left() : connectorRectInfo.nodeRectInfo.right();
        var y = connectorRectInfo.nodeRectInfo.top() + connectorRectInfo.nodeRectInfo.height() / 2;
        if (!centered) {
            x -= connectorRectInfo.width / 2;
            y -= connectorRectInfo.height / 2;
        }
        var coords = {
            x: Math.round(x),
            y: Math.round(y)
        };
        return coords;
    };
    ConnectorsModel.prototype.getCoords = function (connectorId) {
        return this._getCoords(connectorId, false);
    };
    ConnectorsModel.prototype.getCenteredCoord = function (connectorId) {
        return this._getCoords(connectorId, true);
    };
    return ConnectorsModel;
}(AbstractFcModel));
var NodesModel = /** @class */ (function (_super) {
    __extends(NodesModel, _super);
    function NodesModel(modelService) {
        return _super.call(this, modelService) || this;
    }
    NodesModel.prototype.getConnectorsByType = function (node, type) {
        return node.connectors.filter(function (connector) {
            return connector.type === type;
        });
    };
    NodesModel.prototype._addConnector = function (node, connector) {
        node.connectors.push(connector);
        try {
            this.modelService.modelValidation.validateNode(node);
        }
        catch (error) {
            node.connectors.splice(node.connectors.indexOf(connector), 1);
            throw error;
        }
    };
    NodesModel.prototype.delete = function (node) {
        if (this.isSelected(node)) {
            this.deselect(node);
        }
        var model = this.modelService.model;
        var index = model.nodes.indexOf(node);
        if (index === -1) {
            if (node === undefined) {
                throw new Error('Passed undefined');
            }
            throw new Error('Tried to delete not existing node');
        }
        var connectorIds = this.getConnectorIds(node);
        for (var i = 0; i < model.edges.length; i++) {
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
    NodesModel.prototype.getSelectedNodes = function () {
        var _this = this;
        var model = this.modelService.model;
        return model.nodes.filter(function (node) {
            return _this.modelService.nodes.isSelected(node);
        });
    };
    NodesModel.prototype.handleClicked = function (node, ctrlKey) {
        if (ctrlKey) {
            this.modelService.nodes.toggleSelected(node);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.nodes.select(node);
        }
    };
    NodesModel.prototype._addNode = function (node) {
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
    NodesModel.prototype.getConnectorIds = function (node) {
        return node.connectors.map(function (connector) {
            return connector.id;
        });
    };
    NodesModel.prototype.getNodeByConnectorId = function (connectorId) {
        var e_4, _a;
        var model = this.modelService.model;
        try {
            for (var _b = __values(model.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
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
    NodesModel.prototype.getHtmlElement = function (nodeId) {
        return this.modelService.nodesHtmlElements[nodeId];
    };
    NodesModel.prototype.setHtmlElement = function (nodeId, element) {
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
    EdgesModel.prototype.sourceCoord = function (edge) {
        return this.modelService.connectors.getCenteredCoord(edge.source);
    };
    EdgesModel.prototype.destCoord = function (edge) {
        return this.modelService.connectors.getCenteredCoord(edge.destination);
    };
    EdgesModel.prototype.delete = function (edge) {
        var model = this.modelService.model;
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
    EdgesModel.prototype.getSelectedEdges = function () {
        var _this = this;
        var model = this.modelService.model;
        return model.edges.filter(function (edge) {
            return _this.modelService.edges.isSelected(edge);
        });
    };
    EdgesModel.prototype.handleEdgeMouseClick = function (edge, ctrlKey) {
        if (ctrlKey) {
            this.modelService.edges.toggleSelected(edge);
        }
        else {
            this.modelService.deselectAll();
            this.modelService.edges.select(edge);
        }
    };
    EdgesModel.prototype.putEdge = function (edge) {
        var model = this.modelService.model;
        model.edges.push(edge);
        this.modelService.notifyModelChanged();
    };
    EdgesModel.prototype._addEdge = function (event, sourceConnector, destConnector, label) {
        var _this = this;
        this.modelService.modelValidation.validateConnector(sourceConnector);
        this.modelService.modelValidation.validateConnector(destConnector);
        var edge = {};
        edge.source = sourceConnector.id;
        edge.destination = destConnector.id;
        edge.label = label;
        var model = this.modelService.model;
        this.modelService.modelValidation.validateEdges(model.edges.concat([edge]), model.nodes);
        this.modelService.createEdge(event, edge).subscribe(function (created) {
            model.edges.push(created);
            _this.modelService.notifyModelChanged();
            _this.modelService.edgeAddedCallback(created);
        });
    };
    return EdgesModel;
}(AbstractFcModel));

var FcModelValidationService = /** @class */ (function () {
    function FcModelValidationService() {
    }
    FcModelValidationService.prototype.validateModel = function (model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    };
    FcModelValidationService.prototype.validateNodes = function (nodes) {
        var _this = this;
        var ids = [];
        nodes.forEach(function (node) {
            _this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        });
        var connectorIds = [];
        nodes.forEach(function (node) {
            node.connectors.forEach(function (connector) {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            });
        });
        return nodes;
    };
    FcModelValidationService.prototype.validateNode = function (node) {
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
        node.connectors.forEach(function (connector) {
            _this.validateConnector(connector);
        });
        return node;
    };
    FcModelValidationService.prototype._validateEdges = function (edges, nodes) {
        var _this = this;
        edges.forEach(function (edge) {
            _this._validateEdge(edge, nodes);
        });
        edges.forEach(function (edge1, index1) {
            edges.forEach(function (edge2, index2) {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            });
        });
        if (fcTopSort({ nodes: nodes, edges: edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    };
    FcModelValidationService.prototype.validateEdges = function (edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    };
    FcModelValidationService.prototype._validateEdge = function (edge, nodes) {
        if (edge.source === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        if (edge.destination === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (edge.source === edge.destination) {
            throw new ModelvalidationError('Edge with same source and destination connectors.');
        }
        var sourceNode = nodes.filter(function (node) { return node.connectors.some(function (connector) { return connector.id === edge.source; }); })[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        var destinationNode = nodes.filter(function (node) { return node.connectors.some(function (connector) { return connector.id === edge.destination; }); })[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    };
    FcModelValidationService.prototype.validateEdge = function (edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    };
    FcModelValidationService.prototype.validateConnector = function (connector) {
        if (connector.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
            throw new ModelvalidationError('Type not valid.');
        }
        return connector;
    };
    FcModelValidationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FcModelValidationService);
    return FcModelValidationService;
}());

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
    FcNodeDraggingService.prototype.getCoordinate = function (coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    };
    FcNodeDraggingService.prototype.getXCoordinate = function (x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    };
    FcNodeDraggingService.prototype.getYCoordinate = function (y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    };
    FcNodeDraggingService.prototype.resizeCanvas = function (draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            var canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    };
    FcNodeDraggingService.prototype.isDraggingNode = function (node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    };
    FcNodeDraggingService.prototype.dragstart = function (event, node) {
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
        var elements = [];
        var nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            var selectedNodes = this.modelService.nodes.getSelectedNodes();
            try {
                for (var selectedNodes_1 = __values(selectedNodes), selectedNodes_1_1 = selectedNodes_1.next(); !selectedNodes_1_1.done; selectedNodes_1_1 = selectedNodes_1.next()) {
                    var selectedNode = selectedNodes_1_1.value;
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
            elements.push($(event.target));
            nodes.push(node);
        }
        var offsetsX = [];
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
        var originalEvent = event.originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = elements[0][0].cloneNode(true);
            var offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
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
                var target_1 = event.target;
                var cloneNode_1 = target_1.cloneNode(true);
                target_1.parentNode.insertBefore(cloneNode_1, target_1);
                target_1.style.visibility = 'collapse';
                setTimeout(function () {
                    target_1.parentNode.removeChild(cloneNode_1);
                    target_1.style.visibility = 'visible';
                }, 0);
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
                var dragOffset = this.dragOffsets[i];
                var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                var shadowElement = $("<div style=\"position: absolute; opacity: 0.7; " +
                    ("top: " + this.getYCoordinate(dragOffset.y + event.clientY) + "px; ") +
                    ("left: " + this.getXCoordinate(dragOffset.x + event.clientX) + "px; \">") +
                    ("<div class=\"innerNode\"><p style=\"padding: 0 15px;\">" + draggedNode.name + "</p> </div></div>"));
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
            this.draggedElements.forEach(function (draggedElement) {
                var cloneNode = draggedElement.cloneNode(true);
                draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
                draggedElement.style.visibility = 'collapse';
                setTimeout(function () {
                    draggedElement.parentNode.removeChild(cloneNode);
                    draggedElement.style.visibility = 'visible';
                }, 0);
            });
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                for (var i = 0; i < this.draggedElements.length; i++) {
                    this.destinationHtmlElements.push(this.draggedElements[i]);
                    this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                    this.destinationHtmlElements[i].style.display = 'none';
                }
                this.nodeDraggingScope.shadowDragStarted = true;
            }
        }
    };
    FcNodeDraggingService.prototype.drop = function (event) {
        var _this = this;
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        var dropNode = null;
        var originalEvent = event.originalEvent || event;
        var infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            var dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    var offset = $(this.modelService.canvasHtmlElement).offset();
                    var x = event.clientX - offset.left;
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
            return this.applyFunction(function () {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    var dragOffset = _this.dragOffsets[i];
                    draggedNode.x = Math.round(_this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(_this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                _this.modelService.notifyModelChanged();
                return false;
            });
        }
    };
    FcNodeDraggingService.prototype.dragover = function (event) {
        var _this = this;
        if (nodeDropScope.dropElement) {
            var offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction(function () {
                    _this.destinationHtmlElements[0].style.display = _this.oldDisplayStyles[0];
                    _this.nodeDraggingScope.shadowDragStarted = false;
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
                return this.applyFunction(function () {
                    for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                        var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                        var dragOffset = _this.dragOffsets[i];
                        draggedNode.x = _this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = _this.getYCoordinate(dragOffset.y + event.clientY);
                        _this.resizeCanvas(draggedNode, _this.draggedElements[i]);
                    }
                    event.preventDefault();
                    _this.modelService.notifyModelChanged();
                    return false;
                });
            }
        }
        else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                if (this.nodeDraggingScope.shadowDragStarted) {
                    this.applyFunction(function () {
                        for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                            _this.destinationHtmlElements[i].style.display = _this.oldDisplayStyles[i];
                        }
                        _this.nodeDraggingScope.shadowDragStarted = false;
                    });
                }
                for (var i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    var dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    };
    FcNodeDraggingService.prototype.dragend = function (event) {
        var _this = this;
        this.applyFunction(function () {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (_this.modelService.isDropSource()) {
                return;
            }
            if (_this.nodeDraggingScope.shadowElements.length) {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    var shadowElement = _this.nodeDraggingScope.shadowElements[i];
                    draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
                    draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
                    _this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
                }
                _this.nodeDraggingScope.shadowElements.length = 0;
                _this.modelService.notifyModelChanged();
            }
            if (_this.nodeDraggingScope.draggedNodes.length) {
                _this.nodeDraggingScope.draggedNodes.length = 0;
                _this.draggedElements.length = 0;
                _this.dragOffsets.length = 0;
            }
        });
    };
    return FcNodeDraggingService;
}());

var FcEdgeDrawingService = /** @class */ (function () {
    function FcEdgeDrawingService() {
    }
    FcEdgeDrawingService.prototype.getEdgeDAttribute = function (pt1, pt2, style) {
        var dAddribute = "M " + pt1.x + ", " + pt1.y + " ";
        if (style === FlowchartConstants.curvedStyle) {
            var sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            var destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += "C " + sourceTangent.x + ", " + sourceTangent.y + " " + (destinationTangent.x - 50) + ", " + destinationTangent.y + " " + pt2.x + ", " + pt2.y;
        }
        else {
            dAddribute += "L " + pt2.x + ", " + pt2.y;
        }
        return dAddribute;
    };
    FcEdgeDrawingService.prototype.getEdgeCenter = function (pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    };
    FcEdgeDrawingService.prototype.computeEdgeTangentOffset = function (pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    };
    FcEdgeDrawingService.prototype.computeEdgeSourceTangent = function (pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    FcEdgeDrawingService.prototype.computeEdgeDestinationTangent = function (pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    FcEdgeDrawingService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FcEdgeDrawingService);
    return FcEdgeDrawingService;
}());

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
        this.isValidEdgeCallback = isValidEdgeCallback || (function () { return true; });
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    FcEdgeDraggingService.prototype.dragstart = function (event, connector) {
        var e_1, _a;
        var _this = this;
        var swapConnector;
        var dragLabel;
        var prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            var _loop_1 = function (edge) {
                if (edge.destination === connector.id) {
                    swapConnector = this_1.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this_1.applyFunction(function () {
                        _this.modelService.edges.delete(edge);
                    });
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
        var originalEvent = event.originalEvent || event;
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
    };
    FcEdgeDraggingService.prototype.dragover = function (event) {
        var _this = this;
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction(function () {
                        _this.edgeDragging.shadowDragStarted = false;
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
                return this.applyFunction(function () {
                    if (_this.destinationHtmlElement !== null) {
                        _this.destinationHtmlElement.style.display = _this.oldDisplayStyle;
                    }
                    _this.edgeDragging.dragPoint2 = {
                        x: event.clientX + _this.dragOffset.x,
                        y: event.clientY + _this.dragOffset.y
                    };
                });
            }
        }
    };
    FcEdgeDraggingService.prototype.dragoverConnector = function (event, connector) {
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
    FcEdgeDraggingService.prototype.dragleaveMagnet = function (event) {
        this.edgeDragging.magnetActive = false;
    };
    FcEdgeDraggingService.prototype.dragoverMagnet = function (event, connector) {
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
                    return this.applyFunction(function () {
                        _this.edgeDragging.dragPoint2 = _this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    });
                }
            }
        }
    };
    FcEdgeDraggingService.prototype.dragend = function (event) {
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
                var edge_1 = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction(function () {
                    _this.modelService.edges.putEdge(edge_1);
                });
            }
        }
    };
    FcEdgeDraggingService.prototype.drop = function (event, targetConnector) {
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

var FcMouseOverService = /** @class */ (function () {
    function FcMouseOverService(applyFunction) {
        this.mouseoverscope = {
            connector: null,
            edge: null,
            node: null
        };
        this.applyFunction = applyFunction;
    }
    FcMouseOverService.prototype.nodeMouseOver = function (event, node) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.node = node;
        });
    };
    FcMouseOverService.prototype.nodeMouseOut = function (event, node) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.node = null;
        });
    };
    FcMouseOverService.prototype.connectorMouseEnter = function (event, connector) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.connector = connector;
        });
    };
    FcMouseOverService.prototype.connectorMouseLeave = function (event, connector) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.connector = null;
        });
    };
    FcMouseOverService.prototype.edgeMouseEnter = function (event, edge) {
        this.mouseoverscope.edge = edge;
    };
    FcMouseOverService.prototype.edgeMouseLeave = function (event, edge) {
        this.mouseoverscope.edge = null;
    };
    return FcMouseOverService;
}());

var regex = /(auto|scroll)/;
var style = function (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
};
var ɵ0 = style;
var scroll = function (node) {
    return regex.test(style(node, 'overflow') +
        style(node, 'overflow-y') +
        style(node, 'overflow-x'));
};
var ɵ1 = scroll;
var scrollparent = function (node) {
    return !node || node === document.body
        ? document.body
        : scroll(node)
            ? node
            : scrollparent(node.parentNode);
};
var ɵ2 = scrollparent;

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
    FcRectangleSelectService.prototype.mousedown = function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && this.selectElement.hidden) {
            this.selectElement.hidden = false;
            var offset = this.$canvasElement.offset();
            this.selectRect.x1 = Math.round(e.pageX - offset.left);
            this.selectRect.y1 = Math.round(e.pageY - offset.top);
            this.selectRect.x2 = this.selectRect.x1;
            this.selectRect.y2 = this.selectRect.y1;
            this.updateSelectRect();
        }
    };
    FcRectangleSelectService.prototype.mousemove = function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            var offset = this.$canvasElement.offset();
            this.selectRect.x2 = Math.round(e.pageX - offset.left);
            this.selectRect.y2 = Math.round(e.pageY - offset.top);
            this.updateScroll(offset);
            this.updateSelectRect();
        }
    };
    FcRectangleSelectService.prototype.updateScroll = function (offset) {
        var rect = this.$scrollParent[0].getBoundingClientRect();
        var bottom = rect.bottom - offset.top;
        var right = rect.right - offset.left;
        var top = rect.top - offset.top;
        var left = rect.left - offset.left;
        if (this.selectRect.y2 - top < 25) {
            var topScroll = 25 - (this.selectRect.y2 - top);
            var scroll_1 = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll_1 - topScroll);
        }
        else if (bottom - this.selectRect.y2 < 40) {
            var bottomScroll = 40 - (bottom - this.selectRect.y2);
            var scroll_2 = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll_2 + bottomScroll);
        }
        if (this.selectRect.x2 - left < 25) {
            var leftScroll = 25 - (this.selectRect.x2 - left);
            var scroll_3 = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll_3 - leftScroll);
        }
        else if (right - this.selectRect.x2 < 40) {
            var rightScroll = 40 - (right - this.selectRect.x2);
            var scroll_4 = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll_4 + rightScroll);
        }
    };
    FcRectangleSelectService.prototype.mouseup = function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            var rectBox = this.selectElement.getBoundingClientRect();
            this.selectElement.hidden = true;
            this.selectObjects(rectBox);
        }
    };
    FcRectangleSelectService.prototype.updateSelectRect = function () {
        var x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
        var x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
        var y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
        var y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
        this.selectElement.style.left = x3 + 'px';
        this.selectElement.style.top = y3 + 'px';
        this.selectElement.style.width = x4 - x3 + 'px';
        this.selectElement.style.height = y4 - y3 + 'px';
    };
    FcRectangleSelectService.prototype.selectObjects = function (rectBox) {
        var _this = this;
        this.applyFunction(function () {
            _this.modelService.selectAllInRect(rectBox);
        });
    };
    return FcRectangleSelectService;
}());

var NgxFlowchartComponent = /** @class */ (function () {
    function NgxFlowchartComponent(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        var _this = this;
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.modelChanged = new EventEmitter();
        this.fitModelSizeByDefaultValue = true;
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create(function (index, item) {
            return item;
        });
        this.edgesDiffer = this.differs.find([]).create(function (index, item) {
            return item;
        });
        this.detectChangesSubject = new Subject();
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
        this.detectChangesSubject
            .pipe(debounceTime(50))
            .subscribe(function () { return _this.cd.detectChanges(); });
    }
    Object.defineProperty(NgxFlowchartComponent.prototype, "canvasClass", {
        get: function () {
            return FlowchartConstants.canvasClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxFlowchartComponent.prototype, "fitModelSizeByDefault", {
        get: function () {
            return this.fitModelSizeByDefaultValue;
        },
        set: function (value) {
            this.fitModelSizeByDefaultValue = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NgxFlowchartComponent.prototype.ngOnInit = function () {
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
        var element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.detectChangesSubject, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
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
            nodeClicked: function (event, node) {
                _this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            }
        };
        this.adjustCanvasSize(this.fitModelSizeByDefault);
    };
    NgxFlowchartComponent.prototype.ngDoCheck = function () {
        if (this.model) {
            var nodesChange = this.nodesDiffer.diff(this.model.nodes);
            var edgesChange = this.edgesDiffer.diff(this.model.edges);
            var nodesChanged_1 = false;
            var edgesChanged_1 = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem(function () {
                    nodesChanged_1 = true;
                });
                nodesChange.forEachRemovedItem(function () {
                    nodesChanged_1 = true;
                });
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem(function () {
                    edgesChanged_1 = true;
                });
                edgesChange.forEachRemovedItem(function () {
                    edgesChanged_1 = true;
                });
            }
            if (nodesChanged_1) {
                this.adjustCanvasSize(this.fitModelSizeByDefault);
            }
            if (nodesChanged_1 || edgesChanged_1) {
                this.detectChangesSubject.next();
            }
        }
    };
    NgxFlowchartComponent.prototype.getEdgeDAttribute = function (edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    };
    NgxFlowchartComponent.prototype.adjustCanvasSize = function (fit) {
        var _this = this;
        var maxX = 0;
        var maxY = 0;
        var element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach(function (node) {
            maxX = Math.max(node.x + _this.nodeWidth, maxX);
            maxY = Math.max(node.y + _this.nodeHeight, maxY);
        });
        var width;
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
    NgxFlowchartComponent.prototype.canvasClick = function (event) { };
    NgxFlowchartComponent.prototype.edgeMouseDown = function (event, edge) {
        event.stopPropagation();
    };
    NgxFlowchartComponent.prototype.edgeClick = function (event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    };
    NgxFlowchartComponent.prototype.edgeRemove = function (event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    };
    NgxFlowchartComponent.prototype.edgeEdit = function (event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    };
    NgxFlowchartComponent.prototype.edgeDoubleClick = function (event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    };
    NgxFlowchartComponent.prototype.edgeMouseOver = function (event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    };
    NgxFlowchartComponent.prototype.edgeMouseEnter = function (event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    };
    NgxFlowchartComponent.prototype.edgeMouseLeave = function (event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    };
    NgxFlowchartComponent.prototype.dragover = function (event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    };
    NgxFlowchartComponent.prototype.drop = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    };
    NgxFlowchartComponent.prototype.mousedown = function (event) {
        this.rectangleSelectService.mousedown(event);
    };
    NgxFlowchartComponent.prototype.mousemove = function (event) {
        this.rectangleSelectService.mousemove(event);
    };
    NgxFlowchartComponent.prototype.mouseup = function (event) {
        this.rectangleSelectService.mouseup(event);
    };
    NgxFlowchartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: FcModelValidationService },
        { type: FcEdgeDrawingService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        HostBinding('attr.class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NgxFlowchartComponent.prototype, "canvasClass", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxFlowchartComponent.prototype, "model", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NgxFlowchartComponent.prototype, "selectedObjects", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxFlowchartComponent.prototype, "edgeStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxFlowchartComponent.prototype, "userCallbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NgxFlowchartComponent.prototype, "automaticResize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxFlowchartComponent.prototype, "dragAnimation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NgxFlowchartComponent.prototype, "nodeWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NgxFlowchartComponent.prototype, "nodeHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxFlowchartComponent.prototype, "dropTargetId", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgxFlowchartComponent.prototype, "modelChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NgxFlowchartComponent.prototype, "fitModelSizeByDefault", null);
    __decorate([
        HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "dragover", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "drop", null);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "mousedown", null);
    __decorate([
        HostListener('mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "mousemove", null);
    __decorate([
        HostListener('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "mouseup", null);
    NgxFlowchartComponent = __decorate([
        Component({
            selector: 'fc-canvas',
            template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;-webkit-transition:stroke-width .2s;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;-webkit-transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-transform-origin:bottom left;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{-webkit-transform:scale(1.25);transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            IterableDiffers,
            FcModelValidationService,
            FcEdgeDrawingService,
            ChangeDetectorRef,
            NgZone])
    ], NgxFlowchartComponent);
    return NgxFlowchartComponent;
}());

var FcMagnetDirective = /** @class */ (function () {
    function FcMagnetDirective(elementRef) {
        this.elementRef = elementRef;
    }
    FcMagnetDirective.prototype.ngOnInit = function () {
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    };
    FcMagnetDirective.prototype.dragover = function (event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    };
    FcMagnetDirective.prototype.dragleave = function (event) {
        this.callbacks.edgeDragleaveMagnet(event);
    };
    FcMagnetDirective.prototype.drop = function (event) {
        return this.callbacks.edgeDrop(event, this.connector);
    };
    FcMagnetDirective.prototype.dragend = function (event) {
        this.callbacks.edgeDragend(event);
    };
    FcMagnetDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcMagnetDirective.prototype, "callbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcMagnetDirective.prototype, "connector", void 0);
    __decorate([
        HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "dragover", null);
    __decorate([
        HostListener('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "dragleave", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "drop", null);
    __decorate([
        HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "dragend", null);
    FcMagnetDirective = __decorate([
        Directive({
            // tslint:disable-next-line:directive-selector
            selector: '[fc-magnet]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FcMagnetDirective);
    return FcMagnetDirective;
}());

var FcConnectorDirective = /** @class */ (function () {
    function FcConnectorDirective(elementRef) {
        this.elementRef = elementRef;
    }
    FcConnectorDirective.prototype.ngOnInit = function () {
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        var connectorRectInfo = {
            type: this.connector.type,
            width: this.elementRef.nativeElement.offsetWidth,
            height: this.elementRef.nativeElement.offsetHeight,
            nodeRectInfo: this.nodeRectInfo
        };
        this.modelservice.connectors.setConnectorRectInfo(this.connector.id, connectorRectInfo);
    };
    FcConnectorDirective.prototype.ngOnChanges = function (changes) {
        var e_1, _a;
        var updateConnector = false;
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
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
    FcConnectorDirective.prototype.updateConnectorClass = function () {
        var element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    };
    FcConnectorDirective.prototype.dragover = function (event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    };
    FcConnectorDirective.prototype.drop = function (event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    };
    FcConnectorDirective.prototype.dragend = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    };
    FcConnectorDirective.prototype.dragstart = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    };
    FcConnectorDirective.prototype.mouseenter = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    };
    FcConnectorDirective.prototype.mouseleave = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    };
    FcConnectorDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "callbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FcModelService)
    ], FcConnectorDirective.prototype, "modelservice", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "connector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "nodeRectInfo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "mouseOverConnector", void 0);
    __decorate([
        HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "dragover", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "drop", null);
    __decorate([
        HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "dragend", null);
    __decorate([
        HostListener('dragstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "dragstart", null);
    __decorate([
        HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "mouseenter", null);
    __decorate([
        HostListener('mouseleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "mouseleave", null);
    FcConnectorDirective = __decorate([
        Directive({
            // tslint:disable-next-line:directive-selector
            selector: '[fc-connector]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FcConnectorDirective);
    return FcConnectorDirective;
}());

var FcNodeContainerComponent = /** @class */ (function () {
    function FcNodeContainerComponent(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    Object.defineProperty(FcNodeContainerComponent.prototype, "nodeId", {
        get: function () {
            return this.node.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "top", {
        get: function () {
            return this.node.y + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "left", {
        get: function () {
            return this.node.x + 'px';
        },
        enumerable: true,
        configurable: true
    });
    FcNodeContainerComponent.prototype.ngOnInit = function () {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (function () { });
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (function () { });
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (function () { });
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (function () { });
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (function () { });
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        var componentRef = this.nodeContentContainer.createComponent(componentFactory);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    };
    FcNodeContainerComponent.prototype.ngAfterViewInit = function () {
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    };
    FcNodeContainerComponent.prototype.ngOnChanges = function (changes) {
        var e_1, _a;
        var updateNode = false;
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
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
    FcNodeContainerComponent.prototype.updateNodeClass = function () {
        var element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    };
    FcNodeContainerComponent.prototype.updateNodeComponent = function () {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    };
    FcNodeContainerComponent.prototype.toggleClass = function (element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    };
    FcNodeContainerComponent.prototype.mousedown = function (event) {
        event.stopPropagation();
    };
    FcNodeContainerComponent.prototype.dragstart = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    };
    FcNodeContainerComponent.prototype.dragend = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    };
    FcNodeContainerComponent.prototype.click = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    };
    FcNodeContainerComponent.prototype.mouseover = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    };
    FcNodeContainerComponent.prototype.mouseout = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    };
    FcNodeContainerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FC_NODE_COMPONENT_CONFIG,] }] },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeContainerComponent.prototype, "callbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeContainerComponent.prototype, "userNodeCallbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeContainerComponent.prototype, "node", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeContainerComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeContainerComponent.prototype, "edit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeContainerComponent.prototype, "underMouse", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeContainerComponent.prototype, "mouseOverConnector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FcModelService)
    ], FcNodeContainerComponent.prototype, "modelservice", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeContainerComponent.prototype, "dragging", void 0);
    __decorate([
        HostBinding('attr.id'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], FcNodeContainerComponent.prototype, "nodeId", null);
    __decorate([
        HostBinding('style.top'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], FcNodeContainerComponent.prototype, "top", null);
    __decorate([
        HostBinding('style.left'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], FcNodeContainerComponent.prototype, "left", null);
    __decorate([
        ViewChild('nodeContent', { read: ViewContainerRef, static: true }),
        __metadata("design:type", ViewContainerRef)
    ], FcNodeContainerComponent.prototype, "nodeContentContainer", void 0);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcNodeContainerComponent.prototype, "mousedown", null);
    __decorate([
        HostListener('dragstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcNodeContainerComponent.prototype, "dragstart", null);
    __decorate([
        HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcNodeContainerComponent.prototype, "dragend", null);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcNodeContainerComponent.prototype, "click", null);
    __decorate([
        HostListener('mouseover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcNodeContainerComponent.prototype, "mouseover", null);
    __decorate([
        HostListener('mouseout', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcNodeContainerComponent.prototype, "mouseout", null);
    FcNodeContainerComponent = __decorate([
        Component({
            selector: 'fc-node',
            template: '<ng-template #nodeContent></ng-template>',
            styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{-webkit-box-align:center;align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;height:60px;-webkit-box-pack:center;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}"]
        }),
        __param(0, Inject(FC_NODE_COMPONENT_CONFIG)),
        __metadata("design:paramtypes", [Object, ElementRef,
            ComponentFactoryResolver])
    ], FcNodeContainerComponent);
    return FcNodeContainerComponent;
}());
var FcNodeComponent = /** @class */ (function () {
    function FcNodeComponent() {
        var _this = this;
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: function () {
                return _this.node.y;
            },
            left: function () {
                return _this.node.x;
            },
            bottom: function () {
                return _this.node.y + _this.height;
            },
            right: function () {
                return _this.node.x + _this.width;
            },
            width: function () {
                return _this.width;
            },
            height: function () {
                return _this.height;
            }
        };
    }
    FcNodeComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeComponent.prototype, "callbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeComponent.prototype, "userNodeCallbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeComponent.prototype, "node", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeComponent.prototype, "edit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeComponent.prototype, "underMouse", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcNodeComponent.prototype, "mouseOverConnector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FcModelService)
    ], FcNodeComponent.prototype, "modelservice", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FcNodeComponent.prototype, "dragging", void 0);
    FcNodeComponent = __decorate([
        Directive()
    ], FcNodeComponent);
    return FcNodeComponent;
}());

var DefaultFcNodeComponent = /** @class */ (function (_super) {
    __extends(DefaultFcNodeComponent, _super);
    function DefaultFcNodeComponent() {
        return _super.call(this) || this;
    }
    DefaultFcNodeComponent = __decorate([
        Component({
            selector: 'fc-default-node',
            template: "<div\n  (dblclick)=\"userNodeCallbacks.doubleClick($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n    &times;\n  </div>\n</div>\n",
            styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;left:0;top:0;right:0;bottom:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;-webkit-transition:opacity .2s;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}"]
        }),
        __metadata("design:paramtypes", [])
    ], DefaultFcNodeComponent);
    return DefaultFcNodeComponent;
}(FcNodeComponent));

var ɵ0$1 = {
    nodeComponentType: DefaultFcNodeComponent
};
var NgxFlowchartModule = /** @class */ (function () {
    function NgxFlowchartModule() {
    }
    NgxFlowchartModule = __decorate([
        NgModule({
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
        })
    ], NgxFlowchartModule);
    return NgxFlowchartModule;
}());

/*
 * Public API Surface of ngx-flowchart
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultFcNodeComponent, FC_NODE_COMPONENT_CONFIG, FcConnectorDirective, FcMagnetDirective, FcNodeComponent, FlowchartConstants, ModelvalidationError, NgxFlowchartComponent, NgxFlowchartModule, fcTopSort, ɵ0$1 as ɵ0, FcNodeContainerComponent as ɵa, FcModelValidationService as ɵb, FcEdgeDrawingService as ɵc };
//# sourceMappingURL=ngx-flowchart.js.map
