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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQVNMLGtCQUFrQixFQUNuQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QztJQTRCRSx3QkFBWSxlQUF5QyxFQUN6QyxLQUFjLEVBQ2QsWUFBK0IsRUFDL0Isb0JBQWtDLEVBQ2xDLGVBQXNCLEVBQ3RCLFFBQThDLEVBQzlDLFVBQThELEVBQzlELGlCQUF5QyxFQUN6QyxtQkFBMkMsRUFDM0MsbUJBQTJDLEVBQzNDLGlCQUE4QixFQUM5QixjQUEwQjtRQVh0QyxpQkFtQ0M7UUF4REQsd0JBQW1CLEdBQXlCLEVBQUUsQ0FBQztRQUMvQyxzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBZSxJQUFJLENBQUM7UUFXakIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFtQjlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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LEtBQUssQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsT0FBTztZQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN2QyxLQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQW5FRCxDQUF5QixlQUFlLEdBbUV2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgRmNDb25uZWN0b3IsXG4gIEZjQ29ubmVjdG9yUmVjdEluZm8sXG4gIEZjQ29vcmRzLFxuICBGY0VkZ2UsXG4gIEZjSXRlbUluZm8sXG4gIEZjTW9kZWwsXG4gIEZjTm9kZSxcbiAgRmNSZWN0Qm94LFxuICBGbG93Y2hhcnRDb25zdGFudHNcbn0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBGY01vZGVsU2VydmljZSB7XG5cbiAgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2U7XG4gIG1vZGVsOiBGY01vZGVsO1xuICBwcml2YXRlIHJlYWRvbmx5IGRldGVjdENoYW5nZXNTdWJqZWN0OiBTdWJqZWN0PGFueT47XG4gIHNlbGVjdGVkT2JqZWN0czogYW55W107XG5cbiAgY29ubmVjdG9yc1JlY3RJbmZvczogQ29ubmVjdG9yUmVjdEluZm9NYXAgPSB7fTtcbiAgbm9kZXNIdG1sRWxlbWVudHM6IEh0bWxFbGVtZW50TWFwID0ge307XG4gIGNhbnZhc0h0bWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIGRyYWdJbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG51bGw7XG4gIHN2Z0h0bWxFbGVtZW50OiBTVkdFbGVtZW50ID0gbnVsbDtcblxuICBkcm9wTm9kZTogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBjcmVhdGVFZGdlOiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPjtcbiAgZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG5cbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIHJlYWRvbmx5IGRlYm91bmNlciA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25uZWN0b3JzOiBDb25uZWN0b3JzTW9kZWw7XG4gIG5vZGVzOiBOb2Rlc01vZGVsO1xuICBlZGdlczogRWRnZXNNb2RlbDtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWw6IEZjTW9kZWwsXG4gICAgICAgICAgICAgIG1vZGVsQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4sXG4gICAgICAgICAgICAgIGRldGVjdENoYW5nZXNTdWJqZWN0OiBTdWJqZWN0PGFueT4sXG4gICAgICAgICAgICAgIHNlbGVjdGVkT2JqZWN0czogYW55W10sXG4gICAgICAgICAgICAgIGRyb3BOb2RlOiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGNyZWF0ZUVkZ2U6IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+LFxuICAgICAgICAgICAgICBlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY2FudmFzSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICBzdmdIdG1sRWxlbWVudDogU1ZHRWxlbWVudCkge1xuXG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24gPSBtb2RlbFZhbGlkYXRpb247XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMubW9kZWxDaGFuZ2VkID0gbW9kZWxDaGFuZ2VkO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3QgPSBkZXRlY3RDaGFuZ2VzU3ViamVjdDtcbiAgICB0aGlzLmNhbnZhc0h0bWxFbGVtZW50ID0gY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgdGhpcy5zdmdIdG1sRWxlbWVudCA9IHN2Z0h0bWxFbGVtZW50O1xuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTW9kZWwodGhpcy5tb2RlbCk7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMgPSBzZWxlY3RlZE9iamVjdHM7XG5cbiAgICB0aGlzLmRyb3BOb2RlID0gZHJvcE5vZGUgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLmNyZWF0ZUVkZ2UgPSBjcmVhdGVFZGdlIHx8ICgoZXZlbnQsIGVkZ2UpID0+IG9mKHsuLi5lZGdlLCBsYWJlbDogJ2xhYmVsJ30pKTtcbiAgICB0aGlzLmVkZ2VBZGRlZENhbGxiYWNrID0gZWRnZUFkZGVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLm5vZGVSZW1vdmVkQ2FsbGJhY2sgPSBub2RlUmVtb3ZlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5lZGdlUmVtb3ZlZENhbGxiYWNrID0gZWRnZVJlbW92ZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuXG4gICAgdGhpcy5jb25uZWN0b3JzID0gbmV3IENvbm5lY3RvcnNNb2RlbCh0aGlzKTtcbiAgICB0aGlzLm5vZGVzID0gbmV3IE5vZGVzTW9kZWwodGhpcyk7XG4gICAgdGhpcy5lZGdlcyA9IG5ldyBFZGdlc01vZGVsKHRoaXMpO1xuXG4gICAgdGhpcy5kZWJvdW5jZXJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgxMDApKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGVsQ2hhbmdlZC5lbWl0KCkpO1xuICB9XG5cbiAgcHVibGljIG5vdGlmeU1vZGVsQ2hhbmdlZCgpIHtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3QubmV4dCgpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRWRpdGFibGUoKSkge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRWRpdGFibGUoKSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVzZWxlY3QgYW4gdW5zZWxlY3RlZCBvYmplY3QnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGVkT2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZE9iamVjdChvYmplY3QpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlLnJlYWRvbmx5KSB7XG4gICAgICAgIHRoaXMubm9kZXMuc2VsZWN0KG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubW9kZWwuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgIHRoaXMuZWRnZXMuc2VsZWN0KGVkZ2UpO1xuICAgIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkT2JqZWN0cy5sZW5ndGgpO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5sZW5ndGggPT09IDEgJiZcbiAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSAhPT0gLTE7XG4gIH1cblxuICBwcml2YXRlIGluUmVjdEJveCh4OiBudW1iZXIsIHk6IG51bWJlciwgcmVjdEJveDogRmNSZWN0Qm94KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHggPj0gcmVjdEJveC5sZWZ0ICYmIHggPD0gcmVjdEJveC5yaWdodCAmJlxuICAgICAgeSA+PSByZWN0Qm94LnRvcCAmJiB5IDw9IHJlY3RCb3guYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGdldEl0ZW1JbmZvQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjSXRlbUluZm8ge1xuICAgIHJldHVybiB7XG4gICAgICBub2RlOiB0aGlzLmdldE5vZGVBdFBvaW50KHgsIHkpLFxuICAgICAgZWRnZTogdGhpcy5nZXRFZGdlQXRQb2ludCh4LCB5KVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZUF0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY05vZGUge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm1vZGVsLm5vZGVzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudChub2RlLmlkKTtcbiAgICAgIGNvbnN0IG5vZGVFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICh4ID49IG5vZGVFbGVtZW50Qm94LmxlZnQgJiYgeCA8PSBub2RlRWxlbWVudEJveC5yaWdodFxuICAgICAgICAmJiB5ID49IG5vZGVFbGVtZW50Qm94LnRvcCAmJiB5IDw9IG5vZGVFbGVtZW50Qm94LmJvdHRvbSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWRnZUF0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY0VkZ2Uge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xuICAgIGNvbnN0IGlkID0gZWxlbWVudC5pZDtcbiAgICBsZXQgZWRnZUluZGV4ID0gLTE7XG4gICAgaWYgKGlkKSB7XG4gICAgICBpZiAoaWQuc3RhcnRzV2l0aCgnZmMtZWRnZS1wYXRoLScpKSB7XG4gICAgICAgIGVkZ2VJbmRleCA9IE51bWJlcihpZC5zdWJzdHJpbmcoJ2ZjLWVkZ2UtcGF0aC0nLmxlbmd0aCkpO1xuICAgICAgfSBlbHNlIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLWxhYmVsLScpKSB7XG4gICAgICAgIGVkZ2VJbmRleCA9IE51bWJlcihpZC5zdWJzdHJpbmcoJ2ZjLWVkZ2UtbGFiZWwtJy5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVkZ2VJbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbC5lZGdlc1tlZGdlSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGxJblJlY3QocmVjdEJveDogRmNSZWN0Qm94KSB7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubm9kZXMuZ2V0SHRtbEVsZW1lbnQodmFsdWUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCF2YWx1ZS5yZWFkb25seSkge1xuICAgICAgICBjb25zdCB4ID0gbm9kZUVsZW1lbnRCb3gubGVmdCArIG5vZGVFbGVtZW50Qm94LndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgeSA9IG5vZGVFbGVtZW50Qm94LnRvcCArIG5vZGVFbGVtZW50Qm94LmhlaWdodCAvIDI7XG4gICAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICAgIHRoaXMubm9kZXMuc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5ub2Rlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5kZXNlbGVjdCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudEJveCA9IHRoaXMuY2FudmFzSHRtbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmVkZ2VzLnNvdXJjZUNvb3JkKHZhbHVlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHRoaXMuZWRnZXMuZGVzdENvb3JkKHZhbHVlKTtcbiAgICAgIGNvbnN0IHggPSAoc3RhcnQueCArIGVuZC54KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gKHN0YXJ0LnkgKyBlbmQueSkgLyAyICsgY2FudmFzRWxlbWVudEJveC50b3A7XG4gICAgICBpZiAodGhpcy5pblJlY3RCb3goeCwgeSwgcmVjdEJveCkpIHtcbiAgICAgICAgdGhpcy5lZGdlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZWRnZXMuaXNTZWxlY3RlZCh2YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLmVkZ2VzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVNlbGVjdGVkKCkge1xuICAgIGNvbnN0IGVkZ2VzVG9EZWxldGUgPSB0aGlzLmVkZ2VzLmdldFNlbGVjdGVkRWRnZXMoKTtcbiAgICBlZGdlc1RvRGVsZXRlLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIHRoaXMuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgIH0pO1xuICAgIGNvbnN0IG5vZGVzVG9EZWxldGUgPSB0aGlzLm5vZGVzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICBub2Rlc1RvRGVsZXRlLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMubm9kZXMuZGVsZXRlKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNEcm9wU291cmNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyb3BUYXJnZXRJZCAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldERyYWdJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuZHJhZ0ltYWdlKSB7XG4gICAgICB0aGlzLmRyYWdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5kcmFnSW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNyc7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRyYWdJbWFnZTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgSHRtbEVsZW1lbnRNYXAgeyBbaWQ6IHN0cmluZ106IEhUTUxFbGVtZW50OyB9XG5cbmludGVyZmFjZSBDb25uZWN0b3JSZWN0SW5mb01hcCB7IFtpZDogc3RyaW5nXTogRmNDb25uZWN0b3JSZWN0SW5mbzsgfVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZjTW9kZWw8VD4ge1xuXG4gIG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uuc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3Qob2JqZWN0OiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGVzZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWxlY3RlZChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS50b2dnbGVTZWxlY3RlZE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWQob2JqZWN0OiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXQob2JqZWN0OiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmlzRWRpdE9iamVjdChvYmplY3QpO1xuICB9XG59XG5cbmNsYXNzIENvbm5lY3RvcnNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY0Nvbm5lY3Rvcj4ge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihtb2RlbFNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rvcihjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb25uZWN0b3Ige1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG1vZGVsLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbm5lY3RvciBvZiBub2RlLmNvbm5lY3RvcnMpIHtcbiAgICAgICAgaWYgKGNvbm5lY3Rvci5pZCA9PT0gY29ubmVjdG9ySWQpIHtcbiAgICAgICAgICByZXR1cm4gY29ubmVjdG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3RvclJlY3RJbmZvKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvbm5lY3RvclJlY3RJbmZvIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9yc1JlY3RJbmZvc1tjb25uZWN0b3JJZF07XG4gIH1cblxuICBwdWJsaWMgc2V0Q29ubmVjdG9yUmVjdEluZm8oY29ubmVjdG9ySWQ6IHN0cmluZywgY29ubmVjdG9yUmVjdEluZm86IEZjQ29ubmVjdG9yUmVjdEluZm8pIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzUmVjdEluZm9zW2Nvbm5lY3RvcklkXSA9IGNvbm5lY3RvclJlY3RJbmZvO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvb3Jkcyhjb25uZWN0b3JJZDogc3RyaW5nLCBjZW50ZXJlZD86IGJvb2xlYW4pOiBGY0Nvb3JkcyB7XG4gICAgY29uc3QgY29ubmVjdG9yUmVjdEluZm8gPSB0aGlzLmdldENvbm5lY3RvclJlY3RJbmZvKGNvbm5lY3RvcklkKTtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICBpZiAoY29ubmVjdG9yUmVjdEluZm8gPT09IG51bGwgfHwgY29ubmVjdG9yUmVjdEluZm8gPT09IHVuZGVmaW5lZCB8fCBjYW52YXMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7eDogMCwgeTogMH07XG4gICAgfVxuICAgIGxldCB4ID0gY29ubmVjdG9yUmVjdEluZm8udHlwZSA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxlZnRDb25uZWN0b3JUeXBlID9cbiAgICAgIGNvbm5lY3RvclJlY3RJbmZvLm5vZGVSZWN0SW5mby5sZWZ0KCkgOiBjb25uZWN0b3JSZWN0SW5mby5ub2RlUmVjdEluZm8ucmlnaHQoKTtcbiAgICBsZXQgeSA9IGNvbm5lY3RvclJlY3RJbmZvLm5vZGVSZWN0SW5mby50b3AoKSArIGNvbm5lY3RvclJlY3RJbmZvLm5vZGVSZWN0SW5mby5oZWlnaHQoKSAvIDI7XG4gICAgaWYgKCFjZW50ZXJlZCkge1xuICAgICAgeCAtPSBjb25uZWN0b3JSZWN0SW5mby53aWR0aCAvIDI7XG4gICAgICB5IC09IGNvbm5lY3RvclJlY3RJbmZvLmhlaWdodCAvIDI7XG4gICAgfVxuICAgIGNvbnN0IGNvb3JkczogRmNDb29yZHMgPSB7XG4gICAgICB4OiBNYXRoLnJvdW5kKHgpLFxuICAgICAgeTogTWF0aC5yb3VuZCh5KVxuICAgIH07XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb29yZHMoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q29vcmRzKGNvbm5lY3RvcklkLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb29yZHMoY29ubmVjdG9ySWQsIHRydWUpO1xuICB9XG59XG5cbmNsYXNzIE5vZGVzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNOb2RlPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yc0J5VHlwZShub2RlOiBGY05vZGUsIHR5cGU6IHN0cmluZyk6IEFycmF5PEZjQ29ubmVjdG9yPiB7XG4gICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5maWx0ZXIoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rvci50eXBlID09PSB0eXBlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkQ29ubmVjdG9yKG5vZGU6IEZjTm9kZSwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIG5vZGUuY29ubmVjdG9ycy5wdXNoKGNvbm5lY3Rvcik7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU5vZGUobm9kZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG5vZGUuY29ubmVjdG9ycy5zcGxpY2Uobm9kZS5jb25uZWN0b3JzLmluZGV4T2YoY29ubmVjdG9yKSwgMSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKG5vZGU6IEZjTm9kZSkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3Qobm9kZSk7XG4gICAgfVxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgY29uc3QgaW5kZXggPSBtb2RlbC5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlbGV0ZSBub3QgZXhpc3Rpbmcgbm9kZScpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JJZHMgPSB0aGlzLmdldENvbm5lY3Rvcklkcyhub2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsLmVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlZGdlID0gbW9kZWwuZWRnZXNbaV07XG4gICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoZWRnZS5zb3VyY2UpICE9PSAtMSB8fCBjb25uZWN0b3JJZHMuaW5kZXhPZihlZGdlLmRlc3RpbmF0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIG1vZGVsLm5vZGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZVJlbW92ZWRDYWxsYmFjayhub2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZE5vZGVzKCk6IEFycmF5PEZjTm9kZT4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgcmV0dXJuIG1vZGVsLm5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmlzU2VsZWN0ZWQobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2tlZChub2RlOiBGY05vZGUsIGN0cmxLZXk/OiBib29sZWFuKSB7XG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLnRvZ2dsZVNlbGVjdGVkKG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuc2VsZWN0KG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGUobm9kZTogRmNOb2RlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICB0cnkge1xuICAgICAgbW9kZWwubm9kZXMucHVzaChub2RlKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU5vZGVzKG1vZGVsLm5vZGVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbW9kZWwubm9kZXMuc3BsaWNlKG1vZGVsLm5vZGVzLmluZGV4T2Yobm9kZSksIDEpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rvcklkcyhub2RlOiBGY05vZGUpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLm1hcCgoY29ubmVjdG9yKSA9PiB7XG4gICAgICByZXR1cm4gY29ubmVjdG9yLmlkO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5vZGVCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY05vZGUge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG1vZGVsLm5vZGVzKSB7XG4gICAgICBjb25zdCBjb25uZWN0b3JJZHMgPSB0aGlzLmdldENvbm5lY3Rvcklkcyhub2RlKTtcbiAgICAgIGlmIChjb25uZWN0b3JJZHMuaW5kZXhPZihjb25uZWN0b3JJZCkgPiAtMSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVsZW1lbnQobm9kZUlkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzSHRtbEVsZW1lbnRzW25vZGVJZF07XG4gIH1cblxuICBwdWJsaWMgc2V0SHRtbEVsZW1lbnQobm9kZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXNIdG1sRWxlbWVudHNbbm9kZUlkXSA9IGVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbn1cblxuY2xhc3MgRWRnZXNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY0VkZ2U+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBzb3VyY2VDb29yZChlZGdlOiBGY0VkZ2UpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChlZGdlLnNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdENvb3JkKGVkZ2U6IEZjRWRnZSk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGVkZ2UuZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShlZGdlOiBGY0VkZ2UpIHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIGNvbnN0IGluZGV4ID0gbW9kZWwuZWRnZXMuaW5kZXhPZihlZGdlKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlbGV0ZSBub3QgZXhpc3RpbmcgZWRnZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGVkZ2UpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0KGVkZ2UpO1xuICAgIH1cbiAgICBtb2RlbC5lZGdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VSZW1vdmVkQ2FsbGJhY2soZWRnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRFZGdlcygpOiBBcnJheTxGY0VkZ2U+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHJldHVybiBtb2RlbC5lZGdlcy5maWx0ZXIoKGVkZ2UpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5pc1NlbGVjdGVkKGVkZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUVkZ2VNb3VzZUNsaWNrKGVkZ2U6IEZjRWRnZSwgY3RybEtleT86IGJvb2xlYW4pIHtcbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMudG9nZ2xlU2VsZWN0ZWQoZWRnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5zZWxlY3QoZWRnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHB1dEVkZ2UoZWRnZTogRmNFZGdlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBtb2RlbC5lZGdlcy5wdXNoKGVkZ2UpO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICB9XG5cbiAgcHVibGljIF9hZGRFZGdlKGV2ZW50OiBFdmVudCwgc291cmNlQ29ubmVjdG9yOiBGY0Nvbm5lY3RvciwgZGVzdENvbm5lY3RvcjogRmNDb25uZWN0b3IsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVDb25uZWN0b3Ioc291cmNlQ29ubmVjdG9yKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVDb25uZWN0b3IoZGVzdENvbm5lY3Rvcik7XG4gICAgY29uc3QgZWRnZTogRmNFZGdlID0ge307XG4gICAgZWRnZS5zb3VyY2UgPSBzb3VyY2VDb25uZWN0b3IuaWQ7XG4gICAgZWRnZS5kZXN0aW5hdGlvbiA9IGRlc3RDb25uZWN0b3IuaWQ7XG4gICAgZWRnZS5sYWJlbCA9IGxhYmVsO1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXMobW9kZWwuZWRnZXMuY29uY2F0KFtlZGdlXSksIG1vZGVsLm5vZGVzKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5jcmVhdGVFZGdlKGV2ZW50LCBlZGdlKS5zdWJzY3JpYmUoXG4gICAgICAoY3JlYXRlZCkgPT4ge1xuICAgICAgICBtb2RlbC5lZGdlcy5wdXNoKGNyZWF0ZWQpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZUFkZGVkQ2FsbGJhY2soY3JlYXRlZCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19