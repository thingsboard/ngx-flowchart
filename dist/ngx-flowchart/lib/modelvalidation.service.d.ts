import { FcConnector, FcEdge, FcModel, FcNode } from './ngx-flowchart.models';
export declare class FcModelValidationService {
    constructor();
    validateModel(model: FcModel): FcModel;
    validateNodes(nodes: Array<FcNode>): Array<FcNode>;
    validateNode(node: FcNode): FcNode;
    private _validateEdges;
    validateEdges(edges: Array<FcEdge>, nodes: Array<FcNode>): Array<FcEdge>;
    private _validateEdge;
    validateEdge(edge: FcEdge, nodes: Array<FcNode>): FcEdge;
    validateConnector(connector: FcConnector): FcConnector;
}
