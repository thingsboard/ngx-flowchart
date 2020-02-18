import { __decorate, __metadata, __param, __values } from "tslib";
import { AfterViewInit, Component, ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FC_NODE_COMPONENT_CONFIG, FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
var FcNodeContainerComponent = /** @class */ (function () {
    function FcNodeContainerComponent(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    Object.defineProperty(FcNodeContainerComponent.prototype, "nodeId", {
        get: function () {
            return this.node.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "top", {
        get: function () {
            return this.node.y + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "left", {
        get: function () {
            return this.node.x + 'px';
        },
        enumerable: true,
        configurable: true
    });
    FcNodeContainerComponent.prototype.ngOnInit = function () {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (function () { });
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (function () { });
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (function () { });
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (function () { });
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (function () { });
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        var componentRef = this.nodeContentContainer.createComponent(componentFactory);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    };
    FcNodeContainerComponent.prototype.ngAfterViewInit = function () {
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    };
    FcNodeContainerComponent.prototype.ngOnChanges = function (changes) {
        var e_1, _a;
        var updateNode = false;
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
                var change = changes[propName];
                if (!change.firstChange && change.currentValue !== change.previousValue) {
                    if (['selected', 'edit', 'underMouse', 'mouseOverConnector', 'dragging'].includes(propName)) {
                        updateNode = true;
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
        if (updateNode) {
            this.updateNodeClass();
            this.updateNodeComponent();
        }
    };
    FcNodeContainerComponent.prototype.updateNodeClass = function () {
        var element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    };
    FcNodeContainerComponent.prototype.updateNodeComponent = function () {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    };
    FcNodeContainerComponent.prototype.toggleClass = function (element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    };
    FcNodeContainerComponent.prototype.mousedown = function (event) {
        event.stopPropagation();
    };
    FcNodeContainerComponent.prototype.dragstart = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    };
    FcNodeContainerComponent.prototype.dragend = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    };
    FcNodeContainerComponent.prototype.click = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    };
    FcNodeContainerComponent.prototype.mouseover = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    };
    FcNodeContainerComponent.prototype.mouseout = function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    };
    FcNodeContainerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FC_NODE_COMPONENT_CONFIG,] }] },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
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
    return FcNodeContainerComponent;
}());
export { FcNodeContainerComponent };
var FcNodeComponent = /** @class */ (function () {
    function FcNodeComponent() {
        var _this = this;
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: function () {
                return _this.node.y;
            },
            left: function () {
                return _this.node.x;
            },
            bottom: function () {
                return _this.node.y + _this.height;
            },
            right: function () {
                return _this.node.x + _this.width;
            },
            width: function () {
                return _this.width;
            },
            height: function () {
                return _this.height;
            }
        };
    }
    FcNodeComponent.prototype.ngOnInit = function () {
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
    return FcNodeComponent;
}());
export { FcNodeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCx3QkFBd0IsRUFBRSxTQUFTLEVBQ25DLFVBQVUsRUFBRSxXQUFXLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxFQUNiLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLHdCQUF3QixFQUt4QixrQkFBa0IsRUFFbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPakQ7SUFnREUsa0NBQXNELG1CQUEwQyxFQUM1RSxVQUFtQyxFQUNuQyx3QkFBa0Q7UUFGaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1QjtRQUM1RSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQ3RFLENBQUM7SUFyQkQsc0JBQUksNENBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSx5Q0FBRzthQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSwwQ0FBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFXRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJB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Z0JBQ04sT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ25DLENBQUM7WUFFRCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xDLENBQUM7WUFFRCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BCLENBQUM7WUFFRCxNQUFNLEVBQUU7Z0JBQ04sT0FBTyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JCLENBQUM7U0FDRixDQUFDO0lBS0osQ0FBQztJQUhDLGtDQUFRLEdBQVI7SUFDQSxDQUFDO0lBM0REO1FBREMsS0FBSyxFQUFFOztzREFDZTtJQUd2QjtRQURDLEtBQUssRUFBRTs7OERBQzZCO0lBR3JDO1FBREMsS0FBSyxFQUFFOztpREFDSztJQUdiO1FBREMsS0FBSyxFQUFFOztxREFDVTtJQUdsQjtRQURDLEtBQUssRUFBRTs7aURBQ007SUFHZDtRQURDLEtBQUssRUFBRTs7dURBQ1k7SUFHcEI7UUFEQyxLQUFLLEVBQUU7OytEQUN3QjtJQUdoQztRQURDLEtBQUssRUFBRTtrQ0FDTSxjQUFjO3lEQUFDO0lBRzdCO1FBREMsS0FBSyxFQUFFOztxREFDVTtJQTNCRSxlQUFlO1FBRHBDLFNBQVMsRUFBRTtPQUNVLGVBQWUsQ0FnRXBDO0lBQUQsc0JBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQWhFcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcsXG4gIEZjQ2FsbGJhY2tzLFxuICBGY0Nvbm5lY3RvcixcbiAgRmNOb2RlLFxuICBGY05vZGVDb21wb25lbnRDb25maWcsIEZjTm9kZVJlY3RJbmZvLFxuICBGbG93Y2hhcnRDb25zdGFudHMsXG4gIFVzZXJOb2RlQ2FsbGJhY2tzXG59IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYy1ub2RlJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGUgI25vZGVDb250ZW50PjwvbmctdGVtcGxhdGU+JyxcbiAgc3R5bGVVcmxzOiBbJy4vbm9kZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZjTm9kZUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICBnZXQgbm9kZUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5pZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUudG9wJylcbiAgZ2V0IHRvcCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUueSArICdweCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQnKVxuICBnZXQgbGVmdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUueCArICdweCc7XG4gIH1cblxuICBub2RlQ29tcG9uZW50OiBGY05vZGVDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZCgnbm9kZUNvbnRlbnQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgbm9kZUNvbnRlbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcpIHByaXZhdGUgbm9kZUNvbXBvbmVudENvbmZpZzogRmNOb2RlQ29tcG9uZW50Q29uZmlnLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudXNlck5vZGVDYWxsYmFja3MpIHtcbiAgICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCA9IHRoaXMudXNlck5vZGVDYWxsYmFja3Mubm9kZUVkaXQgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5kb3VibGVDbGljayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VEb3duID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZURvd24gfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRW50ZXIgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRW50ZXIgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlTGVhdmUgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlTGVhdmUgfHwgKCgpID0+IHt9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5ub2RlQ2xhc3MpO1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICBlbGVtZW50LmF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgdGhpcy5tb2RlbHNlcnZpY2Uubm9kZXMuc2V0SHRtbEVsZW1lbnQodGhpcy5ub2RlLmlkLCBlbGVtZW50WzBdKTtcbiAgICB0aGlzLm5vZGVDb250ZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubm9kZUNvbXBvbmVudENvbmZpZy5ub2RlQ29tcG9uZW50VHlwZSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5ub2RlQ29udGVudENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5jYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrcztcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudXNlck5vZGVDYWxsYmFja3MgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5ub2RlID0gdGhpcy5ub2RlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5tb2RlbHNlcnZpY2UgPSB0aGlzLm1vZGVsc2VydmljZTtcbiAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC53aWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5oZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IHVwZGF0ZU5vZGUgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKGNoYW5nZXMpKSB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghY2hhbmdlLmZpcnN0Q2hhbmdlICYmIGNoYW5nZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIGlmIChbJ3NlbGVjdGVkJywgJ2VkaXQnLCAndW5kZXJNb3VzZScsICdtb3VzZU92ZXJDb25uZWN0b3InLCAnZHJhZ2dpbmcnXS5pbmNsdWRlcyhwcm9wTmFtZSkpIHtcbiAgICAgICAgICB1cGRhdGVOb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlTm9kZSkge1xuICAgICAgdGhpcy51cGRhdGVOb2RlQ2xhc3MoKTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNvbXBvbmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTm9kZUNsYXNzKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5zZWxlY3RlZENsYXNzLCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5lZGl0Q2xhc3MsIHRoaXMuZWRpdCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuaG92ZXJDbGFzcywgdGhpcy51bmRlck1vdXNlKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5kcmFnZ2luZ0NsYXNzLCB0aGlzLmRyYWdnaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTm9kZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5lZGl0ID0gdGhpcy5lZGl0O1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC51bmRlck1vdXNlID0gdGhpcy51bmRlck1vdXNlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5tb3VzZU92ZXJDb25uZWN0b3IgPSB0aGlzLm1vdXNlT3ZlckNvbm5lY3RvcjtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZHJhZ2dpbmcgPSB0aGlzLmRyYWdnaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVDbGFzcyhlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBjbGF6ejogc3RyaW5nLCBzZXQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoc2V0KSB7XG4gICAgICBlbGVtZW50LmFkZENsYXNzKGNsYXp6KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbGF6eik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlRHJhZ3N0YXJ0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxuICBkcmFnZW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZURyYWdlbmQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZUNsaWNrZWQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSlcbiAgbW91c2VvdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVNb3VzZU92ZXIoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLCBbJyRldmVudCddKVxuICBtb3VzZW91dChldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlTW91c2VPdXQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmNOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgd2lkdGg6IG51bWJlcjtcblxuICBoZWlnaHQ6IG51bWJlcjtcblxuICBub2RlUmVjdEluZm86IEZjTm9kZVJlY3RJbmZvID0ge1xuICAgIHRvcDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS55O1xuICAgIH0sXG5cbiAgICBsZWZ0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLng7XG4gICAgfSxcblxuICAgIGJvdHRvbTogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS55ICsgdGhpcy5oZWlnaHQ7XG4gICAgfSxcblxuICAgIHJpZ2h0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnggKyB0aGlzLndpZHRoO1xuICAgIH0sXG5cbiAgICB3aWR0aDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gICAgfSxcblxuICAgIGhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=