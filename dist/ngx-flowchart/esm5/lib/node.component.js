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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCx3QkFBd0IsRUFBRSxTQUFTLEVBQ25DLFVBQVUsRUFBRSxXQUFXLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxFQUNiLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLHdCQUF3QixFQUt4QixrQkFBa0IsRUFFbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPakQ7SUFnREUsa0NBQXNELG1CQUEwQyxFQUM1RSxVQUFtQyxFQUNuQyx3QkFBa0Q7UUFGaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1QjtRQUM1RSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQ3RFLENBQUM7SUFyQkQsc0JBQUksNENBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSx5Q0FBRzthQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSwwQ0FBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFXRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJB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QUFJLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUM7WUFDbkMsQ0FBQztZQUVELEtBQUssRUFBRTtnQkFDTCxPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsQ0FBQztZQUVELEtBQUssRUFBRTtnQkFDTCxPQUFPLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEIsQ0FBQztZQUVELE1BQU0sRUFBRTtnQkFDTixPQUFPLEtBQUksQ0FBQyxNQUFNLENBQUM7WUFDckIsQ0FBQztTQUNGLENBQUM7SUFLSixDQUFDO0lBSEMsa0NBQVEsR0FBUjtJQUNBLENBQUM7SUEzREQ7UUFEQyxLQUFLLEVBQUU7O3NEQUNlO0lBR3ZCO1FBREMsS0FBSyxFQUFFOzs4REFDNkI7SUFHckM7UUFEQyxLQUFLLEVBQUU7O2lEQUNLO0lBR2I7UUFEQyxLQUFLLEVBQUU7O3FEQUNVO0lBR2xCO1FBREMsS0FBSyxFQUFFOztpREFDTTtJQUdkO1FBREMsS0FBSyxFQUFFOzt1REFDWTtJQUdwQjtRQURDLEtBQUssRUFBRTs7K0RBQ3dCO0lBR2hDO1FBREMsS0FBSyxFQUFFO2tDQUNNLGNBQWM7eURBQUM7SUFHN0I7UUFEQyxLQUFLLEVBQUU7O3FEQUNVO0lBM0JFLGVBQWU7UUFEcEMsU0FBUyxFQUFFO09BQ1UsZUFBZSxDQWdFcEM7SUFBRCxzQkFBQztDQUFBLEFBaEVELElBZ0VDO1NBaEVxQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRyxcbiAgRmNDYWxsYmFja3MsXG4gIEZjQ29ubmVjdG9yLFxuICBGY05vZGUsXG4gIEZjTm9kZUNvbXBvbmVudENvbmZpZywgRmNOb2RlUmVjdEluZm8sXG4gIEZsb3djaGFydENvbnN0YW50cyxcbiAgVXNlck5vZGVDYWxsYmFja3Ncbn0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLW5vZGUnLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZSAjbm9kZUNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICBzdHlsZVVybHM6IFsnLi9ub2RlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGU6IEZjTm9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBlZGl0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHVuZGVyTW91c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpXG4gIGdldCBub2RlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS50b3AnKVxuICBnZXQgdG9wKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS55ICsgJ3B4JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubGVmdCcpXG4gIGdldCBsZWZ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS54ICsgJ3B4JztcbiAgfVxuXG4gIG5vZGVDb21wb25lbnQ6IEZjTm9kZUNvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdub2RlQ29udGVudCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBub2RlQ29udGVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRykgcHJpdmF0ZSBub2RlQ29tcG9uZW50Q29uZmlnOiBGY05vZGVDb21wb25lbnRDb25maWcsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy51c2VyTm9kZUNhbGxiYWNrcykge1xuICAgICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0ID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2sgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZURvd24gPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRG93biB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VFbnRlciA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VFbnRlciB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VMZWF2ZSA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VMZWF2ZSB8fCAoKCkgPT4ge30pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLm5vZGVDbGFzcyk7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIGVsZW1lbnQuYXR0cignZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVOb2RlQ2xhc3MoKTtcbiAgICB0aGlzLm1vZGVsc2VydmljZS5ub2Rlcy5zZXRIdG1sRWxlbWVudCh0aGlzLm5vZGUuaWQsIGVsZW1lbnRbMF0pO1xuICAgIHRoaXMubm9kZUNvbnRlbnRDb250YWluZXIuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5ub2RlQ29tcG9uZW50Q29uZmlnLm5vZGVDb21wb25lbnRUeXBlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLm5vZGVDb250ZW50Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC51c2VyTm9kZUNhbGxiYWNrcyA9IHRoaXMudXNlck5vZGVDYWxsYmFja3M7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm5vZGUgPSB0aGlzLm5vZGU7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm1vZGVsc2VydmljZSA9IHRoaXMubW9kZWxzZXJ2aWNlO1xuICAgIHRoaXMudXBkYXRlTm9kZUNvbXBvbmVudCgpO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC53aWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5oZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LndpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlTm9kZSA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgT2JqZWN0LmtleXMoY2hhbmdlcykpIHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFjaGFuZ2UuZmlyc3RDaGFuZ2UgJiYgY2hhbmdlLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgaWYgKFsnc2VsZWN0ZWQnLCAnZWRpdCcsICd1bmRlck1vdXNlJywgJ21vdXNlT3ZlckNvbm5lY3RvcicsICdkcmFnZ2luZyddLmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgICAgIHVwZGF0ZU5vZGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh1cGRhdGVOb2RlKSB7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVDbGFzcygpO1xuICAgICAgdGhpcy51cGRhdGVOb2RlQ29tcG9uZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVOb2RlQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLnNlbGVjdGVkQ2xhc3MsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmVkaXRDbGFzcywgdGhpcy5lZGl0KTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzLCB0aGlzLnVuZGVyTW91c2UpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdnaW5nQ2xhc3MsIHRoaXMuZHJhZ2dpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVOb2RlQ29tcG9uZW50KCkge1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmVkaXQgPSB0aGlzLmVkaXQ7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnVuZGVyTW91c2UgPSB0aGlzLnVuZGVyTW91c2U7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm1vdXNlT3ZlckNvbm5lY3RvciA9IHRoaXMubW91c2VPdmVyQ29ubmVjdG9yO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5kcmFnZ2luZyA9IHRoaXMuZHJhZ2dpbmc7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUNsYXNzKGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNsYXp6OiBzdHJpbmcsIHNldDogYm9vbGVhbikge1xuICAgIGlmIChzZXQpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xhenopO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNsYXp6KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gIGRyYWdzdGFydChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZURyYWdzdGFydChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgZHJhZ2VuZChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZURyYWdlbmQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZUNsaWNrZWQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSlcbiAgbW91c2VvdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVNb3VzZU92ZXIoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLCBbJyRldmVudCddKVxuICBtb3VzZW91dChldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlTW91c2VPdXQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmNOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgd2lkdGg6IG51bWJlcjtcblxuICBoZWlnaHQ6IG51bWJlcjtcblxuICBub2RlUmVjdEluZm86IEZjTm9kZVJlY3RJbmZvID0ge1xuICAgIHRvcDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS55O1xuICAgIH0sXG5cbiAgICBsZWZ0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLng7XG4gICAgfSxcblxuICAgIGJvdHRvbTogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS55ICsgdGhpcy5oZWlnaHQ7XG4gICAgfSxcblxuICAgIHJpZ2h0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnggKyB0aGlzLndpZHRoO1xuICAgIH0sXG5cbiAgICB3aWR0aDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gICAgfSxcblxuICAgIGhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=