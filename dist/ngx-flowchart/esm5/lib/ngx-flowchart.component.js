import { __values } from "tslib";
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
import * as i0 from "@angular/core";
import * as i1 from "./modelvalidation.service";
import * as i2 from "./edge-drawing.service";
import * as i3 from "@angular/common";
import * as i4 from "./node.component";
function NgxFlowchartComponent__svg_g_7_Template(rf, ctx) { if (rf & 1) {
    var _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g");
    i0.ɵɵelementStart(1, "path", 12);
    i0.ɵɵlistener("mousedown", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mousedown_1_listener($event) { i0.ɵɵrestoreView(_r59); var edge_r56 = ctx.$implicit; var ctx_r58 = i0.ɵɵnextContext(); return ctx_r58.edgeMouseDown($event, edge_r56); })("click", function NgxFlowchartComponent__svg_g_7_Template__svg_path_click_1_listener($event) { i0.ɵɵrestoreView(_r59); var edge_r56 = ctx.$implicit; var ctx_r60 = i0.ɵɵnextContext(); return ctx_r60.edgeClick($event, edge_r56); })("dblclick", function NgxFlowchartComponent__svg_g_7_Template__svg_path_dblclick_1_listener($event) { i0.ɵɵrestoreView(_r59); var edge_r56 = ctx.$implicit; var ctx_r61 = i0.ɵɵnextContext(); return ctx_r61.edgeDoubleClick($event, edge_r56); })("mouseover", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseover_1_listener($event) { i0.ɵɵrestoreView(_r59); var edge_r56 = ctx.$implicit; var ctx_r62 = i0.ɵɵnextContext(); return ctx_r62.edgeMouseOver($event, edge_r56); })("mouseenter", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseenter_1_listener($event) { i0.ɵɵrestoreView(_r59); var edge_r56 = ctx.$implicit; var ctx_r63 = i0.ɵɵnextContext(); return ctx_r63.edgeMouseEnter($event, edge_r56); })("mouseleave", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseleave_1_listener($event) { i0.ɵɵrestoreView(_r59); var edge_r56 = ctx.$implicit; var ctx_r64 = i0.ɵɵnextContext(); return ctx_r64.edgeMouseLeave($event, edge_r56); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var edge_r56 = ctx.$implicit;
    var $index_r57 = ctx.index;
    var ctx_r50 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("id", "fc-edge-path-" + $index_r57)("class", ctx_r50.modelService.edges.isSelected(edge_r56) && ctx_r50.flowchartConstants.selectedClass + " " + ctx_r50.flowchartConstants.edgeClass || edge_r56 === ctx_r50.mouseoverService.mouseoverscope.edge && ctx_r50.flowchartConstants.hoverClass + " " + ctx_r50.flowchartConstants.edgeClass || edge_r56.active && ctx_r50.flowchartConstants.activeClass + " " + ctx_r50.flowchartConstants.edgeClass || ctx_r50.flowchartConstants.edgeClass)("d", ctx_r50.getEdgeDAttribute(edge_r56))("marker-end", "url(#" + (ctx_r50.modelService.edges.isSelected(edge_r56) ? ctx_r50.arrowDefIdSelected : ctx_r50.arrowDefId) + ")");
} }
function NgxFlowchartComponent__svg_g_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g");
    i0.ɵɵelement(1, "path");
    i0.ɵɵelement(2, "circle", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r51 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("class", ctx_r51.flowchartConstants.edgeClass + " " + ctx_r51.flowchartConstants.draggingClass)("d", ctx_r51.edgeDrawingService.getEdgeDAttribute(ctx_r51.edgeDraggingService.edgeDragging.dragPoint1, ctx_r51.edgeDraggingService.edgeDragging.dragPoint2, ctx_r51.edgeStyle));
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("cx", ctx_r51.edgeDraggingService.edgeDragging.dragPoint2.x)("cy", ctx_r51.edgeDraggingService.edgeDragging.dragPoint2.y);
} }
function NgxFlowchartComponent__svg_g_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 14);
    i0.ɵɵelement(1, "path", 15);
    i0.ɵɵelement(2, "circle", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r52 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate2("shadow-svg-class ", ctx_r52.flowchartConstants.edgeClass, " ", ctx_r52.flowchartConstants.draggingClass, "");
} }
function NgxFlowchartComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "fc-node", 16);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    var node_r65 = ctx.$implicit;
    var ctx_r53 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("selected", ctx_r53.modelService.nodes.isSelected(node_r65))("edit", ctx_r53.modelService.nodes.isEdit(node_r65))("underMouse", node_r65 === ctx_r53.mouseoverService.mouseoverscope.node)("node", node_r65)("mouseOverConnector", ctx_r53.mouseoverService.mouseoverscope.connector)("modelservice", ctx_r53.modelService)("dragging", ctx_r53.nodeDraggingService.isDraggingNode(node_r65))("callbacks", ctx_r53.callbacks)("userNodeCallbacks", ctx_r53.userNodeCallbacks);
} }
function NgxFlowchartComponent_div_11_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r66 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("id", "fc-edge-label-dragging");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r66.edgeDraggingService.edgeDragging.dragLabel);
} }
var _c0 = function (a0, a1) { return { top: a0, left: a1 }; };
function NgxFlowchartComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵtemplate(2, NgxFlowchartComponent_div_11_span_2_Template, 2, 2, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r54 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(3, _c0, ctx_r54.edgeDrawingService.getEdgeCenter(ctx_r54.edgeDraggingService.edgeDragging.dragPoint1, ctx_r54.edgeDraggingService.edgeDragging.dragPoint2).y + "px", ctx_r54.edgeDrawingService.getEdgeCenter(ctx_r54.edgeDraggingService.edgeDragging.dragPoint1, ctx_r54.edgeDraggingService.edgeDragging.dragPoint2).x + "px"));
    i0.ɵɵattribute("class", "fc-noselect " + ctx_r54.flowchartConstants.edgeLabelClass);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r54.edgeDraggingService.edgeDragging.dragLabel);
} }
function NgxFlowchartComponent_div_12_div_2_Template(rf, ctx) { if (rf & 1) {
    var _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵlistener("click", function NgxFlowchartComponent_div_12_div_2_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r73); var edge_r67 = i0.ɵɵnextContext().$implicit; var ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.edgeEdit($event, edge_r67); });
    i0.ɵɵelement(1, "i", 23);
    i0.ɵɵelementEnd();
} }
function NgxFlowchartComponent_div_12_div_3_Template(rf, ctx) { if (rf & 1) {
    var _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵlistener("click", function NgxFlowchartComponent_div_12_div_3_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r76); var edge_r67 = i0.ɵɵnextContext().$implicit; var ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.edgeRemove($event, edge_r67); });
    i0.ɵɵtext(1, " \u00D7 ");
    i0.ɵɵelementEnd();
} }
function NgxFlowchartComponent_div_12_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r78 = i0.ɵɵnextContext();
    var $index_r68 = ctx_r78.index;
    var edge_r67 = ctx_r78.$implicit;
    i0.ɵɵattribute("id", "fc-edge-label-" + $index_r68);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(edge_r67.label);
} }
function NgxFlowchartComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    var _r80 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵlistener("mousedown", function NgxFlowchartComponent_div_12_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r80); var edge_r67 = ctx.$implicit; var ctx_r79 = i0.ɵɵnextContext(); return ctx_r79.edgeMouseDown($event, edge_r67); })("click", function NgxFlowchartComponent_div_12_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r80); var edge_r67 = ctx.$implicit; var ctx_r81 = i0.ɵɵnextContext(); return ctx_r81.edgeClick($event, edge_r67); })("dblclick", function NgxFlowchartComponent_div_12_Template_div_dblclick_0_listener($event) { i0.ɵɵrestoreView(_r80); var edge_r67 = ctx.$implicit; var ctx_r82 = i0.ɵɵnextContext(); return ctx_r82.edgeDoubleClick($event, edge_r67); })("mouseover", function NgxFlowchartComponent_div_12_Template_div_mouseover_0_listener($event) { i0.ɵɵrestoreView(_r80); var edge_r67 = ctx.$implicit; var ctx_r83 = i0.ɵɵnextContext(); return ctx_r83.edgeMouseOver($event, edge_r67); })("mouseenter", function NgxFlowchartComponent_div_12_Template_div_mouseenter_0_listener($event) { i0.ɵɵrestoreView(_r80); var edge_r67 = ctx.$implicit; var ctx_r84 = i0.ɵɵnextContext(); return ctx_r84.edgeMouseEnter($event, edge_r67); })("mouseleave", function NgxFlowchartComponent_div_12_Template_div_mouseleave_0_listener($event) { i0.ɵɵrestoreView(_r80); var edge_r67 = ctx.$implicit; var ctx_r85 = i0.ɵɵnextContext(); return ctx_r85.edgeMouseLeave($event, edge_r67); });
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵtemplate(2, NgxFlowchartComponent_div_12_div_2_Template, 2, 0, "div", 20);
    i0.ɵɵtemplate(3, NgxFlowchartComponent_div_12_div_3_Template, 2, 0, "div", 21);
    i0.ɵɵtemplate(4, NgxFlowchartComponent_div_12_span_4_Template, 2, 2, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var edge_r67 = ctx.$implicit;
    var ctx_r55 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(5, _c0, ctx_r55.edgeDrawingService.getEdgeCenter(ctx_r55.modelService.edges.sourceCoord(edge_r67), ctx_r55.modelService.edges.destCoord(edge_r67)).y + "px", ctx_r55.edgeDrawingService.getEdgeCenter(ctx_r55.modelService.edges.sourceCoord(edge_r67), ctx_r55.modelService.edges.destCoord(edge_r67)).x + "px"));
    i0.ɵɵattribute("class", "fc-noselect " + (ctx_r55.modelService.edges.isEdit(edge_r67) && ctx_r55.flowchartConstants.editClass + " " + ctx_r55.flowchartConstants.edgeLabelClass || ctx_r55.modelService.edges.isSelected(edge_r67) && ctx_r55.flowchartConstants.selectedClass + " " + ctx_r55.flowchartConstants.edgeLabelClass || edge_r67 === ctx_r55.mouseoverService.mouseoverscope.edge && ctx_r55.flowchartConstants.hoverClass + " " + ctx_r55.flowchartConstants.edgeLabelClass || edge_r67.active && ctx_r55.flowchartConstants.activeClass + " " + ctx_r55.flowchartConstants.edgeLabelClass || ctx_r55.flowchartConstants.edgeLabelClass));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r55.modelService.isEditable());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r55.modelService.isEditable());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", edge_r67.label);
} }
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
    NgxFlowchartComponent.ɵfac = function NgxFlowchartComponent_Factory(t) { return new (t || NgxFlowchartComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.IterableDiffers), i0.ɵɵdirectiveInject(i1.FcModelValidationService), i0.ɵɵdirectiveInject(i2.FcEdgeDrawingService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
    NgxFlowchartComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxFlowchartComponent, selectors: [["fc-canvas"]], hostVars: 1, hostBindings: function NgxFlowchartComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("dragover", function NgxFlowchartComponent_dragover_HostBindingHandler($event) { return ctx.dragover($event); })("drop", function NgxFlowchartComponent_drop_HostBindingHandler($event) { return ctx.drop($event); })("mousedown", function NgxFlowchartComponent_mousedown_HostBindingHandler($event) { return ctx.mousedown($event); })("mousemove", function NgxFlowchartComponent_mousemove_HostBindingHandler($event) { return ctx.mousemove($event); })("mouseup", function NgxFlowchartComponent_mouseup_HostBindingHandler($event) { return ctx.mouseup($event); });
        } if (rf & 2) {
            i0.ɵɵattribute("class", ctx.canvasClass);
        } }, inputs: { model: "model", selectedObjects: "selectedObjects", edgeStyle: "edgeStyle", userCallbacks: "userCallbacks", automaticResize: "automaticResize", dragAnimation: "dragAnimation", nodeWidth: "nodeWidth", nodeHeight: "nodeHeight", dropTargetId: "dropTargetId", fitModelSizeByDefault: "fitModelSizeByDefault" }, outputs: { modelChanged: "modelChanged" }, decls: 14, vars: 8, consts: [[1, "fc-canvas-container", 3, "click"], [1, "fc-canvas-svg"], ["markerWidth", "5", "markerHeight", "5", "viewBox", "-6 -6 12 12", "refX", "10", "refY", "0", "markerUnits", "strokeWidth", "orient", "auto", 1, "fc-arrow-marker"], ["points", "-2,0 -5,5 5,0 -5,-5", "stroke", "gray", "fill", "gray", "stroke-width", "1px"], ["markerWidth", "5", "markerHeight", "5", "viewBox", "-6 -6 12 12", "refX", "10", "refY", "0", "markerUnits", "strokeWidth", "orient", "auto", 1, "fc-arrow-marker-selected"], ["points", "-2,0 -5,5 5,0 -5,-5", "stroke", "red", "fill", "red", "stroke-width", "1px"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["style", "display:none", 3, "class", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngStyle", "mousedown", "click", "dblclick", "mouseover", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["id", "select-rectangle", "hidden", "", 1, "fc-select-rectangle"], [3, "mousedown", "click", "dblclick", "mouseover", "mouseenter", "mouseleave"], ["r", "4", 1, "edge-endpoint"], [2, "display", "none"], ["d", ""], [3, "selected", "edit", "underMouse", "node", "mouseOverConnector", "modelservice", "dragging", "callbacks", "userNodeCallbacks"], [3, "ngStyle"], [1, "fc-edge-label-text"], [3, "ngStyle", "mousedown", "click", "dblclick", "mouseover", "mouseenter", "mouseleave"], ["class", "fc-noselect fc-nodeedit", 3, "click", 4, "ngIf"], ["class", "fc-noselect fc-nodedelete", 3, "click", 4, "ngIf"], [1, "fc-noselect", "fc-nodeedit", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-pencil"], [1, "fc-noselect", "fc-nodedelete", 3, "click"]], template: function NgxFlowchartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("click", function NgxFlowchartComponent_Template_div_click_0_listener($event) { return ctx.canvasClick($event); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(1, "svg", 1);
            i0.ɵɵelementStart(2, "defs");
            i0.ɵɵelementStart(3, "marker", 2);
            i0.ɵɵelement(4, "polygon", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "marker", 4);
            i0.ɵɵelement(6, "polygon", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, NgxFlowchartComponent__svg_g_7_Template, 2, 4, "g", 6);
            i0.ɵɵtemplate(8, NgxFlowchartComponent__svg_g_8_Template, 3, 4, "g", 7);
            i0.ɵɵtemplate(9, NgxFlowchartComponent__svg_g_9_Template, 3, 4, "g", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, NgxFlowchartComponent_ng_container_10_Template, 2, 9, "ng-container", 6);
            i0.ɵɵtemplate(11, NgxFlowchartComponent_div_11_Template, 3, 6, "div", 9);
            i0.ɵɵtemplate(12, NgxFlowchartComponent_div_12_Template, 5, 8, "div", 10);
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(13, "div", 11);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("id", ctx.arrowDefId);
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("id", ctx.arrowDefIdSelected);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.model.edges);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dragAnimation === ctx.flowchartConstants.dragAnimationRepaint && ctx.edgeDraggingService.edgeDragging.isDragging);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dragAnimation === ctx.flowchartConstants.dragAnimationShadow);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.model.nodes);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dragAnimation === ctx.flowchartConstants.dragAnimationRepaint && ctx.edgeDraggingService.edgeDragging.isDragging);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.model.edges);
        } }, directives: [i3.NgForOf, i3.NgIf, i4.FcNodeContainerComponent, i3.NgStyle], styles: ["[_nghost-%COMP%]{display:block;position:relative;width:100%;height:100%;background-size:25px 25px;background-image:linear-gradient(to right,rgba(0,0,0,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.1) 1px,transparent 1px);background-color:transparent;min-width:100%;min-height:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[_nghost-%COMP%]   .fc-canvas-container[_ngcontent-%COMP%]{display:block;position:relative;width:100%;height:100%}[_nghost-%COMP%]   .fc-canvas-container[_ngcontent-%COMP%]   svg.fc-canvas-svg[_ngcontent-%COMP%]{display:block;position:relative;width:100%;height:100%}[_nghost-%COMP%]   .fc-edge[_ngcontent-%COMP%]{stroke:gray;stroke-width:4;-webkit-transition:stroke-width .2s;transition:stroke-width .2s;fill:transparent}[_nghost-%COMP%]   .fc-edge.fc-hover[_ngcontent-%COMP%]{stroke:gray;stroke-width:6;fill:transparent}[_nghost-%COMP%]   .fc-edge.fc-selected[_ngcontent-%COMP%]{stroke:red;stroke-width:4;fill:transparent}[_nghost-%COMP%]   .fc-edge.fc-active[_ngcontent-%COMP%]{-webkit-animation:3s linear infinite dash;animation:3s linear infinite dash;stroke-dasharray:20}[_nghost-%COMP%]   .fc-edge.fc-dragging[_ngcontent-%COMP%]{pointer-events:none}[_nghost-%COMP%]   .fc-arrow-marker[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{stroke:gray;fill:gray}[_nghost-%COMP%]   .fc-arrow-marker-selected[_ngcontent-%COMP%]   polygon[_ngcontent-%COMP%]{stroke:red;fill:red}[_nghost-%COMP%]   .edge-endpoint[_ngcontent-%COMP%]{fill:gray}[_nghost-%COMP%]   .fc-noselect[_ngcontent-%COMP%]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]{position:absolute;opacity:.8;-webkit-transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-transform-origin:bottom left;transform-origin:bottom left;margin:0 auto}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);white-space:nowrap;text-align:center;font-size:16px}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{cursor:default;border:solid #ff3d00;border-radius:10px;color:#ff3d00;background-color:#fff;padding:3px 5px}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-nodeedit[_ngcontent-%COMP%]{top:-30px;right:14px}[_nghost-%COMP%]   .fc-edge-label[_ngcontent-%COMP%]   .fc-nodedelete[_ngcontent-%COMP%]{top:-30px;right:-13px}[_nghost-%COMP%]   .fc-edge-label.fc-hover[_ngcontent-%COMP%]{-webkit-transform:scale(1.25);transform:scale(1.25)}[_nghost-%COMP%]   .fc-edge-label.fc-edit[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], [_nghost-%COMP%]   .fc-edge-label.fc-selected[_ngcontent-%COMP%]   .fc-edge-label-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{border:solid red;color:#fff;font-weight:600;background-color:red}[_nghost-%COMP%]   .fc-select-rectangle[_ngcontent-%COMP%]{border:2px dashed #5262ff;position:absolute;background:rgba(20,125,255,.1);z-index:2}@-webkit-keyframes dash{from{stroke-dashoffset:500}}@keyframes dash{from{stroke-dashoffset:500}}[_nghost-%COMP%]     .fc-nodeedit{display:none;font-size:15px}[_nghost-%COMP%]     .fc-nodedelete{display:none;font-size:18px}[_nghost-%COMP%]     .fc-edit .fc-nodedelete, [_nghost-%COMP%]     .fc-edit .fc-nodeedit{display:block;position:absolute;border:2px solid #eee;border-radius:50%;font-weight:600;line-height:20px;height:20px;padding-top:2px;width:22px;background:#494949;color:#fff;text-align:center;vertical-align:bottom;cursor:pointer}[_nghost-%COMP%]     .fc-edit .fc-nodeedit{top:-24px;right:16px}[_nghost-%COMP%]     .fc-edit .fc-nodedelete{top:-24px;right:-13px}"], changeDetection: 0 });
    return NgxFlowchartComponent;
}());
export { NgxFlowchartComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxFlowchartComponent, [{
        type: Component,
        args: [{
                selector: 'fc-canvas',
                templateUrl: './ngx-flowchart.component.html',
                styleUrls: ['./ngx-flowchart.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }, { type: i1.FcModelValidationService }, { type: i2.FcEdgeDrawingService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, { canvasClass: [{
            type: HostBinding,
            args: ['attr.class']
        }], model: [{
            type: Input
        }], selectedObjects: [{
            type: Input
        }], edgeStyle: [{
            type: Input
        }], userCallbacks: [{
            type: Input
        }], automaticResize: [{
            type: Input
        }], dragAnimation: [{
            type: Input
        }], nodeWidth: [{
            type: Input
        }], nodeHeight: [{
            type: Input
        }], dropTargetId: [{
            type: Input
        }], modelChanged: [{
            type: Output
        }], fitModelSizeByDefault: [{
            type: Input
        }], dragover: [{
            type: HostListener,
            args: ['dragover', ['$event']]
        }], drop: [{
            type: HostListener,
            args: ['drop', ['$event']]
        }], mousedown: [{
            type: HostListener,
            args: ['mousedown', ['$event']]
        }], mousemove: [{
            type: HostListener,
            args: ['mousemove', ['$event']]
        }], mouseup: [{
            type: HostListener,
            args: ['mouseup', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIiwibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxpQkFBaUIsRUFDMUMsU0FBUyxFQUVULFVBQVUsRUFBRSxZQUFZLEVBQ3hCLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUVMLGVBQWUsRUFDZixNQUFNLEVBQ0UsTUFBTSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0Msa0JBQWtCLEVBQW9DLE1BQU0sd0JBQXdCLENBQUM7QUFDcEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7SUNiMUMseUJBQ0U7SUFBQSxnQ0FjTztJQVpMLCtQQUF5QyxzT0FBQSxrUEFBQSxrUEFBQSxxUEFBQSxxUEFBQTtJQVkz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QkFHTCxLQUFLOztrQkFHTCxLQUFLOztrQkFHTCxLQUFLOztrQkFHTCxLQUFLOztrQkFHTCxLQUFLOztrQkFHTCxNQUFNOztrQkFPTixLQUFLOztrQkFrTkwsWUFBWTttQkFBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tCQU1uQyxZQUFZO21CQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0JBVy9CLFlBQVk7bUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOztrQkFLcEMsWUFBWTttQkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tCQUtwQyxZQUFZO21CQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBOZ1pvbmUsXG4gIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDYWxsYmFja3MsIEZjRWRnZSwgRmNNb2RlbCwgRmNOb2RlLCBGbG93Y2hhcnRDb25zdGFudHMsIFVzZXJDYWxsYmFja3MsIFVzZXJOb2RlQ2FsbGJhY2tzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBGY01vZGVsU2VydmljZSB9IGZyb20gJy4vbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjTm9kZURyYWdnaW5nU2VydmljZSB9IGZyb20gJy4vbm9kZS1kcmFnZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY01vdXNlT3ZlclNlcnZpY2UgfSBmcm9tICcuL21vdXNlb3Zlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZSB9IGZyb20gJy4vcmVjdGFuZ2xlc2VsZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmMtY2FudmFzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1mbG93Y2hhcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEZsb3djaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmNsYXNzJylcbiAgZ2V0IGNhbnZhc0NsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEZsb3djaGFydENvbnN0YW50cy5jYW52YXNDbGFzcztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIG1vZGVsOiBGY01vZGVsO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkT2JqZWN0czogYW55W107XG5cbiAgQElucHV0KClcbiAgZWRnZVN0eWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgdXNlckNhbGxiYWNrczogVXNlckNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBhdXRvbWF0aWNSZXNpemU6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZHJhZ0FuaW1hdGlvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVXaWR0aDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGVIZWlnaHQ6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBkcm9wVGFyZ2V0SWQ6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgbW9kZWxDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZml0TW9kZWxTaXplQnlEZWZhdWx0VmFsdWUgPSB0cnVlO1xuICBnZXQgZml0TW9kZWxTaXplQnlEZWZhdWx0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdFZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXRNb2RlbFNpemVCeURlZmF1bHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdFZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG4gIG5vZGVEcmFnZ2luZ1NlcnZpY2U6IEZjTm9kZURyYWdnaW5nU2VydmljZTtcbiAgZWRnZURyYWdnaW5nU2VydmljZTogRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlO1xuICBtb3VzZW92ZXJTZXJ2aWNlOiBGY01vdXNlT3ZlclNlcnZpY2U7XG4gIHJlY3RhbmdsZVNlbGVjdFNlcnZpY2U6IEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZTtcblxuICBhcnJvd0RlZklkOiBzdHJpbmc7XG4gIGFycm93RGVmSWRTZWxlY3RlZDogc3RyaW5nO1xuXG4gIGZsb3djaGFydENvbnN0YW50cyA9IEZsb3djaGFydENvbnN0YW50cztcblxuICBwcml2YXRlIG5vZGVzRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxGY05vZGU+ID0gdGhpcy5kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZTxGY05vZGU+KChpbmRleCwgaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtO1xuICB9KTtcblxuICBwcml2YXRlIGVkZ2VzRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxGY0VkZ2U+ID0gdGhpcy5kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZTxGY0VkZ2U+KChpbmRleCwgaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtO1xuICB9KTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRldGVjdENoYW5nZXNTdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIG1vZGVsVmFsaWRhdGlvbjogRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgZWRnZURyYXdpbmdTZXJ2aWNlOiBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5hcnJvd0RlZklkID0gJ2Fycm93LScgKyBNYXRoLnJhbmRvbSgpO1xuICAgIHRoaXMuYXJyb3dEZWZJZFNlbGVjdGVkID0gdGhpcy5hcnJvd0RlZklkICsgJy1zZWxlY3RlZCc7XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdFxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmRyb3BUYXJnZXRJZCAmJiB0aGlzLmVkZ2VTdHlsZSAhPT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmN1cnZlZFN0eWxlICYmIHRoaXMuZWRnZVN0eWxlICE9PSBGbG93Y2hhcnRDb25zdGFudHMubGluZVN0eWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VkZ2VTdHlsZSBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVIZWlnaHQgPSB0aGlzLm5vZGVIZWlnaHQgfHwgMjAwO1xuICAgIHRoaXMubm9kZVdpZHRoID0gdGhpcy5ub2RlV2lkdGggfHwgMjAwO1xuICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiA9IHRoaXMuZHJhZ0FuaW1hdGlvbiB8fCBGbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQ7XG4gICAgdGhpcy51c2VyQ2FsbGJhY2tzID0gdGhpcy51c2VyQ2FsbGJhY2tzIHx8IHt9O1xuICAgIHRoaXMuYXV0b21hdGljUmVzaXplID0gdGhpcy5hdXRvbWF0aWNSZXNpemUgfHwgZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLnVzZXJDYWxsYmFja3MpKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMudXNlckNhbGxiYWNrc1trZXldO1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyAmJiBrZXkgIT09ICdub2RlQ2FsbGJhY2tzJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCBjYWxsYmFja3Mgc2hvdWxkIGJlIGZ1bmN0aW9ucy4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzID0gdGhpcy51c2VyQ2FsbGJhY2tzLm5vZGVDYWxsYmFja3M7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gJCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG5ldyBGY01vZGVsU2VydmljZSh0aGlzLm1vZGVsVmFsaWRhdGlvbiwgdGhpcy5tb2RlbCwgdGhpcy5tb2RlbENoYW5nZWQsXG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0LCB0aGlzLnNlbGVjdGVkT2JqZWN0cyxcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5kcm9wTm9kZSwgdGhpcy51c2VyQ2FsbGJhY2tzLmNyZWF0ZUVkZ2UsIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlQWRkZWQsIHRoaXMudXNlckNhbGxiYWNrcy5ub2RlUmVtb3ZlZCxcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlUmVtb3ZlZCwgZWxlbWVudFswXSwgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCdzdmcnKSk7XG5cbiAgICBpZiAodGhpcy5kcm9wVGFyZ2V0SWQpIHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmRyb3BUYXJnZXRJZCA9IHRoaXMuZHJvcFRhcmdldElkO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5RnVuY3Rpb24gPSB0aGlzLnpvbmUucnVuLmJpbmQodGhpcy56b25lKTtcblxuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZSA9IG5ldyBGY05vZGVEcmFnZ2luZ1NlcnZpY2UodGhpcy5tb2RlbFNlcnZpY2UsIGFwcGx5RnVuY3Rpb24sXG4gICAgICAgICAgdGhpcy5hdXRvbWF0aWNSZXNpemUsIHRoaXMuZHJhZ0FuaW1hdGlvbik7XG5cbiAgICB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlKHRoaXMubW9kZWxWYWxpZGF0aW9uLCB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZSwgdGhpcy5tb2RlbFNlcnZpY2UsXG4gICAgICB0aGlzLm1vZGVsLCB0aGlzLnVzZXJDYWxsYmFja3MuaXNWYWxpZEVkZ2UgfHwgbnVsbCwgYXBwbHlGdW5jdGlvbixcbiAgICAgIHRoaXMuZHJhZ0FuaW1hdGlvbiwgdGhpcy5lZGdlU3R5bGUpO1xuXG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlID0gbmV3IEZjTW91c2VPdmVyU2VydmljZShhcHBseUZ1bmN0aW9uKTtcblxuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZSA9IG5ldyBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2UodGhpcy5tb2RlbFNlcnZpY2UsXG4gICAgICBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3QtcmVjdGFuZ2xlJyksIGFwcGx5RnVuY3Rpb24pO1xuXG4gICAgdGhpcy5jYWxsYmFja3MgPSB7XG4gICAgICBub2RlRHJhZ3N0YXJ0OiB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ3N0YXJ0LmJpbmQodGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIG5vZGVEcmFnZW5kOiB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ2VuZC5iaW5kKHRoaXMubm9kZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ3N0YXJ0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ3N0YXJ0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnZW5kOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ2VuZC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJvcDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyb3AuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdvdmVyQ29ubmVjdG9yOiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXJDb25uZWN0b3IuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdvdmVyTWFnbmV0OiB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXJNYWduZXQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdsZWF2ZU1hZ25ldDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdsZWF2ZU1hZ25ldC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBub2RlTW91c2VPdmVyOiB0aGlzLm1vdXNlb3ZlclNlcnZpY2Uubm9kZU1vdXNlT3Zlci5iaW5kKHRoaXMubW91c2VvdmVyU2VydmljZSksXG4gICAgICBub2RlTW91c2VPdXQ6IHRoaXMubW91c2VvdmVyU2VydmljZS5ub2RlTW91c2VPdXQuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgY29ubmVjdG9yTW91c2VFbnRlcjogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmNvbm5lY3Rvck1vdXNlRW50ZXIuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgY29ubmVjdG9yTW91c2VMZWF2ZTogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmNvbm5lY3Rvck1vdXNlTGVhdmUuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgbm9kZUNsaWNrZWQ6IChldmVudCwgbm9kZSkgPT4ge1xuICAgICAgICB0aGlzLm1vZGVsU2VydmljZS5ub2Rlcy5oYW5kbGVDbGlja2VkKG5vZGUsIGV2ZW50LmN0cmxLZXkpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuYWRqdXN0Q2FudmFzU2l6ZSh0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIGNvbnN0IG5vZGVzQ2hhbmdlID0gdGhpcy5ub2Rlc0RpZmZlci5kaWZmKHRoaXMubW9kZWwubm9kZXMpO1xuICAgICAgY29uc3QgZWRnZXNDaGFuZ2UgPSB0aGlzLmVkZ2VzRGlmZmVyLmRpZmYodGhpcy5tb2RlbC5lZGdlcyk7XG4gICAgICBsZXQgbm9kZXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICBsZXQgZWRnZXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICBpZiAobm9kZXNDaGFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgbm9kZXNDaGFuZ2UuZm9yRWFjaEFkZGVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgbm9kZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5vZGVzQ2hhbmdlLmZvckVhY2hSZW1vdmVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgbm9kZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZWRnZXNDaGFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgZWRnZXNDaGFuZ2UuZm9yRWFjaEFkZGVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgZWRnZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVkZ2VzQ2hhbmdlLmZvckVhY2hSZW1vdmVkSXRlbSgoKSA9PiB7XG4gICAgICAgICAgZWRnZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZXNDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0Q2FudmFzU2l6ZSh0aGlzLmZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZXNDaGFuZ2VkIHx8IGVkZ2VzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXNTdWJqZWN0Lm5leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRFZGdlREF0dHJpYnV0ZShlZGdlOiBGY0VkZ2UpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlREF0dHJpYnV0ZSh0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5zb3VyY2VDb29yZChlZGdlKSxcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlc3RDb29yZChlZGdlKSwgdGhpcy5lZGdlU3R5bGUpO1xuICB9XG5cbiAgcHVibGljIGFkanVzdENhbnZhc1NpemUoZml0PzogYm9vbGVhbikge1xuICAgIGxldCBtYXhYID0gMDtcbiAgICBsZXQgbWF4WSA9IDA7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMubW9kZWwubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbWF4WCA9IE1hdGgubWF4KG5vZGUueCArIHRoaXMubm9kZVdpZHRoLCBtYXhYKTtcbiAgICAgIG1heFkgPSBNYXRoLm1heChub2RlLnkgKyB0aGlzLm5vZGVIZWlnaHQsIG1heFkpO1xuICAgIH0pO1xuICAgIGxldCB3aWR0aDtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGlmIChmaXQpIHtcbiAgICAgIHdpZHRoID0gbWF4WDtcbiAgICAgIGhlaWdodCA9IG1heFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoID0gTWF0aC5tYXgobWF4WCwgZWxlbWVudC5wcm9wKCdvZmZzZXRXaWR0aCcpKTtcbiAgICAgIGhlaWdodCA9IE1hdGgubWF4KG1heFksIGVsZW1lbnQucHJvcCgnb2Zmc2V0SGVpZ2h0JykpO1xuICAgIH1cbiAgICBlbGVtZW50LmNzcygnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICAgIGVsZW1lbnQuY3NzKCdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgfVxuXG4gIGNhbnZhc0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7fVxuXG4gIGVkZ2VNb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZWRnZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5oYW5kbGVFZGdlTW91c2VDbGljayhlZGdlLCBldmVudC5jdHJsS2V5KTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZWRnZVJlbW92ZShldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlLmVkZ2VzLmRlbGV0ZShlZGdlKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZWRnZUVkaXQoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VFZGl0KSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZUVkaXQoZXZlbnQsIGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGVkZ2VEb3VibGVDbGljayhldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRG91YmxlQ2xpY2spIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRG91YmxlQ2xpY2soZXZlbnQsIGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGVkZ2VNb3VzZU92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZU1vdXNlT3Zlcikge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VNb3VzZU92ZXIoZXZlbnQsIGVkZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGVkZ2VNb3VzZUVudGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuZWRnZU1vdXNlRW50ZXIoZXZlbnQsIGVkZ2UpO1xuICB9XG5cbiAgZWRnZU1vdXNlTGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIHRoaXMubW91c2VvdmVyU2VydmljZS5lZGdlTW91c2VMZWF2ZShldmVudCwgZWRnZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXIoZXZlbnQpO1xuICAgIHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnb3ZlcihldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyb3AoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNlZG93bihldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBtb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UubW91c2Vtb3ZlKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxuICBtb3VzZXVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNldXAoZXZlbnQpO1xuICB9XG5cbn1cbiIsIjxkaXYgKGNsaWNrKT1cImNhbnZhc0NsaWNrKCRldmVudClcIiBjbGFzcz1cImZjLWNhbnZhcy1jb250YWluZXJcIj5cbiAgPHN2ZyBjbGFzcz1cImZjLWNhbnZhcy1zdmdcIj5cbiAgICA8ZGVmcz5cbiAgICAgIDxtYXJrZXIgY2xhc3M9XCJmYy1hcnJvdy1tYXJrZXJcIiBbYXR0ci5pZF09XCJhcnJvd0RlZklkXCIgbWFya2VyV2lkdGg9XCI1XCIgbWFya2VySGVpZ2h0PVwiNVwiIHZpZXdCb3g9XCItNiAtNiAxMiAxMlwiIHJlZlg9XCIxMFwiIHJlZlk9XCIwXCIgbWFya2VyVW5pdHM9XCJzdHJva2VXaWR0aFwiIG9yaWVudD1cImF1dG9cIj5cbiAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiLTIsMCAtNSw1IDUsMCAtNSwtNVwiIHN0cm9rZT1cImdyYXlcIiBmaWxsPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjFweFwiLz5cbiAgICAgIDwvbWFya2VyPlxuICAgICAgPG1hcmtlciBjbGFzcz1cImZjLWFycm93LW1hcmtlci1zZWxlY3RlZFwiIFthdHRyLmlkXT1cImFycm93RGVmSWRTZWxlY3RlZFwiIG1hcmtlcldpZHRoPVwiNVwiIG1hcmtlckhlaWdodD1cIjVcIiB2aWV3Qm94PVwiLTYgLTYgMTIgMTJcIiByZWZYPVwiMTBcIiByZWZZPVwiMFwiIG1hcmtlclVuaXRzPVwic3Ryb2tlV2lkdGhcIiBvcmllbnQ9XCJhdXRvXCI+XG4gICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIi0yLDAgLTUsNSA1LDAgLTUsLTVcIiBzdHJva2U9XCJyZWRcIiBmaWxsPVwicmVkXCIgc3Ryb2tlLXdpZHRoPVwiMXB4XCIvPlxuICAgICAgPC9tYXJrZXI+XG4gICAgPC9kZWZzPlxuICAgIDxnICpuZ0Zvcj1cImxldCBlZGdlIG9mIG1vZGVsLmVkZ2VzOyBsZXQgJGluZGV4ID0gaW5kZXhcIj5cbiAgICAgIDxwYXRoXG4gICAgICAgIFthdHRyLmlkXT1cIidmYy1lZGdlLXBhdGgtJyskaW5kZXhcIlxuICAgICAgICAobW91c2Vkb3duKT1cImVkZ2VNb3VzZURvd24oJGV2ZW50LCBlZGdlKVwiXG4gICAgICAgIChjbGljayk9XCJlZGdlQ2xpY2soJGV2ZW50LCBlZGdlKVwiXG4gICAgICAgIChkYmxjbGljayk9XCJlZGdlRG91YmxlQ2xpY2soJGV2ZW50LCBlZGdlKVwiXG4gICAgICAgIChtb3VzZW92ZXIpPVwiZWRnZU1vdXNlT3ZlcigkZXZlbnQsIGVkZ2UpXCJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwiZWRnZU1vdXNlRW50ZXIoJGV2ZW50LCBlZGdlKVwiXG4gICAgICAgIChtb3VzZWxlYXZlKT1cImVkZ2VNb3VzZUxlYXZlKCRldmVudCwgZWRnZSlcIlxuICAgICAgICBbYXR0ci5jbGFzc109XCIobW9kZWxTZXJ2aWNlLmVkZ2VzLmlzU2VsZWN0ZWQoZWRnZSkgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLnNlbGVjdGVkQ2xhc3MgKyAnICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUNsYXNzKSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGVkZ2UgPT09IG1vdXNlb3ZlclNlcnZpY2UubW91c2VvdmVyc2NvcGUuZWRnZSAmJiBmbG93Y2hhcnRDb25zdGFudHMuaG92ZXJDbGFzcyArICcgJyArIGZsb3djaGFydENvbnN0YW50cy5lZGdlQ2xhc3MgfHxcbiAgICAgICAgICAgICAgICAgICAgICBlZGdlLmFjdGl2ZSAmJiBmbG93Y2hhcnRDb25zdGFudHMuYWN0aXZlQ2xhc3MgKyAnICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUNsYXNzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VDbGFzc1wiXG4gICAgICAgIFthdHRyLmRdPVwiZ2V0RWRnZURBdHRyaWJ1dGUoZWRnZSlcIlxuICAgICAgICBbYXR0ci5tYXJrZXItZW5kXT1cIid1cmwoIycgKyAobW9kZWxTZXJ2aWNlLmVkZ2VzLmlzU2VsZWN0ZWQoZWRnZSkgPyBhcnJvd0RlZklkU2VsZWN0ZWQgOiBhcnJvd0RlZklkKSArICcpJ1wiPlxuICAgICAgPC9wYXRoPlxuICAgIDwvZz5cbiAgICA8ZyAqbmdJZj1cImRyYWdBbmltYXRpb24gPT09IGZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uUmVwYWludCAmJiBlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5pc0RyYWdnaW5nXCI+XG4gICAgICA8cGF0aCBbYXR0ci5jbGFzc109XCJmbG93Y2hhcnRDb25zdGFudHMuZWRnZUNsYXNzICsgJyAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdnaW5nQ2xhc3NcIlxuICAgICAgICAgICAgW2F0dHIuZF09XCJlZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUoZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MiwgZWRnZVN0eWxlKVwiPjwvcGF0aD5cbiAgICAgIDxjaXJjbGUgY2xhc3M9XCJlZGdlLWVuZHBvaW50XCIgcj1cIjRcIlxuICAgICAgICAgICAgICBbYXR0ci5jeF09XCJlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnhcIlxuICAgICAgICAgICAgICBbYXR0ci5jeV09XCJlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyLnlcIj5cbiAgICAgIDwvY2lyY2xlPlxuICAgIDwvZz5cbiAgICA8ZyAqbmdJZj1cImRyYWdBbmltYXRpb24gPT09IGZsb3djaGFydENvbnN0YW50cy5kcmFnQW5pbWF0aW9uU2hhZG93XCJcbiAgICAgICBjbGFzcz1cInNoYWRvdy1zdmctY2xhc3Mge3sgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VDbGFzcyB9fSB7eyBmbG93Y2hhcnRDb25zdGFudHMuZHJhZ2dpbmdDbGFzcyB9fVwiXG4gICAgICAgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj5cbiAgICAgIDxwYXRoIGQ9XCJcIj48L3BhdGg+XG4gICAgICA8Y2lyY2xlIGNsYXNzPVwiZWRnZS1lbmRwb2ludFwiIHI9XCI0XCI+PC9jaXJjbGU+XG4gICAgPC9nPlxuICA8L3N2Zz5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbm9kZSBvZiBtb2RlbC5ub2Rlc1wiPlxuICAgIDxmYy1ub2RlXG4gICAgICAgICBbc2VsZWN0ZWRdPVwibW9kZWxTZXJ2aWNlLm5vZGVzLmlzU2VsZWN0ZWQobm9kZSlcIlxuICAgICAgICAgW2VkaXRdPVwibW9kZWxTZXJ2aWNlLm5vZGVzLmlzRWRpdChub2RlKVwiXG4gICAgICAgICBbdW5kZXJNb3VzZV09XCJub2RlID09PSBtb3VzZW92ZXJTZXJ2aWNlLm1vdXNlb3ZlcnNjb3BlLm5vZGVcIlxuICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgICBbbW91c2VPdmVyQ29ubmVjdG9yXT1cIm1vdXNlb3ZlclNlcnZpY2UubW91c2VvdmVyc2NvcGUuY29ubmVjdG9yXCJcbiAgICAgICAgIFttb2RlbHNlcnZpY2VdPVwibW9kZWxTZXJ2aWNlXCJcbiAgICAgICAgIFtkcmFnZ2luZ109XCJub2RlRHJhZ2dpbmdTZXJ2aWNlLmlzRHJhZ2dpbmdOb2RlKG5vZGUpXCJcbiAgICAgICAgIFtjYWxsYmFja3NdPVwiY2FsbGJhY2tzXCJcbiAgICAgICAgIFt1c2VyTm9kZUNhbGxiYWNrc109XCJ1c2VyTm9kZUNhbGxiYWNrc1wiPlxuICAgIDwvZmMtbm9kZT5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxkaXYgKm5nSWY9XCJkcmFnQW5pbWF0aW9uID09PSBmbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQgJiYgZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZ1wiXG4gICAgICAgW2F0dHIuY2xhc3NdPVwiJ2ZjLW5vc2VsZWN0ICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUxhYmVsQ2xhc3NcIlxuICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICB0b3A6IChlZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZUNlbnRlcihlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCBlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyKS55KSsncHgnLFxuICAgICAgICAgIGxlZnQ6IChlZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZUNlbnRlcihlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQxLCBlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnUG9pbnQyKS54KSsncHgnXG4gICAgICAgfVwiPlxuICAgIDxkaXYgY2xhc3M9XCJmYy1lZGdlLWxhYmVsLXRleHRcIj5cbiAgICAgIDxzcGFuIFthdHRyLmlkXT1cIidmYy1lZGdlLWxhYmVsLWRyYWdnaW5nJ1wiICpuZ0lmPVwiZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsXCI+e3tlZGdlRHJhZ2dpbmdTZXJ2aWNlLmVkZ2VEcmFnZ2luZy5kcmFnTGFiZWx9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXZcbiAgICAobW91c2Vkb3duKT1cImVkZ2VNb3VzZURvd24oJGV2ZW50LCBlZGdlKVwiXG4gICAgKGNsaWNrKT1cImVkZ2VDbGljaygkZXZlbnQsIGVkZ2UpXCJcbiAgICAoZGJsY2xpY2spPVwiZWRnZURvdWJsZUNsaWNrKCRldmVudCwgZWRnZSlcIlxuICAgIChtb3VzZW92ZXIpPVwiZWRnZU1vdXNlT3ZlcigkZXZlbnQsIGVkZ2UpXCJcbiAgICAobW91c2VlbnRlcik9XCJlZGdlTW91c2VFbnRlcigkZXZlbnQsIGVkZ2UpXCJcbiAgICAobW91c2VsZWF2ZSk9XCJlZGdlTW91c2VMZWF2ZSgkZXZlbnQsIGVkZ2UpXCJcbiAgICBbYXR0ci5jbGFzc109XCInZmMtbm9zZWxlY3QgJyArICgobW9kZWxTZXJ2aWNlLmVkZ2VzLmlzRWRpdChlZGdlKSAmJiBmbG93Y2hhcnRDb25zdGFudHMuZWRpdENsYXNzICsgJyAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VMYWJlbENsYXNzKSB8fFxuICAgICAgICAgICAgICAgICAgICAgIChtb2RlbFNlcnZpY2UuZWRnZXMuaXNTZWxlY3RlZChlZGdlKSAmJiBmbG93Y2hhcnRDb25zdGFudHMuc2VsZWN0ZWRDbGFzcyArICcgJyArIGZsb3djaGFydENvbnN0YW50cy5lZGdlTGFiZWxDbGFzcykgfHxcbiAgICAgICAgICAgICAgICAgICAgICBlZGdlID09PSBtb3VzZW92ZXJTZXJ2aWNlLm1vdXNlb3ZlcnNjb3BlLmVkZ2UgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MgKyAnICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUxhYmVsQ2xhc3MgfHxcbiAgICAgICAgICAgICAgICAgICAgICBlZGdlLmFjdGl2ZSAmJiBmbG93Y2hhcnRDb25zdGFudHMuYWN0aXZlQ2xhc3MgKyAnICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUxhYmVsQ2xhc3MgfHxcbiAgICAgICAgICAgICAgICAgICAgICBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUxhYmVsQ2xhc3MpXCJcbiAgICBbbmdTdHlsZV09XCJ7XG4gICAgICB0b3A6IChlZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZUNlbnRlcihtb2RlbFNlcnZpY2UuZWRnZXMuc291cmNlQ29vcmQoZWRnZSksIG1vZGVsU2VydmljZS5lZGdlcy5kZXN0Q29vcmQoZWRnZSkpLnkpKydweCcsXG4gICAgICBsZWZ0OiAoZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VDZW50ZXIobW9kZWxTZXJ2aWNlLmVkZ2VzLnNvdXJjZUNvb3JkKGVkZ2UpLCBtb2RlbFNlcnZpY2UuZWRnZXMuZGVzdENvb3JkKGVkZ2UpKS54KSsncHgnXG4gICAgfVwiXG4gICAgKm5nRm9yPVwibGV0IGVkZ2Ugb2YgbW9kZWwuZWRnZXM7IGxldCAkaW5kZXggPSBpbmRleFwiPlxuICAgIDxkaXYgY2xhc3M9XCJmYy1lZGdlLWxhYmVsLXRleHRcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJtb2RlbFNlcnZpY2UuaXNFZGl0YWJsZSgpXCIgY2xhc3M9XCJmYy1ub3NlbGVjdCBmYy1ub2RlZWRpdFwiIChjbGljayk9XCJlZGdlRWRpdCgkZXZlbnQsIGVkZ2UpXCI+XG4gICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwibW9kZWxTZXJ2aWNlLmlzRWRpdGFibGUoKVwiIGNsYXNzPVwiZmMtbm9zZWxlY3QgZmMtbm9kZWRlbGV0ZVwiIChjbGljayk9XCJlZGdlUmVtb3ZlKCRldmVudCwgZWRnZSlcIj5cbiAgICAgICAgJnRpbWVzO1xuICAgICAgPC9kaXY+XG4gICAgICA8c3BhbiBbYXR0ci5pZF09XCInZmMtZWRnZS1sYWJlbC0nKyRpbmRleFwiICpuZ0lmPVwiZWRnZS5sYWJlbFwiPnt7ZWRnZS5sYWJlbH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBpZD1cInNlbGVjdC1yZWN0YW5nbGVcIiBjbGFzcz1cImZjLXNlbGVjdC1yZWN0YW5nbGVcIiBoaWRkZW4+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=