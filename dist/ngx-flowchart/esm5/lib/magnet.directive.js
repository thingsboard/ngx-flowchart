import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
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
    FcMagnetDirective.ɵfac = function FcMagnetDirective_Factory(t) { return new (t || FcMagnetDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    FcMagnetDirective.ɵdir = i0.ɵɵdefineDirective({ type: FcMagnetDirective, selectors: [["", "fc-magnet", ""]], hostBindings: function FcMagnetDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("dragover", function FcMagnetDirective_dragover_HostBindingHandler($event) { return ctx.dragover($event); })("dragleave", function FcMagnetDirective_dragleave_HostBindingHandler($event) { return ctx.dragleave($event); })("drop", function FcMagnetDirective_drop_HostBindingHandler($event) { return ctx.drop($event); })("dragend", function FcMagnetDirective_dragend_HostBindingHandler($event) { return ctx.dragend($event); });
        } }, inputs: { callbacks: "callbacks", connector: "connector" } });
    return FcMagnetDirective;
}());
export { FcMagnetDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FcMagnetDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fc-magnet]'
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { callbacks: [{
            type: Input
        }], connector: [{
            type: Input
        }], dragover: [{
            type: HostListener,
            args: ['dragover', ['$event']]
        }], dragleave: [{
            type: HostListener,
            args: ['dragleave', ['$event']]
        }], drop: [{
            type: HostListener,
            args: ['drop', ['$event']]
        }], dragend: [{
            type: HostListener,
            args: ['dragend', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbWFnbmV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBNEIsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFdEY7SUFZRSwyQkFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7SUFDdEQsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDRSxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHRCxvQ0FBUSxHQURSLFVBQ1MsS0FBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUdELHFDQUFTLEdBRFQsVUFDVSxLQUFnQjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCxnQ0FBSSxHQURKLFVBQ0ssS0FBZ0I7UUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFHRCxtQ0FBTyxHQURQLFVBQ1EsS0FBZ0I7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztzRkFsQ1UsaUJBQWlCOzBEQUFqQixpQkFBaUI7Ozs0QkFQOUI7Q0EyQ0MsQUF4Q0QsSUF3Q0M7U0FwQ1ksaUJBQWlCO2tEQUFqQixpQkFBaUI7Y0FKN0IsU0FBUztlQUFDO2dCQUNULDhDQUE4QztnQkFDOUMsUUFBUSxFQUFFLGFBQWE7YUFDeEI7O2tCQUdFLEtBQUs7O2tCQUdMLEtBQUs7O2tCQVdMLFlBQVk7bUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOztrQkFLbkMsWUFBWTttQkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tCQUtwQyxZQUFZO21CQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0JBSy9CLFlBQVk7bUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjQ2FsbGJhY2tzLCBGY0Nvbm5lY3RvciwgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLW1hZ25ldF0nXG59KVxuZXhwb3J0IGNsYXNzIEZjTWFnbmV0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIGNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhGbG93Y2hhcnRDb25zdGFudHMubWFnbmV0Q2xhc3MpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnb3Zlck1hZ25ldChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgZHJhZ2xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2xlYXZlTWFnbmV0KGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZWRnZURyb3AoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2VuZChldmVudCk7XG4gIH1cblxufVxuIl19