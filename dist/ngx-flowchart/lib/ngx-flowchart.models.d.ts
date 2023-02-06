import { Observable } from 'rxjs';
import { InjectionToken, Type } from '@angular/core';
import { FcNodeComponent } from './node.component';
export declare const FC_NODE_COMPONENT_CONFIG: InjectionToken<FcNodeComponentConfig>;
export interface FcNodeComponentConfig {
    nodeComponentType: Type<FcNodeComponent>;
}
export declare const FlowchartConstants: {
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
export interface FcCoords {
    x?: number;
    y?: number;
}
export interface FcRectBox {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export interface FcConnector {
    id: string;
    type: string;
}
export interface FcNode extends FcCoords {
    id: string;
    name: string;
    connectors: Array<FcConnector>;
    readonly?: boolean;
    [key: string]: any;
}
export interface FcNodeRectInfo {
    width(): number;
    height(): number;
    top(): number;
    left(): number;
    right(): number;
    bottom(): number;
}
export interface FcConnectorRectInfo {
    type: string;
    width: number;
    height: number;
    nodeRectInfo: FcNodeRectInfo;
}
export interface FcEdge {
    label?: string;
    source?: string;
    destination?: string;
    active?: boolean;
}
export interface FcItemInfo {
    node?: FcNode;
    edge?: FcEdge;
}
export interface FcModel {
    nodes: Array<FcNode>;
    edges: Array<FcEdge>;
}
export interface UserCallbacks {
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
export interface UserNodeCallbacks {
    nodeEdit?: (event: MouseEvent, node: FcNode) => void;
    doubleClick?: (event: MouseEvent, node: FcNode) => void;
    mouseDown?: (event: MouseEvent, node: FcNode) => void;
    mouseEnter?: (event: MouseEvent, node: FcNode) => void;
    mouseLeave?: (event: MouseEvent, node: FcNode) => void;
}
export interface FcCallbacks {
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
export interface FcAdjacentList {
    [id: string]: {
        incoming: number;
        outgoing: Array<string>;
    };
}
declare class BaseError {
    constructor();
}
export declare class ModelvalidationError extends BaseError {
    message: string;
    constructor(message: string);
}
export declare const fcTopSort: (graph: FcModel) => Array<string> | null;
export {};
