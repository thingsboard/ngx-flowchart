/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export const FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
/**
 * @record
 */
export function FcNodeComponentConfig() { }
if (false) {
    /** @type {?} */
    FcNodeComponentConfig.prototype.nodeComponentType;
}
/** @type {?} */
const htmlPrefix = 'fc';
/** @type {?} */
const leftConnectorType = 'leftConnector';
/** @type {?} */
const rightConnectorType = 'rightConnector';
/** @type {?} */
export const FlowchartConstants = {
    htmlPrefix,
    leftConnectorType,
    rightConnectorType,
    curvedStyle: 'curved',
    lineStyle: 'line',
    dragAnimationRepaint: 'repaint',
    dragAnimationShadow: 'shadow',
    canvasClass: htmlPrefix + '-canvas',
    selectedClass: htmlPrefix + '-selected',
    editClass: htmlPrefix + '-edit',
    activeClass: htmlPrefix + '-active',
    hoverClass: htmlPrefix + '-hover',
    draggingClass: htmlPrefix + '-dragging',
    edgeClass: htmlPrefix + '-edge',
    edgeLabelClass: htmlPrefix + '-edge-label',
    connectorClass: htmlPrefix + '-connector',
    magnetClass: htmlPrefix + '-magnet',
    nodeClass: htmlPrefix + '-node',
    nodeOverlayClass: htmlPrefix + '-node-overlay',
    leftConnectorClass: htmlPrefix + '-' + leftConnectorType + 's',
    rightConnectorClass: htmlPrefix + '-' + rightConnectorType + 's',
    canvasResizeThreshold: 200,
    canvasResizeStep: 200
};
/**
 * @record
 */
export function FcCoords() { }
if (false) {
    /** @type {?|undefined} */
    FcCoords.prototype.x;
    /** @type {?|undefined} */
    FcCoords.prototype.y;
}
/**
 * @record
 */
export function FcOffset() { }
if (false) {
    /** @type {?} */
    FcOffset.prototype.top;
    /** @type {?} */
    FcOffset.prototype.left;
}
/**
 * @record
 */
export function FcRectBox() { }
if (false) {
    /** @type {?} */
    FcRectBox.prototype.top;
    /** @type {?} */
    FcRectBox.prototype.left;
    /** @type {?} */
    FcRectBox.prototype.right;
    /** @type {?} */
    FcRectBox.prototype.bottom;
}
/**
 * @record
 */
export function FcConnector() { }
if (false) {
    /** @type {?} */
    FcConnector.prototype.id;
    /** @type {?} */
    FcConnector.prototype.type;
}
/**
 * @record
 */
export function FcNode() { }
if (false) {
    /** @type {?} */
    FcNode.prototype.id;
    /** @type {?} */
    FcNode.prototype.name;
    /** @type {?} */
    FcNode.prototype.connectors;
    /** @type {?|undefined} */
    FcNode.prototype.readonly;
    /* Skipping unhandled member: [key: string]: any;*/
}
/**
 * @record
 */
export function FcEdge() { }
if (false) {
    /** @type {?|undefined} */
    FcEdge.prototype.label;
    /** @type {?|undefined} */
    FcEdge.prototype.source;
    /** @type {?|undefined} */
    FcEdge.prototype.destination;
    /** @type {?|undefined} */
    FcEdge.prototype.active;
}
/**
 * @record
 */
export function FcItemInfo() { }
if (false) {
    /** @type {?|undefined} */
    FcItemInfo.prototype.node;
    /** @type {?|undefined} */
    FcItemInfo.prototype.edge;
}
/**
 * @record
 */
export function FcModel() { }
if (false) {
    /** @type {?} */
    FcModel.prototype.nodes;
    /** @type {?} */
    FcModel.prototype.edges;
}
/**
 * @record
 */
