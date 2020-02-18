import { ElementRef, OnInit } from '@angular/core';
import { FcCallbacks, FcConnector } from './ngx-flowchart.models';
export declare class FcMagnetDirective implements OnInit {
    elementRef: ElementRef<HTMLElement>;
    callbacks: FcCallbacks;
    connector: FcConnector;
    constructor(elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    dragover(event: DragEvent): boolean;
    dragleave(event: DragEvent): void;
    drop(event: DragEvent): boolean;
    dragend(event: DragEvent): void;
}
