import { __values } from "tslib";
import { FlowchartConstants, ModelvalidationError } from './ngx-flowchart.models';
var FcEdgeDraggingService = /** @class */ (function () {
    function FcEdgeDraggingService(modelValidation, edgeDrawingService, modelService, model, isValidEdgeCallback, applyFunction, dragAnimation, edgeStyle) {
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
        this.isValidEdgeCallback = isValidEdgeCallback || (function () { return true; });
        this.applyFunction = applyFunction;
        this.dragAnimation = dragAnimation;
        this.edgeStyle = edgeStyle;
    }
    FcEdgeDraggingService.prototype.dragstart = function (event, connector) {
        var e_1, _a;
        var _this = this;
        var swapConnector;
        var dragLabel;
        var prevEdge;
        if (connector.type === FlowchartConstants.leftConnectorType) {
            var _loop_1 = function (edge) {
                if (edge.destination === connector.id) {
                    swapConnector = this_1.modelService.connectors.getConnector(edge.source);
                    dragLabel = edge.label;
                    prevEdge = edge;
                    this_1.applyFunction(function () {
                        _this.modelService.edges.delete(edge);
                    });
                    return "break";
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.model.edges), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var edge = _c.value;
                    var state_1 = _loop_1(edge);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
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
        var canvas = this.modelService.canvasHtmlElement;
        if (!canvas) {
            throw new Error('No canvas while edgedraggingService found.');
        }
        this.dragOffset.x = -canvas.getBoundingClientRect().left;
        this.dragOffset.y = -canvas.getBoundingClientRect().top;
        this.edgeDragging.dragPoint2 = {
            x: event.clientX + this.dragOffset.x,
            y: event.clientY + this.dragOffset.y
        };
        var originalEvent = event.originalEvent || event;
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
    };
    FcEdgeDraggingService.prototype.dragover = function (event) {
        var _this = this;
        if (this.edgeDragging.isDragging) {
            if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
                if (this.destinationHtmlElement !== null) {
                    this.destinationHtmlElement.style.display = this.oldDisplayStyle;
                }
                if (this.edgeDragging.shadowDragStarted) {
                    this.applyFunction(function () {
                        _this.edgeDragging.shadowDragStarted = false;
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
                return this.applyFunction(function () {
                    if (_this.destinationHtmlElement !== null) {
                        _this.destinationHtmlElement.style.display = _this.oldDisplayStyle;
                    }
                    _this.edgeDragging.dragPoint2 = {
                        x: event.clientX + _this.dragOffset.x,
                        y: event.clientY + _this.dragOffset.y
                    };
                });
            }
        }
    };
    FcEdgeDraggingService.prototype.dragoverConnector = function (event, connector) {
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
    };
    FcEdgeDraggingService.prototype.dragleaveMagnet = function (event) {
        this.edgeDragging.magnetActive = false;
    };
    FcEdgeDraggingService.prototype.dragoverMagnet = function (event, connector) {
        var _this = this;
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
                    return this.applyFunction(function () {
                        _this.edgeDragging.dragPoint2 = _this.modelService.connectors.getCenteredCoord(connector.id);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    });
                }
            }
        }
    };
    FcEdgeDraggingService.prototype.dragend = function (event) {
        var _this = this;
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
                var edge_1 = this.edgeDragging.prevEdge;
                this.edgeDragging.prevEdge = null;
                this.applyFunction(function () {
                    _this.modelService.edges.putEdge(edge_1);
                });
            }
        }
    };
    FcEdgeDraggingService.prototype.drop = function (event, targetConnector) {
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
    };
    return FcEdgeDraggingService;
}());
export { FcEdgeDraggingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBMEMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUkxSDtJQXVCRSwrQkFBWSxlQUF5QyxFQUN6QyxrQkFBd0MsRUFDeEMsWUFBNEIsRUFDNUIsS0FBYyxFQUNkLG1CQUErRSxFQUMvRSxhQUFrRCxFQUNsRCxhQUFxQixFQUNyQixTQUFpQjtRQTVCN0IsaUJBQVksR0FBaUI7WUFDM0IsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDO1FBRU0sc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUN0QyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLDJCQUFzQixHQUFnQixJQUFJLENBQUM7UUFDM0Msb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFtQjNCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFTSx5Q0FBUyxH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QUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtJQUNILENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFuUUQsSUFtUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNDb29yZHMsIEZjRWRnZSwgRmNNb2RlbCwgRmxvd2NoYXJ0Q29uc3RhbnRzLCBNb2RlbHZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNFZGdlRHJhd2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlIHtcblxuICBlZGdlRHJhZ2dpbmc6IEVkZ2VEcmFnZ2luZyA9IHtcbiAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICBkcmFnUG9pbnQxOiBudWxsLFxuICAgIGRyYWdQb2ludDI6IG51bGwsXG4gICAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGZhbHNlXG4gIH07XG5cbiAgcHJpdmF0ZSBkcmFnZ2VkRWRnZVNvdXJjZTogRmNDb25uZWN0b3IgPSBudWxsO1xuICBwcml2YXRlIGRyYWdPZmZzZXQ6IEZjQ29vcmRzID0ge307XG4gIHByaXZhdGUgZGVzdGluYXRpb25IdG1sRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIG9sZERpc3BsYXlTdHlsZSA9ICcnO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsOiBGY01vZGVsO1xuICBwcml2YXRlIHJlYWRvbmx5IGlzVmFsaWRFZGdlQ2FsbGJhY2s6IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkZ2VTdHlsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBlZGdlRHJhd2luZ1NlcnZpY2U6IEZjRWRnZURyYXdpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBtb2RlbDogRmNNb2RlbCxcbiAgICAgICAgICAgICAgaXNWYWxpZEVkZ2VDYWxsYmFjazogKHNvdXJjZTogRmNDb25uZWN0b3IsIGRlc3RpbmF0aW9uOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQsXG4gICAgICAgICAgICAgIGRyYWdBbmltYXRpb246IHN0cmluZyxcbiAgICAgICAgICAgICAgZWRnZVN0eWxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsVmFsaWRhdGlvbiA9IG1vZGVsVmFsaWRhdGlvbjtcbiAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZSA9IGVkZ2VEcmF3aW5nU2VydmljZTtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrID0gaXNWYWxpZEVkZ2VDYWxsYmFjayB8fCAoKCkgPT4gdHJ1ZSk7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSBkcmFnQW5pbWF0aW9uO1xuICAgIHRoaXMuZWRnZVN0eWxlID0gZWRnZVN0eWxlO1xuICB9XG5cbiAgcHVibGljIGRyYWdzdGFydChldmVudDogRHJhZ0V2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSB7XG4gICAgbGV0IHN3YXBDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuICAgIGxldCBkcmFnTGFiZWw6IHN0cmluZztcbiAgICBsZXQgcHJldkVkZ2U6IEZjRWRnZTtcbiAgICBpZiAoY29ubmVjdG9yLnR5cGUgPT09IEZsb3djaGFydENvbnN0YW50cy5sZWZ0Q29ubmVjdG9yVHlwZSkge1xuICAgICAgZm9yIChjb25zdCBlZGdlIG9mIHRoaXMubW9kZWwuZWRnZXMpIHtcbiAgICAgICAgaWYgKGVkZ2UuZGVzdGluYXRpb24gPT09IGNvbm5lY3Rvci5pZCkge1xuICAgICAgICAgIHN3YXBDb25uZWN0b3IgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENvbm5lY3RvcihlZGdlLnNvdXJjZSk7XG4gICAgICAgICAgZHJhZ0xhYmVsID0gZWRnZS5sYWJlbDtcbiAgICAgICAgICBwcmV2RWRnZSA9IGVkZ2U7XG4gICAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICBpZiAoc3dhcENvbm5lY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFZGdlU291cmNlID0gc3dhcENvbm5lY3RvcjtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoc3dhcENvbm5lY3Rvci5pZCk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnTGFiZWwgPSBkcmFnTGFiZWw7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSA9IHByZXZFZGdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnZWRFZGdlU291cmNlID0gY29ubmVjdG9yO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3IuaWQpO1xuICAgIH1cbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICBpZiAoIWNhbnZhcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjYW52YXMgd2hpbGUgZWRnZWRyYWdnaW5nU2VydmljZSBmb3VuZC4nKTtcbiAgICB9XG4gICAgdGhpcy5kcmFnT2Zmc2V0LnggPSAtY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgdGhpcy5kcmFnT2Zmc2V0LnkgPSAtY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB7XG4gICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICB5OiBldmVudC5jbGllbnRZICsgdGhpcy5kcmFnT2Zmc2V0LnlcbiAgICB9O1xuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IERyYWdFdmVudCA9IChldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQgfHwgZXZlbnQ7XG5cbiAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdUZXh0JywgJ0p1c3QgdG8gc3VwcG9ydCBmaXJlZm94Jyk7XG4gICAgaWYgKG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZSkge1xuICAgICAgb3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKHRoaXMubW9kZWxTZXJ2aWNlLmdldERyYWdJbWFnZSgpLCAwLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy5vbGREaXNwbGF5U3R5bGUgPSB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuc2hhZG93RHJhZ1N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmdFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZ0VsZW1lbnQgPSAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFkb3ctc3ZnLWNsYXNzJykpO1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wYXRoRWxlbWVudCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYWRvdy1zdmctY2xhc3MnKSkuZmluZCgncGF0aCcpO1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50ID0gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhZG93LXN2Zy1jbGFzcycpKS5maW5kKCdjaXJjbGUnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZ0VsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wYXRoRWxlbWVudC5hdHRyKCdkJyxcbiAgICAgICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgdGhpcy5lZGdlU3R5bGUpKTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3gnLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLngpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeScsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueSk7XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgaWYgKCF0aGlzLmVkZ2VEcmFnZ2luZy5tYWduZXRBY3RpdmUgJiYgdGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICBpZiAodGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9sZERpc3BsYXlTdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICAgICAgeTogZXZlbnQuY2xpZW50WSArIHRoaXMuZHJhZ09mZnNldC55XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgdGhpcy5lZGdlU3R5bGUpKTtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeCcsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueCk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFggKyB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3ZlckNvbm5lY3RvcihldmVudDogRHJhZ0V2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ292ZXIoZXZlbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogY29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrKHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIGNvbm5lY3RvcikpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2xlYXZlTWFnbmV0KGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLmVkZ2VEcmFnZ2luZy5tYWduZXRBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnb3Zlck1hZ25ldChldmVudDogRHJhZ0V2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ292ZXIoZXZlbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogY29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrKHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIGNvbm5lY3RvcikpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcblxuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLm1hZ25ldEFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucGF0aEVsZW1lbnQuYXR0cignZCcsXG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLCB0aGlzLmVkZ2VTdHlsZSkpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3gnLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLngpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3knLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnkpO1xuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoY29ubmVjdG9yLmlkKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFnZW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IG51bGw7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gbnVsbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCA9IG51bGw7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZ0VsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSkge1xuICAgICAgICBjb25zdCBlZGdlID0gdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2U7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5wdXRFZGdlKGVkZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJvcChldmVudDogRHJhZ0V2ZW50LCB0YXJnZXRDb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXModGhpcy5tb2RlbC5lZGdlcy5jb25jYXQoW3tcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UuaWQsXG4gICAgICAgICAgZGVzdGluYXRpb246IHRhcmdldENvbm5lY3Rvci5pZFxuICAgICAgICB9XSksIHRoaXMubW9kZWwubm9kZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTW9kZWx2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrKHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIHRhcmdldENvbm5lY3RvcikpIHtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5fYWRkRWRnZShldmVudCwgdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgdGFyZ2V0Q29ubmVjdG9yLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnTGFiZWwpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVkZ2VEcmFnZ2luZyB7XG4gIGlzRHJhZ2dpbmc6IGJvb2xlYW47XG4gIHNoYWRvd0RyYWdTdGFydGVkOiBib29sZWFuO1xuICBkcmFnUG9pbnQxOiBGY0Nvb3JkcztcbiAgZHJhZ1BvaW50MjogRmNDb29yZHM7XG4gIGRyYWdMYWJlbD86IHN0cmluZztcbiAgcHJldkVkZ2U/OiBGY0VkZ2U7XG4gIG1hZ25ldEFjdGl2ZT86IGJvb2xlYW47XG4gIGdFbGVtZW50PzogSlF1ZXJ5PEVsZW1lbnQ+O1xuICBwYXRoRWxlbWVudD86IEpRdWVyeTxFbGVtZW50PjtcbiAgY2lyY2xlRWxlbWVudD86IEpRdWVyeTxFbGVtZW50Pjtcbn1cbiJdfQ==