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
BaseError.prototype = new Error();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBUSxNQUFNLGVBQWUsQ0FBQzs7QUFHckQsTUFBTSxLQUFPLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUF3QiwwQkFBMEIsQ0FBQzs7OztBQUU3RywyQ0FFQzs7O0lBREMsa0RBQXlDOzs7SUFHckMsVUFBVSxHQUFHLElBQUk7O0lBQ2pCLGlCQUFpQixHQUFHLGVBQWU7O0lBQ25DLGtCQUFrQixHQUFHLGdCQUFnQjs7QUFFM0MsTUFBTSxLQUFPLGtCQUFrQixHQUFHO0lBQ2hDLFVBQVUsWUFBQTtJQUNWLGlCQUFpQixtQkFBQTtJQUNqQixrQkFBa0Isb0JBQUE7SUFDbEIsV0FBVyxFQUFFLFFBQVE7SUFDckIsU0FBUyxFQUFFLE1BQU07SUFDakIsb0JBQW9CLEVBQUUsU0FBUztJQUMvQixtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxhQUFhLEVBQUUsVUFBVSxHQUFHLFdBQVc7SUFDdkMsU0FBUyxFQUFFLFVBQVUsR0FBRyxPQUFPO0lBQy9CLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxVQUFVLEVBQUUsVUFBVSxHQUFHLFFBQVE7SUFDakMsYUFBYSxFQUFFLFVBQVUsR0FBRyxXQUFXO0lBQ3ZDLFNBQVMsRUFBRSxVQUFVLEdBQUcsT0FBTztJQUMvQixjQUFjLEVBQUUsVUFBVSxHQUFHLGFBQWE7SUFDMUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxZQUFZO0lBQ3pDLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxTQUFTLEVBQUUsVUFBVSxHQUFHLE9BQU87SUFDL0IsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLGVBQWU7SUFDOUMs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UUFBUSxFQUFFLENBQUM7WUFDekMsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDaEQsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNuQztZQUNELFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDLEVBQUUsQ0FBQztTQUNMO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMvQjs7UUFDRyxRQUFRLEdBQUcsS0FBSzs7UUFDcEIsS0FBbUIsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7WUFBekMsSUFBTSxJQUFJLFdBQUE7O2dCQUNQLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDakI7U0FDRjs7Ozs7Ozs7O0lBQ0QsSUFBSSxRQUFRLEVBQUU7UUFDWixPQUFPLElBQUksQ0FBQztLQUNiO1NBQU07UUFDTCxPQUFPLFlBQVksQ0FBQztLQUNyQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9ub2RlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48RmNOb2RlQ29tcG9uZW50Q29uZmlnPignZmMtbm9kZS5jb21wb25lbnQuY29uZmlnJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNOb2RlQ29tcG9uZW50Q29uZmlnIHtcbiAgbm9kZUNvbXBvbmVudFR5cGU6IFR5cGU8RmNOb2RlQ29tcG9uZW50Pjtcbn1cblxuY29uc3QgaHRtbFByZWZpeCA9ICdmYyc7XG5jb25zdCBsZWZ0Q29ubmVjdG9yVHlwZSA9ICdsZWZ0Q29ubmVjdG9yJztcbmNvbnN0IHJpZ2h0Q29ubmVjdG9yVHlwZSA9ICdyaWdodENvbm5lY3Rvcic7XG5cbmV4cG9ydCBjb25zdCBGbG93Y2hhcnRDb25zdGFudHMgPSB7XG4gIGh0bWxQcmVmaXgsXG4gIGxlZnRDb25uZWN0b3JUeXBlLFxuICByaWdodENvbm5lY3RvclR5cGUsXG4gIGN1cnZlZFN0eWxlOiAnY3VydmVkJyxcbiAgbGluZVN0eWxlOiAnbGluZScsXG4gIGRyYWdBbmltYXRpb25SZXBhaW50OiAncmVwYWludCcsXG4gIGRyYWdBbmltYXRpb25TaGFkb3c6ICdzaGFkb3cnLFxuICBjYW52YXNDbGFzczogaHRtbFByZWZpeCArICctY2FudmFzJyxcbiAgc2VsZWN0ZWRDbGFzczogaHRtbFByZWZpeCArICctc2VsZWN0ZWQnLFxuICBlZGl0Q2xhc3M6IGh0bWxQcmVmaXggKyAnLWVkaXQnLFxuICBhY3RpdmVDbGFzczogaHRtbFByZWZpeCArICctYWN0aXZlJyxcbiAgaG92ZXJDbGFzczogaHRtbFByZWZpeCArICctaG92ZXInLFxuICBkcmFnZ2luZ0NsYXNzOiBodG1sUHJlZml4ICsgJy1kcmFnZ2luZycsXG4gIGVkZ2VDbGFzczogaHRtbFByZWZpeCArICctZWRnZScsXG4gIGVkZ2VMYWJlbENsYXNzOiBodG1sUHJlZml4ICsgJy1lZGdlLWxhYmVsJyxcbiAgY29ubmVjdG9yQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWNvbm5lY3RvcicsXG4gIG1hZ25ldENsYXNzOiBodG1sUHJlZml4ICsgJy1tYWduZXQnLFxuICBub2RlQ2xhc3M6IGh0bWxQcmVmaXggKyAnLW5vZGUnLFxuICBub2RlT3ZlcmxheUNsYXNzOiBodG1sUHJlZml4ICsgJy1ub2RlLW92ZXJsYXknLFxuICBsZWZ0Q29ubmVjdG9yQ2xhc3M6IGh0bWxQcmVmaXggKyAnLScgKyBsZWZ0Q29ubmVjdG9yVHlwZSArICdzJyxcbiAgcmlnaHRDb25uZWN0b3JDbGFzczogaHRtbFByZWZpeCArICctJyArIHJpZ2h0Q29ubmVjdG9yVHlwZSArICdzJyxcbiAgY2FudmFzUmVzaXplVGhyZXNob2xkOiAyMDAsXG4gIGNhbnZhc1Jlc2l6ZVN0ZXA6IDIwMFxufTtcblxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQ29vcmRzIHtcbiAgeD86IG51bWJlcjtcbiAgeT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY1JlY3RCb3gge1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xuICByaWdodDogbnVtYmVyO1xuICBib3R0b206IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0Nvbm5lY3RvciB7XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY05vZGUgZXh0ZW5kcyBGY0Nvb3JkcyB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29ubmVjdG9yczogQXJyYXk8RmNDb25uZWN0b3I+O1xuICByZWFkb25seT86IGJvb2xlYW47XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0VkZ2Uge1xuICBsYWJlbD86IHN0cmluZztcbiAgc291cmNlPzogc3RyaW5nO1xuICBkZXN0aW5hdGlvbj86IHN0cmluZztcbiAgYWN0aXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0l0ZW1JbmZvIHtcbiAgbm9kZT86IEZjTm9kZTtcbiAgZWRnZT86IEZjRWRnZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY01vZGVsIHtcbiAgbm9kZXM6IEFycmF5PEZjTm9kZT47XG4gIGVkZ2VzOiBBcnJheTxGY0VkZ2U+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJDYWxsYmFja3Mge1xuICBkcm9wTm9kZT86IChldmVudDogRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY3JlYXRlRWRnZT86IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gT2JzZXJ2YWJsZTxGY0VkZ2U+O1xuICBlZGdlQWRkZWQ/OiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlUmVtb3ZlZD86IChub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIGVkZ2VSZW1vdmVkPzogKGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgZWRnZURvdWJsZUNsaWNrPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIGVkZ2VNb3VzZU92ZXI/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgaXNWYWxpZEVkZ2U/OiAoc291cmNlOiBGY0Nvbm5lY3RvciwgZGVzdGluYXRpb246IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBlZGdlRWRpdD86IChldmVudDogRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgbm9kZUNhbGxiYWNrcz86IFVzZXJOb2RlQ2FsbGJhY2tzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJOb2RlQ2FsbGJhY2tzIHtcbiAgbm9kZUVkaXQ/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZG91YmxlQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbW91c2VEb3duPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG1vdXNlRW50ZXI/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbW91c2VMZWF2ZT86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQ2FsbGJhY2tzIHtcbiAgbm9kZURyYWdzdGFydDogKGV2ZW50OiBEcmFnRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbm9kZURyYWdlbmQ6IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBlZGdlRHJhZ3N0YXJ0OiAoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gdm9pZDtcbiAgZWRnZURyYWdlbmQ6IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBlZGdlRHJvcDogKGV2ZW50OiBEcmFnRXZlbnQsIHRhcmdldENvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnb3ZlckNvbm5lY3RvcjogKGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnb3Zlck1hZ25ldDogKGV2ZW50OiBEcmFnRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnbGVhdmVNYWduZXQ6IChldmVudDogRHJhZ0V2ZW50KSA9PiB2b2lkO1xuICBub2RlTW91c2VPdmVyOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbm9kZU1vdXNlT3V0OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY29ubmVjdG9yTW91c2VFbnRlcjogKGV2ZW50OiBNb3VzZUV2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiB2b2lkO1xuICBjb25uZWN0b3JNb3VzZUxlYXZlOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IHZvaWQ7XG4gIG5vZGVDbGlja2VkOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0FkamFjZW50TGlzdCB7XG4gIFtpZDogc3RyaW5nXToge1xuICAgIGluY29taW5nOiBudW1iZXI7XG4gICAgb3V0Z29pbmc6IEFycmF5PHN0cmluZz47XG4gIH07XG59XG5cbmNsYXNzIEJhc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIEVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuQmFzZUVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnQgY2xhc3MgTW9kZWx2YWxpZGF0aW9uRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmNUb3BTb3J0KGdyYXBoOiBGY01vZGVsKTogQXJyYXk8c3RyaW5nPiB8IG51bGwge1xuICBjb25zdCBhZGphY2VudExpc3Q6IEZjQWRqYWNlbnRMaXN0ID0ge307XG4gIGdyYXBoLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBhZGphY2VudExpc3Rbbm9kZS5pZF0gPSB7aW5jb21pbmc6IDAsIG91dGdvaW5nOiBbXX07XG4gIH0pO1xuICBncmFwaC5lZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgY29uc3Qgc291cmNlTm9kZSA9IGdyYXBoLm5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5zb3VyY2U7XG4gICAgICB9KTtcbiAgICB9KVswXTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbk5vZGUgPSBncmFwaC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuc29tZSgoY29ubmVjdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3IuaWQgPT09IGVkZ2UuZGVzdGluYXRpb247XG4gICAgICB9KTtcbiAgICB9KVswXTtcbiAgICBhZGphY2VudExpc3Rbc291cmNlTm9kZS5pZF0ub3V0Z29pbmcucHVzaChkZXN0aW5hdGlvbk5vZGUuaWQpO1xuICAgIGFkamFjZW50TGlzdFtkZXN0aW5hdGlvbk5vZGUuaWRdLmluY29taW5nKys7XG4gIH0pO1xuICBjb25zdCBvcmRlcmVkTm9kZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHNvdXJjZU5vZGVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgT2JqZWN0LmtleXMoYWRqYWNlbnRMaXN0KSkge1xuICAgIGNvbnN0IGVkZ2VzID0gYWRqYWNlbnRMaXN0W25vZGVdO1xuICAgIGlmIChlZGdlcy5pbmNvbWluZyA9PT0gMCkge1xuICAgICAgc291cmNlTm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKHNvdXJjZU5vZGVzLmxlbmd0aCAhPT0gMCkge1xuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBzb3VyY2VOb2Rlcy5wb3AoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkamFjZW50TGlzdFtzb3VyY2VOb2RlXS5vdXRnb2luZy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGVdLm91dGdvaW5nW2ldO1xuICAgICAgYWRqYWNlbnRMaXN0W2Rlc3RpbmF0aW9uTm9kZV0uaW5jb21pbmctLTtcbiAgICAgIGlmIChhZGphY2VudExpc3RbZGVzdGluYXRpb25Ob2RlXS5pbmNvbWluZyA9PT0gMCkge1xuICAgICAgICBzb3VyY2VOb2Rlcy5wdXNoKGRlc3RpbmF0aW9uTm9kZSk7XG4gICAgICB9XG4gICAgICBhZGphY2VudExpc3Rbc291cmNlTm9kZV0ub3V0Z29pbmcuc3BsaWNlKGksIDEpO1xuICAgICAgaS0tO1xuICAgIH1cbiAgICBvcmRlcmVkTm9kZXMucHVzaChzb3VyY2VOb2RlKTtcbiAgfVxuICBsZXQgaGFzRWRnZXMgPSBmYWxzZTtcbiAgZm9yIChjb25zdCBub2RlIG9mIE9iamVjdC5rZXlzKGFkamFjZW50TGlzdCkpIHtcbiAgICBjb25zdCBlZGdlcyA9IGFkamFjZW50TGlzdFtub2RlXTtcbiAgICBpZiAoZWRnZXMuaW5jb21pbmcgIT09IDApIHtcbiAgICAgIGhhc0VkZ2VzID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGhhc0VkZ2VzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9yZGVyZWROb2RlcztcbiAgfVxufVxuIl19