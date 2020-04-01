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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUEwQyxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSTFILE1BQU0sT0FBTyxxQkFBcUI7SUF1QmhDLFlBQVksZUFBeUMsRUFDekMsa0JBQXdDLEVBQ3hDLFlBQTRCLEVBQzVCLEtBQWMsRUFDZCxtQkFBK0UsRUFDL0UsYUFBa0QsRUFDbEQsYUFBcUIsRUFDckIsU0FBaUI7UUE1QjdCLGlCQUFZLEdBQWlCO1lBQzNCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQztRQUVNLHNCQUFpQixHQUFnQixJQUFJLENBQUM7UUFDdEMsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQiwyQkFBc0IsR0FBZ0IsSUFBSSxDQUFDO1FBQzNDLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBbUIzQixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJ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SCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNDb29yZHMsIEZjRWRnZSwgRmNNb2RlbCwgRmxvd2NoYXJ0Q29uc3RhbnRzLCBNb2RlbHZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNFZGdlRHJhd2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlIHtcblxuICBlZGdlRHJhZ2dpbmc6IEVkZ2VEcmFnZ2luZyA9IHtcbiAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICBkcmFnUG9pbnQxOiBudWxsLFxuICAgIGRyYWdQb2ludDI6IG51bGwsXG4gICAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGZhbHNlXG4gIH07XG5cbiAgcHJpdmF0ZSBkcmFnZ2VkRWRnZVNvdXJjZTogRmNDb25uZWN0b3IgPSBudWxsO1xuICBwcml2YXRlIGRyYWdPZmZzZXQ6IEZjQ29vcmRzID0ge307XG4gIHByaXZhdGUgZGVzdGluYXRpb25IdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIG9sZERpc3BsYXlTdHlsZSA9ICcnO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsOiBGY01vZGVsO1xuICBwcml2YXRlIHJlYWRvbmx5IGlzVmFsaWRFZGdlQ2FsbGJhY2s6IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkZ2VTdHlsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBlZGdlRHJhd2luZ1NlcnZpY2U6IEZjRWRnZURyYXdpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgaXNWYWxpZEVkZ2VDYWxsYmFjazogKHNvdXJjZTogRmNDb25uZWN0b3IsIGRlc3RpbmF0aW9uOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQsXG4gICAgICAgICAgICAgIGRyYWdBbmltYXRpb246IHN0cmluZyxcbiAgICAgICAgICAgICAgZWRnZVN0eWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbiA9IG1vZGVsVmFsaWRhdGlvbjtcbiAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZSA9IGVkZ2VEcmF3aW5nU2VydmljZTtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrID0gaXNWYWxpZEVkZ2VDYWxsYmFjayB8fCAoKCkgPT4gdHJ1ZSk7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSBkcmFnQW5pbWF0aW9uO1xuICAgIHRoaXMuZWRnZVN0eWxlID0gZWRnZVN0eWxlO1xuICB9XG5cbiAgcHVibGljIGRyYWdzdGFydChldmVudDogRXZlbnQgfCBhbnksIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICBsZXQgc3dhcENvbm5lY3RvcjogRmNDb25uZWN0b3I7XG4gICAgbGV0IGRyYWdMYWJlbDogc3RyaW5nO1xuICAgIGxldCBwcmV2RWRnZTogRmNFZGdlO1xuICAgIGlmIChjb25uZWN0b3IudHlwZSA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxlZnRDb25uZWN0b3JUeXBlKSB7XG4gICAgICBmb3IgKGNvbnN0IGVkZ2Ugb2YgdGhpcy5tb2RlbC5lZGdlcykge1xuICAgICAgICBpZiAoZWRnZS5kZXN0aW5hdGlvbiA9PT0gY29ubmVjdG9yLmlkKSB7XG4gICAgICAgICAgc3dhcENvbm5lY3RvciA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q29ubmVjdG9yKGVkZ2Uuc291cmNlKTtcbiAgICAgICAgICBkcmFnTGFiZWwgPSBlZGdlLmxhYmVsO1xuICAgICAgICAgIHByZXZFZGdlID0gZWRnZTtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIGlmIChzd2FwQ29ubmVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UgPSBzd2FwQ29ubmVjdG9yO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChzd2FwQ29ubmVjdG9yLmlkKTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCA9IGRyYWdMYWJlbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gcHJldkVkZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UgPSBjb25uZWN0b3I7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgfVxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50O1xuICAgIGlmICghY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbnZhcyB3aGlsZSBlZGdlZHJhZ2dpbmdTZXJ2aWNlIGZvdW5kLicpO1xuICAgIH1cbiAgICB0aGlzLmRyYWdPZmZzZXQueCA9IC1jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB0aGlzLmRyYWdPZmZzZXQueSA9IC1jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgIH07XG4gICAgY29uc3Qgb3JpZ2luYWxFdmVudDogRXZlbnQgfCBhbnkgPSAoZXZlbnQgYXMgYW55KS5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50O1xuXG4gICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnVGV4dCcsICdKdXN0IHRvIHN1cHBvcnQgZmlyZWZveCcpO1xuICAgIGlmIChvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UpIHtcbiAgICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSh0aGlzLm1vZGVsU2VydmljZS5nZXREcmFnSW1hZ2UoKSwgMCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMub2xkRGlzcGxheVN0eWxlID0gdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnNoYWRvd0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50ID0gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhZG93LXN2Zy1jbGFzcycpKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQgPSAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFkb3ctc3ZnLWNsYXNzJykpLmZpbmQoJ3BhdGgnKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYWRvdy1zdmctY2xhc3MnKSkuZmluZCgnY2lyY2xlJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIHRoaXMuZWRnZVN0eWxlKSk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N4JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54KTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuICAgIH1cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlcihldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgaWYgKCF0aGlzLmVkZ2VEcmFnZ2luZy5tYWduZXRBY3RpdmUgJiYgdGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICBpZiAodGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICAgICAgeTogZXZlbnQuY2xpZW50WSArIHRoaXMuZHJhZ09mZnNldC55XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgdGhpcy5lZGdlU3R5bGUpKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeCcsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueCk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlckNvbm5lY3RvcihldmVudDogRXZlbnQgfCBhbnksIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnb3ZlcihldmVudCk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sodGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgY29ubmVjdG9yKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnbGVhdmVNYWduZXQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgdGhpcy5lZGdlRHJhZ2dpbmcubWFnbmV0QWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXJNYWduZXQoZXZlbnQ6IEV2ZW50IHwgYW55LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ292ZXIoZXZlbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogY29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrKHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIGNvbm5lY3RvcikpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcblxuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLm1hZ25ldEFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLCB0aGlzLmVkZ2VTdHlsZSkpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3gnLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLngpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9yLmlkKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnZW5kKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxID0gbnVsbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSBudWxsO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsID0gbnVsbDtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnB1dEVkZ2UoZWRnZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcm9wKGV2ZW50OiBFdmVudCB8IGFueSwgdGFyZ2V0Q29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbi52YWxpZGF0ZUVkZ2VzKHRoaXMubW9kZWwuZWRnZXMuY29uY2F0KFt7XG4gICAgICAgICAgc291cmNlOiB0aGlzLmRyYWdnZWRFZGdlU291cmNlLmlkLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiB0YXJnZXRDb25uZWN0b3IuaWRcbiAgICAgICAgfV0pLCB0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE1vZGVsdmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayh0aGlzLmRyYWdnZWRFZGdlU291cmNlLCB0YXJnZXRDb25uZWN0b3IpKSB7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuX2FkZEVkZ2UoZXZlbnQsIHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIHRhcmdldENvbm5lY3RvciwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFZGdlRHJhZ2dpbmcge1xuICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICBzaGFkb3dEcmFnU3RhcnRlZDogYm9vbGVhbjtcbiAgZHJhZ1BvaW50MTogRmNDb29yZHM7XG4gIGRyYWdQb2ludDI6IEZjQ29vcmRzO1xuICBkcmFnTGFiZWw/OiBzdHJpbmc7XG4gIHByZXZFZGdlPzogRmNFZGdlO1xuICBtYWduZXRBY3RpdmU/OiBib29sZWFuO1xuICBnRWxlbWVudD86IEpRdWVyeTxFbGVtZW50PjtcbiAgcGF0aEVsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG4gIGNpcmNsZUVsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG59XG4iXX0=