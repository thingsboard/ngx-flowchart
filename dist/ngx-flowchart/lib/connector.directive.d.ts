import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FcCallbacks, FcConnector, FcNodeRectInfo } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
export declare class FcConnectorDirective implements OnInit, OnChanges {
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
    dragover(event: DragEvent): void;
    drop(event: DragEvent): boolean;
    dragend(event: DragEvent): void;
    dragstart(event: DragEvent): void;
    mouseenter(event: MouseEvent): void;
    mouseleave(event: MouseEvent): void;
}
