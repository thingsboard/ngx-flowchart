import { __assign, __extends, __values } from "tslib";
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
export { FcModelService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQVNMLGtCQUFrQixFQUNuQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QztJQTRCRSx3QkFBWSxlQUF5QyxFQUN6QyxLQUFjLEVBQ2QsWUFBK0IsRUFDL0Isb0JBQWtDLEVBQ2xDLGVBQXNCLEVBQ3RCLFFBQThDLEVBQzlDLFVBQThELEVBQzlELGlCQUF5QyxFQUN6QyxtQkFBMkMsRUFDM0MsbUJBQTJDLEVBQzNDLGlCQUE4QixFQUM5QixjQUEwQjtRQVh0QyxpQkFtQ0M7UUF4REQsd0JBQW1CLEdBQXlCLEVBQUUsQ0FBQztRQUMvQyxzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBZSxJQUFJLENBQUM7UUFXakIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFtQjlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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LEtBQUssQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsT0FBTztZQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN2QyxLQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQW5FRCxDQUF5QixlQUFlLEdBbUV2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgRmNDb25uZWN0b3IsXG4gIEZjQ29ubmVjdG9yUmVjdEluZm8sXG4gIEZjQ29vcmRzLFxuICBGY0VkZ2UsXG4gIEZjSXRlbUluZm8sXG4gIEZjTW9kZWwsXG4gIEZjTm9kZSxcbiAgRmNSZWN0Qm94LFxuICBGbG93Y2hhcnRDb25zdGFudHNcbn0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgRmNNb2RlbFNlcnZpY2Uge1xuXG4gIG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlO1xuICBtb2RlbDogRmNNb2RlbDtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXRlY3RDaGFuZ2VzU3ViamVjdDogU3ViamVjdDxhbnk+O1xuICBzZWxlY3RlZE9iamVjdHM6IGFueVtdO1xuXG4gIGNvbm5lY3RvcnNSZWN0SW5mb3M6IENvbm5lY3RvclJlY3RJbmZvTWFwID0ge307XG4gIG5vZGVzSHRtbEVsZW1lbnRzOiBIdG1sRWxlbWVudE1hcCA9IHt9O1xuICBjYW52YXNIdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBkcmFnSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICBzdmdIdG1sRWxlbWVudDogU1ZHRWxlbWVudCA9IG51bGw7XG5cbiAgZHJvcE5vZGU6IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY3JlYXRlRWRnZTogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT47XG4gIGVkZ2VBZGRlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBlZGdlUmVtb3ZlZENhbGxiYWNrOiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuXG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSByZWFkb25seSBkZWJvdW5jZXIgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29ubmVjdG9yczogQ29ubmVjdG9yc01vZGVsO1xuICBub2RlczogTm9kZXNNb2RlbDtcbiAgZWRnZXM6IEVkZ2VzTW9kZWw7XG5cbiAgY29uc3RydWN0b3IobW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIG1vZGVsOiBGY01vZGVsLFxuICAgICAgICAgICAgICBtb2RlbENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+LFxuICAgICAgICAgICAgICBkZXRlY3RDaGFuZ2VzU3ViamVjdDogU3ViamVjdDxhbnk+LFxuICAgICAgICAgICAgICBzZWxlY3RlZE9iamVjdHM6IGFueVtdLFxuICAgICAgICAgICAgICBkcm9wTm9kZTogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBjcmVhdGVFZGdlOiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPixcbiAgICAgICAgICAgICAgZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGNhbnZhc0h0bWxFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgc3ZnSHRtbEVsZW1lbnQ6IFNWR0VsZW1lbnQpIHtcblxuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uID0gbW9kZWxWYWxpZGF0aW9uO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLm1vZGVsQ2hhbmdlZCA9IG1vZGVsQ2hhbmdlZDtcbiAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0ID0gZGV0ZWN0Q2hhbmdlc1N1YmplY3Q7XG4gICAgdGhpcy5jYW52YXNIdG1sRWxlbWVudCA9IGNhbnZhc0h0bWxFbGVtZW50O1xuICAgIHRoaXMuc3ZnSHRtbEVsZW1lbnQgPSBzdmdIdG1sRWxlbWVudDtcbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU1vZGVsKHRoaXMubW9kZWwpO1xuICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzID0gc2VsZWN0ZWRPYmplY3RzO1xuXG4gICAgdGhpcy5kcm9wTm9kZSA9IGRyb3BOb2RlIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5jcmVhdGVFZGdlID0gY3JlYXRlRWRnZSB8fCAoKGV2ZW50LCBlZGdlKSA9PiBvZih7Li4uZWRnZSwgbGFiZWw6ICdsYWJlbCd9KSk7XG4gICAgdGhpcy5lZGdlQWRkZWRDYWxsYmFjayA9IGVkZ2VBZGRlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5ub2RlUmVtb3ZlZENhbGxiYWNrID0gbm9kZVJlbW92ZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMuZWRnZVJlbW92ZWRDYWxsYmFjayA9IGVkZ2VSZW1vdmVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcblxuICAgIHRoaXMuY29ubmVjdG9ycyA9IG5ldyBDb25uZWN0b3JzTW9kZWwodGhpcyk7XG4gICAgdGhpcy5ub2RlcyA9IG5ldyBOb2Rlc01vZGVsKHRoaXMpO1xuICAgIHRoaXMuZWRnZXMgPSBuZXcgRWRnZXNNb2RlbCh0aGlzKTtcblxuICAgIHRoaXMuZGVib3VuY2VyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMTAwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tb2RlbENoYW5nZWQuZW1pdCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBub3RpZnlNb2RlbENoYW5nZWQoKSB7XG4gICAgdGhpcy5kZWJvdW5jZXIubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIGRldGVjdENoYW5nZXMoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0Lm5leHQoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3RPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlc2VsZWN0IGFuIHVuc2VsZWN0ZWQgb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWxlY3RlZE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0KSkge1xuICAgICAgdGhpcy5kZXNlbGVjdE9iamVjdChvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdE9iamVjdChvYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkT2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSAhPT0gLTE7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMubW9kZWwubm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmICghbm9kZS5yZWFkb25seSkge1xuICAgICAgICB0aGlzLm5vZGVzLnNlbGVjdChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLmVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICB0aGlzLmVkZ2VzLnNlbGVjdChlZGdlKTtcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZE9iamVjdHMubGVuZ3RoKTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXRPYmplY3Qob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9iamVjdHMubGVuZ3RoID09PSAxICYmXG4gICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgIT09IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBpblJlY3RCb3goeDogbnVtYmVyLCB5OiBudW1iZXIsIHJlY3RCb3g6IEZjUmVjdEJveCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB4ID49IHJlY3RCb3gubGVmdCAmJiB4IDw9IHJlY3RCb3gucmlnaHQgJiZcbiAgICAgIHkgPj0gcmVjdEJveC50b3AgJiYgeSA8PSByZWN0Qm94LmJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVtSW5mb0F0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY0l0ZW1JbmZvIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm9kZTogdGhpcy5nZXROb2RlQXRQb2ludCh4LCB5KSxcbiAgICAgIGVkZ2U6IHRoaXMuZ2V0RWRnZUF0UG9pbnQoeCwgeSlcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGdldE5vZGVBdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNOb2RlIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5tb2RlbC5ub2Rlcykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubm9kZXMuZ2V0SHRtbEVsZW1lbnQobm9kZS5pZCk7XG4gICAgICBjb25zdCBub2RlRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoeCA+PSBub2RlRWxlbWVudEJveC5sZWZ0ICYmIHggPD0gbm9kZUVsZW1lbnRCb3gucmlnaHRcbiAgICAgICAgJiYgeSA+PSBub2RlRWxlbWVudEJveC50b3AgJiYgeSA8PSBub2RlRWxlbWVudEJveC5ib3R0b20pIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldEVkZ2VBdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNFZGdlIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgICBjb25zdCBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgbGV0IGVkZ2VJbmRleCA9IC0xO1xuICAgIGlmIChpZCkge1xuICAgICAgaWYgKGlkLnN0YXJ0c1dpdGgoJ2ZjLWVkZ2UtcGF0aC0nKSkge1xuICAgICAgICBlZGdlSW5kZXggPSBOdW1iZXIoaWQuc3Vic3RyaW5nKCdmYy1lZGdlLXBhdGgtJy5sZW5ndGgpKTtcbiAgICAgIH0gZWxzZSBpZiAoaWQuc3RhcnRzV2l0aCgnZmMtZWRnZS1sYWJlbC0nKSkge1xuICAgICAgICBlZGdlSW5kZXggPSBOdW1iZXIoaWQuc3Vic3RyaW5nKCdmYy1lZGdlLWxhYmVsLScubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlZGdlSW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWwuZWRnZXNbZWRnZUluZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsSW5SZWN0KHJlY3RCb3g6IEZjUmVjdEJveCkge1xuICAgIHRoaXMubW9kZWwubm9kZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5vZGVzLmdldEh0bWxFbGVtZW50KHZhbHVlLmlkKTtcbiAgICAgIGNvbnN0IG5vZGVFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghdmFsdWUucmVhZG9ubHkpIHtcbiAgICAgICAgY29uc3QgeCA9IG5vZGVFbGVtZW50Qm94LmxlZnQgKyBub2RlRWxlbWVudEJveC53aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IHkgPSBub2RlRWxlbWVudEJveC50b3AgKyBub2RlRWxlbWVudEJveC5oZWlnaHQgLyAyO1xuICAgICAgICBpZiAodGhpcy5pblJlY3RCb3goeCwgeSwgcmVjdEJveCkpIHtcbiAgICAgICAgICB0aGlzLm5vZGVzLnNlbGVjdCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMubm9kZXMuaXNTZWxlY3RlZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMuZGVzZWxlY3QodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnRCb3ggPSB0aGlzLmNhbnZhc0h0bWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMubW9kZWwuZWRnZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5lZGdlcy5zb3VyY2VDb29yZCh2YWx1ZSk7XG4gICAgICBjb25zdCBlbmQgPSB0aGlzLmVkZ2VzLmRlc3RDb29yZCh2YWx1ZSk7XG4gICAgICBjb25zdCB4ID0gKHN0YXJ0LnggKyBlbmQueCkgLyAyICsgY2FudmFzRWxlbWVudEJveC5sZWZ0O1xuICAgICAgY29uc3QgeSA9IChzdGFydC55ICsgZW5kLnkpIC8gMiArIGNhbnZhc0VsZW1lbnRCb3gudG9wO1xuICAgICAgaWYgKHRoaXMuaW5SZWN0Qm94KHgsIHksIHJlY3RCb3gpKSB7XG4gICAgICAgIHRoaXMuZWRnZXMuc2VsZWN0KHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmVkZ2VzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5lZGdlcy5kZXNlbGVjdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBlZGdlc1RvRGVsZXRlID0gdGhpcy5lZGdlcy5nZXRTZWxlY3RlZEVkZ2VzKCk7XG4gICAgZWRnZXNUb0RlbGV0ZS5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgICB0aGlzLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICB9KTtcbiAgICBjb25zdCBub2Rlc1RvRGVsZXRlID0gdGhpcy5ub2Rlcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgbm9kZXNUb0RlbGV0ZS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICB0aGlzLm5vZGVzLmRlbGV0ZShub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyb3BUYXJnZXRJZCA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGlzRHJvcFNvdXJjZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wVGFyZ2V0SWQgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmFnSW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLmRyYWdJbWFnZSkge1xuICAgICAgdGhpcy5kcmFnSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuZHJhZ0ltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcnO1xuICAgICAgdGhpcy5kcmFnSW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kcmFnSW1hZ2U7XG4gIH1cbn1cblxuaW50ZXJmYWNlIEh0bWxFbGVtZW50TWFwIHsgW2lkOiBzdHJpbmddOiBIVE1MRWxlbWVudDsgfVxuXG5pbnRlcmZhY2UgQ29ubmVjdG9yUmVjdEluZm9NYXAgeyBbaWQ6IHN0cmluZ106IEZjQ29ubmVjdG9yUmVjdEluZm87IH1cblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGY01vZGVsPFQ+IHtcblxuICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0KG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLnNlbGVjdE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0KG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VsZWN0ZWQob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5pc1NlbGVjdGVkT2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgaXNFZGl0KG9iamVjdDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5pc0VkaXRPYmplY3Qob2JqZWN0KTtcbiAgfVxufVxuXG5jbGFzcyBDb25uZWN0b3JzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNDb25uZWN0b3I+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3IoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29ubmVjdG9yIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtb2RlbC5ub2Rlcykge1xuICAgICAgZm9yIChjb25zdCBjb25uZWN0b3Igb2Ygbm9kZS5jb25uZWN0b3JzKSB7XG4gICAgICAgIGlmIChjb25uZWN0b3IuaWQgPT09IGNvbm5lY3RvcklkKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3RvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JSZWN0SW5mbyhjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb25uZWN0b3JSZWN0SW5mbyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnNSZWN0SW5mb3NbY29ubmVjdG9ySWRdO1xuICB9XG5cbiAgcHVibGljIHNldENvbm5lY3RvclJlY3RJbmZvKGNvbm5lY3RvcklkOiBzdHJpbmcsIGNvbm5lY3RvclJlY3RJbmZvOiBGY0Nvbm5lY3RvclJlY3RJbmZvKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9yc1JlY3RJbmZvc1tjb25uZWN0b3JJZF0gPSBjb25uZWN0b3JSZWN0SW5mbztcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb29yZHMoY29ubmVjdG9ySWQ6IHN0cmluZywgY2VudGVyZWQ/OiBib29sZWFuKTogRmNDb29yZHMge1xuICAgIGNvbnN0IGNvbm5lY3RvclJlY3RJbmZvID0gdGhpcy5nZXRDb25uZWN0b3JSZWN0SW5mbyhjb25uZWN0b3JJZCk7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgaWYgKGNvbm5lY3RvclJlY3RJbmZvID09PSBudWxsIHx8IGNvbm5lY3RvclJlY3RJbmZvID09PSB1bmRlZmluZWQgfHwgY2FudmFzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4ge3g6IDAsIHk6IDB9O1xuICAgIH1cbiAgICBsZXQgeCA9IGNvbm5lY3RvclJlY3RJbmZvLnR5cGUgPT09IEZsb3djaGFydENvbnN0YW50cy5sZWZ0Q29ubmVjdG9yVHlwZSA/XG4gICAgICBjb25uZWN0b3JSZWN0SW5mby5ub2RlUmVjdEluZm8ubGVmdCgpIDogY29ubmVjdG9yUmVjdEluZm8ubm9kZVJlY3RJbmZvLnJpZ2h0KCk7XG4gICAgbGV0IHkgPSBjb25uZWN0b3JSZWN0SW5mby5ub2RlUmVjdEluZm8udG9wKCkgKyBjb25uZWN0b3JSZWN0SW5mby5ub2RlUmVjdEluZm8uaGVpZ2h0KCkgLyAyO1xuICAgIGlmICghY2VudGVyZWQpIHtcbiAgICAgIHggLT0gY29ubmVjdG9yUmVjdEluZm8ud2lkdGggLyAyO1xuICAgICAgeSAtPSBjb25uZWN0b3JSZWN0SW5mby5oZWlnaHQgLyAyO1xuICAgIH1cbiAgICBjb25zdCBjb29yZHM6IEZjQ29vcmRzID0ge1xuICAgICAgeDogTWF0aC5yb3VuZCh4KSxcbiAgICAgIHk6IE1hdGgucm91bmQoeSlcbiAgICB9O1xuICAgIHJldHVybiBjb29yZHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29vcmRzKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENvb3Jkcyhjb25uZWN0b3JJZCwgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q29vcmRzKGNvbm5lY3RvcklkLCB0cnVlKTtcbiAgfVxufVxuXG5jbGFzcyBOb2Rlc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjTm9kZT4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3RvcnNCeVR5cGUobm9kZTogRmNOb2RlLCB0eXBlOiBzdHJpbmcpOiBBcnJheTxGY0Nvbm5lY3Rvcj4ge1xuICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuZmlsdGVyKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHJldHVybiBjb25uZWN0b3IudHlwZSA9PT0gdHlwZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZENvbm5lY3Rvcihub2RlOiBGY05vZGUsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICBub2RlLmNvbm5lY3RvcnMucHVzaChjb25uZWN0b3IpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVOb2RlKG5vZGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBub2RlLmNvbm5lY3RvcnMuc3BsaWNlKG5vZGUuY29ubmVjdG9ycy5pbmRleE9mKGNvbm5lY3RvciksIDEpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlbGV0ZShub2RlOiBGY05vZGUpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KG5vZGUpO1xuICAgIH1cbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGNvbnN0IGluZGV4ID0gbW9kZWwubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFzc2VkIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZWxldGUgbm90IGV4aXN0aW5nIG5vZGUnKTtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdG9ySWRzID0gdGhpcy5nZXRDb25uZWN0b3JJZHMobm9kZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5lZGdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWRnZSA9IG1vZGVsLmVkZ2VzW2ldO1xuICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGVkZ2Uuc291cmNlKSAhPT0gLTEgfHwgY29ubmVjdG9ySWRzLmluZGV4T2YoZWRnZS5kZXN0aW5hdGlvbikgIT09IC0xKSB7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICBtb2RlbC5ub2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVSZW1vdmVkQ2FsbGJhY2sobm9kZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWROb2RlcygpOiBBcnJheTxGY05vZGU+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHJldHVybiBtb2RlbC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5pc1NlbGVjdGVkKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrZWQobm9kZTogRmNOb2RlLCBjdHJsS2V5PzogYm9vbGVhbikge1xuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy50b2dnbGVTZWxlY3RlZChub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLnNlbGVjdChub2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlKG5vZGU6IEZjTm9kZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgdHJ5IHtcbiAgICAgIG1vZGVsLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVOb2Rlcyhtb2RlbC5ub2Rlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG1vZGVsLm5vZGVzLnNwbGljZShtb2RlbC5ub2Rlcy5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JJZHMobm9kZTogRmNOb2RlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5tYXAoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rvci5pZDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlQnlDb25uZWN0b3JJZChjb25uZWN0b3JJZDogc3RyaW5nKTogRmNOb2RlIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtb2RlbC5ub2Rlcykge1xuICAgICAgY29uc3QgY29ubmVjdG9ySWRzID0gdGhpcy5nZXRDb25uZWN0b3JJZHMobm9kZSk7XG4gICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoY29ubmVjdG9ySWQpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldEh0bWxFbGVtZW50KG5vZGVJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5ub2Rlc0h0bWxFbGVtZW50c1tub2RlSWRdO1xuICB9XG5cbiAgcHVibGljIHNldEh0bWxFbGVtZW50KG5vZGVJZDogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzSHRtbEVsZW1lbnRzW25vZGVJZF0gPSBlbGVtZW50O1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG59XG5cbmNsYXNzIEVkZ2VzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNFZGdlPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQ29vcmQoZWRnZTogRmNFZGdlKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoZWRnZS5zb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGRlc3RDb29yZChlZGdlOiBGY0VkZ2UpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChlZGdlLmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoZWRnZTogRmNFZGdlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBjb25zdCBpbmRleCA9IG1vZGVsLmVkZ2VzLmluZGV4T2YoZWRnZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZWxldGUgbm90IGV4aXN0aW5nIGVkZ2UnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZChlZGdlKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdChlZGdlKTtcbiAgICB9XG4gICAgbW9kZWwuZWRnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlUmVtb3ZlZENhbGxiYWNrKGVkZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkRWRnZXMoKTogQXJyYXk8RmNFZGdlPiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICByZXR1cm4gbW9kZWwuZWRnZXMuZmlsdGVyKChlZGdlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaXNTZWxlY3RlZChlZGdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVFZGdlTW91c2VDbGljayhlZGdlOiBGY0VkZ2UsIGN0cmxLZXk/OiBib29sZWFuKSB7XG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnRvZ2dsZVNlbGVjdGVkKGVkZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc2VsZWN0KGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwdXRFZGdlKGVkZ2U6IEZjRWRnZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgbW9kZWwuZWRnZXMucHVzaChlZGdlKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBfYWRkRWRnZShldmVudDogRXZlbnQsIHNvdXJjZUNvbm5lY3RvcjogRmNDb25uZWN0b3IsIGRlc3RDb25uZWN0b3I6IEZjQ29ubmVjdG9yLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlQ29ubmVjdG9yKHNvdXJjZUNvbm5lY3Rvcik7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlQ29ubmVjdG9yKGRlc3RDb25uZWN0b3IpO1xuICAgIGNvbnN0IGVkZ2U6IEZjRWRnZSA9IHt9O1xuICAgIGVkZ2Uuc291cmNlID0gc291cmNlQ29ubmVjdG9yLmlkO1xuICAgIGVkZ2UuZGVzdGluYXRpb24gPSBkZXN0Q29ubmVjdG9yLmlkO1xuICAgIGVkZ2UubGFiZWwgPSBsYWJlbDtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKG1vZGVsLmVkZ2VzLmNvbmNhdChbZWRnZV0pLCBtb2RlbC5ub2Rlcyk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuY3JlYXRlRWRnZShldmVudCwgZWRnZSkuc3Vic2NyaWJlKFxuICAgICAgKGNyZWF0ZWQpID0+IHtcbiAgICAgICAgbW9kZWwuZWRnZXMucHVzaChjcmVhdGVkKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VBZGRlZENhbGxiYWNrKGNyZWF0ZWQpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==