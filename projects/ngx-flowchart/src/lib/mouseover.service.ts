import { FcConnector, FcEdge, FcNode } from './ngx-flowchart.models';

export class FcMouseOverService {

  mouseoverscope: MouseOverScope = {
    connector: null,
    edge: null,
    node: null
  };

  private readonly applyFunction: <T>(fn: (...args: any[]) => T) => T;

  constructor(applyFunction: <T>(fn: (...args: any[]) => T) => T) {
    this.applyFunction = applyFunction;
  }

  public nodeMouseOver(_event: MouseEvent, node: FcNode) {
    return this.applyFunction(() => {
      this.mouseoverscope.node = node;
    });
  }

  public nodeMouseOut(_event: MouseEvent, _node: FcNode) {
    return this.applyFunction(() => {
      this.mouseoverscope.node = null;
    });
  }

  public connectorMouseEnter(_event: MouseEvent, connector: FcConnector) {
    return this.applyFunction(() => {
      this.mouseoverscope.connector = connector;
    });
  }

  public connectorMouseLeave(_event: MouseEvent, _connector: FcConnector) {
    return this.applyFunction(() => {
      this.mouseoverscope.connector = null;
    });
  }

  public edgeMouseEnter(_event: MouseEvent, edge: FcEdge) {
    this.mouseoverscope.edge = edge;
  }

  public edgeMouseLeave(_event: MouseEvent, _edge: FcEdge) {
    this.mouseoverscope.edge = null;
  }
}

export interface MouseOverScope {
  connector: FcConnector;
  edge: FcEdge;
  node: FcNode;
}
