import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
let FcMagnetDirective = class FcMagnetDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    }
    dragover(event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    }
    dragleave(event) {
        this.callbacks.edgeDragleaveMagnet(event);
    }
    drop(event) {
        return this.callbacks.edgeDrop(event, this.connector);
    }
    dragend(event) {
        this.callbacks.edgeDragend(event);
    }
};
FcMagnetDirective.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcMagnetDirective.prototype, "callbacks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcMagnetDirective.prototype, "connector", void 0);
__decorate([
    HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], FcMagnetDirective.prototype, "dragover", null);
__decorate([
    HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], FcMagnetDirective.prototype, "dragleave", null);
__decorate([
    HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], FcMagnetDirective.prototype, "drop", null);
__decorate([
    HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], FcMagnetDirective.prototype, "dragend", null);
FcMagnetDirective = __decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[fc-magnet]'
    }),
    __metadata("design:paramtypes", [ElementRef])
], FcMagnetDirective);
export { FcMagnetDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbWFnbmV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUE0QixrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXRGLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBUTVCLFlBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFHRCxTQUFTLENBQUMsS0FBZ0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsSUFBSSxDQUFDLEtBQWdCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBR0QsT0FBTyxDQUFDLEtBQWdCO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFRixDQUFBOztZQTVCZ0MsVUFBVTs7QUFMekM7SUFEQyxLQUFLLEVBQUU7O29EQUNlO0FBR3ZCO0lBREMsS0FBSyxFQUFFOztvREFDZTtBQVd2QjtJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3JCLFNBQVM7O2lEQUV4QjtBQUdEO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDckIsU0FBUzs7a0RBRXpCO0FBR0Q7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUNyQixTQUFTOzs2Q0FFcEI7QUFHRDtJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3JCLFNBQVM7O2dEQUV2QjtBQWxDVSxpQkFBaUI7SUFKN0IsU0FBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxhQUFhO0tBQ3hCLENBQUM7cUNBUytCLFVBQVU7R0FSOUIsaUJBQWlCLENBb0M3QjtTQXBDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjQ29ubmVjdG9yLCBGbG93Y2hhcnRDb25zdGFudHMgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbZmMtbWFnbmV0XSdcbn0pXG5leHBvcnQgY2xhc3MgRmNNYWduZXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5tYWduZXRDbGFzcyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZWRnZURyYWdvdmVyTWFnbmV0KGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBkcmFnbGVhdmUoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnbGVhdmVNYWduZXQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJvcChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnZW5kKGV2ZW50KTtcbiAgfVxuXG59XG4iXX0=