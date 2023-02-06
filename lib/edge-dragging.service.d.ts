/// <reference types="jquery" />
/// <reference types="jquery" />
import { FcModelService } from './model.service';
import { FcConnector, FcCoords, FcEdge, FcModel } from './ngx-flowchart.models';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcModelValidationService } from './modelvalidation.service';
export declare class FcEdgeDraggingService {
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
    dragleaveMagnet(event: Event | any): void;
    dragoverMagnet(event: Event | any, connector: FcConnector): boolean;
    dragend(event: Event | any): void;
    drop(event: Event | any, targetConnector: FcConnector): boolean;
}
export interface EdgeDragging {
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
