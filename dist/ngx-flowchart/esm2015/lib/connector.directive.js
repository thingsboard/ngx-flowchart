import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcConnectorDirective.prototype, "dragover", null);
__decorate([
    HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcConnectorDirective.prototype, "drop", null);
__decorate([
    HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcConnectorDirective.prototype, "dragend", null);
__decorate([
    HostListener('dragstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvY29ubmVjdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQWlFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBTWpELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBaUIvQixZQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtJQUN0RCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO1FBQ0QsTUFBTSxpQkFBaUIsR0FBd0I7WUFDN0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVztZQUNoRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWTtZQUNsRCxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDaEMsQ0FBQztR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VSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0RBTXBDO0FBR0Q7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Z0RBS2hDO0FBR0Q7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7bURBS25DO0FBR0Q7SUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7cURBS3JDO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUNyQixVQUFVOztzREFJM0I7QUFHRDtJQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3JCLFVBQVU7O3NEQUkzQjtBQXJHVSxvQkFBb0I7SUFKaEMsU0FBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQztxQ0FrQitCLFVBQVU7R0FqQjlCLG9CQUFvQixDQXVHaEM7U0F2R1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjQ29ubmVjdG9yLCBGY0Nvbm5lY3RvclJlY3RJbmZvLCBGY05vZGVSZWN0SW5mbywgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLWNvbm5lY3Rvcl0nXG59KVxuZXhwb3J0IGNsYXNzIEZjQ29ubmVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm87XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5jb25uZWN0b3JDbGFzcyk7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JSZWN0SW5mbzogRmNDb25uZWN0b3JSZWN0SW5mbyA9IHtcbiAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yLnR5cGUsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIG5vZGVSZWN0SW5mbzogdGhpcy5ub2RlUmVjdEluZm9cbiAgICB9O1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLmNvbm5lY3RvcnMuc2V0Q29ubmVjdG9yUmVjdEluZm8odGhpcy5jb25uZWN0b3IuaWQsIGNvbm5lY3RvclJlY3RJbmZvKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlQ29ubmVjdG9yID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdtb3VzZU92ZXJDb25uZWN0b3InKSB7XG4gICAgICAgICAgdXBkYXRlQ29ubmVjdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlQ29ubmVjdG9yICYmIHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29ubmVjdG9yQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmNvbm5lY3RvciA9PT0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3IpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIC8vIFNraXAgLSBjb25mbGljdCB3aXRoIG1hZ25ldFxuICAgIC8qIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ292ZXJDb25uZWN0b3IoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9Ki9cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJvcChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuZWRnZURyYWdzdGFydChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKVxuICBtb3VzZWVudGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuY29ubmVjdG9yTW91c2VFbnRlcihldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudCddKVxuICBtb3VzZWxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuY29ubmVjdG9yTW91c2VMZWF2ZShldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=