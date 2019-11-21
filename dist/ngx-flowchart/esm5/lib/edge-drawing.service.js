/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
var FcEdgeDrawingService = /** @class */ (function () {
    function FcEdgeDrawingService() {
    }
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @param {?} style
     * @return {?}
     */
    FcEdgeDrawingService.prototype.getEdgeDAttribute = /**
     * @param {?} pt1
     * @param {?} pt2
     * @param {?} style
     * @return {?}
     */
    function (pt1, pt2, style) {
        /** @type {?} */
        var dAddribute = "M " + pt1.x + ", " + pt1.y + " ";
        if (style === FlowchartConstants.curvedStyle) {
            /** @type {?} */
            var sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            /** @type {?} */
            var destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += "C " + sourceTangent.x + ", " + sourceTangent.y + " " + (destinationTangent.x - 50) + ", " + destinationTangent.y + " " + pt2.x + ", " + pt2.y;
        }
        else {
            dAddribute += "L " + pt2.x + ", " + pt2.y;
        }
        return dAddribute;
    };
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.getEdgeCenter = /**
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    };
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.computeEdgeTangentOffset = /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    };
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.computeEdgeSourceTangent = /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    FcEdgeDrawingService.prototype.computeEdgeDestinationTangent = /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    function (pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    FcEdgeDrawingService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FcEdgeDrawingService.ctorParameters = function () { return []; };
    return FcEdgeDrawingService;
}());
export { FcEdgeDrawingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmF3aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL2VkZ2UtZHJhd2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBWSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRFO0lBR0U7SUFDQSxDQUFDOzs7Ozs7O0lBRU0sZ0RBQWlCOzs7Ozs7SUFBeEIsVUFBeUIsR0FBYSxFQUFFLEdBQWEsRUFBRSxLQUFhOztZQUM5RCxVQUFVLEdBQUcsT0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQUc7UUFDeEMsSUFBSSxLQUFLLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFOztnQkFDdEMsYUFBYSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOztnQkFDdkQsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDdkUsVUFBVSxJQUFJLE9BQUssYUFBYSxDQUFDLENBQUMsVUFBSyxhQUFhLENBQUMsQ0FBQyxTQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFLLGtCQUFrQixDQUFDLENBQUMsU0FBSSxHQUFHLENBQUMsQ0FBQyxVQUFLLEdBQUcsQ0FBQyxDQUFHLENBQUM7U0FDckk7YUFBTTtZQUNMLFVBQVUsSUFBSSxPQUFLLEdBQUcsQ0FBQyxDQUFDLFVBQUssR0FBRyxDQUFDLENBQUcsQ0FBQztTQUN0QztRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVNLDRDQUFhOzs7OztJQUFwQixVQUFxQixHQUFhLEVBQUUsR0FBYTtRQUMvQyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN0QixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3ZCLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sdURBQXdCOzs7Ozs7SUFBaEMsVUFBaUMsR0FBYSxFQUFFLEdBQWE7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBRU8sdURBQXdCOzs7Ozs7SUFBaEMsVUFBaUMsR0FBYSxFQUFFLEdBQWE7UUFDM0QsT0FBTztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ25ELENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sNERBQTZCOzs7Ozs7SUFBckMsVUFBc0MsR0FBYSxFQUFFLEdBQWE7UUFDaEUsT0FBTztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ25ELENBQUM7SUFDSixDQUFDOztnQkF6Q0YsVUFBVTs7OztJQTJDWCwyQkFBQztDQUFBLEFBM0NELElBMkNDO1NBMUNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjQ29vcmRzLCBGbG93Y2hhcnRDb25zdGFudHMgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZjRWRnZURyYXdpbmdTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlREF0dHJpYnV0ZShwdDE6IEZjQ29vcmRzLCBwdDI6IEZjQ29vcmRzLCBzdHlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgZEFkZHJpYnV0ZSA9IGBNICR7cHQxLnh9LCAke3B0MS55fSBgO1xuICAgIGlmIChzdHlsZSA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmN1cnZlZFN0eWxlKSB7XG4gICAgICBjb25zdCBzb3VyY2VUYW5nZW50ID0gdGhpcy5jb21wdXRlRWRnZVNvdXJjZVRhbmdlbnQocHQxLCBwdDIpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb25UYW5nZW50ID0gdGhpcy5jb21wdXRlRWRnZURlc3RpbmF0aW9uVGFuZ2VudChwdDEsIHB0Mik7XG4gICAgICBkQWRkcmlidXRlICs9IGBDICR7c291cmNlVGFuZ2VudC54fSwgJHtzb3VyY2VUYW5nZW50Lnl9ICR7KGRlc3RpbmF0aW9uVGFuZ2VudC54IC0gNTApfSwgJHtkZXN0aW5hdGlvblRhbmdlbnQueX0gJHtwdDIueH0sICR7cHQyLnl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZEFkZHJpYnV0ZSArPSBgTCAke3B0Mi54fSwgJHtwdDIueX1gO1xuICAgIH1cbiAgICByZXR1cm4gZEFkZHJpYnV0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlQ2VudGVyKHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IChwdDEueCArIHB0Mi54KSAvIDIsXG4gICAgICB5OiAocHQxLnkgKyBwdDIueSkgLyAyXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUVkZ2VUYW5nZW50T2Zmc2V0KHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBudW1iZXIge1xuICAgIHJldHVybiAocHQyLnkgLSBwdDEueSkgLyAyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlRWRnZVNvdXJjZVRhbmdlbnQocHQxOiBGY0Nvb3JkcywgcHQyOiBGY0Nvb3Jkcyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcHQxLngsXG4gICAgICB5OiBwdDEueSArIHRoaXMuY29tcHV0ZUVkZ2VUYW5nZW50T2Zmc2V0KHB0MSwgcHQyKVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVFZGdlRGVzdGluYXRpb25UYW5nZW50KHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHB0Mi54LFxuICAgICAgeTogcHQyLnkgLSB0aGlzLmNvbXB1dGVFZGdlVGFuZ2VudE9mZnNldChwdDEsIHB0MilcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==