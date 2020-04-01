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
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NgxFlowchartComponent.prototype, "dragover", null);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sTUFBTSxFQUFFLE1BQU0sRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdDLGtCQUFrQixFQUFvQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BJLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVE5QztJQXVFRSwrQkFBb0IsVUFBbUMsRUFDbkMsT0FBd0IsRUFDeEIsZUFBeUMsRUFDMUMsa0JBQXdDLEVBQ3ZDLEVBQXFCLEVBQ3JCLElB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WUFDZixNQUFNO09BNUVyQixxQkFBcUIsQ0EyUmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTNSRCxJQTJSQztTQTNSWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgTmdab25lLFxuICBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjQ2FsbGJhY2tzLCBGY0VkZ2UsIEZjTW9kZWwsIEZjTm9kZSwgRmxvd2NoYXJ0Q29uc3RhbnRzLCBVc2VyQ2FsbGJhY2tzLCBVc2VyTm9kZUNhbGxiYWNrcyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY05vZGVEcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICcuL25vZGUtZHJhZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmF3aW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmF3aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNNb3VzZU92ZXJTZXJ2aWNlIH0gZnJvbSAnLi9tb3VzZW92ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2UgfSBmcm9tICcuL3JlY3RhbmdsZXNlbGVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLWNhbnZhcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGbG93Y2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5jbGFzcycpXG4gIGdldCBjYW52YXNDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzQ2xhc3M7XG4gIH1cblxuICBASW5wdXQoKVxuICBtb2RlbDogRmNNb2RlbDtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZE9iamVjdHM6IGFueVtdO1xuXG4gIEBJbnB1dCgpXG4gIGVkZ2VTdHlsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJDYWxsYmFja3M6IFVzZXJDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgYXV0b21hdGljUmVzaXplOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdBbmltYXRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBub2RlV2lkdGg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBub2RlSGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIG1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGZpdE1vZGVsU2l6ZUJ5RGVmYXVsdFZhbHVlID0gdHJ1ZTtcbiAgZ2V0IGZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHRWYWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZml0TW9kZWxTaXplQnlEZWZhdWx0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHRWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBub2RlRHJhZ2dpbmdTZXJ2aWNlOiBGY05vZGVEcmFnZ2luZ1NlcnZpY2U7XG4gIGVkZ2VEcmFnZ2luZ1NlcnZpY2U6IEZjRWRnZURyYWdnaW5nU2VydmljZTtcbiAgbW91c2VvdmVyU2VydmljZTogRmNNb3VzZU92ZXJTZXJ2aWNlO1xuICByZWN0YW5nbGVTZWxlY3RTZXJ2aWNlOiBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2U7XG5cbiAgYXJyb3dEZWZJZDogc3RyaW5nO1xuICBhcnJvd0RlZklkU2VsZWN0ZWQ6IHN0cmluZztcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgcHJpdmF0ZSBub2Rlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8RmNOb2RlPiA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8RmNOb2RlPigoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG5cbiAgcHJpdmF0ZSBlZGdlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8RmNFZGdlPiA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8RmNFZGdlPigoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXRlY3RDaGFuZ2VzU3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGVkZ2VEcmF3aW5nU2VydmljZTogRmNFZGdlRHJhd2luZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuYXJyb3dEZWZJZCA9ICdhcnJvdy0nICsgTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLmFycm93RGVmSWRTZWxlY3RlZCA9IHRoaXMuYXJyb3dEZWZJZCArICctc2VsZWN0ZWQnO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3RcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kcm9wVGFyZ2V0SWQgJiYgdGhpcy5lZGdlU3R5bGUgIT09IEZsb3djaGFydENvbnN0YW50cy5jdXJ2ZWRTdHlsZSAmJiB0aGlzLmVkZ2VTdHlsZSAhPT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxpbmVTdHlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlZGdlU3R5bGUgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgdGhpcy5ub2RlSGVpZ2h0ID0gdGhpcy5ub2RlSGVpZ2h0IHx8IDIwMDtcbiAgICB0aGlzLm5vZGVXaWR0aCA9IHRoaXMubm9kZVdpZHRoIHx8IDIwMDtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSB0aGlzLmRyYWdBbmltYXRpb24gfHwgRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50O1xuICAgIHRoaXMudXNlckNhbGxiYWNrcyA9IHRoaXMudXNlckNhbGxiYWNrcyB8fCB7fTtcbiAgICB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSA9IHRoaXMuYXV0b21hdGljUmVzaXplIHx8IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy51c2VyQ2FsbGJhY2tzKSkge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnVzZXJDYWxsYmFja3Nba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicgJiYga2V5ICE9PSAnbm9kZUNhbGxiYWNrcycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgY2FsbGJhY2tzIHNob3VsZCBiZSBmdW5jdGlvbnMuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcyA9IHRoaXMudXNlckNhbGxiYWNrcy5ub2RlQ2FsbGJhY2tzO1xuXG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBuZXcgRmNNb2RlbFNlcnZpY2UodGhpcy5tb2RlbFZhbGlkYXRpb24sIHRoaXMubW9kZWwsIHRoaXMubW9kZWxDaGFuZ2VkLFxuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdCwgdGhpcy5zZWxlY3RlZE9iamVjdHMsXG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZHJvcE5vZGUsIHRoaXMudXNlckNhbGxiYWNrcy5jcmVhdGVFZGdlLCB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZUFkZGVkLCB0aGlzLnVzZXJDYWxsYmFja3Mubm9kZVJlbW92ZWQsXG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZVJlbW92ZWQsIGVsZW1lbnRbMF0sIGVsZW1lbnRbMF0ucXVlcnlTZWxlY3Rvcignc3ZnJykpO1xuXG4gICAgaWYgKHRoaXMuZHJvcFRhcmdldElkKSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kcm9wVGFyZ2V0SWQgPSB0aGlzLmRyb3BUYXJnZXRJZDtcbiAgICB9XG5cbiAgICBjb25zdCBhcHBseUZ1bmN0aW9uID0gdGhpcy56b25lLnJ1bi5iaW5kKHRoaXMuem9uZSk7XG5cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlKHRoaXMubW9kZWxTZXJ2aWNlLCBhcHBseUZ1bmN0aW9uLFxuICAgICAgICAgIHRoaXMuYXV0b21hdGljUmVzaXplLCB0aGlzLmRyYWdBbmltYXRpb24pO1xuXG4gICAgdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlID0gbmV3IEZjRWRnZURyYWdnaW5nU2VydmljZSh0aGlzLm1vZGVsVmFsaWRhdGlvbiwgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UsIHRoaXMubW9kZWxTZXJ2aWNlLFxuICAgICAgdGhpcy5tb2RlbCwgdGhpcy51c2VyQ2FsbGJhY2tzLmlzVmFsaWRFZGdlIHx8IG51bGwsIGFwcGx5RnVuY3Rpb24sXG4gICAgICB0aGlzLmRyYWdBbmltYXRpb24sIHRoaXMuZWRnZVN0eWxlKTtcblxuICAgIHRoaXMubW91c2VvdmVyU2VydmljZSA9IG5ldyBGY01vdXNlT3ZlclNlcnZpY2UoYXBwbHlGdW5jdGlvbik7XG5cbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UgPSBuZXcgRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlKHRoaXMubW9kZWxTZXJ2aWNlLFxuICAgICAgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0LXJlY3RhbmdsZScpLCBhcHBseUZ1bmN0aW9uKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgbm9kZURyYWdzdGFydDogdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdzdGFydC5iaW5kKHRoaXMubm9kZURyYWdnaW5nU2VydmljZSksXG4gICAgICBub2RlRHJhZ2VuZDogdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdlbmQuYmluZCh0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdzdGFydDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdzdGFydC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ2VuZDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdlbmQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyb3A6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcm9wLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnb3ZlckNvbm5lY3RvcjogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyQ29ubmVjdG9yLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnb3Zlck1hZ25ldDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyTWFnbmV0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnbGVhdmVNYWduZXQ6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnbGVhdmVNYWduZXQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgbm9kZU1vdXNlT3ZlcjogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLm5vZGVNb3VzZU92ZXIuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgbm9kZU1vdXNlT3V0OiB0aGlzLm1vdXNlb3ZlclNlcnZpY2Uubm9kZU1vdXNlT3V0LmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIGNvbm5lY3Rvck1vdXNlRW50ZXI6IHRoaXMubW91c2VvdmVyU2VydmljZS5jb25uZWN0b3JNb3VzZUVudGVyLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIGNvbm5lY3Rvck1vdXNlTGVhdmU6IHRoaXMubW91c2VvdmVyU2VydmljZS5jb25uZWN0b3JNb3VzZUxlYXZlLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIG5vZGVDbGlja2VkOiAoZXZlbnQsIG5vZGUpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaGFuZGxlQ2xpY2tlZChub2RlLCBldmVudC5jdHJsS2V5KTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmFkanVzdENhbnZhc1NpemUodGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHQpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICBjb25zdCBub2Rlc0NoYW5nZSA9IHRoaXMubm9kZXNEaWZmZXIuZGlmZih0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIGNvbnN0IGVkZ2VzQ2hhbmdlID0gdGhpcy5lZGdlc0RpZmZlci5kaWZmKHRoaXMubW9kZWwuZWRnZXMpO1xuICAgICAgbGV0IG5vZGVzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgbGV0IGVkZ2VzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgaWYgKG5vZGVzQ2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgIG5vZGVzQ2hhbmdlLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIG5vZGVzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBub2Rlc0NoYW5nZS5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIG5vZGVzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVkZ2VzQ2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgIGVkZ2VzQ2hhbmdlLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIGVkZ2VzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGdlc0NoYW5nZS5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIGVkZ2VzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLmFkanVzdENhbnZhc1NpemUodGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHQpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCB8fCBlZGdlc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RWRnZURBdHRyaWJ1dGUoZWRnZTogRmNFZGdlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc291cmNlQ29vcmQoZWRnZSksXG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZXN0Q29vcmQoZWRnZSksIHRoaXMuZWRnZVN0eWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGp1c3RDYW52YXNTaXplKGZpdD86IGJvb2xlYW4pIHtcbiAgICBsZXQgbWF4WCA9IDA7XG4gICAgbGV0IG1heFkgPSAwO1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG1heFggPSBNYXRoLm1heChub2RlLnggKyB0aGlzLm5vZGVXaWR0aCwgbWF4WCk7XG4gICAgICBtYXhZID0gTWF0aC5tYXgobm9kZS55ICsgdGhpcy5ub2RlSGVpZ2h0LCBtYXhZKTtcbiAgICB9KTtcbiAgICBsZXQgd2lkdGg7XG4gICAgbGV0IGhlaWdodDtcbiAgICBpZiAoZml0KSB7XG4gICAgICB3aWR0aCA9IG1heFg7XG4gICAgICBoZWlnaHQgPSBtYXhZO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IE1hdGgubWF4KG1heFgsIGVsZW1lbnQucHJvcCgnb2Zmc2V0V2lkdGgnKSk7XG4gICAgICBoZWlnaHQgPSBNYXRoLm1heChtYXhZLCBlbGVtZW50LnByb3AoJ29mZnNldEhlaWdodCcpKTtcbiAgICB9XG4gICAgZWxlbWVudC5jc3MoJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgICBlbGVtZW50LmNzcygnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICBjYW52YXNDbGljayhldmVudDogTW91c2VFdmVudCkge31cblxuICBlZGdlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGVkZ2VDbGljayhldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZSwgZXZlbnQuY3RybEtleSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VSZW1vdmUoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VFZGl0KGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRWRpdCkge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VFZGl0KGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlTW91c2VPdmVyKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmVkZ2VNb3VzZUVudGVyKGV2ZW50LCBlZGdlKTtcbiAgfVxuXG4gIGVkZ2VNb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuZWRnZU1vdXNlTGVhdmUoZXZlbnQsIGVkZ2UpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnb3ZlcihldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXIoZXZlbnQpO1xuICAgIHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnb3ZlcihldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJvcChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UubW91c2Vkb3duKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIG1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZW1vdmUoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V1cCcsIFsnJGV2ZW50J10pXG4gIG1vdXNldXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UubW91c2V1cChldmVudCk7XG4gIH1cblxufVxuIl19