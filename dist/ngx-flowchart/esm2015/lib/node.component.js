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
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], FcNodeContainerComponent.prototype, "dragstart", null);
__decorate([
    HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
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
        styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{-webkit-box-align:center;align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;height:60px;-webkit-box-pack:center;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCx3QkFBd0IsRUFBRSxTQUFTLEVBQ25DLFVBQVUsRUFBRSxXQUFXLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxFQUNiLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLHdCQUF3QixFQUt4QixrQkFBa0IsRUFFbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPakQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFnRG5DLFlBQXNELG1CQUEwQyxFQUM1RSxVQUFtQyxFQUNuQyx3QkFBa0Q7UUFGaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1QjtRQUM1RSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQ3RFLENBQUM7SUFyQkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFXRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFD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Q0FBQztZQUNuQyxDQUFDO1lBRUQsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsQ0FBQztZQUVELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BCLENBQUM7WUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQixDQUFDO1NBQ0YsQ0FBQztJQUtKLENBQUM7SUFIQyxRQUFRO0lBQ1IsQ0FBQztDQUVGLENBQUE7QUE3REM7SUFEQyxLQUFLLEVBQUU7O2tEQUNlO0FBR3ZCO0lBREMsS0FBSyxFQUFFOzswREFDNkI7QUFHckM7SUFEQyxLQUFLLEVBQUU7OzZDQUNLO0FBR2I7SUFEQyxLQUFLLEVBQUU7O2lEQUNVO0FBR2xCO0lBREMsS0FBSyxFQUFFOzs2Q0FDTTtBQUdkO0lBREMsS0FBSyxFQUFFOzttREFDWTtBQUdwQjtJQURDLEtBQUssRUFBRTs7MkRBQ3dCO0FBR2hDO0lBREMsS0FBSyxFQUFFOzhCQUNNLGNBQWM7cURBQUM7QUFHN0I7SUFEQyxLQUFLLEVBQUU7O2lEQUNVO0FBM0JFLGVBQWU7SUFEcEMsU0FBUyxFQUFFO0dBQ1UsZUFBZSxDQWdFcEM7U0FoRXFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLCBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHLFxuICBGY0NhbGxiYWNrcyxcbiAgRmNDb25uZWN0b3IsXG4gIEZjTm9kZSxcbiAgRmNOb2RlQ29tcG9uZW50Q29uZmlnLCBGY05vZGVSZWN0SW5mbyxcbiAgRmxvd2NoYXJ0Q29uc3RhbnRzLFxuICBVc2VyTm9kZUNhbGxiYWNrc1xufSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmMtbm9kZScsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICNub2RlQ29udGVudD48L25nLXRlbXBsYXRlPicsXG4gIHN0eWxlVXJsczogWycuL25vZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGY05vZGVDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbm9kZTogRmNOb2RlO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGVkaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdW5kZXJNb3VzZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBtb3VzZU92ZXJDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG1vZGVsc2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgQElucHV0KClcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgZ2V0IG5vZGVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUuaWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnRvcCcpXG4gIGdldCB0b3AoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyAncHgnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JylcbiAgZ2V0IGxlZnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnggKyAncHgnO1xuICB9XG5cbiAgbm9kZUNvbXBvbmVudDogRmNOb2RlQ29tcG9uZW50O1xuXG4gIEBWaWV3Q2hpbGQoJ25vZGVDb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pIG5vZGVDb250ZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRkNfTk9ERV9DT01QT05FTlRfQ09ORklHKSBwcml2YXRlIG5vZGVDb21wb25lbnRDb25maWc6IEZjTm9kZUNvbXBvbmVudENvbmZpZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzID0ge307XG4gICAgfVxuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3Mubm9kZUVkaXQgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0IHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5kb3VibGVDbGljayA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRG93biA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VEb3duIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUVudGVyID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUVudGVyIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUxlYXZlID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUxlYXZlIHx8ICgoKSA9PiB7fSk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhGbG93Y2hhcnRDb25zdGFudHMubm9kZUNsYXNzKTtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZU5vZGVDbGFzcygpO1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLm5vZGVzLnNldEh0bWxFbGVtZW50KHRoaXMubm9kZS5pZCwgZWxlbWVudFswXSk7XG4gICAgdGhpcy5ub2RlQ29udGVudENvbnRhaW5lci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLm5vZGVDb21wb25lbnRDb25maWcubm9kZUNvbXBvbmVudFR5cGUpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMubm9kZUNvbnRlbnRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3M7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnVzZXJOb2RlQ2FsbGJhY2tzID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcztcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubm9kZSA9IHRoaXMubm9kZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW9kZWxzZXJ2aWNlID0gdGhpcy5tb2RlbHNlcnZpY2U7XG4gICAgdGhpcy51cGRhdGVOb2RlQ29tcG9uZW50KCk7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LndpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCB1cGRhdGVOb2RlID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAoWydzZWxlY3RlZCcsICdlZGl0JywgJ3VuZGVyTW91c2UnLCAnbW91c2VPdmVyQ29ubmVjdG9yJywgJ2RyYWdnaW5nJ10uaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgdXBkYXRlTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwZGF0ZU5vZGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDbGFzcygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuc2VsZWN0ZWRDbGFzcywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZWRpdENsYXNzLCB0aGlzLmVkaXQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MsIHRoaXMudW5kZXJNb3VzZSk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ2dpbmdDbGFzcywgdGhpcy5kcmFnZ2luZyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZWRpdCA9IHRoaXMuZWRpdDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudW5kZXJNb3VzZSA9IHRoaXMudW5kZXJNb3VzZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW91c2VPdmVyQ29ubmVjdG9yID0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3I7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmRyYWdnaW5nID0gdGhpcy5kcmFnZ2luZztcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ2xhc3MoZWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY2xheno6IHN0cmluZywgc2V0OiBib29sZWFuKSB7XG4gICAgaWYgKHNldCkge1xuICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbGF6eik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xhenopO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgZHJhZ3N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZURyYWdzdGFydChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgZHJhZ2VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVDbGlja2VkKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlTW91c2VPdmVyKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JywgWyckZXZlbnQnXSlcbiAgbW91c2VvdXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3V0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZjTm9kZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbm9kZTogRmNOb2RlO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGVkaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdW5kZXJNb3VzZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBtb3VzZU92ZXJDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG1vZGVsc2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgQElucHV0KClcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgZmxvd2NoYXJ0Q29uc3RhbnRzID0gRmxvd2NoYXJ0Q29uc3RhbnRzO1xuXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgbm9kZVJlY3RJbmZvOiBGY05vZGVSZWN0SW5mbyA9IHtcbiAgICB0b3A6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueTtcbiAgICB9LFxuXG4gICAgbGVmdDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS54O1xuICAgIH0sXG5cbiAgICBib3R0b206ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueSArIHRoaXMuaGVpZ2h0O1xuICAgIH0sXG5cbiAgICByaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS54ICsgdGhpcy53aWR0aDtcbiAgICB9LFxuXG4gICAgd2lkdGg6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLndpZHRoO1xuICAgIH0sXG5cbiAgICBoZWlnaHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICB9XG4gIH07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19