import { Injectable } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
export class FcEdgeDrawingService {
    constructor() {
    }
    getEdgeDAttribute(pt1, pt2, style) {
        let dAddribute = `M ${pt1.x}, ${pt1.y} `;
        if (style === FlowchartConstants.curvedStyle) {
            const sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
            const destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
            dAddribute += `C ${sourceTangent.x}, ${sourceTangent.y} ${(destinationTangent.x - 50)}, ${destinationTangent.y} ${pt2.x}, ${pt2.y}`;
        }
        else {
            dAddribute += `L ${pt2.x}, ${pt2.y}`;
        }
        return dAddribute;
    }
    getEdgeCenter(pt1, pt2) {
        return {
            x: (pt1.x + pt2.x) / 2,
            y: (pt1.y + pt2.y) / 2
        };
    }
    computeEdgeTangentOffset(pt1, pt2) {
        return (pt2.y - pt1.y) / 2;
    }
    computeEdgeSourceTangent(pt1, pt2) {
        return {
            x: pt1.x,
            y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
    computeEdgeDestinationTangent(pt1, pt2) {
        return {
            x: pt2.x,
            y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
        };
    }
}
FcEdgeDrawingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcEdgeDrawingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FcEdgeDrawingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcEdgeDrawingService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcEdgeDrawingService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS1kcmF3aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvZWRnZS1kcmF3aW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFHdEUsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQjtJQUNBLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxHQUFhLEVBQUUsR0FBYSxFQUFFLEtBQWE7UUFDbEUsSUFBSSxVQUFVLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN6QyxJQUFJLEtBQUssS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDNUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5RCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEUsVUFBVSxJQUFJLEtBQUssYUFBYSxDQUFDLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLGtCQUFrQixDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNySTthQUFNO1lBQ0wsVUFBVSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdEM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRU0sYUFBYSxDQUFDLEdBQWEsRUFBRSxHQUFhO1FBQy9DLE9BQU87WUFDTCxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3RCLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxHQUFhLEVBQUUsR0FBYTtRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxHQUFhLEVBQUUsR0FBYTtRQUMzRCxPQUFPO1lBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFTyw2QkFBNkIsQ0FBQyxHQUFhLEVBQUUsR0FBYTtRQUNoRSxPQUFPO1lBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7O2lIQXhDVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDb29yZHMsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmNFZGdlRHJhd2luZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIGdldEVkZ2VEQXR0cmlidXRlKHB0MTogRmNDb29yZHMsIHB0MjogRmNDb29yZHMsIHN0eWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBkQWRkcmlidXRlID0gYE0gJHtwdDEueH0sICR7cHQxLnl9IGA7XG4gICAgaWYgKHN0eWxlID09PSBGbG93Y2hhcnRDb25zdGFudHMuY3VydmVkU3R5bGUpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVRhbmdlbnQgPSB0aGlzLmNvbXB1dGVFZGdlU291cmNlVGFuZ2VudChwdDEsIHB0Mik7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvblRhbmdlbnQgPSB0aGlzLmNvbXB1dGVFZGdlRGVzdGluYXRpb25UYW5nZW50KHB0MSwgcHQyKTtcbiAgICAgIGRBZGRyaWJ1dGUgKz0gYEMgJHtzb3VyY2VUYW5nZW50Lnh9LCAke3NvdXJjZVRhbmdlbnQueX0gJHsoZGVzdGluYXRpb25UYW5nZW50LnggLSA1MCl9LCAke2Rlc3RpbmF0aW9uVGFuZ2VudC55fSAke3B0Mi54fSwgJHtwdDIueX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBkQWRkcmlidXRlICs9IGBMICR7cHQyLnh9LCAke3B0Mi55fWA7XG4gICAgfVxuICAgIHJldHVybiBkQWRkcmlidXRlO1xuICB9XG5cbiAgcHVibGljIGdldEVkZ2VDZW50ZXIocHQxOiBGY0Nvb3JkcywgcHQyOiBGY0Nvb3Jkcyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogKHB0MS54ICsgcHQyLngpIC8gMixcbiAgICAgIHk6IChwdDEueSArIHB0Mi55KSAvIDJcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlRWRnZVRhbmdlbnRPZmZzZXQocHQxOiBGY0Nvb3JkcywgcHQyOiBGY0Nvb3Jkcyk6IG51bWJlciB7XG4gICAgcmV0dXJuIChwdDIueSAtIHB0MS55KSAvIDI7XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVFZGdlU291cmNlVGFuZ2VudChwdDE6IEZjQ29vcmRzLCBwdDI6IEZjQ29vcmRzKTogRmNDb29yZHMge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBwdDEueCxcbiAgICAgIHk6IHB0MS55ICsgdGhpcy5jb21wdXRlRWRnZVRhbmdlbnRPZmZzZXQocHQxLCBwdDIpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUVkZ2VEZXN0aW5hdGlvblRhbmdlbnQocHQxOiBGY0Nvb3JkcywgcHQyOiBGY0Nvb3Jkcyk6IEZjQ29vcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcHQyLngsXG4gICAgICB5OiBwdDIueSAtIHRoaXMuY29tcHV0ZUVkZ2VUYW5nZW50T2Zmc2V0KHB0MSwgcHQyKVxuICAgIH07XG4gIH1cblxufVxuIl19