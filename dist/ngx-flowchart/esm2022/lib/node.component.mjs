import { Component, ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FC_NODE_COMPONENT_CONFIG, FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import * as i0 from "@angular/core";
export class FcNodeContainerComponent {
    get nodeId() {
        return this.node.id;
    }
    get top() {
        return this.node.y + 'px';
    }
    get left() {
        return this.node.x + 'px';
    }
    constructor(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: FcNodeContainerComponent, deps: [{ token: FC_NODE_COMPONENT_CONFIG }, { token: i0.ElementRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.6", type: FcNodeContainerComponent, selector: "fc-node", inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, host: { listeners: { "mousedown": "mousedown($event)", "dragstart": "dragstart($event)", "dragend": "dragend($event)", "click": "click($event)", "mouseover": "mouseover($event)", "mouseout": "mouseout($event)" }, properties: { "attr.id": "this.nodeId", "style.top": "this.top", "style.left": "this.left" } }, viewQueries: [{ propertyName: "nodeContentContainer", first: true, predicate: ["nodeContent"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-template #nodeContent></ng-template>', isInline: true, styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: FcNodeContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-node', template: '<ng-template #nodeContent></ng-template>', styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FC_NODE_COMPONENT_CONFIG]
                }] }, { type: i0.ElementRef }, { type: i0.ComponentFactoryResolver }], propDecorators: { callbacks: [{
                type: Input
            }], userNodeCallbacks: [{
                type: Input
            }], node: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], underMouse: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], dragging: [{
                type: Input
            }], nodeId: [{
                type: HostBinding,
                args: ['attr.id']
            }], top: [{
                type: HostBinding,
                args: ['style.top']
            }], left: [{
                type: HostBinding,
                args: ['style.left']
            }], nodeContentContainer: [{
                type: ViewChild,
                args: ['nodeContent', { read: ViewContainerRef, static: true }]
            }], mousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], dragstart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }], click: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], mouseover: [{
                type: HostListener,
                args: ['mouseover', ['$event']]
            }], mouseout: [{
                type: HostListener,
                args: ['mouseout', ['$event']]
            }] } });