export function UserCallbacks() { }
if (false) {
    /** @type {?|undefined} */
    UserCallbacks.prototype.dropNode;
    /** @type {?|undefined} */
    UserCallbacks.prototype.createEdge;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeAdded;
    /** @type {?|undefined} */
    UserCallbacks.prototype.nodeRemoved;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeRemoved;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeDoubleClick;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeMouseOver;
    /** @type {?|undefined} */
    UserCallbacks.prototype.isValidEdge;
    /** @type {?|undefined} */
    UserCallbacks.prototype.edgeEdit;
    /** @type {?|undefined} */
    UserCallbacks.prototype.nodeCallbacks;
}
/**
 * @record
 */
export function UserNodeCallbacks() { }
if (false) {
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.nodeEdit;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.doubleClick;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.mouseDown;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.mouseEnter;
    /** @type {?|undefined} */
    UserNodeCallbacks.prototype.mouseLeave;
}
/**
 * @record
 */
export function FcCallbacks() { }
if (false) {
    /** @type {?} */
    FcCallbacks.prototype.nodeDragstart;
    /** @type {?} */
    FcCallbacks.prototype.nodeDragend;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragstart;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragend;
    /** @type {?} */
    FcCallbacks.prototype.edgeDrop;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragoverConnector;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragoverMagnet;
    /** @type {?} */
    FcCallbacks.prototype.edgeDragleaveMagnet;
    /** @type {?} */
    FcCallbacks.prototype.nodeMouseOver;
    /** @type {?} */
    FcCallbacks.prototype.nodeMouseOut;
    /** @type {?} */
    FcCallbacks.prototype.connectorMouseEnter;
    /** @type {?} */
    FcCallbacks.prototype.connectorMouseLeave;
    /** @type {?} */
    FcCallbacks.prototype.nodeClicked;
}
/**
 * @record
 */
export function FcAdjacentList() { }
export class ModelvalidationError extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        super(message);
    }
}
/**
 * @param {?} graph
 * @return {?}
 */
