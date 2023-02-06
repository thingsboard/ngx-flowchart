import { Component } from '@angular/core';
import { FcNodeComponent } from './node.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./magnet.directive";
import * as i3 from "./connector.directive";
export class DefaultFcNodeComponent extends FcNodeComponent {
    constructor() {
        super();
    }
}
DefaultFcNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: DefaultFcNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultFcNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: DefaultFcNodeComponent, selector: "fc-default-node", usesInheritance: true, ngImport: i0, template: "<div\n  (dblclick)=\"userNodeCallbacks.doubleClick($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n    &times;\n  </div>\n</div>\n", styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;inset:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.FcMagnetDirective, selector: "[fc-magnet]", inputs: ["callbacks", "connector"] }, { kind: "directive", type: i3.FcConnectorDirective, selector: "[fc-connector]", inputs: ["callbacks", "modelservice", "connector", "nodeRectInfo", "mouseOverConnector"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: DefaultFcNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'fc-default-node', template: "<div\n  (dblclick)=\"userNodeCallbacks.doubleClick($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n    &times;\n  </div>\n</div>\n", styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;inset:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}\n"] }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mbG93Y2hhcnQvc3JjL2xpYi9kZWZhdWx0LW5vZGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWZsb3djaGFydC9zcmMvbGliL2RlZmF1bHQtbm9kZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFRbkQsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGVBQWU7SUFFekQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7O29IQUpVLHNCQUFzQjt3R0FBdEIsc0JBQXNCLDhFQ1RuQyxnbkRBa0NBOzRGRHpCYSxzQkFBc0I7a0JBTmxDLFNBQVM7K0JBRUUsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY05vZGVDb21wb25lbnQgfSBmcm9tICcuL25vZGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnZmMtZGVmYXVsdC1ub2RlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RlZmF1bHQtbm9kZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RlZmF1bHQtbm9kZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRGY05vZGVDb21wb25lbnQgZXh0ZW5kcyBGY05vZGVDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxufVxuIiwiPGRpdlxuICAoZGJsY2xpY2spPVwidXNlck5vZGVDYWxsYmFja3MuZG91YmxlQ2xpY2soJGV2ZW50LCBub2RlKVwiPlxuICA8ZGl2IGNsYXNzPVwie3tmbG93Y2hhcnRDb25zdGFudHMubm9kZU92ZXJsYXlDbGFzc319XCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJpbm5lck5vZGVcIj5cbiAgICA8cD57eyBub2RlLm5hbWUgfX08L3A+XG5cbiAgICA8ZGl2IGNsYXNzPVwie3tmbG93Y2hhcnRDb25zdGFudHMubGVmdENvbm5lY3RvckNsYXNzfX1cIj5cbiAgICAgIDxkaXYgZmMtbWFnbmV0IFtjb25uZWN0b3JdPVwiY29ubmVjdG9yXCIgW2NhbGxiYWNrc109XCJjYWxsYmFja3NcIlxuICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29ubmVjdG9yIG9mIG1vZGVsc2VydmljZS5ub2Rlcy5nZXRDb25uZWN0b3JzQnlUeXBlKG5vZGUsIGZsb3djaGFydENvbnN0YW50cy5sZWZ0Q29ubmVjdG9yVHlwZSlcIj5cbiAgICAgICAgPGRpdiBmYy1jb25uZWN0b3IgW2Nvbm5lY3Rvcl09XCJjb25uZWN0b3JcIlxuICAgICAgICAgICAgIFtub2RlUmVjdEluZm9dPVwibm9kZVJlY3RJbmZvXCJcbiAgICAgICAgICAgICBbbW91c2VPdmVyQ29ubmVjdG9yXT1cIm1vdXNlT3ZlckNvbm5lY3RvclwiXG4gICAgICAgICAgICAgW2NhbGxiYWNrc109XCJjYWxsYmFja3NcIlxuICAgICAgICAgICAgIFttb2RlbHNlcnZpY2VdPVwibW9kZWxzZXJ2aWNlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwie3tmbG93Y2hhcnRDb25zdGFudHMucmlnaHRDb25uZWN0b3JDbGFzc319XCI+XG4gICAgICA8ZGl2IGZjLW1hZ25ldCBbY29ubmVjdG9yXT1cImNvbm5lY3RvclwiIFtjYWxsYmFja3NdPVwiY2FsbGJhY2tzXCJcbiAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbm5lY3RvciBvZiBtb2RlbHNlcnZpY2Uubm9kZXMuZ2V0Q29ubmVjdG9yc0J5VHlwZShub2RlLCBmbG93Y2hhcnRDb25zdGFudHMucmlnaHRDb25uZWN0b3JUeXBlKVwiPlxuICAgICAgICA8ZGl2IGZjLWNvbm5lY3RvciBbY29ubmVjdG9yXT1cImNvbm5lY3RvclwiXG4gICAgICAgICAgICAgW25vZGVSZWN0SW5mb109XCJub2RlUmVjdEluZm9cIlxuICAgICAgICAgICAgIFttb3VzZU92ZXJDb25uZWN0b3JdPVwibW91c2VPdmVyQ29ubmVjdG9yXCJcbiAgICAgICAgICAgICBbY2FsbGJhY2tzXT1cImNhbGxiYWNrc1wiXG4gICAgICAgICAgICAgW21vZGVsc2VydmljZV09XCJtb2RlbHNlcnZpY2VcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm1vZGVsc2VydmljZS5pc0VkaXRhYmxlKCkgJiYgIW5vZGUucmVhZG9ubHlcIiBjbGFzcz1cImZjLW5vZGVlZGl0XCIgKGNsaWNrKT1cInVzZXJOb2RlQ2FsbGJhY2tzLm5vZGVFZGl0KCRldmVudCwgbm9kZSlcIj5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtb2RlbHNlcnZpY2UuaXNFZGl0YWJsZSgpICYmICFub2RlLnJlYWRvbmx5XCIgY2xhc3M9XCJmYy1ub2RlZGVsZXRlXCIgKGNsaWNrKT1cIm1vZGVsc2VydmljZS5ub2Rlcy5kZWxldGUobm9kZSlcIj5cbiAgICAmdGltZXM7XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=