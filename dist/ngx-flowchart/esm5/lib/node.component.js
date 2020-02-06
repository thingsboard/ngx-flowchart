/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ElementRef, HostBinding, HostListener, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FC_NODE_COMPONENT_CONFIG, FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
var FcNodeContainerComponent = /** @class */ (function () {
    function FcNodeContainerComponent(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    Object.defineProperty(FcNodeContainerComponent.prototype, "nodeId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "top", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.y + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcNodeContainerComponent.prototype, "left", {
        get: /**
         * @return {?}
         */
        function () {
            return this.node.x + 'px';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FcNodeContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || ((/**
         * @return {?}
         */
        function () { }));
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || ((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        /** @type {?} */
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
    /**
     * @return {?}
     */
    FcNodeContainerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FcNodeContainerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var e_1, _a;
        /** @type {?} */
        var updateNode = false;
        try {
            for (var _b = tslib_1.__values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
                /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    FcNodeContainerComponent.prototype.updateNodeClass = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    };
    /**
     * @private
     * @return {?}
     */
    FcNodeContainerComponent.prototype.updateNodeComponent = /**
     * @private
     * @return {?}
     */
    function () {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    };
    /**
     * @private
     * @param {?} element
     * @param {?} clazz
     * @param {?} set
     * @return {?}
     */
    FcNodeContainerComponent.prototype.toggleClass = /**
     * @private
     * @param {?} element
     * @param {?} clazz
     * @param {?} set
     * @return {?}
     */
    function (element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.dragstart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.mouseover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeContainerComponent.prototype.mouseout = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    };
    FcNodeContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-node',
                    template: '<ng-template #nodeContent></ng-template>',
                    styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}"]
                }] }
    ];
    /** @nocollapse */
    FcNodeContainerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FC_NODE_COMPONENT_CONFIG,] }] },
        { type: ElementRef },
        { type: ComponentFactoryResolver }
    ]; };
    FcNodeContainerComponent.propDecorators = {
        callbacks: [{ type: Input }],
        userNodeCallbacks: [{ type: Input }],
        node: [{ type: Input }],
        selected: [{ type: Input }],
        edit: [{ type: Input }],
        underMouse: [{ type: Input }],
        mouseOverConnector: [{ type: Input }],
        modelservice: [{ type: Input }],
        dragging: [{ type: Input }],
        nodeId: [{ type: HostBinding, args: ['attr.id',] }],
        top: [{ type: HostBinding, args: ['style.top',] }],
        left: [{ type: HostBinding, args: ['style.left',] }],
        nodeContentContainer: [{ type: ViewChild, args: ['nodeContent', { read: ViewContainerRef, static: true },] }],
        mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        dragstart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
        dragend: [{ type: HostListener, args: ['dragend', ['$event'],] }],
        click: [{ type: HostListener, args: ['click', ['$event'],] }],
        mouseover: [{ type: HostListener, args: ['mouseover', ['$event'],] }],
        mouseout: [{ type: HostListener, args: ['mouseout', ['$event'],] }]
    };
    return FcNodeContainerComponent;
}());
export { FcNodeContainerComponent };
if (false) {
    /** @type {?} */
    FcNodeContainerComponent.prototype.callbacks;
    /** @type {?} */
    FcNodeContainerComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    FcNodeContainerComponent.prototype.node;
    /** @type {?} */
    FcNodeContainerComponent.prototype.selected;
    /** @type {?} */
    FcNodeContainerComponent.prototype.edit;
    /** @type {?} */
    FcNodeContainerComponent.prototype.underMouse;
    /** @type {?} */
    FcNodeContainerComponent.prototype.mouseOverConnector;
    /** @type {?} */
    FcNodeContainerComponent.prototype.modelservice;
    /** @type {?} */
    FcNodeContainerComponent.prototype.dragging;
    /** @type {?} */
    FcNodeContainerComponent.prototype.nodeComponent;
    /** @type {?} */
    FcNodeContainerComponent.prototype.nodeContentContainer;
    /**
     * @type {?}
     * @private
     */
    FcNodeContainerComponent.prototype.nodeComponentConfig;
    /**
     * @type {?}
     * @private
     */
    FcNodeContainerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    FcNodeContainerComponent.prototype.componentFactoryResolver;
}
/**
 * @abstract
 */
