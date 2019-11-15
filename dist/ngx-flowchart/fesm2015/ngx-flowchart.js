import { Injectable, ɵɵdefineInjectable, Component, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFlowchartService {
    constructor() { }
}
NgxFlowchartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxFlowchartService.ctorParameters = () => [];
/** @nocollapse */ NgxFlowchartService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxFlowchartService_Factory() { return new NgxFlowchartService(); }, token: NgxFlowchartService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFlowchartComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NgxFlowchartComponent.decorators = [
    { type: Component, args: [{
                selector: 'fc-canvas',
                template: `
    <p>
      ngx-flowchart works!
    </p>
  `
            }] }
];
/** @nocollapse */
NgxFlowchartComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxFlowchartModule {
}
NgxFlowchartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxFlowchartComponent],
                imports: [],
                exports: [NgxFlowchartComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxFlowchartComponent, NgxFlowchartModule, NgxFlowchartService };
//# sourceMappingURL=ngx-flowchart.js.map
