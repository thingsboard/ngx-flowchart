import { __decorate, __metadata, __values } from "tslib";
import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
var FcConnectorDirective = /** @class */ (function () {
    function FcConnectorDirective(elementRef) {
        this.elementRef = elementRef;
    }
    FcConnectorDirective.prototype.ngOnInit = function () {
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        var connectorRectInfo = {
            type: this.connector.type,
            width: this.elementRef.nativeElement.offsetWidth,
            height: this.elementRef.nativeElement.offsetHeight,
            nodeRectInfo: this.nodeRectInfo
        };
        this.modelservice.connectors.setConnectorRectInfo(this.connector.id, connectorRectInfo);
    };
    FcConnectorDirective.prototype.ngOnChanges = function (changes) {
        var e_1, _a;
        var updateConnector = false;
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
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
    FcConnectorDirective.prototype.updateConnectorClass = function () {
        var element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    };
    FcConnectorDirective.prototype.dragover = function (event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    };
    FcConnectorDirective.prototype.drop = function (event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    };
    FcConnectorDirective.prototype.dragend = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    };
    FcConnectorDirective.prototype.dragstart = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    };
    FcConnectorDirective.prototype.mouseenter = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    };
    FcConnectorDirective.prototype.mouseleave = function (event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    };
    FcConnectorDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "callbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FcModelService)
    ], FcConnectorDirective.prototype, "modelservice", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "connector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "nodeRectInfo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FcConnectorDirective.prototype, "mouseOverConnector", void 0);
    __decorate([
        HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "dragover", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "drop", null);
    __decorate([
        HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "dragend", null);
    __decorate([
        HostListener('dragstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "dragstart", null);
    __decorate([
        HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "mouseenter", null);
    __decorate([
        HostListener('mouseleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], FcConnectorDirective.prototype, "mouseleave", null);
    FcConnectorDirective = __decorate([
        Directive({
            // tslint:disable-next-line:directive-selector
            selector: '[fc-connector]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FcConnectorDirective);
    return FcConnectorDirective;
}());
export { FcConnectorDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29ubmVjdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUgsT0FBTyxFQUFpRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU1qRDtJQWlCRSw4QkFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7SUFDdEQsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDRSxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQU0saUJBQWlCLEdBQXdCO1lBQzdDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVc7WUFDaEQsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVk7WUFDbEQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2hDLENBQUM7UUFDRixJQUFJLENBQUMs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S0FBSyxFQUFFOzs4REFDcUI7SUFHN0I7UUFEQyxLQUFLLEVBQUU7O29FQUN3QjtJQThDaEM7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNyQixTQUFTOzt3REFLeEI7SUFHRDtRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7eUNBQ3JCLFNBQVM7O29EQUlwQjtJQUdEO1FBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDckIsU0FBUzs7dURBSXZCO0lBR0Q7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNyQixTQUFTOzt5REFJekI7SUFHRDtRQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7eUNBQ3JCLFVBQVU7OzBEQUkzQjtJQUdEO1FBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt5Q0FDckIsVUFBVTs7MERBSTNCO0lBckdVLG9CQUFvQjtRQUpoQyxTQUFTLENBQUM7WUFDVCw4Q0FBOEM7WUFDOUMsUUFBUSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDO3lDQWtCK0IsVUFBVTtPQWpCOUIsb0JBQW9CLENBdUdoQztJQUFELDJCQUFDO0NBQUEsQUF2R0QsSUF1R0M7U0F2R1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjQ29ubmVjdG9yLCBGY0Nvbm5lY3RvclJlY3RJbmZvLCBGY05vZGVSZWN0SW5mbywgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLWNvbm5lY3Rvcl0nXG59KVxuZXhwb3J0IGNsYXNzIEZjQ29ubmVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm87XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5jb25uZWN0b3JDbGFzcyk7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JSZWN0SW5mbzogRmNDb25uZWN0b3JSZWN0SW5mbyA9IHtcbiAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yLnR5cGUsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIG5vZGVSZWN0SW5mbzogdGhpcy5ub2RlUmVjdEluZm9cbiAgICB9O1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLmNvbm5lY3RvcnMuc2V0Q29ubmVjdG9yUmVjdEluZm8odGhpcy5jb25uZWN0b3IuaWQsIGNvbm5lY3RvclJlY3RJbmZvKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlQ29ubmVjdG9yID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdtb3VzZU92ZXJDb25uZWN0b3InKSB7XG4gICAgICAgICAgdXBkYXRlQ29ubmVjdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlQ29ubmVjdG9yICYmIHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29ubmVjdG9yQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmNvbm5lY3RvciA9PT0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3IpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAvLyBTa2lwIC0gY29uZmxpY3Qgd2l0aCBtYWduZXRcbiAgICAvKiBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZWRnZURyYWdvdmVyQ29ubmVjdG9yKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfSovXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnc3RhcnQoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJywgWyckZXZlbnQnXSlcbiAgbW91c2VlbnRlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmNvbm5lY3Rvck1vdXNlRW50ZXIoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJywgWyckZXZlbnQnXSlcbiAgbW91c2VsZWF2ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmNvbm5lY3Rvck1vdXNlTGVhdmUoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxufVxuIl19