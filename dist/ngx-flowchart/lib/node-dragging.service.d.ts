/// <reference types="jquery" />
/// <reference types="jquery" />
import { FcModelService } from './model.service';
import { FcNode } from './ngx-flowchart.models';
export declare class FcNodeDraggingService {
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
export interface NodeDraggingScope {
    draggedNodes: Array<FcNode>;
    shadowElements: Array<JQuery<HTMLElement>>;
    shadowDragStarted: boolean;
    dropElement: HTMLElement;
}
export interface NodeDropElement extends HTMLElement {
    offsetInfo?: {
        offsetX: number;
        offsetY: number;
    };
}
export interface NodeDropScope {
    dropElement: NodeDropElement;
}
export interface DropNodeInfo {
    node: FcNode;
    dropTargetId: string;
    offsetX: number;
    offsetY: number;
}
