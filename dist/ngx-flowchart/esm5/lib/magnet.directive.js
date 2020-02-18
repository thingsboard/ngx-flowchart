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
    return FcMagnetDirective;
}());
export { FcMagnetDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbWFnbmV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUE0QixrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXRGO0lBUUUsMkJBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3RELENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0Qsb0NBQVEsR0FBUixVQUFTLEtBQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFHRCxxQ0FBUyxHQUFULFVBQVUsS0FBZ0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsZ0NBQUksR0FBSixVQUFLLEtBQWdCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBR0QsbUNBQU8sR0FBUCxVQUFRLEtBQWdCO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQTFCOEIsVUFBVTs7SUFMekM7UUFEQyxLQUFLLEVBQUU7O3dEQUNlO0lBR3ZCO1FBREMsS0FBSyxFQUFFOzt3REFDZTtJQVd2QjtRQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7eUNBQ3JCLFNBQVM7O3FEQUV4QjtJQUdEO1FBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDckIsU0FBUzs7c0RBRXpCO0lBR0Q7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNyQixTQUFTOztpREFFcEI7SUFHRDtRQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7eUNBQ3JCLFNBQVM7O29EQUV2QjtJQWxDVSxpQkFBaUI7UUFKN0IsU0FBUyxDQUFDO1lBQ1QsOENBQThDO1lBQzlDLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7eUNBUytCLFVBQVU7T0FSOUIsaUJBQWlCLENBb0M3QjtJQUFELHdCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FwQ1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjQ2FsbGJhY2tzLCBGY0Nvbm5lY3RvciwgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLW1hZ25ldF0nXG59KVxuZXhwb3J0IGNsYXNzIEZjTWFnbmV0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIGNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhGbG93Y2hhcnRDb25zdGFudHMubWFnbmV0Q2xhc3MpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnb3Zlck1hZ25ldChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgZHJhZ2xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2xlYXZlTWFnbmV0KGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZWRnZURyb3AoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2VuZChldmVudCk7XG4gIH1cblxufVxuIl19