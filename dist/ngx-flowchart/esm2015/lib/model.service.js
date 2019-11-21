/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
export class FcModelService {
    /**
     * @param {?} modelValidation
     * @param {?} model
     * @param {?} modelChanged
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
    constructor(modelValidation, model, modelChanged, cd, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
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
        this.debouncer
            .pipe(debounceTime(100))
            .subscribe((/**
         * @return {?}
         */
        () => this.modelChanged.emit()));
    }
    /**
     * @return {?}
     */
    notifyModelChanged() {
        this.debouncer.next();
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
        this.modelService.notifyModelChanged();
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
        this.modelService.notifyModelChanged();
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
        this.modelService.notifyModelChanged();
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
            this.modelService.notifyModelChanged();
            this.modelService.edgeAddedCallback(created);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUE0QnpCLFlBQVksZUFBeUMsRUFDekMsS0FBYyxFQUNkLFlBQStCLEVBQy9CLEVBQXFCLEVBQ3JCLGVBQXNCLEVBQ3RCLFFBQThDLEVBQzlDLFVBQThELEVBQzlELGlCQUF5QyxFQUN6QyxtQkFBMkMsRUFDM0MsbUJBQTJDLEVBQzNDLGlCQUE4QixFQUM5QixjQUEwQjtRQWhDdEMsMkJBQXNCLEdBQW1CLEVBQUUsQ0FBQztRQUM1QyxzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBZSxJQUFJLENBQUM7UUFXakIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFtQjlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFH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QUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUzs7OztRQUNqRCxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1YsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjQ29ubmVjdG9yLCBGY0Nvb3JkcywgRmNFZGdlLCBGY0l0ZW1JbmZvLCBGY01vZGVsLCBGY05vZGUsIEZjUmVjdEJveCB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEZjTW9kZWxTZXJ2aWNlIHtcblxuICBtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZTtcbiAgbW9kZWw6IEZjTW9kZWw7XG4gIGNkOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXTtcblxuICBjb25uZWN0b3JzSHRtbEVsZW1lbnRzOiBIdG1sRWxlbWVudE1hcCA9IHt9O1xuICBub2Rlc0h0bWxFbGVtZW50czogSHRtbEVsZW1lbnRNYXAgPSB7fTtcbiAgY2FudmFzSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgZHJhZ0ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcbiAgc3ZnSHRtbEVsZW1lbnQ6IFNWR0VsZW1lbnQgPSBudWxsO1xuXG4gIGRyb3BOb2RlOiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGNyZWF0ZUVkZ2U6IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+O1xuICBlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcblxuICBkcm9wVGFyZ2V0SWQ6IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVib3VuY2VyID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbm5lY3RvcnM6IENvbm5lY3RvcnNNb2RlbDtcbiAgbm9kZXM6IE5vZGVzTW9kZWw7XG4gIGVkZ2VzOiBFZGdlc01vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgbW9kZWxDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PixcbiAgICAgICAgICAgICAgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBzZWxlY3RlZE9iamVjdHM6IGFueVtdLFxuICAgICAgICAgICAgICBkcm9wTm9kZTogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBjcmVhdGVFZGdlOiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPixcbiAgICAgICAgICAgICAgZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGNhbnZhc0h0bWxFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgc3ZnSHRtbEVsZW1lbnQ6IFNWR0VsZW1lbnQpIHtcblxuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uID0gbW9kZWxWYWxpZGF0aW9uO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLm1vZGVsQ2hhbmdlZCA9IG1vZGVsQ2hhbmdlZDtcbiAgICB0aGlzLmNkID0gY2Q7XG4gICAgdGhpcy5jYW52YXNIdG1sRWxlbWVudCA9IGNhbnZhc0h0bWxFbGVtZW50O1xuICAgIHRoaXMuc3ZnSHRtbEVsZW1lbnQgPSBzdmdIdG1sRWxlbWVudDtcbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU1vZGVsKHRoaXMubW9kZWwpO1xuICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzID0gc2VsZWN0ZWRPYmplY3RzO1xuXG4gICAgdGhpcy5kcm9wTm9kZSA9IGRyb3BOb2RlIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5jcmVhdGVFZGdlID0gY3JlYXRlRWRnZSB8fCAoKGV2ZW50LCBlZGdlKSA9PiBvZih7Li4uZWRnZSwgbGFiZWw6ICdsYWJlbCd9KSk7XG4gICAgdGhpcy5lZGdlQWRkZWRDYWxsYmFjayA9IGVkZ2VBZGRlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5ub2RlUmVtb3ZlZENhbGxiYWNrID0gbm9kZVJlbW92ZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMuZWRnZVJlbW92ZWRDYWxsYmFjayA9IGVkZ2VSZW1vdmVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcblxuICAgIHRoaXMuY29ubmVjdG9ycyA9IG5ldyBDb25uZWN0b3JzTW9kZWwodGhpcyk7XG4gICAgdGhpcy5ub2RlcyA9IG5ldyBOb2Rlc01vZGVsKHRoaXMpO1xuICAgIHRoaXMuZWRnZXMgPSBuZXcgRWRnZXNNb2RlbCh0aGlzKTtcblxuICAgIHRoaXMuZGVib3VuY2VyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMTAwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tb2RlbENoYW5nZWQuZW1pdCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBub3RpZnlNb2RlbENoYW5nZWQoKSB7XG4gICAgdGhpcy5kZWJvdW5jZXIubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIGRldGVjdENoYW5nZXMoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVzZWxlY3RPYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlc2VsZWN0IGFuIHVuc2VsZWN0ZWQgb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTZWxlY3RlZE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0KSkge1xuICAgICAgdGhpcy5kZXNlbGVjdE9iamVjdChvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdE9iamVjdChvYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkT2JqZWN0KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSAhPT0gLTE7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsKCkge1xuICAgIHRoaXMubW9kZWwubm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGlmICghbm9kZS5yZWFkb25seSkge1xuICAgICAgICB0aGlzLm5vZGVzLnNlbGVjdChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLmVkZ2VzLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICB0aGlzLmVkZ2VzLnNlbGVjdChlZGdlKTtcbiAgICB9KTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZE9iamVjdHMubGVuZ3RoKTtcbiAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXRPYmplY3Qob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9iamVjdHMubGVuZ3RoID09PSAxICYmXG4gICAgICB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgIT09IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBpblJlY3RCb3goeDogbnVtYmVyLCB5OiBudW1iZXIsIHJlY3RCb3g6IEZjUmVjdEJveCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB4ID49IHJlY3RCb3gubGVmdCAmJiB4IDw9IHJlY3RCb3gucmlnaHQgJiZcbiAgICAgIHkgPj0gcmVjdEJveC50b3AgJiYgeSA8PSByZWN0Qm94LmJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVtSW5mb0F0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY0l0ZW1JbmZvIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm9kZTogdGhpcy5nZXROb2RlQXRQb2ludCh4LCB5KSxcbiAgICAgIGVkZ2U6IHRoaXMuZ2V0RWRnZUF0UG9pbnQoeCwgeSlcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGdldE5vZGVBdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNOb2RlIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5tb2RlbC5ub2Rlcykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubm9kZXMuZ2V0SHRtbEVsZW1lbnQobm9kZS5pZCk7XG4gICAgICBjb25zdCBub2RlRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoeCA+PSBub2RlRWxlbWVudEJveC5sZWZ0ICYmIHggPD0gbm9kZUVsZW1lbnRCb3gucmlnaHRcbiAgICAgICAgJiYgeSA+PSBub2RlRWxlbWVudEJveC50b3AgJiYgeSA8PSBub2RlRWxlbWVudEJveC5ib3R0b20pIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldEVkZ2VBdFBvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogRmNFZGdlIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgICBjb25zdCBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgbGV0IGVkZ2VJbmRleCA9IC0xO1xuICAgIGlmIChpZCkge1xuICAgICAgaWYgKGlkLnN0YXJ0c1dpdGgoJ2ZjLWVkZ2UtcGF0aC0nKSkge1xuICAgICAgICBlZGdlSW5kZXggPSBOdW1iZXIoaWQuc3Vic3RyaW5nKCdmYy1lZGdlLXBhdGgtJy5sZW5ndGgpKTtcbiAgICAgIH0gZWxzZSBpZiAoaWQuc3RhcnRzV2l0aCgnZmMtZWRnZS1sYWJlbC0nKSkge1xuICAgICAgICBlZGdlSW5kZXggPSBOdW1iZXIoaWQuc3Vic3RyaW5nKCdmYy1lZGdlLWxhYmVsLScubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlZGdlSW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWwuZWRnZXNbZWRnZUluZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsSW5SZWN0KHJlY3RCb3g6IEZjUmVjdEJveCkge1xuICAgIHRoaXMubW9kZWwubm9kZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5vZGVzLmdldEh0bWxFbGVtZW50KHZhbHVlLmlkKTtcbiAgICAgIGNvbnN0IG5vZGVFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghdmFsdWUucmVhZG9ubHkpIHtcbiAgICAgICAgY29uc3QgeCA9IG5vZGVFbGVtZW50Qm94LmxlZnQgKyBub2RlRWxlbWVudEJveC53aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IHkgPSBub2RlRWxlbWVudEJveC50b3AgKyBub2RlRWxlbWVudEJveC5oZWlnaHQgLyAyO1xuICAgICAgICBpZiAodGhpcy5pblJlY3RCb3goeCwgeSwgcmVjdEJveCkpIHtcbiAgICAgICAgICB0aGlzLm5vZGVzLnNlbGVjdCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMubm9kZXMuaXNTZWxlY3RlZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMuZGVzZWxlY3QodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnRCb3ggPSB0aGlzLmNhbnZhc0h0bWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMubW9kZWwuZWRnZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5lZGdlcy5zb3VyY2VDb29yZCh2YWx1ZSk7XG4gICAgICBjb25zdCBlbmQgPSB0aGlzLmVkZ2VzLmRlc3RDb29yZCh2YWx1ZSk7XG4gICAgICBjb25zdCB4ID0gKHN0YXJ0LnggKyBlbmQueCkgLyAyICsgY2FudmFzRWxlbWVudEJveC5sZWZ0O1xuICAgICAgY29uc3QgeSA9IChzdGFydC55ICsgZW5kLnkpIC8gMiArIGNhbnZhc0VsZW1lbnRCb3gudG9wO1xuICAgICAgaWYgKHRoaXMuaW5SZWN0Qm94KHgsIHksIHJlY3RCb3gpKSB7XG4gICAgICAgIHRoaXMuZWRnZXMuc2VsZWN0KHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmVkZ2VzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5lZGdlcy5kZXNlbGVjdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBlZGdlc1RvRGVsZXRlID0gdGhpcy5lZGdlcy5nZXRTZWxlY3RlZEVkZ2VzKCk7XG4gICAgZWRnZXNUb0RlbGV0ZS5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgICB0aGlzLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICB9KTtcbiAgICBjb25zdCBub2Rlc1RvRGVsZXRlID0gdGhpcy5ub2Rlcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgbm9kZXNUb0RlbGV0ZS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICB0aGlzLm5vZGVzLmRlbGV0ZShub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VkaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyb3BUYXJnZXRJZCA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGlzRHJvcFNvdXJjZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wVGFyZ2V0SWQgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmFnSW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLmRyYWdJbWFnZSkge1xuICAgICAgdGhpcy5kcmFnSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuZHJhZ0ltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcnO1xuICAgICAgdGhpcy5kcmFnSW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kcmFnSW1hZ2U7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJDYWxsYmFja3MoZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlUmVtb3ZlZENhbGxiYWNrOiAobm9kZTogRmNOb2RlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCkge1xuICAgIHRoaXMuZWRnZUFkZGVkQ2FsbGJhY2sgPSBlZGdlQWRkZWRDYWxsYmFjaztcbiAgICB0aGlzLm5vZGVSZW1vdmVkQ2FsbGJhY2sgPSBub2RlUmVtb3ZlZENhbGxiYWNrO1xuICAgIHRoaXMuZWRnZVJlbW92ZWRDYWxsYmFjayA9IGVkZ2VSZW1vdmVkQ2FsbGJhY2s7XG4gIH1cblxufVxuXG5pbnRlcmZhY2UgSHRtbEVsZW1lbnRNYXAgeyBbaWQ6IHN0cmluZ106IEhUTUxFbGVtZW50OyB9XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0RmNNb2RlbDxUPiB7XG5cbiAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGVkKG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLnRvZ2dsZVNlbGVjdGVkT2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChvYmplY3Q6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuaXNTZWxlY3RlZE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdChvYmplY3Q6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuaXNFZGl0T2JqZWN0KG9iamVjdCk7XG4gIH1cbn1cblxuY2xhc3MgQ29ubmVjdG9yc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjQ29ubmVjdG9yPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvbm5lY3RvciB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbW9kZWwubm9kZXMpIHtcbiAgICAgIGZvciAoY29uc3QgY29ubmVjdG9yIG9mIG5vZGUuY29ubmVjdG9ycykge1xuICAgICAgICBpZiAoY29ubmVjdG9yLmlkID09PSBjb25uZWN0b3JJZCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVsZW1lbnQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9yc0h0bWxFbGVtZW50c1tjb25uZWN0b3JJZF07XG4gIH1cblxuICBwdWJsaWMgc2V0SHRtbEVsZW1lbnQoY29ubmVjdG9ySWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzSHRtbEVsZW1lbnRzW2Nvbm5lY3RvcklkXSA9IGVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29vcmRzKGNvbm5lY3RvcklkOiBzdHJpbmcsIGNlbnRlcmVkPzogYm9vbGVhbik6IEZjQ29vcmRzIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRIdG1sRWxlbWVudChjb25uZWN0b3JJZCk7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IGNhbnZhcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt4OiAwLCB5OiAwfTtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdG9yRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudEJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgY29vcmRzOiBGY0Nvb3JkcyA9IHtcbiAgICAgIHg6IGNvbm5lY3RvckVsZW1lbnRCb3gubGVmdCAtIGNhbnZhc0VsZW1lbnRCb3gubGVmdCxcbiAgICAgIHk6IGNvbm5lY3RvckVsZW1lbnRCb3gudG9wIC0gY2FudmFzRWxlbWVudEJveC50b3BcbiAgICB9O1xuICAgIGlmIChjZW50ZXJlZCkge1xuICAgICAgY29vcmRzID0ge1xuICAgICAgICB4OiBNYXRoLnJvdW5kKGNvb3Jkcy54ICsgZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpLFxuICAgICAgICB5OiBNYXRoLnJvdW5kKGNvb3Jkcy55ICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb29yZHMoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q29vcmRzKGNvbm5lY3RvcklkLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb29yZHMoY29ubmVjdG9ySWQsIHRydWUpO1xuICB9XG59XG5cbmNsYXNzIE5vZGVzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNOb2RlPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yc0J5VHlwZShub2RlOiBGY05vZGUsIHR5cGU6IHN0cmluZyk6IEFycmF5PEZjQ29ubmVjdG9yPiB7XG4gICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5maWx0ZXIoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rvci50eXBlID09PSB0eXBlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkQ29ubmVjdG9yKG5vZGU6IEZjTm9kZSwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIG5vZGUuY29ubmVjdG9ycy5wdXNoKGNvbm5lY3Rvcik7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU5vZGUobm9kZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG5vZGUuY29ubmVjdG9ycy5zcGxpY2Uobm9kZS5jb25uZWN0b3JzLmluZGV4T2YoY29ubmVjdG9yKSwgMSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKG5vZGU6IEZjTm9kZSkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3Qobm9kZSk7XG4gICAgfVxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgY29uc3QgaW5kZXggPSBtb2RlbC5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlbGV0ZSBub3QgZXhpc3Rpbmcgbm9kZScpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JJZHMgPSB0aGlzLmdldENvbm5lY3Rvcklkcyhub2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsLmVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlZGdlID0gbW9kZWwuZWRnZXNbaV07XG4gICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoZWRnZS5zb3VyY2UpICE9PSAtMSB8fCBjb25uZWN0b3JJZHMuaW5kZXhPZihlZGdlLmRlc3RpbmF0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIG1vZGVsLm5vZGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZVJlbW92ZWRDYWxsYmFjayhub2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZE5vZGVzKCk6IEFycmF5PEZjTm9kZT4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgcmV0dXJuIG1vZGVsLm5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmlzU2VsZWN0ZWQobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2tlZChub2RlOiBGY05vZGUsIGN0cmxLZXk/OiBib29sZWFuKSB7XG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLnRvZ2dsZVNlbGVjdGVkKG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuc2VsZWN0KG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGUobm9kZTogRmNOb2RlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICB0cnkge1xuICAgICAgbW9kZWwubm9kZXMucHVzaChub2RlKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU5vZGVzKG1vZGVsLm5vZGVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbW9kZWwubm9kZXMuc3BsaWNlKG1vZGVsLm5vZGVzLmluZGV4T2Yobm9kZSksIDEpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rvcklkcyhub2RlOiBGY05vZGUpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLm1hcCgoY29ubmVjdG9yKSA9PiB7XG4gICAgICByZXR1cm4gY29ubmVjdG9yLmlkO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5vZGVCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY05vZGUge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG1vZGVsLm5vZGVzKSB7XG4gICAgICBjb25zdCBjb25uZWN0b3JJZHMgPSB0aGlzLmdldENvbm5lY3Rvcklkcyhub2RlKTtcbiAgICAgIGlmIChjb25uZWN0b3JJZHMuaW5kZXhPZihjb25uZWN0b3JJZCkgPiAtMSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVsZW1lbnQobm9kZUlkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzSHRtbEVsZW1lbnRzW25vZGVJZF07XG4gIH1cblxuICBwdWJsaWMgc2V0SHRtbEVsZW1lbnQobm9kZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXNIdG1sRWxlbWVudHNbbm9kZUlkXSA9IGVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbn1cblxuY2xhc3MgRWRnZXNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY0VkZ2U+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkeShlZGdlOiBGY0VkZ2UpOiBib29sZWFuIHtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldEh0bWxFbGVtZW50KGVkZ2Uuc291cmNlKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0SHRtbEVsZW1lbnQoZWRnZS5kZXN0aW5hdGlvbik7XG4gICAgcmV0dXJuIHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIGRlc3RpbmF0aW9uICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQ29vcmQoZWRnZTogRmNFZGdlKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoZWRnZS5zb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGRlc3RDb29yZChlZGdlOiBGY0VkZ2UpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChlZGdlLmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoZWRnZTogRmNFZGdlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBjb25zdCBpbmRleCA9IG1vZGVsLmVkZ2VzLmluZGV4T2YoZWRnZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZWxldGUgbm90IGV4aXN0aW5nIGVkZ2UnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZChlZGdlKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdChlZGdlKTtcbiAgICB9XG4gICAgbW9kZWwuZWRnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlUmVtb3ZlZENhbGxiYWNrKGVkZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkRWRnZXMoKTogQXJyYXk8RmNFZGdlPiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICByZXR1cm4gbW9kZWwuZWRnZXMuZmlsdGVyKChlZGdlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaXNTZWxlY3RlZChlZGdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVFZGdlTW91c2VDbGljayhlZGdlOiBGY0VkZ2UsIGN0cmxLZXk/OiBib29sZWFuKSB7XG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnRvZ2dsZVNlbGVjdGVkKGVkZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc2VsZWN0KGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwdXRFZGdlKGVkZ2U6IEZjRWRnZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgbW9kZWwuZWRnZXMucHVzaChlZGdlKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBfYWRkRWRnZShldmVudDogRXZlbnQsIHNvdXJjZUNvbm5lY3RvcjogRmNDb25uZWN0b3IsIGRlc3RDb25uZWN0b3I6IEZjQ29ubmVjdG9yLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlQ29ubmVjdG9yKHNvdXJjZUNvbm5lY3Rvcik7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlQ29ubmVjdG9yKGRlc3RDb25uZWN0b3IpO1xuICAgIGNvbnN0IGVkZ2U6IEZjRWRnZSA9IHt9O1xuICAgIGVkZ2Uuc291cmNlID0gc291cmNlQ29ubmVjdG9yLmlkO1xuICAgIGVkZ2UuZGVzdGluYXRpb24gPSBkZXN0Q29ubmVjdG9yLmlkO1xuICAgIGVkZ2UubGFiZWwgPSBsYWJlbDtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKG1vZGVsLmVkZ2VzLmNvbmNhdChbZWRnZV0pLCBtb2RlbC5ub2Rlcyk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuY3JlYXRlRWRnZShldmVudCwgZWRnZSkuc3Vic2NyaWJlKFxuICAgICAgKGNyZWF0ZWQpID0+IHtcbiAgICAgICAgbW9kZWwuZWRnZXMucHVzaChjcmVhdGVkKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VBZGRlZENhbGxiYWNrKGNyZWF0ZWQpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==