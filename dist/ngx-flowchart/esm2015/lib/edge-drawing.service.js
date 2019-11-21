/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
export class FcEdgeDrawingService {
    constructor() {
    }
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @param {?} style
     * @return {?}
     */
    getEdgeDAttribute(pt1, pt2, style) {
        /** @type {?} */
        let dAddribute = `M ${pt1.x}, ${pt1.y} `;
        if (style === FlowchartConstants.curvedStyle) {
            /** @type {?} */
            const sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            /** @type {?} */
            const destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += `C ${sourceTangent.x}, ${sourceTangent.y} ${(destinationTangent.x - 50)}, ${destinationTangent.y} ${pt2.x}, ${pt2.y}`;
        }
        else {
            dAddribute += `L ${pt2.x}, ${pt2.y}`;
        }
        return dAddribute;
    }
    /**
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    getEdgeCenter(pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    }
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    computeEdgeTangentOffset(pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    }
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    computeEdgeSourceTangent(pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
    /**
     * @private
     * @param {?} pt1
     * @param {?} pt2
     * @return {?}
     */
    computeEdgeDestinationTangent(pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
}
FcEdgeDrawingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FcEdgeDrawingService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmF3aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL2VkZ2UtZHJhd2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBWSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3RFLE1BQU0sT0FBTyxvQkFBb0I7SUFFL0I7SUFDQSxDQUFDOzs7Ozs7O0lBRU0saUJBQWlCLENBQUMsR0FBYSxFQUFFLEdBQWEsRUFBRSxLQUFhOztZQUM5RCxVQUFVLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUc7UUFDeEMsSUFBSSxLQUFLLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFOztrQkFDdEMsYUFBYSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOztrQkFDdkQsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDdkUsVUFBVSxJQUFJLEtBQUssYUFBYSxDQUFDLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLGtCQUFrQixDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNySTthQUFNO1lBQ0wsVUFBVSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdEM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFFTSxhQUFhLENBQUMsR0FBYSxFQUFFLEdBQWE7UUFDL0MsT0FBTztZQUNMLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUN2QixDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLHdCQUF3QixDQUFDLEdBQWEsRUFBRSxHQUFhO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQUVPLHdCQUF3QixDQUFDLEdBQWEsRUFBRSxHQUFhO1FBQzNELE9BQU87WUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLDZCQUE2QixDQUFDLEdBQWEsRUFBRSxHQUFhO1FBQ2hFLE9BQU87WUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQzs7O1lBekNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0Nvb3JkcywgRmxvd2NoYXJ0Q29uc3RhbnRzIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGY0VkZ2VEcmF3aW5nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWRnZURBdHRyaWJ1dGUocHQxOiBGY0Nvb3JkcywgcHQyOiBGY0Nvb3Jkcywgc3R5bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGRBZGRyaWJ1dGUgPSBgTSAke3B0MS54fSwgJHtwdDEueX0gYDtcbiAgICBpZiAoc3R5bGUgPT09IEZsb3djaGFydENvbnN0YW50cy5jdXJ2ZWRTdHlsZSkge1xuICAgICAgY29uc3Qgc291cmNlVGFuZ2VudCA9IHRoaXMuY29tcHV0ZUVkZ2VTb3VyY2VUYW5nZW50KHB0MSwgcHQyKTtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uVGFuZ2VudCA9IHRoaXMuY29tcHV0ZUVkZ2VEZXN0aW5hdGlvblRhbmdlbnQocHQxLCBwdDIpO1xuICAgICAgZEFkZHJpYnV0ZSArPSBgQyAke3NvdXJjZVRhbmdlbnQueH0sICR7c291cmNlVGFuZ2VudC55fSAkeyhkZXN0aW5hdGlvblRhbmdlbnQueCAtIDUwKX0sICR7ZGVzdGluYXRpb25UYW5nZW50Lnl9ICR7cHQyLnh9LCAke3B0Mi55fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRBZGRyaWJ1dGUgKz0gYEwgJHtwdDIueH0sICR7cHQyLnl9YDtcbiAgICB9XG4gICAgcmV0dXJuIGRBZGRyaWJ1dGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWRnZUNlbnRlcihwdDE6IEZjQ29vcmRzLCBwdDI6IEZjQ29vcmRzKTogRmNDb29yZHMge1xuICAgIHJldHVybiB7XG4gICAgICB4OiAocHQxLnggKyBwdDIueCkgLyAyLFxuICAgICAgeTogKHB0MS55ICsgcHQyLnkpIC8gMlxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVFZGdlVGFuZ2VudE9mZnNldChwdDE6IEZjQ29vcmRzLCBwdDI6IEZjQ29vcmRzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHB0Mi55IC0gcHQxLnkpIC8gMjtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUVkZ2VTb3VyY2VUYW5nZW50KHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHB0MS54LFxuICAgICAgeTogcHQxLnkgKyB0aGlzLmNvbXB1dGVFZGdlVGFuZ2VudE9mZnNldChwdDEsIHB0MilcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlRWRnZURlc3RpbmF0aW9uVGFuZ2VudChwdDE6IEZjQ29vcmRzLCBwdDI6IEZjQ29vcmRzKTogRmNDb29yZHMge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBwdDIueCxcbiAgICAgIHk6IHB0Mi55IC0gdGhpcy5jb21wdXRlRWRnZVRhbmdlbnRPZmZzZXQocHQxLCBwdDIpXG4gICAgfTtcbiAgfVxuXG59XG4iXX0=