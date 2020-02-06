import { Observable } from 'rxjs';
import { InjectionToken, Type } from '@angular/core';
import { FcNodeComponent } from './node.component';

export const FC_NODE_COMPONENT_CONFIG = new InjectionToken<FcNodeComponentConfig>('fc-node.component.config');

export interface FcNodeComponentConfig {
  nodeComponentType: Type<FcNodeComponent>;
}

const htmlPrefix = 'fc';
const leftConnectorType = 'leftConnector';
const rightConnectorType = 'rightConnector';

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


export interface FcCoords {
  x?: number;
  y?: number;
}

export interface FcRectBox {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface FcConnector {
  id: string;
  type: string;
}

export interface FcNode extends FcCoords {
  id: string;
  name: string;
  connectors: Array<FcConnector>;
  readonly?: boolean;
  [key: string]: any;
}

export interface FcNodeRectInfo {
  width(): number;
  height(): number;
  top(): number;
  left(): number;
  right(): number;
  bottom(): number;
}

export interface FcConnectorRectInfo {
  type: string;
  width: number;
  height: number;
  nodeRectInfo: FcNodeRectInfo;
}

export interface FcEdge {
  label?: string;
  source?: string;
  destination?: string;
  active?: boolean;
}

export interface FcItemInfo {
  node?: FcNode;
  edge?: FcEdge;
}

export interface FcModel {
  nodes: Array<FcNode>;
  edges: Array<FcEdge>;
}

export interface UserCallbacks {
  dropNode?: (event: Event, node: FcNode) => void;
  createEdge?: (event: Event, edge: FcEdge) => Observable<FcEdge>;
  edgeAdded?: (edge: FcEdge) => void;
  nodeRemoved?: (node: FcNode) => void;
  edgeRemoved?: (edge: FcEdge) => void;
  edgeDoubleClick?: (event: MouseEvent, edge: FcEdge) => void;
  edgeMouseOver?: (event: MouseEvent, edge: FcEdge) => void;
  isValidEdge?: (source: FcConnector, destination: FcConnector) => boolean;
  edgeEdit?: (event: Event, edge: FcEdge) => void;
  nodeCallbacks?: UserNodeCallbacks;
}

export interface UserNodeCallbacks {
  nodeEdit?: (event: MouseEvent, node: FcNode) => void;
  doubleClick?: (event: MouseEvent, node: FcNode) => void;
  mouseDown?: (event: MouseEvent, node: FcNode) => void;
  mouseEnter?: (event: MouseEvent, node: FcNode) => void;
  mouseLeave?: (event: MouseEvent, node: FcNode) => void;
}

export interface FcCallbacks {
  nodeDragstart: (event: DragEvent, node: FcNode) => void;
  nodeDragend: (event: DragEvent) => void;
  edgeDragstart: (event: DragEvent, connector: FcConnector) => void;
  edgeDragend: (event: DragEvent) => void;
  edgeDrop: (event: DragEvent, targetConnector: FcConnector) => boolean;
  edgeDragoverConnector: (event: DragEvent, connector: FcConnector) => boolean;
  edgeDragoverMagnet: (event: DragEvent, connector: FcConnector) => boolean;
  edgeDragleaveMagnet: (event: DragEvent) => void;
  nodeMouseOver: (event: MouseEvent, node: FcNode) => void;
  nodeMouseOut: (event: MouseEvent, node: FcNode) => void;
  connectorMouseEnter: (event: MouseEvent, connector: FcConnector) => void;
  connectorMouseLeave: (event: MouseEvent, connector: FcConnector) => void;
  nodeClicked: (event: MouseEvent, node: FcNode) => void;
}

export interface FcAdjacentList {
  [id: string]: {
    incoming: number;
    outgoing: Array<string>;
  };
}

class BaseError {
  constructor() {
    Error.apply(this, arguments);
  }
}

Object.defineProperty(BaseError, 'prototype', new Error());

export class ModelvalidationError extends BaseError {
  constructor(public message: string) {
    super();
  }
}

export function fcTopSort(graph: FcModel): Array<string> | null {
  const adjacentList: FcAdjacentList = {};
  graph.nodes.forEach((node) => {
    adjacentList[node.id] = {incoming: 0, outgoing: []};
  });
  graph.edges.forEach((edge) => {
    const sourceNode = graph.nodes.filter((node) => {
      return node.connectors.some((connector) => {
        return connector.id === edge.source;
      });
    })[0];
    const destinationNode = graph.nodes.filter((node) => {
      return node.connectors.some((connector) => {
        return connector.id === edge.destination;
      });
    })[0];
    adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
    adjacentList[destinationNode.id].incoming++;
  });
  const orderedNodes: string[] = [];
  const sourceNodes: string[] = [];
  for (const node of Object.keys(adjacentList)) {
    const edges = adjacentList[node];
    if (edges.incoming === 0) {
      sourceNodes.push(node);
    }
  }
  while (sourceNodes.length !== 0) {
    const sourceNode = sourceNodes.pop();
    for (let i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
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
  let hasEdges = false;
  for (const node of Object.keys(adjacentList)) {
    const edges = adjacentList[node];
    if (edges.incoming !== 0) {
      hasEdges = true;
    }
  }
  if (hasEdges) {
    return null;
  } else {
    return orderedNodes;
  }
}
