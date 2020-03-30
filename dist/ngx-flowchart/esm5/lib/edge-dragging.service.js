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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmFnZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBMEMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUkxSDtJQXVCRSwrQkFBWSxlQUF5QyxFQUN6QyxrQkFBd0MsRUFDeEMsWUFBNEIsRUFDNUIsS0FBYyxFQUNkLG1CQUErRSxFQUMvRSxhQUFrRCxFQUNsRCxhQUFxQixFQUNyQixTQUFpQjtRQTVCN0IsaUJBQVksR0FBaUI7WUFDM0IsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDO1FBRU0sc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUN0QyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLDJCQUFzQixHQUFnQixJQUFJLENBQUM7UUFDM0Msb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFtQjNCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFTSx5Q0FBUyxH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Q0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBblFELElBbVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNDb25uZWN0b3IsIEZjQ29vcmRzLCBGY0VkZ2UsIEZjTW9kZWwsIEZsb3djaGFydENvbnN0YW50cywgTW9kZWx2YWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEZjRWRnZURyYWdnaW5nU2VydmljZSB7XG5cbiAgZWRnZURyYWdnaW5nOiBFZGdlRHJhZ2dpbmcgPSB7XG4gICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgZHJhZ1BvaW50MTogbnVsbCxcbiAgICBkcmFnUG9pbnQyOiBudWxsLFxuICAgIHNoYWRvd0RyYWdTdGFydGVkOiBmYWxzZVxuICB9O1xuXG4gIHByaXZhdGUgZHJhZ2dlZEVkZ2VTb3VyY2U6IEZjQ29ubmVjdG9yID0gbnVsbDtcbiAgcHJpdmF0ZSBkcmFnT2Zmc2V0OiBGY0Nvb3JkcyA9IHt9O1xuICBwcml2YXRlIGRlc3RpbmF0aW9uSHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBvbGREaXNwbGF5U3R5bGUgPSAnJztcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkZ2VEcmF3aW5nU2VydmljZTogRmNFZGdlRHJhd2luZ1NlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbDogRmNNb2RlbDtcbiAgcHJpdmF0ZSByZWFkb25seSBpc1ZhbGlkRWRnZUNhbGxiYWNrOiAoc291cmNlOiBGY0Nvbm5lY3RvciwgZGVzdGluYXRpb246IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuICBwcml2YXRlIHJlYWRvbmx5IGRyYWdBbmltYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBlZGdlU3R5bGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSxcbiAgICAgICAgICAgICAgbW9kZWw6IEZjTW9kZWwsXG4gICAgICAgICAgICAgIGlzVmFsaWRFZGdlQ2FsbGJhY2s6IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgIGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBULFxuICAgICAgICAgICAgICBkcmFnQW5pbWF0aW9uOiBzdHJpbmcsXG4gICAgICAgICAgICAgIGVkZ2VTdHlsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbFZhbGlkYXRpb24gPSBtb2RlbFZhbGlkYXRpb247XG4gICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UgPSBlZGdlRHJhd2luZ1NlcnZpY2U7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayA9IGlzVmFsaWRFZGdlQ2FsbGJhY2sgfHwgKCgpID0+IHRydWUpO1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbiA9IGFwcGx5RnVuY3Rpb247XG4gICAgdGhpcy5kcmFnQW5pbWF0aW9uID0gZHJhZ0FuaW1hdGlvbjtcbiAgICB0aGlzLmVkZ2VTdHlsZSA9IGVkZ2VTdHlsZTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnc3RhcnQoZXZlbnQ6IEV2ZW50IHwgYW55LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSB7XG4gICAgbGV0IHN3YXBDb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuICAgIGxldCBkcmFnTGFiZWw6IHN0cmluZztcbiAgICBsZXQgcHJldkVkZ2U6IEZjRWRnZTtcbiAgICBpZiAoY29ubmVjdG9yLnR5cGUgPT09IEZsb3djaGFydENvbnN0YW50cy5sZWZ0Q29ubmVjdG9yVHlwZSkge1xuICAgICAgZm9yIChjb25zdCBlZGdlIG9mIHRoaXMubW9kZWwuZWRnZXMpIHtcbiAgICAgICAgaWYgKGVkZ2UuZGVzdGluYXRpb24gPT09IGNvbm5lY3Rvci5pZCkge1xuICAgICAgICAgIHN3YXBDb25uZWN0b3IgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENvbm5lY3RvcihlZGdlLnNvdXJjZSk7XG4gICAgICAgICAgZHJhZ0xhYmVsID0gZWRnZS5sYWJlbDtcbiAgICAgICAgICBwcmV2RWRnZSA9IGVkZ2U7XG4gICAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICBpZiAoc3dhcENvbm5lY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRyYWdnZWRFZGdlU291cmNlID0gc3dhcENvbm5lY3RvcjtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEgPSB0aGlzLm1vZGVsU2VydmljZS5jb25uZWN0b3JzLmdldENlbnRlcmVkQ29vcmQoc3dhcENvbm5lY3Rvci5pZCk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnTGFiZWwgPSBkcmFnTGFiZWw7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSA9IHByZXZFZGdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnZWRFZGdlU291cmNlID0gY29ubmVjdG9yO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3IuaWQpO1xuICAgIH1cbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudDtcbiAgICBpZiAoIWNhbnZhcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjYW52YXMgd2hpbGUgZWRnZWRyYWdnaW5nU2VydmljZSBmb3VuZC4nKTtcbiAgICB9XG4gICAgdGhpcy5kcmFnT2Zmc2V0LnggPSAtY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgdGhpcy5kcmFnT2Zmc2V0LnkgPSAtY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB7XG4gICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICB5OiBldmVudC5jbGllbnRZICsgdGhpcy5kcmFnT2Zmc2V0LnlcbiAgICB9O1xuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQ6IEV2ZW50IHwgYW55ID0gKGV2ZW50IGFzIGFueSkub3JpZ2luYWxFdmVudCB8fCBldmVudDtcblxuICAgIG9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCAnSnVzdCB0byBzdXBwb3J0IGZpcmVmb3gnKTtcbiAgICBpZiAob3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICBvcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UodGhpcy5tb2RlbFNlcnZpY2UuZ2V0RHJhZ0ltYWdlKCksIDAsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLm9sZERpc3BsYXlTdHlsZSA9IHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBpZiAodGhpcy5kcmFnQW5pbWF0aW9uID09PSBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvdykge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5zaGFkb3dEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG4gICAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuZ0VsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYWRvdy1zdmctY2xhc3MnKSk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50ID0gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhZG93LXN2Zy1jbGFzcycpKS5maW5kKCdwYXRoJyk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQgPSAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGFkb3ctc3ZnLWNsYXNzJykpLmZpbmQoJ2NpcmNsZScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5nRWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50LmF0dHIoJ2QnLFxuICAgICAgICB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLCB0aGlzLmVkZ2VTdHlsZSkpO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuY2lyY2xlRWxlbWVudC5hdHRyKCdjeCcsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIueCk7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N5JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55KTtcbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXIoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIGlmICghdGhpcy5lZGdlRHJhZ2dpbmcubWFnbmV0QWN0aXZlICYmIHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb25IdG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vbGREaXNwbGF5U3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuc2hhZG93RHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuc2hhZG93RHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB7XG4gICAgICAgICAgeDogZXZlbnQuY2xpZW50WCArIHRoaXMuZHJhZ09mZnNldC54LFxuICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgKyB0aGlzLmRyYWdPZmZzZXQueVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50LmF0dHIoJ2QnLFxuICAgICAgICAgIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIHRoaXMuZWRnZVN0eWxlKSk7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmNpcmNsZUVsZW1lbnQuYXR0cignY3gnLCB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLngpO1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N5JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55KTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5kZXN0aW5hdGlvbkh0bWxFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHRoaXMub2xkRGlzcGxheVN0eWxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5jbGllbnRYICsgdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICAgICAgICB5OiBldmVudC5jbGllbnRZICsgdGhpcy5kcmFnT2Zmc2V0LnlcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ292ZXJDb25uZWN0b3IoZXZlbnQ6IEV2ZW50IHwgYW55LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ292ZXIoZXZlbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogY29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkRWRnZUNhbGxiYWNrKHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UsIGNvbm5lY3RvcikpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2xlYXZlTWFnbmV0KGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIHRoaXMuZWRnZURyYWdnaW5nLm1hZ25ldEFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGRyYWdvdmVyTWFnbmV0KGV2ZW50OiBFdmVudCB8IGFueSwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdvdmVyKGV2ZW50KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubW9kZWxWYWxpZGF0aW9uLnZhbGlkYXRlRWRnZXModGhpcy5tb2RlbC5lZGdlcy5jb25jYXQoW3tcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuZHJhZ2dlZEVkZ2VTb3VyY2UuaWQsXG4gICAgICAgICAgZGVzdGluYXRpb246IGNvbm5lY3Rvci5pZFxuICAgICAgICB9XSksIHRoaXMubW9kZWwubm9kZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTW9kZWx2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEVkZ2VDYWxsYmFjayh0aGlzLmRyYWdnZWRFZGdlU291cmNlLCBjb25uZWN0b3IpKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdBbmltYXRpb24gPT09IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93KSB7XG5cbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5tYWduZXRBY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiA9IHRoaXMubW9kZWxTZXJ2aWNlLmNvbm5lY3RvcnMuZ2V0Q2VudGVyZWRDb29yZChjb25uZWN0b3IuaWQpO1xuICAgICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnBhdGhFbGVtZW50LmF0dHIoJ2QnLFxuICAgICAgICAgICAgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgdGhpcy5lZGdlU3R5bGUpKTtcbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N4JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54KTtcbiAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5jaXJjbGVFbGVtZW50LmF0dHIoJ2N5JywgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55KTtcblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gdGhpcy5tb2RlbFNlcnZpY2UuY29ubmVjdG9ycy5nZXRDZW50ZXJlZENvb3JkKGNvbm5lY3Rvci5pZCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhZ2VuZChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSA9IG51bGw7XG4gICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyID0gbnVsbDtcbiAgICAgIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCA9IG51bGw7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaWYgKHRoaXMuZHJhZ0FuaW1hdGlvbiA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25TaGFkb3cpIHtcbiAgICAgICAgdGhpcy5lZGdlRHJhZ2dpbmcuZ0VsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSkge1xuICAgICAgICBjb25zdCBlZGdlID0gdGhpcy5lZGdlRHJhZ2dpbmcucHJldkVkZ2U7XG4gICAgICAgIHRoaXMuZWRnZURyYWdnaW5nLnByZXZFZGdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5wdXRFZGdlKGVkZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJvcChldmVudDogRXZlbnQgfCBhbnksIHRhcmdldENvbm5lY3RvcjogRmNDb25uZWN0b3IpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbGlkYXRpb24udmFsaWRhdGVFZGdlcyh0aGlzLm1vZGVsLmVkZ2VzLmNvbmNhdChbe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5kcmFnZ2VkRWRnZVNvdXJjZS5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjogdGFyZ2V0Q29ubmVjdG9yLmlkXG4gICAgICAgIH1dKSwgdGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBNb2RlbHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVmFsaWRFZGdlQ2FsbGJhY2sodGhpcy5kcmFnZ2VkRWRnZVNvdXJjZSwgdGFyZ2V0Q29ubmVjdG9yKSkge1xuICAgICAgICB0aGlzLmVkZ2VEcmFnZ2luZy5wcmV2RWRnZSA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLl9hZGRFZGdlKGV2ZW50LCB0aGlzLmRyYWdnZWRFZGdlU291cmNlLCB0YXJnZXRDb25uZWN0b3IsIHRoaXMuZWRnZURyYWdnaW5nLmRyYWdMYWJlbCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWRnZURyYWdnaW5nIHtcbiAgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgc2hhZG93RHJhZ1N0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRyYWdQb2ludDE6IEZjQ29vcmRzO1xuICBkcmFnUG9pbnQyOiBGY0Nvb3JkcztcbiAgZHJhZ0xhYmVsPzogc3RyaW5nO1xuICBwcmV2RWRnZT86IEZjRWRnZTtcbiAgbWFnbmV0QWN0aXZlPzogYm9vbGVhbjtcbiAgZ0VsZW1lbnQ/OiBKUXVlcnk8RWxlbWVudD47XG4gIHBhdGhFbGVtZW50PzogSlF1ZXJ5PEVsZW1lbnQ+O1xuICBjaXJjbGVFbGVtZW50PzogSlF1ZXJ5PEVsZW1lbnQ+O1xufVxuIl19