var FcNodeComponent = /** @class */ (function () {
    function FcNodeComponent() {
        var _this = this;
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: (/**
             * @return {?}
             */
            function () {
                return _this.node.y;
            }),
            left: (/**
             * @return {?}
             */
            function () {
                return _this.node.x;
            }),
            bottom: (/**
             * @return {?}
             */
            function () {
                return _this.node.y + _this.height;
            }),
            right: (/**
             * @return {?}
             */
            function () {
                return _this.node.x + _this.width;
            }),
            width: (/**
             * @return {?}
             */
            function () {
                return _this.width;
            }),
            height: (/**
             * @return {?}
             */
            function () {
                return _this.height;
            })
        };
    }
    /**
     * @return {?}
     */
    FcNodeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    FcNodeComponent.propDecorators = {
        callbacks: [{ type: Input }],
        userNodeCallbacks: [{ type: Input }],
        node: [{ type: Input }],
        selected: [{ type: Input }],
        edit: [{ type: Input }],
        underMouse: [{ type: Input }],
        mouseOverConnector: [{ type: Input }],
        modelservice: [{ type: Input }],
        dragging: [{ type: Input }]
    };
    return FcNodeComponent;
}());
export { FcNodeComponent };
if (false) {
    /** @type {?} */
    FcNodeComponent.prototype.callbacks;
    /** @type {?} */
    FcNodeComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    FcNodeComponent.prototype.node;
    /** @type {?} */
    FcNodeComponent.prototype.selected;
    /** @type {?} */
    FcNodeComponent.prototype.edit;
    /** @type {?} */
    FcNodeComponent.prototype.underMouse;
    /** @type {?} */
    FcNodeComponent.prototype.mouseOverConnector;
    /** @type {?} */
    FcNodeComponent.prototype.modelservice;
    /** @type {?} */
    FcNodeComponent.prototype.dragging;
    /** @type {?} */
    FcNodeComponent.prototype.flowchartConstants;
    /** @type {?} */
    FcNodeComponent.prototype.width;
    /** @type {?} */
    FcNodeComponent.prototype.height;
    /** @type {?} */
    FcNodeComponent.prototype.nodeRectInfo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsVUFBVSxFQUFFLFdBQVcsRUFDdkIsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBS3hCLGtCQUFrQixFQUVuQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRDtJQXFERSxrQ0FBc0QsbUJBQTBDLEVBQzVFLFVBQW1DLEVBQ25DLHdCQUFrRDtRQUZoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXVCO1FBQzVFLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFDdEUsQ0FBQztJQXRCRCxzQkFDSSw0Q0FBTTs7OztRQURWO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUNJLHlDQUFHOzs7O1FBRFA7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUNJLDBDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7OztJQVdELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUNELElB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QUM7WUFDckIsQ0FBQyxDQUFBO1NBQ0YsQ0FBQztJQUtKLENBQUM7Ozs7SUFIQyxrQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs0QkE1REEsS0FBSztvQ0FHTCxLQUFLO3VCQUdMLEtBQUs7MkJBR0wsS0FBSzt1QkFHTCxLQUFLOzZCQUdMLEtBQUs7cUNBR0wsS0FBSzsrQkFHTCxLQUFLOzJCQUdMLEtBQUs7O0lBc0NSLHNCQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0FoRXFCLGVBQWU7OztJQUVuQyxvQ0FDdUI7O0lBRXZCLDRDQUNxQzs7SUFFckMsK0JBQ2E7O0lBRWIsbUNBQ2tCOztJQUVsQiwrQkFDYzs7SUFFZCxxQ0FDb0I7O0lBRXBCLDZDQUNnQzs7SUFFaEMsdUNBQzZCOztJQUU3QixtQ0FDa0I7O0lBRWxCLDZDQUF3Qzs7SUFFeEMsZ0NBQWM7O0lBRWQsaUNBQWU7O0lBRWYsdUNBd0JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRyxcbiAgRmNDYWxsYmFja3MsXG4gIEZjQ29ubmVjdG9yLFxuICBGY05vZGUsXG4gIEZjTm9kZUNvbXBvbmVudENvbmZpZywgRmNOb2RlUmVjdEluZm8sXG4gIEZsb3djaGFydENvbnN0YW50cyxcbiAgVXNlck5vZGVDYWxsYmFja3Ncbn0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLW5vZGUnLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZSAjbm9kZUNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICBzdHlsZVVybHM6IFsnLi9ub2RlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGU6IEZjTm9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBlZGl0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHVuZGVyTW91c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpXG4gIGdldCBub2RlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS50b3AnKVxuICBnZXQgdG9wKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS55ICsgJ3B4JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubGVmdCcpXG4gIGdldCBsZWZ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS54ICsgJ3B4JztcbiAgfVxuXG4gIG5vZGVDb21wb25lbnQ6IEZjTm9kZUNvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdub2RlQ29udGVudCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBub2RlQ29udGVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRykgcHJpdmF0ZSBub2RlQ29tcG9uZW50Q29uZmlnOiBGY05vZGVDb21wb25lbnRDb25maWcsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy51c2VyTm9kZUNhbGxiYWNrcykge1xuICAgICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0ID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2sgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZURvd24gPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRG93biB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VFbnRlciA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VFbnRlciB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VMZWF2ZSA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VMZWF2ZSB8fCAoKCkgPT4ge30pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLm5vZGVDbGFzcyk7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIGVsZW1lbnQuYXR0cignZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVOb2RlQ2xhc3MoKTtcbiAgICB0aGlzLm1vZGVsc2VydmljZS5ub2Rlcy5zZXRIdG1sRWxlbWVudCh0aGlzLm5vZGUuaWQsIGVsZW1lbnRbMF0pO1xuICAgIHRoaXMubm9kZUNvbnRlbnRDb250YWluZXIuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5ub2RlQ29tcG9uZW50Q29uZmlnLm5vZGVDb21wb25lbnRUeXBlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLm5vZGVDb250ZW50Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC51c2VyTm9kZUNhbGxiYWNrcyA9IHRoaXMudXNlck5vZGVDYWxsYmFja3M7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm5vZGUgPSB0aGlzLm5vZGU7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm1vZGVsc2VydmljZSA9IHRoaXMubW9kZWxzZXJ2aWNlO1xuICAgIHRoaXMudXBkYXRlTm9kZUNvbXBvbmVudCgpO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC53aWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5oZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LndpZHRoID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgdXBkYXRlTm9kZSA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgT2JqZWN0LmtleXMoY2hhbmdlcykpIHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFjaGFuZ2UuZmlyc3RDaGFuZ2UgJiYgY2hhbmdlLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgaWYgKFsnc2VsZWN0ZWQnLCAnZWRpdCcsICd1bmRlck1vdXNlJywgJ21vdXNlT3ZlckNvbm5lY3RvcicsICdkcmFnZ2luZyddLmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgICAgIHVwZGF0ZU5vZGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh1cGRhdGVOb2RlKSB7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVDbGFzcygpO1xuICAgICAgdGhpcy51cGRhdGVOb2RlQ29tcG9uZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVOb2RlQ2xhc3MoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLnNlbGVjdGVkQ2xhc3MsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmVkaXRDbGFzcywgdGhpcy5lZGl0KTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzLCB0aGlzLnVuZGVyTW91c2UpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdnaW5nQ2xhc3MsIHRoaXMuZHJhZ2dpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVOb2RlQ29tcG9uZW50KCkge1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmVkaXQgPSB0aGlzLmVkaXQ7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnVuZGVyTW91c2UgPSB0aGlzLnVuZGVyTW91c2U7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm1vdXNlT3ZlckNvbm5lY3RvciA9IHRoaXMubW91c2VPdmVyQ29ubmVjdG9yO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5kcmFnZ2luZyA9IHRoaXMuZHJhZ2dpbmc7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUNsYXNzKGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNsYXp6OiBzdHJpbmcsIHNldDogYm9vbGVhbikge1xuICAgIGlmIChzZXQpIHtcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoY2xhenopO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKGNsYXp6KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gIGRyYWdzdGFydChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnc3RhcnQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlRHJhZ2VuZChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlQ2xpY2tlZChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW92ZXInLCBbJyRldmVudCddKVxuICBtb3VzZW92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3ZlcihldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3V0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVNb3VzZU91dChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmNOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgd2lkdGg6IG51bWJlcjtcblxuICBoZWlnaHQ6IG51bWJlcjtcblxuICBub2RlUmVjdEluZm86IEZjTm9kZVJlY3RJbmZvID0ge1xuICAgIHRvcDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS55O1xuICAgIH0sXG5cbiAgICBsZWZ0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLng7XG4gICAgfSxcblxuICAgIGJvdHRvbTogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS55ICsgdGhpcy5oZWlnaHQ7XG4gICAgfSxcblxuICAgIHJpZ2h0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnggKyB0aGlzLndpZHRoO1xuICAgIH0sXG5cbiAgICB3aWR0aDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gICAgfSxcblxuICAgIGhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=