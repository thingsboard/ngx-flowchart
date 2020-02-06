/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
var FcConnectorDirective = /** @class */ (function () {
    function FcConnectorDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    FcConnectorDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        /** @type {?} */
        var connectorRectInfo = {
            type: this.connector.type,
            width: this.elementRef.nativeElement.offsetWidth,
            height: this.elementRef.nativeElement.offsetHeight,
            nodeRectInfo: this.nodeRectInfo
        };
        this.modelservice.connectors.setConnectorRectInfo(this.connector.id, connectorRectInfo);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FcConnectorDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var e_1, _a;
        /** @type {?} */
        var updateConnector = false;
        try {
            for (var _b = tslib_1.__values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
                /** @type {?} */
                var change = changes[propName];
                if (!change.firstChange && change.currentValue !== change.previousValue) {
                    if (propName === 'mouseOverConnector') {
                        updateConnector = true;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (updateConnector && this.modelservice.isEditable()) {
            this.updateConnectorClass();
        }
    };
    /**
     * @private
     * @return {?}
     */
    FcConnectorDirective.prototype.updateConnectorClass = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.dragstart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.mouseenter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcConnectorDirective.prototype.mouseleave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    };
    FcConnectorDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fc-connector]'
                },] }
    ];
    /** @nocollapse */
    FcConnectorDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FcConnectorDirective.propDecorators = {
        callbacks: [{ type: Input }],
        modelservice: [{ type: Input }],
        connector: [{ type: Input }],
        nodeRectInfo: [{ type: Input }],
        mouseOverConnector: [{ type: Input }],
        dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }],
        dragstart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
        mouseenter: [{ type: HostListener, args: ['mouseenter', ['$event'],] }],
        mouseleave: [{ type: HostListener, args: ['mouseleave', ['$event'],] }]
    };
    return FcConnectorDirective;
}());
export { FcConnectorDirective };
if (false) {
    /** @type {?} */
    FcConnectorDirective.prototype.callbacks;
    /** @type {?} */
    FcConnectorDirective.prototype.modelservice;
    /** @type {?} */
    FcConnectorDirective.prototype.connector;
    /** @type {?} */
    FcConnectorDirective.prototype.nodeRectInfo;
    /** @type {?} */
    FcConnectorDirective.prototype.mouseOverConnector;
    /** @type {?} */
    FcConnectorDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29ubmVjdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQWlFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpEO0lBcUJFLDhCQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtJQUN0RCxDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSOztZQUNRLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDaEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7O1lBQ0ssaUJBQWlCLEdBQXdCO1lBQzdDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVc7WUFDaEQsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVk7WUFDbEQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMs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LFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzt1QkFRbkMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkFPL0IsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFPbEMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFPcEMsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFPckMsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFPeEMsMkJBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQXZHWSxvQkFBb0I7OztJQUUvQix5Q0FDdUI7O0lBRXZCLDRDQUM2Qjs7SUFFN0IseUNBQ3VCOztJQUV2Qiw0Q0FDNkI7O0lBRTdCLGtEQUNnQzs7SUFFcEIsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjQ29ubmVjdG9yLCBGY0Nvbm5lY3RvclJlY3RJbmZvLCBGY05vZGVSZWN0SW5mbywgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLWNvbm5lY3Rvcl0nXG59KVxuZXhwb3J0IGNsYXNzIEZjQ29ubmVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm87XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5jb25uZWN0b3JDbGFzcyk7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JSZWN0SW5mbzogRmNDb25uZWN0b3JSZWN0SW5mbyA9IHtcbiAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yLnR5cGUsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIG5vZGVSZWN0SW5mbzogdGhpcy5ub2RlUmVjdEluZm9cbiAgICB9O1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLmNvbm5lY3RvcnMuc2V0Q29ubmVjdG9yUmVjdEluZm8odGhpcy5jb25uZWN0b3IuaWQsIGNvbm5lY3RvclJlY3RJbmZvKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlQ29ubmVjdG9yID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdtb3VzZU92ZXJDb25uZWN0b3InKSB7XG4gICAgICAgICAgdXBkYXRlQ29ubmVjdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlQ29ubmVjdG9yICYmIHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29ubmVjdG9yQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmNvbm5lY3RvciA9PT0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3IpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAvLyBTa2lwIC0gY29uZmxpY3Qgd2l0aCBtYWduZXRcbiAgICAvKiBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZWRnZURyYWdvdmVyQ29ubmVjdG9yKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfSovXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnc3RhcnQoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJywgWyckZXZlbnQnXSlcbiAgbW91c2VlbnRlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmNvbm5lY3Rvck1vdXNlRW50ZXIoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJywgWyckZXZlbnQnXSlcbiAgbW91c2VsZWF2ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmNvbm5lY3Rvck1vdXNlTGVhdmUoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxufVxuIl19