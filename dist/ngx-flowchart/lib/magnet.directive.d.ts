import { ElementRef, OnInit } from '@angular/core';
import { FcCallbacks, FcConnector } from './ngx-flowchart.models';
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
}
