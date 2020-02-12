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
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g");
    i0.ɵɵelementStart(1, "path", 12);
    i0.ɵɵlistener("mousedown", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mousedown_1_listener($event) { i0.ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.edgeMouseDown($event, edge_r8); })("click", function NgxFlowchartComponent__svg_g_7_Template__svg_path_click_1_listener($event) { i0.ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.edgeClick($event, edge_r8); })("dblclick", function NgxFlowchartComponent__svg_g_7_Template__svg_path_dblclick_1_listener($event) { i0.ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.edgeDoubleClick($event, edge_r8); })("mouseover", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseover_1_listener($event) { i0.ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.edgeMouseOver($event, edge_r8); })("mouseenter", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseenter_1_listener($event) { i0.ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.edgeMouseEnter($event, edge_r8); })("mouseleave", function NgxFlowchartComponent__svg_g_7_Template__svg_path_mouseleave_1_listener($event) { i0.ɵɵrestoreView(_r11); const edge_r8 = ctx.$implicit; const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.edgeMouseLeave($event, edge_r8); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const edge_r8 = ctx.$implicit;
    const $index_r9 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("id", "fc-edge-path-" + $index_r9)("class", ctx_r2.modelService.edges.isSelected(edge_r8) && ctx_r2.flowchartConstants.selectedClass + " " + ctx_r2.flowchartConstants.edgeClass || edge_r8 === ctx_r2.mouseoverService.mouseoverscope.edge && ctx_r2.flowchartConstants.hoverClass + " " + ctx_r2.flowchartConstants.edgeClass || edge_r8.active && ctx_r2.flowchartConstants.activeClass + " " + ctx_r2.flowchartConstants.edgeClass || ctx_r2.flowchartConstants.edgeClass)("d", ctx_r2.getEdgeDAttribute(edge_r8))("marker-end", "url(#" + (ctx_r2.modelService.edges.isSelected(edge_r8) ? ctx_r2.arrowDefIdSelected : ctx_r2.arrowDefId) + ")");
} }
function NgxFlowchartComponent__svg_g_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g");
    i0.ɵɵelement(1, "path");
    i0.ɵɵelement(2, "circle", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("class", ctx_r3.flowchartConstants.edgeClass + " " + ctx_r3.flowchartConstants.draggingClass)("d", ctx_r3.edgeDrawingService.getEdgeDAttribute(ctx_r3.edgeDraggingService.edgeDragging.dragPoint1, ctx_r3.edgeDraggingService.edgeDragging.dragPoint2, ctx_r3.edgeStyle));
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("cx", ctx_r3.edgeDraggingService.edgeDragging.dragPoint2.x)("cy", ctx_r3.edgeDraggingService.edgeDragging.dragPoint2.y);
} }
function NgxFlowchartComponent__svg_g_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 14);
    i0.ɵɵelement(1, "path", 15);
    i0.ɵɵelement(2, "circle", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate2("shadow-svg-class ", ctx_r4.flowchartConstants.edgeClass, " ", ctx_r4.flowchartConstants.draggingClass, "");
} }
function NgxFlowchartComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "fc-node", 16);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const node_r17 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("selected", ctx_r5.modelService.nodes.isSelected(node_r17))("edit", ctx_r5.modelService.nodes.isEdit(node_r17))("underMouse", node_r17 === ctx_r5.mouseoverService.mouseoverscope.node)("node", node_r17)("mouseOverConnector", ctx_r5.mouseoverService.mouseoverscope.connector)("modelservice", ctx_r5.modelService)("dragging", ctx_r5.nodeDraggingService.isDraggingNode(node_r17))("callbacks", ctx_r5.callbacks)("userNodeCallbacks", ctx_r5.userNodeCallbacks);
} }
function NgxFlowchartComponent_div_11_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("id", "fc-edge-label-dragging");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r18.edgeDraggingService.edgeDragging.dragLabel);
} }
const _c0 = function (a0, a1) { return { top: a0, left: a1 }; };
function NgxFlowchartComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵtemplate(2, NgxFlowchartComponent_div_11_span_2_Template, 2, 2, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(3, _c0, ctx_r6.edgeDrawingService.getEdgeCenter(ctx_r6.edgeDraggingService.edgeDragging.dragPoint1, ctx_r6.edgeDraggingService.edgeDragging.dragPoint2).y + "px", ctx_r6.edgeDrawingService.getEdgeCenter(ctx_r6.edgeDraggingService.edgeDragging.dragPoint1, ctx_r6.edgeDraggingService.edgeDragging.dragPoint2).x + "px"));
    i0.ɵɵattribute("class", "fc-noselect " + ctx_r6.flowchartConstants.edgeLabelClass);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r6.edgeDraggingService.edgeDragging.dragLabel);
} }
function NgxFlowchartComponent_div_12_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵlistener("click", function NgxFlowchartComponent_div_12_div_2_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r25); const edge_r19 = i0.ɵɵnextContext().$implicit; const ctx_r24 = i0.ɵɵnextContext(); return ctx_r24.edgeEdit($event, edge_r19); });
    i0.ɵɵelement(1, "i", 23);
    i0.ɵɵelementEnd();
} }
function NgxFlowchartComponent_div_12_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵlistener("click", function NgxFlowchartComponent_div_12_div_3_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r28); const edge_r19 = i0.ɵɵnextContext().$implicit; const ctx_r27 = i0.ɵɵnextContext(); return ctx_r27.edgeRemove($event, edge_r19); });
    i0.ɵɵtext(1, " \u00D7 ");
    i0.ɵɵelementEnd();
} }
function NgxFlowchartComponent_div_12_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = i0.ɵɵnextContext();
    const $index_r20 = ctx_r30.index;
    const edge_r19 = ctx_r30.$implicit;
    i0.ɵɵattribute("id", "fc-edge-label-" + $index_r20);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(edge_r19.label);
} }
function NgxFlowchartComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵlistener("mousedown", function NgxFlowchartComponent_div_12_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r31 = i0.ɵɵnextContext(); return ctx_r31.edgeMouseDown($event, edge_r19); })("click", function NgxFlowchartComponent_div_12_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r33 = i0.ɵɵnextContext(); return ctx_r33.edgeClick($event, edge_r19); })("dblclick", function NgxFlowchartComponent_div_12_Template_div_dblclick_0_listener($event) { i0.ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r34 = i0.ɵɵnextContext(); return ctx_r34.edgeDoubleClick($event, edge_r19); })("mouseover", function NgxFlowchartComponent_div_12_Template_div_mouseover_0_listener($event) { i0.ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r35 = i0.ɵɵnextContext(); return ctx_r35.edgeMouseOver($event, edge_r19); })("mouseenter", function NgxFlowchartComponent_div_12_Template_div_mouseenter_0_listener($event) { i0.ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.edgeMouseEnter($event, edge_r19); })("mouseleave", function NgxFlowchartComponent_div_12_Template_div_mouseleave_0_listener($event) { i0.ɵɵrestoreView(_r32); const edge_r19 = ctx.$implicit; const ctx_r37 = i0.ɵɵnextContext(); return ctx_r37.edgeMouseLeave($event, edge_r19); });
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵtemplate(2, NgxFlowchartComponent_div_12_div_2_Template, 2, 0, "div", 20);
    i0.ɵɵtemplate(3, NgxFlowchartComponent_div_12_div_3_Template, 2, 0, "div", 21);
    i0.ɵɵtemplate(4, NgxFlowchartComponent_div_12_span_4_Template, 2, 2, "span", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const edge_r19 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(5, _c0, ctx_r7.edgeDrawingService.getEdgeCenter(ctx_r7.modelService.edges.sourceCoord(edge_r19), ctx_r7.modelService.edges.destCoord(edge_r19)).y + "px", ctx_r7.edgeDrawingService.getEdgeCenter(ctx_r7.modelService.edges.sourceCoord(edge_r19), ctx_r7.modelService.edges.destCoord(edge_r19)).x + "px"));
    i0.ɵɵattribute("class", "fc-noselect " + (ctx_r7.modelService.edges.isEdit(edge_r19) && ctx_r7.flowchartConstants.editClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || ctx_r7.modelService.edges.isSelected(edge_r19) && ctx_r7.flowchartConstants.selectedClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || edge_r19 === ctx_r7.mouseoverService.mouseoverscope.edge && ctx_r7.flowchartConstants.hoverClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || edge_r19.active && ctx_r7.flowchartConstants.activeClass + " " + ctx_r7.flowchartConstants.edgeLabelClass || ctx_r7.flowchartConstants.edgeLabelClass));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r7.modelService.isEditable());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r7.modelService.isEditable());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", edge_r19.label);
} }
export class NgxFlowchartComponent {
    constructor(elementRef, differs, modelValidation, edgeDrawingService, cd, zone) {
        this.elementRef = elementRef;
        this.differs = differs;
        this.modelValidation = modelValidation;
        this.edgeDrawingService = edgeDrawingService;
        this.cd = cd;
        this.zone = zone;
        this.modelChanged = new EventEmitter();
        this.fitModelSizeByDefaultValue = true;
        this.flowchartConstants = FlowchartConstants;
        this.nodesDiffer = this.differs.find([]).create((index, item) => {
            return item;
        });
        this.edgesDiffer = this.differs.find([]).create((index, item) => {
            return item;
        });
        this.detectChangesSubject = new Subject();
        this.arrowDefId = 'arrow-' + Math.random();
        this.arrowDefIdSelected = this.arrowDefId + '-selected';
        this.detectChangesSubject
            .pipe(debounceTime(50))
            .subscribe(() => this.cd.detectChanges());
    }
    get canvasClass() {
        return FlowchartConstants.canvasClass;
    }
    get fitModelSizeByDefault() {
        return this.fitModelSizeByDefaultValue;
    }
    set fitModelSizeByDefault(value) {
        this.fitModelSizeByDefaultValue = coerceBooleanProperty(value);
    }
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
            const callback = this.userCallbacks[key];
            if (typeof callback !== 'function' && key !== 'nodeCallbacks') {
                throw new Error('All callbacks should be functions.');
            }
        }
        this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
        const element = $(this.elementRef.nativeElement);
        this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged, this.detectChangesSubject, this.selectedObjects, this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved, this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'));
        if (this.dropTargetId) {
            this.modelService.dropTargetId = this.dropTargetId;
        }
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
            nodeClicked: (event, node) => {
                this.modelService.nodes.handleClicked(node, event.ctrlKey);
                event.stopPropagation();
                event.preventDefault();
            }
        };
        this.adjustCanvasSize(this.fitModelSizeByDefault);
    }
    ngDoCheck() {
        if (this.model) {
            const nodesChange = this.nodesDiffer.diff(this.model.nodes);
            const edgesChange = this.edgesDiffer.diff(this.model.edges);
            let nodesChanged = false;
            let edgesChanged = false;
            if (nodesChange !== null) {
                nodesChange.forEachAddedItem(() => {
                    nodesChanged = true;
                });
                nodesChange.forEachRemovedItem(() => {
                    nodesChanged = true;
                });
            }
            if (edgesChange !== null) {
                edgesChange.forEachAddedItem(() => {
                    edgesChanged = true;
                });
                edgesChange.forEachRemovedItem(() => {
                    edgesChanged = true;
                });
            }
            if (nodesChanged) {
                this.adjustCanvasSize(this.fitModelSizeByDefault);
            }
            if (nodesChanged || edgesChanged) {
                this.detectChangesSubject.next();
            }
        }
    }
    getEdgeDAttribute(edge) {
        return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge), this.modelService.edges.destCoord(edge), this.edgeStyle);
    }
    adjustCanvasSize(fit) {
        let maxX = 0;
        let maxY = 0;
        const element = $(this.elementRef.nativeElement);
        this.model.nodes.forEach((node) => {
            maxX = Math.max(node.x + this.nodeWidth, maxX);
            maxY = Math.max(node.y + this.nodeHeight, maxY);
        });
        let width;
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
    canvasClick(event) { }
    edgeMouseDown(event, edge) {
        event.stopPropagation();
    }
    edgeClick(event, edge) {
        this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
    }
    edgeRemove(event, edge) {
        this.modelService.edges.delete(edge);
        event.stopPropagation();
        event.preventDefault();
    }
    edgeEdit(event, edge) {
        if (this.userCallbacks.edgeEdit) {
            this.userCallbacks.edgeEdit(event, edge);
        }
    }
    edgeDoubleClick(event, edge) {
        if (this.userCallbacks.edgeDoubleClick) {
            this.userCallbacks.edgeDoubleClick(event, edge);
        }
    }
    edgeMouseOver(event, edge) {
        if (this.userCallbacks.edgeMouseOver) {
            this.userCallbacks.edgeMouseOver(event, edge);
        }
    }
    edgeMouseEnter(event, edge) {
        this.mouseoverService.edgeMouseEnter(event, edge);
    }
    edgeMouseLeave(event, edge) {
        this.mouseoverService.edgeMouseLeave(event, edge);
    }
    dragover(event) {
        this.nodeDraggingService.dragover(event);
        this.edgeDraggingService.dragover(event);
    }
    drop(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.nodeDraggingService.drop(event);
    }
    mousedown(event) {
        this.rectangleSelectService.mousedown(event);
    }
    mousemove(event) {
        this.rectangleSelectService.mousemove(event);
    }
    mouseup(event) {
        this.rectangleSelectService.mouseup(event);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50LnRzIiwibGliL25neC1mbG93Y2hhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUMxQyxTQUFTLEVBRVQsVUFBVSxFQUFFLFlBQVksRUFDeEIsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBRUwsZUFBZSxFQUNmLE1BQU0sRUFDRSxNQUFNLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QyxrQkFBa0IsRUFBb0MsTUFBTSx3QkFBd0IsQ0FBQztBQUNwSSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztJQ2IxQyx5QkFDRTtJQUFBLGdDQWNPO0lBWkwsaVFBQXlDLHdPQUFBLG9QQUFBLG9QQUFBLHVQQUFBLHVQQUFBO0lBWTND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QUFRLENBQUM7O2tCQVcvQixZQUFZO21CQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0JBS3BDLFlBQVk7bUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOztrQkFLcEMsWUFBWTttQkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgTmdab25lLFxuICBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjQ2FsbGJhY2tzLCBGY0VkZ2UsIEZjTW9kZWwsIEZjTm9kZSwgRmxvd2NoYXJ0Q29uc3RhbnRzLCBVc2VyQ2FsbGJhY2tzLCBVc2VyTm9kZUNhbGxiYWNrcyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY05vZGVEcmFnZ2luZ1NlcnZpY2UgfSBmcm9tICcuL25vZGUtZHJhZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmF3aW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmF3aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNFZGdlRHJhZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYWdnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNNb3VzZU92ZXJTZXJ2aWNlIH0gZnJvbSAnLi9tb3VzZW92ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2UgfSBmcm9tICcuL3JlY3RhbmdsZXNlbGVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLWNhbnZhcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGbG93Y2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5jbGFzcycpXG4gIGdldCBjYW52YXNDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBGbG93Y2hhcnRDb25zdGFudHMuY2FudmFzQ2xhc3M7XG4gIH1cblxuICBASW5wdXQoKVxuICBtb2RlbDogRmNNb2RlbDtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZE9iamVjdHM6IGFueVtdO1xuXG4gIEBJbnB1dCgpXG4gIGVkZ2VTdHlsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJDYWxsYmFja3M6IFVzZXJDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgYXV0b21hdGljUmVzaXplOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdBbmltYXRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBub2RlV2lkdGg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBub2RlSGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgZHJvcFRhcmdldElkOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIG1vZGVsQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGZpdE1vZGVsU2l6ZUJ5RGVmYXVsdFZhbHVlID0gdHJ1ZTtcbiAgZ2V0IGZpdE1vZGVsU2l6ZUJ5RGVmYXVsdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHRWYWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZml0TW9kZWxTaXplQnlEZWZhdWx0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHRWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBub2RlRHJhZ2dpbmdTZXJ2aWNlOiBGY05vZGVEcmFnZ2luZ1NlcnZpY2U7XG4gIGVkZ2VEcmFnZ2luZ1NlcnZpY2U6IEZjRWRnZURyYWdnaW5nU2VydmljZTtcbiAgbW91c2VvdmVyU2VydmljZTogRmNNb3VzZU92ZXJTZXJ2aWNlO1xuICByZWN0YW5nbGVTZWxlY3RTZXJ2aWNlOiBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2U7XG5cbiAgYXJyb3dEZWZJZDogc3RyaW5nO1xuICBhcnJvd0RlZklkU2VsZWN0ZWQ6IHN0cmluZztcblxuICBmbG93Y2hhcnRDb25zdGFudHMgPSBGbG93Y2hhcnRDb25zdGFudHM7XG5cbiAgcHJpdmF0ZSBub2Rlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8RmNOb2RlPiA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8RmNOb2RlPigoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG5cbiAgcHJpdmF0ZSBlZGdlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8RmNFZGdlPiA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8RmNFZGdlPigoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXRlY3RDaGFuZ2VzU3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBtb2RlbFZhbGlkYXRpb246IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGVkZ2VEcmF3aW5nU2VydmljZTogRmNFZGdlRHJhd2luZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuYXJyb3dEZWZJZCA9ICdhcnJvdy0nICsgTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLmFycm93RGVmSWRTZWxlY3RlZCA9IHRoaXMuYXJyb3dEZWZJZCArICctc2VsZWN0ZWQnO1xuICAgIHRoaXMuZGV0ZWN0Q2hhbmdlc1N1YmplY3RcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kcm9wVGFyZ2V0SWQgJiYgdGhpcy5lZGdlU3R5bGUgIT09IEZsb3djaGFydENvbnN0YW50cy5jdXJ2ZWRTdHlsZSAmJiB0aGlzLmVkZ2VTdHlsZSAhPT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmxpbmVTdHlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlZGdlU3R5bGUgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgdGhpcy5ub2RlSGVpZ2h0ID0gdGhpcy5ub2RlSGVpZ2h0IHx8IDIwMDtcbiAgICB0aGlzLm5vZGVXaWR0aCA9IHRoaXMubm9kZVdpZHRoIHx8IDIwMDtcbiAgICB0aGlzLmRyYWdBbmltYXRpb24gPSB0aGlzLmRyYWdBbmltYXRpb24gfHwgRmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50O1xuICAgIHRoaXMudXNlckNhbGxiYWNrcyA9IHRoaXMudXNlckNhbGxiYWNrcyB8fCB7fTtcbiAgICB0aGlzLmF1dG9tYXRpY1Jlc2l6ZSA9IHRoaXMuYXV0b21hdGljUmVzaXplIHx8IGZhbHNlO1xuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy51c2VyQ2FsbGJhY2tzKSkge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnVzZXJDYWxsYmFja3Nba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicgJiYga2V5ICE9PSAnbm9kZUNhbGxiYWNrcycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgY2FsbGJhY2tzIHNob3VsZCBiZSBmdW5jdGlvbnMuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcyA9IHRoaXMudXNlckNhbGxiYWNrcy5ub2RlQ2FsbGJhY2tzO1xuXG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBuZXcgRmNNb2RlbFNlcnZpY2UodGhpcy5tb2RlbFZhbGlkYXRpb24sIHRoaXMubW9kZWwsIHRoaXMubW9kZWxDaGFuZ2VkLFxuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdCwgdGhpcy5zZWxlY3RlZE9iamVjdHMsXG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZHJvcE5vZGUsIHRoaXMudXNlckNhbGxiYWNrcy5jcmVhdGVFZGdlLCB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZUFkZGVkLCB0aGlzLnVzZXJDYWxsYmFja3Mubm9kZVJlbW92ZWQsXG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZVJlbW92ZWQsIGVsZW1lbnRbMF0sIGVsZW1lbnRbMF0ucXVlcnlTZWxlY3Rvcignc3ZnJykpO1xuXG4gICAgaWYgKHRoaXMuZHJvcFRhcmdldElkKSB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5kcm9wVGFyZ2V0SWQgPSB0aGlzLmRyb3BUYXJnZXRJZDtcbiAgICB9XG5cbiAgICBjb25zdCBhcHBseUZ1bmN0aW9uID0gdGhpcy56b25lLnJ1bi5iaW5kKHRoaXMuem9uZSk7XG5cbiAgICB0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UgPSBuZXcgRmNOb2RlRHJhZ2dpbmdTZXJ2aWNlKHRoaXMubW9kZWxTZXJ2aWNlLCBhcHBseUZ1bmN0aW9uLFxuICAgICAgICAgIHRoaXMuYXV0b21hdGljUmVzaXplLCB0aGlzLmRyYWdBbmltYXRpb24pO1xuXG4gICAgdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlID0gbmV3IEZjRWRnZURyYWdnaW5nU2VydmljZSh0aGlzLm1vZGVsVmFsaWRhdGlvbiwgdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UsIHRoaXMubW9kZWxTZXJ2aWNlLFxuICAgICAgdGhpcy5tb2RlbCwgdGhpcy51c2VyQ2FsbGJhY2tzLmlzVmFsaWRFZGdlIHx8IG51bGwsIGFwcGx5RnVuY3Rpb24sXG4gICAgICB0aGlzLmRyYWdBbmltYXRpb24sIHRoaXMuZWRnZVN0eWxlKTtcblxuICAgIHRoaXMubW91c2VvdmVyU2VydmljZSA9IG5ldyBGY01vdXNlT3ZlclNlcnZpY2UoYXBwbHlGdW5jdGlvbik7XG5cbiAgICB0aGlzLnJlY3RhbmdsZVNlbGVjdFNlcnZpY2UgPSBuZXcgRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlKHRoaXMubW9kZWxTZXJ2aWNlLFxuICAgICAgZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0LXJlY3RhbmdsZScpLCBhcHBseUZ1bmN0aW9uKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgbm9kZURyYWdzdGFydDogdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdzdGFydC5iaW5kKHRoaXMubm9kZURyYWdnaW5nU2VydmljZSksXG4gICAgICBub2RlRHJhZ2VuZDogdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdlbmQuYmluZCh0aGlzLm5vZGVEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyYWdzdGFydDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdzdGFydC5iaW5kKHRoaXMuZWRnZURyYWdnaW5nU2VydmljZSksXG4gICAgICBlZGdlRHJhZ2VuZDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdlbmQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgZWRnZURyb3A6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcm9wLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnb3ZlckNvbm5lY3RvcjogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyQ29ubmVjdG9yLmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnb3Zlck1hZ25ldDogdGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyTWFnbmV0LmJpbmQodGhpcy5lZGdlRHJhZ2dpbmdTZXJ2aWNlKSxcbiAgICAgIGVkZ2VEcmFnbGVhdmVNYWduZXQ6IHRoaXMuZWRnZURyYWdnaW5nU2VydmljZS5kcmFnbGVhdmVNYWduZXQuYmluZCh0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UpLFxuICAgICAgbm9kZU1vdXNlT3ZlcjogdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLm5vZGVNb3VzZU92ZXIuYmluZCh0aGlzLm1vdXNlb3ZlclNlcnZpY2UpLFxuICAgICAgbm9kZU1vdXNlT3V0OiB0aGlzLm1vdXNlb3ZlclNlcnZpY2Uubm9kZU1vdXNlT3V0LmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIGNvbm5lY3Rvck1vdXNlRW50ZXI6IHRoaXMubW91c2VvdmVyU2VydmljZS5jb25uZWN0b3JNb3VzZUVudGVyLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIGNvbm5lY3Rvck1vdXNlTGVhdmU6IHRoaXMubW91c2VvdmVyU2VydmljZS5jb25uZWN0b3JNb3VzZUxlYXZlLmJpbmQodGhpcy5tb3VzZW92ZXJTZXJ2aWNlKSxcbiAgICAgIG5vZGVDbGlja2VkOiAoZXZlbnQsIG5vZGUpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uubm9kZXMuaGFuZGxlQ2xpY2tlZChub2RlLCBldmVudC5jdHJsS2V5KTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmFkanVzdENhbnZhc1NpemUodGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHQpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICBjb25zdCBub2Rlc0NoYW5nZSA9IHRoaXMubm9kZXNEaWZmZXIuZGlmZih0aGlzLm1vZGVsLm5vZGVzKTtcbiAgICAgIGNvbnN0IGVkZ2VzQ2hhbmdlID0gdGhpcy5lZGdlc0RpZmZlci5kaWZmKHRoaXMubW9kZWwuZWRnZXMpO1xuICAgICAgbGV0IG5vZGVzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgbGV0IGVkZ2VzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgaWYgKG5vZGVzQ2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgIG5vZGVzQ2hhbmdlLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIG5vZGVzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBub2Rlc0NoYW5nZS5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIG5vZGVzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVkZ2VzQ2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgIGVkZ2VzQ2hhbmdlLmZvckVhY2hBZGRlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIGVkZ2VzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGdlc0NoYW5nZS5mb3JFYWNoUmVtb3ZlZEl0ZW0oKCkgPT4ge1xuICAgICAgICAgIGVkZ2VzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLmFkanVzdENhbnZhc1NpemUodGhpcy5maXRNb2RlbFNpemVCeURlZmF1bHQpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVzQ2hhbmdlZCB8fCBlZGdlc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzU3ViamVjdC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RWRnZURBdHRyaWJ1dGUoZWRnZTogRmNFZGdlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlRHJhd2luZ1NlcnZpY2UuZ2V0RWRnZURBdHRyaWJ1dGUodGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuc291cmNlQ29vcmQoZWRnZSksXG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZXN0Q29vcmQoZWRnZSksIHRoaXMuZWRnZVN0eWxlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGp1c3RDYW52YXNTaXplKGZpdD86IGJvb2xlYW4pIHtcbiAgICBsZXQgbWF4WCA9IDA7XG4gICAgbGV0IG1heFkgPSAwO1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLm1vZGVsLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG1heFggPSBNYXRoLm1heChub2RlLnggKyB0aGlzLm5vZGVXaWR0aCwgbWF4WCk7XG4gICAgICBtYXhZID0gTWF0aC5tYXgobm9kZS55ICsgdGhpcy5ub2RlSGVpZ2h0LCBtYXhZKTtcbiAgICB9KTtcbiAgICBsZXQgd2lkdGg7XG4gICAgbGV0IGhlaWdodDtcbiAgICBpZiAoZml0KSB7XG4gICAgICB3aWR0aCA9IG1heFg7XG4gICAgICBoZWlnaHQgPSBtYXhZO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IE1hdGgubWF4KG1heFgsIGVsZW1lbnQucHJvcCgnb2Zmc2V0V2lkdGgnKSk7XG4gICAgICBoZWlnaHQgPSBNYXRoLm1heChtYXhZLCBlbGVtZW50LnByb3AoJ29mZnNldEhlaWdodCcpKTtcbiAgICB9XG4gICAgZWxlbWVudC5jc3MoJ3dpZHRoJywgd2lkdGggKyAncHgnKTtcbiAgICBlbGVtZW50LmNzcygnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICBjYW52YXNDbGljayhldmVudDogTW91c2VFdmVudCkge31cblxuICBlZGdlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGVkZ2VDbGljayhldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UuZWRnZXMuaGFuZGxlRWRnZU1vdXNlQ2xpY2soZWRnZSwgZXZlbnQuY3RybEtleSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VSZW1vdmUoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZS5lZGdlcy5kZWxldGUoZWRnZSk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGVkZ2VFZGl0KGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgaWYgKHRoaXMudXNlckNhbGxiYWNrcy5lZGdlRWRpdCkge1xuICAgICAgdGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VFZGl0KGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkge1xuICAgIGlmICh0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKSB7XG4gICAgICB0aGlzLnVzZXJDYWxsYmFja3MuZWRnZURvdWJsZUNsaWNrKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICBpZiAodGhpcy51c2VyQ2FsbGJhY2tzLmVkZ2VNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMudXNlckNhbGxiYWNrcy5lZGdlTW91c2VPdmVyKGV2ZW50LCBlZGdlKTtcbiAgICB9XG4gIH1cblxuICBlZGdlTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJTZXJ2aWNlLmVkZ2VNb3VzZUVudGVyKGV2ZW50LCBlZGdlKTtcbiAgfVxuXG4gIGVkZ2VNb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlclNlcnZpY2UuZWRnZU1vdXNlTGVhdmUoZXZlbnQsIGVkZ2UpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBkcmFnb3ZlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgdGhpcy5ub2RlRHJhZ2dpbmdTZXJ2aWNlLmRyYWdvdmVyKGV2ZW50KTtcbiAgICB0aGlzLmVkZ2VEcmFnZ2luZ1NlcnZpY2UuZHJhZ292ZXIoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMubm9kZURyYWdnaW5nU2VydmljZS5kcm9wKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZWRvd24oZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgbW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZWN0YW5nbGVTZWxlY3RTZXJ2aWNlLm1vdXNlbW92ZShldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcbiAgbW91c2V1cChldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVjdGFuZ2xlU2VsZWN0U2VydmljZS5tb3VzZXVwKGV2ZW50KTtcbiAgfVxuXG59XG4iLCI8ZGl2IChjbGljayk9XCJjYW52YXNDbGljaygkZXZlbnQpXCIgY2xhc3M9XCJmYy1jYW52YXMtY29udGFpbmVyXCI+XG4gIDxzdmcgY2xhc3M9XCJmYy1jYW52YXMtc3ZnXCI+XG4gICAgPGRlZnM+XG4gICAgICA8bWFya2VyIGNsYXNzPVwiZmMtYXJyb3ctbWFya2VyXCIgW2F0dHIuaWRdPVwiYXJyb3dEZWZJZFwiIG1hcmtlcldpZHRoPVwiNVwiIG1hcmtlckhlaWdodD1cIjVcIiB2aWV3Qm94PVwiLTYgLTYgMTIgMTJcIiByZWZYPVwiMTBcIiByZWZZPVwiMFwiIG1hcmtlclVuaXRzPVwic3Ryb2tlV2lkdGhcIiBvcmllbnQ9XCJhdXRvXCI+XG4gICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIi0yLDAgLTUsNSA1LDAgLTUsLTVcIiBzdHJva2U9XCJncmF5XCIgZmlsbD1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIxcHhcIi8+XG4gICAgICA8L21hcmtlcj5cbiAgICAgIDxtYXJrZXIgY2xhc3M9XCJmYy1hcnJvdy1tYXJrZXItc2VsZWN0ZWRcIiBbYXR0ci5pZF09XCJhcnJvd0RlZklkU2VsZWN0ZWRcIiBtYXJrZXJXaWR0aD1cIjVcIiBtYXJrZXJIZWlnaHQ9XCI1XCIgdmlld0JveD1cIi02IC02IDEyIDEyXCIgcmVmWD1cIjEwXCIgcmVmWT1cIjBcIiBtYXJrZXJVbml0cz1cInN0cm9rZVdpZHRoXCIgb3JpZW50PVwiYXV0b1wiPlxuICAgICAgICA8cG9seWdvbiBwb2ludHM9XCItMiwwIC01LDUgNSwwIC01LC01XCIgc3Ryb2tlPVwicmVkXCIgZmlsbD1cInJlZFwiIHN0cm9rZS13aWR0aD1cIjFweFwiLz5cbiAgICAgIDwvbWFya2VyPlxuICAgIDwvZGVmcz5cbiAgICA8ZyAqbmdGb3I9XCJsZXQgZWRnZSBvZiBtb2RlbC5lZGdlczsgbGV0ICRpbmRleCA9IGluZGV4XCI+XG4gICAgICA8cGF0aFxuICAgICAgICBbYXR0ci5pZF09XCInZmMtZWRnZS1wYXRoLScrJGluZGV4XCJcbiAgICAgICAgKG1vdXNlZG93bik9XCJlZGdlTW91c2VEb3duKCRldmVudCwgZWRnZSlcIlxuICAgICAgICAoY2xpY2spPVwiZWRnZUNsaWNrKCRldmVudCwgZWRnZSlcIlxuICAgICAgICAoZGJsY2xpY2spPVwiZWRnZURvdWJsZUNsaWNrKCRldmVudCwgZWRnZSlcIlxuICAgICAgICAobW91c2VvdmVyKT1cImVkZ2VNb3VzZU92ZXIoJGV2ZW50LCBlZGdlKVwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cImVkZ2VNb3VzZUVudGVyKCRldmVudCwgZWRnZSlcIlxuICAgICAgICAobW91c2VsZWF2ZSk9XCJlZGdlTW91c2VMZWF2ZSgkZXZlbnQsIGVkZ2UpXCJcbiAgICAgICAgW2F0dHIuY2xhc3NdPVwiKG1vZGVsU2VydmljZS5lZGdlcy5pc1NlbGVjdGVkKGVkZ2UpICYmIGZsb3djaGFydENvbnN0YW50cy5zZWxlY3RlZENsYXNzICsgJyAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VDbGFzcykgfHxcbiAgICAgICAgICAgICAgICAgICAgICBlZGdlID09PSBtb3VzZW92ZXJTZXJ2aWNlLm1vdXNlb3ZlcnNjb3BlLmVkZ2UgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLmhvdmVyQ2xhc3MgKyAnICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUNsYXNzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZWRnZS5hY3RpdmUgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLmFjdGl2ZUNsYXNzICsgJyAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VDbGFzcyB8fFxuICAgICAgICAgICAgICAgICAgICAgIGZsb3djaGFydENvbnN0YW50cy5lZGdlQ2xhc3NcIlxuICAgICAgICBbYXR0ci5kXT1cImdldEVkZ2VEQXR0cmlidXRlKGVkZ2UpXCJcbiAgICAgICAgW2F0dHIubWFya2VyLWVuZF09XCIndXJsKCMnICsgKG1vZGVsU2VydmljZS5lZGdlcy5pc1NlbGVjdGVkKGVkZ2UpID8gYXJyb3dEZWZJZFNlbGVjdGVkIDogYXJyb3dEZWZJZCkgKyAnKSdcIj5cbiAgICAgIDwvcGF0aD5cbiAgICA8L2c+XG4gICAgPGcgKm5nSWY9XCJkcmFnQW5pbWF0aW9uID09PSBmbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblJlcGFpbnQgJiYgZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuaXNEcmFnZ2luZ1wiPlxuICAgICAgPHBhdGggW2F0dHIuY2xhc3NdPVwiZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VDbGFzcyArICcgJyArIGZsb3djaGFydENvbnN0YW50cy5kcmFnZ2luZ0NsYXNzXCJcbiAgICAgICAgICAgIFthdHRyLmRdPVwiZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VEQXR0cmlidXRlKGVkZ2VEcmFnZ2luZ1NlcnZpY2UuZWRnZURyYWdnaW5nLmRyYWdQb2ludDEsIGVkZ2VEcmFnZ2luZ1NlcnZpY2UuZWRnZURyYWdnaW5nLmRyYWdQb2ludDIsIGVkZ2VTdHlsZSlcIj48L3BhdGg+XG4gICAgICA8Y2lyY2xlIGNsYXNzPVwiZWRnZS1lbmRwb2ludFwiIHI9XCI0XCJcbiAgICAgICAgICAgICAgW2F0dHIuY3hdPVwiZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi54XCJcbiAgICAgICAgICAgICAgW2F0dHIuY3ldPVwiZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50Mi55XCI+XG4gICAgICA8L2NpcmNsZT5cbiAgICA8L2c+XG4gICAgPGcgKm5nSWY9XCJkcmFnQW5pbWF0aW9uID09PSBmbG93Y2hhcnRDb25zdGFudHMuZHJhZ0FuaW1hdGlvblNoYWRvd1wiXG4gICAgICAgY2xhc3M9XCJzaGFkb3ctc3ZnLWNsYXNzIHt7IGZsb3djaGFydENvbnN0YW50cy5lZGdlQ2xhc3MgfX0ge3sgZmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdnaW5nQ2xhc3MgfX1cIlxuICAgICAgIHN0eWxlPVwiZGlzcGxheTpub25lXCI+XG4gICAgICA8cGF0aCBkPVwiXCI+PC9wYXRoPlxuICAgICAgPGNpcmNsZSBjbGFzcz1cImVkZ2UtZW5kcG9pbnRcIiByPVwiNFwiPjwvY2lyY2xlPlxuICAgIDwvZz5cbiAgPC9zdmc+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG5vZGUgb2YgbW9kZWwubm9kZXNcIj5cbiAgICA8ZmMtbm9kZVxuICAgICAgICAgW3NlbGVjdGVkXT1cIm1vZGVsU2VydmljZS5ub2Rlcy5pc1NlbGVjdGVkKG5vZGUpXCJcbiAgICAgICAgIFtlZGl0XT1cIm1vZGVsU2VydmljZS5ub2Rlcy5pc0VkaXQobm9kZSlcIlxuICAgICAgICAgW3VuZGVyTW91c2VdPVwibm9kZSA9PT0gbW91c2VvdmVyU2VydmljZS5tb3VzZW92ZXJzY29wZS5ub2RlXCJcbiAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICAgW21vdXNlT3ZlckNvbm5lY3Rvcl09XCJtb3VzZW92ZXJTZXJ2aWNlLm1vdXNlb3ZlcnNjb3BlLmNvbm5lY3RvclwiXG4gICAgICAgICBbbW9kZWxzZXJ2aWNlXT1cIm1vZGVsU2VydmljZVwiXG4gICAgICAgICBbZHJhZ2dpbmddPVwibm9kZURyYWdnaW5nU2VydmljZS5pc0RyYWdnaW5nTm9kZShub2RlKVwiXG4gICAgICAgICBbY2FsbGJhY2tzXT1cImNhbGxiYWNrc1wiXG4gICAgICAgICBbdXNlck5vZGVDYWxsYmFja3NdPVwidXNlck5vZGVDYWxsYmFja3NcIj5cbiAgICA8L2ZjLW5vZGU+XG4gIDwvbmctY29udGFpbmVyPlxuICA8ZGl2ICpuZ0lmPVwiZHJhZ0FuaW1hdGlvbiA9PT0gZmxvd2NoYXJ0Q29uc3RhbnRzLmRyYWdBbmltYXRpb25SZXBhaW50ICYmIGVkZ2VEcmFnZ2luZ1NlcnZpY2UuZWRnZURyYWdnaW5nLmlzRHJhZ2dpbmdcIlxuICAgICAgIFthdHRyLmNsYXNzXT1cIidmYy1ub3NlbGVjdCAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VMYWJlbENsYXNzXCJcbiAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgdG9wOiAoZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VDZW50ZXIoZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MikueSkrJ3B4JyxcbiAgICAgICAgICBsZWZ0OiAoZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VDZW50ZXIoZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MSwgZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ1BvaW50MikueCkrJ3B4J1xuICAgICAgIH1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmMtZWRnZS1sYWJlbC10ZXh0XCI+XG4gICAgICA8c3BhbiBbYXR0ci5pZF09XCInZmMtZWRnZS1sYWJlbC1kcmFnZ2luZydcIiAqbmdJZj1cImVkZ2VEcmFnZ2luZ1NlcnZpY2UuZWRnZURyYWdnaW5nLmRyYWdMYWJlbFwiPnt7ZWRnZURyYWdnaW5nU2VydmljZS5lZGdlRHJhZ2dpbmcuZHJhZ0xhYmVsfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2XG4gICAgKG1vdXNlZG93bik9XCJlZGdlTW91c2VEb3duKCRldmVudCwgZWRnZSlcIlxuICAgIChjbGljayk9XCJlZGdlQ2xpY2soJGV2ZW50LCBlZGdlKVwiXG4gICAgKGRibGNsaWNrKT1cImVkZ2VEb3VibGVDbGljaygkZXZlbnQsIGVkZ2UpXCJcbiAgICAobW91c2VvdmVyKT1cImVkZ2VNb3VzZU92ZXIoJGV2ZW50LCBlZGdlKVwiXG4gICAgKG1vdXNlZW50ZXIpPVwiZWRnZU1vdXNlRW50ZXIoJGV2ZW50LCBlZGdlKVwiXG4gICAgKG1vdXNlbGVhdmUpPVwiZWRnZU1vdXNlTGVhdmUoJGV2ZW50LCBlZGdlKVwiXG4gICAgW2F0dHIuY2xhc3NdPVwiJ2ZjLW5vc2VsZWN0ICcgKyAoKG1vZGVsU2VydmljZS5lZGdlcy5pc0VkaXQoZWRnZSkgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkaXRDbGFzcyArICcgJyArIGZsb3djaGFydENvbnN0YW50cy5lZGdlTGFiZWxDbGFzcykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAobW9kZWxTZXJ2aWNlLmVkZ2VzLmlzU2VsZWN0ZWQoZWRnZSkgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLnNlbGVjdGVkQ2xhc3MgKyAnICcgKyBmbG93Y2hhcnRDb25zdGFudHMuZWRnZUxhYmVsQ2xhc3MpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZWRnZSA9PT0gbW91c2VvdmVyU2VydmljZS5tb3VzZW92ZXJzY29wZS5lZGdlICYmIGZsb3djaGFydENvbnN0YW50cy5ob3ZlckNsYXNzICsgJyAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VMYWJlbENsYXNzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZWRnZS5hY3RpdmUgJiYgZmxvd2NoYXJ0Q29uc3RhbnRzLmFjdGl2ZUNsYXNzICsgJyAnICsgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VMYWJlbENsYXNzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZmxvd2NoYXJ0Q29uc3RhbnRzLmVkZ2VMYWJlbENsYXNzKVwiXG4gICAgW25nU3R5bGVdPVwie1xuICAgICAgdG9wOiAoZWRnZURyYXdpbmdTZXJ2aWNlLmdldEVkZ2VDZW50ZXIobW9kZWxTZXJ2aWNlLmVkZ2VzLnNvdXJjZUNvb3JkKGVkZ2UpLCBtb2RlbFNlcnZpY2UuZWRnZXMuZGVzdENvb3JkKGVkZ2UpKS55KSsncHgnLFxuICAgICAgbGVmdDogKGVkZ2VEcmF3aW5nU2VydmljZS5nZXRFZGdlQ2VudGVyKG1vZGVsU2VydmljZS5lZGdlcy5zb3VyY2VDb29yZChlZGdlKSwgbW9kZWxTZXJ2aWNlLmVkZ2VzLmRlc3RDb29yZChlZGdlKSkueCkrJ3B4J1xuICAgIH1cIlxuICAgICpuZ0Zvcj1cImxldCBlZGdlIG9mIG1vZGVsLmVkZ2VzOyBsZXQgJGluZGV4ID0gaW5kZXhcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmMtZWRnZS1sYWJlbC10ZXh0XCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwibW9kZWxTZXJ2aWNlLmlzRWRpdGFibGUoKVwiIGNsYXNzPVwiZmMtbm9zZWxlY3QgZmMtbm9kZWVkaXRcIiAoY2xpY2spPVwiZWRnZUVkaXQoJGV2ZW50LCBlZGdlKVwiPlxuICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cIm1vZGVsU2VydmljZS5pc0VkaXRhYmxlKClcIiBjbGFzcz1cImZjLW5vc2VsZWN0IGZjLW5vZGVkZWxldGVcIiAoY2xpY2spPVwiZWRnZVJlbW92ZSgkZXZlbnQsIGVkZ2UpXCI+XG4gICAgICAgICZ0aW1lcztcbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gW2F0dHIuaWRdPVwiJ2ZjLWVkZ2UtbGFiZWwtJyskaW5kZXhcIiAqbmdJZj1cImVkZ2UubGFiZWxcIj57e2VkZ2UubGFiZWx9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgaWQ9XCJzZWxlY3QtcmVjdGFuZ2xlXCIgY2xhc3M9XCJmYy1zZWxlY3QtcmVjdGFuZ2xlXCIgaGlkZGVuPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19