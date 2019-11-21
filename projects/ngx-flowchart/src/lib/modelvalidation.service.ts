import { Injectable } from '@angular/core';
import { FcConnector, FcEdge, FcModel, FcNode, fcTopSort, ModelvalidationError } from './ngx-flowchart.models';

@Injectable()
export class FcModelValidationService {

  constructor() { }

  public validateModel(model: FcModel): FcModel {
    this.validateNodes(model.nodes);
    this._validateEdges(model.edges, model.nodes);
    return model;
  }

  public validateNodes(nodes: Array<FcNode>): Array<FcNode> {
    const ids: string[] = [];
    nodes.forEach((node) => {
      this.validateNode(node);
      if (ids.indexOf(node.id) !== -1) {
        throw new ModelvalidationError('Id not unique.');
      }
      ids.push(node.id);
    });
    const connectorIds: string[] = [];
    nodes.forEach((node) => {
      node.connectors.forEach((connector) => {
        if (connectorIds.indexOf(connector.id) !== -1) {
          throw new ModelvalidationError('Id not unique.');
        }
        connectorIds.push(connector.id);
      });
    });
    return nodes;
  }

  public validateNode(node: FcNode): FcNode {
    if (node.id === undefined) {
      throw new ModelvalidationError('Id not valid.');
    }
    if (typeof node.name !== 'string') {
      throw new ModelvalidationError('Name not valid.');
    }
    if (typeof node.x !== 'number' || node.x < 0 || Math.round(node.x) !== node.x) {
      throw new ModelvalidationError('Coordinates not valid.');
    }
    if (typeof node.y !== 'number' || node.y < 0 || Math.round(node.y) !== node.y) {
      throw new ModelvalidationError('Coordinates not valid.');
    }
    if (!Array.isArray(node.connectors)) {
      throw new ModelvalidationError('Connectors not valid.');
    }
    node.connectors.forEach((connector) => {
      this.validateConnector(connector);
    });
    return node;
  }

  private _validateEdges(edges: Array<FcEdge>, nodes: Array<FcNode>): Array<FcEdge> {
    edges.forEach((edge) => {
      this._validateEdge(edge, nodes);
    });
    edges.forEach((edge1, index1) => {
      edges.forEach((edge2, index2) => {
        if (index1 !== index2) {
          if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
            (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
            throw new ModelvalidationError('Duplicated edge.');
          }
        }
      });
    });
    if (fcTopSort({nodes, edges}) === null) {
      throw new ModelvalidationError('Graph has a circle.');
    }
    return edges;
  }

  public validateEdges(edges: Array<FcEdge>, nodes: Array<FcNode>): Array<FcEdge> {
    this.validateNodes(nodes);
    return this._validateEdges(edges, nodes);
  }

  private _validateEdge(edge: FcEdge, nodes: Array<FcNode>): FcEdge {
    if (edge.source === undefined) {
      throw new ModelvalidationError('Source not valid.');
    }
    if (edge.destination === undefined) {
      throw new ModelvalidationError('Destination not valid.');
    }
    if (edge.source === edge.destination) {
      throw new ModelvalidationError('Edge with same source and destination connectors.');
    }
    const sourceNode = nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.source))[0];
    if (sourceNode === undefined) {
      throw new ModelvalidationError('Source not valid.');
    }
    const destinationNode = nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.destination))[0];
    if (destinationNode === undefined) {
      throw new ModelvalidationError('Destination not valid.');
    }
    if (sourceNode === destinationNode) {
      throw new ModelvalidationError('Edge with same source and destination nodes.');
    }
    return edge;
  }

  public validateEdge(edge: FcEdge, nodes: Array<FcNode>): FcEdge {
    this.validateNodes(nodes);
    return this._validateEdge(edge, nodes);
  }

  public validateConnector(connector: FcConnector): FcConnector {
    if (connector.id === undefined) {
      throw new ModelvalidationError('Id not valid.');
    }
    if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
      throw new ModelvalidationError('Type not valid.');
    }
    return connector;
  }

}
