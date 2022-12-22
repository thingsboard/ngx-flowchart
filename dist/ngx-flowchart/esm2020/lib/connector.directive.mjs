import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import * as i0 from "@angular/core";
export class FcConnectorDirective {
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
}
FcConnectorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: FcConnectorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
FcConnectorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.12", type: FcConnectorDirective, selector: "[fc-connector]", inputs: { callbacks: "callbacks", modelservice: "modelservice", connector: "connector", nodeRectInfo: "nodeRectInfo", mouseOverConnector: "mouseOverConnector" }, host: { listeners: { "dragover": "dragover($event)", "drop": "drop($event)", "dragend": "dragend($event)", "dragstart": "dragstart($event)", "mouseenter": "mouseenter($event)", "mouseleave": "mouseleave($event)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: FcConnectorDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fc-connector]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { callbacks: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], connector: [{
                type: Input
            }], nodeRectInfo: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], dragover: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], drop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }], dragstart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], mouseenter: [{
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }], mouseleave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mbG93Y2hhcnQvc3JjL2xpYi9jb25uZWN0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBaUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTWpELE1BQU0sT0FBTyxvQkFBb0I7SUFpQi9CLFlBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7UUFDRCxNQUFNLGlCQUFpQixHQUF3QjtZQUM3QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1lBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXO1lBQ2hELE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZO1lBQ2xELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNoQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FB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TixRQUFRO3NCQURQLFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVNwQyxJQUFJO3NCQURILFlBQVk7dUJBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVFoQyxPQUFPO3NCQUROLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVFuQyxTQUFTO3NCQURSLFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVFyQyxVQUFVO3NCQURULFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVF0QyxVQUFVO3NCQURULFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjQ29ubmVjdG9yLCBGY0Nvbm5lY3RvclJlY3RJbmZvLCBGY05vZGVSZWN0SW5mbywgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2ZjLWNvbm5lY3Rvcl0nXG59KVxuZXhwb3J0IGNsYXNzIEZjQ29ubmVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm87XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5jb25uZWN0b3JDbGFzcyk7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0b3JSZWN0SW5mbzogRmNDb25uZWN0b3JSZWN0SW5mbyA9IHtcbiAgICAgIHR5cGU6IHRoaXMuY29ubmVjdG9yLnR5cGUsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIG5vZGVSZWN0SW5mbzogdGhpcy5ub2RlUmVjdEluZm9cbiAgICB9O1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLmNvbm5lY3RvcnMuc2V0Q29ubmVjdG9yUmVjdEluZm8odGhpcy5jb25uZWN0b3IuaWQsIGNvbm5lY3RvclJlY3RJbmZvKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlQ29ubmVjdG9yID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdtb3VzZU92ZXJDb25uZWN0b3InKSB7XG4gICAgICAgICAgdXBkYXRlQ29ubmVjdG9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlQ29ubmVjdG9yICYmIHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25uZWN0b3JDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29ubmVjdG9yQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmNvbm5lY3RvciA9PT0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3IpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIC8vIFNraXAgLSBjb25mbGljdCB3aXRoIG1hZ25ldFxuICAgIC8qIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ292ZXJDb25uZWN0b3IoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgICB9Ki9cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJvcChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICh0aGlzLm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuZWRnZURyYWdzdGFydChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKVxuICBtb3VzZWVudGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuY29ubmVjdG9yTW91c2VFbnRlcihldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudCddKVxuICBtb3VzZWxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuY29ubmVjdG9yTW91c2VMZWF2ZShldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=