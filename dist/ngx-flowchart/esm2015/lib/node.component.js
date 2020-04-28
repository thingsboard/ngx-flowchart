import { __decorate, __metadata, __param } from "tslib";
import { AfterViewInit, Component, ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FC_NODE_COMPONENT_CONFIG, FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
let FcNodeContainerComponent = class FcNodeContainerComponent {
    constructor(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    get nodeId() {
        return this.node.id;
    }
    get top() {
        return this.node.y + 'px';
    }
    get left() {
        return this.node.x + 'px';
    }
    ngOnInit() {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (() => { });
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (() => { });
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (() => { });
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (() => { });
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (() => { });
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        const componentRef = this.nodeContentContainer.createComponent(componentFactory);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    }
    ngAfterViewInit() {
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    }
    ngOnChanges(changes) {
        let updateNode = false;
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            if (!change.firstChange && change.currentValue !== change.previousValue) {
                if (['selected', 'edit', 'underMouse', 'mouseOverConnector', 'dragging'].includes(propName)) {
                    updateNode = true;
                }
            }
        }
        if (updateNode) {
            this.updateNodeClass();
            this.updateNodeComponent();
        }
    }
    updateNodeClass() {
        const element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    }
    updateNodeComponent() {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    }
    toggleClass(element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    }
    mousedown(event) {
        event.stopPropagation();
    }
    dragstart(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    }
    dragend(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    }
    click(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    }
    mouseover(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    }
    mouseout(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    }
};
FcNodeContainerComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FC_NODE_COMPONENT_CONFIG,] }] },
    { type: ElementRef },
    { type: ComponentFactoryResolver }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeContainerComponent.prototype, "callbacks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeContainerComponent.prototype, "userNodeCallbacks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeContainerComponent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeContainerComponent.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeContainerComponent.prototype, "edit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeContainerComponent.prototype, "underMouse", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeContainerComponent.prototype, "mouseOverConnector", void 0);
