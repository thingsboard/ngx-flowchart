import { ElementRef, OnInit } from '@angular/core';
import { FcCallbacks, FcConnector } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
export declare class FcMagnetDirective implements OnInit {
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<FcMagnetDirective, "[fc-magnet]", never, { "callbacks": "callbacks"; "connector": "connector"; }, {}, never, never, false, never>;
}
