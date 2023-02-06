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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWZsb3djaGFydC9zcmMvbGliL25vZGUtZHJhZ2dpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFOUUsTUFBTSxhQUFhLEdBQWtCO0lBQ25DLFdBQVcsRUFBRSxJQUFJO0NBQ2xCLENBQUM7QUFFRixNQUFNLE9BQU8scUJBQXFCO0lBb0JoQyxZQUFZLFlBQTRCLEVBQzVCLGFBQWtELEVBQ2xELGVBQXdCLEVBQUUsYUFBcUI7UUFwQjNELHNCQUFpQixHQUFzQjtZQUNyQyxpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGNBQWMsRUFBRSxFQUFFO1NBQ25CLENBQUM7UUFFTSxnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixvQkFBZSxHQUFrQixFQUFFLENBQUM7UUFFcEMsNEJBQXVCLEdBQWtCLEVBQUUsQ0FBQztRQUM1QyxxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFVdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVPLGFBQWEsQ0FBQyxVQUFrQixFQUFFLEdBQVc7UUFDbkQsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxPQUFPLFVBQVUsQ0FBQztJ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QUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuRTtnQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUN4QztZQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjQ29vcmRzLCBGY05vZGUsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5jb25zdCBub2RlRHJvcFNjb3BlOiBOb2RlRHJvcFNjb3BlID0ge1xuICBkcm9wRWxlbWVudDogbnVsbFxufTtcblxuZXhwb3J0IGNsYXNzIEZjTm9kZURyYWdnaW5nU2VydmljZSB7XG5cbiAgbm9kZURyYWdnaW5nU2NvcGU6IE5vZGVEcmFnZ2luZ1Njb3BlID0ge1xuICAgIHNoYWRvd0RyYWdTdGFydGVkOiBmYWxzZSxcbiAgICBkcm9wRWxlbWVudDogbnVsbCxcbiAgICBkcmFnZ2VkTm9kZXM6IFtdLFxuICAgIHNoYWRvd0VsZW1lbnRzOiBbXVxuICB9O1xuXG4gIHByaXZhdGUgZHJhZ09mZnNldHM6IEZjQ29vcmRzW10gPSBbXTtcbiAgcHJpdmF0ZSBkcmFnZ2VkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICBwcml2YXRlIGRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gIHByaXZhdGUgb2xkRGlzcGxheVN0eWxlczogc3RyaW5nW10gPSBbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgYXV0b21hdGljUmVzaXplOiBib29sZWFuO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdBbmltYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVDtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVCxcbiAgICAgICAgICAgICAgYXV0b21hdGljUmVzaXplOiBib29sZWFuLCBkcmFnQW5pbWF0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgICB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSA9IGF1dG9tYXRpY1Jlc2l6ZTtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSBkcmFnQW5pbWF0aW9uO1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbiA9IGFwcGx5RnVuY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGdldENvb3JkaW5hdGUoY29vcmRpbmF0ZTogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29vcmRpbmF0ZSA9IE1hdGgubWF4KGNvb3JkaW5hdGUsIDApO1xuICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1pbihjb29yZGluYXRlLCBtYXgpO1xuICAgIHJldHVybiBjb29yZGluYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRYQ29vcmRpbmF0ZSh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENvb3JkaW5hdGUoeCwgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQub2Zmc2V0V2lkdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRZQ29vcmRpbmF0ZSh5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENvb3JkaW5hdGUoeSwgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplQ2FudmFzKGRyYWdnZWROb2RlOiBGY05vZGUsIG5vZGVFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmICh0aGlzLmF1dG9tYXRpY1Jlc2l6ZSAmJiAhdGhpcy5tb2RlbFNlcnZpY2UuaXNEcm9wU291cmNlKCkpIHtcbiAgICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICAgIGlmIChjYW52YXNFbGVtZW50Lm9mZnNldFdpZHRoIDwgZHJhZ2dlZE5vZGUueCArIG5vZGVFbGVtZW50Lm9mZnNldFdpZHRoICsgRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc1Jlc2l6ZVRocmVzaG9sZCkge1xuICAgICAgICBjYW52YXNFbGVtZW50LnN0eWxlLndpZHRoID0gY2FudmFzRWxlbWVudC5vZmZzZXRXaWR0aCArIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNSZXNpemVTdGVwICsgJ3B4JztcbiAgICAgIH1cbiAgICAgIGlmIChjYW52YXNFbGVtZW50Lm9mZnNldEhlaWdodCA8IGRyYWdnZWROb2RlLnkgKyBub2RlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplVGhyZXNob2xkKSB7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY2FudmFzRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzUmVzaXplU3RlcCArICdweCc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRHJhZ2dpbmdOb2RlKG5vZGU6IEZjTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5pbmNsdWRlcyhub2RlKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnc3RhcnQoZXZlbnQ6IEV2ZW50IHwgYW55LCBub2RlOiBGY05vZGUpIHtcbiAgICBpZiAobm9kZS5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyYWdPZmZzZXRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGggPSAwO1xuICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5vbGREaXNwbGF5U3R5bGVzLmxlbmd0aCA9IDA7XG4gICAgY29uc3QgZWxlbWVudHM6IEFycmF5PEpRdWVyeTxIVE1MRWxlbWVudD4+ID0gW107XG4gICAgY29uc3Qgbm9kZXM6IEFycmF5PEZjTm9kZT4gPSBbXTtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaXNTZWxlY3RlZChub2RlKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgIGZvciAoY29uc3Qgc2VsZWN0ZWROb2RlIG9mIHNlbGVjdGVkTm9kZXMpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuZ2V0SHRtbEVsZW1lbnQoc2VsZWN0ZWROb2RlLmlkKSk7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIG5vZGVzLnB1c2goc2VsZWN0ZWROb2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudHMucHVzaCgkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpO1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gICAgY29uc3Qgb2Zmc2V0c1g6IG51bWJlcltdID0gW107XG4gICAgY29uc3Qgb2Zmc2V0c1k6IG51bWJlcltdID0gW107XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICBvZmZzZXRzWC5wdXNoKHBhcnNlSW50KGVsZW1lbnQuY3NzKCdsZWZ0JyksIDEwKSAtIGV2ZW50LmNsaWVudFgpO1xuICAgICAgb2Zmc2V0c1kucHVzaChwYXJzZUludChlbGVtZW50LmNzcygndG9wJyksIDEwKSAtIGV2ZW50LmNsaWVudFkpO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbEV2ZW50OiBFdmVudCB8IGFueSA9IChldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBpZiAobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCkge1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCA9IGVsZW1lbnRzWzBdWzBdLmNsb25lTm9kZSh0cnVlKSBhcyBOb2RlRHJvcEVsZW1lbnQ7XG4gICAgICBjb25zdCBvZmZzZXQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KS5vZmZzZXQoKTtcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQub2Zmc2V0SW5mbyA9IHtcbiAgICAgICAgb2Zmc2V0WDogTWF0aC5yb3VuZChvZmZzZXRzWFswXSArIG9mZnNldC5sZWZ0KSxcbiAgICAgICAgb2Zmc2V0WTogTWF0aC5yb3VuZChvZmZzZXRzWVswXSArIG9mZnNldC50b3ApXG4gICAgICB9O1xuICAgICAgbm9kZURyb3BTY29wZS5kcm9wRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnpJbmRleCA9ICc5OTk5JztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50KTtcbiAgICAgIGNvbnN0IGRyb3BOb2RlSW5mbzogRHJvcE5vZGVJbmZvID0ge1xuICAgICAgICBub2RlLFxuICAgICAgICBkcm9wVGFyZ2V0SWQ6IHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BUYXJnZXRJZCxcbiAgICAgICAgb2Zmc2V0WDogTWF0aC5yb3VuZChvZmZzZXRzWFswXSArIG9mZnNldC5sZWZ0KSxcbiAgICAgICAgb2Zmc2V0WTogTWF0aC5yb3VuZChvZmZzZXRzWVswXSArIG9mZnNldC50b3ApXG4gICAgICB9O1xuICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIEpTT04uc3RyaW5naWZ5KGRyb3BOb2RlSW5mbykpO1xuXG4gICAgICBpZiAob3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBjbG9uZU5vZGUgPSB0YXJnZXQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB0YXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVOb2RlLCB0YXJnZXQpO1xuICAgICAgICB0YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRhcmdldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgICAgdGFyZ2V0LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2RlcyA9IG5vZGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLnB1c2goZWxlbWVudHNbaV1bMF0pO1xuICAgICAgdGhpcy5kcmFnT2Zmc2V0cy5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgeDogb2Zmc2V0c1hbaV0sXG4gICAgICAgICAgeTogb2Zmc2V0c1lbaV1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgY29uc3Qgc2hhZG93RWxlbWVudCA9ICQoYDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IG9wYWNpdHk6IDAuNzsgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0b3A6ICR7dGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKX1weDsgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBsZWZ0OiAke3RoaXMuZ2V0WENvb3JkaW5hdGUoZHJhZ09mZnNldC54ICsgZXZlbnQuY2xpZW50WCl9cHg7IFwiPmAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImlubmVyTm9kZVwiPjxwIHN0eWxlPVwicGFkZGluZzogMCAxNXB4O1wiPiR7ZHJhZ2dlZE5vZGUubmFtZX08L3A+IDwvZGl2PjwvZGl2PmApO1xuICAgICAgICBjb25zdCB0YXJnZXRJbm5lck5vZGUgPSAkKHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKS5jaGlsZHJlbigpWzBdO1xuICAgICAgICBzaGFkb3dFbGVtZW50LmNoaWxkcmVuKClbMF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGFyZ2V0SW5uZXJOb2RlLnN0eWxlLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50cy5wdXNoKHNoYWRvd0VsZW1lbnQpO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzW2ldWzBdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdKdXN0IHRvIHN1cHBvcnQgZmlyZWZveCcpO1xuICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmZvckVhY2goKGRyYWdnZWRFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb25lTm9kZSA9IGRyYWdnZWRFbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgZHJhZ2dlZEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVOb2RlLCBkcmFnZ2VkRWxlbWVudCk7XG4gICAgICAgIGRyYWdnZWRFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkcmFnZ2VkRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgICAgZHJhZ2dlZEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgfSwgMCk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2VkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnRzLnB1c2godGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pO1xuICAgICAgICAgIHRoaXMub2xkRGlzcGxheVN0eWxlcy5wdXNoKHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSk7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RHJhZ1N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcm9wKGV2ZW50OiBFdmVudCB8IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0Ryb3BTb3VyY2UoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGRyb3BOb2RlOiBGY05vZGUgPSBudWxsO1xuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IEV2ZW50IHwgYW55ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbiAgICBjb25zdCBpbmZvVGV4dCA9IG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKTtcbiAgICBpZiAoaW5mb1RleHQpIHtcbiAgICAgIGxldCBkcm9wTm9kZUluZm86IERyb3BOb2RlSW5mbyA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBkcm9wTm9kZUluZm8gPSBKU09OLnBhcnNlKGluZm9UZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICBpZiAoZHJvcE5vZGVJbmZvICYmIGRyb3BOb2RlSW5mby5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50LmlkICYmXG4gICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQuaWQgPT09IGRyb3BOb2RlSW5mby5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgICAgICBkcm9wTm9kZSA9IGRyb3BOb2RlSW5mby5ub2RlO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9ICQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpLm9mZnNldCgpO1xuICAgICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSBvZmZzZXQudG9wO1xuICAgICAgICAgIGRyb3BOb2RlLnggPSBNYXRoLnJvdW5kKHRoaXMuZ2V0WENvb3JkaW5hdGUoZHJvcE5vZGVJbmZvLm9mZnNldFggKyB4KSk7XG4gICAgICAgICAgZHJvcE5vZGUueSA9IE1hdGgucm91bmQodGhpcy5nZXRZQ29vcmRpbmF0ZShkcm9wTm9kZUluZm8ub2Zmc2V0WSArIHkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZHJvcE5vZGUpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BOb2RlKGV2ZW50LCBkcm9wTm9kZSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgY29uc3QgZHJhZ09mZnNldCA9IHRoaXMuZHJhZ09mZnNldHNbaV07XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueCA9IE1hdGgucm91bmQodGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKSk7XG4gICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IE1hdGgucm91bmQodGhpcy5nZXRZQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnkgKyBldmVudC5jbGllbnRZKSk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm90aWZ5TW9kZWxDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlcihldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCkge1xuICAgICAgY29uc3Qgb2Zmc2V0SW5mbyA9IG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQub2Zmc2V0SW5mbztcbiAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQuc3R5bGUubGVmdCA9IChvZmZzZXRJbmZvLm9mZnNldFggKyBldmVudC5jbGllbnRYKSArICdweCc7XG4gICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnN0eWxlLnRvcCA9IChvZmZzZXRJbmZvLm9mZnNldFkgKyBldmVudC5jbGllbnRZKSArICdweCc7XG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudHNbMF0uc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlc1swXTtcbiAgICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50KSB7XG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnZWROb2RlID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXNbaV07XG4gICAgICAgICAgICBjb25zdCBkcmFnT2Zmc2V0ID0gdGhpcy5kcmFnT2Zmc2V0c1tpXTtcbiAgICAgICAgICAgIGRyYWdnZWROb2RlLnggPSB0aGlzLmdldFhDb29yZGluYXRlKGRyYWdPZmZzZXQueCArIGV2ZW50LmNsaWVudFgpO1xuICAgICAgICAgICAgZHJhZ2dlZE5vZGUueSA9IHRoaXMuZ2V0WUNvb3JkaW5hdGUoZHJhZ09mZnNldC55ICsgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcyhkcmFnZ2VkTm9kZSwgdGhpcy5kcmFnZ2VkRWxlbWVudHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0RyYWdTdGFydGVkKSB7XG4gICAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkcmFnZ2VkTm9kZSA9IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzW2ldO1xuICAgICAgICAgIGNvbnN0IGRyYWdPZmZzZXQgPSB0aGlzLmRyYWdPZmZzZXRzW2ldO1xuICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHNbaV0uY3NzKCdsZWZ0JywgdGhpcy5nZXRYQ29vcmRpbmF0ZShkcmFnT2Zmc2V0LnggKyBldmVudC5jbGllbnRYKSArICdweCcpO1xuICAgICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuc2hhZG93RWxlbWVudHNbaV0uY3NzKCd0b3AnLCB0aGlzLmdldFlDb29yZGluYXRlKGRyYWdPZmZzZXQueSArIGV2ZW50LmNsaWVudFkpICsgJ3B4Jyk7XG4gICAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoZHJhZ2dlZE5vZGUsIHRoaXMuZHJhZ2dlZEVsZW1lbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICBpZiAobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCkge1xuICAgICAgICBub2RlRHJvcFNjb3BlLmRyb3BFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZURyb3BTY29wZS5kcm9wRWxlbWVudCk7XG4gICAgICAgIG5vZGVEcm9wU2NvcGUuZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRHJvcFNvdXJjZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZHJhZ2dlZE5vZGUgPSB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLmRyYWdnZWROb2Rlc1tpXTtcbiAgICAgICAgICBjb25zdCBzaGFkb3dFbGVtZW50ID0gdGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5zaGFkb3dFbGVtZW50c1tpXTtcbiAgICAgICAgICBkcmFnZ2VkTm9kZS54ID0gcGFyc2VJbnQoc2hhZG93RWxlbWVudC5jc3MoJ2xlZnQnKS5yZXBsYWNlKCdweCcsICcnKSwgMTApO1xuICAgICAgICAgIGRyYWdnZWROb2RlLnkgPSBwYXJzZUludChzaGFkb3dFbGVtZW50LmNzcygndG9wJykucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudC5yZW1vdmVDaGlsZChzaGFkb3dFbGVtZW50WzBdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGVEcmFnZ2luZ1Njb3BlLnNoYWRvd0VsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vdGlmeU1vZGVsQ2hhbmdlZCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5ub2RlRHJhZ2dpbmdTY29wZS5kcmFnZ2VkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubm9kZURyYWdnaW5nU2NvcGUuZHJhZ2dlZE5vZGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZHJhZ09mZnNldHMubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZURyYWdnaW5nU2NvcGUge1xuICBkcmFnZ2VkTm9kZXM6IEFycmF5PEZjTm9kZT47XG4gIHNoYWRvd0VsZW1lbnRzOiBBcnJheTxKUXVlcnk8SFRNTEVsZW1lbnQ+PjtcbiAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRyb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJvcEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIG9mZnNldEluZm8/OiB7XG4gICAgb2Zmc2V0WDogbnVtYmVyO1xuICAgIG9mZnNldFk6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlRHJvcFNjb3BlIHtcbiAgZHJvcEVsZW1lbnQ6IE5vZGVEcm9wRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcm9wTm9kZUluZm8ge1xuICBub2RlOiBGY05vZGU7XG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuICBvZmZzZXRYOiBudW1iZXI7XG4gIG9mZnNldFk6IG51bWJlcjtcbn1cbiJdfQ==