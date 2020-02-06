/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FcNodeComponent } from './node.component';
export class DefaultFcNodeComponent extends FcNodeComponent {
    constructor() {
        super();
    }
}
DefaultFcNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'fc-default-node',
                template: "<div\n  (dblclick)=\"userNodeCallbacks.doubleClick($event, node)\">\n  <div class=\"{{flowchartConstants.nodeOverlayClass}}\"></div>\n  <div class=\"innerNode\">\n    <p>{{ node.name }}</p>\n\n    <div class=\"{{flowchartConstants.leftConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n    <div class=\"{{flowchartConstants.rightConnectorClass}}\">\n      <div fc-magnet [connector]=\"connector\" [callbacks]=\"callbacks\"\n           *ngFor=\"let connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType)\">\n        <div fc-connector [connector]=\"connector\"\n             [nodeRectInfo]=\"nodeRectInfo\"\n             [mouseOverConnector]=\"mouseOverConnector\"\n             [callbacks]=\"callbacks\"\n             [modelservice]=\"modelservice\"></div>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodeedit\" (click)=\"userNodeCallbacks.nodeEdit($event, node)\">\n    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n  </div>\n  <div *ngIf=\"modelservice.isEditable() && !node.readonly\" class=\"fc-nodedelete\" (click)=\"modelservice.nodes.delete(node)\">\n    &times;\n  </div>\n</div>\n",
                styles: [":host .fc-node-overlay{position:absolute;pointer-events:none;left:0;top:0;right:0;bottom:0;background-color:#000;opacity:0}:host :host-context(.fc-hover) .fc-node-overlay{opacity:.25;transition:opacity .2s}:host :host-context(.fc-selected) .fc-node-overlay{opacity:.25}:host .innerNode{display:flex;justify-content:center;align-items:center;min-width:100px;border-radius:5px;background-color:#f15b26;color:#fff;font-size:16px;pointer-events:none}:host .innerNode p{padding:0 15px;text-align:center}"]
            }] }
];
/** @nocollapse */
DefaultFcNodeComponent.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mbG93Y2hhcnQvIiwic291cmNlcyI6WyJsaWIvZGVmYXVsdC1ub2RlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFPbkQsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGVBQWU7SUFFekQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7OztZQVRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiwwbkRBQTRDOzthQUU3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9ub2RlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZjLWRlZmF1bHQtbm9kZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kZWZhdWx0LW5vZGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kZWZhdWx0LW5vZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmNOb2RlQ29tcG9uZW50IGV4dGVuZHMgRmNOb2RlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbn1cbiJdfQ==