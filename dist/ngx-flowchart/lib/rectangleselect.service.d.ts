import { FcModelService } from './model.service';
export declare class FcRectangleSelectService {
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