export function fcTopSort(graph) {
    /** @type {?} */
    const adjacentList = {};
    graph.nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    (node) => {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    }));
    graph.edges.forEach((/**
     * @param {?} edge
     * @return {?}
     */
    (edge) => {
        /** @type {?} */
        const sourceNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            (connector) => {
                return connector.id === edge.source;
            }));
        }))[0];
        /** @type {?} */
        const destinationNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            (connector) => {
                return connector.id === edge.destination;
            }));
        }))[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    }));
    /** @type {?} */
    const orderedNodes = [];
    /** @type {?} */
    const sourceNodes = [];
    for (const node of Object.keys(adjacentList)) {
        /** @type {?} */
        const edges = adjacentList[node];
        if (edges.incoming === 0) {
            sourceNodes.push(node);
        }
    }
    while (sourceNodes.length !== 0) {
        /** @type {?} */
        const sourceNode = sourceNodes.pop();
        for (let i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
            /** @type {?} */
            const destinationNode = adjacentList[sourceNode].outgoing[i];
            adjacentList[destinationNode].incoming--;
            if (adjacentList[destinationNode].incoming === 0) {
                sourceNodes.push(destinationNode);
            }
            adjacentList[sourceNode].outgoing.splice(i, 1);
            i--;
        }
        orderedNodes.push(sourceNode);
    }
    /** @type {?} */
    let hasEdges = false;
    for (const node of Object.keys(adjacentList)) {
        /** @type {?} */
        const edges = adjacentList[node];
        if (edges.incoming !== 0) {
            hasEdges = true;
        }
    }
    if (hasEdges) {
        return null;
    }
    else {
        return orderedNodes;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFRLE1BQU0sZUFBZSxDQUFDOztBQUdyRCxNQUFNLE9BQU8sd0JBQXdCLEdBQUcsSUFBSSxjQUFjLENBQXdCLDBCQUEwQixDQUFDOzs7O0FBRTdHLDJDQUVDOzs7SUFEQyxrREFBeUM7OztNQUdyQyxVQUFVLEdBQUcsSUFBSTs7TUFDakIsaUJBQWlCLEdBQUcsZUFBZTs7TUFDbkMsa0JBQWtCLEdBQUcsZ0JBQWdCOztBQUUzQyxNQUFNLE9BQU8sa0JBQWtCLEdBQUc7SUFDaEMsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsV0FBVyxFQUFFLFFBQVE7SUFDckIsU0FBUyxFQUFFLE1BQU07SUFDakIsb0JBQW9CLEVBQUUsU0FBUztJQUMvQixtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxhQUFhLEVBQUUsVUFBVSxHQUFHLFdBQVc7SUFDdkMsU0FBUyxFQUFFLFVBQVUsR0FBRyxPQUFPO0lBQy9CLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxVQUFVLEVBQUUsVUFBVSxHQUFHLFFBQVE7SUFDakMsYUFBYSxFQUFFLFVBQVUsR0FBRyxXQUFXO0lBQ3ZDLFNBQVMsRUFBRSxVQUFVLEdBQUcsT0FBTztJQUMvQixjQUFjLEVBQUUsVUFBVSxHQUFHLGFBQWE7SUFDMUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxZQUFZO0lBQ3pDLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxTQUFTLEVBQUUsVUFBVSxHQUFHLE9BQU87SUFDL0IsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLGVBQWU7SUFDOUMsa0JBQWtCLEVBQUUsVUFBVSxH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Q0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9COztRQUNHLFFBQVEsR0FBRyxLQUFLO0lBQ3BCLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs7Y0FDdEMsS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN4QixRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO0tBQ0Y7SUFDRCxJQUFJLFFBQVEsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTTtRQUNMLE9BQU8sWUFBWSxDQUFDO0tBQ3JCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY05vZGVDb21wb25lbnQgfSBmcm9tICcuL25vZGUuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxGY05vZGVDb21wb25lbnRDb25maWc+KCdmYy1ub2RlLmNvbXBvbmVudC5jb25maWcnKTtcblxuZXhwb3J0IGludGVyZmFjZSBGY05vZGVDb21wb25lbnRDb25maWcge1xuICBub2RlQ29tcG9uZW50VHlwZTogVHlwZTxGY05vZGVDb21wb25lbnQ+O1xufVxuXG5jb25zdCBodG1sUHJlZml4ID0gJ2ZjJztcbmNvbnN0IGxlZnRDb25uZWN0b3JUeXBlID0gJ2xlZnRDb25uZWN0b3InO1xuY29uc3QgcmlnaHRDb25uZWN0b3JUeXBlID0gJ3JpZ2h0Q29ubmVjdG9yJztcblxuZXhwb3J0IGNvbnN0IEZsb3djaGFydENvbnN0YW50cyA9IHtcbiAgaHRtbFByZWZpeCxcbiAgbGVmdENvbm5lY3RvclR5cGUsXG4gIHJpZ2h0Q29ubmVjdG9yVHlwZSxcbiAgY3VydmVkU3R5bGU6ICdjdXJ2ZWQnLFxuICBsaW5lU3R5bGU6ICdsaW5lJyxcbiAgZHJhZ0FuaW1hdGlvblJlcGFpbnQ6ICdyZXBhaW50JyxcbiAgZHJhZ0FuaW1hdGlvblNoYWRvdzogJ3NoYWRvdycsXG4gIGNhbnZhc0NsYXNzOiBodG1sUHJlZml4ICsgJy1jYW52YXMnLFxuICBzZWxlY3RlZENsYXNzOiBodG1sUHJlZml4ICsgJy1zZWxlY3RlZCcsXG4gIGVkaXRDbGFzczogaHRtbFByZWZpeCArICctZWRpdCcsXG4gIGFjdGl2ZUNsYXNzOiBodG1sUHJlZml4ICsgJy1hY3RpdmUnLFxuICBob3ZlckNsYXNzOiBodG1sUHJlZml4ICsgJy1ob3ZlcicsXG4gIGRyYWdnaW5nQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWRyYWdnaW5nJyxcbiAgZWRnZUNsYXNzOiBodG1sUHJlZml4ICsgJy1lZGdlJyxcbiAgZWRnZUxhYmVsQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWVkZ2UtbGFiZWwnLFxuICBjb25uZWN0b3JDbGFzczogaHRtbFByZWZpeCArICctY29ubmVjdG9yJyxcbiAgbWFnbmV0Q2xhc3M6IGh0bWxQcmVmaXggKyAnLW1hZ25ldCcsXG4gIG5vZGVDbGFzczogaHRtbFByZWZpeCArICctbm9kZScsXG4gIG5vZGVPdmVybGF5Q2xhc3M6IGh0bWxQcmVmaXggKyAnLW5vZGUtb3ZlcmxheScsXG4gIGxlZnRDb25uZWN0b3JDbGFzczogaHRtbFByZWZpeCArICctJyArIGxlZnRDb25uZWN0b3JUeXBlICsgJ3MnLFxuICByaWdodENvbm5lY3RvckNsYXNzOiBodG1sUHJlZml4ICsgJy0nICsgcmlnaHRDb25uZWN0b3JUeXBlICsgJ3MnLFxuICBjYW52YXNSZXNpemVUaHJlc2hvbGQ6IDIwMCxcbiAgY2FudmFzUmVzaXplU3RlcDogMjAwXG59O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNDb29yZHMge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjT2Zmc2V0IHtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY1JlY3RCb3gge1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xuICByaWdodDogbnVtYmVyO1xuICBib3R0b206IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0Nvbm5lY3RvciB7XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY05vZGUgZXh0ZW5kcyBGY0Nvb3JkcyB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29ubmVjdG9yczogQXJyYXk8RmNDb25uZWN0b3I+O1xuICByZWFkb25seT86IGJvb2xlYW47XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0VkZ2Uge1xuICBsYWJlbD86IHN0cmluZztcbiAgc291cmNlPzogc3RyaW5nO1xuICBkZXN0aW5hdGlvbj86IHN0cmluZztcbiAgYWN0aXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0l0ZW1JbmZvIHtcbiAgbm9kZT86IEZjTm9kZTtcbiAgZWRnZT86IEZjRWRnZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY01vZGVsIHtcbiAgbm9kZXM6IEFycmF5PEZjTm9kZT47XG4gIGVkZ2VzOiBBcnJheTxGY0VkZ2U+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJDYWxsYmFja3Mge1xuICBkcm9wTm9kZT86IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY3JlYXRlRWRnZT86IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+O1xuICBlZGdlQWRkZWQ/OiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlUmVtb3ZlZD86IChub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGVkZ2VSZW1vdmVkPzogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgZWRnZURvdWJsZUNsaWNrPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIGVkZ2VNb3VzZU92ZXI/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgaXNWYWxpZEVkZ2U/OiAoc291cmNlOiBGY0Nvbm5lY3RvciwgZGVzdGluYXRpb246IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBlZGdlRWRpdD86IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgbm9kZUNhbGxiYWNrcz86IFVzZXJOb2RlQ2FsbGJhY2tzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJOb2RlQ2FsbGJhY2tzIHtcbiAgbm9kZUVkaXQ/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZG91YmxlQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbW91c2VEb3duPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG1vdXNlRW50ZXI/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbW91c2VMZWF2ZT86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQ2FsbGJhY2tzIHtcbiAgbm9kZURyYWdzdGFydDogKGV2ZW50OiBEcmFnRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbm9kZURyYWdlbmQ6IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBlZGdlRHJhZ3N0YXJ0OiAoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gdm9pZDtcbiAgZWRnZURyYWdlbmQ6IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBlZGdlRHJvcDogKGV2ZW50OiBEcmFnRXZlbnQsIHRhcmdldENvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnb3ZlckNvbm5lY3RvcjogKGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnb3Zlck1hZ25ldDogKGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnbGVhdmVNYWduZXQ6IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBub2RlTW91c2VPdmVyOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbm9kZU1vdXNlT3V0OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY29ubmVjdG9yTW91c2VFbnRlcjogKGV2ZW50OiBNb3VzZUV2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiB2b2lkO1xuICBjb25uZWN0b3JNb3VzZUxlYXZlOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IHZvaWQ7XG4gIG5vZGVDbGlja2VkOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0FkamFjZW50TGlzdCB7XG4gIFtpZDogc3RyaW5nXToge1xuICAgIGluY29taW5nOiBudW1iZXI7XG4gICAgb3V0Z29pbmc6IEFycmF5PHN0cmluZz47XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBNb2RlbHZhbGlkYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZjVG9wU29ydChncmFwaDogRmNNb2RlbCk6IEFycmF5PHN0cmluZz4gfCBudWxsIHtcbiAgY29uc3QgYWRqYWNlbnRMaXN0OiBGY0FkamFjZW50TGlzdCA9IHt9O1xuICBncmFwaC5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgYWRqYWNlbnRMaXN0W25vZGUuaWRdID0ge2luY29taW5nOiAwLCBvdXRnb2luZzogW119O1xuICB9KTtcbiAgZ3JhcGguZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBncmFwaC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuc29tZSgoY29ubmVjdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3IuaWQgPT09IGVkZ2Uuc291cmNlO1xuICAgICAgfSk7XG4gICAgfSlbMF07XG4gICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gZ3JhcGgubm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLnNvbWUoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgICByZXR1cm4gY29ubmVjdG9yLmlkID09PSBlZGdlLmRlc3RpbmF0aW9uO1xuICAgICAgfSk7XG4gICAgfSlbMF07XG4gICAgYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGUuaWRdLm91dGdvaW5nLnB1c2goZGVzdGluYXRpb25Ob2RlLmlkKTtcbiAgICBhZGphY2VudExpc3RbZGVzdGluYXRpb25Ob2RlLmlkXS5pbmNvbWluZysrO1xuICB9KTtcbiAgY29uc3Qgb3JkZXJlZE5vZGVzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBzb3VyY2VOb2Rlczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBub2RlIG9mIE9iamVjdC5rZXlzKGFkamFjZW50TGlzdCkpIHtcbiAgICBjb25zdCBlZGdlcyA9IGFkamFjZW50TGlzdFtub2RlXTtcbiAgICBpZiAoZWRnZXMuaW5jb21pbmcgPT09IDApIHtcbiAgICAgIHNvdXJjZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChzb3VyY2VOb2Rlcy5sZW5ndGggIT09IDApIHtcbiAgICBjb25zdCBzb3VyY2VOb2RlID0gc291cmNlTm9kZXMucG9wKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGphY2VudExpc3Rbc291cmNlTm9kZV0ub3V0Z29pbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IGFkamFjZW50TGlzdFtzb3VyY2VOb2RlXS5vdXRnb2luZ1tpXTtcbiAgICAgIGFkamFjZW50TGlzdFtkZXN0aW5hdGlvbk5vZGVdLmluY29taW5nLS07XG4gICAgICBpZiAoYWRqYWNlbnRMaXN0W2Rlc3RpbmF0aW9uTm9kZV0uaW5jb21pbmcgPT09IDApIHtcbiAgICAgICAgc291cmNlTm9kZXMucHVzaChkZXN0aW5hdGlvbk5vZGUpO1xuICAgICAgfVxuICAgICAgYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGVdLm91dGdvaW5nLnNwbGljZShpLCAxKTtcbiAgICAgIGktLTtcbiAgICB9XG4gICAgb3JkZXJlZE5vZGVzLnB1c2goc291cmNlTm9kZSk7XG4gIH1cbiAgbGV0IGhhc0VkZ2VzID0gZmFsc2U7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBPYmplY3Qua2V5cyhhZGphY2VudExpc3QpKSB7XG4gICAgY29uc3QgZWRnZXMgPSBhZGphY2VudExpc3Rbbm9kZV07XG4gICAgaWYgKGVkZ2VzLmluY29taW5nICE9PSAwKSB7XG4gICAgICBoYXNFZGdlcyA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChoYXNFZGdlcykge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvcmRlcmVkTm9kZXM7XG4gIH1cbn1cbiJdfQ==