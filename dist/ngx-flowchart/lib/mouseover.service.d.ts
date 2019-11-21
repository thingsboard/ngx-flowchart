import { FcConnector, FcEdge, FcNode } from './ngx-flowchart.models';
export declare class FcMouseOverService {
    mouseoverscope: MouseOverScope;
    private readonly applyFunction;
    constructor(applyFunction: <T>(fn: (...args: any[]) => T) => T);
    nodeMouseOver(event: MouseEvent, node: FcNode): void;
    nodeMouseOut(event: MouseEvent, node: FcNode): void;
    connectorMouseEnter(event: MouseEvent, connector: FcConnector): void;
    connectorMouseLeave(event: MouseEvent, connector: FcConnector): void;
    edgeMouseEnter(event: MouseEvent, edge: FcEdge): void;
    edgeMouseLeave(event: MouseEvent, edge: FcEdge): void;
}
export interface MouseOverScope {
    connector: FcConnector;
    edge: FcEdge;
    node: FcNode;
}
