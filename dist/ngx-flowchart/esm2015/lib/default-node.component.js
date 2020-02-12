import { Component } from '@angular/core';
import { FcNodeComponent } from './node.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./magnet.directive";
import * as i3 from "./connector.directive";
function DefaultFcNodeComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const connector_r42 = ctx.$implicit;
    const ctx_r38 = i0.ɵɵnextContext();
    i0.ɵɵproperty("connector", connector_r42)("callbacks", ctx_r38.callbacks);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("connector", connector_r42)("nodeRectInfo", ctx_r38.nodeRectInfo)("mouseOverConnector", ctx_r38.mouseOverConnector)("callbacks", ctx_r38.callbacks)("modelservice", ctx_r38.modelservice);
} }
function DefaultFcNodeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const connector_r43 = ctx.$implicit;
    const ctx_r39 = i0.ɵɵnextContext();
    i0.ɵɵproperty("connector", connector_r43)("callbacks", ctx_r39.callbacks);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("connector", connector_r43)("nodeRectInfo", ctx_r39.nodeRectInfo)("mouseOverConnector", ctx_r39.mouseOverConnector)("callbacks", ctx_r39.callbacks)("modelservice", ctx_r39.modelservice);
} }
function DefaultFcNodeComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵlistener("click", function DefaultFcNodeComponent_div_9_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r45); const ctx_r44 = i0.ɵɵnextContext(); return ctx_r44.userNodeCallbacks.nodeEdit($event, ctx_r44.node); });
    i0.ɵɵelement(1, "i", 8);
    i0.ɵɵelementEnd();
} }
function DefaultFcNodeComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵlistener("click", function DefaultFcNodeComponent_div_10_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r47); const ctx_r46 = i0.ɵɵnextContext(); return ctx_r46.modelservice.nodes.delete(ctx_r46.node); });
    i0.ɵɵtext(1, " \u00D7 ");
    i0.ɵɵelementEnd();
} }
export class DefaultFcNodeComponent extends FcNodeComponent {
    constructor() {
        super();
    }
}
DefaultFcNodeComponent.ɵfac = function DefaultFcNodeComponent_Factory(t) { return new (t || DefaultFcNodeComponent)(); };
DefaultFcNodeComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DefaultFcNodeComponent, selectors: [["fc-default-node"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 11, vars: 14, consts: [[3, "dblclick"], [1, "innerNode"], ["fc-magnet", "", 3, "connector", "callbacks", 4, "ngFor", "ngForOf"], ["class", "fc-nodeedit", 3, "click", 4, "ngIf"], ["class", "fc-nodedelete", 3, "click", 4, "ngIf"], ["fc-magnet", "", 3, "connector", "callbacks"], ["fc-connector", "", 3, "connector", "nodeRectInfo", "mouseOverConnector", "callbacks", "modelservice"], [1, "fc-nodeedit", 3, "click"], ["aria-hidden", "true", 1, "fa", "fa-pencil"], [1, "fc-nodedelete", 3, "click"]], template: function DefaultFcNodeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("dblclick", function DefaultFcNodeComponent_Template_div_dblclick_0_listener($event) { return ctx.userNodeCallbacks.doubleClick($event, ctx.node); });
        i0.ɵɵelement(1, "div");
        i0.ɵɵelementStart(2, "div", 1);
        i0.ɵɵelementStart(3, "p");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div");
        i0.ɵɵtemplate(6, DefaultFcNodeComponent_div_6_Template, 2, 7, "div", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div");
        i0.ɵɵtemplate(8, DefaultFcNodeComponent_div_8_Template, 2, 7, "div", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, DefaultFcNodeComponent_div_9_Template, 2, 0, "div", 3);
        i0.ɵɵtemplate(10, DefaultFcNodeComponent_div_10_Template, 2, 0, "div", 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap(ctx.flowchartConstants.nodeOverlayClass);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.node.name);
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap(ctx.flowchartConstants.leftConnectorClass);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.modelservice.nodes.getConnectorsByType(ctx.node, ctx.flowchartConstants.leftConnectorType));
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap(ctx.flowchartConstants.rightConnectorClass);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.modelservice.nodes.getConnectorsByType(ctx.node, ctx.flowchartConstants.rightConnectorType));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.modelservice.isEditable() && !ctx.node.readonly);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.modelservice.isEditable() && !ctx.node.readonly);
    } }, directives: [i1.NgForOf, i1.NgIf, i2.FcMagnetDirective, i3.FcConnectorDirective], styles: ["[_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%]{position:absolute;pointer-events:none;left:0;top:0;right:0;bottom:0;background-color:#000;opacity:0}[_nghost-%COMP%]   .fc-hover[_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%], .fc-hover   [_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%]{opacity:.25;-webkit-transition:opacity .2s;transition:opacity .2s}[_nghost-%COMP%]   .fc-selected[_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%], .fc-selected   [_nghost-%COMP%]   .fc-node-overlay[_ngcontent-%COMP%]{opacity:.25}[_nghost-%COMP%]   .innerNode[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}[_nghost-%COMP%]   .innerNode[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0 15px;text-align:center}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DefaultFcNodeComponent, [{
        type: Component,
        args: [{
                selector: 'fc-default-node',
                templateUrl: './default-node.component.html',
                styleUrls: ['./default-node.component.scss']
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvZGVmYXVsdC1ub2RlLmNvbXBvbmVudC50cyIsImxpYi9kZWZhdWx0LW5vZGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztJQ003Qyw4QkFFRTtJQUFBLHlCQUl5QztJQUMzQyxpQkFBTTs7OztJQVBTLHlDQUF1QixnQ0FBQTtJQUVsQixlQUF1QjtJQUF2Qix5Q0FBdUIsc0NBQUEsa0RBQUEsZ0NBQUEsc0NBQUE7OztJQVEzQyw4QkFFRTtJQUFBLHlCQUl5QztJQUMzQyxpQkFBTTs7OztJQVBTLHlDQUF1QixnQ0FBQTtJQUVsQixlQUF1QjtJQUF2Qix5Q0FBdUIsc0NBQUEsa0RBQUEsZ0NBQUEsc0NBQUE7Ozs7SUFRL0MsOEJBQ0U7SUFEMkUsd0tBQVMsd0RBQXdDLElBQUM7SUFDN0gsdUJBQStDO0lBQ2pELGlCQUFNOzs7O0lBQ04sOEJBQ0U7SUFENkUseUtBQVMsK0NBQStCLElBQUM7SUFDdEgsd0JBQ0Y7SUFBQSxpQkFBTTs7QUR4QlIsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGVBQWU7SUFFekQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7OzRGQUpVLHNCQUFzQjsyREFBdEIsc0JBQXNCO1FDUm5DLDhCQUVFO1FBREEsNEdBQVksbURBQTJDLElBQUM7UUFDeEQsc0JBQTJEO1FBQzNELDhCQUNFO1FBQUEseUJBQUc7UUFBQSxZQUFlO1FBQUEsaUJBQUk7UUFFdEIsMkJBQ0U7UUFBQSx1RUFFRTtRQU1KLGlCQUFNO1FBQ04sMkJBQ0U7UUFBQSx1RUFFRTtRQU1KLGlCQUFNO1FBQ1IsaUJBQU07UUFDTix1RUFDRTtRQUVGLHlFQUNFO1FBRUosaUJBQU07O1FBL0JDLGVBQStDO1FBQS9DLHNEQUErQztRQUUvQyxlQUFlO1FBQWYsbUNBQWU7UUFFYixlQUFpRDtRQUFqRCx3REFBaUQ7UUFFL0MsZUFBNEc7UUFBNUcsd0hBQTRHO1FBUTlHLGVBQWtEO1FBQWxELHlEQUFrRDtRQUVoRCxlQUE2RztRQUE3Ryx5SEFBNkc7UUFTakgsZUFBbUQ7UUFBbkQsMEVBQW1EO1FBR25ELGVBQW1EO1FBQW5ELDBFQUFtRDs7a0REdEI3QyxzQkFBc0I7Y0FMbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSwrQkFBK0I7Z0JBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO2FBQzdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY05vZGVDb21wb25lbnQgfSBmcm9tICcuL25vZGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmMtZGVmYXVsdC1ub2RlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RlZmF1bHQtbm9kZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RlZmF1bHQtbm9kZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRGY05vZGVDb21wb25lbnQgZXh0ZW5kcyBGY05vZGVDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxufVxuIiwiPGRpdlxuICAoZGJsY2xpY2spPVwidXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2soJGV2ZW50LCBub2RlKVwiPlxuICA8ZGl2IGNsYXNzPVwie3tmbG93Y2hhcnRDb25zdGFudHMubm9kZU92ZXJsYXlDbGFzc319XCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJpbm5lck5vZGVcIj5cbiAgICA8cD57eyBub2RlLm5hbWUgfX08L3A+XG5cbiAgICA8ZGl2IGNsYXNzPVwie3tmbG93Y2hhcnRDb25zdGFudHMubGVmdENvbm5lY3RvckNsYXNzfX1cIj5cbiAgICAgIDxkaXYgZmMtbWFnbmV0IFtjb25uZWN0b3JdPVwiY29ubmVjdG9yXCIgW2NhbGxiYWNrc109XCJjYWxsYmFja3NcIlxuICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29ubmVjdG9yIG9mIG1vZGVsc2VydmljZS5ub2Rlcy5nZXRDb25uZWN0b3JzQnlUeXBlKG5vZGUsIGZsb3djaGFydENvbnN0YW50cy5sZWZ0Q29ubmVjdG9yVHlwZSlcIj5cbiAgICAgICAgPGRpdiBmYy1jb25uZWN0b3IgW2Nvbm5lY3Rvcl09XCJjb25uZWN0b3JcIlxuICAgICAgICAgICAgIFtub2RlUmVjdEluZm9dPVwibm9kZVJlY3RJbmZvXCJcbiAgICAgICAgICAgICBbbW91c2VPdmVyQ29ubmVjdG9yXT1cIm1vdXNlT3ZlckNvbm5lY3RvclwiXG4gICAgICAgICAgICAgW2NhbGxiYWNrc109XCJjYWxsYmFja3NcIlxuICAgICAgICAgICAgIFttb2RlbHNlcnZpY2VdPVwibW9kZWxzZXJ2aWNlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwie3tmbG93Y2hhcnRDb25zdGFudHMucmlnaHRDb25uZWN0b3JDbGFzc319XCI+XG4gICAgICA8ZGl2IGZjLW1hZ25ldCBbY29ubmVjdG9yXT1cImNvbm5lY3RvclwiIFtjYWxsYmFja3NdPVwiY2FsbGJhY2tzXCJcbiAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbm5lY3RvciBvZiBtb2RlbHNlcnZpY2Uubm9kZXMuZ2V0Q29ubmVjdG9yc0J5VHlwZShub2RlLCBmbG93Y2hhcnRDb25zdGFudHMucmlnaHRDb25uZWN0b3JUeXBlKVwiPlxuICAgICAgICA8ZGl2IGZjLWNvbm5lY3RvciBbY29ubmVjdG9yXT1cImNvbm5lY3RvclwiXG4gICAgICAgICAgICAgW25vZGVSZWN0SW5mb109XCJub2RlUmVjdEluZm9cIlxuICAgICAgICAgICAgIFttb3VzZU92ZXJDb25uZWN0b3JdPVwibW91c2VPdmVyQ29ubmVjdG9yXCJcbiAgICAgICAgICAgICBbY2FsbGJhY2tzXT1cImNhbGxiYWNrc1wiXG4gICAgICAgICAgICAgW21vZGVsc2VydmljZV09XCJtb2RlbHNlcnZpY2VcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkgJiYgIW5vZGUucmVhZG9ubHlcIiBjbGFzcz1cImZjLW5vZGVlZGl0XCIgKGNsaWNrKT1cInVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0KCRldmVudCwgbm9kZSlcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpICYmICFub2RlLnJlYWRvbmx5XCIgY2xhc3M9XCJmYy1ub2RlZGVsZXRlXCIgKGNsaWNrKT1cIm1vZGVsc2VydmljZS5ub2Rlcy5kZWxldGUobm9kZSlcIj5cbiAgICAmdGltZXM7XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=