__decorate([
    Input(),
    __metadata("design:type", FcModelService)
], FcNodeContainerComponent.prototype, "modelservice", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeContainerComponent.prototype, "dragging", void 0);
__decorate([
    HostBinding('attr.id'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], FcNodeContainerComponent.prototype, "nodeId", null);
__decorate([
    HostBinding('style.top'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], FcNodeContainerComponent.prototype, "top", null);
__decorate([
    HostBinding('style.left'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], FcNodeContainerComponent.prototype, "left", null);
__decorate([
    ViewChild('nodeContent', { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], FcNodeContainerComponent.prototype, "nodeContentContainer", void 0);
__decorate([
    HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "mousedown", null);
__decorate([
    HostListener('dragstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "dragstart", null);
__decorate([
    HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "dragend", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "click", null);
__decorate([
    HostListener('mouseover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "mouseover", null);
__decorate([
    HostListener('mouseout', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "mouseout", null);
FcNodeContainerComponent = __decorate([
    Component({
        selector: 'fc-node',
        template: '<ng-template #nodeContent></ng-template>',
        styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}"]
    }),
    __param(0, Inject(FC_NODE_COMPONENT_CONFIG)),
    __metadata("design:paramtypes", [Object, ElementRef,
        ComponentFactoryResolver])
], FcNodeContainerComponent);
export { FcNodeContainerComponent };
let FcNodeComponent = class FcNodeComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: () => {
                return this.node.y;
            },
            left: () => {
                return this.node.x;
            },
            bottom: () => {
                return this.node.y + this.height;
            },
            right: () => {
                return this.node.x + this.width;
            },
            width: () => {
                return this.width;
            },
            height: () => {
                return this.height;
            }
        };
    }
    ngOnInit() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeComponent.prototype, "callbacks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeComponent.prototype, "userNodeCallbacks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeComponent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeComponent.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeComponent.prototype, "edit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeComponent.prototype, "underMouse", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FcNodeComponent.prototype, "mouseOverConnector", void 0);
__decorate([
    Input(),
    __metadata("design:type", FcModelService)
], FcNodeComponent.prototype, "modelservice", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FcNodeComponent.prototype, "dragging", void 0);
FcNodeComponent = __decorate([
    Directive()
], FcNodeComponent);
export { FcNodeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCx3QkFBd0IsRUFBRSxTQUFTLEVBQ25DLFVBQVUsRUFBRSxXQUFXLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxFQUNiLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLHdCQUF3QixFQUt4QixrQkFBa0IsRUFFbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPakQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFnRG5DLFlBQXNELG1CQUEwQyxFQUM1RSxVQUFtQyxFQUNuQyx3QkFBa0Q7UUFGaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1QjtRQUM1RSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQ3RFLENBQUM7SUFyQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFXRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFD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QUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQyxDQUFDO1lBRUQsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEIsQ0FBQztZQUVELE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JCLENBQUM7U0FDRixDQUFDO0lBS0osQ0FBQztJQUhDLFFBQVE7SUFDUixDQUFDO0NBRUYsQ0FBQTtBQTdEQztJQURDLEtBQUssRUFBRTs7a0RBQ2U7QUFHdkI7SUFEQyxLQUFLLEVBQUU7OzBEQUM2QjtBQUdyQztJQURDLEtBQUssRUFBRTs7NkNBQ0s7QUFHYjtJQURDLEtBQUssRUFBRTs7aURBQ1U7QUFHbEI7SUFEQyxLQUFLLEVBQUU7OzZDQUNNO0FBR2Q7SUFEQyxLQUFLLEVBQUU7O21EQUNZO0FBR3BCO0lBREMsS0FBSyxFQUFFOzsyREFDd0I7QUFHaEM7SUFEQyxLQUFLLEVBQUU7OEJBQ00sY0FBYztxREFBQztBQUc3QjtJQURDLEtBQUssRUFBRTs7aURBQ1U7QUEzQkUsZUFBZTtJQURwQyxTQUFTLEVBQUU7R0FDVSxlQUFlLENBZ0VwQztTQWhFcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcsXG4gIEZjQ2FsbGJhY2tzLFxuICBGY0Nvbm5lY3RvcixcbiAgRmNOb2RlLFxuICBGY05vZGVDb21wb25lbnRDb25maWcsIEZjTm9kZVJlY3RJbmZvLFxuICBGbG93Y2hhcnRDb25zdGFudHMsXG4gIFVzZXJOb2RlQ2FsbGJhY2tzXG59IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYy1ub2RlJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGUgI25vZGVDb250ZW50PjwvbmctdGVtcGxhdGU+JyxcbiAgc3R5bGVVcmxzOiBbJy4vbm9kZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZjTm9kZUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICBnZXQgbm9kZUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5pZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUudG9wJylcbiAgZ2V0IHRvcCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUueSArICdweCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQnKVxuICBnZXQgbGVmdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUueCArICdweCc7XG4gIH1cblxuICBub2RlQ29tcG9uZW50OiBGY05vZGVDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZCgnbm9kZUNvbnRlbnQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgbm9kZUNvbnRlbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcpIHByaXZhdGUgbm9kZUNvbXBvbmVudENvbmZpZzogRmNOb2RlQ29tcG9uZW50Q29uZmlnLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudXNlck5vZGVDYWxsYmFja3MpIHtcbiAgICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCA9IHRoaXMudXNlck5vZGVDYWxsYmFja3Mubm9kZUVkaXQgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5kb3VibGVDbGljayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VEb3duID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZURvd24gfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRW50ZXIgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRW50ZXIgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlTGVhdmUgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlTGVhdmUgfHwgKCgpID0+IHt9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5ub2RlQ2xhc3MpO1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICBlbGVtZW50LmF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgdGhpcy5tb2RlbHNlcnZpY2Uubm9kZXMuc2V0SHRtbEVsZW1lbnQodGhpcy5ub2RlLmlkLCBlbGVtZW50WzBdKTtcbiAgICB0aGlzLm5vZGVDb250ZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubm9kZUNvbXBvbmVudENvbmZpZy5ub2RlQ29tcG9uZW50VHlwZSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5ub2RlQ29udGVudENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5jYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrcztcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudXNlck5vZGVDYWxsYmFja3MgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5ub2RlID0gdGhpcy5ub2RlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5tb2RlbHNlcnZpY2UgPSB0aGlzLm1vZGVsc2VydmljZTtcbiAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC53aWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5oZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IHVwZGF0ZU5vZGUgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKGNoYW5nZXMpKSB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghY2hhbmdlLmZpcnN0Q2hhbmdlICYmIGNoYW5nZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIGlmIChbJ3NlbGVjdGVkJywgJ2VkaXQnLCAndW5kZXJNb3VzZScsICdtb3VzZU92ZXJDb25uZWN0b3InLCAnZHJhZ2dpbmcnXS5pbmNsdWRlcyhwcm9wTmFtZSkpIHtcbiAgICAgICAgICB1cGRhdGVOb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlTm9kZSkge1xuICAgICAgdGhpcy51cGRhdGVOb2RlQ2xhc3MoKTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNvbXBvbmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTm9kZUNsYXNzKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5zZWxlY3RlZENsYXNzLCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5lZGl0Q2xhc3MsIHRoaXMuZWRpdCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuaG92ZXJDbGFzcywgdGhpcy51bmRlck1vdXNlKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5kcmFnZ2luZ0NsYXNzLCB0aGlzLmRyYWdnaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTm9kZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5lZGl0ID0gdGhpcy5lZGl0O1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC51bmRlck1vdXNlID0gdGhpcy51bmRlck1vdXNlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5tb3VzZU92ZXJDb25uZWN0b3IgPSB0aGlzLm1vdXNlT3ZlckNvbm5lY3RvcjtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZHJhZ2dpbmcgPSB0aGlzLmRyYWdnaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVDbGFzcyhlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBjbGF6ejogc3RyaW5nLCBzZXQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoc2V0KSB7XG4gICAgICBlbGVtZW50LmFkZENsYXNzKGNsYXp6KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbGF6eik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnc3RhcnQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVDbGlja2VkKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlTW91c2VPdmVyKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JywgWyckZXZlbnQnXSlcbiAgbW91c2VvdXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3V0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZjTm9kZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbm9kZTogRmNOb2RlO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGVkaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdW5kZXJNb3VzZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBtb3VzZU92ZXJDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG1vZGVsc2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgQElucHV0KClcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgZmxvd2NoYXJ0Q29uc3RhbnRzID0gRmxvd2NoYXJ0Q29uc3RhbnRzO1xuXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgbm9kZVJlY3RJbmZvOiBGY05vZGVSZWN0SW5mbyA9IHtcbiAgICB0b3A6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueTtcbiAgICB9LFxuXG4gICAgbGVmdDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS54O1xuICAgIH0sXG5cbiAgICBib3R0b206ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueSArIHRoaXMuaGVpZ2h0O1xuICAgIH0sXG5cbiAgICByaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS54ICsgdGhpcy53aWR0aDtcbiAgICB9LFxuXG4gICAgd2lkdGg6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLndpZHRoO1xuICAgIH0sXG5cbiAgICBoZWlnaHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICB9XG4gIH07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19