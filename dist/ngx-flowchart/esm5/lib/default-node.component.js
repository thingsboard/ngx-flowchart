import { __extends } from "tslib";
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
    var connector_r90 = ctx.$implicit;
    var ctx_r86 = i0.ɵɵnextContext();
    i0.ɵɵproperty("connector", connector_r90)("callbacks", ctx_r86.callbacks);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("connector", connector_r90)("nodeRectInfo", ctx_r86.nodeRectInfo)("mouseOverConnector", ctx_r86.mouseOverConnector)("callbacks", ctx_r86.callbacks)("modelservice", ctx_r86.modelservice);
} }
function DefaultFcNodeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var connector_r91 = ctx.$implicit;
    var ctx_r87 = i0.ɵɵnextContext();
    i0.ɵɵproperty("connector", connector_r91)("callbacks", ctx_r87.callbacks);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("connector", connector_r91)("nodeRectInfo", ctx_r87.nodeRectInfo)("mouseOverConnector", ctx_r87.mouseOverConnector)("callbacks", ctx_r87.callbacks)("modelservice", ctx_r87.modelservice);
} }
function DefaultFcNodeComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    var _r93 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵlistener("click", function DefaultFcNodeComponent_div_9_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r93); var ctx_r92 = i0.ɵɵnextContext(); return ctx_r92.userNodeCallbacks.nodeEdit($event, ctx_r92.node); });
    i0.ɵɵelement(1, "i", 8);
    i0.ɵɵelementEnd();
} }
function DefaultFcNodeComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    var _r95 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵlistener("click", function DefaultFcNodeComponent_div_10_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r95); var ctx_r94 = i0.ɵɵnextContext(); return ctx_r94.modelservice.nodes.delete(ctx_r94.node); });
    i0.ɵɵtext(1, " \u00D7 ");
    i0.ɵɵelementEnd();
} }
var DefaultFcNodeComponent = /** @class */ (function (_super) {
    __extends(DefaultFcNodeComponent, _super);
    function DefaultFcNodeComponent() {
        return _super.call(this) || this;
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
    return DefaultFcNodeComponent;
}(FcNodeComponent));
export { DefaultFcNodeComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DefaultFcNodeComponent, [{
        type: Component,
        args: [{
                selector: 'fc-default-node',
                templateUrl: './default-node.component.html',
                styleUrls: ['./default-node.component.scss']
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvZGVmYXVsdC1ub2RlLmNvbXBvbmVudC50cyIsImxpYi9kZWZhdWx0LW5vZGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7SUNNN0MsOEJBRUU7SUFBQSx5QkFJeUM7SUFDM0MsaUJBQU07Ozs7SUFQUyx5Q0FBdUIsZ0NBQUE7SUFFbEIsZUFBdUI7SUFBdkIseUNBQXVCLHNDQUFBLGtEQUFBLGdDQUFBLHNDQUFBOzs7SUFRM0MsOEJBRUU7SUFBQSx5QkFJeUM7SUFDM0MsaUJBQU07Ozs7SUFQUyx5Q0FBdUIsZ0NBQUE7SUFFbEIsZUFBdUI7SUFBdkIseUNBQXVCLHNDQUFBLGtEQUFBLGdDQUFBLHNDQUFBOzs7O0lBUS9DLDhCQUNFO0lBRDJFLHNLQUFTLHdEQUF3QyxJQUFDO0lBQzdILHVCQUErQztJQUNqRCxpQkFBTTs7OztJQUNOLDhCQUNFO0lBRDZFLHVLQUFTLCtDQUErQixJQUFDO0lBQ3RILHdCQUNGO0lBQUEsaUJBQU07O0FEN0JSO0lBSzRDLDBDQUFlO0lBRXpEO2VBQ0UsaUJBQU87SUFDVCxDQUFDO2dHQUpVLHNCQUFzQjsrREFBdEIsc0JBQXNCO1lDUm5DLDhCQUVFO1lBREEsNEdBQVksbURBQTJDLElBQUM7WUFDeEQsc0JBQTJEO1lBQzNELDhCQUNFO1lBQUEseUJBQUc7WUFBQSxZQUFlO1lBQUEsaUJBQUk7WUFFdEIsMkJBQ0U7WUFBQSx1RUFFRTtZQU1KLGlCQUFNO1lBQ04sMkJBQ0U7WUFBQSx1RUFFRTtZQU1KLGlCQUFNO1lBQ1IsaUJBQU07WUFDTix1RUFDRTtZQUVGLHlFQUNFO1lBRUosaUJBQU07O1lBL0JDLGVBQStDO1lBQS9DLHNEQUErQztZQUUvQyxlQUFlO1lBQWYsbUNBQWU7WUFFYixlQUFpRDtZQUFqRCx3REFBaUQ7WUFFL0MsZUFBNEc7WUFBNUcsd0hBQTRHO1lBUTlHLGVBQWtEO1lBQWxELHlEQUFrRDtZQUVoRCxlQUE2RztZQUE3Ryx5SEFBNkc7WUFTakgsZUFBbUQ7WUFBbkQsMEVBQW1EO1lBR25ELGVBQW1EO1lBQW5ELDBFQUFtRDs7aUNEOUIxRDtDQWNDLEFBWEQsQ0FLNEMsZUFBZSxHQU0xRDtTQU5ZLHNCQUFzQjtrREFBdEIsc0JBQXNCO2NBTGxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQzthQUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9ub2RlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLWRlZmF1bHQtbm9kZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kZWZhdWx0LW5vZGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kZWZhdWx0LW5vZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmNOb2RlQ29tcG9uZW50IGV4dGVuZHMgRmNOb2RlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbn1cbiIsIjxkaXZcbiAgKGRibGNsaWNrKT1cInVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrKCRldmVudCwgbm9kZSlcIj5cbiAgPGRpdiBjbGFzcz1cInt7Zmxvd2NoYXJ0Q29uc3RhbnRzLm5vZGVPdmVybGF5Q2xhc3N9fVwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiaW5uZXJOb2RlXCI+XG4gICAgPHA+e3sgbm9kZS5uYW1lIH19PC9wPlxuXG4gICAgPGRpdiBjbGFzcz1cInt7Zmxvd2NoYXJ0Q29uc3RhbnRzLmxlZnRDb25uZWN0b3JDbGFzc319XCI+XG4gICAgICA8ZGl2IGZjLW1hZ25ldCBbY29ubmVjdG9yXT1cImNvbm5lY3RvclwiIFtjYWxsYmFja3NdPVwiY2FsbGJhY2tzXCJcbiAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbm5lY3RvciBvZiBtb2RlbHNlcnZpY2Uubm9kZXMuZ2V0Q29ubmVjdG9yc0J5VHlwZShub2RlLCBmbG93Y2hhcnRDb25zdGFudHMubGVmdENvbm5lY3RvclR5cGUpXCI+XG4gICAgICAgIDxkaXYgZmMtY29ubmVjdG9yIFtjb25uZWN0b3JdPVwiY29ubmVjdG9yXCJcbiAgICAgICAgICAgICBbbm9kZVJlY3RJbmZvXT1cIm5vZGVSZWN0SW5mb1wiXG4gICAgICAgICAgICAgW21vdXNlT3ZlckNvbm5lY3Rvcl09XCJtb3VzZU92ZXJDb25uZWN0b3JcIlxuICAgICAgICAgICAgIFtjYWxsYmFja3NdPVwiY2FsbGJhY2tzXCJcbiAgICAgICAgICAgICBbbW9kZWxzZXJ2aWNlXT1cIm1vZGVsc2VydmljZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInt7Zmxvd2NoYXJ0Q29uc3RhbnRzLnJpZ2h0Q29ubmVjdG9yQ2xhc3N9fVwiPlxuICAgICAgPGRpdiBmYy1tYWduZXQgW2Nvbm5lY3Rvcl09XCJjb25uZWN0b3JcIiBbY2FsbGJhY2tzXT1cImNhbGxiYWNrc1wiXG4gICAgICAgICAgICpuZ0Zvcj1cImxldCBjb25uZWN0b3Igb2YgbW9kZWxzZXJ2aWNlLm5vZGVzLmdldENvbm5lY3RvcnNCeVR5cGUobm9kZSwgZmxvd2NoYXJ0Q29uc3RhbnRzLnJpZ2h0Q29ubmVjdG9yVHlwZSlcIj5cbiAgICAgICAgPGRpdiBmYy1jb25uZWN0b3IgW2Nvbm5lY3Rvcl09XCJjb25uZWN0b3JcIlxuICAgICAgICAgICAgIFtub2RlUmVjdEluZm9dPVwibm9kZVJlY3RJbmZvXCJcbiAgICAgICAgICAgICBbbW91c2VPdmVyQ29ubmVjdG9yXT1cIm1vdXNlT3ZlckNvbm5lY3RvclwiXG4gICAgICAgICAgICAgW2NhbGxiYWNrc109XCJjYWxsYmFja3NcIlxuICAgICAgICAgICAgIFttb2RlbHNlcnZpY2VdPVwibW9kZWxzZXJ2aWNlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpICYmICFub2RlLnJlYWRvbmx5XCIgY2xhc3M9XCJmYy1ub2RlZWRpdFwiIChjbGljayk9XCJ1c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCgkZXZlbnQsIG5vZGUpXCI+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1wZW5jaWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwibW9kZWxzZXJ2aWNlLmlzRWRpdGFibGUoKSAmJiAhbm9kZS5yZWFkb25seVwiIGNsYXNzPVwiZmMtbm9kZWRlbGV0ZVwiIChjbGljayk9XCJtb2RlbHNlcnZpY2Uubm9kZXMuZGVsZXRlKG5vZGUpXCI+XG4gICAgJnRpbWVzO1xuICA8L2Rpdj5cbjwvZGl2PlxuIl19