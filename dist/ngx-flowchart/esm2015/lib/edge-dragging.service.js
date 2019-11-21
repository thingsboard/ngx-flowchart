/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FlowchartConstants, ModelvalidationError } from './ngx-flowchart.models';
export class FcEdgeDraggingService {
    /**
     * @param {?} modelValidation
     * @param {?} edgeDrawingService
     * @param {?} modelService
     * @param {?} model
     * @param {?} isValidEdgeCallback
     * @param {?} applyFunction
     * @param {?} dragAnimation
     * @param {?} edgeStyle
     */
    constructor(modelValidation, edgeDrawingService, modelService, model, isValidEdgeCallback, applyFunction, dragAnimation, edgeStyle) {
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
        () => true));
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    dragstart(event, connector) {
        /** @type {?} */
        let swapConnector;
        /** @type {?} */
        let dragLabel;
        /** @type {?} */
        let prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            for (const edge of this.model.edges) {
                if (edge.destination === connector.id) {
                    swapConnector = this.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        this.modelService.edges.delete(edge);
                    }));
                    break;
                }
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
        const canvas = this.modelService.canvasHtmlElement;
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
        const originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        this.edgeDragging.shadowDragStarted = false;
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
                () => {
                    if (this.destinationHtmlElement !== null) {
                        this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                    }
                    this.edgeDragging.dragPoint2 = {
                        x: event.clientX + this.dragOffset.x,
                        y: event.clientY + this.dragOffset.y
                    };
                }));
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    dragoverConnector(event, connector) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragleaveMagnet(event) {
        this.edgeDragging.magnetActive = false;
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    dragoverMagnet(event, connector) {
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
                    () => {
                        this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }));
                }
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
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
                const edge = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    this.modelService.edges.putEdge(edge);
                }));
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} targetConnector
     * @return {?}
     */
    drop(event, targetConnector) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBMEMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUkxSCxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7Ozs7OztJQXVCaEMsWUFBWSxlQUF5QyxFQUN6QyxrQkFBd0MsRUFDeEMsWUFBNEIsRUFDNUIsS0FBYyxFQUNkLG1CQUErRSxFQUMvRSxhQUFrRCxFQUNsRCxhQUFxQixFQUNyQixTQUFpQjtRQTVCN0IsaUJBQVksR0FBaUI7WUFDM0IsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDO1FBRU0sc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUN0QyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLDJCQUFzQixHQUFnQixJQUFJLENBQUM7UUFDM0Msb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFtQjNCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLElBQUk7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxD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QUFDO2dCQUN2QixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7OztJQWpRQyw2Q0FLRTs7Ozs7SUFFRixrREFBOEM7Ozs7O0lBQzlDLDJDQUFrQzs7Ozs7SUFDbEMsdURBQW1EOzs7OztJQUNuRCxnREFBNkI7Ozs7O0lBRTdCLGdEQUEyRDs7Ozs7SUFDM0QsbURBQTBEOzs7OztJQUMxRCw2Q0FBOEM7Ozs7O0lBQzlDLHNDQUFnQzs7Ozs7SUFDaEMsb0RBQWlHOzs7OztJQUNqRyw4Q0FBb0U7Ozs7O0lBQ3BFLDhDQUF1Qzs7Ozs7SUFDdkMsMENBQW1DOzs7OztBQWdQckMsa0NBV0M7OztJQVZDLGtDQUFvQjs7SUFDcEIseUNBQTJCOztJQUMzQixrQ0FBcUI7O0lBQ3JCLGtDQUFxQjs7SUFDckIsaUNBQW1COztJQUNuQixnQ0FBa0I7O0lBQ2xCLG9DQUF1Qjs7SUFDdkIsZ0NBQTJCOztJQUMzQixtQ0FBOEI7O0lBQzlCLHFDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjQ29ubmVjdG9yLCBGY0Nvb3JkcywgRmNFZGdlLCBGY01vZGVsLCBGbG93Y2hhcnRDb25zdGFudHMsIE1vZGVsdmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY0VkZ2VEcmF3aW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmF3aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2Uge1xuXG4gIGVkZ2VEcmFnZ2luZzogRWRnZURyYWdnaW5nID0ge1xuICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgIGRyYWdQb2ludDE6IG51bGwsXG4gICAgZHJhZ1BvaW50MjogbnVsbCxcbiAgICBzaGFkb3dEcmFnU3RhcnRlZDogZmFsc2VcbiAgfTtcblxuICBwcml2YXRlIGRyYWdnZWRFZGdlU291cmNlOiBGY0Nvbm5lY3RvciA9IG51bGw7XG4gIHByaXZhdGUgZHJhZ09mZnNldDogRmNDb29yZHMgPSB7fTtcbiAgcHJpdmF0ZSBkZXN0aW5hdGlvbkh0bWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgb2xkRGlzcGxheVN0eWxlID0gJyc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBlZGdlRHJhd2luZ1NlcnZpY2U6IEZjRWRnZURyYXdpbmdTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWw6IEZjTW9kZWw7XG4gIHByaXZhdGUgcmVhZG9ubHkgaXNWYWxpZEVkZ2VDYWxsYmFjazogKHNvdXJjZTogRmNDb25uZWN0b3IsIGRlc3RpbmF0aW9uOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbjtcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVDtcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnQW5pbWF0aW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWRnZVN0eWxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIGVkZ2VEcmF3aW5nU2VydmljZTogRmNFZGdlRHJhd2luZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIG1vZGVsOiBGY01vZGVsLFxuICAgICAgICAgICAgICBpc1ZhbGlkRWRnZUNhbGxiYWNrOiAoc291cmNlOiBGY0Nvbm5lY3RvciwgZGVzdGluYXRpb246IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVCxcbiAgICAgICAgICAgICAgZHJhZ0FuaW1hdGlvbjogc3RyaW5nLFxuICAgICAgICAgICAgICBlZGdlU3R5bGU6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uID0gbW9kZWxWYWxpZGF0aW9uO1xuICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlID0gZWRnZURyYXdpbmdTZXJ2aWNlO1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sgPSBpc1ZhbGlkRWRnZUNhbGxiYWNrIHx8ICgoKSA9PiB0cnVlKTtcbiAgICB0aGlzLmFwcGx5RnVuY3Rpb24gPSBhcHBseUZ1bmN0aW9uO1xuICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiA9IGRyYWdBbmltYXRpb247XG4gICAgdGhpcy5lZGdlU3R5bGUgPSBlZGdlU3R5bGU7XG4gIH1cblxuICBwdWJsaWMgZHJhZ3N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICBsZXQgc3dhcENvbm5lY3RvcjogRmNDb25uZWN0b3I7XG4gICAgbGV0IGRyYWdMYWJlbDogc3RyaW5nO1xuICAgIGxldCBwcmV2RWRnZTogRmNFZGdlO1xuICAgIGlmIChjb25uZWN0b3IudHlwZSA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxlZnRDb25uZWN0b3JUeXBlKSB7XG4gICAgICBmb3IgKGNvbnN0IGVkZ2Ugb2YgdGhpcy5tb2RlbC5lZGdlcykge1xuICAgICAgICBpZiAoZWRnZS5kZXN0aW5hdGlvbiA9PT0gY29ubmVjdG9yLmlkKSB7XG4gICAgICAgICAgc3dhcENvbm5lY3RvciA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q29ubmVjdG9yKGVkZ2Uuc291cmNlKTtcbiAgICAgICAgICBkcmFnTGFiZWwgPSBlZGdlLmxhYmVsO1xuICAgICAgICAgIHByZXZFZGdlID0gZWRnZTtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIGlmIChzd2FwQ29ubmVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UgPSBzd2FwQ29ubmVjdG9yO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChzd2FwQ29ubmVjdG9yLmlkKTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCA9IGRyYWdMYWJlbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gcHJldkVkZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UgPSBjb25uZWN0b3I7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgfVxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgIGlmICghY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbnZhcyB3aGlsZSBlZGdlZHJhZ2dpbmdTZXJ2aWNlIGZvdW5kLicpO1xuICAgIH1cbiAgICB0aGlzLmRyYWdPZmZzZXQueCA9IC1jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB0aGlzLmRyYWdPZmZzZXQueSA9IC1jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgIH07XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRHJhZ0V2ZW50ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcblxuICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCAnSnVzdCB0byBzdXBwb3J0IGZpcmVmb3gnKTtcbiAgICBpZiAob3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLm9sZERpc3BsYXlTdHlsZSA9IHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuZ0VsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYWRvdy1zdmctY2xhc3MnKSk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50ID0gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhZG93LXN2Zy1jbGFzcycpKS5maW5kKCdwYXRoJyk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQgPSAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFkb3ctc3ZnLWNsYXNzJykpLmZpbmQoJ2NpcmNsZScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50LmF0dHIoJ2QnLFxuICAgICAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLCB0aGlzLmVkZ2VTdHlsZSkpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeCcsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueCk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N5JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55KTtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICBpZiAoIXRoaXMuZWRnZURyYWdnaW5nLm1hZ25ldEFjdGl2ZSAmJiB0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLnNoYWRvd0RyYWdTdGFydGVkKSB7XG4gICAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnNoYWRvd0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0ge1xuICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgICAgICB5OiBldmVudC5jbGllbnRZICsgdGhpcy5kcmFnT2Zmc2V0LnlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wYXRoRWxlbWVudC5hdHRyKCdkJyxcbiAgICAgICAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLCB0aGlzLmVkZ2VTdHlsZSkpO1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N4JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54KTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeScsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueSk7XG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCArIHRoaXMuZHJhZ09mZnNldC54LFxuICAgICAgICAgICAgeTogZXZlbnQuY2xpZW50WSArIHRoaXMuZHJhZ09mZnNldC55XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdvdmVyQ29ubmVjdG9yKGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnb3ZlcihldmVudCk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sodGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgY29ubmVjdG9yKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnbGVhdmVNYWduZXQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHRoaXMuZWRnZURyYWdnaW5nLm1hZ25ldEFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGRyYWdvdmVyTWFnbmV0KGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnb3ZlcihldmVudCk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sodGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgY29ubmVjdG9yKSkge1xuICAgICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuXG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcubWFnbmV0QWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9yLmlkKTtcbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wYXRoRWxlbWVudC5hdHRyKCdkJyxcbiAgICAgICAgICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIHRoaXMuZWRnZVN0eWxlKSk7XG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeCcsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueCk7XG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeScsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueSk7XG5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3IuaWQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gbnVsbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSBudWxsO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsID0gbnVsbDtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnB1dEVkZ2UoZWRnZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcm9wKGV2ZW50OiBEcmFnRXZlbnQsIHRhcmdldENvbm5lY3RvcjogRmNDb25uZWN0b3IpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogdGFyZ2V0Q29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sodGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgdGFyZ2V0Q29ubmVjdG9yKSkge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLl9hZGRFZGdlKGV2ZW50LCB0aGlzLmRyYWdnZWRFZGdlU291cmNlLCB0YXJnZXRDb25uZWN0b3IsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWRnZURyYWdnaW5nIHtcbiAgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRyYWdQb2ludDE6IEZjQ29vcmRzO1xuICBkcmFnUG9pbnQyOiBGY0Nvb3JkcztcbiAgZHJhZ0xhYmVsPzogc3RyaW5nO1xuICBwcmV2RWRnZT86IEZjRWRnZTtcbiAgbWFnbmV0QWN0aXZlPzogYm9vbGVhbjtcbiAgZ0VsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG4gIHBhdGhFbGVtZW50PzogSlF1ZXJ5PEVsZW1lbnQ+O1xuICBjaXJjbGVFbGVtZW50PzogSlF1ZXJ5PEVsZW1lbnQ+O1xufVxuIl19