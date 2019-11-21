import { FcModelValidationService } from './modelvalidation.service';
import { FcConnector, FcCoords, FcEdge, FcItemInfo, FcModel, FcNode, FcRectBox } from './ngx-flowchart.models';
import { Observable, of, Subject } from 'rxjs';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

export class FcModelService {

  modelValidation: FcModelValidationService;
  model: FcModel;
  cd: ChangeDetectorRef;
  selectedObjects: any[];

  connectorsHtmlElements: HtmlElementMap = {};
  nodesHtmlElements: HtmlElementMap = {};
  canvasHtmlElement: HTMLElement = null;
  dragImage: HTMLImageElement = null;
  svgHtmlElement: SVGElement = null;

  dropNode: (event: Event, node: FcNode) => void;
  createEdge: (event: Event, edge: FcEdge) => Observable<FcEdge>;
  edgeAddedCallback: (edge: FcEdge) => void;
  nodeRemovedCallback: (node: FcNode) => void;
  edgeRemovedCallback: (edge: FcEdge) => void;

  dropTargetId: string;

  private readonly modelChanged: EventEmitter<any>;
  private readonly debouncer = new Subject<any>();

  connectors: ConnectorsModel;
  nodes: NodesModel;
  edges: EdgesModel;

  constructor(modelValidation: FcModelValidationService,
              model: FcModel,
              modelChanged: EventEmitter<any>,
              cd: ChangeDetectorRef,
              selectedObjects: any[],
              dropNode: (event: Event, node: FcNode) => void,
              createEdge: (event: Event, edge: FcEdge) => Observable<FcEdge>,
              edgeAddedCallback: (edge: FcEdge) => void,
              nodeRemovedCallback: (node: FcNode) => void,
              edgeRemovedCallback: (edge: FcEdge) => void,
              canvasHtmlElement: HTMLElement,
              svgHtmlElement: SVGElement) {

    this.modelValidation = modelValidation;
    this.model = model;
    this.modelChanged = modelChanged;
    this.cd = cd;
    this.canvasHtmlElement = canvasHtmlElement;
    this.svgHtmlElement = svgHtmlElement;
    this.modelValidation.validateModel(this.model);
    this.selectedObjects = selectedObjects;

    this.dropNode = dropNode || (() => {});
    this.createEdge = createEdge || ((event, edge) => of({...edge, label: 'label'}));
    this.edgeAddedCallback = edgeAddedCallback || (() => {});
    this.nodeRemovedCallback = nodeRemovedCallback || (() => {});
    this.edgeRemovedCallback = edgeRemovedCallback || (() => {});

    this.connectors = new ConnectorsModel(this);
    this.nodes = new NodesModel(this);
    this.edges = new EdgesModel(this);

    this.debouncer
      .pipe(debounceTime(100))
      .subscribe(() => this.modelChanged.emit());
  }

  public notifyModelChanged() {
    this.debouncer.next();
  }

