import { FlowchartConstants } from './ngx-flowchart.models';
const nodeDropScope = {
    dropElement: null
};
export class FcNodeDraggingService {
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
    getCoordinate(coordinate, max) {
        coordinate = Math.max(coordinate, 0);
        coordinate = Math.min(coordinate, max);
        return coordinate;
    }
    getXCoordinate(x) {
        return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
    }
    getYCoordinate(y) {
        return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
    }
    resizeCanvas(draggedNode, nodeElement) {
        if (this.automaticResize && !this.modelService.isDropSource()) {
            const canvasElement = this.modelService.canvasHtmlElement;
            if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
            }
            if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
                canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
            }
        }
    }
    isDraggingNode(node) {
        return this.nodeDraggingScope.draggedNodes.includes(node);
    }
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
        const elements = [];
        const nodes = [];
        if (this.modelService.nodes.isSelected(node)) {
            const selectedNodes = this.modelService.nodes.getSelectedNodes();
            for (const selectedNode of selectedNodes) {
                const element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
                elements.push(element);
                nodes.push(selectedNode);
            }
        }
        else {
            elements.push($(event.target));
            nodes.push(node);
        }
        const offsetsX = [];
        const offsetsY = [];
        for (const element of elements) {
            offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
            offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
        }
        const originalEvent = event.originalEvent || event;
        if (this.modelService.isDropSource()) {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            nodeDropScope.dropElement = elements[0][0].cloneNode(true);
            const offset = $(this.modelService.canvasHtmlElement).offset();
            nodeDropScope.dropElement.offsetInfo = {
                offsetX: Math.round(offsetsX[0] + offset.left),
                offsetY: Math.round(offsetsY[0] + offset.top)
            };
            nodeDropScope.dropElement.style.position = 'absolute';
            nodeDropScope.dropElement.style.pointerEvents = 'none';
            nodeDropScope.dropElement.style.zIndex = '9999';
            document.body.appendChild(nodeDropScope.dropElement);
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
                const target = event.target;
                const cloneNode = target.cloneNode(true);
                target.parentNode.insertBefore(cloneNode, target);
                target.style.visibility = 'collapse';
                setTimeout(() => {
                    target.parentNode.removeChild(cloneNode);
                    target.style.visibility = 'visible';
                }, 0);
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
                const dragOffset = this.dragOffsets[i];
                const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                const shadowElement = $(`<div style="position: absolute; opacity: 0.7; ` +
                    `top: ${this.getYCoordinate(dragOffset.y + event.clientY)}px; ` +
                    `left: ${this.getXCoordinate(dragOffset.x + event.clientX)}px; ">` +
                    `<div class="innerNode"><p style="padding: 0 15px;">${draggedNode.name}</p> </div></div>`);
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
            this.draggedElements.forEach((draggedElement) => {
                const cloneNode = draggedElement.cloneNode(true);
                draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
                draggedElement.style.visibility = 'collapse';
                setTimeout(() => {
                    draggedElement.parentNode.removeChild(cloneNode);
                    draggedElement.style.visibility = 'visible';
                }, 0);
            });
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
    drop(event) {
        if (this.modelService.isDropSource()) {
            event.preventDefault();
            return false;
        }
        let dropNode = null;
        const originalEvent = event.originalEvent || event;
        const infoText = originalEvent.dataTransfer.getData('text');
        if (infoText) {
            let dropNodeInfo = null;
            try {
                dropNodeInfo = JSON.parse(infoText);
            }
            catch (e) { }
            if (dropNodeInfo && dropNodeInfo.dropTargetId) {
                if (this.modelService.canvasHtmlElement.id &&
                    this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
                    dropNode = dropNodeInfo.node;
                    const offset = $(this.modelService.canvasHtmlElement).offset();
                    const x = event.clientX - offset.left;
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
            return this.applyFunction(() => {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    const dragOffset = this.dragOffsets[i];
                    draggedNode.x = Math.round(this.getXCoordinate(dragOffset.x + event.clientX));
                    draggedNode.y = Math.round(this.getYCoordinate(dragOffset.y + event.clientY));
                }
                event.preventDefault();
                this.modelService.notifyModelChanged();
                return false;
            });
        }
    }
    dragover(event) {
        if (nodeDropScope.dropElement) {
            const offsetInfo = nodeDropScope.dropElement.offsetInfo;
            nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
            nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
            if (this.nodeDraggingScope.shadowDragStarted) {
                this.applyFunction(() => {
                    this.destinationHtmlElements[0].style.display = this.oldDisplayStyles[0];
                    this.nodeDraggingScope.shadowDragStarted = false;
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
                return this.applyFunction(() => {
                    for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                        const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                        const dragOffset = this.dragOffsets[i];
                        draggedNode.x = this.getXCoordinate(dragOffset.x + event.clientX);
                        draggedNode.y = this.getYCoordinate(dragOffset.y + event.clientY);
                        this.resizeCanvas(draggedNode, this.draggedElements[i]);
                    }
                    event.preventDefault();
                    this.modelService.notifyModelChanged();
                    return false;
                });
            }
        }
        else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
            if (this.nodeDraggingScope.draggedNodes.length) {
                if (this.nodeDraggingScope.shadowDragStarted) {
                    this.applyFunction(() => {
                        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                            this.destinationHtmlElements[i].style.display = this.oldDisplayStyles[i];
                        }
                        this.nodeDraggingScope.shadowDragStarted = false;
                    });
                }
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
                    const dragOffset = this.dragOffsets[i];
                    this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
                    this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
                    this.resizeCanvas(draggedNode, this.draggedElements[i]);
                }
                event.preventDefault();
            }
        }
    }
    dragend(event) {
        this.applyFunction(() => {
            if (nodeDropScope.dropElement) {
                nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
                nodeDropScope.dropElement = null;
            }
            if (this.modelService.isDropSource()) {
                return;
            }
            if (this.nodeDraggingScope.shadowElements.length) {
                for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
                    const draggedNode = this.nodeDraggingScope.draggedNodes[i];
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
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFvQixrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlFLE1BQU0sYUFBYSxHQUFrQjtJQUNuQyxXQUFXLEVBQUUsSUFBSTtDQUNsQixDQUFDO0FBRUYsTUFBTSxPQUFPLHFCQUFxQjtJQW9CaEMsWUFBWSxZQUE0QixFQUM1QixhQUFrRCxFQUNsRCxlQUF3QixFQUFFLGFBQXFCO1FBcEIzRCxzQkFBaUIsR0FBc0I7WUFDckMsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsRUFBRTtZQUNoQixjQUFjLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBRU0sZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFDN0Isb0JBQWUsR0FBa0IsRUFBRSxDQUFDO1FBRXBDLDRCQUF1QixHQUFrQixFQUFFLENBQUM7UUFDNUMscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBVXRDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTyxhQUFhLENBQUMsVUFBa0IsRUFBRSxHQUFXO1FBQ25ELFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkMsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVPLGNBQWMs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QkFDbkU7Z0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDeEM7WUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvb3JkcywgRmNOb2RlLCBGbG93Y2hhcnRDb25zdGFudHMgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuY29uc3Qgbm9kZURyb3BTY29wZTogTm9kZURyb3BTY29wZSA9IHtcbiAgZHJvcEVsZW1lbnQ6IG51bGxcbn07XG5cbmV4cG9ydCBjbGFzcyBGY05vZGVEcmFnZ2luZ1NlcnZpY2Uge1xuXG4gIG5vZGVEcmFnZ2luZ1Njb3BlOiBOb2RlRHJhZ2dpbmdTY29wZSA9IHtcbiAgICBzaGFkb3dEcmFnU3RhcnRlZDogZmFsc2UsXG4gICAgZHJvcEVsZW1lbnQ6IG51bGwsXG4gICAgZHJhZ2dlZE5vZGVzOiBbXSxcbiAgICBzaGFkb3dFbGVtZW50czogW11cbiAgfTtcblxuICBwcml2YXRlIGRyYWdPZmZzZXRzOiBGY0Nvb3Jkc1tdID0gW107XG4gIHByaXZhdGUgZHJhZ2dlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgcHJpdmF0ZSBkZXN0aW5hdGlvbkh0bWxFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIG9sZERpc3BsYXlTdHlsZXM6IHN0cmluZ1tdID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IGF1dG9tYXRpY1Jlc2l6ZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnQW5pbWF0aW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQ7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSxcbiAgICAgICAgICAgICAgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQsXG4gICAgICAgICAgICAgIGF1dG9tYXRpY1Jlc2l6ZTogYm9vbGVhbiwgZHJhZ0FuaW1hdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gICAgdGhpcy5hdXRvbWF0aWNSZXNpemUgPSBhdXRvbWF0aWNSZXNpemU7XG4gICAgdGhpcy5kcmFnQW5pbWF0aW9uID0gZHJhZ0FuaW1hdGlvbjtcbiAgICB0aGlzLmFwcGx5RnVuY3Rpb24gPSBhcHBseUZ1bmN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1heChjb29yZGluYXRlLCAwKTtcbiAgICBjb29yZGluYXRlID0gTWF0aC5taW4oY29vcmRpbmF0ZSwgbWF4KTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0WENvb3JkaW5hdGUoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb29yZGluYXRlKHgsIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50Lm9mZnNldFdpZHRoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0WUNvb3JkaW5hdGUoeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb29yZGluYXRlKHksIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZUNhbnZhcyhkcmFnZ2VkTm9kZTogRmNOb2RlLCBub2RlRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5hdXRvbWF0aWNSZXNpemUgJiYgIXRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBjb25zdCBjYW52YXNFbGVtZW50ID0gdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQ7XG4gICAgICBpZiAoY2FudmFzRWxlbWVudC5vZmZzZXRXaWR0aCA8IGRyYWdnZWROb2RlLnggKyBub2RlRWxlbWVudC5vZmZzZXRXaWR0aCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVUaHJlc2hvbGQpIHtcbiAgICAgICAgY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9IGNhbnZhc0VsZW1lbnQub2Zmc2V0V2lkdGggKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplU3RlcCArICdweCc7XG4gICAgICB9XG4gICAgICBpZiAoY2FudmFzRWxlbWVudC5vZmZzZXRIZWlnaHQgPCBkcmFnZ2VkTm9kZS55ICsgbm9kZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVRocmVzaG9sZCkge1xuICAgICAgICBjYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCA9IGNhbnZhc0VsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVN0ZXAgKyAncHgnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RyYWdnaW5nTm9kZShub2RlOiBGY05vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMuaW5jbHVkZXMobm9kZSk7XG4gIH1cblxuICBwdWJsaWMgZHJhZ3N0YXJ0KGV2ZW50OiBFdmVudCB8IGFueSwgbm9kZTogRmNOb2RlKSB7XG4gICAgaWYgKG5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kcmFnT2Zmc2V0cy5sZW5ndGggPSAwO1xuICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIHRoaXMub2xkRGlzcGxheVN0eWxlcy5sZW5ndGggPSAwO1xuICAgIGNvbnN0IGVsZW1lbnRzOiBBcnJheTxKUXVlcnk8SFRNTEVsZW1lbnQ+PiA9IFtdO1xuICAgIGNvbnN0IG5vZGVzOiBBcnJheTxGY05vZGU+ID0gW107XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gICAgICBmb3IgKGNvbnN0IHNlbGVjdGVkTm9kZSBvZiBzZWxlY3RlZE5vZGVzKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmdldEh0bWxFbGVtZW50KHNlbGVjdGVkTm9kZS5pZCkpO1xuICAgICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICBub2Rlcy5wdXNoKHNlbGVjdGVkTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goJChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKTtcbiAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICAgIGNvbnN0IG9mZnNldHNYOiBudW1iZXJbXSA9IFtdO1xuICAgIGNvbnN0IG9mZnNldHNZOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgb2Zmc2V0c1gucHVzaChwYXJzZUludChlbGVtZW50LmNzcygnbGVmdCcpLCAxMCkgLSBldmVudC5jbGllbnRYKTtcbiAgICAgIG9mZnNldHNZLnB1c2gocGFyc2VJbnQoZWxlbWVudC5jc3MoJ3RvcCcpLCAxMCkgLSBldmVudC5jbGllbnRZKTtcbiAgICB9XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRXZlbnQgfCBhbnkgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpO1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBlbGVtZW50c1swXVswXS5jbG9uZU5vZGUodHJ1ZSkgYXMgTm9kZURyb3BFbGVtZW50O1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gJCh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudCkub2Zmc2V0KCk7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50Lm9mZnNldEluZm8gPSB7XG4gICAgICAgIG9mZnNldFg6IE1hdGgucm91bmQob2Zmc2V0c1hbMF0gKyBvZmZzZXQubGVmdCksXG4gICAgICAgIG9mZnNldFk6IE1hdGgucm91bmQob2Zmc2V0c1lbMF0gKyBvZmZzZXQudG9wKVxuICAgICAgfTtcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS56SW5kZXggPSAnOTk5OSc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICBjb25zdCBkcm9wTm9kZUluZm86IERyb3BOb2RlSW5mbyA9IHtcbiAgICAgICAgbm9kZSxcbiAgICAgICAgZHJvcFRhcmdldElkOiB0aGlzLm1vZGVsU2VydmljZS5kcm9wVGFyZ2V0SWQsXG4gICAgICAgIG9mZnNldFg6IE1hdGgucm91bmQob2Zmc2V0c1hbMF0gKyBvZmZzZXQubGVmdCksXG4gICAgICAgIG9mZnNldFk6IE1hdGgucm91bmQob2Zmc2V0c1lbMF0gKyBvZmZzZXQudG9wKVxuICAgICAgfTtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCBKU09OLnN0cmluZ2lmeShkcm9wTm9kZUluZm8pKTtcblxuICAgICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2xvbmVOb2RlID0gdGFyZ2V0LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZSwgdGFyZ2V0KTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICAgIHRhcmdldC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMgPSBub2RlcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5wdXNoKGVsZW1lbnRzW2ldWzBdKTtcbiAgICAgIHRoaXMuZHJhZ09mZnNldHMucHVzaChcbiAgICAgICAge1xuICAgICAgICAgIHg6IG9mZnNldHNYW2ldLFxuICAgICAgICAgIHk6IG9mZnNldHNZW2ldXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgIGNvbnN0IHNoYWRvd0VsZW1lbnQgPSAkKGA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBvcGFjaXR5OiAwLjc7IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdG9wOiAke3RoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSl9cHg7IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgbGVmdDogJHt0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpfXB4OyBcIj5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJpbm5lck5vZGVcIj48cCBzdHlsZT1cInBhZGRpbmc6IDAgMTVweDtcIj4ke2RyYWdnZWROb2RlLm5hbWV9PC9wPiA8L2Rpdj48L2Rpdj5gKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0SW5uZXJOb2RlID0gJCh0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSkuY2hpbGRyZW4oKVswXTtcbiAgICAgICAgc2hhZG93RWxlbWVudC5jaGlsZHJlbigpWzBdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRhcmdldElubmVyTm9kZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMucHVzaChzaGFkb3dFbGVtZW50KTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXVswXSk7XG4gICAgICB9XG4gICAgfVxuICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnSnVzdCB0byBzdXBwb3J0IGZpcmVmb3gnKTtcbiAgICBpZiAob3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5mb3JFYWNoKChkcmFnZ2VkRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZU5vZGUgPSBkcmFnZ2VkRWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGRyYWdnZWRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZSwgZHJhZ2dlZEVsZW1lbnQpO1xuICAgICAgICBkcmFnZ2VkRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZHJhZ2dlZEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICAgIGRyYWdnZWRFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50cy5wdXNoKHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgICB0aGlzLm9sZERpc3BsYXlTdHlsZXMucHVzaCh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkpO1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJvcChldmVudDogRXZlbnQgfCBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBkcm9wTm9kZTogRmNOb2RlID0gbnVsbDtcbiAgICBjb25zdCBvcmlnaW5hbEV2ZW50OiBFdmVudCB8IGFueSA9IChldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgY29uc3QgaW5mb1RleHQgPSBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgaWYgKGluZm9UZXh0KSB7XG4gICAgICBsZXQgZHJvcE5vZGVJbmZvOiBEcm9wTm9kZUluZm8gPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZHJvcE5vZGVJbmZvID0gSlNPTi5wYXJzZShpbmZvVGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgaWYgKGRyb3BOb2RlSW5mbyAmJiBkcm9wTm9kZUluZm8uZHJvcFRhcmdldElkKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5pZCAmJlxuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmlkID09PSBkcm9wTm9kZUluZm8uZHJvcFRhcmdldElkKSB7XG4gICAgICAgICAgZHJvcE5vZGUgPSBkcm9wTm9kZUluZm8ubm9kZTtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KS5vZmZzZXQoKTtcbiAgICAgICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIG9mZnNldC5sZWZ0O1xuICAgICAgICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gb2Zmc2V0LnRvcDtcbiAgICAgICAgICBkcm9wTm9kZS54ID0gTWF0aC5yb3VuZCh0aGlzLmdldFhDb29yZGluYXRlKGRyb3BOb2RlSW5mby5vZmZzZXRYICsgeCkpO1xuICAgICAgICAgIGRyb3BOb2RlLnkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJvcE5vZGVJbmZvLm9mZnNldFkgKyB5KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRyb3BOb2RlKSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kcm9wTm9kZShldmVudCwgZHJvcE5vZGUpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCkpO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSkpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXIoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IG9mZnNldEluZm8gPSBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50Lm9mZnNldEluZm87XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLmxlZnQgPSAob2Zmc2V0SW5mby5vZmZzZXRYICsgZXZlbnQuY2xpZW50WCkgKyAncHgnO1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS50b3AgPSAob2Zmc2V0SW5mby5vZmZzZXRZICsgZXZlbnQuY2xpZW50WSkgKyAncHgnO1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzWzBdLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZXNbMF07XG4gICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCkge1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gdGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKTtcbiAgICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSB0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoZHJhZ2dlZE5vZGUsIHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldLmNzcygnbGVmdCcsIHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCkgKyAncHgnKTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldLmNzcygndG9wJywgdGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKSArICdweCcpO1xuICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKGRyYWdnZWROb2RlLCB0aGlzLmRyYWdnZWRFbGVtZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2VuZChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgaWYgKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQpO1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3Qgc2hhZG93RWxlbWVudCA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHNbaV07XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IHBhcnNlSW50KHNoYWRvd0VsZW1lbnQuY3NzKCdsZWZ0JykucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgICAgICAgICBkcmFnZ2VkTm9kZS55ID0gcGFyc2VJbnQoc2hhZG93RWxlbWVudC5jc3MoJ3RvcCcpLnJlcGxhY2UoJ3B4JywgJycpLCAxMCk7XG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQucmVtb3ZlQ2hpbGQoc2hhZG93RWxlbWVudFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub3RpZnlNb2RlbENoYW5nZWQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRyYWdPZmZzZXRzLmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVEcmFnZ2luZ1Njb3BlIHtcbiAgZHJhZ2dlZE5vZGVzOiBBcnJheTxGY05vZGU+O1xuICBzaGFkb3dFbGVtZW50czogQXJyYXk8SlF1ZXJ5PEhUTUxFbGVtZW50Pj47XG4gIHNoYWRvd0RyYWdTdGFydGVkOiBib29sZWFuO1xuICBkcm9wRWxlbWVudDogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZURyb3BFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBvZmZzZXRJbmZvPzoge1xuICAgIG9mZnNldFg6IG51bWJlcjtcbiAgICBvZmZzZXRZOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZURyb3BTY29wZSB7XG4gIGRyb3BFbGVtZW50OiBOb2RlRHJvcEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcE5vZGVJbmZvIHtcbiAgbm9kZTogRmNOb2RlO1xuICBkcm9wVGFyZ2V0SWQ6IHN0cmluZztcbiAgb2Zmc2V0WDogbnVtYmVyO1xuICBvZmZzZXRZOiBudW1iZXI7XG59XG4iXX0=