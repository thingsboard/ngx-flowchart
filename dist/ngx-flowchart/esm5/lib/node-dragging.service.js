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
                var target = (/** @type {?} */ (event.target));
                this.destinationHtmlElements.push(target);
                this.oldDisplayStyles.push(target.style.display);
                target.style.display = 'none';
                this.nodeDraggingScope.shadowDragStarted = true;
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
            for (var i = 0; i < this.draggedElements.length; i++) {
                this.destinationHtmlElements.push(this.draggedElements[i]);
                this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
                this.destinationHtmlElements[i].style.display = 'none';
            }
            if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBRXhFLGFBQWEsR0FBa0I7SUFDbkMsV0FBVyxFQUFFLElBQUk7Q0FDbEI7QUFFRDtJQW9CRSwrQkFBWSxZQUE0QixFQUM1QixhQUFrRCxFQUNsRCxlQUF3QixFQUFFLGFBQXFCO1FBcEIzRCxzQkFBaUIsR0FBc0I7WUFDckMsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsRUFBRTtZQUNoQixjQUFjLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBRU0sZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFDN0Isb0JBQWUsR0FBa0IsRUFBRSxDQUFDO1FBRXBDLDRCQUF1QixHQUFrQixFQUFFLENBQUM7UUFDNUMscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBVXRDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTyw2Q0FBYTs7Ozs7O0lBQXJCLFVBQXNCLFVBQWtCLEVBQUUsR0FBVztRQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVPLDhD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O0lBQ3BELGlEQUF3Qzs7Ozs7SUFFeEMsNkNBQThDOzs7OztJQUM5QyxnREFBMEM7Ozs7O0lBQzFDLDhDQUF1Qzs7Ozs7SUFDdkMsOENBQW9FOzs7OztBQXdSdEUsdUNBS0M7OztJQUpDLHlDQUE0Qjs7SUFDNUIsMkNBQTJDOztJQUMzQyw4Q0FBMkI7O0lBQzNCLHdDQUF5Qjs7Ozs7QUFHM0IscUNBS0M7OztJQUpDLHFDQUdFOzs7OztBQUdKLG1DQUVDOzs7SUFEQyxvQ0FBNkI7Ozs7O0FBRy9CLGtDQUtDOzs7SUFKQyw0QkFBYTs7SUFDYixvQ0FBcUI7O0lBQ3JCLCtCQUFnQjs7SUFDaEIsK0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNDb29yZHMsIEZjTm9kZSwgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbmNvbnN0IG5vZGVEcm9wU2NvcGU6IE5vZGVEcm9wU2NvcGUgPSB7XG4gIGRyb3BFbGVtZW50OiBudWxsXG59O1xuXG5leHBvcnQgY2xhc3MgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlIHtcblxuICBub2RlRHJhZ2dpbmdTY29wZTogTm9kZURyYWdnaW5nU2NvcGUgPSB7XG4gICAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGZhbHNlLFxuICAgIGRyb3BFbGVtZW50OiBudWxsLFxuICAgIGRyYWdnZWROb2RlczogW10sXG4gICAgc2hhZG93RWxlbWVudHM6IFtdXG4gIH07XG5cbiAgcHJpdmF0ZSBkcmFnT2Zmc2V0czogRmNDb29yZHNbXSA9IFtdO1xuICBwcml2YXRlIGRyYWdnZWRFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gIHByaXZhdGUgZGVzdGluYXRpb25IdG1sRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBvbGREaXNwbGF5U3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBULFxuICAgICAgICAgICAgICBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW4sIGRyYWdBbmltYXRpb246IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICAgIHRoaXMuYXV0b21hdGljUmVzaXplID0gYXV0b21hdGljUmVzaXplO1xuICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiA9IGRyYWdBbmltYXRpb247XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29vcmRpbmF0ZShjb29yZGluYXRlOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb29yZGluYXRlID0gTWF0aC5tYXgoY29vcmRpbmF0ZSwgMCk7XG4gICAgY29vcmRpbmF0ZSA9IE1hdGgubWluKGNvb3JkaW5hdGUsIG1heCk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XG4gIH1cblxuICBwcml2YXRlIGdldFhDb29yZGluYXRlKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZSh4LCB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5vZmZzZXRXaWR0aCk7XG4gIH1cblxuICBwcml2YXRlIGdldFlDb29yZGluYXRlKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZSh5LCB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVDYW52YXMoZHJhZ2dlZE5vZGU6IEZjTm9kZSwgbm9kZUVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuYXV0b21hdGljUmVzaXplICYmICF0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgY29uc3QgY2FudmFzRWxlbWVudCA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgICAgaWYgKGNhbnZhc0VsZW1lbnQub2Zmc2V0V2lkdGggPCBkcmFnZ2VkTm9kZS54ICsgbm9kZUVsZW1lbnQub2Zmc2V0V2lkdGggKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplVGhyZXNob2xkKSB7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGggPSBjYW52YXNFbGVtZW50Lm9mZnNldFdpZHRoICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVN0ZXAgKyAncHgnO1xuICAgICAgfVxuICAgICAgaWYgKGNhbnZhc0VsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZHJhZ2dlZE5vZGUueSArIG5vZGVFbGVtZW50Lm9mZnNldEhlaWdodCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVUaHJlc2hvbGQpIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjYW52YXNFbGVtZW50Lm9mZnNldEhlaWdodCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVTdGVwICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEcmFnZ2luZ05vZGUobm9kZTogRmNOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmluY2x1ZGVzKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIGRyYWdzdGFydChldmVudDogRHJhZ0V2ZW50LCBub2RlOiBGY05vZGUpIHtcbiAgICBpZiAobm9kZS5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyYWdPZmZzZXRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGggPSAwO1xuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLmxlbmd0aCA9IDA7XG4gICAgY29uc3QgZWxlbWVudHM6IEFycmF5PEpRdWVyeTxIVE1MRWxlbWVudD4+ID0gW107XG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PEZjTm9kZT4gPSBbXTtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgIGZvciAoY29uc3Qgc2VsZWN0ZWROb2RlIG9mIHNlbGVjdGVkTm9kZXMpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuZ2V0SHRtbEVsZW1lbnQoc2VsZWN0ZWROb2RlLmlkKSk7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIG5vZGVzLnB1c2goc2VsZWN0ZWROb2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHMucHVzaCgkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpO1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gICAgY29uc3Qgb2Zmc2V0c1g6IG51bWJlcltdID0gW107XG4gICAgY29uc3Qgb2Zmc2V0c1k6IG51bWJlcltdID0gW107XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICBvZmZzZXRzWC5wdXNoKHBhcnNlSW50KGVsZW1lbnQuY3NzKCdsZWZ0JyksIDEwKSAtIGV2ZW50LmNsaWVudFgpO1xuICAgICAgb2Zmc2V0c1kucHVzaChwYXJzZUludChlbGVtZW50LmNzcygndG9wJyksIDEwKSAtIGV2ZW50LmNsaWVudFkpO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbEV2ZW50OiBEcmFnRXZlbnQgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpO1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBlbGVtZW50c1swXVswXS5jbG9uZU5vZGUodHJ1ZSkgYXMgTm9kZURyb3BFbGVtZW50O1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gJCh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudCkub2Zmc2V0KCk7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50Lm9mZnNldEluZm8gPSB7XG4gICAgICAgIG9mZnNldFg6IE1hdGgucm91bmQob2Zmc2V0c1hbMF0gKyBvZmZzZXQubGVmdCksXG4gICAgICAgIG9mZnNldFk6IE1hdGgucm91bmQob2Zmc2V0c1lbMF0gKyBvZmZzZXQudG9wKVxuICAgICAgfTtcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS56SW5kZXggPSAnOTk5OSc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICBjb25zdCBkcm9wTm9kZUluZm86IERyb3BOb2RlSW5mbyA9IHtcbiAgICAgICAgbm9kZSxcbiAgICAgICAgZHJvcFRhcmdldElkOiB0aGlzLm1vZGVsU2VydmljZS5kcm9wVGFyZ2V0SWQsXG4gICAgICAgIG9mZnNldFg6IE1hdGgucm91bmQob2Zmc2V0c1hbMF0gKyBvZmZzZXQubGVmdCksXG4gICAgICAgIG9mZnNldFk6IE1hdGgucm91bmQob2Zmc2V0c1lbMF0gKyBvZmZzZXQudG9wKVxuICAgICAgfTtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCBKU09OLnN0cmluZ2lmeShkcm9wTm9kZUluZm8pKTtcblxuICAgICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50cy5wdXNoKHRhcmdldCk7XG4gICAgICAgIHRoaXMub2xkRGlzcGxheVN0eWxlcy5wdXNoKHRhcmdldC5zdHlsZS5kaXNwbGF5KTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2RlcyA9IG5vZGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLnB1c2goZWxlbWVudHNbaV1bMF0pO1xuICAgICAgdGhpcy5kcmFnT2Zmc2V0cy5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgeDogb2Zmc2V0c1hbaV0sXG4gICAgICAgICAgeTogb2Zmc2V0c1lbaV1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgY29uc3Qgc2hhZG93RWxlbWVudCA9ICQoYDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IG9wYWNpdHk6IDAuNzsgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0b3A6ICR7dGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKX1weDsgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBsZWZ0OiAke3RoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCl9cHg7IFwiPmAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImlubmVyTm9kZVwiPjxwIHN0eWxlPVwicGFkZGluZzogMCAxNXB4O1wiPiR7ZHJhZ2dlZE5vZGUubmFtZX08L3A+IDwvZGl2PjwvZGl2PmApO1xuICAgICAgICBjb25zdCB0YXJnZXRJbm5lck5vZGUgPSAkKHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKS5jaGlsZHJlbigpWzBdO1xuICAgICAgICBzaGFkb3dFbGVtZW50LmNoaWxkcmVuKClbMF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGFyZ2V0SW5uZXJOb2RlLnN0eWxlLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50cy5wdXNoKHNoYWRvd0VsZW1lbnQpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldWzBdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdKdXN0IHRvIHN1cHBvcnQgZmlyZWZveCcpO1xuICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50cy5wdXNoKHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLnB1c2godGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5KTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyb3AoZXZlbnQ6IERyYWdFdmVudCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGRyb3BOb2RlOiBGY05vZGUgPSBudWxsO1xuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IERyYWdFdmVudCA9IChldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgY29uc3QgaW5mb1RleHQgPSBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgaWYgKGluZm9UZXh0KSB7XG4gICAgICBsZXQgZHJvcE5vZGVJbmZvOiBEcm9wTm9kZUluZm8gPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZHJvcE5vZGVJbmZvID0gSlNPTi5wYXJzZShpbmZvVGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgaWYgKGRyb3BOb2RlSW5mbyAmJiBkcm9wTm9kZUluZm8uZHJvcFRhcmdldElkKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5pZCAmJlxuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmlkID09PSBkcm9wTm9kZUluZm8uZHJvcFRhcmdldElkKSB7XG4gICAgICAgICAgZHJvcE5vZGUgPSBkcm9wTm9kZUluZm8ubm9kZTtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KS5vZmZzZXQoKTtcbiAgICAgICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIG9mZnNldC5sZWZ0O1xuICAgICAgICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0LnRvcDtcbiAgICAgICAgICBkcm9wTm9kZS54ID0gTWF0aC5yb3VuZCh0aGlzLmdldFhDb29yZGluYXRlKGRyb3BOb2RlSW5mby5vZmZzZXRYICsgeCkpO1xuICAgICAgICAgIGRyb3BOb2RlLnkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJvcE5vZGVJbmZvLm9mZnNldFkgKyB5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRyb3BOb2RlKSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kcm9wTm9kZShldmVudCwgZHJvcE5vZGUpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCkpO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSkpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICBjb25zdCBvZmZzZXRJbmZvID0gbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5vZmZzZXRJbmZvO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5sZWZ0ID0gKG9mZnNldEluZm8ub2Zmc2V0WCArIGV2ZW50LmNsaWVudFgpICsgJ3B4JztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUudG9wID0gKG9mZnNldEluZm8ub2Zmc2V0WSArIGV2ZW50LmNsaWVudFkpICsgJ3B4JztcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1swXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGVzWzBdO1xuICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCk7XG4gICAgICAgICAgICBkcmFnZ2VkTm9kZS55ID0gdGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKGRyYWdnZWROb2RlLCB0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXS5jc3MoJ2xlZnQnLCB0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpICsgJ3B4Jyk7XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXS5jc3MoJ3RvcCcsIHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSkgKyAncHgnKTtcbiAgICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcyhkcmFnZ2VkTm9kZSwgdGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdlbmQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICBpZiAobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCkge1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBzaGFkb3dFbGVtZW50ID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXTtcbiAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gcGFyc2VJbnQoc2hhZG93RWxlbWVudC5jc3MoJ2xlZnQnKS5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSBwYXJzZUludChzaGFkb3dFbGVtZW50LmNzcygndG9wJykucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5yZW1vdmVDaGlsZChzaGFkb3dFbGVtZW50WzBdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZHJhZ09mZnNldHMubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZURyYWdnaW5nU2NvcGUge1xuICBkcmFnZ2VkTm9kZXM6IEFycmF5PEZjTm9kZT47XG4gIHNoYWRvd0VsZW1lbnRzOiBBcnJheTxKUXVlcnk8SFRNTEVsZW1lbnQ+PjtcbiAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRyb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJvcEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIG9mZnNldEluZm8/OiB7XG4gICAgb2Zmc2V0WDogbnVtYmVyO1xuICAgIG9mZnNldFk6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJvcFNjb3BlIHtcbiAgZHJvcEVsZW1lbnQ6IE5vZGVEcm9wRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcm9wTm9kZUluZm8ge1xuICBub2RlOiBGY05vZGU7XG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuICBvZmZzZXRYOiBudW1iZXI7XG4gIG9mZnNldFk6IG51bWJlcjtcbn1cbiJdfQ==