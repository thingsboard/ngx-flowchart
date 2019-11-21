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

  public nodeMouseOver(event: MouseEvent, node: FcNode) {
    return this.applyFunction(() => {
      this.mouseoverscope.node = node;
    });
  }

  public nodeMouseOut(event: MouseEvent, node: FcNode) {
    return this.applyFunction(() => {
      this.mouseoverscope.node = null;
    });
  }

  public connectorMouseEnter(event: MouseEvent, connector: FcConnector) {
    return this.applyFunction(() => {
      this.mouseoverscope.connector = connector;
    });
  }

  public connectorMouseLeave(event: MouseEvent, connector: FcConnector) {
    return this.applyFunction(() => {
      this.mouseoverscope.connector = null;
    });
  }

  public edgeMouseEnter(event: MouseEvent, edge: FcEdge) {
    this.mouseoverscope.edge = edge;
  }

  public edgeMouseLeave(event: MouseEvent, edge: FcEdge) {
    this.mouseoverscope.edge = null;
  }
}

export interface MouseOverScope {
  connector: FcConnector;
  edge: FcEdge;
  node: FcNode;
}
