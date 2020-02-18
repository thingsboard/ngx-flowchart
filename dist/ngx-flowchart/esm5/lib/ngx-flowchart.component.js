import { __decorate, __metadata, __values } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, HostBinding, HostListener, Input, IterableDiffer, IterableDiffers, NgZone, OnInit, Output } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import { FcModelValidationService } from './modelvalidation.service';
import { FcNodeDraggingService } from './node-dragging.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcEdgeDraggingService } from './edge-dragging.service';
import { FcMouseOverService } from './mouseover.service';
import { FcRectangleSelectService } from './rectangleselect.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var NgxFlowchartComponent = /** @class */ (function () {
    function NgxFlowchartComponent(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        var _this = this;
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.modelChanged = new EventEmitter();
        this.fitModelSizeByDefaultValue = true;
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create(function (index, item) {
            return item;
        });
        this.edgesDiffer = this.differs.find([]).create(function (index, item) {
            return item;
        });
        this.detectChangesSubject = new Subject();
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
        this.detectChangesSubject
            .pipe(debounceTime(50))
            .subscribe(function () { return _this.cd.detectChanges(); });
    }
    Object.defineProperty(NgxFlowchartComponent.prototype, "canvasClass", {
        get: function () {
            return FlowchartConstants.canvasClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxFlowchartComponent.prototype, "fitModelSizeByDefault", {
        get: function () {
            return this.fitModelSizeByDefaultValue;
        },
        set: function (value) {
            this.fitModelSizeByDefaultValue = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NgxFlowchartComponent.prototype.ngOnInit = function () {
        var e_1, _a;
        var _this = this;
        if (!this.dropTargetId && this.edgeStyle !== FlowchartConstants.curvedStyle && this.edgeStyle !== FlowchartConstants.lineStyle) {
            throw new Error('edgeStyle not supported.');
        }
        this.nodeHeight = this.nodeHeight || 200;
        this.nodeWidth = this.nodeWidth || 200;
        this.dragAnimation = this.dragAnimation || FlowchartConstants.dragAnimationRepaint;
        this.userCallbacks = this.userCallbacks || {};
        this.automaticResize = this.automaticResize || false;
        try {
            for (var _b = __values(Object.keys(this.userCallbacks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var callback = this.userCallbacks[key];
                if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                    throw new Error('All callbacks should be functions.');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        var element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.detectChangesSubject, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        var applyFunction = this.zone.run.bind(this.zone);
        this.nodeDraggingService = new FcNodeDraggingService(this.modelService, applyFunction, this.automaticResize, this.dragAnimation);
        this.edgeDraggingService = new FcEdgeDraggingService(this.modelValidation, this.edgeDrawingService, this.modelService, this.model, this.userCallbacks.isValidEdge || null, applyFunction, this.dragAnimation, this.edgeStyle);
        this.mouseoverService = new FcMouseOverService(applyFunction);
        this.rectangleSelectService = new FcRectangleSelectService(this.modelService, element[0].querySelector('#select-rectangle'), applyFunction);
        this.callbacks = {
            nodeDragstart: this.nodeDraggingService.dragstart.bind(this.nodeDraggingService),
            nodeDragend: this.nodeDraggingService.dragend.bind(this.nodeDraggingService),
            edgeDragstart: this.edgeDraggingService.dragstart.bind(this.edgeDraggingService),
            edgeDragend: this.edgeDraggingService.dragend.bind(this.edgeDraggingService),
            edgeDrop: this.edgeDraggingService.drop.bind(this.edgeDraggingService),
            edgeDragoverConnector: this.edgeDraggingService.dragoverConnector.bind(this.edgeDraggingService),
            edgeDragoverMagnet: this.edgeDraggingService.dragoverMagnet.bind(this.edgeDraggingService),
            edgeDragleaveMagnet: this.edgeDraggingService.dragleaveMagnet.bind(this.edgeDraggingService),
            nodeMouseOver: this.mouseoverService.nodeMouseOver.bind(this.mouseoverService),
            nodeMouseOut: this.mouseoverService.nodeMouseOut.bind(this.mouseoverService),
            connectorMouseEnter: this.mouseoverService.connectorMouseEnter.bind(this.mouseoverService),
            connectorMouseLeave: this.mouseoverService.connectorMouseLeave.bind(this.mouseoverService),
            nodeClicked: function (event, node) {
                _this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            }
        };
        this.adjustCanvasSize(this.fitModelSizeByDefault);
    };
    NgxFlowchartComponent.prototype.ngDoCheck = function () {
        if (this.model) {
            var nodesChange = this.nodesDiffer.diff(this.model.nodes);
            var edgesChange = this.edgesDiffer.diff(this.model.edges);
            var nodesChanged_1 = false;
            var edgesChanged_1 = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem(function () {
                    nodesChanged_1 = true;
                });
                nodesChange.forEachRemovedItem(function () {
                    nodesChanged_1 = true;
                });
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem(function () {
                    edgesChanged_1 = true;
                });
                edgesChange.forEachRemovedItem(function () {
                    edgesChanged_1 = true;
                });
            }
            if (nodesChanged_1) {
                this.adjustCanvasSize(this.fitModelSizeByDefault);
            }
            if (nodesChanged_1 || edgesChanged_1) {
                this.detectChangesSubject.next();
            }
        }
    };
    NgxFlowchartComponent.prototype.getEdgeDAttribute = function (edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    };
    NgxFlowchartComponent.prototype.adjustCanvasSize = function (fit) {
        var _this = this;
        var maxX = 0;
        var maxY = 0;
        var element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach(function (node) {
            maxX = Math.max(node.x + _this.nodeWidth, maxX);
            maxY = Math.max(node.y + _this.nodeHeight, maxY);
        });
        var width;
        var height;
        if (fit) {
            width = maxX;
            height = maxY;
        }
        else {
            width = Math.max(maxX, element.prop('offsetWidth'));
            height = Math.max(maxY, element.prop('offsetHeight'));
        }
        element.css('width', width + 'px');
        element.css('height', height + 'px');
    };
    NgxFlowchartComponent.prototype.canvasClick = function (event) { };
    NgxFlowchartComponent.prototype.edgeMouseDown = function (event, edge) {
        event.stopPropagation();
    };
    NgxFlowchartComponent.prototype.edgeClick = function (event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    };
    NgxFlowchartComponent.prototype.edgeRemove = function (event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    };
    NgxFlowchartComponent.prototype.edgeEdit = function (event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    };
    NgxFlowchartComponent.prototype.edgeDoubleClick = function (event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    };
    NgxFlowchartComponent.prototype.edgeMouseOver = function (event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    };
    NgxFlowchartComponent.prototype.edgeMouseEnter = function (event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    };
    NgxFlowchartComponent.prototype.edgeMouseLeave = function (event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    };
    NgxFlowchartComponent.prototype.dragover = function (event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    };
    NgxFlowchartComponent.prototype.drop = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    };
    NgxFlowchartComponent.prototype.mousedown = function (event) {
        this.rectangleSelectService.mousedown(event);
    };
    NgxFlowchartComponent.prototype.mousemove = function (event) {
        this.rectangleSelectService.mousemove(event);
    };
    NgxFlowchartComponent.prototype.mouseup = function (event) {
        this.rectangleSelectService.mouseup(event);
    };
    NgxFlowchartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: FcModelValidationService },
        { type: FcEdgeDrawingService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        HostBinding('attr.class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NgxFlowchartComponent.prototype, "canvasClass", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxFlowchartComponent.prototype, "model", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NgxFlowchartComponent.prototype, "selectedObjects", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxFlowchartComponent.prototype, "edgeStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxFlowchartComponent.prototype, "userCallbacks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NgxFlowchartComponent.prototype, "automaticResize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxFlowchartComponent.prototype, "dragAnimation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NgxFlowchartComponent.prototype, "nodeWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NgxFlowchartComponent.prototype, "nodeHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgxFlowchartComponent.prototype, "dropTargetId", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgxFlowchartComponent.prototype, "modelChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NgxFlowchartComponent.prototype, "fitModelSizeByDefault", null);
    __decorate([
        HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "dragover", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [DragEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "drop", null);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "mousedown", null);
    __decorate([
        HostListener('mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "mousemove", null);
    __decorate([
        HostListener('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "mouseup", null);
    NgxFlowchartComponent = __decorate([
        Component({
            selector: 'fc-canvas',
            template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;-webkit-transition:stroke-width .2s;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;-webkit-transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-transform-origin:bottom left;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{-webkit-transform:scale(1.25);transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            IterableDiffers,
            FcModelValidationService,
            FcEdgeDrawingService,
            ChangeDetectorRef,
            NgZone])
    ], NgxFlowchartComponent);
    return NgxFlowchartComponent;
}());
export { NgxFlowchartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sTUFBTSxFQUFFLE1BQU0sRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdDLGtCQUFrQixFQUFvQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BJLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVE5QztJQXVFRSwrQkFBb0IsVUFBbUMsRUFDbkMsT0FBd0IsRUFDeEIsZUFBeUMsRUFDMUMsa0JBQXdDLEVBQ3ZDLEVBQXFCLEVBQ3JCLElB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QixvQkFBb0I7WUFDbkMsaUJBQWlCO1lBQ2YsTUFBTTtPQTVFckIscUJBQXFCLENBMlJqQztJQUFELDRCQUFDO0NBQUEsQUEzUkQsSUEyUkM7U0EzUlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE5nWm9uZSxcbiAgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNFZGdlLCBGY01vZGVsLCBGY05vZGUsIEZsb3djaGFydENvbnN0YW50cywgVXNlckNhbGxiYWNrcywgVXNlck5vZGVDYWxsYmFja3MgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNFZGdlRHJhd2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYWdnaW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmFnZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW91c2VPdmVyU2VydmljZSB9IGZyb20gJy4vbW91c2VvdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlIH0gZnJvbSAnLi9yZWN0YW5nbGVzZWxlY3Quc2VydmljZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYy1jYW52YXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmd4Rmxvd2NoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuY2xhc3MnKVxuICBnZXQgY2FudmFzQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gRmxvd2NoYXJ0Q29uc3RhbnRzLmNhbnZhc0NsYXNzO1xuICB9XG5cbiAgQElucHV0KClcbiAgbW9kZWw6IEZjTW9kZWw7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWRPYmplY3RzOiBhbnlbXTtcblxuICBASW5wdXQoKVxuICBlZGdlU3R5bGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICB1c2VyQ2FsbGJhY2tzOiBVc2VyQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIGF1dG9tYXRpY1Jlc2l6ZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBkcmFnQW5pbWF0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgbm9kZVdpZHRoOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgbm9kZUhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGRyb3BUYXJnZXRJZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBtb2RlbENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBmaXRNb2RlbFNpemVCeURlZmF1bHRWYWx1ZSA9IHRydWU7XG4gIGdldCBmaXRNb2RlbFNpemVCeURlZmF1bHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZml0TW9kZWxTaXplQnlEZWZhdWx0VmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZml0TW9kZWxTaXplQnlEZWZhdWx0VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICB1c2VyTm9kZUNhbGxiYWNrczogVXNlck5vZGVDYWxsYmFja3M7XG5cbiAgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgbm9kZURyYWdnaW5nU2VydmljZTogRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlO1xuICBlZGdlRHJhZ2dpbmdTZXJ2aWNlOiBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2U7XG4gIG1vdXNlb3ZlclNlcnZpY2U6IEZjTW91c2VPdmVyU2VydmljZTtcbiAgcmVjdGFuZ2xlU2VsZWN0U2VydmljZTogRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlO1xuXG4gIGFycm93RGVmSWQ6IHN0cmluZztcbiAgYXJyb3dEZWZJZFNlbGVjdGVkOiBzdHJpbmc7XG5cbiAgZmxvd2NoYXJ0Q29uc3RhbnRzID0gRmxvd2NoYXJ0Q29uc3RhbnRzO1xuXG4gIHByaXZhdGUgbm9kZXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEZjTm9kZT4gPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlPEZjTm9kZT4oKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH0pO1xuXG4gIHByaXZhdGUgZWRnZXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEZjRWRnZT4gPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlPEZjRWRnZT4oKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH0pO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGV0ZWN0Q2hhbmdlc1N1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyBlZGdlRHJhd2luZ1NlcnZpY2U6IEZjRWRnZURyYXdpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmFycm93RGVmSWQgPSAnYXJyb3ctJyArIE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy5hcnJvd0RlZklkU2VsZWN0ZWQgPSB0aGlzLmFycm93RGVmSWQgKyAnLXNlbGVjdGVkJztcbiAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0XG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkLmRldGVjdENoYW5nZXMoKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZHJvcFRhcmdldElkICYmIHRoaXMuZWRnZVN0eWxlICE9PSBGbG93Y2hhcnRDb25zdGFudHMuY3VydmVkU3R5bGUgJiYgdGhpcy5lZGdlU3R5bGUgIT09IEZsb3djaGFydENvbnN0YW50cy5saW5lU3R5bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWRnZVN0eWxlIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHRoaXMubm9kZUhlaWdodCA9IHRoaXMubm9kZUhlaWdodCB8fCAyMDA7XG4gICAgdGhpcy5ub2RlV2lkdGggPSB0aGlzLm5vZGVXaWR0aCB8fCAyMDA7XG4gICAgdGhpcy5kcmFnQW5pbWF0aW9uID0gdGhpcy5kcmFnQW5pbWF0aW9uIHx8IEZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludDtcbiAgICB0aGlzLnVzZXJDYWxsYmFja3MgPSB0aGlzLnVzZXJDYWxsYmFja3MgfHwge307XG4gICAgdGhpcy5hdXRvbWF0aWNSZXNpemUgPSB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSB8fCBmYWxzZTtcblxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMudXNlckNhbGxiYWNrcykpIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy51c2VyQ2FsbGJhY2tzW2tleV07XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nICYmIGtleSAhPT0gJ25vZGVDYWxsYmFja3MnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWxsIGNhbGxiYWNrcyBzaG91bGQgYmUgZnVuY3Rpb25zLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MgPSB0aGlzLnVzZXJDYWxsYmFja3Mubm9kZUNhbGxiYWNrcztcblxuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbmV3IEZjTW9kZWxTZXJ2aWNlKHRoaXMubW9kZWxWYWxpZGF0aW9uLCB0aGlzLm1vZGVsLCB0aGlzLm1vZGVsQ2hhbmdlZCxcbiAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3QsIHRoaXMuc2VsZWN0ZWRPYmplY3RzLFxuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmRyb3BOb2RlLCB0aGlzLnVzZXJDYWxsYmFja3MuY3JlYXRlRWRnZSwgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VBZGRlZCwgdGhpcy51c2VyQ2FsbGJhY2tzLm5vZGVSZW1vdmVkLFxuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VSZW1vdmVkLCBlbGVtZW50WzBdLCBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpKTtcblxuICAgIGlmICh0aGlzLmRyb3BUYXJnZXRJZCkge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZHJvcFRhcmdldElkID0gdGhpcy5kcm9wVGFyZ2V0SWQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXBwbHlGdW5jdGlvbiA9IHRoaXMuem9uZS5ydW4uYmluZCh0aGlzLnpvbmUpO1xuXG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlID0gbmV3IEZjTm9kZURyYWdnaW5nU2VydmljZSh0aGlzLm1vZGVsU2VydmljZSwgYXBwbHlGdW5jdGlvbixcbiAgICAgICAgICB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSwgdGhpcy5kcmFnQW5pbWF0aW9uKTtcblxuICAgIHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSA9IG5ldyBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2UodGhpcy5tb2RlbFZhbGlkYXRpb24sIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLCB0aGlzLm1vZGVsU2VydmljZSxcbiAgICAgIHRoaXMubW9kZWwsIHRoaXMudXNlckNhbGxiYWNrcy5pc1ZhbGlkRWRnZSB8fCBudWxsLCBhcHBseUZ1bmN0aW9uLFxuICAgICAgdGhpcy5kcmFnQW5pbWF0aW9uLCB0aGlzLmVkZ2VTdHlsZSk7XG5cbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UgPSBuZXcgRmNNb3VzZU92ZXJTZXJ2aWNlKGFwcGx5RnVuY3Rpb24pO1xuXG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlID0gbmV3IEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZSh0aGlzLm1vZGVsU2VydmljZSxcbiAgICAgIGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignI3NlbGVjdC1yZWN0YW5nbGUnKSwgYXBwbHlGdW5jdGlvbik7XG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgIG5vZGVEcmFnc3RhcnQ6IHRoaXMubm9kZURyYWdnaW5nU2VydmljZS5kcmFnc3RhcnQuYmluZCh0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgbm9kZURyYWdlbmQ6IHRoaXMubm9kZURyYWdnaW5nU2VydmljZS5kcmFnZW5kLmJpbmQodGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnc3RhcnQ6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnc3RhcnQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdlbmQ6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnZW5kLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcm9wOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJvcC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ292ZXJDb25uZWN0b3I6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnb3ZlckNvbm5lY3Rvci5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ292ZXJNYWduZXQ6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnb3Zlck1hZ25ldC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ2xlYXZlTWFnbmV0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ2xlYXZlTWFnbmV0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIG5vZGVNb3VzZU92ZXI6IHRoaXMubW91c2VvdmVyU2VydmljZS5ub2RlTW91c2VPdmVyLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIG5vZGVNb3VzZU91dDogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLm5vZGVNb3VzZU91dC5iaW5kKHRoaXMubW91c2VvdmVyU2VydmljZSksXG4gICAgICBjb25uZWN0b3JNb3VzZUVudGVyOiB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuY29ubmVjdG9yTW91c2VFbnRlci5iaW5kKHRoaXMubW91c2VvdmVyU2VydmljZSksXG4gICAgICBjb25uZWN0b3JNb3VzZUxlYXZlOiB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuY29ubmVjdG9yTW91c2VMZWF2ZS5iaW5kKHRoaXMubW91c2VvdmVyU2VydmljZSksXG4gICAgICBub2RlQ2xpY2tlZDogKGV2ZW50LCBub2RlKSA9PiB7XG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLm5vZGVzLmhhbmRsZUNsaWNrZWQobm9kZSwgZXZlbnQuY3RybEtleSk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5hZGp1c3RDYW52YXNTaXplKHRoaXMuZml0TW9kZWxTaXplQnlEZWZhdWx0KTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgY29uc3Qgbm9kZXNDaGFuZ2UgPSB0aGlzLm5vZGVzRGlmZmVyLmRpZmYodGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICBjb25zdCBlZGdlc0NoYW5nZSA9IHRoaXMuZWRnZXNEaWZmZXIuZGlmZih0aGlzLm1vZGVsLmVkZ2VzKTtcbiAgICAgIGxldCBub2Rlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgIGxldCBlZGdlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgIGlmIChub2Rlc0NoYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICBub2Rlc0NoYW5nZS5mb3JFYWNoQWRkZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBub2Rlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgbm9kZXNDaGFuZ2UuZm9yRWFjaFJlbW92ZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBub2Rlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChlZGdlc0NoYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICBlZGdlc0NoYW5nZS5mb3JFYWNoQWRkZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBlZGdlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgZWRnZXNDaGFuZ2UuZm9yRWFjaFJlbW92ZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBlZGdlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChub2Rlc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RDYW52YXNTaXplKHRoaXMuZml0TW9kZWxTaXplQnlEZWZhdWx0KTtcbiAgICAgIH1cbiAgICAgIGlmIChub2Rlc0NoYW5nZWQgfHwgZWRnZXNDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3QubmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEVkZ2VEQXR0cmlidXRlKGVkZ2U6IEZjRWRnZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLnNvdXJjZUNvb3JkKGVkZ2UpLFxuICAgICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVzdENvb3JkKGVkZ2UpLCB0aGlzLmVkZ2VTdHlsZSk7XG4gIH1cblxuICBwdWJsaWMgYWRqdXN0Q2FudmFzU2l6ZShmaXQ/OiBib29sZWFuKSB7XG4gICAgbGV0IG1heFggPSAwO1xuICAgIGxldCBtYXhZID0gMDtcbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5tb2RlbC5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBtYXhYID0gTWF0aC5tYXgobm9kZS54ICsgdGhpcy5ub2RlV2lkdGgsIG1heFgpO1xuICAgICAgbWF4WSA9IE1hdGgubWF4KG5vZGUueSArIHRoaXMubm9kZUhlaWdodCwgbWF4WSk7XG4gICAgfSk7XG4gICAgbGV0IHdpZHRoO1xuICAgIGxldCBoZWlnaHQ7XG4gICAgaWYgKGZpdCkge1xuICAgICAgd2lkdGggPSBtYXhYO1xuICAgICAgaGVpZ2h0ID0gbWF4WTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGggPSBNYXRoLm1heChtYXhYLCBlbGVtZW50LnByb3AoJ29mZnNldFdpZHRoJykpO1xuICAgICAgaGVpZ2h0ID0gTWF0aC5tYXgobWF4WSwgZWxlbWVudC5wcm9wKCdvZmZzZXRIZWlnaHQnKSk7XG4gICAgfVxuICAgIGVsZW1lbnQuY3NzKCd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gICAgZWxlbWVudC5jc3MoJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xuICB9XG5cbiAgY2FudmFzQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHt9XG5cbiAgZWRnZU1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBlZGdlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmhhbmRsZUVkZ2VNb3VzZUNsaWNrKGVkZ2UsIGV2ZW50LmN0cmxLZXkpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBlZGdlUmVtb3ZlKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuZGVsZXRlKGVkZ2UpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBlZGdlRWRpdChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZUVkaXQpIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRWRpdChldmVudCwgZWRnZSk7XG4gICAgfVxuICB9XG5cbiAgZWRnZURvdWJsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VEb3VibGVDbGljaykge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VEb3VibGVDbGljayhldmVudCwgZWRnZSk7XG4gICAgfVxuICB9XG5cbiAgZWRnZU1vdXNlT3ZlcihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlTW91c2VPdmVyKSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZU1vdXNlT3ZlcihldmVudCwgZWRnZSk7XG4gICAgfVxuICB9XG5cbiAgZWRnZU1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIHRoaXMubW91c2VvdmVyU2VydmljZS5lZGdlTW91c2VFbnRlcihldmVudCwgZWRnZSk7XG4gIH1cblxuICBlZGdlTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmVkZ2VNb3VzZUxlYXZlKGV2ZW50LCBlZGdlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgZHJhZ292ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZS5kcmFnb3ZlcihldmVudCk7XG4gICAgdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJvcChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UubW91c2Vkb3duKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIG1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZW1vdmUoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcsIFsnJGV2ZW50J10pXG4gIG1vdXNldXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UubW91c2V1cChldmVudCk7XG4gIH1cblxufVxuIl19