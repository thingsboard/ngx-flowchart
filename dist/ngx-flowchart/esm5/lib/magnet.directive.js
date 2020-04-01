import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
var FcMagnetDirective = /** @class */ (function () {
    function FcMagnetDirective(elementRef) {
        this.elementRef = elementRef;
    }
    FcMagnetDirective.prototype.ngOnInit = function () {
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    };
    FcMagnetDirective.prototype.dragover = function (event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    };
    FcMagnetDirective.prototype.dragleave = function (event) {
        this.callbacks.edgeDragleaveMagnet(event);
    };
    FcMagnetDirective.prototype.drop = function (event) {
        return this.callbacks.edgeDrop(event, this.connector);
    };
    FcMagnetDirective.prototype.dragend = function (event) {
        this.callbacks.edgeDragend(event);
    };
    FcMagnetDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "dragover", null);
    __decorate([
        HostListener('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "dragleave", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "drop", null);
    __decorate([
        HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FcMagnetDirective.prototype, "dragend", null);
    FcMagnetDirective = __decorate([
        Directive({
            // tslint:disable-next-line:directive-selector
            selector: '[fc-magnet]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FcMagnetDirective);
    return FcMagnetDirective;
}());
export { FcMagnetDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbWFnbmV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUE0QixrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXRGO0lBUUUsMkJBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3RELENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0Qsb0NBQVEsR0FBUixVQUFTLEtBQWtCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFHRCxxQ0FBUyxHQUFULFVBQVUsS0FBa0I7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsZ0NBQUksR0FBSixVQUFLLEtBQWtCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBR0QsbUNBQU8sR0FBUCxVQUFRLEtBQWtCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQTFCOEIsVUFBVTs7SUFMekM7UUFEQyxLQUFLLEVBQUU7O3dEQUNlO0lBR3ZCO1FBREMsS0FBSyxFQUFFOzt3REFDZTtJQVd2QjtRQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztxREFHcEM7SUFHRDtRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztzREFHckM7SUFHRDtRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztpREFHaEM7SUFHRDtRQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztvREFHbkM7SUFsQ1UsaUJBQWlCO1FBSjdCLFNBQVMsQ0FBQztZQUNULDhDQUE4QztZQUM5QyxRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDO3lDQVMrQixVQUFVO09BUjlCLGlCQUFpQixDQW9DN0I7SUFBRCx3QkFBQztDQUFBLEFBcENELElBb0NDO1NBcENZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNDb25uZWN0b3IsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tmYy1tYWduZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBGY01hZ25ldERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLm1hZ25ldENsYXNzKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgZHJhZ292ZXIoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnb3Zlck1hZ25ldChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgZHJhZ2xlYXZlKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnbGVhdmVNYWduZXQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgZHJhZ2VuZChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2VuZChldmVudCk7XG4gIH1cblxufVxuIl19