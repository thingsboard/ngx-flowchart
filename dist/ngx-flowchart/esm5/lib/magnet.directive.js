/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
var FcMagnetDirective = /** @class */ (function () {
    function FcMagnetDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    FcMagnetDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.dragleave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.callbacks.edgeDragleaveMagnet(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.callbacks.edgeDrop(event, this.connector);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcMagnetDirective.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.callbacks.edgeDragend(event);
    };
    FcMagnetDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fc-magnet]'
                },] }
    ];
    /** @nocollapse */
    FcMagnetDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FcMagnetDirective.propDecorators = {
        callbacks: [{ type: Input }],
        connector: [{ type: Input }],
        dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        dragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }]
    };
    return FcMagnetDirective;
}());
export { FcMagnetDirective };
if (false) {
    /** @type {?} */
    FcMagnetDirective.prototype.callbacks;
    /** @type {?} */
    FcMagnetDirective.prototype.connector;
    /** @type {?} */
    FcMagnetDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvbWFnbmV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQTRCLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdEY7SUFZRSwyQkFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7SUFDdEQsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUjs7WUFDUSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFHRCxvQ0FBUTs7OztJQURSLFVBQ1MsS0FBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7SUFHRCxxQ0FBUzs7OztJQURULFVBQ1UsS0FBZ0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUdELGdDQUFJOzs7O0lBREosVUFDSyxLQUFnQjtRQUNuQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFHRCxtQ0FBTzs7OztJQURQLFVBQ1EsS0FBZ0I7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Z0JBdENGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCOzs7O2dCQU5tQixVQUFVOzs7NEJBUzNCLEtBQUs7NEJBR0wsS0FBSzsyQkFXTCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUtuQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3VCQUtwQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQUsvQixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQUtyQyx3QkFBQztDQUFBLEFBeENELElBd0NDO1NBcENZLGlCQUFpQjs7O0lBRTVCLHNDQUN1Qjs7SUFFdkIsc0NBQ3VCOztJQUVYLHVDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNDb25uZWN0b3IsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tmYy1tYWduZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBGY01hZ25ldERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLm1hZ25ldENsYXNzKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgZHJhZ292ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ292ZXJNYWduZXQoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIGRyYWdsZWF2ZShldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5jYWxsYmFja3MuZWRnZURyYWdsZWF2ZU1hZ25ldChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgZHJhZ2VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5jYWxsYmFja3MuZWRnZURyYWdlbmQoZXZlbnQpO1xuICB9XG5cbn1cbiJdfQ==