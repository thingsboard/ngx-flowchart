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
                this.destinationHtmlElements.push(target);
                this.oldDisplayStyles.push(target.style.display);
                target.style.display = 'none';
                this.nodeDraggingScope.shadowDragStarted = true;
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
            for (let i = 0; i < this.draggedElements.length; i++) {
                this.destinationHtmlElements.push(this.draggedElements[i]);
                this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                this.destinationHtmlElements[i].style.display = 'none';
            }
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBb0Isa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7TUFFeEUsYUFBYSxHQUFrQjtJQUNuQyxXQUFXLEVBQUUsSUFBSTtDQUNsQjtBQUVELE1BQU0sT0FBTyxxQkFBcUI7Ozs7Ozs7SUFvQmhDLFlBQVksWUFBNEIsRUFDNUIsYUFBa0QsRUFDbEQsZUFBd0IsRUFBRSxhQUFxQjtRQXBCM0Qsc0JBQWlCLEdBQXNCO1lBQ3JDLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsY0FBYyxFQUFFLEVBQUU7U0FDbkIsQ0FBQztRQUVNLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBQzdCLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUVwQyw0QkFBdUIsR0FBa0IsRUFBRSxDQUFDO1FBQzVDLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQVV0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRU8sYUFBYSxDQUFDLFVBQWtCLEVBQUUsR0FBVztRQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7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Ozs7QUFHL0Isa0NBS0M7OztJQUpDLDRCQUFhOztJQUNiLG9DQUFxQjs7SUFDckIsK0JBQWdCOztJQUNoQiwrQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvb3JkcywgRmNOb2RlLCBGbG93Y2hhcnRDb25zdGFudHMgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuY29uc3Qgbm9kZURyb3BTY29wZTogTm9kZURyb3BTY29wZSA9IHtcbiAgZHJvcEVsZW1lbnQ6IG51bGxcbn07XG5cbmV4cG9ydCBjbGFzcyBGY05vZGVEcmFnZ2luZ1NlcnZpY2Uge1xuXG4gIG5vZGVEcmFnZ2luZ1Njb3BlOiBOb2RlRHJhZ2dpbmdTY29wZSA9IHtcbiAgICBzaGFkb3dEcmFnU3RhcnRlZDogZmFsc2UsXG4gICAgZHJvcEVsZW1lbnQ6IG51bGwsXG4gICAgZHJhZ2dlZE5vZGVzOiBbXSxcbiAgICBzaGFkb3dFbGVtZW50czogW11cbiAgfTtcblxuICBwcml2YXRlIGRyYWdPZmZzZXRzOiBGY0Nvb3Jkc1tdID0gW107XG4gIHByaXZhdGUgZHJhZ2dlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgcHJpdmF0ZSBkZXN0aW5hdGlvbkh0bWxFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIG9sZERpc3BsYXlTdHlsZXM6IHN0cmluZ1tdID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IGF1dG9tYXRpY1Jlc2l6ZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnQW5pbWF0aW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQ7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSxcbiAgICAgICAgICAgICAgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQsXG4gICAgICAgICAgICAgIGF1dG9tYXRpY1Jlc2l6ZTogYm9vbGVhbiwgZHJhZ0FuaW1hdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gICAgdGhpcy5hdXRvbWF0aWNSZXNpemUgPSBhdXRvbWF0aWNSZXNpemU7XG4gICAgdGhpcy5kcmFnQW5pbWF0aW9uID0gZHJhZ0FuaW1hdGlvbjtcbiAgICB0aGlzLmFwcGx5RnVuY3Rpb24gPSBhcHBseUZ1bmN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1heChjb29yZGluYXRlLCAwKTtcbiAgICBjb29yZGluYXRlID0gTWF0aC5taW4oY29vcmRpbmF0ZSwgbWF4KTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0WENvb3JkaW5hdGUoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb29yZGluYXRlKHgsIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50Lm9mZnNldFdpZHRoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0WUNvb3JkaW5hdGUoeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb29yZGluYXRlKHksIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZUNhbnZhcyhkcmFnZ2VkTm9kZTogRmNOb2RlLCBub2RlRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5hdXRvbWF0aWNSZXNpemUgJiYgIXRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBjb25zdCBjYW52YXNFbGVtZW50ID0gdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgICBpZiAoY2FudmFzRWxlbWVudC5vZmZzZXRXaWR0aCA8IGRyYWdnZWROb2RlLnggKyBub2RlRWxlbWVudC5vZmZzZXRXaWR0aCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVUaHJlc2hvbGQpIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9IGNhbnZhc0VsZW1lbnQub2Zmc2V0V2lkdGggKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplU3RlcCArICdweCc7XG4gICAgICB9XG4gICAgICBpZiAoY2FudmFzRWxlbWVudC5vZmZzZXRIZWlnaHQgPCBkcmFnZ2VkTm9kZS55ICsgbm9kZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVRocmVzaG9sZCkge1xuICAgICAgICBjYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCA9IGNhbnZhc0VsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVN0ZXAgKyAncHgnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RyYWdnaW5nTm9kZShub2RlOiBGY05vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMuaW5jbHVkZXMobm9kZSk7XG4gIH1cblxuICBwdWJsaWMgZHJhZ3N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQsIG5vZGU6IEZjTm9kZSkge1xuICAgIGlmIChub2RlLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZHJhZ09mZnNldHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm9sZERpc3BsYXlTdHlsZXMubGVuZ3RoID0gMDtcbiAgICBjb25zdCBlbGVtZW50czogQXJyYXk8SlF1ZXJ5PEhUTUxFbGVtZW50Pj4gPSBbXTtcbiAgICBjb25zdCBub2RlczogQXJyYXk8RmNOb2RlPiA9IFtdO1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgZm9yIChjb25zdCBzZWxlY3RlZE5vZGUgb2Ygc2VsZWN0ZWROb2Rlcykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5nZXRIdG1sRWxlbWVudChzZWxlY3RlZE5vZGUuaWQpKTtcbiAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgbm9kZXMucHVzaChzZWxlY3RlZE5vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50cy5wdXNoKCQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSk7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXRzWDogbnVtYmVyW10gPSBbXTtcbiAgICBjb25zdCBvZmZzZXRzWTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgIG9mZnNldHNYLnB1c2gocGFyc2VJbnQoZWxlbWVudC5jc3MoJ2xlZnQnKSwgMTApIC0gZXZlbnQuY2xpZW50WCk7XG4gICAgICBvZmZzZXRzWS5wdXNoKHBhcnNlSW50KGVsZW1lbnQuY3NzKCd0b3AnKSwgMTApIC0gZXZlbnQuY2xpZW50WSk7XG4gICAgfVxuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IERyYWdFdmVudCA9IChldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBpZiAobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCkge1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IGVsZW1lbnRzWzBdWzBdLmNsb25lTm9kZSh0cnVlKSBhcyBOb2RlRHJvcEVsZW1lbnQ7XG4gICAgICBjb25zdCBvZmZzZXQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KS5vZmZzZXQoKTtcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQub2Zmc2V0SW5mbyA9IHtcbiAgICAgICAgb2Zmc2V0WDogTWF0aC5yb3VuZChvZmZzZXRzWFswXSArIG9mZnNldC5sZWZ0KSxcbiAgICAgICAgb2Zmc2V0WTogTWF0aC5yb3VuZChvZmZzZXRzWVswXSArIG9mZnNldC50b3ApXG4gICAgICB9O1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnpJbmRleCA9ICc5OTk5JztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgIGNvbnN0IGRyb3BOb2RlSW5mbzogRHJvcE5vZGVJbmZvID0ge1xuICAgICAgICBub2RlLFxuICAgICAgICBkcm9wVGFyZ2V0SWQ6IHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BUYXJnZXRJZCxcbiAgICAgICAgb2Zmc2V0WDogTWF0aC5yb3VuZChvZmZzZXRzWFswXSArIG9mZnNldC5sZWZ0KSxcbiAgICAgICAgb2Zmc2V0WTogTWF0aC5yb3VuZChvZmZzZXRzWVswXSArIG9mZnNldC50b3ApXG4gICAgICB9O1xuICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIEpTT04uc3RyaW5naWZ5KGRyb3BOb2RlSW5mbykpO1xuXG4gICAgICBpZiAob3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzLnB1c2godGFyZ2V0KTtcbiAgICAgICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLnB1c2godGFyZ2V0LnN0eWxlLmRpc3BsYXkpO1xuICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzID0gbm9kZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMucHVzaChlbGVtZW50c1tpXVswXSk7XG4gICAgICB0aGlzLmRyYWdPZmZzZXRzLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBvZmZzZXRzWFtpXSxcbiAgICAgICAgICB5OiBvZmZzZXRzWVtpXVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICBjb25zdCBzaGFkb3dFbGVtZW50ID0gJChgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgb3BhY2l0eTogMC43OyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRvcDogJHt0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpfXB4OyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGxlZnQ6ICR7dGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKX1weDsgXCI+YCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaW5uZXJOb2RlXCI+PHAgc3R5bGU9XCJwYWRkaW5nOiAwIDE1cHg7XCI+JHtkcmFnZ2VkTm9kZS5uYW1lfTwvcD4gPC9kaXY+PC9kaXY+YCk7XG4gICAgICAgIGNvbnN0IHRhcmdldElubmVyTm9kZSA9ICQodGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pLmNoaWxkcmVuKClbMF07XG4gICAgICAgIHNoYWRvd0VsZW1lbnQuY2hpbGRyZW4oKVswXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0YXJnZXRJbm5lck5vZGUuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLnB1c2goc2hhZG93RWxlbWVudCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHNbaV1bMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ0p1c3QgdG8gc3VwcG9ydCBmaXJlZm94Jyk7XG4gICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMubW9kZWxTZXJ2aWNlLmdldERyYWdJbWFnZSgpLCAwLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzLnB1c2godGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pO1xuICAgICAgICB0aGlzLm9sZERpc3BsYXlTdHlsZXMucHVzaCh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJvcChldmVudDogRHJhZ0V2ZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgZHJvcE5vZGU6IEZjTm9kZSA9IG51bGw7XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRHJhZ0V2ZW50ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICBjb25zdCBpbmZvVGV4dCA9IG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKTtcbiAgICBpZiAoaW5mb1RleHQpIHtcbiAgICAgIGxldCBkcm9wTm9kZUluZm86IERyb3BOb2RlSW5mbyA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBkcm9wTm9kZUluZm8gPSBKU09OLnBhcnNlKGluZm9UZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICBpZiAoZHJvcE5vZGVJbmZvICYmIGRyb3BOb2RlSW5mby5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmlkICYmXG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQuaWQgPT09IGRyb3BOb2RlSW5mby5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgICAgICBkcm9wTm9kZSA9IGRyb3BOb2RlSW5mby5ub2RlO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9ICQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpLm9mZnNldCgpO1xuICAgICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXQudG9wO1xuICAgICAgICAgIGRyb3BOb2RlLnggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJvcE5vZGVJbmZvLm9mZnNldFggKyB4KSk7XG4gICAgICAgICAgZHJvcE5vZGUueSA9IE1hdGgucm91bmQodGhpcy5nZXRZQ29vcmRpbmF0ZShkcm9wTm9kZUluZm8ub2Zmc2V0WSArIHkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZHJvcE5vZGUpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BOb2RlKGV2ZW50LCBkcm9wTm9kZSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IE1hdGgucm91bmQodGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKSk7XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IE1hdGgucm91bmQodGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IG9mZnNldEluZm8gPSBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50Lm9mZnNldEluZm87XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLmxlZnQgPSAob2Zmc2V0SW5mby5vZmZzZXRYICsgZXZlbnQuY2xpZW50WCkgKyAncHgnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS50b3AgPSAob2Zmc2V0SW5mby5vZmZzZXRZICsgZXZlbnQuY2xpZW50WSkgKyAncHgnO1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZXNbMF07XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCkge1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gdGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKTtcbiAgICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSB0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoZHJhZ2dlZE5vZGUsIHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldLmNzcygnbGVmdCcsIHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCkgKyAncHgnKTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldLmNzcygndG9wJywgdGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKSArICdweCcpO1xuICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKGRyYWdnZWROb2RlLCB0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IHNoYWRvd0VsZW1lbnQgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnggPSBwYXJzZUludChzaGFkb3dFbGVtZW50LmNzcygnbGVmdCcpLnJlcGxhY2UoJ3B4JywgJycpLCAxMCk7XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IHBhcnNlSW50KHNoYWRvd0VsZW1lbnQuY3NzKCd0b3AnKS5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LnJlbW92ZUNoaWxkKHNoYWRvd0VsZW1lbnRbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kcmFnT2Zmc2V0cy5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJhZ2dpbmdTY29wZSB7XG4gIGRyYWdnZWROb2RlczogQXJyYXk8RmNOb2RlPjtcbiAgc2hhZG93RWxlbWVudHM6IEFycmF5PEpRdWVyeTxIVE1MRWxlbWVudD4+O1xuICBzaGFkb3dEcmFnU3RhcnRlZDogYm9vbGVhbjtcbiAgZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcm9wRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgb2Zmc2V0SW5mbz86IHtcbiAgICBvZmZzZXRYOiBudW1iZXI7XG4gICAgb2Zmc2V0WTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcm9wU2NvcGUge1xuICBkcm9wRWxlbWVudDogTm9kZURyb3BFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3BOb2RlSW5mbyB7XG4gIG5vZGU6IEZjTm9kZTtcbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG4gIG9mZnNldFg6IG51bWJlcjtcbiAgb2Zmc2V0WTogbnVtYmVyO1xufVxuIl19