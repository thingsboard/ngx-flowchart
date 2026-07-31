///
/// Copyright 2016 ThingsBoard, Inc.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     https://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
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
