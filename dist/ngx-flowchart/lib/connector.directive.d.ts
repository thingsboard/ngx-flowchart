import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FcCallbacks, FcConnector, FcNodeRectInfo } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import * as i0 from "@angular/core";
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
    dragover(event: Event | any): void;
    drop(event: Event | any): boolean;
    dragend(event: Event | any): void;
    dragstart(event: Event | any): void;
    mouseenter(event: MouseEvent): void;
    mouseleave(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FcConnectorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FcConnectorDirective, "[fc-connector]", never, { "callbacks": "callbacks"; "modelservice": "modelservice"; "connector": "connector"; "nodeRectInfo": "nodeRectInfo"; "mouseOverConnector": "mouseOverConnector"; }, {}, never, never, false, never>;
}
