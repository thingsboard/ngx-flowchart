/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, IterableDiffers, NgZone, Output } from '@angular/core';
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
        this.nodesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item;
        }));
        this.edgesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return item;
        }));
        this.detectChangesSubject = new Subject();
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
        this.detectChangesSubject
            .pipe(debounceTime(50))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.cd.detectChanges(); }));
    }
    Object.defineProperty(NgxFlowchartComponent.prototype, "canvasClass", {
        get: /**
         * @return {?}
         */
        function () {
            return FlowchartConstants.canvasClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxFlowchartComponent.prototype, "fitModelSizeByDefault", {
        get: /**
         * @return {?}
         */
        function () {
            return this.fitModelSizeByDefaultValue;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.fitModelSizeByDefaultValue = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
            for (var _b = tslib_1.__values(Object.keys(this.userCallbacks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                /** @type {?} */
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
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.detectChangesSubject, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        /** @type {?} */
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
            nodeClicked: (/**
             * @param {?} event
             * @param {?} node
             * @return {?}
             */
            function (event, node) {
                _this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            })
        };
        this.adjustCanvasSize(this.fitModelSizeByDefault);
    };
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.model) {
            /** @type {?} */
            var nodesChange = this.nodesDiffer.diff(this.model.nodes);
            /** @type {?} */
            var edgesChange = this.edgesDiffer.diff(this.model.edges);
            /** @type {?} */
            var nodesChanged_1 = false;
            /** @type {?} */
            var edgesChanged_1 = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                function () {
                    nodesChanged_1 = true;
                }));
                nodesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                function () {
                    nodesChanged_1 = true;
                }));
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                function () {
                    edgesChanged_1 = true;
                }));
                edgesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                function () {
                    edgesChanged_1 = true;
                }));
            }
            if (nodesChanged_1) {
                this.adjustCanvasSize(this.fitModelSizeByDefault);
            }
            if (nodesChanged_1 || edgesChanged_1) {
                this.detectChangesSubject.next();
            }
        }
    };
    /**
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.getEdgeDAttribute = /**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    };
    /**
     * @param {?=} fit
     * @return {?}
     */
    NgxFlowchartComponent.prototype.adjustCanvasSize = /**
     * @param {?=} fit
     * @return {?}
     */
    function (fit) {
        var _this = this;
        /** @type {?} */
        var maxX = 0;
        /** @type {?} */
        var maxY = 0;
        /** @type {?} */
        var element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            maxX = Math.max(node.x + _this.nodeWidth, maxX);
            maxY = Math.max(node.y + _this.nodeHeight, maxY);
        }));
        /** @type {?} */
        var width;
        /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.canvasClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseDown = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeClick = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeRemove = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeEdit = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeDoubleClick = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseOver = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseEnter = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    NgxFlowchartComponent.prototype.edgeMouseLeave = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.dragover = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mousedown(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mousemove(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFlowchartComponent.prototype.mouseup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.rectangleSelectService.mouseup(event);
    };
    NgxFlowchartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-canvas',
                    template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
                }] }
    ];
    /** @nocollapse */
    NgxFlowchartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: FcModelValidationService },
        { type: FcEdgeDrawingService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    NgxFlowchartComponent.propDecorators = {
        canvasClass: [{ type: HostBinding, args: ['attr.class',] }],
        model: [{ type: Input }],
        selectedObjects: [{ type: Input }],
        edgeStyle: [{ type: Input }],
        userCallbacks: [{ type: Input }],
        automaticResize: [{ type: Input }],
        dragAnimation: [{ type: Input }],
        nodeWidth: [{ type: Input }],
        nodeHeight: [{ type: Input }],
        dropTargetId: [{ type: Input }],
        modelChanged: [{ type: Output }],
        fitModelSizeByDefault: [{ type: Input }],
        dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        mousemove: [{ type: HostListener, args: ['mousemove', ['$event'],] }],
        mouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
    };
    return NgxFlowchartComponent;
}());
export { NgxFlowchartComponent };
if (false) {
    /** @type {?} */
    NgxFlowchartComponent.prototype.model;
    /** @type {?} */
    NgxFlowchartComponent.prototype.selectedObjects;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeStyle;
    /** @type {?} */
    NgxFlowchartComponent.prototype.userCallbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.automaticResize;
    /** @type {?} */
    NgxFlowchartComponent.prototype.dragAnimation;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeWidth;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeHeight;
    /** @type {?} */
    NgxFlowchartComponent.prototype.dropTargetId;
    /** @type {?} */
    NgxFlowchartComponent.prototype.modelChanged;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.fitModelSizeByDefaultValue;
    /** @type {?} */
    NgxFlowchartComponent.prototype.callbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.userNodeCallbacks;
    /** @type {?} */
    NgxFlowchartComponent.prototype.modelService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.nodeDraggingService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeDraggingService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.mouseoverService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.rectangleSelectService;
    /** @type {?} */
    NgxFlowchartComponent.prototype.arrowDefId;
    /** @type {?} */
    NgxFlowchartComponent.prototype.arrowDefIdSelected;
    /** @type {?} */
    NgxFlowchartComponent.prototype.flowchartConstants;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.nodesDiffer;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.edgesDiffer;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.detectChangesSubject;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.modelValidation;
    /** @type {?} */
    NgxFlowchartComponent.prototype.edgeDrawingService;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    NgxFlowchartComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUMxQyxTQUFTLEVBRVQsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBRUwsZUFBZSxFQUNmLE1BQU0sRUFDRSxNQUFNLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QyxrQkFBa0IsRUFBb0MsTUFBTSx3QkFBd0IsQ0FBQztBQUNwSSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7SUE2RUUsK0JBQW9CLFVBQW1DLEVBQ25DLE9BQXdCLEVBQ3hCLGVBQXlDLEVBQzFDLGtCQUF3QyxFQUN2QyxFQUFxQixFQUNyQixJQUFZO1FBTGhDLGlCQVdDO1FBWG1CLGVBQVUs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LDRDQUVHOzs7OztJQUVILDRDQUVHOzs7OztJQUVILHFEQUEyRDs7Ozs7SUFFL0MsMkNBQTJDOzs7OztJQUMzQyx3Q0FBZ0M7Ozs7O0lBQ2hDLGdEQUFpRDs7SUFDakQsbURBQStDOzs7OztJQUMvQyxtQ0FBNkI7Ozs7O0lBQzdCLHFDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBOZ1pvbmUsXG4gIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjRWRnZSwgRmNNb2RlbCwgRmNOb2RlLCBGbG93Y2hhcnRDb25zdGFudHMsIFVzZXJDYWxsYmFja3MsIFVzZXJOb2RlQ2FsbGJhY2tzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTm9kZURyYWdnaW5nU2VydmljZSB9IGZyb20gJy4vbm9kZS1kcmFnZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vdXNlT3ZlclNlcnZpY2UgfSBmcm9tICcuL21vdXNlb3Zlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZSB9IGZyb20gJy4vcmVjdGFuZ2xlc2VsZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmMtY2FudmFzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1mbG93Y2hhcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEZsb3djaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmNsYXNzJylcbiAgZ2V0IGNhbnZhc0NsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNDbGFzcztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIG1vZGVsOiBGY01vZGVsO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkT2JqZWN0czogYW55W107XG5cbiAgQElucHV0KClcbiAgZWRnZVN0eWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdXNlckNhbGxiYWNrczogVXNlckNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVXaWR0aDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBkcm9wVGFyZ2V0SWQ6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgbW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZml0TW9kZWxTaXplQnlEZWZhdWx0VmFsdWUgPSB0cnVlO1xuICBnZXQgZml0TW9kZWxTaXplQnlEZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdFZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXRNb2RlbFNpemVCeURlZmF1bHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdFZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG4gIG5vZGVEcmFnZ2luZ1NlcnZpY2U6IEZjTm9kZURyYWdnaW5nU2VydmljZTtcbiAgZWRnZURyYWdnaW5nU2VydmljZTogRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlO1xuICBtb3VzZW92ZXJTZXJ2aWNlOiBGY01vdXNlT3ZlclNlcnZpY2U7XG4gIHJlY3RhbmdsZVNlbGVjdFNlcnZpY2U6IEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZTtcblxuICBhcnJvd0RlZklkOiBzdHJpbmc7XG4gIGFycm93RGVmSWRTZWxlY3RlZDogc3RyaW5nO1xuXG4gIGZsb3djaGFydENvbnN0YW50cyA9IEZsb3djaGFydENvbnN0YW50cztcblxuICBwcml2YXRlIG5vZGVzRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxGY05vZGU+ID0gdGhpcy5kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZTxGY05vZGU+KChpbmRleCwgaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtO1xuICB9KTtcblxuICBwcml2YXRlIGVkZ2VzRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxGY0VkZ2U+ID0gdGhpcy5kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZTxGY0VkZ2U+KChpbmRleCwgaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtO1xuICB9KTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRldGVjdENoYW5nZXNTdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5hcnJvd0RlZklkID0gJ2Fycm93LScgKyBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMuYXJyb3dEZWZJZFNlbGVjdGVkID0gdGhpcy5hcnJvd0RlZklkICsgJy1zZWxlY3RlZCc7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdFxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmRyb3BUYXJnZXRJZCAmJiB0aGlzLmVkZ2VTdHlsZSAhPT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmN1cnZlZFN0eWxlICYmIHRoaXMuZWRnZVN0eWxlICE9PSBGbG93Y2hhcnRDb25zdGFudHMubGluZVN0eWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VkZ2VTdHlsZSBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVIZWlnaHQgPSB0aGlzLm5vZGVIZWlnaHQgfHwgMjAwO1xuICAgIHRoaXMubm9kZVdpZHRoID0gdGhpcy5ub2RlV2lkdGggfHwgMjAwO1xuICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiA9IHRoaXMuZHJhZ0FuaW1hdGlvbiB8fCBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQ7XG4gICAgdGhpcy51c2VyQ2FsbGJhY2tzID0gdGhpcy51c2VyQ2FsbGJhY2tzIHx8IHt9O1xuICAgIHRoaXMuYXV0b21hdGljUmVzaXplID0gdGhpcy5hdXRvbWF0aWNSZXNpemUgfHwgZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLnVzZXJDYWxsYmFja3MpKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMudXNlckNhbGxiYWNrc1trZXldO1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyAmJiBrZXkgIT09ICdub2RlQ2FsbGJhY2tzJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBjYWxsYmFja3Mgc2hvdWxkIGJlIGZ1bmN0aW9ucy4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzID0gdGhpcy51c2VyQ2FsbGJhY2tzLm5vZGVDYWxsYmFja3M7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG5ldyBGY01vZGVsU2VydmljZSh0aGlzLm1vZGVsVmFsaWRhdGlvbiwgdGhpcy5tb2RlbCwgdGhpcy5tb2RlbENoYW5nZWQsXG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0LCB0aGlzLnNlbGVjdGVkT2JqZWN0cyxcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5kcm9wTm9kZSwgdGhpcy51c2VyQ2FsbGJhY2tzLmNyZWF0ZUVkZ2UsIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlQWRkZWQsIHRoaXMudXNlckNhbGxiYWNrcy5ub2RlUmVtb3ZlZCxcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlUmVtb3ZlZCwgZWxlbWVudFswXSwgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdzdmcnKSk7XG5cbiAgICBpZiAodGhpcy5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BUYXJnZXRJZCA9IHRoaXMuZHJvcFRhcmdldElkO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5RnVuY3Rpb24gPSB0aGlzLnpvbmUucnVuLmJpbmQodGhpcy56b25lKTtcblxuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZSA9IG5ldyBGY05vZGVEcmFnZ2luZ1NlcnZpY2UodGhpcy5tb2RlbFNlcnZpY2UsIGFwcGx5RnVuY3Rpb24sXG4gICAgICAgICAgdGhpcy5hdXRvbWF0aWNSZXNpemUsIHRoaXMuZHJhZ0FuaW1hdGlvbik7XG5cbiAgICB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlKHRoaXMubW9kZWxWYWxpZGF0aW9uLCB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZSwgdGhpcy5tb2RlbFNlcnZpY2UsXG4gICAgICB0aGlzLm1vZGVsLCB0aGlzLnVzZXJDYWxsYmFja3MuaXNWYWxpZEVkZ2UgfHwgbnVsbCwgYXBwbHlGdW5jdGlvbixcbiAgICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiwgdGhpcy5lZGdlU3R5bGUpO1xuXG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlID0gbmV3IEZjTW91c2VPdmVyU2VydmljZShhcHBseUZ1bmN0aW9uKTtcblxuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZSA9IG5ldyBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2UodGhpcy5tb2RlbFNlcnZpY2UsXG4gICAgICBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3QtcmVjdGFuZ2xlJyksIGFwcGx5RnVuY3Rpb24pO1xuXG4gICAgdGhpcy5jYWxsYmFja3MgPSB7XG4gICAgICBub2RlRHJhZ3N0YXJ0OiB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ3N0YXJ0LmJpbmQodGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIG5vZGVEcmFnZW5kOiB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ2VuZC5iaW5kKHRoaXMubm9kZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ3N0YXJ0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ3N0YXJ0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnZW5kOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ2VuZC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJvcDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyb3AuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdvdmVyQ29ubmVjdG9yOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXJDb25uZWN0b3IuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdvdmVyTWFnbmV0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXJNYWduZXQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdsZWF2ZU1hZ25ldDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdsZWF2ZU1hZ25ldC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBub2RlTW91c2VPdmVyOiB0aGlzLm1vdXNlb3ZlclNlcnZpY2Uubm9kZU1vdXNlT3Zlci5iaW5kKHRoaXMubW91c2VvdmVyU2VydmljZSksXG4gICAgICBub2RlTW91c2VPdXQ6IHRoaXMubW91c2VvdmVyU2VydmljZS5ub2RlTW91c2VPdXQuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgY29ubmVjdG9yTW91c2VFbnRlcjogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmNvbm5lY3Rvck1vdXNlRW50ZXIuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgY29ubmVjdG9yTW91c2VMZWF2ZTogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmNvbm5lY3Rvck1vdXNlTGVhdmUuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgbm9kZUNsaWNrZWQ6IChldmVudCwgbm9kZSkgPT4ge1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5oYW5kbGVDbGlja2VkKG5vZGUsIGV2ZW50LmN0cmxLZXkpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuYWRqdXN0Q2FudmFzU2l6ZSh0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIGNvbnN0IG5vZGVzQ2hhbmdlID0gdGhpcy5ub2Rlc0RpZmZlci5kaWZmKHRoaXMubW9kZWwubm9kZXMpO1xuICAgICAgY29uc3QgZWRnZXNDaGFuZ2UgPSB0aGlzLmVkZ2VzRGlmZmVyLmRpZmYodGhpcy5tb2RlbC5lZGdlcyk7XG4gICAgICBsZXQgbm9kZXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICBsZXQgZWRnZXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICBpZiAobm9kZXNDaGFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgbm9kZXNDaGFuZ2UuZm9yRWFjaEFkZGVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgbm9kZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5vZGVzQ2hhbmdlLmZvckVhY2hSZW1vdmVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgbm9kZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZWRnZXNDaGFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgZWRnZXNDaGFuZ2UuZm9yRWFjaEFkZGVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgZWRnZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVkZ2VzQ2hhbmdlLmZvckVhY2hSZW1vdmVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgZWRnZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZXNDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0Q2FudmFzU2l6ZSh0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZXNDaGFuZ2VkIHx8IGVkZ2VzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0Lm5leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRFZGdlREF0dHJpYnV0ZShlZGdlOiBGY0VkZ2UpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5zb3VyY2VDb29yZChlZGdlKSxcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlc3RDb29yZChlZGdlKSwgdGhpcy5lZGdlU3R5bGUpO1xuICB9XG5cbiAgcHVibGljIGFkanVzdENhbnZhc1NpemUoZml0PzogYm9vbGVhbikge1xuICAgIGxldCBtYXhYID0gMDtcbiAgICBsZXQgbWF4WSA9IDA7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMubW9kZWwubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbWF4WCA9IE1hdGgubWF4KG5vZGUueCArIHRoaXMubm9kZVdpZHRoLCBtYXhYKTtcbiAgICAgIG1heFkgPSBNYXRoLm1heChub2RlLnkgKyB0aGlzLm5vZGVIZWlnaHQsIG1heFkpO1xuICAgIH0pO1xuICAgIGxldCB3aWR0aDtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGlmIChmaXQpIHtcbiAgICAgIHdpZHRoID0gbWF4WDtcbiAgICAgIGhlaWdodCA9IG1heFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoID0gTWF0aC5tYXgobWF4WCwgZWxlbWVudC5wcm9wKCdvZmZzZXRXaWR0aCcpKTtcbiAgICAgIGhlaWdodCA9IE1hdGgubWF4KG1heFksIGVsZW1lbnQucHJvcCgnb2Zmc2V0SGVpZ2h0JykpO1xuICAgIH1cbiAgICBlbGVtZW50LmNzcygnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICAgIGVsZW1lbnQuY3NzKCdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgfVxuXG4gIGNhbnZhc0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7fVxuXG4gIGVkZ2VNb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZWRnZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5oYW5kbGVFZGdlTW91c2VDbGljayhlZGdlLCBldmVudC5jdHJsS2V5KTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZWRnZVJlbW92ZShldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZWRnZUVkaXQoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VFZGl0KSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZUVkaXQoZXZlbnQsIGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGVkZ2VEb3VibGVDbGljayhldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRG91YmxlQ2xpY2spIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRG91YmxlQ2xpY2soZXZlbnQsIGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGVkZ2VNb3VzZU92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZU1vdXNlT3Zlcikge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VNb3VzZU92ZXIoZXZlbnQsIGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGVkZ2VNb3VzZUVudGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuZWRnZU1vdXNlRW50ZXIoZXZlbnQsIGVkZ2UpO1xuICB9XG5cbiAgZWRnZU1vdXNlTGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIHRoaXMubW91c2VvdmVyU2VydmljZS5lZGdlTW91c2VMZWF2ZShldmVudCwgZWRnZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXIoZXZlbnQpO1xuICAgIHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnb3ZlcihldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyb3AoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNlZG93bihldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBtb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UubW91c2Vtb3ZlKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxuICBtb3VzZXVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNldXAoZXZlbnQpO1xuICB9XG5cbn1cbiJdfQ==