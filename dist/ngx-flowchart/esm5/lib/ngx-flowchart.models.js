/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { InjectionToken } from '@angular/core';
/** @type {?} */
export var FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
/**
 * @record
 */
export function FcNodeComponentConfig() { }
if (false) {
    /** @type {?} */
    FcNodeComponentConfig.prototype.nodeComponentType;
}
/** @type {?} */
var htmlPrefix = 'fc';
/** @type {?} */
var leftConnectorType = 'leftConnector';
/** @type {?} */
var rightConnectorType = 'rightConnector';
/** @type {?} */
export var FlowchartConstants = {
    htmlPrefix: htmlPrefix,
    leftConnectorType: leftConnectorType,
    rightConnectorType: rightConnectorType,
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
var BaseError = /** @class */ (function () {
    function BaseError() {
        Error.apply(this, arguments);
    }
    return BaseError;
}());
Object.defineProperty(BaseError, 'prototype', new Error());
var ModelvalidationError = /** @class */ (function (_super) {
    tslib_1.__extends(ModelvalidationError, _super);
    function ModelvalidationError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return ModelvalidationError;
}(BaseError));
export { ModelvalidationError };
if (false) {
    /** @type {?} */
    ModelvalidationError.prototype.message;
}
/**
 * @param {?} graph
 * @return {?}
 */
export function fcTopSort(graph) {
    var e_1, _a, e_2, _b;
    /** @type {?} */
    var adjacentList = {};
    graph.nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    }));
    graph.edges.forEach((/**
     * @param {?} edge
     * @return {?}
     */
    function (edge) {
        /** @type {?} */
        var sourceNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            function (connector) {
                return connector.id === edge.source;
            }));
        }))[0];
        /** @type {?} */
        var destinationNode = graph.nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return node.connectors.some((/**
             * @param {?} connector
             * @return {?}
             */
            function (connector) {
                return connector.id === edge.destination;
            }));
        }))[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    }));
    /** @type {?} */
    var orderedNodes = [];
    /** @type {?} */
    var sourceNodes = [];
    try {
        for (var _c = tslib_1.__values(Object.keys(adjacentList)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var node = _d.value;
            /** @type {?} */
            var edges = adjacentList[node];
            if (edges.incoming === 0) {
                sourceNodes.push(node);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    while (sourceNodes.length !== 0) {
        /** @type {?} */
        var sourceNode = sourceNodes.pop();
        for (var i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
            /** @type {?} */
            var destinationNode = adjacentList[sourceNode].outgoing[i];
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
    var hasEdges = false;
    try {
        for (var _e = tslib_1.__values(Object.keys(adjacentList)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var node = _f.value;
            /** @type {?} */
            var edges = adjacentList[node];
            if (edges.incoming !== 0) {
                hasEdges = true;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (hasEdges) {
        return null;
    }
    else {
        return orderedNodes;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBUSxNQUFNLGVBQWUsQ0FBQzs7QUFHckQsTUFBTSxLQUFPLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUF3QiwwQkFBMEIsQ0FBQzs7OztBQUU3RywyQ0FFQzs7O0lBREMsa0RBQXlDOzs7SUFHckMsVUFBVSxHQUFHLElBQUk7O0lBQ2pCLGlCQUFpQixHQUFHLGVBQWU7O0lBQ25DLGtCQUFrQixHQUFHLGdCQUFnQjs7QUFFM0MsTUFBTSxLQUFPLGtCQUFrQixHQUFHO0lBQ2hDLFVBQVUsWUFBQTtJQUNWLGlCQUFpQixtQkFBQTtJQUNqQixrQkFBa0Isb0JBQUE7SUFDbEIsV0FBVyxFQUFFLFFBQVE7SUFDckIsU0FBUyxFQUFFLE1BQU07SUFDakIsb0JBQW9CLEVBQUUsU0FBUztJQUMvQixtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxhQUFhLEVBQUUsVUFBVSxHQUFHLFdBQVc7SUFDdkMsU0FBUyxFQUFFLFVBQVUsR0FBRyxPQUFPO0lBQy9CLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxVQUFVLEVBQUUsVUFBVSxHQUFHLFFBQVE7SUFDakMsYUFBYSxFQUFFLFVBQVUsR0FBRyxXQUFXO0lBQ3ZDLFNBQVMsRUFBRSxVQUFVLEdBQUcsT0FBTztJQUMvQixjQUFjLEVBQUUsVUFBVSxHQUFHLGFBQWE7SUFDMUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxZQUFZO0lBQ3pDLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxTQUFTLEVBQUUsVUFBVSxHQUFHLE9BQU87SUFDL0IsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLGVBQWU7SUFDOUMs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WUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLElBQUksWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hELFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbkM7WUFDRCxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxFQUFFLENBQUM7U0FDTDtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0I7O1FBQ0csUUFBUSxHQUFHLEtBQUs7O1FBQ3BCLEtBQW1CLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO1lBQXpDLElBQU0sSUFBSSxXQUFBOztnQkFDUCxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNoQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ2pCO1NBQ0Y7Ozs7Ozs7OztJQUNELElBQUksUUFBUSxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUM7S0FDYjtTQUFNO1FBQ0wsT0FBTyxZQUFZLENBQUM7S0FDckI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vbm9kZS5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEZjTm9kZUNvbXBvbmVudENvbmZpZz4oJ2ZjLW5vZGUuY29tcG9uZW50LmNvbmZpZycpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZjTm9kZUNvbXBvbmVudENvbmZpZyB7XG4gIG5vZGVDb21wb25lbnRUeXBlOiBUeXBlPEZjTm9kZUNvbXBvbmVudD47XG59XG5cbmNvbnN0IGh0bWxQcmVmaXggPSAnZmMnO1xuY29uc3QgbGVmdENvbm5lY3RvclR5cGUgPSAnbGVmdENvbm5lY3Rvcic7XG5jb25zdCByaWdodENvbm5lY3RvclR5cGUgPSAncmlnaHRDb25uZWN0b3InO1xuXG5leHBvcnQgY29uc3QgRmxvd2NoYXJ0Q29uc3RhbnRzID0ge1xuICBodG1sUHJlZml4LFxuICBsZWZ0Q29ubmVjdG9yVHlwZSxcbiAgcmlnaHRDb25uZWN0b3JUeXBlLFxuICBjdXJ2ZWRTdHlsZTogJ2N1cnZlZCcsXG4gIGxpbmVTdHlsZTogJ2xpbmUnLFxuICBkcmFnQW5pbWF0aW9uUmVwYWludDogJ3JlcGFpbnQnLFxuICBkcmFnQW5pbWF0aW9uU2hhZG93OiAnc2hhZG93JyxcbiAgY2FudmFzQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWNhbnZhcycsXG4gIHNlbGVjdGVkQ2xhc3M6IGh0bWxQcmVmaXggKyAnLXNlbGVjdGVkJyxcbiAgZWRpdENsYXNzOiBodG1sUHJlZml4ICsgJy1lZGl0JyxcbiAgYWN0aXZlQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWFjdGl2ZScsXG4gIGhvdmVyQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWhvdmVyJyxcbiAgZHJhZ2dpbmdDbGFzczogaHRtbFByZWZpeCArICctZHJhZ2dpbmcnLFxuICBlZGdlQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWVkZ2UnLFxuICBlZGdlTGFiZWxDbGFzczogaHRtbFByZWZpeCArICctZWRnZS1sYWJlbCcsXG4gIGNvbm5lY3RvckNsYXNzOiBodG1sUHJlZml4ICsgJy1jb25uZWN0b3InLFxuICBtYWduZXRDbGFzczogaHRtbFByZWZpeCArICctbWFnbmV0JyxcbiAgbm9kZUNsYXNzOiBodG1sUHJlZml4ICsgJy1ub2RlJyxcbiAgbm9kZU92ZXJsYXlDbGFzczogaHRtbFByZWZpeCArICctbm9kZS1vdmVybGF5JyxcbiAgbGVmdENvbm5lY3RvckNsYXNzOiBodG1sUHJlZml4ICsgJy0nICsgbGVmdENvbm5lY3RvclR5cGUgKyAncycsXG4gIHJpZ2h0Q29ubmVjdG9yQ2xhc3M6IGh0bWxQcmVmaXggKyAnLScgKyByaWdodENvbm5lY3RvclR5cGUgKyAncycsXG4gIGNhbnZhc1Jlc2l6ZVRocmVzaG9sZDogMjAwLFxuICBjYW52YXNSZXNpemVTdGVwOiAyMDBcbn07XG5cblxuZXhwb3J0IGludGVyZmFjZSBGY0Nvb3JkcyB7XG4gIHg/OiBudW1iZXI7XG4gIHk/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNSZWN0Qm94IHtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgYm90dG9tOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNDb25uZWN0b3Ige1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNOb2RlIGV4dGVuZHMgRmNDb29yZHMge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbm5lY3RvcnM6IEFycmF5PEZjQ29ubmVjdG9yPjtcbiAgcmVhZG9ubHk/OiBib29sZWFuO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNFZGdlIHtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHNvdXJjZT86IHN0cmluZztcbiAgZGVzdGluYXRpb24/OiBzdHJpbmc7XG4gIGFjdGl2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNJdGVtSW5mbyB7XG4gIG5vZGU/OiBGY05vZGU7XG4gIGVkZ2U/OiBGY0VkZ2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNNb2RlbCB7XG4gIG5vZGVzOiBBcnJheTxGY05vZGU+O1xuICBlZGdlczogQXJyYXk8RmNFZGdlPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyQ2FsbGJhY2tzIHtcbiAgZHJvcE5vZGU/OiAoZXZlbnQ6IEV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGNyZWF0ZUVkZ2U/OiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IE9ic2VydmFibGU8RmNFZGdlPjtcbiAgZWRnZUFkZGVkPzogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgbm9kZVJlbW92ZWQ/OiAobm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBlZGdlUmVtb3ZlZD86IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIGVkZ2VEb3VibGVDbGljaz86IChldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBlZGdlTW91c2VPdmVyPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIGlzVmFsaWRFZGdlPzogKHNvdXJjZTogRmNDb25uZWN0b3IsIGRlc3RpbmF0aW9uOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbjtcbiAgZWRnZUVkaXQ/OiAoZXZlbnQ6IEV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIG5vZGVDYWxsYmFja3M/OiBVc2VyTm9kZUNhbGxiYWNrcztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyTm9kZUNhbGxiYWNrcyB7XG4gIG5vZGVFZGl0PzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGRvdWJsZUNsaWNrPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG1vdXNlRG93bj86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBtb3VzZUVudGVyPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG1vdXNlTGVhdmU/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0NhbGxiYWNrcyB7XG4gIG5vZGVEcmFnc3RhcnQ6IChldmVudDogRHJhZ0V2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG5vZGVEcmFnZW5kOiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gdm9pZDtcbiAgZWRnZURyYWdzdGFydDogKGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IHZvaWQ7XG4gIGVkZ2VEcmFnZW5kOiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gdm9pZDtcbiAgZWRnZURyb3A6IChldmVudDogRHJhZ0V2ZW50LCB0YXJnZXRDb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBlZGdlRHJhZ292ZXJDb25uZWN0b3I6IChldmVudDogRHJhZ0V2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBlZGdlRHJhZ292ZXJNYWduZXQ6IChldmVudDogRHJhZ0V2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBlZGdlRHJhZ2xlYXZlTWFnbmV0OiAoZXZlbnQ6IERyYWdFdmVudCkgPT4gdm9pZDtcbiAgbm9kZU1vdXNlT3ZlcjogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG5vZGVNb3VzZU91dDogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGNvbm5lY3Rvck1vdXNlRW50ZXI6IChldmVudDogTW91c2VFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gdm9pZDtcbiAgY29ubmVjdG9yTW91c2VMZWF2ZTogKGV2ZW50OiBNb3VzZUV2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiB2b2lkO1xuICBub2RlQ2xpY2tlZDogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNBZGphY2VudExpc3Qge1xuICBbaWQ6IHN0cmluZ106IHtcbiAgICBpbmNvbWluZzogbnVtYmVyO1xuICAgIG91dGdvaW5nOiBBcnJheTxzdHJpbmc+O1xuICB9O1xufVxuXG5jbGFzcyBCYXNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBFcnJvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNlRXJyb3IsICdwcm90b3R5cGUnLCBuZXcgRXJyb3IoKSk7XG5cbmV4cG9ydCBjbGFzcyBNb2RlbHZhbGlkYXRpb25FcnJvciBleHRlbmRzIEJhc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmY1RvcFNvcnQoZ3JhcGg6IEZjTW9kZWwpOiBBcnJheTxzdHJpbmc+IHwgbnVsbCB7XG4gIGNvbnN0IGFkamFjZW50TGlzdDogRmNBZGphY2VudExpc3QgPSB7fTtcbiAgZ3JhcGgubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIGFkamFjZW50TGlzdFtub2RlLmlkXSA9IHtpbmNvbWluZzogMCwgb3V0Z29pbmc6IFtdfTtcbiAgfSk7XG4gIGdyYXBoLmVkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICBjb25zdCBzb3VyY2VOb2RlID0gZ3JhcGgubm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLnNvbWUoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgICByZXR1cm4gY29ubmVjdG9yLmlkID09PSBlZGdlLnNvdXJjZTtcbiAgICAgIH0pO1xuICAgIH0pWzBdO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IGdyYXBoLm5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5kZXN0aW5hdGlvbjtcbiAgICAgIH0pO1xuICAgIH0pWzBdO1xuICAgIGFkamFjZW50TGlzdFtzb3VyY2VOb2RlLmlkXS5vdXRnb2luZy5wdXNoKGRlc3RpbmF0aW9uTm9kZS5pZCk7XG4gICAgYWRqYWNlbnRMaXN0W2Rlc3RpbmF0aW9uTm9kZS5pZF0uaW5jb21pbmcrKztcbiAgfSk7XG4gIGNvbnN0IG9yZGVyZWROb2Rlczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3Qgc291cmNlTm9kZXM6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBPYmplY3Qua2V5cyhhZGphY2VudExpc3QpKSB7XG4gICAgY29uc3QgZWRnZXMgPSBhZGphY2VudExpc3Rbbm9kZV07XG4gICAgaWYgKGVkZ2VzLmluY29taW5nID09PSAwKSB7XG4gICAgICBzb3VyY2VOb2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoc291cmNlTm9kZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgY29uc3Qgc291cmNlTm9kZSA9IHNvdXJjZU5vZGVzLnBvcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGVdLm91dGdvaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbk5vZGUgPSBhZGphY2VudExpc3Rbc291cmNlTm9kZV0ub3V0Z29pbmdbaV07XG4gICAgICBhZGphY2VudExpc3RbZGVzdGluYXRpb25Ob2RlXS5pbmNvbWluZy0tO1xuICAgICAgaWYgKGFkamFjZW50TGlzdFtkZXN0aW5hdGlvbk5vZGVdLmluY29taW5nID09PSAwKSB7XG4gICAgICAgIHNvdXJjZU5vZGVzLnB1c2goZGVzdGluYXRpb25Ob2RlKTtcbiAgICAgIH1cbiAgICAgIGFkamFjZW50TGlzdFtzb3VyY2VOb2RlXS5vdXRnb2luZy5zcGxpY2UoaSwgMSk7XG4gICAgICBpLS07XG4gICAgfVxuICAgIG9yZGVyZWROb2Rlcy5wdXNoKHNvdXJjZU5vZGUpO1xuICB9XG4gIGxldCBoYXNFZGdlcyA9IGZhbHNlO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgT2JqZWN0LmtleXMoYWRqYWNlbnRMaXN0KSkge1xuICAgIGNvbnN0IGVkZ2VzID0gYWRqYWNlbnRMaXN0W25vZGVdO1xuICAgIGlmIChlZGdlcy5pbmNvbWluZyAhPT0gMCkge1xuICAgICAgaGFzRWRnZXMgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoaGFzRWRnZXMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb3JkZXJlZE5vZGVzO1xuICB9XG59XG4iXX0=