/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FlowchartConstants } from './ngx-flowchart.models';
/** @type {?} */
const nodeDropScope = {
    dropElement: null
};
export class FcNodeDraggingService {
    /**
     * @param {?} modelService
     * @param {?} applyFunction
     * @param {?} automaticResize
     * @param {?} dragAnimation
     */
    constructor(modelService, applyFunction, automaticResize, dragAnimation) {
        this.nodeDraggingScope = {
            shadowDragStarted: false,
            dropElement: null,
            draggedNodes: [],
            shadowElements: []
        };
        this.dragOffsets = [];
        this.draggedElements = [];
        this.destinationHtmlElements = [];
        this.oldDisplayStyles = [];
        this.modelService = modelService;
        this.automaticResize = automaticResize;
        this.dragAnimation = dragAnimation;
        this.applyFunction = applyFunction;
    }
    /**
     * @private
     * @param {?} coordinate
     * @param {?} max
     * @return {?}
     */
    getCoordinate(coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    }
    /**
     * @private
     * @param {?} x
     * @return {?}
     */
    getXCoordinate(x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    }
    /**
     * @private
     * @param {?} y
     * @return {?}
     */
    getYCoordinate(y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    }
    /**
     * @private
     * @param {?} draggedNode
     * @param {?} nodeElement
     * @return {?}
     */
    resizeCanvas(draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            /** @type {?} */
            const canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isDraggingNode(node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    dragstart(event, node) {
        if (node.readonly) {
            return;
        }
        this.dragOffsets.length = 0;
        this.draggedElements.length = 0;
        this.nodeDraggingScope.draggedNodes.length = 0;
        this.nodeDraggingScope.shadowElements.length = 0;
        this.destinationHtmlElements.length = 0;
        this.oldDisplayStyles.length = 0;
        /** @type {?} */
        const elements = [];
        /** @type {?} */
        const nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            /** @type {?} */
            const selectedNodes = this.modelService.nodes.getSelectedNodes();
            for (const selectedNode of selectedNodes) {
                /** @type {?} */
                const element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
                elements.push(element);
                nodes.push(selectedNode);
            }
        }
        else {
            elements.push($((/** @type {?} */ (event.target))));
            nodes.push(node);
        }
        /** @type {?} */
        const offsetsX = [];
        /** @type {?} */
        const offsetsY = [];
        for (const element of elements) {
            offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
            offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
        }
        /** @type {?} */
        const originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = (/** @type {?} */ (elements[0][0].cloneNode(true)));
            /** @type {?} */
            const offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
            /** @type {?} */
            const dropNodeInfo = {
                node,
                dropTargetId: this.modelService.dropTargetId,
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            originalEvent.dataTransfer.setData('text', JSON.stringify(dropNodeInfo));
            if (originalEvent.dataTransfer.setDragImage) {
                originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
            }
            else {
                /** @type {?} */
                const target = (/** @type {?} */ (event.target));
                /** @type {?} */
                const cloneNode = target.cloneNode(true);
                target.parentNode.insertBefore(cloneNode, target);
                target.style.visibility = 'collapse';
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    target.parentNode.removeChild(cloneNode);
                    target.style.visibility = 'visible';
                }), 0);
            }
            return;
        }
        this.nodeDraggingScope.draggedNodes = nodes;
        for (let i = 0; i < elements.length; i++) {
            this.draggedElements.push(elements[i][0]);
            this.dragOffsets.push({
                x: offsetsX[i],
                y: offsetsY[i]
            });
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            for (let i = 0; i < this.draggedElements.length; i++) {
                /** @type {?} */
                const dragOffset = this.dragOffsets[i];
                /** @type {?} */
                const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                /** @type {?} */
                const shadowElement = $(`<div style="position: absolute; opacity: 0.7; ` +
                    `top: ${this.getYCoordinate(dragOffset.y + event.clientY)}px; ` +
                    `left: ${this.getXCoordinate(dragOffset.x + event.clientX)}px; ">` +
                    `<div class="innerNode"><p style="padding: 0 15px;">${draggedNode.name}</p> </div></div>`);
                /** @type {?} */
                const targetInnerNode = $(this.draggedElements[i]).children()[0];
                shadowElement.children()[0].style.backgroundColor = targetInnerNode.style.backgroundColor;
                this.nodeDraggingScope.shadowElements.push(shadowElement);
                this.modelService.canvasHtmlElement.appendChild(this.nodeDraggingScope.shadowElements[i][0]);
            }
        }
        originalEvent.dataTransfer.setData('text', 'Just to support firefox');
        if (originalEvent.dataTransfer.setDragImage) {
            originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
        }
        else {
            this.draggedElements.forEach((/**
             * @param {?} draggedElement
             * @return {?}
             */
            (draggedElement) => {
                /** @type {?} */
                const cloneNode = draggedElement.cloneNode(true);
                draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
                draggedElement.style.visibility = 'collapse';
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    draggedElement.parentNode.removeChild(cloneNode);
                    draggedElement.style.visibility = 'visible';
                }), 0);
            }));
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                for (let i = 0; i < this.draggedElements.length; i++) {
                    this.destinationHtmlElements.push(this.draggedElements[i]);
                    this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                    this.destinationHtmlElements[i].style.display = 'none';
                }
                this.nodeDraggingScope.shadowDragStarted = true;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        /** @type {?} */
        let dropNode = null;
        /** @type {?} */
        const originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        /** @type {?} */
        const infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            /** @type {?} */
            let dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    /** @type {?} */
                    const offset = $(this.modelService.canvasHtmlElement).offset();
                    /** @type {?} */
                    const x = event.clientX - offset.left;
                    /** @type {?} */
                    const y = event.clientY - offset.top;
                    dropNode.x = Math.round(this.getXCoordinate(dropNodeInfo.offsetX + x));
                    dropNode.y = Math.round(this.getYCoordinate(dropNodeInfo.offsetY + y));
                }
            }
        }
        if (dropNode) {
            this.modelService.dropNode(event, dropNode);
            event.preventDefault();
            return false;
        }
        else if (this.nodeDraggingScope.draggedNodes.length) {
            return this.applyFunction((/**
             * @return {?}
             */
            () => {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    const dragOffset = this.dragOffsets[i];
                    draggedNode.x = Math.round(this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                this.modelService.notifyModelChanged();
                return false;
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        if (nodeDropScope.dropElement) {
            /** @type {?} */
            const offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    this.destinationHtmlElements[0].style.display = this.oldDisplayStyles[0];
                    this.nodeDraggingScope.shadowDragStarted = false;
                }));
            }
            event.preventDefault();
            return;
        }
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return;
        }
        if (!this.nodeDraggingScope.draggedNodes.length) {
            event.preventDefault();
            return;
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                return this.applyFunction((/**
                 * @return {?}
                 */
                () => {
                    for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                        /** @type {?} */
                        const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                        /** @type {?} */
                        const dragOffset = this.dragOffsets[i];
                        draggedNode.x = this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = this.getYCoordinate(dragOffset.y + event.clientY);
                        this.resizeCanvas(draggedNode, this.draggedElements[i]);
                    }
                    event.preventDefault();
                    this.modelService.notifyModelChanged();
                    return false;
                }));
            }
        }
        else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                if (this.nodeDraggingScope.shadowDragStarted) {
                    this.applyFunction((/**
                     * @return {?}
                     */
                    () => {
                        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                            this.destinationHtmlElements[i].style.display = this.oldDisplayStyles[i];
                        }
                        this.nodeDraggingScope.shadowDragStarted = false;
                    }));
                }
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    const dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
        this.applyFunction((/**
         * @return {?}
         */
        () => {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (this.modelService.isDropSource()) {
                return;
            }
            if (this.nodeDraggingScope.shadowElements.length) {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    const shadowElement = this.nodeDraggingScope.shadowElements[i];
                    draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
                    draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
                    this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
                }
                this.nodeDraggingScope.shadowElements.length = 0;
                this.modelService.notifyModelChanged();
            }
            if (this.nodeDraggingScope.draggedNodes.length) {
                this.nodeDraggingScope.draggedNodes.length = 0;
                this.draggedElements.length = 0;
                this.dragOffsets.length = 0;
            }
        }));
    }
}
if (false) {
    /** @type {?} */
    FcNodeDraggingService.prototype.nodeDraggingScope;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.dragOffsets;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.draggedElements;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.destinationHtmlElements;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.oldDisplayStyles;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.modelService;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.automaticResize;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.dragAnimation;
    /**
     * @type {?}
     * @private
     */
    FcNodeDraggingService.prototype.applyFunction;
}
/**
 * @record
 */
