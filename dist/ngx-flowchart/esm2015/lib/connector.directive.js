import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
let FcConnectorDirective = class FcConnectorDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.connectorClass);
        if (this.modelservice.isEditable()) {
            element.attr('draggable', 'true');
            this.updateConnectorClass();
        }
        const connectorRectInfo = {
            type: this.connector.type,
            width: this.elementRef.nativeElement.offsetWidth,
            height: this.elementRef.nativeElement.offsetHeight,
            nodeRectInfo: this.nodeRectInfo
        };
        this.modelservice.connectors.setConnectorRectInfo(this.connector.id, connectorRectInfo);
    }
    ngOnChanges(changes) {
        let updateConnector = false;
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            if (!change.firstChange && change.currentValue !== change.previousValue) {
                if (propName === 'mouseOverConnector') {
                    updateConnector = true;
                }
            }
        }
        if (updateConnector && this.modelservice.isEditable()) {
            this.updateConnectorClass();
        }
    }
    updateConnectorClass() {
        const element = $(this.elementRef.nativeElement);
        if (this.connector === this.mouseOverConnector) {
            element.addClass(FlowchartConstants.hoverClass);
        }
        else {
            element.removeClass(FlowchartConstants.hoverClass);
        }
    }
    dragover(event) {
        // Skip - conflict with magnet
        /* if (this.modelservice.isEditable()) {
          return this.callbacks.edgeDragoverConnector(event, this.connector);
        }*/
    }
    drop(event) {
        if (this.modelservice.isEditable()) {
            return this.callbacks.edgeDrop(event, this.connector);
        }
    }
    dragend(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragend(event);
        }
    }
    dragstart(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.edgeDragstart(event, this.connector);
        }
    }
    mouseenter(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseEnter(event, this.connector);
        }
    }
    mouseleave(event) {
        if (this.modelservice.isEditable()) {
            this.callbacks.connectorMouseLeave(event, this.connector);
        }
    }
};
FcConnectorDirective.ctorParameters = () => [
    { type: ElementRef }
];
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
export { FcConnectorDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29ubmVjdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUgsT0FBTyxFQUFpRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU1qRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQWlCL0IsWUFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7SUFDdEQsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtRQUNELE1BQU0saUJBQWlCLEdBQXdCO1lBQzdDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVc7WUFDaEQsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVk7WUFDbEQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NB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WSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDckIsU0FBUzs7b0RBS3hCO0FBR0Q7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUNyQixTQUFTOztnREFJcEI7QUFHRDtJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3JCLFNBQVM7O21EQUl2QjtBQUdEO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDckIsU0FBUzs7cURBSXpCO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUNyQixVQUFVOztzREFJM0I7QUFHRDtJQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3JCLFVBQVU7O3NEQUkzQjtBQXJHVSxvQkFBb0I7SUFKaEMsU0FBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQztxQ0FrQitCLFVBQVU7R0FqQjlCLG9CQUFvQixDQXVHaEM7U0F2R1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjQ29ubmVjdG9yLCBGY0Nvbm5lY3RvclJlY3RJbmZvLCBGY05vZGVSZWN0SW5mbywgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLWNvbm5lY3Rvcl0nXG59KVxuZXhwb3J0IGNsYXNzIEZjQ29ubmVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm87XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5jb25uZWN0b3JDbGFzcyk7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JSZWN0SW5mbzogRmNDb25uZWN0b3JSZWN0SW5mbyA9IHtcbiAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yLnR5cGUsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIG5vZGVSZWN0SW5mbzogdGhpcy5ub2RlUmVjdEluZm9cbiAgICB9O1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLmNvbm5lY3RvcnMuc2V0Q29ubmVjdG9yUmVjdEluZm8odGhpcy5jb25uZWN0b3IuaWQsIGNvbm5lY3RvclJlY3RJbmZvKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlQ29ubmVjdG9yID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdtb3VzZU92ZXJDb25uZWN0b3InKSB7XG4gICAgICAgICAgdXBkYXRlQ29ubmVjdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlQ29ubmVjdG9yICYmIHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29ubmVjdG9yQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmNvbm5lY3RvciA9PT0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3IpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAvLyBTa2lwIC0gY29uZmxpY3Qgd2l0aCBtYWduZXRcbiAgICAvKiBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuZWRnZURyYWdvdmVyQ29ubmVjdG9yKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfSovXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnc3RhcnQoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJywgWyckZXZlbnQnXSlcbiAgbW91c2VlbnRlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmNvbm5lY3Rvck1vdXNlRW50ZXIoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJywgWyckZXZlbnQnXSlcbiAgbW91c2VsZWF2ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmNvbm5lY3Rvck1vdXNlTGVhdmUoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9XG4gIH1cblxufVxuIl19