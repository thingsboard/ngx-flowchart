/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FlowchartConstants } from './ngx-flowchart.models';
/** @type {?} */
var nodeDropScope = {
    dropElement: null
};
var FcNodeDraggingService = /** @class */ (function () {
    function FcNodeDraggingService(modelService, applyFunction, automaticResize, dragAnimation) {
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
    FcNodeDraggingService.prototype.getCoordinate = /**
     * @private
     * @param {?} coordinate
     * @param {?} max
     * @return {?}
     */
    function (coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    };
    /**
     * @private
     * @param {?} x
     * @return {?}
     */
    FcNodeDraggingService.prototype.getXCoordinate = /**
     * @private
     * @param {?} x
     * @return {?}
     */
    function (x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    };
    /**
     * @private
     * @param {?} y
     * @return {?}
     */
    FcNodeDraggingService.prototype.getYCoordinate = /**
     * @private
     * @param {?} y
     * @return {?}
     */
    function (y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    };
    /**
     * @private
     * @param {?} draggedNode
     * @param {?} nodeElement
     * @return {?}
     */
    FcNodeDraggingService.prototype.resizeCanvas = /**
     * @private
     * @param {?} draggedNode
     * @param {?} nodeElement
     * @return {?}
     */
    function (draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            /** @type {?} */
            var canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FcNodeDraggingService.prototype.isDraggingNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    };
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FcNodeDraggingService.prototype.dragstart = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        var e_1, _a, e_2, _b;
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
        var elements = [];
        /** @type {?} */
        var nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            /** @type {?} */
            var selectedNodes = this.modelService.nodes.getSelectedNodes();
            try {
                for (var selectedNodes_1 = tslib_1.__values(selectedNodes), selectedNodes_1_1 = selectedNodes_1.next(); !selectedNodes_1_1.done; selectedNodes_1_1 = selectedNodes_1.next()) {
                    var selectedNode = selectedNodes_1_1.value;
                    /** @type {?} */
                    var element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
                    elements.push(element);
                    nodes.push(selectedNode);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (selectedNodes_1_1 && !selectedNodes_1_1.done && (_a = selectedNodes_1.return)) _a.call(selectedNodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            elements.push($((/** @type {?} */ (event.target))));
            nodes.push(node);
        }
        /** @type {?} */
        var offsetsX = [];
        /** @type {?} */
        var offsetsY = [];
        try {
            for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var element = elements_1_1.value;
                offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
                offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_b = elements_1.return)) _b.call(elements_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        /** @type {?} */
        var originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = (/** @type {?} */ (elements[0][0].cloneNode(true)));
            /** @type {?} */
            var offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
            /** @type {?} */
            var dropNodeInfo = {
                node: node,
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
                var target_1 = (/** @type {?} */ (event.target));
                /** @type {?} */
                var cloneNode_1 = target_1.cloneNode(true);
                target_1.parentNode.insertBefore(cloneNode_1, target_1);
                target_1.style.visibility = 'collapse';
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    target_1.parentNode.removeChild(cloneNode_1);
                    target_1.style.visibility = 'visible';
                }), 0);
            }
            return;
        }
        this.nodeDraggingScope.draggedNodes = nodes;
        for (var i = 0; i < elements.length; i++) {
            this.draggedElements.push(elements[i][0]);
            this.dragOffsets.push({
                x: offsetsX[i],
                y: offsetsY[i]
            });
        }
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            for (var i = 0; i < this.draggedElements.length; i++) {
                /** @type {?} */
                var dragOffset = this.dragOffsets[i];
                /** @type {?} */
                var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                /** @type {?} */
                var shadowElement = $("<div style=\"position: absolute; opacity: 0.7; " +
                    ("top: " + this.getYCoordinate(dragOffset.y + event.clientY) + "px; ") +
                    ("left: " + this.getXCoordinate(dragOffset.x + event.clientX) + "px; \">") +
                    ("<div class=\"innerNode\"><p style=\"padding: 0 15px;\">" + draggedNode.name + "</p> </div></div>"));
                /** @type {?} */
                var targetInnerNode = $(this.draggedElements[i]).children()[0];
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
            function (draggedElement) {
                /** @type {?} */
                var cloneNode = draggedElement.cloneNode(true);
                draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
                draggedElement.style.visibility = 'collapse';
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    draggedElement.parentNode.removeChild(cloneNode);
                    draggedElement.style.visibility = 'visible';
                }), 0);
            }));
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                for (var i = 0; i < this.draggedElements.length; i++) {
                    this.destinationHtmlElements.push(this.draggedElements[i]);
                    this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                    this.destinationHtmlElements[i].style.display = 'none';
                }
                this.nodeDraggingScope.shadowDragStarted = true;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeDraggingService.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        /** @type {?} */
        var dropNode = null;
        /** @type {?} */
        var originalEvent = ((/** @type {?} */ (event))).originalEvent || event;
        /** @type {?} */
        var infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            /** @type {?} */
            var dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    /** @type {?} */
                    var offset = $(this.modelService.canvasHtmlElement).offset();
                    /** @type {?} */
                    var x = event.clientX - offset.left;
                    /** @type {?} */
                    var y = event.clientY - offset.top;
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
            function () {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    var dragOffset = _this.dragOffsets[i];
                    draggedNode.x = Math.round(_this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(_this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                _this.modelService.notifyModelChanged();
                return false;
            }));
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeDraggingService.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (nodeDropScope.dropElement) {
            /** @type {?} */
            var offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction((/**
                 * @return {?}
                 */
                function () {
                    _this.destinationHtmlElements[0].style.display = _this.oldDisplayStyles[0];
                    _this.nodeDraggingScope.shadowDragStarted = false;
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
                function () {
                    for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                        /** @type {?} */
                        var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                        /** @type {?} */
                        var dragOffset = _this.dragOffsets[i];
                        draggedNode.x = _this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = _this.getYCoordinate(dragOffset.y + event.clientY);
                        _this.resizeCanvas(draggedNode, _this.draggedElements[i]);
                    }
                    event.preventDefault();
                    _this.modelService.notifyModelChanged();
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
                    function () {
                        for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                            _this.destinationHtmlElements[i].style.display = _this.oldDisplayStyles[i];
                        }
                        _this.nodeDraggingScope.shadowDragStarted = false;
                    }));
                }
                for (var i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    var dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FcNodeDraggingService.prototype.dragend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.applyFunction((/**
         * @return {?}
         */
        function () {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (_this.modelService.isDropSource()) {
                return;
            }
            if (_this.nodeDraggingScope.shadowElements.length) {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    /** @type {?} */
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    /** @type {?} */
                    var shadowElement = _this.nodeDraggingScope.shadowElements[i];
                    draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
                    draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
                    _this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
                }
                _this.nodeDraggingScope.shadowElements.length = 0;
                _this.modelService.notifyModelChanged();
            }
            if (_this.nodeDraggingScope.draggedNodes.length) {
                _this.nodeDraggingScope.draggedNodes.length = 0;
                _this.draggedElements.length = 0;
                _this.dragOffsets.length = 0;
            }
        }));
    };
    return FcNodeDraggingService;
}());
export { FcNodeDraggingService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBRXhFLGFBQWEsR0FBa0I7SUFDbkMsV0FBVyxFQUFFLElBQUk7Q0FDbEI7QUFFRDtJQW9CRSwrQkFBWSxZQUE0QixFQUM1QixhQUFrRCxFQUNsRCxlQUF3QixFQUFFLGFBQXFCO1FBcEIzRCxzQkFBaUIsR0FBc0I7WUFDckMsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsRUFBRTtZQUNoQixjQUFjLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBRU0sZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFDN0Isb0JBQWUsR0FBa0IsRUFBRSxDQUFDO1FBRXBDLDRCQUF1QixHQUFrQixFQUFFLENBQUM7UUFDNUMscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBVXRDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTyw2Q0FBYTs7Ozs7O0lBQXJCLFVBQXNCLFVBQWtCLEVBQUUsR0FBVztRQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVPLDhD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aUJBQ25FO2dCQUNELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQ3hDO1lBRUQsSUFBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDOUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVILDRCQUFDO0FBQUQsQ0FBQyxBQXBURCxJQW9UQzs7OztJQWxUQyxrREFLRTs7Ozs7SUFFRiw0Q0FBcUM7Ozs7O0lBQ3JDLGdEQUE0Qzs7Ozs7SUFFNUMsd0RBQW9EOzs7OztJQUNwRCxpREFBd0M7Ozs7O0lBRXhDLDZDQUE4Qzs7Ozs7SUFDOUMsZ0RBQTBDOzs7OztJQUMxQyw4Q0FBdUM7Ozs7O0lBQ3ZDLDhDQUFvRTs7Ozs7QUFvU3RFLHVDQUtDOzs7SUFKQyx5Q0FBNEI7O0lBQzVCLDJDQUEyQzs7SUFDM0MsOENBQTJCOztJQUMzQix3Q0FBeUI7Ozs7O0FBRzNCLHFDQUtDOzs7SUFKQyxxQ0FHRTs7Ozs7QUFHSixtQ0FFQzs7O0lBREMsb0NBQTZCOzs7OztBQUcvQixrQ0FLQzs7O0lBSkMsNEJBQWE7O0lBQ2Isb0NBQXFCOztJQUNyQiwrQkFBZ0I7O0lBQ2hCLCtCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjQ29vcmRzLCBGY05vZGUsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5jb25zdCBub2RlRHJvcFNjb3BlOiBOb2RlRHJvcFNjb3BlID0ge1xuICBkcm9wRWxlbWVudDogbnVsbFxufTtcblxuZXhwb3J0IGNsYXNzIEZjTm9kZURyYWdnaW5nU2VydmljZSB7XG5cbiAgbm9kZURyYWdnaW5nU2NvcGU6IE5vZGVEcmFnZ2luZ1Njb3BlID0ge1xuICAgIHNoYWRvd0RyYWdTdGFydGVkOiBmYWxzZSxcbiAgICBkcm9wRWxlbWVudDogbnVsbCxcbiAgICBkcmFnZ2VkTm9kZXM6IFtdLFxuICAgIHNoYWRvd0VsZW1lbnRzOiBbXVxuICB9O1xuXG4gIHByaXZhdGUgZHJhZ09mZnNldHM6IEZjQ29vcmRzW10gPSBbXTtcbiAgcHJpdmF0ZSBkcmFnZ2VkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICBwcml2YXRlIGRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gIHByaXZhdGUgb2xkRGlzcGxheVN0eWxlczogc3RyaW5nW10gPSBbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgYXV0b21hdGljUmVzaXplOiBib29sZWFuO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdBbmltYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVDtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVCxcbiAgICAgICAgICAgICAgYXV0b21hdGljUmVzaXplOiBib29sZWFuLCBkcmFnQW5pbWF0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgICB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSA9IGF1dG9tYXRpY1Jlc2l6ZTtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSBkcmFnQW5pbWF0aW9uO1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbiA9IGFwcGx5RnVuY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGdldENvb3JkaW5hdGUoY29vcmRpbmF0ZTogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29vcmRpbmF0ZSA9IE1hdGgubWF4KGNvb3JkaW5hdGUsIDApO1xuICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1pbihjb29yZGluYXRlLCBtYXgpO1xuICAgIHJldHVybiBjb29yZGluYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRYQ29vcmRpbmF0ZSh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENvb3JkaW5hdGUoeCwgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQub2Zmc2V0V2lkdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRZQ29vcmRpbmF0ZSh5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENvb3JkaW5hdGUoeSwgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplQ2FudmFzKGRyYWdnZWROb2RlOiBGY05vZGUsIG5vZGVFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmICh0aGlzLmF1dG9tYXRpY1Jlc2l6ZSAmJiAhdGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICAgIGlmIChjYW52YXNFbGVtZW50Lm9mZnNldFdpZHRoIDwgZHJhZ2dlZE5vZGUueCArIG5vZGVFbGVtZW50Lm9mZnNldFdpZHRoICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVRocmVzaG9sZCkge1xuICAgICAgICBjYW52YXNFbGVtZW50LnN0eWxlLndpZHRoID0gY2FudmFzRWxlbWVudC5vZmZzZXRXaWR0aCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVTdGVwICsgJ3B4JztcbiAgICAgIH1cbiAgICAgIGlmIChjYW52YXNFbGVtZW50Lm9mZnNldEhlaWdodCA8IGRyYWdnZWROb2RlLnkgKyBub2RlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplVGhyZXNob2xkKSB7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY2FudmFzRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplU3RlcCArICdweCc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRHJhZ2dpbmdOb2RlKG5vZGU6IEZjTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5pbmNsdWRlcyhub2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnc3RhcnQoZXZlbnQ6IERyYWdFdmVudCwgbm9kZTogRmNOb2RlKSB7XG4gICAgaWYgKG5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kcmFnT2Zmc2V0cy5sZW5ndGggPSAwO1xuICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIHRoaXMub2xkRGlzcGxheVN0eWxlcy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IGVsZW1lbnRzOiBBcnJheTxKUXVlcnk8SFRNTEVsZW1lbnQ+PiA9IFtdO1xuICAgIGNvbnN0IG5vZGVzOiBBcnJheTxGY05vZGU+ID0gW107XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICBmb3IgKGNvbnN0IHNlbGVjdGVkTm9kZSBvZiBzZWxlY3RlZE5vZGVzKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmdldEh0bWxFbGVtZW50KHNlbGVjdGVkTm9kZS5pZCkpO1xuICAgICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICBub2Rlcy5wdXNoKHNlbGVjdGVkTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goJChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKTtcbiAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICAgIGNvbnN0IG9mZnNldHNYOiBudW1iZXJbXSA9IFtdO1xuICAgIGNvbnN0IG9mZnNldHNZOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgb2Zmc2V0c1gucHVzaChwYXJzZUludChlbGVtZW50LmNzcygnbGVmdCcpLCAxMCkgLSBldmVudC5jbGllbnRYKTtcbiAgICAgIG9mZnNldHNZLnB1c2gocGFyc2VJbnQoZWxlbWVudC5jc3MoJ3RvcCcpLCAxMCkgLSBldmVudC5jbGllbnRZKTtcbiAgICB9XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRHJhZ0V2ZW50ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50ID0gZWxlbWVudHNbMF1bMF0uY2xvbmVOb2RlKHRydWUpIGFzIE5vZGVEcm9wRWxlbWVudDtcbiAgICAgIGNvbnN0IG9mZnNldCA9ICQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpLm9mZnNldCgpO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5vZmZzZXRJbmZvID0ge1xuICAgICAgICBvZmZzZXRYOiBNYXRoLnJvdW5kKG9mZnNldHNYWzBdICsgb2Zmc2V0LmxlZnQpLFxuICAgICAgICBvZmZzZXRZOiBNYXRoLnJvdW5kKG9mZnNldHNZWzBdICsgb2Zmc2V0LnRvcClcbiAgICAgIH07XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzk5OTknO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpO1xuICAgICAgY29uc3QgZHJvcE5vZGVJbmZvOiBEcm9wTm9kZUluZm8gPSB7XG4gICAgICAgIG5vZGUsXG4gICAgICAgIGRyb3BUYXJnZXRJZDogdGhpcy5tb2RlbFNlcnZpY2UuZHJvcFRhcmdldElkLFxuICAgICAgICBvZmZzZXRYOiBNYXRoLnJvdW5kKG9mZnNldHNYWzBdICsgb2Zmc2V0LmxlZnQpLFxuICAgICAgICBvZmZzZXRZOiBNYXRoLnJvdW5kKG9mZnNldHNZWzBdICsgb2Zmc2V0LnRvcClcbiAgICAgIH07XG4gICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgSlNPTi5zdHJpbmdpZnkoZHJvcE5vZGVJbmZvKSk7XG5cbiAgICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMubW9kZWxTZXJ2aWNlLmdldERyYWdJbWFnZSgpLCAwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNsb25lTm9kZSA9IHRhcmdldC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUsIHRhcmdldCk7XG4gICAgICAgIHRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgICB0YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzID0gbm9kZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMucHVzaChlbGVtZW50c1tpXVswXSk7XG4gICAgICB0aGlzLmRyYWdPZmZzZXRzLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBvZmZzZXRzWFtpXSxcbiAgICAgICAgICB5OiBvZmZzZXRzWVtpXVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICBjb25zdCBzaGFkb3dFbGVtZW50ID0gJChgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgb3BhY2l0eTogMC43OyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRvcDogJHt0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpfXB4OyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGxlZnQ6ICR7dGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKX1weDsgXCI+YCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaW5uZXJOb2RlXCI+PHAgc3R5bGU9XCJwYWRkaW5nOiAwIDE1cHg7XCI+JHtkcmFnZ2VkTm9kZS5uYW1lfTwvcD4gPC9kaXY+PC9kaXY+YCk7XG4gICAgICAgIGNvbnN0IHRhcmdldElubmVyTm9kZSA9ICQodGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pLmNoaWxkcmVuKClbMF07XG4gICAgICAgIHNoYWRvd0VsZW1lbnQuY2hpbGRyZW4oKVswXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0YXJnZXRJbm5lck5vZGUuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLnB1c2goc2hhZG93RWxlbWVudCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHNbaV1bMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ0p1c3QgdG8gc3VwcG9ydCBmaXJlZm94Jyk7XG4gICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMubW9kZWxTZXJ2aWNlLmdldERyYWdJbWFnZSgpLCAwLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMuZm9yRWFjaCgoZHJhZ2dlZEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2xvbmVOb2RlID0gZHJhZ2dlZEVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBkcmFnZ2VkRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUsIGRyYWdnZWRFbGVtZW50KTtcbiAgICAgICAgZHJhZ2dlZEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGRyYWdnZWRFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgICBkcmFnZ2VkRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHMucHVzaCh0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLnB1c2godGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5KTtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyb3AoZXZlbnQ6IERyYWdFdmVudCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGRyb3BOb2RlOiBGY05vZGUgPSBudWxsO1xuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IERyYWdFdmVudCA9IChldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgY29uc3QgaW5mb1RleHQgPSBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgaWYgKGluZm9UZXh0KSB7XG4gICAgICBsZXQgZHJvcE5vZGVJbmZvOiBEcm9wTm9kZUluZm8gPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZHJvcE5vZGVJbmZvID0gSlNPTi5wYXJzZShpbmZvVGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgaWYgKGRyb3BOb2RlSW5mbyAmJiBkcm9wTm9kZUluZm8uZHJvcFRhcmdldElkKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5pZCAmJlxuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmlkID09PSBkcm9wTm9kZUluZm8uZHJvcFRhcmdldElkKSB7XG4gICAgICAgICAgZHJvcE5vZGUgPSBkcm9wTm9kZUluZm8ubm9kZTtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KS5vZmZzZXQoKTtcbiAgICAgICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIG9mZnNldC5sZWZ0O1xuICAgICAgICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0LnRvcDtcbiAgICAgICAgICBkcm9wTm9kZS54ID0gTWF0aC5yb3VuZCh0aGlzLmdldFhDb29yZGluYXRlKGRyb3BOb2RlSW5mby5vZmZzZXRYICsgeCkpO1xuICAgICAgICAgIGRyb3BOb2RlLnkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJvcE5vZGVJbmZvLm9mZnNldFkgKyB5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRyb3BOb2RlKSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kcm9wTm9kZShldmVudCwgZHJvcE5vZGUpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCkpO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSkpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICBjb25zdCBvZmZzZXRJbmZvID0gbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5vZmZzZXRJbmZvO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5sZWZ0ID0gKG9mZnNldEluZm8ub2Zmc2V0WCArIGV2ZW50LmNsaWVudFgpICsgJ3B4JztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUudG9wID0gKG9mZnNldEluZm8ub2Zmc2V0WSArIGV2ZW50LmNsaWVudFkpICsgJ3B4JztcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1swXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGVzWzBdO1xuICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCk7XG4gICAgICAgICAgICBkcmFnZ2VkTm9kZS55ID0gdGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKGRyYWdnZWROb2RlLCB0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXS5jc3MoJ2xlZnQnLCB0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpICsgJ3B4Jyk7XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXS5jc3MoJ3RvcCcsIHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSkgKyAncHgnKTtcbiAgICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcyhkcmFnZ2VkTm9kZSwgdGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICBpZiAobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCkge1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBzaGFkb3dFbGVtZW50ID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXTtcbiAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gcGFyc2VJbnQoc2hhZG93RWxlbWVudC5jc3MoJ2xlZnQnKS5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSBwYXJzZUludChzaGFkb3dFbGVtZW50LmNzcygndG9wJykucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5yZW1vdmVDaGlsZChzaGFkb3dFbGVtZW50WzBdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZHJhZ09mZnNldHMubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZURyYWdnaW5nU2NvcGUge1xuICBkcmFnZ2VkTm9kZXM6IEFycmF5PEZjTm9kZT47XG4gIHNoYWRvd0VsZW1lbnRzOiBBcnJheTxKUXVlcnk8SFRNTEVsZW1lbnQ+PjtcbiAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRyb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJvcEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIG9mZnNldEluZm8/OiB7XG4gICAgb2Zmc2V0WDogbnVtYmVyO1xuICAgIG9mZnNldFk6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJvcFNjb3BlIHtcbiAgZHJvcEVsZW1lbnQ6IE5vZGVEcm9wRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcm9wTm9kZUluZm8ge1xuICBub2RlOiBGY05vZGU7XG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuICBvZmZzZXRYOiBudW1iZXI7XG4gIG9mZnNldFk6IG51bWJlcjtcbn1cbiJdfQ==