import { Injectable } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
var FcEdgeDrawingService = /** @class */ (function () {
    function FcEdgeDrawingService() {
    }
    FcEdgeDrawingService.prototype.getEdgeDAttribute = function (pt1, pt2, style) {
        var dAddribute = "M " + pt1.x + ", " + pt1.y + " ";
        if (style === FlowchartConstants.curvedStyle) {
            var sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            var destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += "C " + sourceTangent.x + ", " + sourceTangent.y + " " + (destinationTangent.x - 50) + ", " + destinationTangent.y + " " + pt2.x + ", " + pt2.y;
        }
        else {
            dAddribute += "L " + pt2.x + ", " + pt2.y;
        }
        return dAddribute;
    };
    FcEdgeDrawingService.prototype.getEdgeCenter = function (pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    };
    FcEdgeDrawingService.prototype.computeEdgeTangentOffset = function (pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    };
    FcEdgeDrawingService.prototype.computeEdgeSourceTangent = function (pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    FcEdgeDrawingService.prototype.computeEdgeDestinationTangent = function (pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    };
    FcEdgeDrawingService.ɵfac = function FcEdgeDrawingService_Factory(t) { return new (t || FcEdgeDrawingService)(); };
    FcEdgeDrawingService.ɵprov = i0.ɵɵdefineInjectable({ token: FcEdgeDrawingService, factory: FcEdgeDrawingService.ɵfac });
    return FcEdgeDrawingService;
}());
export { FcEdgeDrawingService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FcEdgeDrawingService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmF3aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL2VkZ2UtZHJhd2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRXRFO0lBR0U7SUFDQSxDQUFDO0lBRU0sZ0RBQWlCLEdBQXhCLFVBQXlCLEdBQWEsRUFBRSxHQUFhLEVBQUUsS0FBYTtRQUNsRSxJQUFJLFVBQVUsR0FBRyxPQUFLLEdBQUcsQ0FBQyxDQUFDLFVBQUssR0FBRyxDQUFDLENBQUMsTUFBRyxDQUFDO1FBQ3pDLElBQUksS0FBSyxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUM1QyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlELElBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN4RSxVQUFVLElBQUksT0FBSyxhQUFhLENBQUMsQ0FBQyxVQUFLLGFBQWEsQ0FBQyxDQUFDLFNBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQUssa0JBQWtCLENBQUMsQ0FBQyxTQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQUssR0FBRyxDQUFDLENBQUcsQ0FBQztTQUNySTthQUFNO1lBQ0wsVUFBVSxJQUFJLE9BQUssR0FBRyxDQUFDLENBQUMsVUFBSyxHQUFHLENBQUMsQ0FBRyxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVNLDRDQUFhLEdBQXBCLFVBQXFCLEdBQWEsRUFBRSxHQUFhO1FBQy9DLE9BQU87WUFDTCxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3RCLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFTyx1REFBd0IsR0FBaEMsVUFBaUMsR0FBYSxFQUFFLEdBQWE7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sdURBQXdCLEdBQWhDLFVBQWlDLEdBQWEsRUFBRSxHQUFhO1FBQzNELE9BQU87WUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDUixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVPLDREQUE2QixHQUFyQyxVQUFzQyxHQUFhLEVBQUUsR0FBYTtRQUNoRSxPQUFPO1lBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7NEZBeENVLG9CQUFvQjtnRUFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQjsrQkFKakM7Q0E4Q0MsQUEzQ0QsSUEyQ0M7U0ExQ1ksb0JBQW9CO2tEQUFwQixvQkFBb0I7Y0FEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjQ29vcmRzLCBGbG93Y2hhcnRDb25zdGFudHMgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZjRWRnZURyYXdpbmdTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlREF0dHJpYnV0ZShwdDE6IEZjQ29vcmRzLCBwdDI6IEZjQ29vcmRzLCBzdHlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgZEFkZHJpYnV0ZSA9IGBNICR7cHQxLnh9LCAke3B0MS55fSBgO1xuICAgIGlmIChzdHlsZSA9PT0gRmxvd2NoYXJ0Q29uc3RhbnRzLmN1cnZlZFN0eWxlKSB7XG4gICAgICBjb25zdCBzb3VyY2VUYW5nZW50ID0gdGhpcy5jb21wdXRlRWRnZVNvdXJjZVRhbmdlbnQocHQxLCBwdDIpO1xuICAgICAgY29uc3QgZGVzdGluYXRpb25UYW5nZW50ID0gdGhpcy5jb21wdXRlRWRnZURlc3RpbmF0aW9uVGFuZ2VudChwdDEsIHB0Mik7XG4gICAgICBkQWRkcmlidXRlICs9IGBDICR7c291cmNlVGFuZ2VudC54fSwgJHtzb3VyY2VUYW5nZW50Lnl9ICR7KGRlc3RpbmF0aW9uVGFuZ2VudC54IC0gNTApfSwgJHtkZXN0aW5hdGlvblRhbmdlbnQueX0gJHtwdDIueH0sICR7cHQyLnl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZEFkZHJpYnV0ZSArPSBgTCAke3B0Mi54fSwgJHtwdDIueX1gO1xuICAgIH1cbiAgICByZXR1cm4gZEFkZHJpYnV0ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFZGdlQ2VudGVyKHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IChwdDEueCArIHB0Mi54KSAvIDIsXG4gICAgICB5OiAocHQxLnkgKyBwdDIueSkgLyAyXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUVkZ2VUYW5nZW50T2Zmc2V0KHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBudW1iZXIge1xuICAgIHJldHVybiAocHQyLnkgLSBwdDEueSkgLyAyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlRWRnZVNvdXJjZVRhbmdlbnQocHQxOiBGY0Nvb3JkcywgcHQyOiBGY0Nvb3Jkcyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcHQxLngsXG4gICAgICB5OiBwdDEueSArIHRoaXMuY29tcHV0ZUVkZ2VUYW5nZW50T2Zmc2V0KHB0MSwgcHQyKVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVFZGdlRGVzdGluYXRpb25UYW5nZW50KHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMpOiBGY0Nvb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHB0Mi54LFxuICAgICAgeTogcHQyLnkgLSB0aGlzLmNvbXB1dGVFZGdlVGFuZ2VudE9mZnNldChwdDEsIHB0MilcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==