export function NodeDraggingScope() { }
if (false) {
    /** @type {?} */
    NodeDraggingScope.prototype.draggedNodes;
    /** @type {?} */
    NodeDraggingScope.prototype.shadowElements;
    /** @type {?} */
    NodeDraggingScope.prototype.shadowDragStarted;
    /** @type {?} */
    NodeDraggingScope.prototype.dropElement;
}
/**
 * @record
 */
export function NodeDropElement() { }
if (false) {
    /** @type {?|undefined} */
    NodeDropElement.prototype.offsetInfo;
}
/**
 * @record
 */
export function NodeDropScope() { }
if (false) {
    /** @type {?} */
    NodeDropScope.prototype.dropElement;
}
/**
 * @record
 */
export function DropNodeInfo() { }
if (false) {
    /** @type {?} */
    DropNodeInfo.prototype.node;
    /** @type {?} */
    DropNodeInfo.prototype.dropTargetId;
    /** @type {?} */
    DropNodeInfo.prototype.offsetX;
    /** @type {?} */
    DropNodeInfo.prototype.offsetY;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0Isa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7TUFFeEUsYUFBYSxHQUFrQjtJQUNuQyxXQUFXLEVBQUUsSUFBSTtDQUNsQjtBQUVELE1BQU0sT0FBTyxxQkFBcUI7Ozs7Ozs7SUFvQmhDLFlBQVksWUFBNEIsRUFDNUIsYUFBa0QsRUFDbEQsZUFBd0IsRUFBRSxhQUFxQjtRQXBCM0Qsc0JBQWlCLEdBQXNCO1lBQ3JDLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsY0FBYyxFQUFFLEVBQUU7U0FDbkIsQ0FBQztRQUVNLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBQzdCLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUVwQyw0QkFBdUIsR0FBa0IsRUFBRSxDQUFDO1FBQzVDLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQVV0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRU8sYUFBYSxDQUFDLFVBQWtCLEVBQUUsR0FBVztRQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7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QyxNQUFNLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Q0FFRjs7O0lBbFRDLGtEQUtFOzs7OztJQUVGLDRDQUFxQzs7Ozs7SUFDckMsZ0RBQTRDOzs7OztJQUU1Qyx3REFBb0Q7Ozs7O0lBQ3BELGlEQUF3Qzs7Ozs7SUFFeEMsNkNBQThDOzs7OztJQUM5QyxnREFBMEM7Ozs7O0lBQzFDLDhDQUF1Qzs7Ozs7SUFDdkMsOENBQW9FOzs7OztBQW9TdEUsdUNBS0M7OztJQUpDLHlDQUE0Qjs7SUFDNUIsMkNBQTJDOztJQUMzQyw4Q0FBMkI7O0lBQzNCLHdDQUF5Qjs7Ozs7QUFHM0IscUNBS0M7OztJQUpDLHFDQUdFOzs7OztBQUdKLG1DQUVDOzs7SUFEQyxvQ0FBNkI7Ozs7O0FBRy9CLGtDQUtDOzs7SUFKQyw0QkFBYTs7SUFDYixvQ0FBcUI7O0lBQ3JCLCtCQUFnQjs7SUFDaEIsK0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNDb29yZHMsIEZjTm9kZSwgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbmNvbnN0IG5vZGVEcm9wU2NvcGU6IE5vZGVEcm9wU2NvcGUgPSB7XG4gIGRyb3BFbGVtZW50OiBudWxsXG59O1xuXG5leHBvcnQgY2xhc3MgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlIHtcblxuICBub2RlRHJhZ2dpbmdTY29wZTogTm9kZURyYWdnaW5nU2NvcGUgPSB7XG4gICAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGZhbHNlLFxuICAgIGRyb3BFbGVtZW50OiBudWxsLFxuICAgIGRyYWdnZWROb2RlczogW10sXG4gICAgc2hhZG93RWxlbWVudHM6IFtdXG4gIH07XG5cbiAgcHJpdmF0ZSBkcmFnT2Zmc2V0czogRmNDb29yZHNbXSA9IFtdO1xuICBwcml2YXRlIGRyYWdnZWRFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gIHByaXZhdGUgZGVzdGluYXRpb25IdG1sRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBvbGREaXNwbGF5U3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBULFxuICAgICAgICAgICAgICBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW4sIGRyYWdBbmltYXRpb246IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICAgIHRoaXMuYXV0b21hdGljUmVzaXplID0gYXV0b21hdGljUmVzaXplO1xuICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiA9IGRyYWdBbmltYXRpb247XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29vcmRpbmF0ZShjb29yZGluYXRlOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb29yZGluYXRlID0gTWF0aC5tYXgoY29vcmRpbmF0ZSwgMCk7XG4gICAgY29vcmRpbmF0ZSA9IE1hdGgubWluKGNvb3JkaW5hdGUsIG1heCk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XG4gIH1cblxuICBwcml2YXRlIGdldFhDb29yZGluYXRlKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZSh4LCB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5vZmZzZXRXaWR0aCk7XG4gIH1cblxuICBwcml2YXRlIGdldFlDb29yZGluYXRlKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZSh5LCB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVDYW52YXMoZHJhZ2dlZE5vZGU6IEZjTm9kZSwgbm9kZUVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuYXV0b21hdGljUmVzaXplICYmICF0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgY29uc3QgY2FudmFzRWxlbWVudCA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgICAgaWYgKGNhbnZhc0VsZW1lbnQub2Zmc2V0V2lkdGggPCBkcmFnZ2VkTm9kZS54ICsgbm9kZUVsZW1lbnQub2Zmc2V0V2lkdGggKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplVGhyZXNob2xkKSB7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGggPSBjYW52YXNFbGVtZW50Lm9mZnNldFdpZHRoICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVN0ZXAgKyAncHgnO1xuICAgICAgfVxuICAgICAgaWYgKGNhbnZhc0VsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZHJhZ2dlZE5vZGUueSArIG5vZGVFbGVtZW50Lm9mZnNldEhlaWdodCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVUaHJlc2hvbGQpIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjYW52YXNFbGVtZW50Lm9mZnNldEhlaWdodCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVTdGVwICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEcmFnZ2luZ05vZGUobm9kZTogRmNOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmluY2x1ZGVzKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIGRyYWdzdGFydChldmVudDogRHJhZ0V2ZW50LCBub2RlOiBGY05vZGUpIHtcbiAgICBpZiAobm9kZS5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyYWdPZmZzZXRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGggPSAwO1xuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLmxlbmd0aCA9IDA7XG4gICAgY29uc3QgZWxlbWVudHM6IEFycmF5PEpRdWVyeTxIVE1MRWxlbWVudD4+ID0gW107XG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PEZjTm9kZT4gPSBbXTtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgIGZvciAoY29uc3Qgc2VsZWN0ZWROb2RlIG9mIHNlbGVjdGVkTm9kZXMpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuZ2V0SHRtbEVsZW1lbnQoc2VsZWN0ZWROb2RlLmlkKSk7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIG5vZGVzLnB1c2goc2VsZWN0ZWROb2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHMucHVzaCgkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpO1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gICAgY29uc3Qgb2Zmc2V0c1g6IG51bWJlcltdID0gW107XG4gICAgY29uc3Qgb2Zmc2V0c1k6IG51bWJlcltdID0gW107XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICBvZmZzZXRzWC5wdXNoKHBhcnNlSW50KGVsZW1lbnQuY3NzKCdsZWZ0JyksIDEwKSAtIGV2ZW50LmNsaWVudFgpO1xuICAgICAgb2Zmc2V0c1kucHVzaChwYXJzZUludChlbGVtZW50LmNzcygndG9wJyksIDEwKSAtIGV2ZW50LmNsaWVudFkpO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbEV2ZW50OiBEcmFnRXZlbnQgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpO1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBlbGVtZW50c1swXVswXS5jbG9uZU5vZGUodHJ1ZSkgYXMgTm9kZURyb3BFbGVtZW50O1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gJCh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudCkub2Zmc2V0KCk7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50Lm9mZnNldEluZm8gPSB7XG4gICAgICAgIG9mZnNldFg6IE1hdGgucm91bmQob2Zmc2V0c1hbMF0gKyBvZmZzZXQubGVmdCksXG4gICAgICAgIG9mZnNldFk6IE1hdGgucm91bmQob2Zmc2V0c1lbMF0gKyBvZmZzZXQudG9wKVxuICAgICAgfTtcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS56SW5kZXggPSAnOTk5OSc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICBjb25zdCBkcm9wTm9kZUluZm86IERyb3BOb2RlSW5mbyA9IHtcbiAgICAgICAgbm9kZSxcbiAgICAgICAgZHJvcFRhcmdldElkOiB0aGlzLm1vZGVsU2VydmljZS5kcm9wVGFyZ2V0SWQsXG4gICAgICAgIG9mZnNldFg6IE1hdGgucm91bmQob2Zmc2V0c1hbMF0gKyBvZmZzZXQubGVmdCksXG4gICAgICAgIG9mZnNldFk6IE1hdGgucm91bmQob2Zmc2V0c1lbMF0gKyBvZmZzZXQudG9wKVxuICAgICAgfTtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCBKU09OLnN0cmluZ2lmeShkcm9wTm9kZUluZm8pKTtcblxuICAgICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2xvbmVOb2RlID0gdGFyZ2V0LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZSwgdGFyZ2V0KTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICAgIHRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMgPSBub2RlcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5wdXNoKGVsZW1lbnRzW2ldWzBdKTtcbiAgICAgIHRoaXMuZHJhZ09mZnNldHMucHVzaChcbiAgICAgICAge1xuICAgICAgICAgIHg6IG9mZnNldHNYW2ldLFxuICAgICAgICAgIHk6IG9mZnNldHNZW2ldXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgIGNvbnN0IHNoYWRvd0VsZW1lbnQgPSAkKGA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBvcGFjaXR5OiAwLjc7IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdG9wOiAke3RoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSl9cHg7IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgbGVmdDogJHt0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpfXB4OyBcIj5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJpbm5lck5vZGVcIj48cCBzdHlsZT1cInBhZGRpbmc6IDAgMTVweDtcIj4ke2RyYWdnZWROb2RlLm5hbWV9PC9wPiA8L2Rpdj48L2Rpdj5gKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0SW5uZXJOb2RlID0gJCh0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSkuY2hpbGRyZW4oKVswXTtcbiAgICAgICAgc2hhZG93RWxlbWVudC5jaGlsZHJlbigpWzBdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRhcmdldElubmVyTm9kZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMucHVzaChzaGFkb3dFbGVtZW50KTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXVswXSk7XG4gICAgICB9XG4gICAgfVxuICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnSnVzdCB0byBzdXBwb3J0IGZpcmVmb3gnKTtcbiAgICBpZiAob3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5mb3JFYWNoKChkcmFnZ2VkRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZU5vZGUgPSBkcmFnZ2VkRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGRyYWdnZWRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZSwgZHJhZ2dlZEVsZW1lbnQpO1xuICAgICAgICBkcmFnZ2VkRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZHJhZ2dlZEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICAgIGRyYWdnZWRFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50cy5wdXNoKHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgICB0aGlzLm9sZERpc3BsYXlTdHlsZXMucHVzaCh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkpO1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJvcChldmVudDogRHJhZ0V2ZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgZHJvcE5vZGU6IEZjTm9kZSA9IG51bGw7XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRHJhZ0V2ZW50ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICBjb25zdCBpbmZvVGV4dCA9IG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKTtcbiAgICBpZiAoaW5mb1RleHQpIHtcbiAgICAgIGxldCBkcm9wTm9kZUluZm86IERyb3BOb2RlSW5mbyA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBkcm9wTm9kZUluZm8gPSBKU09OLnBhcnNlKGluZm9UZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICBpZiAoZHJvcE5vZGVJbmZvICYmIGRyb3BOb2RlSW5mby5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmlkICYmXG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQuaWQgPT09IGRyb3BOb2RlSW5mby5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgICAgICBkcm9wTm9kZSA9IGRyb3BOb2RlSW5mby5ub2RlO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9ICQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpLm9mZnNldCgpO1xuICAgICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXQudG9wO1xuICAgICAgICAgIGRyb3BOb2RlLnggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJvcE5vZGVJbmZvLm9mZnNldFggKyB4KSk7XG4gICAgICAgICAgZHJvcE5vZGUueSA9IE1hdGgucm91bmQodGhpcy5nZXRZQ29vcmRpbmF0ZShkcm9wTm9kZUluZm8ub2Zmc2V0WSArIHkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZHJvcE5vZGUpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BOb2RlKGV2ZW50LCBkcm9wTm9kZSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IE1hdGgucm91bmQodGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKSk7XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IE1hdGgucm91bmQodGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IG9mZnNldEluZm8gPSBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50Lm9mZnNldEluZm87XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLmxlZnQgPSAob2Zmc2V0SW5mby5vZmZzZXRYICsgZXZlbnQuY2xpZW50WCkgKyAncHgnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS50b3AgPSAob2Zmc2V0SW5mby5vZmZzZXRZICsgZXZlbnQuY2xpZW50WSkgKyAncHgnO1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZXNbMF07XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCkge1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gdGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKTtcbiAgICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSB0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoZHJhZ2dlZE5vZGUsIHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldLmNzcygnbGVmdCcsIHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCkgKyAncHgnKTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldLmNzcygndG9wJywgdGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKSArICdweCcpO1xuICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKGRyYWdnZWROb2RlLCB0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IHNoYWRvd0VsZW1lbnQgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnggPSBwYXJzZUludChzaGFkb3dFbGVtZW50LmNzcygnbGVmdCcpLnJlcGxhY2UoJ3B4JywgJycpLCAxMCk7XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IHBhcnNlSW50KHNoYWRvd0VsZW1lbnQuY3NzKCd0b3AnKS5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LnJlbW92ZUNoaWxkKHNoYWRvd0VsZW1lbnRbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kcmFnT2Zmc2V0cy5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJhZ2dpbmdTY29wZSB7XG4gIGRyYWdnZWROb2RlczogQXJyYXk8RmNOb2RlPjtcbiAgc2hhZG93RWxlbWVudHM6IEFycmF5PEpRdWVyeTxIVE1MRWxlbWVudD4+O1xuICBzaGFkb3dEcmFnU3RhcnRlZDogYm9vbGVhbjtcbiAgZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcm9wRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgb2Zmc2V0SW5mbz86IHtcbiAgICBvZmZzZXRYOiBudW1iZXI7XG4gICAgb2Zmc2V0WTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcm9wU2NvcGUge1xuICBkcm9wRWxlbWVudDogTm9kZURyb3BFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3BOb2RlSW5mbyB7XG4gIG5vZGU6IEZjTm9kZTtcbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG4gIG9mZnNldFg6IG51bWJlcjtcbiAgb2Zmc2V0WTogbnVtYmVyO1xufVxuIl19