  public detectChanges() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 0);
  }

  public selectObject(object: any) {
    if (this.isEditable()) {
      if (this.selectedObjects.indexOf(object) === -1) {
        this.selectedObjects.push(object);
      }
    }
  }

  public deselectObject(object: any) {
    if (this.isEditable()) {
      const index = this.selectedObjects.indexOf(object);
      if (index === -1) {
        throw new Error('Tried to deselect an unselected object');
      }
      this.selectedObjects.splice(index, 1);
    }
  }

  public toggleSelectedObject(object: any) {
    if (this.isSelectedObject(object)) {
      this.deselectObject(object);
    } else {
      this.selectObject(object);
    }
  }

  public isSelectedObject(object: any): boolean {
    return this.selectedObjects.indexOf(object) !== -1;
  }

  public selectAll() {
    this.model.nodes.forEach(node => {
      if (!node.readonly) {
        this.nodes.select(node);
      }
    });
    this.model.edges.forEach(edge => {
      this.edges.select(edge);
    });
    this.detectChanges();
  }

  public deselectAll() {
    this.selectedObjects.splice(0, this.selectedObjects.length);
    this.detectChanges();
  }

  public isEditObject(object: any): boolean {
    return this.selectedObjects.length === 1 &&
      this.selectedObjects.indexOf(object) !== -1;
  }

  private inRectBox(x: number, y: number, rectBox: FcRectBox): boolean {
    return x >= rectBox.left && x <= rectBox.right &&
      y >= rectBox.top && y <= rectBox.bottom;
  }

  public getItemInfoAtPoint(x: number, y: number): FcItemInfo {
    return {
      node: this.getNodeAtPoint(x, y),
      edge: this.getEdgeAtPoint(x, y)
    };
  }

  public getNodeAtPoint(x: number, y: number): FcNode {
    for (const node of this.model.nodes) {
      const element = this.nodes.getHtmlElement(node.id);
      const nodeElementBox = element.getBoundingClientRect();
      if (x >= nodeElementBox.left && x <= nodeElementBox.right
        && y >= nodeElementBox.top && y <= nodeElementBox.bottom) {
        return node;
      }
    }
    return null;
  }

  public getEdgeAtPoint(x: number, y: number): FcEdge {
    const element = document.elementFromPoint(x, y);
    const id = element.id;
    let edgeIndex = -1;
    if (id) {
      if (id.startsWith('fc-edge-path-')) {
        edgeIndex = Number(id.substring('fc-edge-path-'.length));
      } else if (id.startsWith('fc-edge-label-')) {
        edgeIndex = Number(id.substring('fc-edge-label-'.length));
      }
    }
    if (edgeIndex > -1) {
      return this.model.edges[edgeIndex];
    }
    return null;
  }

  public selectAllInRect(rectBox: FcRectBox) {
    this.model.nodes.forEach((value) => {
      const element = this.nodes.getHtmlElement(value.id);
      const nodeElementBox = element.getBoundingClientRect();
      if (!value.readonly) {
        const x = nodeElementBox.left + nodeElementBox.width / 2;
        const y = nodeElementBox.top + nodeElementBox.height / 2;
        if (this.inRectBox(x, y, rectBox)) {
          this.nodes.select(value);
        } else {
          if (this.nodes.isSelected(value)) {
            this.nodes.deselect(value);
          }
        }
      }
    });
    const canvasElementBox = this.canvasHtmlElement.getBoundingClientRect();
    this.model.edges.forEach((value) => {
      const start = this.edges.sourceCoord(value);
      const end = this.edges.destCoord(value);
      const x = (start.x + end.x) / 2 + canvasElementBox.left;
      const y = (start.y + end.y) / 2 + canvasElementBox.top;
      if (this.inRectBox(x, y, rectBox)) {
        this.edges.select(value);
      } else {
        if (this.edges.isSelected(value)) {
          this.edges.deselect(value);
        }
      }
    });
  }

  public deleteSelected() {
    const edgesToDelete = this.edges.getSelectedEdges();
    edgesToDelete.forEach((edge) => {
      this.edges.delete(edge);
    });
    const nodesToDelete = this.nodes.getSelectedNodes();
    nodesToDelete.forEach((node) => {
      this.nodes.delete(node);
    });
  }

  public isEditable(): boolean {
    return this.dropTargetId === undefined;
  }

  public isDropSource(): boolean {
    return this.dropTargetId !== undefined;
  }

  public getDragImage(): HTMLImageElement {
    if (!this.dragImage) {
      this.dragImage = new Image();
      this.dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      this.dragImage.style.visibility = 'hidden';
    }
    return this.dragImage;
  }

  public registerCallbacks(edgeAddedCallback: (edge: FcEdge) => void,
                           nodeRemovedCallback: (node: FcNode) => void,
                           edgeRemovedCallback: (edge: FcEdge) => void) {
    this.edgeAddedCallback = edgeAddedCallback;
    this.nodeRemovedCallback = nodeRemovedCallback;
    this.edgeRemovedCallback = edgeRemovedCallback;
  }

}

