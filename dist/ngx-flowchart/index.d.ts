import * as i0 from '@angular/core';
import { EventEmitter, OnInit, AfterViewInit, OnChanges, ViewContainerRef, ElementRef, ComponentFactoryResolver, SimpleChanges, InjectionToken, Type, DoCheck, IterableDiffers, ChangeDetectorRef, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as i6 from '@angular/common';

declare class FcModelValidationService {
    validateModel(model: FcModel): FcModel;
    validateNodes(nodes: Array<FcNode>): Array<FcNode>;
    validateNode(node: FcNode): FcNode;
    private _validateEdges;
    validateEdges(edges: Array<FcEdge>, nodes: Array<FcNode>): Array<FcEdge>;
    private _validateEdge;
    validateEdge(edge: FcEdge, nodes: Array<FcNode>): FcEdge;
    validateConnector(connector: FcConnector): FcConnector;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcModelValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FcModelValidationService>;
}

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
declare class FcModelService {
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

declare class FcNodeContainerComponent implements OnInit, AfterViewInit, OnChanges {
    private nodeComponentConfig;
    private elementRef;
    private componentFactoryResolver;
    callbacks: FcCallbacks;
    userNodeCallbacks: UserNodeCallbacks;
    node: FcNode;
    selected: boolean;
    edit: boolean;
    underMouse: boolean;
    mouseOverConnector: FcConnector;
    modelservice: FcModelService;
    dragging: boolean;
    get nodeId(): string;
    get top(): string;
    get left(): string;
    nodeComponent: FcNodeComponent;
    nodeContentContainer: ViewContainerRef;
    constructor(nodeComponentConfig: FcNodeComponentConfig, elementRef: ElementRef<HTMLElement>, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private updateNodeClass;
    private updateNodeComponent;
    private toggleClass;
    mousedown(event: MouseEvent): void;
    dragstart(event: Event | any): void;
    dragend(event: Event | any): void;
    click(event: MouseEvent): void;
    mouseover(event: MouseEvent): void;
    mouseout(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcNodeContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FcNodeContainerComponent, "fc-node", never, { "callbacks": { "alias": "callbacks"; "required": false; }; "userNodeCallbacks": { "alias": "userNodeCallbacks"; "required": false; }; "node": { "alias": "node"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "edit": { "alias": "edit"; "required": false; }; "underMouse": { "alias": "underMouse"; "required": false; }; "mouseOverConnector": { "alias": "mouseOverConnector"; "required": false; }; "modelservice": { "alias": "modelservice"; "required": false; }; "dragging": { "alias": "dragging"; "required": false; }; }, {}, never, never, false, never>;
}
declare abstract class FcNodeComponent implements OnInit {
    callbacks: FcCallbacks;
    userNodeCallbacks: UserNodeCallbacks;
    node: FcNode;
    selected: boolean;
    edit: boolean;
    underMouse: boolean;
    mouseOverConnector: FcConnector;
    modelservice: FcModelService;
    dragging: boolean;
    flowchartConstants: {
        htmlPrefix: string;
        leftConnectorType: string;
        rightConnectorType: string;
        curvedStyle: string;
        lineStyle: string;
        dragAnimationRepaint: string;
        dragAnimationShadow: string;
        canvasClass: string;
        selectedClass: string;
        editClass: string;
        activeClass: string;
        hoverClass: string;
        draggingClass: string;
        edgeClass: string;
        edgeLabelClass: string;
        connectorClass: string;
        magnetClass: string;
        nodeClass: string;
        nodeOverlayClass: string;
        leftConnectorClass: string;
        rightConnectorClass: string;
        canvasResizeThreshold: number;
        canvasResizeStep: number;
    };
    width: number;
    height: number;
    nodeRectInfo: FcNodeRectInfo;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcNodeComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FcNodeComponent, never, never, { "callbacks": { "alias": "callbacks"; "required": false; }; "userNodeCallbacks": { "alias": "userNodeCallbacks"; "required": false; }; "node": { "alias": "node"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "edit": { "alias": "edit"; "required": false; }; "underMouse": { "alias": "underMouse"; "required": false; }; "mouseOverConnector": { "alias": "mouseOverConnector"; "required": false; }; "modelservice": { "alias": "modelservice"; "required": false; }; "dragging": { "alias": "dragging"; "required": false; }; }, {}, never, never, true, never>;
}

declare const FC_NODE_COMPONENT_CONFIG: InjectionToken<FcNodeComponentConfig>;
interface FcNodeComponentConfig {
    nodeComponentType: Type<FcNodeComponent>;
}
declare const FlowchartConstants: {
    htmlPrefix: string;
    leftConnectorType: string;
    rightConnectorType: string;
    curvedStyle: string;
    lineStyle: string;
    dragAnimationRepaint: string;
    dragAnimationShadow: string;
    canvasClass: string;
    selectedClass: string;
    editClass: string;
    activeClass: string;
    hoverClass: string;
    draggingClass: string;
    edgeClass: string;
    edgeLabelClass: string;
    connectorClass: string;
    magnetClass: string;
    nodeClass: string;
    nodeOverlayClass: string;
    leftConnectorClass: string;
    rightConnectorClass: string;
    canvasResizeThreshold: number;
    canvasResizeStep: number;
};
interface FcCoords {
    x?: number;
    y?: number;
}
interface FcRectBox {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
interface FcConnector {
    id: string;
    type: string;
}
interface FcNode extends FcCoords {
    id: string;
    name: string;
    connectors: Array<FcConnector>;
    readonly?: boolean;
    [key: string]: any;
}
interface FcNodeRectInfo {
    width(): number;
    height(): number;
    top(): number;
    left(): number;
    right(): number;
    bottom(): number;
}
interface FcConnectorRectInfo {
    type: string;
    width: number;
    height: number;
    nodeRectInfo: FcNodeRectInfo;
}
interface FcEdge {
    label?: string;
    source?: string;
    destination?: string;
    active?: boolean;
}
interface FcItemInfo {
    node?: FcNode;
    edge?: FcEdge;
}
interface FcModel {
    nodes: Array<FcNode>;
    edges: Array<FcEdge>;
}
interface UserCallbacks {
    dropNode?: (event: Event, node: FcNode) => void;
    createEdge?: (event: Event, edge: FcEdge) => Observable<FcEdge>;
    edgeAdded?: (edge: FcEdge) => void;
    nodeRemoved?: (node: FcNode) => void;
    edgeRemoved?: (edge: FcEdge) => void;
    edgeDoubleClick?: (event: MouseEvent, edge: FcEdge) => void;
    edgeMouseOver?: (event: MouseEvent, edge: FcEdge) => void;
    isValidEdge?: (source: FcConnector, destination: FcConnector) => boolean;
    edgeEdit?: (event: Event, edge: FcEdge) => void;
    nodeCallbacks?: UserNodeCallbacks;
}
interface UserNodeCallbacks {
    nodeEdit?: (event: MouseEvent, node: FcNode) => void;
    doubleClick?: (event: MouseEvent, node: FcNode) => void;
    mouseDown?: (event: MouseEvent, node: FcNode) => void;
    mouseEnter?: (event: MouseEvent, node: FcNode) => void;
    mouseLeave?: (event: MouseEvent, node: FcNode) => void;
}
interface FcCallbacks {
    nodeDragstart: (event: Event | any, node: FcNode) => void;
    nodeDragend: (event: Event | any) => void;
    edgeDragstart: (event: Event | any, connector: FcConnector) => void;
    edgeDragend: (event: Event | any) => void;
    edgeDrop: (event: Event | any, targetConnector: FcConnector) => boolean;
    edgeDragoverConnector: (event: Event | any, connector: FcConnector) => boolean;
    edgeDragoverMagnet: (event: Event | any, connector: FcConnector) => boolean;
    edgeDragleaveMagnet: (event: Event | any) => void;
    nodeMouseOver: (event: MouseEvent, node: FcNode) => void;
    nodeMouseOut: (event: MouseEvent, node: FcNode) => void;
    connectorMouseEnter: (event: MouseEvent, connector: FcConnector) => void;
    connectorMouseLeave: (event: MouseEvent, connector: FcConnector) => void;
    nodeClicked: (event: MouseEvent, node: FcNode) => void;
}
interface FcAdjacentList {
    [id: string]: {
        incoming: number;
        outgoing: Array<string>;
    };
}
declare class BaseError {
    constructor(...args: unknown[]);
}
declare class ModelvalidationError extends BaseError {
    message: string;
    constructor(message: string);
}
declare const fcTopSort: (graph: FcModel) => Array<string> | null;

declare class FcNodeDraggingService {
    nodeDraggingScope: NodeDraggingScope;
    private dragOffsets;
    private draggedElements;
    private destinationHtmlElements;
    private oldDisplayStyles;
    private readonly modelService;
    private readonly automaticResize;
    private readonly dragAnimation;
    private readonly applyFunction;
    constructor(modelService: FcModelService, applyFunction: <T>(fn: (...args: any[]) => T) => T, automaticResize: boolean, dragAnimation: string);
    private getCoordinate;
    private getXCoordinate;
    private getYCoordinate;
    private resizeCanvas;
    isDraggingNode(node: FcNode): boolean;
    dragstart(event: Event | any, node: FcNode): void;
    drop(event: Event | any): boolean;
    dragover(event: Event | any): boolean;
    dragend(event: Event | any): void;
}
interface NodeDraggingScope {
    draggedNodes: Array<FcNode>;
    shadowElements: Array<JQuery<HTMLElement>>;
    shadowDragStarted: boolean;
    dropElement: HTMLElement;
}

declare class FcEdgeDrawingService {
    getEdgeDAttribute(pt1: FcCoords, pt2: FcCoords, style: string): string;
    getEdgeCenter(pt1: FcCoords, pt2: FcCoords): FcCoords;
    private computeEdgeTangentOffset;
    private computeEdgeSourceTangent;
    private computeEdgeDestinationTangent;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcEdgeDrawingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FcEdgeDrawingService>;
}

declare class FcEdgeDraggingService {
    edgeDragging: EdgeDragging;
    private draggedEdgeSource;
    private dragOffset;
    private destinationHtmlElement;
    private oldDisplayStyle;
    private readonly modelValidation;
    private readonly edgeDrawingService;
    private readonly modelService;
    private readonly model;
    private readonly isValidEdgeCallback;
    private readonly applyFunction;
    private readonly dragAnimation;
    private readonly edgeStyle;
    constructor(modelValidation: FcModelValidationService, edgeDrawingService: FcEdgeDrawingService, modelService: FcModelService, model: FcModel, isValidEdgeCallback: (source: FcConnector, destination: FcConnector) => boolean, applyFunction: <T>(fn: (...args: any[]) => T) => T, dragAnimation: string, edgeStyle: string);
    dragstart(event: Event | any, connector: FcConnector): void;
    dragover(event: Event | any): void;
    dragoverConnector(event: Event | any, connector: FcConnector): boolean;
    dragleaveMagnet(_event: Event | any): void;
    dragoverMagnet(event: Event | any, connector: FcConnector): boolean;
    dragend(event: Event | any): void;
    drop(event: Event | any, targetConnector: FcConnector): boolean;
}
interface EdgeDragging {
    isDragging: boolean;
    shadowDragStarted: boolean;
    dragPoint1: FcCoords;
    dragPoint2: FcCoords;
    dragLabel?: string;
    prevEdge?: FcEdge;
    magnetActive?: boolean;
    gElement?: JQuery<Element>;
    pathElement?: JQuery<Element>;
    circleElement?: JQuery<Element>;
}

declare class FcMouseOverService {
    mouseoverscope: MouseOverScope;
    private readonly applyFunction;
    constructor(applyFunction: <T>(fn: (...args: any[]) => T) => T);
    nodeMouseOver(_event: MouseEvent, node: FcNode): void;
    nodeMouseOut(_event: MouseEvent, _node: FcNode): void;
    connectorMouseEnter(_event: MouseEvent, connector: FcConnector): void;
    connectorMouseLeave(_event: MouseEvent, _connector: FcConnector): void;
    edgeMouseEnter(_event: MouseEvent, edge: FcEdge): void;
    edgeMouseLeave(_event: MouseEvent, _edge: FcEdge): void;
}
interface MouseOverScope {
    connector: FcConnector;
    edge: FcEdge;
    node: FcNode;
}

declare class FcRectangleSelectService {
    private readonly selectRect;
    private readonly modelService;
    private readonly selectElement;
    private readonly $canvasElement;
    private readonly $scrollParent;
    private readonly applyFunction;
    constructor(modelService: FcModelService, selectElement: HTMLElement, applyFunction: <T>(fn: (...args: any[]) => T) => T);
    mousedown(e: MouseEvent): void;
    mousemove(e: MouseEvent): void;
    private updateScroll;
    mouseup(e: MouseEvent): void;
    private updateSelectRect;
    private selectObjects;
}

declare class NgxFlowchartComponent implements OnInit, DoCheck {
    private elementRef;
    private differs;
    private modelValidation;
    edgeDrawingService: FcEdgeDrawingService;
    private cd;
    private zone;
    get canvasClass(): string;
    model: FcModel;
    selectedObjects: any[];
    edgeStyle: string;
    userCallbacks: UserCallbacks;
    automaticResize: boolean;
    dragAnimation: string;
    nodeWidth: number;
    nodeHeight: number;
    dropTargetId: string;
    modelChanged: EventEmitter<any>;
    private fitModelSizeByDefaultValue;
    get fitModelSizeByDefault(): boolean;
    set fitModelSizeByDefault(value: boolean);
    callbacks: FcCallbacks;
    userNodeCallbacks: UserNodeCallbacks;
    modelService: FcModelService;
    nodeDraggingService: FcNodeDraggingService;
    edgeDraggingService: FcEdgeDraggingService;
    mouseoverService: FcMouseOverService;
    rectangleSelectService: FcRectangleSelectService;
    arrowDefId: string;
    arrowDefIdSelected: string;
    flowchartConstants: {
        htmlPrefix: string;
        leftConnectorType: string;
        rightConnectorType: string;
        curvedStyle: string;
        lineStyle: string;
        dragAnimationRepaint: string;
        dragAnimationShadow: string;
        canvasClass: string;
        selectedClass: string;
        editClass: string;
        activeClass: string;
        hoverClass: string;
        draggingClass: string;
        edgeClass: string;
        edgeLabelClass: string;
        connectorClass: string;
        magnetClass: string;
        nodeClass: string;
        nodeOverlayClass: string;
        leftConnectorClass: string;
        rightConnectorClass: string;
        canvasResizeThreshold: number;
        canvasResizeStep: number;
    };
    private nodesDiffer;
    private edgesDiffer;
    private readonly detectChangesSubject;
    constructor(elementRef: ElementRef<HTMLElement>, differs: IterableDiffers, modelValidation: FcModelValidationService, edgeDrawingService: FcEdgeDrawingService, cd: ChangeDetectorRef, zone: NgZone);
    ngOnInit(): void;
    ngDoCheck(): void;
    getEdgeDAttribute(edge: FcEdge): string;
    adjustCanvasSize(fit?: boolean): void;
    canvasClick(_event: MouseEvent): void;
    edgeMouseDown(event: MouseEvent, _edge: FcEdge): void;
    edgeClick(event: MouseEvent, edge: FcEdge): void;
    edgeRemove(event: Event, edge: FcEdge): void;
    edgeEdit(event: Event, edge: FcEdge): void;
    edgeDoubleClick(event: MouseEvent, edge: FcEdge): void;
    edgeMouseOver(event: MouseEvent, edge: FcEdge): void;
    edgeMouseEnter(event: MouseEvent, edge: FcEdge): void;
    edgeMouseLeave(event: MouseEvent, edge: FcEdge): void;
    dragover(event: Event | any): void;
    drop(event: Event | any): void;
    mousedown(event: MouseEvent): void;
    mousemove(event: MouseEvent): void;
    mouseup(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxFlowchartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxFlowchartComponent, "fc-canvas", never, { "model": { "alias": "model"; "required": false; }; "selectedObjects": { "alias": "selectedObjects"; "required": false; }; "edgeStyle": { "alias": "edgeStyle"; "required": false; }; "userCallbacks": { "alias": "userCallbacks"; "required": false; }; "automaticResize": { "alias": "automaticResize"; "required": false; }; "dragAnimation": { "alias": "dragAnimation"; "required": false; }; "nodeWidth": { "alias": "nodeWidth"; "required": false; }; "nodeHeight": { "alias": "nodeHeight"; "required": false; }; "dropTargetId": { "alias": "dropTargetId"; "required": false; }; "fitModelSizeByDefault": { "alias": "fitModelSizeByDefault"; "required": false; }; }, { "modelChanged": "modelChanged"; }, never, never, false, never>;
}

declare class FcMagnetDirective implements OnInit {
    elementRef: ElementRef<HTMLElement>;
    callbacks: FcCallbacks;
    connector: FcConnector;
    constructor(elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    dragover(event: Event | any): boolean;
    dragleave(event: Event | any): void;
    drop(event: Event | any): boolean;
    dragend(event: Event | any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcMagnetDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FcMagnetDirective, "[fc-magnet]", never, { "callbacks": { "alias": "callbacks"; "required": false; }; "connector": { "alias": "connector"; "required": false; }; }, {}, never, never, false, never>;
}

declare class FcConnectorDirective implements OnInit, OnChanges {
    elementRef: ElementRef<HTMLElement>;
    callbacks: FcCallbacks;
    modelservice: FcModelService;
    connector: FcConnector;
    nodeRectInfo: FcNodeRectInfo;
    mouseOverConnector: FcConnector;
    constructor(elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private updateConnectorClass;
    dragover(_event: Event | any): void;
    drop(event: Event | any): boolean;
    dragend(event: Event | any): void;
    dragstart(event: Event | any): void;
    mouseenter(event: MouseEvent): void;
    mouseleave(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcConnectorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FcConnectorDirective, "[fc-connector]", never, { "callbacks": { "alias": "callbacks"; "required": false; }; "modelservice": { "alias": "modelservice"; "required": false; }; "connector": { "alias": "connector"; "required": false; }; "nodeRectInfo": { "alias": "nodeRectInfo"; "required": false; }; "mouseOverConnector": { "alias": "mouseOverConnector"; "required": false; }; }, {}, never, never, false, never>;
}

declare class DefaultFcNodeComponent extends FcNodeComponent {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultFcNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DefaultFcNodeComponent, "fc-default-node", never, {}, {}, never, never, false, never>;
}

declare class NgxFlowchartModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxFlowchartModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxFlowchartModule, [typeof NgxFlowchartComponent, typeof FcMagnetDirective, typeof FcConnectorDirective, typeof FcNodeContainerComponent, typeof DefaultFcNodeComponent], [typeof i6.CommonModule], [typeof NgxFlowchartComponent, typeof FcMagnetDirective, typeof FcConnectorDirective, typeof DefaultFcNodeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxFlowchartModule>;
}

export { DefaultFcNodeComponent, FC_NODE_COMPONENT_CONFIG, FcConnectorDirective, FcMagnetDirective, FcNodeComponent, FlowchartConstants, ModelvalidationError, NgxFlowchartComponent, NgxFlowchartModule, fcTopSort };
export type { FcAdjacentList, FcCallbacks, FcConnector, FcConnectorRectInfo, FcCoords, FcEdge, FcItemInfo, FcModel, FcNode, FcNodeComponentConfig, FcNodeRectInfo, FcRectBox, UserCallbacks, UserNodeCallbacks };
