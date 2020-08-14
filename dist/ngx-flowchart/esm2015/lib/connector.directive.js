import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
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
FcConnectorDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fc-connector]'
            },] }
];
FcConnectorDirective.ctorParameters = () => [
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mbG93Y2hhcnQvc3JjL2xpYi9jb25uZWN0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFpRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU1qRCxNQUFNLE9BQU8sb0JBQW9CO0lBaUIvQixZQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtJQUN0RCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO1FBQ0QsTUFBTSxpQkFBaUIsR0FBd0I7WUFDN0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVztZQUNoRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWTtZQUNsRCxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDaEMsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMs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QVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBT2xDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7eUJBT3BDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7eUJBT3JDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNDb25uZWN0b3IsIEZjQ29ubmVjdG9yUmVjdEluZm8sIEZjTm9kZVJlY3RJbmZvLCBGbG93Y2hhcnRDb25zdGFudHMgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbZmMtY29ubmVjdG9yXSdcbn0pXG5leHBvcnQgY2xhc3MgRmNDb25uZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbm9kZVJlY3RJbmZvOiBGY05vZGVSZWN0SW5mbztcblxuICBASW5wdXQoKVxuICBtb3VzZU92ZXJDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmNvbm5lY3RvckNsYXNzKTtcbiAgICBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICBlbGVtZW50LmF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgICB0aGlzLnVwZGF0ZUNvbm5lY3RvckNsYXNzKCk7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RvclJlY3RJbmZvOiBGY0Nvbm5lY3RvclJlY3RJbmZvID0ge1xuICAgICAgdHlwZTogdGhpcy5jb25uZWN0b3IudHlwZSxcbiAgICAgIHdpZHRoOiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgbm9kZVJlY3RJbmZvOiB0aGlzLm5vZGVSZWN0SW5mb1xuICAgIH07XG4gICAgdGhpcy5tb2RlbHNlcnZpY2UuY29ubmVjdG9ycy5zZXRDb25uZWN0b3JSZWN0SW5mbyh0aGlzLmNvbm5lY3Rvci5pZCwgY29ubmVjdG9yUmVjdEluZm8pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCB1cGRhdGVDb25uZWN0b3IgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKGNoYW5nZXMpKSB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghY2hhbmdlLmZpcnN0Q2hhbmdlICYmIGNoYW5nZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ21vdXNlT3ZlckNvbm5lY3RvcicpIHtcbiAgICAgICAgICB1cGRhdGVDb25uZWN0b3IgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh1cGRhdGVDb25uZWN0b3IgJiYgdGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbm5lY3RvckNsYXNzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb25uZWN0b3JDbGFzcygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgaWYgKHRoaXMuY29ubmVjdG9yID09PSB0aGlzLm1vdXNlT3ZlckNvbm5lY3Rvcikge1xuICAgICAgZWxlbWVudC5hZGRDbGFzcyhGbG93Y2hhcnRDb25zdGFudHMuaG92ZXJDbGFzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgZHJhZ292ZXIoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgLy8gU2tpcCAtIGNvbmZsaWN0IHdpdGggbWFnbmV0XG4gICAgLyogaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnb3ZlckNvbm5lY3RvcihldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICAgIH0qL1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKHRoaXMubW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MuZWRnZURyYWdlbmQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gIGRyYWdzdGFydChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ3N0YXJ0KGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5jb25uZWN0b3JNb3VzZUVudGVyKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsnJGV2ZW50J10pXG4gIG1vdXNlbGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5jb25uZWN0b3JNb3VzZUxlYXZlKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==