// tslint:disable-next-line:directive-class-suffix
export class FcNodeComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: () => this.node.y,
            left: () => this.node.x,
            bottom: () => this.node.y + this.height,
            right: () => this.node.x + this.width,
            width: () => this.width,
            height: () => this.height
        };
    }
    ngOnInit() {
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: FcNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.6", type: FcNodeComponent, inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6", ngImport: i0, type: FcNodeComponent, decorators: [{
            type: Directive
        }], propDecorators: { callbacks: [{
                type: Input
            }], userNodeCallbacks: [{
                type: Input
            }], node: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], underMouse: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], dragging: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBTXhCLGtCQUFrQixFQUVuQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFRakQsTUFBTSxPQUFPLHdCQUF3QjtJQTZCbkMsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFNRCxZQUFzRCxtQkFBMEMsRUFDNUUsVUFBbUMsRUFDbkMsd0JBQWtEO1FBRmhCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBdUI7UUFDNUUsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUN0RSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLENBQUMsaUJB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QUFmLGVBQWU7a0JBRnBDLFNBQVM7OEJBS1IsU0FBUztzQkFEUixLQUFLO2dCQUlOLGlCQUFpQjtzQkFEaEIsS0FBSztnQkFJTixJQUFJO3NCQURILEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLElBQUk7c0JBREgsS0FBSztnQkFJTixVQUFVO3NCQURULEtBQUs7Z0JBSU4sa0JBQWtCO3NCQURqQixLQUFLO2dCQUlOLFlBQVk7c0JBRFgsS0FBSztnQkFJTixRQUFRO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHLFxuICBGY0NhbGxiYWNrcyxcbiAgRmNDb25uZWN0b3IsXG4gIEZjTm9kZSxcbiAgRmNOb2RlQ29tcG9uZW50Q29uZmlnLFxuICBGY05vZGVSZWN0SW5mbyxcbiAgRmxvd2NoYXJ0Q29uc3RhbnRzLFxuICBVc2VyTm9kZUNhbGxiYWNrc1xufSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnZmMtbm9kZScsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICNub2RlQ29udGVudD48L25nLXRlbXBsYXRlPicsXG4gIHN0eWxlVXJsczogWycuL25vZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGY05vZGVDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgbm9kZTogRmNOb2RlO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGVkaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdW5kZXJNb3VzZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBtb3VzZU92ZXJDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIEBJbnB1dCgpXG4gIG1vZGVsc2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG5cbiAgQElucHV0KClcbiAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgZ2V0IG5vZGVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUuaWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnRvcCcpXG4gIGdldCB0b3AoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyAncHgnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JylcbiAgZ2V0IGxlZnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnggKyAncHgnO1xuICB9XG5cbiAgbm9kZUNvbXBvbmVudDogRmNOb2RlQ29tcG9uZW50O1xuXG4gIEBWaWV3Q2hpbGQoJ25vZGVDb250ZW50Jywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pIG5vZGVDb250ZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRkNfTk9ERV9DT01QT05FTlRfQ09ORklHKSBwcml2YXRlIG5vZGVDb21wb25lbnRDb25maWc6IEZjTm9kZUNvbXBvbmVudENvbmZpZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzID0ge307XG4gICAgfVxuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3Mubm9kZUVkaXQgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0IHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5kb3VibGVDbGljayA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2sgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRG93biA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VEb3duIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUVudGVyID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUVudGVyIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUxlYXZlID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZUxlYXZlIHx8ICgoKSA9PiB7fSk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhGbG93Y2hhcnRDb25zdGFudHMubm9kZUNsYXNzKTtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgZWxlbWVudC5hdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZU5vZGVDbGFzcygpO1xuICAgIHRoaXMubW9kZWxzZXJ2aWNlLm5vZGVzLnNldEh0bWxFbGVtZW50KHRoaXMubm9kZS5pZCwgZWxlbWVudFswXSk7XG4gICAgdGhpcy5ub2RlQ29udGVudENvbnRhaW5lci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLm5vZGVDb21wb25lbnRDb25maWcubm9kZUNvbXBvbmVudFR5cGUpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMubm9kZUNvbnRlbnRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3M7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnVzZXJOb2RlQ2FsbGJhY2tzID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcztcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubm9kZSA9IHRoaXMubm9kZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW9kZWxzZXJ2aWNlID0gdGhpcy5tb2RlbHNlcnZpY2U7XG4gICAgdGhpcy51cGRhdGVOb2RlQ29tcG9uZW50KCk7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LndpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCB1cGRhdGVOb2RlID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAoWydzZWxlY3RlZCcsICdlZGl0JywgJ3VuZGVyTW91c2UnLCAnbW91c2VPdmVyQ29ubmVjdG9yJywgJ2RyYWdnaW5nJ10uaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgdXBkYXRlTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwZGF0ZU5vZGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDbGFzcygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuc2VsZWN0ZWRDbGFzcywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZWRpdENsYXNzLCB0aGlzLmVkaXQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MsIHRoaXMudW5kZXJNb3VzZSk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ2dpbmdDbGFzcywgdGhpcy5kcmFnZ2luZyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZWRpdCA9IHRoaXMuZWRpdDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudW5kZXJNb3VzZSA9IHRoaXMudW5kZXJNb3VzZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW91c2VPdmVyQ29ubmVjdG9yID0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3I7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmRyYWdnaW5nID0gdGhpcy5kcmFnZ2luZztcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ2xhc3MoZWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY2xheno6IHN0cmluZywgc2V0OiBib29sZWFuKSB7XG4gICAgaWYgKHNldCkge1xuICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbGF6eik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xhenopO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgZHJhZ3N0YXJ0KGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlRHJhZ3N0YXJ0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlRHJhZ2VuZChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlQ2xpY2tlZChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW92ZXInLCBbJyRldmVudCddKVxuICBtb3VzZW92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3ZlcihldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3V0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVNb3VzZU91dChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxufVxuXG5ARGlyZWN0aXZlKClcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmNOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgd2lkdGg6IG51bWJlcjtcblxuICBoZWlnaHQ6IG51bWJlcjtcblxuICBub2RlUmVjdEluZm86IEZjTm9kZVJlY3RJbmZvID0ge1xuICAgIHRvcDogKCkgPT4gdGhpcy5ub2RlLnksXG5cbiAgICBsZWZ0OiAoKSA9PiB0aGlzLm5vZGUueCxcblxuICAgIGJvdHRvbTogKCkgPT4gdGhpcy5ub2RlLnkgKyB0aGlzLmhlaWdodCxcblxuICAgIHJpZ2h0OiAoKSA9PiB0aGlzLm5vZGUueCArIHRoaXMud2lkdGgsXG5cbiAgICB3aWR0aDogKCkgPT4gdGhpcy53aWR0aCxcblxuICAgIGhlaWdodDogKCkgPT4gdGhpcy5oZWlnaHRcbiAgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=