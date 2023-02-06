import { FcModelValidationService } from './modelvalidation.service';
import { FcConnector, FcConnectorRectInfo, FcCoords, FcEdge, FcItemInfo, FcModel, FcNode, FcRectBox } from './ngx-flowchart.models';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
interface HtmlElementMap {
    [id: string]: HTMLElement;
}
interface ConnectorRectInfoMap {
    [id: string]: FcConnectorRectInfo;
}
declare abstract class AbstractFcModel<T> {
    modelService: FcModelService;
    protected constructor(modelService: FcModelService);
    select(object: T): void;
    deselect(object: T): void;
    toggleSelected(object: T): void;
    isSelected(object: T): boolean;
    isEdit(object: T): boolean;
}
declare class ConnectorsModel extends AbstractFcModel<FcConnector> {
    constructor(modelService: FcModelService);
    getConnector(connectorId: string): FcConnector;
    getConnectorRectInfo(connectorId: string): FcConnectorRectInfo;
    setConnectorRectInfo(connectorId: string, connectorRectInfo: FcConnectorRectInfo): void;
    private _getCoords;
    getCoords(connectorId: string): FcCoords;
    getCenteredCoord(connectorId: string): FcCoords;
}
declare class NodesModel extends AbstractFcModel<FcNode> {
    constructor(modelService: FcModelService);
    getConnectorsByType(node: FcNode, type: string): Array<FcConnector>;
    private _addConnector;
    delete(node: FcNode): void;
    getSelectedNodes(): Array<FcNode>;
    handleClicked(node: FcNode, ctrlKey?: boolean): void;
    private _addNode;
    getConnectorIds(node: FcNode): Array<string>;
    getNodeByConnectorId(connectorId: string): FcNode;
    getHtmlElement(nodeId: string): HTMLElement;
    setHtmlElement(nodeId: string, element: HTMLElement): void;
}
declare class EdgesModel extends AbstractFcModel<FcEdge> {
    constructor(modelService: FcModelService);
    sourceCoord(edge: FcEdge): FcCoords;
    destCoord(edge: FcEdge): FcCoords;
    delete(edge: FcEdge): void;
    getSelectedEdges(): Array<FcEdge>;
    handleEdgeMouseClick(edge: FcEdge, ctrlKey?: boolean): void;
    putEdge(edge: FcEdge): void;
    _addEdge(event: Event, sourceConnector: FcConnector, destConnector: FcConnector, label: string): void;
}
export declare class FcModelService {
    modelValidation: FcModelValidationService;
    model: FcModel;
    private readonly detectChangesSubject;
    selectedObjects: any[];
    connectorsRectInfos: ConnectorRectInfoMap;
    nodesHtmlElements: HtmlElementMap;
    canvasHtmlElement: HTMLElement;
    dragImage: HTMLImageElement;
    svgHtmlElement: SVGElement;
    dropNode: (event: Event, node: FcNode) => void;
    createEdge: (event: Event, edge: FcEdge) => Observable<FcEdge>;
    edgeAddedCallback: (edge: FcEdge) => void;
    nodeRemovedCallback: (node: FcNode) => void;
    edgeRemovedCallback: (edge: FcEdge) => void;
    dropTargetId: string;
    private readonly modelChanged;
    private readonly debouncer;
    connectors: ConnectorsModel;
    nodes: NodesModel;
    edges: EdgesModel;
    constructor(modelValidation: FcModelValidationService, model: FcModel, modelChanged: EventEmitter<any>, detectChangesSubject: Subject<any>, selectedObjects: any[], dropNode: (event: Event, node: FcNode) => void, createEdge: (event: Event, edge: FcEdge) => Observable<FcEdge>, edgeAddedCallback: (edge: FcEdge) => void, nodeRemovedCallback: (node: FcNode) => void, edgeRemovedCallback: (edge: FcEdge) => void, canvasHtmlElement: HTMLElement, svgHtmlElement: SVGElement);
    notifyModelChanged(): void;
    detectChanges(): void;
    selectObject(object: any): void;
    deselectObject(object: any): void;
    toggleSelectedObject(object: any): void;
    isSelectedObject(object: any): boolean;
    selectAll(): void;
    deselectAll(): void;
    isEditObject(object: any): boolean;
    private inRectBox;
    getItemInfoAtPoint(x: number, y: number): FcItemInfo;
    getNodeAtPoint(x: number, y: number): FcNode;
    getEdgeAtPoint(x: number, y: number): FcEdge;
    selectAllInRect(rectBox: FcRectBox): void;
    deleteSelected(): void;
    isEditable(): boolean;
    isDropSource(): boolean;
    getDragImage(): HTMLImageElement;
}
export {};
