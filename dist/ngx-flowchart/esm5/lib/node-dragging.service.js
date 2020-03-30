import { __values } from "tslib";
import { FlowchartConstants } from './ngx-flowchart.models';
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
    FcNodeDraggingService.prototype.getCoordinate = function (coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    };
    FcNodeDraggingService.prototype.getXCoordinate = function (x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    };
    FcNodeDraggingService.prototype.getYCoordinate = function (y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    };
    FcNodeDraggingService.prototype.resizeCanvas = function (draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            var canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    };
    FcNodeDraggingService.prototype.isDraggingNode = function (node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    };
    FcNodeDraggingService.prototype.dragstart = function (event, node) {
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
        var elements = [];
        var nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            var selectedNodes = this.modelService.nodes.getSelectedNodes();
            try {
                for (var selectedNodes_1 = __values(selectedNodes), selectedNodes_1_1 = selectedNodes_1.next(); !selectedNodes_1_1.done; selectedNodes_1_1 = selectedNodes_1.next()) {
                    var selectedNode = selectedNodes_1_1.value;
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
            elements.push($(event.target));
            nodes.push(node);
        }
        var offsetsX = [];
        var offsetsY = [];
        try {
            for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
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
        var originalEvent = event.originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = elements[0][0].cloneNode(true);
            var offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
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
                var target_1 = event.target;
                var cloneNode_1 = target_1.cloneNode(true);
                target_1.parentNode.insertBefore(cloneNode_1, target_1);
                target_1.style.visibility = 'collapse';
                setTimeout(function () {
                    target_1.parentNode.removeChild(cloneNode_1);
                    target_1.style.visibility = 'visible';
                }, 0);
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
                var dragOffset = this.dragOffsets[i];
                var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                var shadowElement = $("<div style=\"position: absolute; opacity: 0.7; " +
                    ("top: " + this.getYCoordinate(dragOffset.y + event.clientY) + "px; ") +
                    ("left: " + this.getXCoordinate(dragOffset.x + event.clientX) + "px; \">") +
                    ("<div class=\"innerNode\"><p style=\"padding: 0 15px;\">" + draggedNode.name + "</p> </div></div>"));
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
            this.draggedElements.forEach(function (draggedElement) {
                var cloneNode = draggedElement.cloneNode(true);
                draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
                draggedElement.style.visibility = 'collapse';
                setTimeout(function () {
                    draggedElement.parentNode.removeChild(cloneNode);
                    draggedElement.style.visibility = 'visible';
                }, 0);
            });
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
    FcNodeDraggingService.prototype.drop = function (event) {
        var _this = this;
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        var dropNode = null;
        var originalEvent = event.originalEvent || event;
        var infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            var dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    var offset = $(this.modelService.canvasHtmlElement).offset();
                    var x = event.clientX - offset.left;
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
            return this.applyFunction(function () {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                    var dragOffset = _this.dragOffsets[i];
                    draggedNode.x = Math.round(_this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(_this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                _this.modelService.notifyModelChanged();
                return false;
            });
        }
    };
    FcNodeDraggingService.prototype.dragover = function (event) {
        var _this = this;
        if (nodeDropScope.dropElement) {
            var offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction(function () {
                    _this.destinationHtmlElements[0].style.display = _this.oldDisplayStyles[0];
                    _this.nodeDraggingScope.shadowDragStarted = false;
                });
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
                return this.applyFunction(function () {
                    for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                        var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
                        var dragOffset = _this.dragOffsets[i];
                        draggedNode.x = _this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = _this.getYCoordinate(dragOffset.y + event.clientY);
                        _this.resizeCanvas(draggedNode, _this.draggedElements[i]);
                    }
                    event.preventDefault();
                    _this.modelService.notifyModelChanged();
                    return false;
                });
            }
        }
        else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                if (this.nodeDraggingScope.shadowDragStarted) {
                    this.applyFunction(function () {
                        for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                            _this.destinationHtmlElements[i].style.display = _this.oldDisplayStyles[i];
                        }
                        _this.nodeDraggingScope.shadowDragStarted = false;
                    });
                }
                for (var i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    var draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    var dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    };
    FcNodeDraggingService.prototype.dragend = function (event) {
        var _this = this;
        this.applyFunction(function () {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (_this.modelService.isDropSource()) {
                return;
            }
            if (_this.nodeDraggingScope.shadowElements.length) {
                for (var i = 0; i < _this.nodeDraggingScope.draggedNodes.length; i++) {
                    var draggedNode = _this.nodeDraggingScope.draggedNodes[i];
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
        });
    };
    return FcNodeDraggingService;
}());
export { FcNodeDraggingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBb0Isa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU5RSxJQUFNLGFBQWEsR0FBa0I7SUFDbkMsV0FBVyxFQUFFLElBQUk7Q0FDbEIsQ0FBQztBQUVGO0lBb0JFLCtCQUFZLFlBQTRCLEVBQzVCLGFBQWtELEVBQ2xELGVBQXdCLEVBQUUsYUFBcUI7UUFwQjNELHNCQUFpQixHQUFzQjtZQUNyQyxpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGNBQWMsRUFBRSxFQUFFO1NBQ25CLENBQUM7UUFFTSxnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFrQixFQUFFLENBQUM7UUFFcEMsNEJBQXVCLEdBQWtCLEVBQUUsQ0FBQztRQUM1QyxxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFVdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVPLDZDQUFhLEdBQXJCLFVBQXNCLFVBQWtCLEVBQUUsR0FBVztRQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFTyw4Q0FBYyxHQUF0QixVQUF1QixDQUFTO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU8sOENBQWMsR0FBdEIsVUFBdUIsQ0FBUztRQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVPLDRDQUFZLEdBQXBCLFVBQXFCLFdBQW1CLEVBQUUsV0FBd0I7UUFDaEUsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUM3RCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1lBQzFELElBQUksYUFBYSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMscUJBQXFCLEVBQUU7Z0JBQ2xILGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQ3BHO1lBQ0QsSUFBSSxhQUFhLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxxQkFBcUIsRUFBRTtnQkFDcEgsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7YUFDdEc7U0FDRjtJQUNILENBQUM7SUFFTSw4Q0FBYyxHQUFyQixVQUFzQixJQUFZO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLHlDQUFTLEdBQWhCLFVBQWlCLEtBQWtCLEVBQUUsSUFBWTs7UUFDL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFNLFFBQVEsR0FBK0IsRUFBRSxDQUFDO1FBQ2hELElBQU0sS0FBSyxHQUFrQixFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7Z0JBQ2pFLEtBQTJCLElBQUEsa0JBQUEsU0FBQSxhQUFhLENBQUEsNENBQUEsdUVBQUU7b0JBQXJDLElBQU0sWUFBWSwwQkFBQTtvQkFDckIsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0UsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDMUI7Ozs7Ozs7OztTQUNGO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDOUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQjtRQUNELElBQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7O1lBQzlCLEtBQXNCLElBQUEsYUFBQSxTQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtnQkFBM0IsSUFBTSxPQUFPLHFCQUFBO2dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakU7Ozs7Ozs7OztRQUNELElBQU0sYUFBYSxHQUFpQixLQUFhLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztRQUN6RSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDcEMsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFO2dCQUM3QixhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM1RSxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUNsQztZQUNELGFBQWEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQW9CLENBQUM7WUFDOUUsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvRCxhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRztnQkFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQzlDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQzlDLENBQUM7WUFDRixhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQ3RELGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDdkQsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUVoRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckQsSUFBTSxZQUFZLEdBQWlCO2dCQUNqQyxJQUFJLE1BQUE7Z0JBQ0osWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTtnQkFDNUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQzlDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQzlDLENBQUM7WUFDRixhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBRXpFLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQzNDLGFBQWEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pGO2lCQUFNO2dCQUNMLElBQU0sUUFBTSxHQUFnQixLQUFLLENBQUMsTUFBcUIsQ0FBQztnQkFDeEQsSUFBTSxXQUFTLEdBQUcsUUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekMsUUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBUyxFQUFFLFFBQU0sQ0FBQyxDQUFDO2dCQUNsRCxRQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQ3JDLFVBQVUsQ0FBQztvQkFDVCxRQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFTLENBQUMsQ0FBQztvQkFDekMsUUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUN0QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDUDtZQUNELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNuQjtnQkFDRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNmLENBQ0YsQ0FBQztTQUNIO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFO1lBQ2pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLGlEQUFnRDtxQkFDaEQsVUFBUSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFNLENBQUE7cUJBQy9ELFdBQVMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBUSxDQUFBO3FCQUNsRSw0REFBc0QsV0FBVyxDQUFDLElBQUksc0JBQW1CLENBQUEsQ0FBQyxDQUFDO2dCQUNuSCxJQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5RjtTQUNGO1FBQ0QsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDdEUsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtZQUMzQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQyxjQUFjO2dCQUMxQyxJQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxjQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ2xFLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0MsVUFBVSxDQUFDO29CQUNULGNBQWMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqRCxjQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7Z0JBQzlDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFO2dCQUNqRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3BELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztpQkFDeEQ7Z0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUNqRDtTQUNGO0lBQ0gsQ0FBQztJQUVNLG9DQUFJLEdBQVgsVUFBWSxLQUFrQjtRQUE5QixpQkEwQ0M7UUF6Q0MsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDO1FBQzVCLElBQU0sYUFBYSxHQUFpQixLQUFhLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztRQUN6RSxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksWUFBWSxHQUFpQixJQUFJLENBQUM7WUFDdEMsSUFBSTtnQkFDRixZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNyQztZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFDZCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFO2dCQUM3QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssWUFBWSxDQUFDLFlBQVksRUFBRTtvQkFDdEUsUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQzdCLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQy9ELElBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDdEMsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNyQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEU7YUFDRjtTQUNGO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDNUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3JELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuRSxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM5RSxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUMvRTtnQkFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDdkMsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLHdDQUFRLEdBQWYsVUFBZ0IsS0FBa0I7UUFBbEMsaUJBeURDO1FBeERDLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUM3QixJQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztZQUN4RCxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbkYsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2xGLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFO2dCQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUNqQixLQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRTtZQUNsRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUM5QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbkUsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0QsSUFBTSxVQUFVLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsV0FBVyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNsRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2xFLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekQ7b0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxrQkFBa0IsQ0FBQyxtQkFBbUIsRUFBRTtZQUN4RSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUM5QyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzt3QkFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNuRSxLQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFFO3dCQUNELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7b0JBQ25ELENBQUMsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbkUsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQy9HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM5RyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pEO2dCQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4QjtTQUNGO0lBQ0gsQ0FBQztJQUVNLHVDQUFPLEdBQWQsVUFBZSxLQUFrQjtRQUFqQyxpQkEyQkM7UUExQkMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNqQixJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzdCLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzVFLGFBQWEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNwQyxPQUFPO2FBQ1I7WUFDRCxJQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUNoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ25FLElBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELElBQU0sYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDMUUsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN6RSxLQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkU7Z0JBQ0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDeEM7WUFFRCxJQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUM5QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgsNEJBQUM7QUFBRCxDQUFDLEFBcFRELElBb1RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNDb29yZHMsIEZjTm9kZSwgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbmNvbnN0IG5vZGVEcm9wU2NvcGU6IE5vZGVEcm9wU2NvcGUgPSB7XG4gIGRyb3BFbGVtZW50OiBudWxsXG59O1xuXG5leHBvcnQgY2xhc3MgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlIHtcblxuICBub2RlRHJhZ2dpbmdTY29wZTogTm9kZURyYWdnaW5nU2NvcGUgPSB7XG4gICAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGZhbHNlLFxuICAgIGRyb3BFbGVtZW50OiBudWxsLFxuICAgIGRyYWdnZWROb2RlczogW10sXG4gICAgc2hhZG93RWxlbWVudHM6IFtdXG4gIH07XG5cbiAgcHJpdmF0ZSBkcmFnT2Zmc2V0czogRmNDb29yZHNbXSA9IFtdO1xuICBwcml2YXRlIGRyYWdnZWRFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gIHByaXZhdGUgZGVzdGluYXRpb25IdG1sRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBvbGREaXNwbGF5U3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBULFxuICAgICAgICAgICAgICBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW4sIGRyYWdBbmltYXRpb246IHN0cmluZykge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICAgIHRoaXMuYXV0b21hdGljUmVzaXplID0gYXV0b21hdGljUmVzaXplO1xuICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiA9IGRyYWdBbmltYXRpb247XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29vcmRpbmF0ZShjb29yZGluYXRlOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb29yZGluYXRlID0gTWF0aC5tYXgoY29vcmRpbmF0ZSwgMCk7XG4gICAgY29vcmRpbmF0ZSA9IE1hdGgubWluKGNvb3JkaW5hdGUsIG1heCk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XG4gIH1cblxuICBwcml2YXRlIGdldFhDb29yZGluYXRlKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZSh4LCB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5vZmZzZXRXaWR0aCk7XG4gIH1cblxuICBwcml2YXRlIGdldFlDb29yZGluYXRlKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29vcmRpbmF0ZSh5LCB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVDYW52YXMoZHJhZ2dlZE5vZGU6IEZjTm9kZSwgbm9kZUVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuYXV0b21hdGljUmVzaXplICYmICF0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgY29uc3QgY2FudmFzRWxlbWVudCA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgICAgaWYgKGNhbnZhc0VsZW1lbnQub2Zmc2V0V2lkdGggPCBkcmFnZ2VkTm9kZS54ICsgbm9kZUVsZW1lbnQub2Zmc2V0V2lkdGggKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplVGhyZXNob2xkKSB7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGggPSBjYW52YXNFbGVtZW50Lm9mZnNldFdpZHRoICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVN0ZXAgKyAncHgnO1xuICAgICAgfVxuICAgICAgaWYgKGNhbnZhc0VsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZHJhZ2dlZE5vZGUueSArIG5vZGVFbGVtZW50Lm9mZnNldEhlaWdodCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVUaHJlc2hvbGQpIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjYW52YXNFbGVtZW50Lm9mZnNldEhlaWdodCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVTdGVwICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEcmFnZ2luZ05vZGUobm9kZTogRmNOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmluY2x1ZGVzKG5vZGUpO1xuICB9XG5cbiAgcHVibGljIGRyYWdzdGFydChldmVudDogRXZlbnQgfCBhbnksIG5vZGU6IEZjTm9kZSkge1xuICAgIGlmIChub2RlLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZHJhZ09mZnNldHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm9sZERpc3BsYXlTdHlsZXMubGVuZ3RoID0gMDtcbiAgICBjb25zdCBlbGVtZW50czogQXJyYXk8SlF1ZXJ5PEhUTUxFbGVtZW50Pj4gPSBbXTtcbiAgICBjb25zdCBub2RlczogQXJyYXk8RmNOb2RlPiA9IFtdO1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgZm9yIChjb25zdCBzZWxlY3RlZE5vZGUgb2Ygc2VsZWN0ZWROb2Rlcykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5nZXRIdG1sRWxlbWVudChzZWxlY3RlZE5vZGUuaWQpKTtcbiAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgbm9kZXMucHVzaChzZWxlY3RlZE5vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50cy5wdXNoKCQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSk7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXRzWDogbnVtYmVyW10gPSBbXTtcbiAgICBjb25zdCBvZmZzZXRzWTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgIG9mZnNldHNYLnB1c2gocGFyc2VJbnQoZWxlbWVudC5jc3MoJ2xlZnQnKSwgMTApIC0gZXZlbnQuY2xpZW50WCk7XG4gICAgICBvZmZzZXRzWS5wdXNoKHBhcnNlSW50KGVsZW1lbnQuY3NzKCd0b3AnKSwgMTApIC0gZXZlbnQuY2xpZW50WSk7XG4gICAgfVxuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IEV2ZW50IHwgYW55ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50ID0gZWxlbWVudHNbMF1bMF0uY2xvbmVOb2RlKHRydWUpIGFzIE5vZGVEcm9wRWxlbWVudDtcbiAgICAgIGNvbnN0IG9mZnNldCA9ICQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpLm9mZnNldCgpO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5vZmZzZXRJbmZvID0ge1xuICAgICAgICBvZmZzZXRYOiBNYXRoLnJvdW5kKG9mZnNldHNYWzBdICsgb2Zmc2V0LmxlZnQpLFxuICAgICAgICBvZmZzZXRZOiBNYXRoLnJvdW5kKG9mZnNldHNZWzBdICsgb2Zmc2V0LnRvcClcbiAgICAgIH07XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzk5OTknO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpO1xuICAgICAgY29uc3QgZHJvcE5vZGVJbmZvOiBEcm9wTm9kZUluZm8gPSB7XG4gICAgICAgIG5vZGUsXG4gICAgICAgIGRyb3BUYXJnZXRJZDogdGhpcy5tb2RlbFNlcnZpY2UuZHJvcFRhcmdldElkLFxuICAgICAgICBvZmZzZXRYOiBNYXRoLnJvdW5kKG9mZnNldHNYWzBdICsgb2Zmc2V0LmxlZnQpLFxuICAgICAgICBvZmZzZXRZOiBNYXRoLnJvdW5kKG9mZnNldHNZWzBdICsgb2Zmc2V0LnRvcClcbiAgICAgIH07XG4gICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgSlNPTi5zdHJpbmdpZnkoZHJvcE5vZGVJbmZvKSk7XG5cbiAgICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMubW9kZWxTZXJ2aWNlLmdldERyYWdJbWFnZSgpLCAwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNsb25lTm9kZSA9IHRhcmdldC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUsIHRhcmdldCk7XG4gICAgICAgIHRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgICB0YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzID0gbm9kZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMucHVzaChlbGVtZW50c1tpXVswXSk7XG4gICAgICB0aGlzLmRyYWdPZmZzZXRzLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBvZmZzZXRzWFtpXSxcbiAgICAgICAgICB5OiBvZmZzZXRzWVtpXVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICBjb25zdCBzaGFkb3dFbGVtZW50ID0gJChgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgb3BhY2l0eTogMC43OyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRvcDogJHt0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpfXB4OyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGxlZnQ6ICR7dGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKX1weDsgXCI+YCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaW5uZXJOb2RlXCI+PHAgc3R5bGU9XCJwYWRkaW5nOiAwIDE1cHg7XCI+JHtkcmFnZ2VkTm9kZS5uYW1lfTwvcD4gPC9kaXY+PC9kaXY+YCk7XG4gICAgICAgIGNvbnN0IHRhcmdldElubmVyTm9kZSA9ICQodGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pLmNoaWxkcmVuKClbMF07XG4gICAgICAgIHNoYWRvd0VsZW1lbnQuY2hpbGRyZW4oKVswXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0YXJnZXRJbm5lck5vZGUuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLnB1c2goc2hhZG93RWxlbWVudCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHNbaV1bMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ0p1c3QgdG8gc3VwcG9ydCBmaXJlZm94Jyk7XG4gICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMubW9kZWxTZXJ2aWNlLmdldERyYWdJbWFnZSgpLCAwLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMuZm9yRWFjaCgoZHJhZ2dlZEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2xvbmVOb2RlID0gZHJhZ2dlZEVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBkcmFnZ2VkRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUsIGRyYWdnZWRFbGVtZW50KTtcbiAgICAgICAgZHJhZ2dlZEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGRyYWdnZWRFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgICBkcmFnZ2VkRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHMucHVzaCh0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLnB1c2godGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5KTtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyb3AoZXZlbnQ6IEV2ZW50IHwgYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgZHJvcE5vZGU6IEZjTm9kZSA9IG51bGw7XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRXZlbnQgfCBhbnkgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuICAgIGNvbnN0IGluZm9UZXh0ID0gb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xuICAgIGlmIChpbmZvVGV4dCkge1xuICAgICAgbGV0IGRyb3BOb2RlSW5mbzogRHJvcE5vZGVJbmZvID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRyb3BOb2RlSW5mbyA9IEpTT04ucGFyc2UoaW5mb1RleHQpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIGlmIChkcm9wTm9kZUluZm8gJiYgZHJvcE5vZGVJbmZvLmRyb3BUYXJnZXRJZCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQuaWQgJiZcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5pZCA9PT0gZHJvcE5vZGVJbmZvLmRyb3BUYXJnZXRJZCkge1xuICAgICAgICAgIGRyb3BOb2RlID0gZHJvcE5vZGVJbmZvLm5vZGU7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gJCh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudCkub2Zmc2V0KCk7XG4gICAgICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSBvZmZzZXQubGVmdDtcbiAgICAgICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIG9mZnNldC50b3A7XG4gICAgICAgICAgZHJvcE5vZGUueCA9IE1hdGgucm91bmQodGhpcy5nZXRYQ29vcmRpbmF0ZShkcm9wTm9kZUluZm8ub2Zmc2V0WCArIHgpKTtcbiAgICAgICAgICBkcm9wTm9kZS55ID0gTWF0aC5yb3VuZCh0aGlzLmdldFlDb29yZGluYXRlKGRyb3BOb2RlSW5mby5vZmZzZXRZICsgeSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkcm9wTm9kZSkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZHJvcE5vZGUoZXZlbnQsIGRyb3BOb2RlKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gTWF0aC5yb3VuZCh0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpKTtcbiAgICAgICAgICBkcmFnZ2VkTm9kZS55ID0gTWF0aC5yb3VuZCh0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdvdmVyKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICBjb25zdCBvZmZzZXRJbmZvID0gbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5vZmZzZXRJbmZvO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5sZWZ0ID0gKG9mZnNldEluZm8ub2Zmc2V0WCArIGV2ZW50LmNsaWVudFgpICsgJ3B4JztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUudG9wID0gKG9mZnNldEluZm8ub2Zmc2V0WSArIGV2ZW50LmNsaWVudFkpICsgJ3B4JztcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1swXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGVzWzBdO1xuICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCk7XG4gICAgICAgICAgICBkcmFnZ2VkTm9kZS55ID0gdGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKGRyYWdnZWROb2RlLCB0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXS5jc3MoJ2xlZnQnLCB0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpICsgJ3B4Jyk7XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXS5jc3MoJ3RvcCcsIHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSkgKyAncHgnKTtcbiAgICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcyhkcmFnZ2VkTm9kZSwgdGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRyYWdlbmQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIGlmIChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IHNoYWRvd0VsZW1lbnQgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnggPSBwYXJzZUludChzaGFkb3dFbGVtZW50LmNzcygnbGVmdCcpLnJlcGxhY2UoJ3B4JywgJycpLCAxMCk7XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IHBhcnNlSW50KHNoYWRvd0VsZW1lbnQuY3NzKCd0b3AnKS5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LnJlbW92ZUNoaWxkKHNoYWRvd0VsZW1lbnRbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kcmFnT2Zmc2V0cy5sZW5ndGggPSAwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJhZ2dpbmdTY29wZSB7XG4gIGRyYWdnZWROb2RlczogQXJyYXk8RmNOb2RlPjtcbiAgc2hhZG93RWxlbWVudHM6IEFycmF5PEpRdWVyeTxIVE1MRWxlbWVudD4+O1xuICBzaGFkb3dEcmFnU3RhcnRlZDogYm9vbGVhbjtcbiAgZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcm9wRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgb2Zmc2V0SW5mbz86IHtcbiAgICBvZmZzZXRYOiBudW1iZXI7XG4gICAgb2Zmc2V0WTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcm9wU2NvcGUge1xuICBkcm9wRWxlbWVudDogTm9kZURyb3BFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3BOb2RlSW5mbyB7XG4gIG5vZGU6IEZjTm9kZTtcbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG4gIG9mZnNldFg6IG51bWJlcjtcbiAgb2Zmc2V0WTogbnVtYmVyO1xufVxuIl19