interface HtmlElementMap { [id: string]: HTMLElement; }

abstract class AbstractFcModel<T> {

  modelService: FcModelService;

  protected constructor(modelService: FcModelService) {
    this.modelService = modelService;
  }

  public select(object: T) {
    this.modelService.selectObject(object);
  }

  public deselect(object: T) {
    this.modelService.deselectObject(object);
  }

  public toggleSelected(object: T) {
    this.modelService.toggleSelectedObject(object);
  }

  public isSelected(object: T): boolean {
    return this.modelService.isSelectedObject(object);
  }

  public isEdit(object: T): boolean {
    return this.modelService.isEditObject(object);
  }
}

class ConnectorsModel extends AbstractFcModel<FcConnector> {

  constructor(modelService: FcModelService) {
    super(modelService);
  }

  public getConnector(connectorId: string): FcConnector {
    const model = this.modelService.model;
    for (const node of model.nodes) {
      for (const connector of node.connectors) {
        if (connector.id === connectorId) {
          return connector;
        }
      }
    }
  }

  public getHtmlElement(connectorId: string): HTMLElement {
    return this.modelService.connectorsHtmlElements[connectorId];
  }

  public setHtmlElement(connectorId: string, element: HTMLElement) {
    this.modelService.connectorsHtmlElements[connectorId] = element;
    this.modelService.detectChanges();
  }

  private _getCoords(connectorId: string, centered?: boolean): FcCoords {
    const element = this.getHtmlElement(connectorId);
    const canvas = this.modelService.canvasHtmlElement;
    if (element === null || element === undefined || canvas === null) {
      return {x: 0, y: 0};
    }
    const connectorElementBox = element.getBoundingClientRect();
    const canvasElementBox = canvas.getBoundingClientRect();
    let coords: FcCoords = {
      x: connectorElementBox.left - canvasElementBox.left,
      y: connectorElementBox.top - canvasElementBox.top
    };
    if (centered) {
      coords = {
        x: Math.round(coords.x + element.offsetWidth / 2),
        y: Math.round(coords.y + element.offsetHeight / 2)
      };
    }
    return coords;
  }

  public getCoords(connectorId: string): FcCoords {
    return this._getCoords(connectorId, false);
  }

  public getCenteredCoord(connectorId: string): FcCoords {
    return this._getCoords(connectorId, true);
  }
}

class NodesModel extends AbstractFcModel<FcNode> {

  constructor(modelService: FcModelService) {
    super(modelService);
  }

  public getConnectorsByType(node: FcNode, type: string): Array<FcConnector> {
    return node.connectors.filter((connector) => {
      return connector.type === type;
    });
  }

  private _addConnector(node: FcNode, connector: FcConnector) {
    node.connectors.push(connector);
    try {
      this.modelService.modelValidation.validateNode(node);
    } catch (error) {
      node.connectors.splice(node.connectors.indexOf(connector), 1);
      throw error;
    }
  }

  public delete(node: FcNode) {
    if (this.isSelected(node)) {
      this.deselect(node);
    }
    const model = this.modelService.model;
    const index = model.nodes.indexOf(node);
    if (index === -1) {
      if (node === undefined) {
        throw new Error('Passed undefined');
      }
      throw new Error('Tried to delete not existing node');
    }
    const connectorIds = this.getConnectorIds(node);
    for (let i = 0; i < model.edges.length; i++) {
      const edge = model.edges[i];
      if (connectorIds.indexOf(edge.source) !== -1 || connectorIds.indexOf(edge.destination) !== -1) {
        this.modelService.edges.delete(edge);
        i--;
      }
    }
    model.nodes.splice(index, 1);
    this.modelService.notifyModelChanged();
    this.modelService.nodeRemovedCallback(node);
  }

