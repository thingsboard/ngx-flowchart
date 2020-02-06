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
     * @param {?} detectChangesSubject
     * @param {?} selectedObjects
     * @param {?} dropNode
     * @param {?} createEdge
     * @param {?} edgeAddedCallback
     * @param {?} nodeRemovedCallback
     * @param {?} edgeRemovedCallback
     * @param {?} canvasHtmlElement
     * @param {?} svgHtmlElement
     */
    constructor(modelValidation, model, modelChanged, detectChangesSubject, selectedObjects, dropNode, createEdge, edgeAddedCallback, nodeRemovedCallback, edgeRemovedCallback, canvasHtmlElement, svgHtmlElement) {
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
            this.detectChangesSubject.next();
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbW9kZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUE0QnpCLFlBQVksZUFBeUMsRUFDekMsS0FBYyxFQUNkLFlBQStCLEVBQy9CLG9CQUFrQyxFQUNsQyxlQUFzQixFQUN0QixRQUE4QyxFQUM5QyxVQUE4RCxFQUM5RCxpQkFBeUMsRUFDekMsbUJBQTJDLEVBQzNDLG1CQUEyQyxFQUMzQyxpQkFBOEIsRUFDOUIsY0FBMEI7UUFoQ3RDLDJCQUFzQixHQUFtQixFQUFFLENBQUM7UUFDNUMsc0JBQWlCLEdBQW1CLEVBQUUsQ0FBQztRQUN2QyxzQkFBaUIsR0FBZ0IsSUFBSSxDQUFDO1FBQ3RDLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ25DLG1CQUFjLEdBQWUsSUFBSSxDQUFDO1FBV2pCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBbUI5QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsZUFB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QU8sQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFDRixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNDb29yZHMsIEZjRWRnZSwgRmNJdGVtSW5mbywgRmNNb2RlbCwgRmNOb2RlLCBGY1JlY3RCb3ggfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBGY01vZGVsU2VydmljZSB7XG5cbiAgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2U7XG4gIG1vZGVsOiBGY01vZGVsO1xuICBwcml2YXRlIHJlYWRvbmx5IGRldGVjdENoYW5nZXNTdWJqZWN0OiBTdWJqZWN0PGFueT47XG4gIHNlbGVjdGVkT2JqZWN0czogYW55W107XG5cbiAgY29ubmVjdG9yc0h0bWxFbGVtZW50czogSHRtbEVsZW1lbnRNYXAgPSB7fTtcbiAgbm9kZXNIdG1sRWxlbWVudHM6IEh0bWxFbGVtZW50TWFwID0ge307XG4gIGNhbnZhc0h0bWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIGRyYWdJbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG51bGw7XG4gIHN2Z0h0bWxFbGVtZW50OiBTVkdFbGVtZW50ID0gbnVsbDtcblxuICBkcm9wTm9kZTogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBjcmVhdGVFZGdlOiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPjtcbiAgZWRnZUFkZGVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIG5vZGVSZW1vdmVkQ2FsbGJhY2s6IChub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGVkZ2VSZW1vdmVkQ2FsbGJhY2s6IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG5cbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIHJlYWRvbmx5IGRlYm91bmNlciA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25uZWN0b3JzOiBDb25uZWN0b3JzTW9kZWw7XG4gIG5vZGVzOiBOb2Rlc01vZGVsO1xuICBlZGdlczogRWRnZXNNb2RlbDtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWw6IEZjTW9kZWwsXG4gICAgICAgICAgICAgIG1vZGVsQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4sXG4gICAgICAgICAgICAgIGRldGVjdENoYW5nZXNTdWJqZWN0OiBTdWJqZWN0PGFueT4sXG4gICAgICAgICAgICAgIHNlbGVjdGVkT2JqZWN0czogYW55W10sXG4gICAgICAgICAgICAgIGRyb3BOb2RlOiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGNyZWF0ZUVkZ2U6IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+LFxuICAgICAgICAgICAgICBlZGdlQWRkZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgbm9kZVJlbW92ZWRDYWxsYmFjazogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgZWRnZVJlbW92ZWRDYWxsYmFjazogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgY2FudmFzSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICBzdmdIdG1sRWxlbWVudDogU1ZHRWxlbWVudCkge1xuXG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24gPSBtb2RlbFZhbGlkYXRpb247XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMubW9kZWxDaGFuZ2VkID0gbW9kZWxDaGFuZ2VkO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3QgPSBkZXRlY3RDaGFuZ2VzU3ViamVjdDtcbiAgICB0aGlzLmNhbnZhc0h0bWxFbGVtZW50ID0gY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgdGhpcy5zdmdIdG1sRWxlbWVudCA9IHN2Z0h0bWxFbGVtZW50O1xuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlTW9kZWwodGhpcy5tb2RlbCk7XG4gICAgdGhpcy5zZWxlY3RlZE9iamVjdHMgPSBzZWxlY3RlZE9iamVjdHM7XG5cbiAgICB0aGlzLmRyb3BOb2RlID0gZHJvcE5vZGUgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLmNyZWF0ZUVkZ2UgPSBjcmVhdGVFZGdlIHx8ICgoZXZlbnQsIGVkZ2UpID0+IG9mKHsuLi5lZGdlLCBsYWJlbDogJ2xhYmVsJ30pKTtcbiAgICB0aGlzLmVkZ2VBZGRlZENhbGxiYWNrID0gZWRnZUFkZGVkQ2FsbGJhY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLm5vZGVSZW1vdmVkQ2FsbGJhY2sgPSBub2RlUmVtb3ZlZENhbGxiYWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy5lZGdlUmVtb3ZlZENhbGxiYWNrID0gZWRnZVJlbW92ZWRDYWxsYmFjayB8fCAoKCkgPT4ge30pO1xuXG4gICAgdGhpcy5jb25uZWN0b3JzID0gbmV3IENvbm5lY3RvcnNNb2RlbCh0aGlzKTtcbiAgICB0aGlzLm5vZGVzID0gbmV3IE5vZGVzTW9kZWwodGhpcyk7XG4gICAgdGhpcy5lZGdlcyA9IG5ldyBFZGdlc01vZGVsKHRoaXMpO1xuXG4gICAgdGhpcy5kZWJvdW5jZXJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgxMDApKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGVsQ2hhbmdlZC5lbWl0KCkpO1xuICB9XG5cbiAgcHVibGljIG5vdGlmeU1vZGVsQ2hhbmdlZCgpIHtcbiAgICB0aGlzLmRlYm91bmNlci5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3QubmV4dCgpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRWRpdGFibGUoKSkge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdE9iamVjdChvYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRWRpdGFibGUoKSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGVzZWxlY3QgYW4gdW5zZWxlY3RlZCBvYmplY3QnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGVkT2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZE9iamVjdChvYmplY3QpKSB7XG4gICAgICB0aGlzLmRlc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0T2JqZWN0KG9iamVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWRPYmplY3Qob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpICE9PSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlLnJlYWRvbmx5KSB7XG4gICAgICAgIHRoaXMubm9kZXMuc2VsZWN0KG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubW9kZWwuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgIHRoaXMuZWRnZXMuc2VsZWN0KGVkZ2UpO1xuICAgIH0pO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGRlc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkT2JqZWN0cy5sZW5ndGgpO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdE9iamVjdChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkT2JqZWN0cy5sZW5ndGggPT09IDEgJiZcbiAgICAgIHRoaXMuc2VsZWN0ZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSAhPT0gLTE7XG4gIH1cblxuICBwcml2YXRlIGluUmVjdEJveCh4OiBudW1iZXIsIHk6IG51bWJlciwgcmVjdEJveDogRmNSZWN0Qm94KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHggPj0gcmVjdEJveC5sZWZ0ICYmIHggPD0gcmVjdEJveC5yaWdodCAmJlxuICAgICAgeSA+PSByZWN0Qm94LnRvcCAmJiB5IDw9IHJlY3RCb3guYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGdldEl0ZW1JbmZvQXRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZjSXRlbUluZm8ge1xuICAgIHJldHVybiB7XG4gICAgICBub2RlOiB0aGlzLmdldE5vZGVBdFBvaW50KHgsIHkpLFxuICAgICAgZWRnZTogdGhpcy5nZXRFZGdlQXRQb2ludCh4LCB5KVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZUF0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY05vZGUge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLm1vZGVsLm5vZGVzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ub2Rlcy5nZXRIdG1sRWxlbWVudChub2RlLmlkKTtcbiAgICAgIGNvbnN0IG5vZGVFbGVtZW50Qm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICh4ID49IG5vZGVFbGVtZW50Qm94LmxlZnQgJiYgeCA8PSBub2RlRWxlbWVudEJveC5yaWdodFxuICAgICAgICAmJiB5ID49IG5vZGVFbGVtZW50Qm94LnRvcCAmJiB5IDw9IG5vZGVFbGVtZW50Qm94LmJvdHRvbSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWRnZUF0UG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBGY0VkZ2Uge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xuICAgIGNvbnN0IGlkID0gZWxlbWVudC5pZDtcbiAgICBsZXQgZWRnZUluZGV4ID0gLTE7XG4gICAgaWYgKGlkKSB7XG4gICAgICBpZiAoaWQuc3RhcnRzV2l0aCgnZmMtZWRnZS1wYXRoLScpKSB7XG4gICAgICAgIGVkZ2VJbmRleCA9IE51bWJlcihpZC5zdWJzdHJpbmcoJ2ZjLWVkZ2UtcGF0aC0nLmxlbmd0aCkpO1xuICAgICAgfSBlbHNlIGlmIChpZC5zdGFydHNXaXRoKCdmYy1lZGdlLWxhYmVsLScpKSB7XG4gICAgICAgIGVkZ2VJbmRleCA9IE51bWJlcihpZC5zdWJzdHJpbmcoJ2ZjLWVkZ2UtbGFiZWwtJy5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVkZ2VJbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbC5lZGdlc1tlZGdlSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGxJblJlY3QocmVjdEJveDogRmNSZWN0Qm94KSB7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubm9kZXMuZ2V0SHRtbEVsZW1lbnQodmFsdWUuaWQpO1xuICAgICAgY29uc3Qgbm9kZUVsZW1lbnRCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCF2YWx1ZS5yZWFkb25seSkge1xuICAgICAgICBjb25zdCB4ID0gbm9kZUVsZW1lbnRCb3gubGVmdCArIG5vZGVFbGVtZW50Qm94LndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgeSA9IG5vZGVFbGVtZW50Qm94LnRvcCArIG5vZGVFbGVtZW50Qm94LmhlaWdodCAvIDI7XG4gICAgICAgIGlmICh0aGlzLmluUmVjdEJveCh4LCB5LCByZWN0Qm94KSkge1xuICAgICAgICAgIHRoaXMubm9kZXMuc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5ub2Rlcy5pc1NlbGVjdGVkKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5kZXNlbGVjdCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudEJveCA9IHRoaXMuY2FudmFzSHRtbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5tb2RlbC5lZGdlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmVkZ2VzLnNvdXJjZUNvb3JkKHZhbHVlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHRoaXMuZWRnZXMuZGVzdENvb3JkKHZhbHVlKTtcbiAgICAgIGNvbnN0IHggPSAoc3RhcnQueCArIGVuZC54KSAvIDIgKyBjYW52YXNFbGVtZW50Qm94LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gKHN0YXJ0LnkgKyBlbmQueSkgLyAyICsgY2FudmFzRWxlbWVudEJveC50b3A7XG4gICAgICBpZiAodGhpcy5pblJlY3RCb3goeCwgeSwgcmVjdEJveCkpIHtcbiAgICAgICAgdGhpcy5lZGdlcy5zZWxlY3QodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZWRnZXMuaXNTZWxlY3RlZCh2YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLmVkZ2VzLmRlc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVNlbGVjdGVkKCkge1xuICAgIGNvbnN0IGVkZ2VzVG9EZWxldGUgPSB0aGlzLmVkZ2VzLmdldFNlbGVjdGVkRWRnZXMoKTtcbiAgICBlZGdlc1RvRGVsZXRlLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIHRoaXMuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgIH0pO1xuICAgIGNvbnN0IG5vZGVzVG9EZWxldGUgPSB0aGlzLm5vZGVzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICBub2Rlc1RvRGVsZXRlLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMubm9kZXMuZGVsZXRlKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldElkID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNEcm9wU291cmNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyb3BUYXJnZXRJZCAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldERyYWdJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuZHJhZ0ltYWdlKSB7XG4gICAgICB0aGlzLmRyYWdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5kcmFnSW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNyc7XG4gICAgICB0aGlzLmRyYWdJbWFnZS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRyYWdJbWFnZTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgSHRtbEVsZW1lbnRNYXAgeyBbaWQ6IHN0cmluZ106IEhUTUxFbGVtZW50OyB9XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0RmNNb2RlbDxUPiB7XG5cbiAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5zZWxlY3RPYmplY3Qob2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNlbGVjdChvYmplY3Q6IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGVkKG9iamVjdDogVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLnRvZ2dsZVNlbGVjdGVkT2JqZWN0KG9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChvYmplY3Q6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuaXNTZWxlY3RlZE9iamVjdChvYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGlzRWRpdChvYmplY3Q6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuaXNFZGl0T2JqZWN0KG9iamVjdCk7XG4gIH1cbn1cblxuY2xhc3MgQ29ubmVjdG9yc01vZGVsIGV4dGVuZHMgQWJzdHJhY3RGY01vZGVsPEZjQ29ubmVjdG9yPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY0Nvbm5lY3RvciB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbW9kZWwubm9kZXMpIHtcbiAgICAgIGZvciAoY29uc3QgY29ubmVjdG9yIG9mIG5vZGUuY29ubmVjdG9ycykge1xuICAgICAgICBpZiAoY29ubmVjdG9yLmlkID09PSBjb25uZWN0b3JJZCkge1xuICAgICAgICAgIHJldHVybiBjb25uZWN0b3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVsZW1lbnQoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9yc0h0bWxFbGVtZW50c1tjb25uZWN0b3JJZF07XG4gIH1cblxuICBwdWJsaWMgc2V0SHRtbEVsZW1lbnQoY29ubmVjdG9ySWQ6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzSHRtbEVsZW1lbnRzW2Nvbm5lY3RvcklkXSA9IGVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29vcmRzKGNvbm5lY3RvcklkOiBzdHJpbmcsIGNlbnRlcmVkPzogYm9vbGVhbik6IEZjQ29vcmRzIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRIdG1sRWxlbWVudChjb25uZWN0b3JJZCk7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IGNhbnZhcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt4OiAwLCB5OiAwfTtcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdG9yRWxlbWVudEJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudEJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgY29vcmRzOiBGY0Nvb3JkcyA9IHtcbiAgICAgIHg6IGNvbm5lY3RvckVsZW1lbnRCb3gubGVmdCAtIGNhbnZhc0VsZW1lbnRCb3gubGVmdCxcbiAgICAgIHk6IGNvbm5lY3RvckVsZW1lbnRCb3gudG9wIC0gY2FudmFzRWxlbWVudEJveC50b3BcbiAgICB9O1xuICAgIGlmIChjZW50ZXJlZCkge1xuICAgICAgY29vcmRzID0ge1xuICAgICAgICB4OiBNYXRoLnJvdW5kKGNvb3Jkcy54ICsgZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpLFxuICAgICAgICB5OiBNYXRoLnJvdW5kKGNvb3Jkcy55ICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb29yZHMoY29ubmVjdG9ySWQ6IHN0cmluZyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q29vcmRzKGNvbm5lY3RvcklkLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3JJZDogc3RyaW5nKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLl9nZXRDb29yZHMoY29ubmVjdG9ySWQsIHRydWUpO1xuICB9XG59XG5cbmNsYXNzIE5vZGVzTW9kZWwgZXh0ZW5kcyBBYnN0cmFjdEZjTW9kZWw8RmNOb2RlPiB7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSkge1xuICAgIHN1cGVyKG1vZGVsU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29ubmVjdG9yc0J5VHlwZShub2RlOiBGY05vZGUsIHR5cGU6IHN0cmluZyk6IEFycmF5PEZjQ29ubmVjdG9yPiB7XG4gICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5maWx0ZXIoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rvci50eXBlID09PSB0eXBlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkQ29ubmVjdG9yKG5vZGU6IEZjTm9kZSwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIG5vZGUuY29ubmVjdG9ycy5wdXNoKGNvbm5lY3Rvcik7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU5vZGUobm9kZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG5vZGUuY29ubmVjdG9ycy5zcGxpY2Uobm9kZS5jb25uZWN0b3JzLmluZGV4T2YoY29ubmVjdG9yKSwgMSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKG5vZGU6IEZjTm9kZSkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3Qobm9kZSk7XG4gICAgfVxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgY29uc3QgaW5kZXggPSBtb2RlbC5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlbGV0ZSBub3QgZXhpc3Rpbmcgbm9kZScpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JJZHMgPSB0aGlzLmdldENvbm5lY3Rvcklkcyhub2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsLmVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlZGdlID0gbW9kZWwuZWRnZXNbaV07XG4gICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoZWRnZS5zb3VyY2UpICE9PSAtMSB8fCBjb25uZWN0b3JJZHMuaW5kZXhPZihlZGdlLmRlc3RpbmF0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIG1vZGVsLm5vZGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZVJlbW92ZWRDYWxsYmFjayhub2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTZWxlY3RlZE5vZGVzKCk6IEFycmF5PEZjTm9kZT4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgcmV0dXJuIG1vZGVsLm5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmlzU2VsZWN0ZWQobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2xpY2tlZChub2RlOiBGY05vZGUsIGN0cmxLZXk/OiBib29sZWFuKSB7XG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLnRvZ2dsZVNlbGVjdGVkKG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuc2VsZWN0KG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGUobm9kZTogRmNOb2RlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICB0cnkge1xuICAgICAgbW9kZWwubm9kZXMucHVzaChub2RlKTtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZU5vZGVzKG1vZGVsLm5vZGVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbW9kZWwubm9kZXMuc3BsaWNlKG1vZGVsLm5vZGVzLmluZGV4T2Yobm9kZSksIDEpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvbm5lY3Rvcklkcyhub2RlOiBGY05vZGUpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLm1hcCgoY29ubmVjdG9yKSA9PiB7XG4gICAgICByZXR1cm4gY29ubmVjdG9yLmlkO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldE5vZGVCeUNvbm5lY3RvcklkKGNvbm5lY3RvcklkOiBzdHJpbmcpOiBGY05vZGUge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG1vZGVsLm5vZGVzKSB7XG4gICAgICBjb25zdCBjb25uZWN0b3JJZHMgPSB0aGlzLmdldENvbm5lY3Rvcklkcyhub2RlKTtcbiAgICAgIGlmIChjb25uZWN0b3JJZHMuaW5kZXhPZihjb25uZWN0b3JJZCkgPiAtMSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0SHRtbEVsZW1lbnQobm9kZUlkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzSHRtbEVsZW1lbnRzW25vZGVJZF07XG4gIH1cblxuICBwdWJsaWMgc2V0SHRtbEVsZW1lbnQobm9kZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXNIdG1sRWxlbWVudHNbbm9kZUlkXSA9IGVsZW1lbnQ7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbn1cblxuY2xhc3MgRWRnZXNNb2RlbCBleHRlbmRzIEFic3RyYWN0RmNNb2RlbDxGY0VkZ2U+IHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlKSB7XG4gICAgc3VwZXIobW9kZWxTZXJ2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkeShlZGdlOiBGY0VkZ2UpOiBib29sZWFuIHtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldEh0bWxFbGVtZW50KGVkZ2Uuc291cmNlKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0SHRtbEVsZW1lbnQoZWRnZS5kZXN0aW5hdGlvbik7XG4gICAgcmV0dXJuIHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIGRlc3RpbmF0aW9uICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc291cmNlQ29vcmQoZWRnZTogRmNFZGdlKTogRmNDb29yZHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoZWRnZS5zb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIGRlc3RDb29yZChlZGdlOiBGY0VkZ2UpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChlZGdlLmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoZWRnZTogRmNFZGdlKSB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICBjb25zdCBpbmRleCA9IG1vZGVsLmVkZ2VzLmluZGV4T2YoZWRnZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZWxldGUgbm90IGV4aXN0aW5nIGVkZ2UnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZChlZGdlKSkge1xuICAgICAgdGhpcy5kZXNlbGVjdChlZGdlKTtcbiAgICB9XG4gICAgbW9kZWwuZWRnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlUmVtb3ZlZENhbGxiYWNrKGVkZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkRWRnZXMoKTogQXJyYXk8RmNFZGdlPiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsU2VydmljZS5tb2RlbDtcbiAgICByZXR1cm4gbW9kZWwuZWRnZXMuZmlsdGVyKChlZGdlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaXNTZWxlY3RlZChlZGdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVFZGdlTW91c2VDbGljayhlZGdlOiBGY0VkZ2UsIGN0cmxLZXk/OiBib29sZWFuKSB7XG4gICAgaWYgKGN0cmxLZXkpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnRvZ2dsZVNlbGVjdGVkKGVkZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kZXNlbGVjdEFsbCgpO1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc2VsZWN0KGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwdXRFZGdlKGVkZ2U6IEZjRWRnZSkge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbFNlcnZpY2UubW9kZWw7XG4gICAgbW9kZWwuZWRnZXMucHVzaChlZGdlKTtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBfYWRkRWRnZShldmVudDogRXZlbnQsIHNvdXJjZUNvbm5lY3RvcjogRmNDb25uZWN0b3IsIGRlc3RDb25uZWN0b3I6IEZjQ29ubmVjdG9yLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlQ29ubmVjdG9yKHNvdXJjZUNvbm5lY3Rvcik7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlQ29ubmVjdG9yKGRlc3RDb25uZWN0b3IpO1xuICAgIGNvbnN0IGVkZ2U6IEZjRWRnZSA9IHt9O1xuICAgIGVkZ2Uuc291cmNlID0gc291cmNlQ29ubmVjdG9yLmlkO1xuICAgIGVkZ2UuZGVzdGluYXRpb24gPSBkZXN0Q29ubmVjdG9yLmlkO1xuICAgIGVkZ2UubGFiZWwgPSBsYWJlbDtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKG1vZGVsLmVkZ2VzLmNvbmNhdChbZWRnZV0pLCBtb2RlbC5ub2Rlcyk7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuY3JlYXRlRWRnZShldmVudCwgZWRnZSkuc3Vic2NyaWJlKFxuICAgICAgKGNyZWF0ZWQpID0+IHtcbiAgICAgICAgbW9kZWwuZWRnZXMucHVzaChjcmVhdGVkKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VBZGRlZENhbGxiYWNrKGNyZWF0ZWQpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==