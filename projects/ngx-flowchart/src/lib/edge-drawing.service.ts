import { Injectable } from '@angular/core';
import { FcCoords, FlowchartConstants } from './ngx-flowchart.models';

@Injectable()
export class FcEdgeDrawingService {

  constructor() {
  }

  public getEdgeDAttribute(pt1: FcCoords, pt2: FcCoords, style: string): string {
    let dAddribute = `M ${pt1.x}, ${pt1.y} `;
    if (style === FlowchartConstants.curvedStyle) {
      const sourceTangent = this.computeEdgeSourceTangent(pt1, pt2);
      const destinationTangent = this.computeEdgeDestinationTangent(pt1, pt2);
      dAddribute += `C ${sourceTangent.x}, ${sourceTangent.y} ${(destinationTangent.x - 50)}, ${destinationTangent.y} ${pt2.x}, ${pt2.y}`;
    } else {
      dAddribute += `L ${pt2.x}, ${pt2.y}`;
    }
    return dAddribute;
  }

  public getEdgeCenter(pt1: FcCoords, pt2: FcCoords): FcCoords {
    return {
      x: (pt1.x + pt2.x) / 2,
      y: (pt1.y + pt2.y) / 2
    };
  }

  private computeEdgeTangentOffset(pt1: FcCoords, pt2: FcCoords): number {
    return (pt2.y - pt1.y) / 2;
  }

  private computeEdgeSourceTangent(pt1: FcCoords, pt2: FcCoords): FcCoords {
    return {
      x: pt1.x,
      y: pt1.y + this.computeEdgeTangentOffset(pt1, pt2)
    };
  }

  private computeEdgeDestinationTangent(pt1: FcCoords, pt2: FcCoords): FcCoords {
    return {
      x: pt2.x,
      y: pt2.y - this.computeEdgeTangentOffset(pt1, pt2)
    };
  }

}
