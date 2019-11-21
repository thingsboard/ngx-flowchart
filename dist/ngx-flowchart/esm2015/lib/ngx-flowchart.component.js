/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, IterableDiffers, NgZone, Output } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import { FcModelValidationService } from './modelvalidation.service';
import { FcNodeDraggingService } from './node-dragging.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcEdgeDraggingService } from './edge-dragging.service';
import { FcMouseOverService } from './mouseover.service';
import { FcRectangleSelectService } from './rectangleselect.service';
export class NgxFlowchartComponent {
    /**
     * @param {?} elementRef
     * @param {?} differs
     * @param {?} modelValidation
     * @param {?} edgeDrawingService
     * @param {?} cd
     * @param {?} zone
     */
    constructor(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.modelChanged = new EventEmitter();
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => {
            return item;
        }));
        this.edgesDiffer = this.differs.find([]).create((/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => {
            return item;
        }));
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
    }
    /**
     * @return {?}
     */
    get canvasClass() {
        return FlowchartConstants.canvasClass;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.dropTargetId && this.edgeStyle !== FlowchartConstants.curvedStyle && this.edgeStyle !== FlowchartConstants.lineStyle) {
            throw new Error('edgeStyle not supported.');
        }
        this.nodeHeight = this.nodeHeight || 200;
        this.nodeWidth = this.nodeWidth || 200;
        this.dragAnimation = this.dragAnimation || FlowchartConstants.dragAnimationRepaint;
        this.userCallbacks = this.userCallbacks || {};
        this.automaticResize = this.automaticResize || false;
        for (const key of Object.keys(this.userCallbacks)) {
            /** @type {?} */
            const callback = this.userCallbacks[key];
            if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                throw new Error('All callbacks should be functions.');
            }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.cd, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
        /** @type {?} */
        const applyFunction = this.zone.run.bind(this.zone);
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
            (event, node) => {
                this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            })
        };
        this.adjustCanvasSize(true);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.model) {
            /** @type {?} */
            const nodesChange = this.nodesDiffer.diff(this.model.nodes);
            /** @type {?} */
            const edgesChange = this.edgesDiffer.diff(this.model.edges);
            /** @type {?} */
            let nodesChanged = false;
            /** @type {?} */
            let edgesChanged = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                () => {
                    nodesChanged = true;
                }));
                nodesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                () => {
                    nodesChanged = true;
                }));
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem((/**
                 * @return {?}
                 */
                () => {
                    edgesChanged = true;
                }));
                edgesChange.forEachRemovedItem((/**
                 * @return {?}
                 */
                () => {
                    edgesChanged = true;
                }));
            }
            if (nodesChanged) {
                this.adjustCanvasSize(true);
            }
            if (nodesChanged || edgesChanged) {
                this.cd.detectChanges();
            }
        }
    }
    /**
     * @param {?} edge
     * @return {?}
     */
    getEdgeDAttribute(edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    }
    /**
     * @param {?=} fit
     * @return {?}
     */
    adjustCanvasSize(fit) {
        /** @type {?} */
        let maxX = 0;
        /** @type {?} */
        let maxY = 0;
        /** @type {?} */
        const element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            maxX = Math.max(node.x + this.nodeWidth, maxX);
            maxY = Math.max(node.y + this.nodeHeight, maxY);
        }));
        /** @type {?} */
        let width;
        /** @type {?} */
        let height;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    canvasClick(event) { }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseDown(event, edge) {
        event.stopPropagation();
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeClick(event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeRemove(event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeEdit(event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeDoubleClick(event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseOver(event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseEnter(event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseLeave(event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        this.rectangleSelectService.mousedown(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousemove(event) {
        this.rectangleSelectService.mousemove(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseup(event) {
        this.rectangleSelectService.mouseup(event);
    }
}
NgxFlowchartComponent.decorators = [
    { type: Component, args: [{
                selector: 'fc-canvas',
                template: "<div (click)=\"canvasClick($event)\" class=\"fc-canvas-container\">\n  <svg class=\"fc-canvas-svg\">\n    <defs>\n      <marker class=\"fc-arrow-marker\" [attr.id]=\"arrowDefId\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"gray\" fill=\"gray\" stroke-width=\"1px\"/>\n      </marker>\n      <marker class=\"fc-arrow-marker-selected\" [attr.id]=\"arrowDefIdSelected\" markerWidth=\"5\" markerHeight=\"5\" viewBox=\"-6 -6 12 12\" refX=\"10\" refY=\"0\" markerUnits=\"strokeWidth\" orient=\"auto\">\n        <polygon points=\"-2,0 -5,5 5,0 -5,-5\" stroke=\"red\" fill=\"red\" stroke-width=\"1px\"/>\n      </marker>\n    </defs>\n    <g *ngFor=\"let edge of model.edges; let $index = index\">\n      <path\n        [attr.id]=\"'fc-edge-path-'+$index\"\n        (mousedown)=\"edgeMouseDown($event, edge)\"\n        (click)=\"edgeClick($event, edge)\"\n        (dblclick)=\"edgeDoubleClick($event, edge)\"\n        (mouseover)=\"edgeMouseOver($event, edge)\"\n        (mouseenter)=\"edgeMouseEnter($event, edge)\"\n        (mouseleave)=\"edgeMouseLeave($event, edge)\"\n        [attr.class]=\"(modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeClass ||\n                      flowchartConstants.edgeClass\"\n        [attr.d]=\"getEdgeDAttribute(edge)\"\n        [attr.marker-end]=\"'url(#' + (modelService.edges.isSelected(edge) ? arrowDefIdSelected : arrowDefId) + ')'\">\n      </path>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\">\n      <path [attr.class]=\"flowchartConstants.edgeClass + ' ' + flowchartConstants.draggingClass\"\n            [attr.d]=\"edgeDrawingService.getEdgeDAttribute(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2, edgeStyle)\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"\n              [attr.cx]=\"edgeDraggingService.edgeDragging.dragPoint2.x\"\n              [attr.cy]=\"edgeDraggingService.edgeDragging.dragPoint2.y\">\n      </circle>\n    </g>\n    <g *ngIf=\"dragAnimation === flowchartConstants.dragAnimationShadow\"\n       class=\"shadow-svg-class {{ flowchartConstants.edgeClass }} {{ flowchartConstants.draggingClass }}\"\n       style=\"display:none\">\n      <path d=\"\"></path>\n      <circle class=\"edge-endpoint\" r=\"4\"></circle>\n    </g>\n  </svg>\n  <ng-container *ngFor=\"let node of model.nodes\">\n    <fc-node\n         [selected]=\"modelService.nodes.isSelected(node)\"\n         [edit]=\"modelService.nodes.isEdit(node)\"\n         [underMouse]=\"node === mouseoverService.mouseoverscope.node\"\n         [node]=\"node\"\n         [mouseOverConnector]=\"mouseoverService.mouseoverscope.connector\"\n         [modelservice]=\"modelService\"\n         [dragging]=\"nodeDraggingService.isDraggingNode(node)\"\n         [callbacks]=\"callbacks\"\n         [userNodeCallbacks]=\"userNodeCallbacks\">\n    </fc-node>\n  </ng-container>\n  <div *ngIf=\"dragAnimation === flowchartConstants.dragAnimationRepaint && edgeDraggingService.edgeDragging.isDragging\"\n       [attr.class]=\"'fc-noselect ' + flowchartConstants.edgeLabelClass\"\n       [ngStyle]=\"{\n          top: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).y)+'px',\n          left: (edgeDrawingService.getEdgeCenter(edgeDraggingService.edgeDragging.dragPoint1, edgeDraggingService.edgeDragging.dragPoint2).x)+'px'\n       }\">\n    <div class=\"fc-edge-label-text\">\n      <span [attr.id]=\"'fc-edge-label-dragging'\" *ngIf=\"edgeDraggingService.edgeDragging.dragLabel\">{{edgeDraggingService.edgeDragging.dragLabel}}</span>\n    </div>\n  </div>\n  <div\n    (mousedown)=\"edgeMouseDown($event, edge)\"\n    (click)=\"edgeClick($event, edge)\"\n    (dblclick)=\"edgeDoubleClick($event, edge)\"\n    (mouseover)=\"edgeMouseOver($event, edge)\"\n    (mouseenter)=\"edgeMouseEnter($event, edge)\"\n    (mouseleave)=\"edgeMouseLeave($event, edge)\"\n    [attr.class]=\"'fc-noselect ' + ((modelService.edges.isEdit(edge) && flowchartConstants.editClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      (modelService.edges.isSelected(edge) && flowchartConstants.selectedClass + ' ' + flowchartConstants.edgeLabelClass) ||\n                      edge === mouseoverService.mouseoverscope.edge && flowchartConstants.hoverClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      edge.active && flowchartConstants.activeClass + ' ' + flowchartConstants.edgeLabelClass ||\n                      flowchartConstants.edgeLabelClass)\"\n    [ngStyle]=\"{\n      top: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).y)+'px',\n      left: (edgeDrawingService.getEdgeCenter(modelService.edges.sourceCoord(edge), modelService.edges.destCoord(edge)).x)+'px'\n    }\"\n    *ngFor=\"let edge of model.edges; let $index = index\">\n    <div class=\"fc-edge-label-text\">\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodeedit\" (click)=\"edgeEdit($event, edge)\">\n        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </div>\n      <div *ngIf=\"modelService.isEditable()\" class=\"fc-noselect fc-nodedelete\" (click)=\"edgeRemove($event, edge)\">\n        &times;\n      </div>\n      <span [attr.id]=\"'fc-edge-label-'+$index\" *ngIf=\"edge.label\">{{edge.label}}</span>\n    </div>\n  </div>\n  <div id=\"select-rectangle\" class=\"fc-select-rectangle\" hidden>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-canvas-container{display:block;position:relative;width:100%;height:100%}:host .fc-canvas-container svg.fc-canvas-svg{display:block;position:relative;width:100%;height:100%}:host .fc-edge{stroke:gray;stroke-width:4;transition:stroke-width .2s;fill:transparent}:host .fc-edge.fc-hover{stroke:gray;stroke-width:6;fill:transparent}:host .fc-edge.fc-selected{stroke:red;stroke-width:4;fill:transparent}:host .fc-edge.fc-active{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}:host .fc-edge.fc-dragging{pointer-events:none}:host .fc-arrow-marker polygon{stroke:gray;fill:gray}:host .fc-arrow-marker-selected polygon{stroke:red;fill:red}:host .edge-endpoint{fill:gray}:host .fc-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .fc-edge-label{position:absolute;opacity:.8;transition:transform .2s;transform-origin:bottom left;margin:0 auto}:host .fc-edge-label .fc-edge-label-text{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}:host .fc-edge-label .fc-edge-label-text span{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}:host .fc-edge-label .fc-nodeedit{top:-30px;right:14px}:host .fc-edge-label .fc-nodedelete{top:-30px;right:-13px}:host .fc-edge-label.fc-hover{transform:scale(1.25)}:host .fc-edge-label.fc-edit .fc-edge-label-text span,:host .fc-edge-label.fc-selected .fc-edge-label-text span{border:solid red;color:#fff;font-weight:600;background-color:red}:host .fc-select-rectangle{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}:host ::ng-deep .fc-nodeedit{display:none;font-size:15px}:host ::ng-deep .fc-nodedelete{display:none;font-size:18px}:host ::ng-deep .fc-edit .fc-nodedelete,:host ::ng-deep .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}:host ::ng-deep .fc-edit .fc-nodeedit{top:-24px;right:16px}:host ::ng-deep .fc-edit .fc-nodedelete{top:-24px;right:-13px}"]
            }] }
];
/** @nocollapse */
NgxFlowchartComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: IterableDiffers },
    { type: FcModelValidationService },
    { type: FcEdgeDrawingService },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
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
    dragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    mousemove: [{ type: HostListener, args: ['mousemove', ['$event'],] }],
    mouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFFVCxVQUFVLEVBQUUsWUFBWSxFQUN4QixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxlQUFlLEVBQ2YsTUFBTSxFQUNFLE1BQU0sRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdDLGtCQUFrQixFQUFvQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BJLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVFyRSxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7Ozs7SUE0RGhDLFlBQW9CLFVBQW1DLEVBQ25DLE9BQXdCLEVBQ3hCLGVBQXlDLEVBQzFDLGtCQUF3QyxFQUN2QyxFQUFxQixFQUNyQixJQUFZO1FBTFosZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQzFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBc0I7UUFDdkMsT0FBRSxHQUFG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cUM7O0lBRXJDLDZDQUE2Qjs7SUFDN0Isb0RBQTJDOztJQUMzQyxvREFBMkM7O0lBQzNDLGlEQUFxQzs7SUFDckMsdURBQWlEOztJQUVqRCwyQ0FBbUI7O0lBQ25CLG1EQUEyQjs7SUFFM0IsbURBQXdDOzs7OztJQUV4Qyw0Q0FFRzs7Ozs7SUFFSCw0Q0FFRzs7Ozs7SUFFUywyQ0FBMkM7Ozs7O0lBQzNDLHdDQUFnQzs7Ozs7SUFDaEMsZ0RBQWlEOztJQUNqRCxtREFBK0M7Ozs7O0lBQy9DLG1DQUE2Qjs7Ozs7SUFDN0IscUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE5nWm9uZSxcbiAgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNFZGdlLCBGY01vZGVsLCBGY05vZGUsIEZsb3djaGFydENvbnN0YW50cywgVXNlckNhbGxiYWNrcywgVXNlck5vZGVDYWxsYmFja3MgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9ub2RlLWRyYWdnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNFZGdlRHJhd2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYWdnaW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmFnZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTW91c2VPdmVyU2VydmljZSB9IGZyb20gJy4vbW91c2VvdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlIH0gZnJvbSAnLi9yZWN0YW5nbGVzZWxlY3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLWNhbnZhcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGbG93Y2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5jbGFzcycpXG4gIGdldCBjYW52YXNDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzQ2xhc3M7XG4gIH1cblxuICBASW5wdXQoKVxuICBtb2RlbDogRmNNb2RlbDtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZE9iamVjdHM6IGFueVtdO1xuXG4gIEBJbnB1dCgpXG4gIGVkZ2VTdHlsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJDYWxsYmFja3M6IFVzZXJDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgYXV0b21hdGljUmVzaXplOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdBbmltYXRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBub2RlV2lkdGg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBub2RlSGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIG1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBub2RlRHJhZ2dpbmdTZXJ2aWNlOiBGY05vZGVEcmFnZ2luZ1NlcnZpY2U7XG4gIGVkZ2VEcmFnZ2luZ1NlcnZpY2U6IEZjRWRnZURyYWdnaW5nU2VydmljZTtcbiAgbW91c2VvdmVyU2VydmljZTogRmNNb3VzZU92ZXJTZXJ2aWNlO1xuICByZWN0YW5nbGVTZWxlY3RTZXJ2aWNlOiBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2U7XG5cbiAgYXJyb3dEZWZJZDogc3RyaW5nO1xuICBhcnJvd0RlZklkU2VsZWN0ZWQ6IHN0cmluZztcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgcHJpdmF0ZSBub2Rlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8RmNOb2RlPiA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8RmNOb2RlPigoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG5cbiAgcHJpdmF0ZSBlZGdlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8RmNFZGdlPiA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8RmNFZGdlPigoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgbW9kZWxWYWxpZGF0aW9uOiBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyBlZGdlRHJhd2luZ1NlcnZpY2U6IEZjRWRnZURyYXdpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmFycm93RGVmSWQgPSAnYXJyb3ctJyArIE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy5hcnJvd0RlZklkU2VsZWN0ZWQgPSB0aGlzLmFycm93RGVmSWQgKyAnLXNlbGVjdGVkJztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kcm9wVGFyZ2V0SWQgJiYgdGhpcy5lZGdlU3R5bGUgIT09IEZsb3djaGFydENvbnN0YW50cy5jdXJ2ZWRTdHlsZSAmJiB0aGlzLmVkZ2VTdHlsZSAhPT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxpbmVTdHlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlZGdlU3R5bGUgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgdGhpcy5ub2RlSGVpZ2h0ID0gdGhpcy5ub2RlSGVpZ2h0IHx8IDIwMDtcbiAgICB0aGlzLm5vZGVXaWR0aCA9IHRoaXMubm9kZVdpZHRoIHx8IDIwMDtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSB0aGlzLmRyYWdBbmltYXRpb24gfHwgRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50O1xuICAgIHRoaXMudXNlckNhbGxiYWNrcyA9IHRoaXMudXNlckNhbGxiYWNrcyB8fCB7fTtcbiAgICB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSA9IHRoaXMuYXV0b21hdGljUmVzaXplIHx8IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy51c2VyQ2FsbGJhY2tzKSkge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnVzZXJDYWxsYmFja3Nba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicgJiYga2V5ICE9PSAnbm9kZUNhbGxiYWNrcycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgY2FsbGJhY2tzIHNob3VsZCBiZSBmdW5jdGlvbnMuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcyA9IHRoaXMudXNlckNhbGxiYWNrcy5ub2RlQ2FsbGJhY2tzO1xuXG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBuZXcgRmNNb2RlbFNlcnZpY2UodGhpcy5tb2RlbFZhbGlkYXRpb24sIHRoaXMubW9kZWwsIHRoaXMubW9kZWxDaGFuZ2VkLCB0aGlzLmNkLCB0aGlzLnNlbGVjdGVkT2JqZWN0cyxcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5kcm9wTm9kZSwgdGhpcy51c2VyQ2FsbGJhY2tzLmNyZWF0ZUVkZ2UsIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlQWRkZWQsIHRoaXMudXNlckNhbGxiYWNrcy5ub2RlUmVtb3ZlZCxcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlUmVtb3ZlZCwgZWxlbWVudFswXSwgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdzdmcnKSk7XG5cbiAgICBpZiAodGhpcy5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BUYXJnZXRJZCA9IHRoaXMuZHJvcFRhcmdldElkO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5RnVuY3Rpb24gPSB0aGlzLnpvbmUucnVuLmJpbmQodGhpcy56b25lKTtcblxuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZSA9IG5ldyBGY05vZGVEcmFnZ2luZ1NlcnZpY2UodGhpcy5tb2RlbFNlcnZpY2UsIGFwcGx5RnVuY3Rpb24sXG4gICAgICAgICAgdGhpcy5hdXRvbWF0aWNSZXNpemUsIHRoaXMuZHJhZ0FuaW1hdGlvbik7XG5cbiAgICB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlKHRoaXMubW9kZWxWYWxpZGF0aW9uLCB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZSwgdGhpcy5tb2RlbFNlcnZpY2UsXG4gICAgICB0aGlzLm1vZGVsLCB0aGlzLnVzZXJDYWxsYmFja3MuaXNWYWxpZEVkZ2UgfHwgbnVsbCwgYXBwbHlGdW5jdGlvbixcbiAgICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiwgdGhpcy5lZGdlU3R5bGUpO1xuXG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlID0gbmV3IEZjTW91c2VPdmVyU2VydmljZShhcHBseUZ1bmN0aW9uKTtcblxuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZSA9IG5ldyBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2UodGhpcy5tb2RlbFNlcnZpY2UsXG4gICAgICBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3QtcmVjdGFuZ2xlJyksIGFwcGx5RnVuY3Rpb24pO1xuXG4gICAgdGhpcy5jYWxsYmFja3MgPSB7XG4gICAgICBub2RlRHJhZ3N0YXJ0OiB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ3N0YXJ0LmJpbmQodGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIG5vZGVEcmFnZW5kOiB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ2VuZC5iaW5kKHRoaXMubm9kZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ3N0YXJ0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ3N0YXJ0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnZW5kOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ2VuZC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJvcDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyb3AuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdvdmVyQ29ubmVjdG9yOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXJDb25uZWN0b3IuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdvdmVyTWFnbmV0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXJNYWduZXQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdsZWF2ZU1hZ25ldDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdsZWF2ZU1hZ25ldC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBub2RlTW91c2VPdmVyOiB0aGlzLm1vdXNlb3ZlclNlcnZpY2Uubm9kZU1vdXNlT3Zlci5iaW5kKHRoaXMubW91c2VvdmVyU2VydmljZSksXG4gICAgICBub2RlTW91c2VPdXQ6IHRoaXMubW91c2VvdmVyU2VydmljZS5ub2RlTW91c2VPdXQuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgY29ubmVjdG9yTW91c2VFbnRlcjogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmNvbm5lY3Rvck1vdXNlRW50ZXIuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgY29ubmVjdG9yTW91c2VMZWF2ZTogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmNvbm5lY3Rvck1vdXNlTGVhdmUuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgbm9kZUNsaWNrZWQ6IChldmVudCwgbm9kZSkgPT4ge1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5oYW5kbGVDbGlja2VkKG5vZGUsIGV2ZW50LmN0cmxLZXkpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuYWRqdXN0Q2FudmFzU2l6ZSh0cnVlKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgY29uc3Qgbm9kZXNDaGFuZ2UgPSB0aGlzLm5vZGVzRGlmZmVyLmRpZmYodGhpcy5tb2RlbC5ub2Rlcyk7XG4gICAgICBjb25zdCBlZGdlc0NoYW5nZSA9IHRoaXMuZWRnZXNEaWZmZXIuZGlmZih0aGlzLm1vZGVsLmVkZ2VzKTtcbiAgICAgIGxldCBub2Rlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgIGxldCBlZGdlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgIGlmIChub2Rlc0NoYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICBub2Rlc0NoYW5nZS5mb3JFYWNoQWRkZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBub2Rlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgbm9kZXNDaGFuZ2UuZm9yRWFjaFJlbW92ZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBub2Rlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChlZGdlc0NoYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICBlZGdlc0NoYW5nZS5mb3JFYWNoQWRkZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBlZGdlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgZWRnZXNDaGFuZ2UuZm9yRWFjaFJlbW92ZWRJdGVtKCgpID0+IHtcbiAgICAgICAgICBlZGdlc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChub2Rlc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RDYW52YXNTaXplKHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCB8fCBlZGdlc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RWRnZURBdHRyaWJ1dGUoZWRnZTogRmNFZGdlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc291cmNlQ29vcmQoZWRnZSksXG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZXN0Q29vcmQoZWRnZSksIHRoaXMuZWRnZVN0eWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGp1c3RDYW52YXNTaXplKGZpdD86IGJvb2xlYW4pIHtcbiAgICBsZXQgbWF4WCA9IDA7XG4gICAgbGV0IG1heFkgPSAwO1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG1heFggPSBNYXRoLm1heChub2RlLnggKyB0aGlzLm5vZGVXaWR0aCwgbWF4WCk7XG4gICAgICBtYXhZID0gTWF0aC5tYXgobm9kZS55ICsgdGhpcy5ub2RlSGVpZ2h0LCBtYXhZKTtcbiAgICB9KTtcbiAgICBsZXQgd2lkdGg7XG4gICAgbGV0IGhlaWdodDtcbiAgICBpZiAoZml0KSB7XG4gICAgICB3aWR0aCA9IG1heFg7XG4gICAgICBoZWlnaHQgPSBtYXhZO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IE1hdGgubWF4KG1heFgsIGVsZW1lbnQucHJvcCgnb2Zmc2V0V2lkdGgnKSk7XG4gICAgICBoZWlnaHQgPSBNYXRoLm1heChtYXhZLCBlbGVtZW50LnByb3AoJ29mZnNldEhlaWdodCcpKTtcbiAgICB9XG4gICAgZWxlbWVudC5jc3MoJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgICBlbGVtZW50LmNzcygnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICBjYW52YXNDbGljayhldmVudDogTW91c2VFdmVudCkge31cblxuICBlZGdlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGVkZ2VDbGljayhldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZSwgZXZlbnQuY3RybEtleSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VSZW1vdmUoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VFZGl0KGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRWRpdCkge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VFZGl0KGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlTW91c2VPdmVyKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmVkZ2VNb3VzZUVudGVyKGV2ZW50LCBlZGdlKTtcbiAgfVxuXG4gIGVkZ2VNb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuZWRnZU1vdXNlTGVhdmUoZXZlbnQsIGVkZ2UpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyKGV2ZW50KTtcbiAgICB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXIoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZS5kcm9wKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZWRvd24oZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgbW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNlbW92ZShldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcbiAgbW91c2V1cChldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZXVwKGV2ZW50KTtcbiAgfVxuXG59XG4iXX0=