import { FlowchartConstants, ModelvalidationError } from './ngx-flowchart.models';
export class FcEdgeDraggingService {
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
        this.isValidEdgeCallback = isValidEdgeCallback || (() => true);
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    dragstart(event, connector) {
        let swapConnector;
        let dragLabel;
        let prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            for (const edge of this.model.edges) {
                if (edge.destination === connector.id) {
                    swapConnector = this.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this.applyFunction(() => {
                        this.modelService.edges.delete(edge);
                    });
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
        const originalEvent = event.originalEvent || event;
        originalEvent.dataTransfer.setData('Text', 'Just to support firefox');
        if (originalEvent.dataTransfer.setDragImage) {
            originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
        }
        else {
            this.destinationHtmlElement = event.target;
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
    dragover(event) {
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction(() => {
                        this.edgeDragging.shadowDragStarted = false;
                    });
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
                return this.applyFunction(() => {
                    if (this.destinationHtmlElement !== null) {
                        this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                    }
                    this.edgeDragging.dragPoint2 = {
                        x: event.clientX + this.dragOffset.x,
                        y: event.clientY + this.dragOffset.y
                    };
                });
            }
        }
    }
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
    dragleaveMagnet(event) {
        this.edgeDragging.magnetActive = false;
    }
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
                    return this.applyFunction(() => {
                        this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    });
                }
            }
        }
    }
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
                const edge = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction(() => {
                    this.modelService.edges.putEdge(edge);
                });
            }
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWZsb3djaGFydC9zcmMvbGliL2VkZ2UtZHJhZ2dpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQTBDLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFJMUgsTUFBTSxPQUFPLHFCQUFxQjtJQXVCaEMsWUFBWSxlQUF5QyxFQUN6QyxrQkFBd0MsRUFDeEMsWUFBNEIsRUFDNUIsS0FBYyxFQUNkLG1CQUErRSxFQUMvRSxhQUFrRCxFQUNsRCxhQUFxQixFQUNyQixTQUFpQjtRQTVCN0IsaUJBQVksR0FBaUI7WUFDM0IsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDO1FBRU0sc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUN0QyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLDJCQUFzQixHQUFnQixJQUFJLENBQUM7UUFDM0Msb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFtQjNCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNB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QztnQkFDZCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLEVBQUUsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNDb29yZHMsIEZjRWRnZSwgRmNNb2RlbCwgRmxvd2NoYXJ0Q29uc3RhbnRzLCBNb2RlbHZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNFZGdlRHJhd2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlIHtcblxuICBlZGdlRHJhZ2dpbmc6IEVkZ2VEcmFnZ2luZyA9IHtcbiAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICBkcmFnUG9pbnQxOiBudWxsLFxuICAgIGRyYWdQb2ludDI6IG51bGwsXG4gICAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGZhbHNlXG4gIH07XG5cbiAgcHJpdmF0ZSBkcmFnZ2VkRWRnZVNvdXJjZTogRmNDb25uZWN0b3IgPSBudWxsO1xuICBwcml2YXRlIGRyYWdPZmZzZXQ6IEZjQ29vcmRzID0ge307XG4gIHByaXZhdGUgZGVzdGluYXRpb25IdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIG9sZERpc3BsYXlTdHlsZSA9ICcnO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsOiBGY01vZGVsO1xuICBwcml2YXRlIHJlYWRvbmx5IGlzVmFsaWRFZGdlQ2FsbGJhY2s6IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkZ2VTdHlsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBlZGdlRHJhd2luZ1NlcnZpY2U6IEZjRWRnZURyYXdpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgaXNWYWxpZEVkZ2VDYWxsYmFjazogKHNvdXJjZTogRmNDb25uZWN0b3IsIGRlc3RpbmF0aW9uOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQsXG4gICAgICAgICAgICAgIGRyYWdBbmltYXRpb246IHN0cmluZyxcbiAgICAgICAgICAgICAgZWRnZVN0eWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbiA9IG1vZGVsVmFsaWRhdGlvbjtcbiAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZSA9IGVkZ2VEcmF3aW5nU2VydmljZTtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrID0gaXNWYWxpZEVkZ2VDYWxsYmFjayB8fCAoKCkgPT4gdHJ1ZSk7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSBkcmFnQW5pbWF0aW9uO1xuICAgIHRoaXMuZWRnZVN0eWxlID0gZWRnZVN0eWxlO1xuICB9XG5cbiAgcHVibGljIGRyYWdzdGFydChldmVudDogRXZlbnQgfCBhbnksIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICBsZXQgc3dhcENvbm5lY3RvcjogRmNDb25uZWN0b3I7XG4gICAgbGV0IGRyYWdMYWJlbDogc3RyaW5nO1xuICAgIGxldCBwcmV2RWRnZTogRmNFZGdlO1xuICAgIGlmIChjb25uZWN0b3IudHlwZSA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxlZnRDb25uZWN0b3JUeXBlKSB7XG4gICAgICBmb3IgKGNvbnN0IGVkZ2Ugb2YgdGhpcy5tb2RlbC5lZGdlcykge1xuICAgICAgICBpZiAoZWRnZS5kZXN0aW5hdGlvbiA9PT0gY29ubmVjdG9yLmlkKSB7XG4gICAgICAgICAgc3dhcENvbm5lY3RvciA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q29ubmVjdG9yKGVkZ2Uuc291cmNlKTtcbiAgICAgICAgICBkcmFnTGFiZWwgPSBlZGdlLmxhYmVsO1xuICAgICAgICAgIHByZXZFZGdlID0gZWRnZTtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIGlmIChzd2FwQ29ubmVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UgPSBzd2FwQ29ubmVjdG9yO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChzd2FwQ29ubmVjdG9yLmlkKTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCA9IGRyYWdMYWJlbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gcHJldkVkZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UgPSBjb25uZWN0b3I7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgfVxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgIGlmICghY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbnZhcyB3aGlsZSBlZGdlZHJhZ2dpbmdTZXJ2aWNlIGZvdW5kLicpO1xuICAgIH1cbiAgICB0aGlzLmRyYWdPZmZzZXQueCA9IC1jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB0aGlzLmRyYWdPZmZzZXQueSA9IC1jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgIH07XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRXZlbnQgfCBhbnkgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuXG4gICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnVGV4dCcsICdKdXN0IHRvIHN1cHBvcnQgZmlyZWZveCcpO1xuICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMub2xkRGlzcGxheVN0eWxlID0gdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnNoYWRvd0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50ID0gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhZG93LXN2Zy1jbGFzcycpKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQgPSAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFkb3ctc3ZnLWNsYXNzJykpLmZpbmQoJ3BhdGgnKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYWRvdy1zdmctY2xhc3MnKSkuZmluZCgnY2lyY2xlJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIHRoaXMuZWRnZVN0eWxlKSk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N4JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54KTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlcihldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgaWYgKCF0aGlzLmVkZ2VEcmFnZ2luZy5tYWduZXRBY3RpdmUgJiYgdGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICBpZiAodGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICAgICAgeTogZXZlbnQuY2xpZW50WSArIHRoaXMuZHJhZ09mZnNldC55XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgdGhpcy5lZGdlU3R5bGUpKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeCcsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueCk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlckNvbm5lY3RvcihldmVudDogRXZlbnQgfCBhbnksIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnb3ZlcihldmVudCk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sodGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgY29ubmVjdG9yKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnbGVhdmVNYWduZXQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcubWFnbmV0QWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXJNYWduZXQoZXZlbnQ6IEV2ZW50IHwgYW55LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ292ZXIoZXZlbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogY29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrKHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIGNvbm5lY3RvcikpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcblxuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLm1hZ25ldEFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLCB0aGlzLmVkZ2VTdHlsZSkpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3gnLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLngpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9yLmlkKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gbnVsbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSBudWxsO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsID0gbnVsbDtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnB1dEVkZ2UoZWRnZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcm9wKGV2ZW50OiBFdmVudCB8IGFueSwgdGFyZ2V0Q29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiB0YXJnZXRDb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayh0aGlzLmRyYWdnZWRFZGdlU291cmNlLCB0YXJnZXRDb25uZWN0b3IpKSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuX2FkZEVkZ2UoZXZlbnQsIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIHRhcmdldENvbm5lY3RvciwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFZGdlRHJhZ2dpbmcge1xuICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICBzaGFkb3dEcmFnU3RhcnRlZDogYm9vbGVhbjtcbiAgZHJhZ1BvaW50MTogRmNDb29yZHM7XG4gIGRyYWdQb2ludDI6IEZjQ29vcmRzO1xuICBkcmFnTGFiZWw/OiBzdHJpbmc7XG4gIHByZXZFZGdlPzogRmNFZGdlO1xuICBtYWduZXRBY3RpdmU/OiBib29sZWFuO1xuICBnRWxlbWVudD86IEpRdWVyeTxFbGVtZW50PjtcbiAgcGF0aEVsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG4gIGNpcmNsZUVsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG59XG4iXX0=