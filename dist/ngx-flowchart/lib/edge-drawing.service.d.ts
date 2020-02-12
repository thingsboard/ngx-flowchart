import { FcCoords } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
export declare class FcEdgeDrawingService {
    constructor();
    getEdgeDAttribute(pt1: FcCoords, pt2: FcCoords, style: string): string;
    getEdgeCenter(pt1: FcCoords, pt2: FcCoords): FcCoords;
    private computeEdgeTangentOffset;
    private computeEdgeSourceTangent;
    private computeEdgeDestinationTangent;
    static ɵfac: i0.ɵɵFactoryDef<FcEdgeDrawingService>;
    static ɵprov: i0.ɵɵInjectableDef<FcEdgeDrawingService>;
}
