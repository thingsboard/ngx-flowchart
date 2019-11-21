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
var ModelvalidationError = /** @class */ (function (_super) {
    tslib_1.__extends(ModelvalidationError, _super);
    function ModelvalidationError(message) {
        return _super.call(this, message) || this;
    }
    return ModelvalidationError;
}(Error));
export { ModelvalidationError };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBUSxNQUFNLGVBQWUsQ0FBQzs7QUFHckQsTUFBTSxLQUFPLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUF3QiwwQkFBMEIsQ0FBQzs7OztBQUU3RywyQ0FFQzs7O0lBREMsa0RBQXlDOzs7SUFHckMsVUFBVSxHQUFHLElBQUk7O0lBQ2pCLGlCQUFpQixHQUFHLGVBQWU7O0lBQ25DLGtCQUFrQixHQUFHLGdCQUFnQjs7QUFFM0MsTUFBTSxLQUFPLGtCQUFrQixHQUFHO0lBQ2hDLFVBQVUsWUFBQTtJQUNWLGlCQUFpQixtQkFBQTtJQUNqQixrQkFBa0Isb0JBQUE7SUFDbEIsV0FBVyxFQUFFLFFBQVE7SUFDckIsU0FBUyxFQUFFLE1BQU07SUFDakIsb0JBQW9CLEVBQUUsU0FBUztJQUMvQixtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxhQUFhLEVBQUUsVUFBVSxHQUFHLFdBQVc7SUFDdkMsU0FBUyxFQUFFLFVBQVUsR0FBRyxPQUFPO0lBQy9CLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxVQUFVLEVBQUUsVUFBVSxHQUFHLFFBQVE7SUFDakMsYUFBYSxFQUFFLFVBQVUsR0FBRyxXQUFXO0lBQ3ZDLFNBQVMsRUFBRSxVQUFVLEdBQUcsT0FBTztJQUMvQixjQUFjLEVBQUUsVUFBVSxHQUFHLGFBQWE7SUFDMUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxZQUFZO0lBQ3pDLFdBQVcsRUFBRSxVQUFVLEdBQUcsU0FBUztJQUNuQyxTQUFTLEVBQUUsVUFBVSxHQUFHLE9BQU87SUFDL0IsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLGVBQWU7SUFDOUMs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USxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxFQUFFLENBQUM7U0FDTDtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0I7O1FBQ0csUUFBUSxHQUFHLEtBQUs7O1FBQ3BCLEtBQW1CLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO1lBQXpDLElBQU0sSUFBSSxXQUFBOztnQkFDUCxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNoQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ2pCO1NBQ0Y7Ozs7Ozs7OztJQUNELElBQUksUUFBUSxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUM7S0FDYjtTQUFNO1FBQ0wsT0FBTyxZQUFZLENBQUM7S0FDckI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZjTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vbm9kZS5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEZjTm9kZUNvbXBvbmVudENvbmZpZz4oJ2ZjLW5vZGUuY29tcG9uZW50LmNvbmZpZycpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZjTm9kZUNvbXBvbmVudENvbmZpZyB7XG4gIG5vZGVDb21wb25lbnRUeXBlOiBUeXBlPEZjTm9kZUNvbXBvbmVudD47XG59XG5cbmNvbnN0IGh0bWxQcmVmaXggPSAnZmMnO1xuY29uc3QgbGVmdENvbm5lY3RvclR5cGUgPSAnbGVmdENvbm5lY3Rvcic7XG5jb25zdCByaWdodENvbm5lY3RvclR5cGUgPSAncmlnaHRDb25uZWN0b3InO1xuXG5leHBvcnQgY29uc3QgRmxvd2NoYXJ0Q29uc3RhbnRzID0ge1xuICBodG1sUHJlZml4LFxuICBsZWZ0Q29ubmVjdG9yVHlwZSxcbiAgcmlnaHRDb25uZWN0b3JUeXBlLFxuICBjdXJ2ZWRTdHlsZTogJ2N1cnZlZCcsXG4gIGxpbmVTdHlsZTogJ2xpbmUnLFxuICBkcmFnQW5pbWF0aW9uUmVwYWludDogJ3JlcGFpbnQnLFxuICBkcmFnQW5pbWF0aW9uU2hhZG93OiAnc2hhZG93JyxcbiAgY2FudmFzQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWNhbnZhcycsXG4gIHNlbGVjdGVkQ2xhc3M6IGh0bWxQcmVmaXggKyAnLXNlbGVjdGVkJyxcbiAgZWRpdENsYXNzOiBodG1sUHJlZml4ICsgJy1lZGl0JyxcbiAgYWN0aXZlQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWFjdGl2ZScsXG4gIGhvdmVyQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWhvdmVyJyxcbiAgZHJhZ2dpbmdDbGFzczogaHRtbFByZWZpeCArICctZHJhZ2dpbmcnLFxuICBlZGdlQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWVkZ2UnLFxuICBlZGdlTGFiZWxDbGFzczogaHRtbFByZWZpeCArICctZWRnZS1sYWJlbCcsXG4gIGNvbm5lY3RvckNsYXNzOiBodG1sUHJlZml4ICsgJy1jb25uZWN0b3InLFxuICBtYWduZXRDbGFzczogaHRtbFByZWZpeCArICctbWFnbmV0JyxcbiAgbm9kZUNsYXNzOiBodG1sUHJlZml4ICsgJy1ub2RlJyxcbiAgbm9kZU92ZXJsYXlDbGFzczogaHRtbFByZWZpeCArICctbm9kZS1vdmVybGF5JyxcbiAgbGVmdENvbm5lY3RvckNsYXNzOiBodG1sUHJlZml4ICsgJy0nICsgbGVmdENvbm5lY3RvclR5cGUgKyAncycsXG4gIHJpZ2h0Q29ubmVjdG9yQ2xhc3M6IGh0bWxQcmVmaXggKyAnLScgKyByaWdodENvbm5lY3RvclR5cGUgKyAncycsXG4gIGNhbnZhc1Jlc2l6ZVRocmVzaG9sZDogMjAwLFxuICBjYW52YXNSZXNpemVTdGVwOiAyMDBcbn07XG5cblxuZXhwb3J0IGludGVyZmFjZSBGY0Nvb3JkcyB7XG4gIHg/OiBudW1iZXI7XG4gIHk/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNPZmZzZXQge1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjUmVjdEJveCB7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIGJvdHRvbTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQ29ubmVjdG9yIHtcbiAgaWQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjTm9kZSBleHRlbmRzIEZjQ29vcmRzIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjb25uZWN0b3JzOiBBcnJheTxGY0Nvbm5lY3Rvcj47XG4gIHJlYWRvbmx5PzogYm9vbGVhbjtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjRWRnZSB7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBzb3VyY2U/OiBzdHJpbmc7XG4gIGRlc3RpbmF0aW9uPzogc3RyaW5nO1xuICBhY3RpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjSXRlbUluZm8ge1xuICBub2RlPzogRmNOb2RlO1xuICBlZGdlPzogRmNFZGdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjTW9kZWwge1xuICBub2RlczogQXJyYXk8RmNOb2RlPjtcbiAgZWRnZXM6IEFycmF5PEZjRWRnZT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckNhbGxiYWNrcyB7XG4gIGRyb3BOb2RlPzogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBjcmVhdGVFZGdlPzogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT47XG4gIGVkZ2VBZGRlZD86IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIG5vZGVSZW1vdmVkPzogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZWRnZVJlbW92ZWQ/OiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBlZGdlRG91YmxlQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgZWRnZU1vdXNlT3Zlcj86IChldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBpc1ZhbGlkRWRnZT86IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VFZGl0PzogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlQ2FsbGJhY2tzPzogVXNlck5vZGVDYWxsYmFja3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlck5vZGVDYWxsYmFja3Mge1xuICBub2RlRWRpdD86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBkb3VibGVDbGljaz86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBtb3VzZURvd24/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbW91c2VFbnRlcj86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBtb3VzZUxlYXZlPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNDYWxsYmFja3Mge1xuICBub2RlRHJhZ3N0YXJ0OiAoZXZlbnQ6IERyYWdFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBub2RlRHJhZ2VuZDogKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQ7XG4gIGVkZ2VEcmFnc3RhcnQ6IChldmVudDogRHJhZ0V2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiB2b2lkO1xuICBlZGdlRHJhZ2VuZDogKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQ7XG4gIGVkZ2VEcm9wOiAoZXZlbnQ6IERyYWdFdmVudCwgdGFyZ2V0Q29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbjtcbiAgZWRnZURyYWdvdmVyQ29ubmVjdG9yOiAoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbjtcbiAgZWRnZURyYWdvdmVyTWFnbmV0OiAoZXZlbnQ6IERyYWdFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbjtcbiAgZWRnZURyYWdsZWF2ZU1hZ25ldDogKGV2ZW50OiBEcmFnRXZlbnQpID0+IHZvaWQ7XG4gIG5vZGVNb3VzZU92ZXI6IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBub2RlTW91c2VPdXQ6IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBjb25uZWN0b3JNb3VzZUVudGVyOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IHZvaWQ7XG4gIGNvbm5lY3Rvck1vdXNlTGVhdmU6IChldmVudDogTW91c2VFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gdm9pZDtcbiAgbm9kZUNsaWNrZWQ6IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQWRqYWNlbnRMaXN0IHtcbiAgW2lkOiBzdHJpbmddOiB7XG4gICAgaW5jb21pbmc6IG51bWJlcjtcbiAgICBvdXRnb2luZzogQXJyYXk8c3RyaW5nPjtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsdmFsaWRhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmNUb3BTb3J0KGdyYXBoOiBGY01vZGVsKTogQXJyYXk8c3RyaW5nPiB8IG51bGwge1xuICBjb25zdCBhZGphY2VudExpc3Q6IEZjQWRqYWNlbnRMaXN0ID0ge307XG4gIGdyYXBoLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBhZGphY2VudExpc3Rbbm9kZS5pZF0gPSB7aW5jb21pbmc6IDAsIG91dGdvaW5nOiBbXX07XG4gIH0pO1xuICBncmFwaC5lZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgY29uc3Qgc291cmNlTm9kZSA9IGdyYXBoLm5vZGVzLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5zb3VyY2U7XG4gICAgICB9KTtcbiAgICB9KVswXTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbk5vZGUgPSBncmFwaC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuc29tZSgoY29ubmVjdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3IuaWQgPT09IGVkZ2UuZGVzdGluYXRpb247XG4gICAgICB9KTtcbiAgICB9KVswXTtcbiAgICBhZGphY2VudExpc3Rbc291cmNlTm9kZS5pZF0ub3V0Z29pbmcucHVzaChkZXN0aW5hdGlvbk5vZGUuaWQpO1xuICAgIGFkamFjZW50TGlzdFtkZXN0aW5hdGlvbk5vZGUuaWRdLmluY29taW5nKys7XG4gIH0pO1xuICBjb25zdCBvcmRlcmVkTm9kZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHNvdXJjZU5vZGVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgT2JqZWN0LmtleXMoYWRqYWNlbnRMaXN0KSkge1xuICAgIGNvbnN0IGVkZ2VzID0gYWRqYWNlbnRMaXN0W25vZGVdO1xuICAgIGlmIChlZGdlcy5pbmNvbWluZyA9PT0gMCkge1xuICAgICAgc291cmNlTm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKHNvdXJjZU5vZGVzLmxlbmd0aCAhPT0gMCkge1xuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBzb3VyY2VOb2Rlcy5wb3AoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkamFjZW50TGlzdFtzb3VyY2VOb2RlXS5vdXRnb2luZy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGVdLm91dGdvaW5nW2ldO1xuICAgICAgYWRqYWNlbnRMaXN0W2Rlc3RpbmF0aW9uTm9kZV0uaW5jb21pbmctLTtcbiAgICAgIGlmIChhZGphY2VudExpc3RbZGVzdGluYXRpb25Ob2RlXS5pbmNvbWluZyA9PT0gMCkge1xuICAgICAgICBzb3VyY2VOb2Rlcy5wdXNoKGRlc3RpbmF0aW9uTm9kZSk7XG4gICAgICB9XG4gICAgICBhZGphY2VudExpc3Rbc291cmNlTm9kZV0ub3V0Z29pbmcuc3BsaWNlKGksIDEpO1xuICAgICAgaS0tO1xuICAgIH1cbiAgICBvcmRlcmVkTm9kZXMucHVzaChzb3VyY2VOb2RlKTtcbiAgfVxuICBsZXQgaGFzRWRnZXMgPSBmYWxzZTtcbiAgZm9yIChjb25zdCBub2RlIG9mIE9iamVjdC5rZXlzKGFkamFjZW50TGlzdCkpIHtcbiAgICBjb25zdCBlZGdlcyA9IGFkamFjZW50TGlzdFtub2RlXTtcbiAgICBpZiAoZWRnZXMuaW5jb21pbmcgIT09IDApIHtcbiAgICAgIGhhc0VkZ2VzID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGhhc0VkZ2VzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9yZGVyZWROb2RlcztcbiAgfVxufVxuIl19