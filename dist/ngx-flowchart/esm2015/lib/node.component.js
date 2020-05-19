import { __decorate, __metadata, __param } from "tslib";
import { Component, ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx3QkFBd0IsRUFNeEIsa0JBQWtCLEVBRW5CLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBT2pELElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBZ0RuQyxZQUFzRCxtQkFBMEMsRUFDNUUsVUFBbUMsRUFDbkMsd0JBQWtEO1FBRmhCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBdUI7UUFDNUUsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUN0RSxDQUFDO0lBckJELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBV0QsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBGLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0gsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzlELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ3pFLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUN6RSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixLQUFLLE1BQU0sUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDM0YsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDbkI7YUFDRjtTQUNGO1FBQ0QsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRU8sZUFBZTtRQUNyQixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBRU8sV0FBVyxDQUFDLE9BQTRCLEVBQUUsS0FBYSxFQUFFLEdBQVk7UUFDM0UsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUdELFNBQVMsQ0FBQyxLQUFpQjtRQUN6QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUdELFNBQVMsQ0FBQyxLQUFrQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFHRCxPQUFPLENBQUMsS0FBa0I7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFpQjtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFHRCxTQUFTLENBQUMsS0FBaUI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQWlCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztDQUVGLENBQUE7OzRDQXhIYyxNQUFNLFNBQUMsd0JBQXdCO1lBQ1osVUFBVTtZQUNJLHdCQUF3Qjs7QUEvQ3RFO0lBREMsS0FBSyxFQUFFOzsyREFDZTtBQUd2QjtJQURDLEtBQUssRUFBRTs7bUVBQzZCO0FBR3JDO0lBREMsS0FBSyxFQUFFOztzREFDSztBQUdiO0lBREMsS0FBSyxFQUFFOzswREFDVTtBQUdsQjtJQURDLEtBQUssRUFBRTs7c0RBQ007QUFHZDtJQURDLEtBQUssRUFBRTs7NERBQ1k7QUFHcEI7SUFEQyxLQUFLLEVBQUU7O29FQUN3QjtBQUdoQztJQURDLEtBQUssRUFBRTs4QkFDTSxjQUFjOzhEQUFDO0FBRzdCO0lBREMsS0FBSyxFQUFFOzswREFDVTtBQUdsQjtJQURDLFdBQVcsQ0FBQyxTQUFTLENBQUM7OztzREFHdEI7QUFHRDtJQURDLFdBQVcsQ0FBQyxXQUFXLENBQUM7OzttREFHeEI7QUFHRDtJQURDLFdBQVcsQ0FBQyxZQUFZLENBQUM7OztvREFHekI7QUFJaUU7SUFBakUsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7OEJBQXVCLGdCQUFnQjtzRUFBQztBQW1Gekc7SUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUNyQixVQUFVOzt5REFFMUI7QUFHRDtJQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozt5REFLckM7QUFHRDtJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozt1REFLbkM7QUFHRDtJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ3JCLFVBQVU7O3FEQUl0QjtBQUdEO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztxQ0FDckIsVUFBVTs7eURBSTFCO0FBR0Q7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3FDQUNyQixVQUFVOzt3REFJekI7QUF0S1Usd0JBQXdCO0lBTHBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSwwQ0FBMEM7O0tBRXJELENBQUM7SUFpRGEsV0FBQSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQTs2Q0FDYixVQUFVO1FBQ0ksd0JBQXdCO0dBbEQzRCx3QkFBd0IsQ0F3S3BDO1NBeEtZLHdCQUF3QjtBQTJLckMsSUFBc0IsZUFBZSxHQUFyQyxNQUFzQixlQUFlO0lBQXJDO1FBNkJFLHVCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBTXhDLGlCQUFZLEdBQW1CO1lBQzdCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBRUQsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNuQyxDQUFDO1lBRUQsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsQ0FBQztZQUVELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BCLENBQUM7WUFFRCxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQixDQUFDO1NBQ0YsQ0FBQztJQUtKLENBQUM7SUFIQyxRQUFRO0lBQ1IsQ0FBQztDQUVGLENBQUE7QUE3REM7SUFEQyxLQUFLLEVBQUU7O2tEQUNlO0FBR3ZCO0lBREMsS0FBSyxFQUFFOzswREFDNkI7QUFHckM7SUFEQyxLQUFLLEVBQUU7OzZDQUNLO0FBR2I7SUFEQyxLQUFLLEVBQUU7O2lEQUNVO0FBR2xCO0lBREMsS0FBSyxFQUFFOzs2Q0FDTTtBQUdkO0lBREMsS0FBSyxFQUFFOzttREFDWTtBQUdwQjtJQURDLEtBQUssRUFBRTs7MkRBQ3dCO0FBR2hDO0lBREMsS0FBSyxFQUFFOzhCQUNNLGNBQWM7cURBQUM7QUFHN0I7SUFEQyxLQUFLLEVBQUU7O2lEQUNVO0FBM0JFLGVBQWU7SUFEcEMsU0FBUyxFQUFFO0dBQ1UsZUFBZSxDQWdFcEM7U0FoRXFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHLFxuICBGY0NhbGxiYWNrcyxcbiAgRmNDb25uZWN0b3IsXG4gIEZjTm9kZSxcbiAgRmNOb2RlQ29tcG9uZW50Q29uZmlnLFxuICBGY05vZGVSZWN0SW5mbyxcbiAgRmxvd2NoYXJ0Q29uc3RhbnRzLFxuICBVc2VyTm9kZUNhbGxiYWNrc1xufSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmMtbm9kZScsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICNub2RlQ29udGVudD48L25nLXRlbXBsYXRlPicsXG4gIHN0eWxlVXJsczogWycuL25vZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGY05vZGVDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbm9kZTogRmNOb2RlO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGVkaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdW5kZXJNb3VzZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBtb3VzZU92ZXJDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG1vZGVsc2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgQElucHV0KClcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgZ2V0IG5vZGVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUuaWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnRvcCcpXG4gIGdldCB0b3AoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyAncHgnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JylcbiAgZ2V0IGxlZnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnggKyAncHgnO1xuICB9XG5cbiAgbm9kZUNvbXBvbmVudDogRmNOb2RlQ29tcG9uZW50O1xuXG4gIEBWaWV3Q2hpbGQoJ25vZGVDb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pIG5vZGVDb250ZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRkNfTk9ERV9DT01QT05FTlRfQ09ORklHKSBwcml2YXRlIG5vZGVDb21wb25lbnRDb25maWc6IEZjTm9kZUNvbXBvbmVudENvbmZpZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzID0ge307XG4gICAgfVxuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3Mubm9kZUVkaXQgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0IHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5kb3VibGVDbGljayA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRG93biA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VEb3duIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUVudGVyID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUVudGVyIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUxlYXZlID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUxlYXZlIHx8ICgoKSA9PiB7fSk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhGbG93Y2hhcnRDb25zdGFudHMubm9kZUNsYXNzKTtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZU5vZGVDbGFzcygpO1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLm5vZGVzLnNldEh0bWxFbGVtZW50KHRoaXMubm9kZS5pZCwgZWxlbWVudFswXSk7XG4gICAgdGhpcy5ub2RlQ29udGVudENvbnRhaW5lci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLm5vZGVDb21wb25lbnRDb25maWcubm9kZUNvbXBvbmVudFR5cGUpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMubm9kZUNvbnRlbnRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3M7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnVzZXJOb2RlQ2FsbGJhY2tzID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcztcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubm9kZSA9IHRoaXMubm9kZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW9kZWxzZXJ2aWNlID0gdGhpcy5tb2RlbHNlcnZpY2U7XG4gICAgdGhpcy51cGRhdGVOb2RlQ29tcG9uZW50KCk7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LndpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCB1cGRhdGVOb2RlID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAoWydzZWxlY3RlZCcsICdlZGl0JywgJ3VuZGVyTW91c2UnLCAnbW91c2VPdmVyQ29ubmVjdG9yJywgJ2RyYWdnaW5nJ10uaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgdXBkYXRlTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwZGF0ZU5vZGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDbGFzcygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuc2VsZWN0ZWRDbGFzcywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZWRpdENsYXNzLCB0aGlzLmVkaXQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MsIHRoaXMudW5kZXJNb3VzZSk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ2dpbmdDbGFzcywgdGhpcy5kcmFnZ2luZyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZWRpdCA9IHRoaXMuZWRpdDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudW5kZXJNb3VzZSA9IHRoaXMudW5kZXJNb3VzZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW91c2VPdmVyQ29ubmVjdG9yID0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3I7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmRyYWdnaW5nID0gdGhpcy5kcmFnZ2luZztcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ2xhc3MoZWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY2xheno6IHN0cmluZywgc2V0OiBib29sZWFuKSB7XG4gICAgaWYgKHNldCkge1xuICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbGF6eik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xhenopO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgZHJhZ3N0YXJ0KGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlRHJhZ3N0YXJ0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlRHJhZ2VuZChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlQ2xpY2tlZChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW92ZXInLCBbJyRldmVudCddKVxuICBtb3VzZW92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3ZlcihldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3V0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVNb3VzZU91dChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGY05vZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGU6IEZjTm9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBlZGl0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHVuZGVyTW91c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gIGZsb3djaGFydENvbnN0YW50cyA9IEZsb3djaGFydENvbnN0YW50cztcblxuICB3aWR0aDogbnVtYmVyO1xuXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm8gPSB7XG4gICAgdG9wOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnk7XG4gICAgfSxcblxuICAgIGxlZnQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueDtcbiAgICB9LFxuXG4gICAgYm90dG9tOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyB0aGlzLmhlaWdodDtcbiAgICB9LFxuXG4gICAgcmlnaHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueCArIHRoaXMud2lkdGg7XG4gICAgfSxcblxuICAgIHdpZHRoOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9LFxuXG4gICAgaGVpZ2h0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfVxuICB9O1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbn1cbiJdfQ==