  public getSelectedNodes(): Array<FcNode> {
    const model = this.modelService.model;
    return model.nodes.filter((node) => {
      return this.modelService.nodes.isSelected(node);
    });
  }

  public handleClicked(node: FcNode, ctrlKey?: boolean) {
    if (ctrlKey) {
      this.modelService.nodes.toggleSelected(node);
    } else {
      this.modelService.deselectAll();
      this.modelService.nodes.select(node);
    }
  }

  private _addNode(node: FcNode) {
    const model = this.modelService.model;
    try {
      model.nodes.push(node);
      this.modelService.modelValidation.validateNodes(model.nodes);
    } catch (error) {
      model.nodes.splice(model.nodes.indexOf(node), 1);
      throw error;
    }
  }

  public getConnectorIds(node: FcNode): Array<string> {
    return node.connectors.map((connector) => {
      return connector.id;
    });
  }

  public getNodeByConnectorId(connectorId: string): FcNode {
    const model = this.modelService.model;
    for (const node of model.nodes) {
      const connectorIds = this.getConnectorIds(node);
      if (connectorIds.indexOf(connectorId) > -1) {
        return node;
      }
    }
    return null;
  }

  public getHtmlElement(nodeId: string): HTMLElement {
    return this.modelService.nodesHtmlElements[nodeId];
  }

  public setHtmlElement(nodeId: string, element: HTMLElement) {
    this.modelService.nodesHtmlElements[nodeId] = element;
    this.modelService.detectChanges();
  }

}

class EdgesModel extends AbstractFcModel<FcEdge> {

  constructor(modelService: FcModelService) {
    super(modelService);
  }

  public ready(edge: FcEdge): boolean {
    const source = this.modelService.connectors.getHtmlElement(edge.source);
    const destination = this.modelService.connectors.getHtmlElement(edge.destination);
    return source !== undefined && destination !== undefined;
  }

  public sourceCoord(edge: FcEdge): FcCoords {
    return this.modelService.connectors.getCenteredCoord(edge.source);
  }

  public destCoord(edge: FcEdge): FcCoords {
    return this.modelService.connectors.getCenteredCoord(edge.destination);
  }

  public delete(edge: FcEdge) {
    const model = this.modelService.model;
    const index = model.edges.indexOf(edge);
    if (index === -1) {
      throw new Error('Tried to delete not existing edge');
    }
    if (this.isSelected(edge)) {
      this.deselect(edge);
    }
    model.edges.splice(index, 1);
    this.modelService.notifyModelChanged();
    this.modelService.edgeRemovedCallback(edge);
  }

  public getSelectedEdges(): Array<FcEdge> {
    const model = this.modelService.model;
    return model.edges.filter((edge) => {
      return this.modelService.edges.isSelected(edge);
    });
  }

  public handleEdgeMouseClick(edge: FcEdge, ctrlKey?: boolean) {
    if (ctrlKey) {
      this.modelService.edges.toggleSelected(edge);
    } else {
      this.modelService.deselectAll();
      this.modelService.edges.select(edge);
    }
  }

  public putEdge(edge: FcEdge) {
    const model = this.modelService.model;
    model.edges.push(edge);
    this.modelService.notifyModelChanged();
  }

  public _addEdge(event: Event, sourceConnector: FcConnector, destConnector: FcConnector, label: string) {
    this.modelService.modelValidation.validateConnector(sourceConnector);
    this.modelService.modelValidation.validateConnector(destConnector);
    const edge: FcEdge = {};
    edge.source = sourceConnector.id;
    edge.destination = destConnector.id;
    edge.label = label;
    const model = this.modelService.model;
    this.modelService.modelValidation.validateEdges(model.edges.concat([edge]), model.nodes);
    this.modelService.createEdge(event, edge).subscribe(
      (created) => {
        model.edges.push(created);
        this.modelService.notifyModelChanged();
        this.modelService.edgeAddedCallback(created);
      }
    );
  }
}
