(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-flowchart', ['exports', '@angular/core'], factory) :
    (global = global || self, factory(global['ngx-flowchart'] = {}, global.ng.core));
}(this, (function (exports, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFlowchartService = /** @class */ (function () {
        function NgxFlowchartService() {
        }
        NgxFlowchartService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxFlowchartService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxFlowchartService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function NgxFlowchartService_Factory() { return new NgxFlowchartService(); }, token: NgxFlowchartService, providedIn: "root" });
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
            { type: core.Component, args: [{
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
            { type: core.NgModule, args: [{
                        declarations: [NgxFlowchartComponent],
                        imports: [],
                        exports: [NgxFlowchartComponent]
                    },] }
        ];
        return NgxFlowchartModule;
    }());

    exports.NgxFlowchartComponent = NgxFlowchartComponent;
    exports.NgxFlowchartModule = NgxFlowchartModule;
    exports.NgxFlowchartService = NgxFlowchartService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-flowchart.umd.js.map
