import { Injectable, ɵɵdefineInjectable, Component, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFlowchartService = /** @class */ (function () {
    function NgxFlowchartService() {
    }
    NgxFlowchartService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxFlowchartService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxFlowchartService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxFlowchartService_Factory() { return new NgxFlowchartService(); }, token: NgxFlowchartService, providedIn: "root" });
    return NgxFlowchartService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFlowchartComponent = /** @class */ (function () {
    function NgxFlowchartComponent() {
    }
    /**
     * @return {?}
     */
    NgxFlowchartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    NgxFlowchartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fc-canvas',
                    template: "\n    <p>\n      ngx-flowchart works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    NgxFlowchartComponent.ctorParameters = function () { return []; };
    return NgxFlowchartComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFlowchartModule = /** @class */ (function () {
    function NgxFlowchartModule() {
    }
    NgxFlowchartModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgxFlowchartComponent],
                    imports: [],
                    exports: [NgxFlowchartComponent]
                },] }
    ];
    return NgxFlowchartModule;
}());

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
