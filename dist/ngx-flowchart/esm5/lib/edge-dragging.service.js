/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FlowchartConstants, ModelvalidationError } from './ngx-flowchart.models';
var FcEdgeDraggingService = /** @class */ (function () {
    function FcEdgeDraggingService(modelValidation, edgeDrawingService, modelService, model, isValidEdgeCallback, applyFunction, dragAnimation, edgeStyle) {
        this.edgeDragging = {
            isDragging: false,
            dragPoint1: null,
            dragPoint2: null,
            shadowDragStarted: false
        };
        this.draggedEdgeSource = null;
        this.dragOffset = {};
        this.destinationHtmlElement = null;
        this.oldDisplayStyle = '';
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.modelService = modelService;
        this.model = model;
        this.isValidEdgeCallback = isValidEdgeCallback || ((/**
         * @return {?}
         */
        function () { return true; }));
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragstart = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var e_1, _a;
        var _this = this;
        /** @type {?} */
        var swapConnector;
        /** @type {?} */
        var dragLabel;
        /** @type {?} */
        var prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            var _loop_1 = function (edge) {
                if (edge === connector.id) {
                    swapConnector = this_1.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this_1.applyFunction((/**
                     * @return {?}
                     */
                    function () {
                        _this.modelService.edges.delete(edge);
                    }));
                    return "break";
                }
            };
            var this_1 = this;
            try {
                for (var _b = tslib_1.__values(this.model.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var edge = _c.value;
                    var state_1 = _loop_1(edge);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.edgeDragging.isDragging = true;
        if (swapConnector !== undefined) {
            this.draggedEdgeSource = swapConnector;
            this.edgeDragging.dragPoint1 = this.modelService.connectors.getCenteredCoord(swapConnector.id);
            this.edgeDragging.dragLabel = dragLabel;
            this.edgeDragging.prevEdge = prevEdge;
        }
        else {
            this.draggedEdgeSource = connector;
            this.edgeDragging.dragPoint1 = this.modelService.connectors.getCenteredCoord(connector.id);
        }
        /** @type {?} */
        var canvas = this.modelService.canvasHtmlElement;
        if (!canvas) {
            throw new Error('No canvas while edgedraggingService found.');
        }
        this.dragOffset.x = -canvas.getBoundingClientRect().left;
        this.dragOffset.y = -canvas.getBoundingClientRect().top;
        this.edgeDragging.dragPoint2 = {
            x: event.clientX + this.dragOffset.x,
            y: event.clientY + this.dragOffset.y
        };
        /** @type {?} */
        var originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        originalEvent.dataTransfer.setData('Text', 'Just to support firefox');
        if (originalEvent.dataTransfer.setDragImage) {
            originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
        }
        else {
            this.destinationHtmlElement = (/** @type {?} */ (event.target));
            this.oldDisplayStyle = this.destinationHtmlElement.style.display;
            this.destinationHtmlElement.style.display = 'none';
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                this.edgeDragging.shadowDragStarted = true;
            }
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.edgeDragging.gElement === undefined) {
                this.edgeDragging.gElement = $(document.querySelectorAll('.shadow-svg-class'));
                this.edgeDragging.pathElement = $(document.querySelectorAll('.shadow-svg-class')).find('path');
                this.edgeDragging.circleElement = $(document.querySelectorAll('.shadow-svg-class')).find('circle');
            }
            this.edgeDragging.gElement.css('display', 'block');
            this.edgeDragging.pathElement.attr('d', this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
            this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
            this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
        }
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction((/**
                     * @return {?}
                     */
                    function () {
                        _this.edgeDragging.shadowDragStarted = false;
                    }));
                }
                this.edgeDragging.dragPoint2 = {
                    x: event.clientX + this.dragOffset.x,
                    y: event.clientY + this.dragOffset.y
                };
                this.edgeDragging.pathElement.attr('d', this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
                this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
                this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
            }
            else if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
                return this.applyFunction((/**
                 * @return {?}
                 */
                function () {
                    if (_this.destinationHtmlElement !== null) {
                        _this.destinationHtmlElement.style.display = _this.oldDisplayStyle;
                    }
                    _this.edgeDragging.dragPoint2 = {
                        x: event.clientX + _this.dragOffset.x,
                        y: event.clientY + _this.dragOffset.y
                    };
                }));
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragoverConnector = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        if (this.edgeDragging.isDragging) {
            this.dragover(event);
            try {
                this.modelValidation.validateEdges(this.model.edges.concat([{
                        source: this.draggedEdgeSource.id,
                        destination: connector.id
                    }]), this.model.nodes);
            }
            catch (error) {
                if (error instanceof ModelvalidationError) {
                    return true;
                }
                else {
                    throw error;
                }
            }
            if (this.isValidEdgeCallback(this.draggedEdgeSource, connector)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragleaveMagnet = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.edgeDragging.magnetActive = false;
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragoverMagnet = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var _this = this;
        if (this.edgeDragging.isDragging) {
            this.dragover(event);
            try {
                this.modelValidation.validateEdges(this.model.edges.concat([{
                        source: this.draggedEdgeSource.id,
                        destination: connector.id
                    }]), this.model.nodes);
            }
            catch (error) {
                if (error instanceof ModelvalidationError) {
                    return true;
                }
                else {
                    throw error;
                }
            }
            if (this.isValidEdgeCallback(this.draggedEdgeSource, connector)) {
                if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                    this.edgeDragging.magnetActive = true;
                    this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
                    this.edgeDragging.pathElement.attr('d', this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
                    this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
                    this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                else if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
                    return this.applyFunction((/**
                     * @return {?}
                     */
                    function () {
                        _this.edgeDragging.dragPoint2 = _this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }));
                }
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcEdgeDraggingService.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.edgeDragging.isDragging) {
            this.edgeDragging.isDragging = false;
            this.edgeDragging.dragPoint1 = null;
            this.edgeDragging.dragPoint2 = null;
            this.edgeDragging.dragLabel = null;
            event.stopPropagation();
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                this.edgeDragging.gElement.css('display', 'none');
            }
            if (this.edgeDragging.prevEdge) {
                /** @type {?} */
                var edge_1 = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction((/**
                 * @return {?}
                 */
                function () {
                    _this.modelService.edges.putEdge(edge_1);
                }));
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} targetConnector
     * @return {?}
     */
    FcEdgeDraggingService.prototype.drop = /**
     * @param {?} event
     * @param {?} targetConnector
     * @return {?}
     */
    function (event, targetConnector) {
        if (this.edgeDragging.isDragging) {
            try {
                this.modelValidation.validateEdges(this.model.edges.concat([{
                        source: this.draggedEdgeSource.id,
                        destination: targetConnector.id
                    }]), this.model.nodes);
            }
            catch (error) {
                if (error instanceof ModelvalidationError) {
                    return true;
                }
                else {
                    throw error;
                }
            }
            if (this.isValidEdgeCallback(this.draggedEdgeSource, targetConnector)) {
                this.edgeDragging.prevEdge = null;
                this.modelService.edges._addEdge(event, this.draggedEdgeSource, targetConnector, this.edgeDragging.dragLabel);
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    };
    return FcEdgeDraggingService;
}());
export { FcEdgeDraggingService };
if (false) {
    /** @type {?} */
    FcEdgeDraggingService.prototype.edgeDragging;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.draggedEdgeSource;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.dragOffset;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.destinationHtmlElement;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.oldDisplayStyle;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.modelValidation;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.edgeDrawingService;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.modelService;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.model;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.isValidEdgeCallback;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.applyFunction;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.dragAnimation;
    /**
     * @type {?}
     * @private
     */
    FcEdgeDraggingService.prototype.edgeStyle;
}
/**
 * @record
 */
export function EdgeDragging() { }
if (false) {
    /** @type {?} */
    EdgeDragging.prototype.isDragging;
    /** @type {?} */
    EdgeDragging.prototype.shadowDragStarted;
    /** @type {?} */
    EdgeDragging.prototype.dragPoint1;
    /** @type {?} */
    EdgeDragging.prototype.dragPoint2;
    /** @type {?|undefined} */
    EdgeDragging.prototype.dragLabel;
    /** @type {?|undefined} */
    EdgeDragging.prototype.prevEdge;
    /** @type {?|undefined} */
    EdgeDragging.prototype.magnetActive;
    /** @type {?|undefined} */
    EdgeDragging.prototype.gElement;
    /** @type {?|undefined} */
    EdgeDragging.prototype.pathElement;
    /** @type {?|undefined} */
    EdgeDragging.prototype.circleElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQTBDLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFJMUg7SUF1QkUsK0JBQVksZUFBeUMsRUFDekMsa0JBQXdDLEVBQ3hDLFlBQTRCLEVBQzVCLEtBQWMsRUFDZCxtQkFBK0UsRUFDL0UsYUFBa0QsRUFDbEQsYUFBcUIsRUFDckIsU0FBaUI7UUE1QjdCLGlCQUFZLEdBQWlCO1lBQzNCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQztRQUVNLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQiwyQkFBc0IsR0FBZ0IsSUFBSSxDQUFDO1FBQzNDLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBbUIzQixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixJQUFJOzs7UUFBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksRUFBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7OztJ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QUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlHLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBblFELElBbVFDOzs7O0lBalFDLDZDQUtFOzs7OztJQUVGLGtEQUE4Qzs7Ozs7SUFDOUMsMkNBQWtDOzs7OztJQUNsQyx1REFBbUQ7Ozs7O0lBQ25ELGdEQUE2Qjs7Ozs7SUFFN0IsZ0RBQTJEOzs7OztJQUMzRCxtREFBMEQ7Ozs7O0lBQzFELDZDQUE4Qzs7Ozs7SUFDOUMsc0NBQWdDOzs7OztJQUNoQyxvREFBaUc7Ozs7O0lBQ2pHLDhDQUFvRTs7Ozs7SUFDcEUsOENBQXVDOzs7OztJQUN2QywwQ0FBbUM7Ozs7O0FBZ1ByQyxrQ0FXQzs7O0lBVkMsa0NBQW9COztJQUNwQix5Q0FBMkI7O0lBQzNCLGtDQUFxQjs7SUFDckIsa0NBQXFCOztJQUNyQixpQ0FBbUI7O0lBQ25CLGdDQUFrQjs7SUFDbEIsb0NBQXVCOztJQUN2QixnQ0FBMkI7O0lBQzNCLG1DQUE4Qjs7SUFDOUIscUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNDb25uZWN0b3IsIEZjQ29vcmRzLCBGY0VkZ2UsIEZjTW9kZWwsIEZsb3djaGFydENvbnN0YW50cywgTW9kZWx2YWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEZjRWRnZURyYWdnaW5nU2VydmljZSB7XG5cbiAgZWRnZURyYWdnaW5nOiBFZGdlRHJhZ2dpbmcgPSB7XG4gICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgZHJhZ1BvaW50MTogbnVsbCxcbiAgICBkcmFnUG9pbnQyOiBudWxsLFxuICAgIHNoYWRvd0RyYWdTdGFydGVkOiBmYWxzZVxuICB9O1xuXG4gIHByaXZhdGUgZHJhZ2dlZEVkZ2VTb3VyY2U6IEZjQ29ubmVjdG9yID0gbnVsbDtcbiAgcHJpdmF0ZSBkcmFnT2Zmc2V0OiBGY0Nvb3JkcyA9IHt9O1xuICBwcml2YXRlIGRlc3RpbmF0aW9uSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBvbGREaXNwbGF5U3R5bGUgPSAnJztcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkZ2VEcmF3aW5nU2VydmljZTogRmNFZGdlRHJhd2luZ1NlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbDogRmNNb2RlbDtcbiAgcHJpdmF0ZSByZWFkb25seSBpc1ZhbGlkRWRnZUNhbGxiYWNrOiAoc291cmNlOiBGY0Nvbm5lY3RvciwgZGVzdGluYXRpb246IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdBbmltYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBlZGdlU3R5bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWw6IEZjTW9kZWwsXG4gICAgICAgICAgICAgIGlzVmFsaWRFZGdlQ2FsbGJhY2s6IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBULFxuICAgICAgICAgICAgICBkcmFnQW5pbWF0aW9uOiBzdHJpbmcsXG4gICAgICAgICAgICAgIGVkZ2VTdHlsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24gPSBtb2RlbFZhbGlkYXRpb247XG4gICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UgPSBlZGdlRHJhd2luZ1NlcnZpY2U7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayA9IGlzVmFsaWRFZGdlQ2FsbGJhY2sgfHwgKCgpID0+IHRydWUpO1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbiA9IGFwcGx5RnVuY3Rpb247XG4gICAgdGhpcy5kcmFnQW5pbWF0aW9uID0gZHJhZ0FuaW1hdGlvbjtcbiAgICB0aGlzLmVkZ2VTdHlsZSA9IGVkZ2VTdHlsZTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnc3RhcnQoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIGxldCBzd2FwQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcbiAgICBsZXQgZHJhZ0xhYmVsOiBzdHJpbmc7XG4gICAgbGV0IHByZXZFZGdlOiBGY0VkZ2U7XG4gICAgaWYgKGNvbm5lY3Rvci50eXBlID09PSBGbG93Y2hhcnRDb25zdGFudHMubGVmdENvbm5lY3RvclR5cGUpIHtcbiAgICAgIGZvciAoY29uc3QgZWRnZSBvZiB0aGlzLm1vZGVsLmVkZ2VzKSB7XG4gICAgICAgIGlmIChlZGdlID09PSBjb25uZWN0b3IuaWQpIHtcbiAgICAgICAgICBzd2FwQ29ubmVjdG9yID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDb25uZWN0b3IoZWRnZS5zb3VyY2UpO1xuICAgICAgICAgIGRyYWdMYWJlbCA9IGVkZ2UubGFiZWw7XG4gICAgICAgICAgcHJldkVkZ2UgPSBlZGdlO1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgaWYgKHN3YXBDb25uZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSA9IHN3YXBDb25uZWN0b3I7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKHN3YXBDb25uZWN0b3IuaWQpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsID0gZHJhZ0xhYmVsO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2UgPSBwcmV2RWRnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSA9IGNvbm5lY3RvcjtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9yLmlkKTtcbiAgICB9XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgaWYgKCFjYW52YXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2FudmFzIHdoaWxlIGVkZ2VkcmFnZ2luZ1NlcnZpY2UgZm91bmQuJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhZ09mZnNldC54ID0gLWNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIHRoaXMuZHJhZ09mZnNldC55ID0gLWNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0ge1xuICAgICAgeDogZXZlbnQuY2xpZW50WCArIHRoaXMuZHJhZ09mZnNldC54LFxuICAgICAgeTogZXZlbnQuY2xpZW50WSArIHRoaXMuZHJhZ09mZnNldC55XG4gICAgfTtcbiAgICBjb25zdCBvcmlnaW5hbEV2ZW50OiBEcmFnRXZlbnQgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuXG4gICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnVGV4dCcsICdKdXN0IHRvIHN1cHBvcnQgZmlyZWZveCcpO1xuICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMub2xkRGlzcGxheVN0eWxlID0gdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnNoYWRvd0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50ID0gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhZG93LXN2Zy1jbGFzcycpKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQgPSAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFkb3ctc3ZnLWNsYXNzJykpLmZpbmQoJ3BhdGgnKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYWRvdy1zdmctY2xhc3MnKSkuZmluZCgnY2lyY2xlJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIHRoaXMuZWRnZVN0eWxlKSk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N4JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54KTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIGlmICghdGhpcy5lZGdlRHJhZ2dpbmcubWFnbmV0QWN0aXZlICYmIHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB7XG4gICAgICAgICAgeDogZXZlbnQuY2xpZW50WCArIHRoaXMuZHJhZ09mZnNldC54LFxuICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50LmF0dHIoJ2QnLFxuICAgICAgICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIHRoaXMuZWRnZVN0eWxlKSk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3gnLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLngpO1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N5JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55KTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICAgICAgICB5OiBldmVudC5jbGllbnRZICsgdGhpcy5kcmFnT2Zmc2V0LnlcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXJDb25uZWN0b3IoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdvdmVyKGV2ZW50KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXModGhpcy5tb2RlbC5lZGdlcy5jb25jYXQoW3tcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UuaWQsXG4gICAgICAgICAgZGVzdGluYXRpb246IGNvbm5lY3Rvci5pZFxuICAgICAgICB9XSksIHRoaXMubW9kZWwubm9kZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTW9kZWx2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayh0aGlzLmRyYWdnZWRFZGdlU291cmNlLCBjb25uZWN0b3IpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdsZWF2ZU1hZ25ldChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcubWFnbmV0QWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXJNYWduZXQoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdvdmVyKGV2ZW50KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXModGhpcy5tb2RlbC5lZGdlcy5jb25jYXQoW3tcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UuaWQsXG4gICAgICAgICAgZGVzdGluYXRpb246IGNvbm5lY3Rvci5pZFxuICAgICAgICB9XSksIHRoaXMubW9kZWwubm9kZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTW9kZWx2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayh0aGlzLmRyYWdnZWRFZGdlU291cmNlLCBjb25uZWN0b3IpKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG5cbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5tYWduZXRBY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3IuaWQpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50LmF0dHIoJ2QnLFxuICAgICAgICAgICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgdGhpcy5lZGdlU3R5bGUpKTtcbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N4JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54KTtcbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N5JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55KTtcblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEgPSBudWxsO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IG51bGw7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnTGFiZWwgPSBudWxsO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2UpIHtcbiAgICAgICAgY29uc3QgZWRnZSA9IHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlO1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMucHV0RWRnZShlZGdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyb3AoZXZlbnQ6IERyYWdFdmVudCwgdGFyZ2V0Q29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiB0YXJnZXRDb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayh0aGlzLmRyYWdnZWRFZGdlU291cmNlLCB0YXJnZXRDb25uZWN0b3IpKSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuX2FkZEVkZ2UoZXZlbnQsIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIHRhcmdldENvbm5lY3RvciwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFZGdlRHJhZ2dpbmcge1xuICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICBzaGFkb3dEcmFnU3RhcnRlZDogYm9vbGVhbjtcbiAgZHJhZ1BvaW50MTogRmNDb29yZHM7XG4gIGRyYWdQb2ludDI6IEZjQ29vcmRzO1xuICBkcmFnTGFiZWw/OiBzdHJpbmc7XG4gIHByZXZFZGdlPzogRmNFZGdlO1xuICBtYWduZXRBY3RpdmU/OiBib29sZWFuO1xuICBnRWxlbWVudD86IEpRdWVyeTxFbGVtZW50PjtcbiAgcGF0aEVsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG4gIGNpcmNsZUVsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG59XG4iXX0=