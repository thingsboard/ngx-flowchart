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
        this.flowchartConstants = FlowchartConstants;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsVUFBVSxFQUFFLFdBQVcsRUFDdkIsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBS3hCLGtCQUFrQixFQUVuQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRDtJQXFERSxrQ0FBc0QsbUJBQTBDLEVBQzVFLFVBQW1DLEVBQ25DLHdCQUFrRDtRQUZoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXVCO1FBQzVFLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFDdEUsQ0FBQztJQXRCRCxzQkFDSSw0Q0FBTTs7OztRQURWO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUNJLHlDQUFHOzs7O1FBRFA7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUNJLDBDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7OztJQVdELDJDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUNELElB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Rix1REFBb0Y7Ozs7O0lBQ3BGLDhDQUEyQzs7Ozs7SUFDM0MsNERBQTBEOzs7OztBQWlIeEU7SUFBQTtRQTZCRSx1QkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUsxQyxDQUFDOzs7O0lBSEMsa0NBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7NEJBOUJBLEtBQUs7b0NBR0wsS0FBSzt1QkFHTCxLQUFLOzJCQUdMLEtBQUs7dUJBR0wsS0FBSzs2QkFHTCxLQUFLO3FDQUdMLEtBQUs7K0JBR0wsS0FBSzsyQkFHTCxLQUFLOztJQVFSLHNCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0FsQ3FCLGVBQWU7OztJQUVuQyxvQ0FDdUI7O0lBRXZCLDRDQUNxQzs7SUFFckMsK0JBQ2E7O0lBRWIsbUNBQ2tCOztJQUVsQiwrQkFDYzs7SUFFZCxxQ0FDb0I7O0lBRXBCLDZDQUNnQzs7SUFFaEMsdUNBQzZCOztJQUU3QixtQ0FDa0I7O0lBRWxCLDZDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcsXG4gIEZjQ2FsbGJhY2tzLFxuICBGY0Nvbm5lY3RvcixcbiAgRmNOb2RlLFxuICBGY05vZGVDb21wb25lbnRDb25maWcsXG4gIEZsb3djaGFydENvbnN0YW50cyxcbiAgVXNlck5vZGVDYWxsYmFja3Ncbn0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLW5vZGUnLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZSAjbm9kZUNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICBzdHlsZVVybHM6IFsnLi9ub2RlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGU6IEZjTm9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBlZGl0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHVuZGVyTW91c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpXG4gIGdldCBub2RlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS50b3AnKVxuICBnZXQgdG9wKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS55ICsgJ3B4JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubGVmdCcpXG4gIGdldCBsZWZ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS54ICsgJ3B4JztcbiAgfVxuXG4gIG5vZGVDb21wb25lbnQ6IEZjTm9kZUNvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdub2RlQ29udGVudCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBub2RlQ29udGVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRykgcHJpdmF0ZSBub2RlQ29tcG9uZW50Q29uZmlnOiBGY05vZGVDb21wb25lbnRDb25maWcsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy51c2VyTm9kZUNhbGxiYWNrcykge1xuICAgICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0ID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2sgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrIHx8ICgoKSA9PiB7fSk7XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZURvd24gPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRG93biB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VFbnRlciA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VFbnRlciB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VMZWF2ZSA9IHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VMZWF2ZSB8fCAoKCkgPT4ge30pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLm5vZGVDbGFzcyk7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIGVsZW1lbnQuYXR0cignZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVOb2RlQ2xhc3MoKTtcbiAgICB0aGlzLm1vZGVsc2VydmljZS5ub2Rlcy5zZXRIdG1sRWxlbWVudCh0aGlzLm5vZGUuaWQsIGVsZW1lbnRbMF0pO1xuICAgIHRoaXMubm9kZUNvbnRlbnRDb250YWluZXIuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5ub2RlQ29tcG9uZW50Q29uZmlnLm5vZGVDb21wb25lbnRUeXBlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLm5vZGVDb250ZW50Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC51c2VyTm9kZUNhbGxiYWNrcyA9IHRoaXMudXNlck5vZGVDYWxsYmFja3M7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm5vZGUgPSB0aGlzLm5vZGU7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50Lm1vZGVsc2VydmljZSA9IHRoaXMubW9kZWxzZXJ2aWNlO1xuICAgIHRoaXMudXBkYXRlTm9kZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCB1cGRhdGVOb2RlID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhjaGFuZ2VzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWNoYW5nZS5maXJzdENoYW5nZSAmJiBjaGFuZ2UuY3VycmVudFZhbHVlICE9PSBjaGFuZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBpZiAoWydzZWxlY3RlZCcsICdlZGl0JywgJ3VuZGVyTW91c2UnLCAnbW91c2VPdmVyQ29ubmVjdG9yJywgJ2RyYWdnaW5nJ10uaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgdXBkYXRlTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwZGF0ZU5vZGUpIHtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDbGFzcygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuc2VsZWN0ZWRDbGFzcywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZWRpdENsYXNzLCB0aGlzLmVkaXQpO1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoZWxlbWVudCwgRmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MsIHRoaXMudW5kZXJNb3VzZSk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ2dpbmdDbGFzcywgdGhpcy5kcmFnZ2luZyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5vZGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZWRpdCA9IHRoaXMuZWRpdDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudW5kZXJNb3VzZSA9IHRoaXMudW5kZXJNb3VzZTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQubW91c2VPdmVyQ29ubmVjdG9yID0gdGhpcy5tb3VzZU92ZXJDb25uZWN0b3I7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50LmRyYWdnaW5nID0gdGhpcy5kcmFnZ2luZztcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ2xhc3MoZWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgY2xheno6IHN0cmluZywgc2V0OiBib29sZWFuKSB7XG4gICAgaWYgKHNldCkge1xuICAgICAgZWxlbWVudC5hZGRDbGFzcyhjbGF6eik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoY2xhenopO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgZHJhZ3N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZURyYWdzdGFydChldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgZHJhZ2VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVDbGlja2VkKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlTW91c2VPdmVyKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JywgWyckZXZlbnQnXSlcbiAgbW91c2VvdXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3V0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGY05vZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGU6IEZjTm9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBlZGl0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHVuZGVyTW91c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gIGZsb3djaGFydENvbnN0YW50cyA9IEZsb3djaGFydENvbnN0YW50cztcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=