import { FcModelService } from './model.service';
import { FcConnector, FcCoords, FcEdge, FcModel, FlowchartConstants, ModelvalidationError } from './ngx-flowchart.models';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcModelValidationService } from './modelvalidation.service';

export class FcEdgeDraggingService {

  edgeDragging: EdgeDragging = {
    isDragging: false,
    dragPoint1: null,
    dragPoint2: null,
    shadowDragStarted: false
  };

  private draggedEdgeSource: FcConnector = null;
  private dragOffset: FcCoords = {};
  private destinationHtmlElement: HTMLElement = null;
  private oldDisplayStyle = '';

  private readonly modelValidation: FcModelValidationService;
  private readonly edgeDrawingService: FcEdgeDrawingService;
  private readonly modelService: FcModelService;
  private readonly model: FcModel;
  private readonly isValidEdgeCallback: (source: FcConnector, destination: FcConnector) => boolean;
  private readonly applyFunction: <T>(fn: (...args: any[]) => T) => T;
  private readonly dragAnimation: string;
  private readonly edgeStyle: string;

  constructor(modelValidation: FcModelValidationService,
              edgeDrawingService: FcEdgeDrawingService,
              modelService: FcModelService,
              model: FcModel,
              isValidEdgeCallback: (source: FcConnector, destination: FcConnector) => boolean,
              applyFunction: <T>(fn: (...args: any[]) => T) => T,
              dragAnimation: string,
              edgeStyle: string) {
    this.modelValidation = modelValidation;
    this.edgeDrawingService = edgeDrawingService;
    this.modelService = modelService;
    this.model = model;
    this.isValidEdgeCallback = isValidEdgeCallback || (() => true);
    this.applyFunction = applyFunction;
    this.dragAnimation = dragAnimation;
    this.edgeStyle = edgeStyle;
  }

  public dragstart(event: DragEvent, connector: FcConnector) {
    let swapConnector: FcConnector;
    let dragLabel: string;
    let prevEdge: FcEdge;
    if (connector.type === FlowchartConstants.leftConnectorType) {
      for (const edge of this.model.edges) {
        if (edge.destination === connector.id) {
          swapConnector = this.modelService.connectors.getConnector(edge.source);
          dragLabel = edge.label;
          prevEdge = edge;
          this.applyFunction(() => {
            this.modelService.edges.delete(edge);
          });
          break;
        }
      }
    }
    this.edgeDragging.isDragging = true;
    if (swapConnector !== undefined) {
      this.draggedEdgeSource = swapConnector;
      this.edgeDragging.dragPoint1 = this.modelService.connectors.getCenteredCoord(swapConnector.id);
      this.edgeDragging.dragLabel = dragLabel;
      this.edgeDragging.prevEdge = prevEdge;
    } else {
      this.draggedEdgeSource = connector;
      this.edgeDragging.dragPoint1 = this.modelService.connectors.getCenteredCoord(connector.id);
    }
    const canvas = this.modelService.canvasHtmlElement;
    if (!canvas) {
      throw new Error('No canvas while edgedraggingService found.');
    }
    this.dragOffset.x = -canvas.getBoundingClientRect().left;
    this.dragOffset.y = -canvas.getBoundingClientRect().top;

    this.edgeDragging.dragPoint2 = {
      x: event.clientX + this.dragOffset.x,
      y: event.clientY + this.dragOffset.y
    };
    const originalEvent: DragEvent = (event as any).originalEvent || event;

    originalEvent.dataTransfer.setData('Text', 'Just to support firefox');
    if (originalEvent.dataTransfer.setDragImage) {
      originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
    } else {
      this.destinationHtmlElement = event.target as HTMLElement;
      this.oldDisplayStyle = this.destinationHtmlElement.style.display;
      this.destinationHtmlElement.style.display = 'none';
      if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
        this.edgeDragging.shadowDragStarted = true;
      }
    }
    if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
      if (this.edgeDragging.gElement === undefined) {
        this.edgeDragging.gElement = $(document.querySelectorAll('.shadow-svg-class'));
        this.edgeDragging.pathElement = $(document.querySelectorAll('.shadow-svg-class')).find('path');
        this.edgeDragging.circleElement = $(document.querySelectorAll('.shadow-svg-class')).find('circle');
      }

      this.edgeDragging.gElement.css('display', 'block');
      this.edgeDragging.pathElement.attr('d',
        this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
      this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
      this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);
    }
    event.stopPropagation();
  }

  public dragover(event: DragEvent) {
    if (this.edgeDragging.isDragging) {
      if (!this.edgeDragging.magnetActive && this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
        if (this.destinationHtmlElement !== null) {
          this.destinationHtmlElement.style.display = this.oldDisplayStyle;
        }

        if (this.edgeDragging.shadowDragStarted) {
          this.applyFunction(() => {
            this.edgeDragging.shadowDragStarted = false;
          });
        }

        this.edgeDragging.dragPoint2 = {
          x: event.clientX + this.dragOffset.x,
          y: event.clientY + this.dragOffset.y
        };

        this.edgeDragging.pathElement.attr('d',
          this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
        this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
        this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);

      } else if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
        return this.applyFunction(() => {
          if (this.destinationHtmlElement !== null) {
            this.destinationHtmlElement.style.display = this.oldDisplayStyle;
          }

          this.edgeDragging.dragPoint2 = {
            x: event.clientX + this.dragOffset.x,
            y: event.clientY + this.dragOffset.y
          };
        });
      }
    }
  }

  public dragoverConnector(event: DragEvent, connector: FcConnector): boolean {
    if (this.edgeDragging.isDragging) {
      this.dragover(event);
      try {
        this.modelValidation.validateEdges(this.model.edges.concat([{
          source: this.draggedEdgeSource.id,
          destination: connector.id
        }]), this.model.nodes);
      } catch (error) {
        if (error instanceof ModelvalidationError) {
          return true;
        } else {
          throw error;
        }
      }
      if (this.isValidEdgeCallback(this.draggedEdgeSource, connector)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }

  public dragleaveMagnet(event: DragEvent) {
    this.edgeDragging.magnetActive = false;
  }

  public dragoverMagnet(event: DragEvent, connector: FcConnector): boolean {
    if (this.edgeDragging.isDragging) {
      this.dragover(event);
      try {
        this.modelValidation.validateEdges(this.model.edges.concat([{
          source: this.draggedEdgeSource.id,
          destination: connector.id
        }]), this.model.nodes);
      } catch (error) {
        if (error instanceof ModelvalidationError) {
          return true;
        } else {
          throw error;
        }
      }
      if (this.isValidEdgeCallback(this.draggedEdgeSource, connector)) {
        if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {

          this.edgeDragging.magnetActive = true;

          this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
          this.edgeDragging.pathElement.attr('d',
            this.edgeDrawingService.getEdgeDAttribute(this.edgeDragging.dragPoint1, this.edgeDragging.dragPoint2, this.edgeStyle));
          this.edgeDragging.circleElement.attr('cx', this.edgeDragging.dragPoint2.x);
          this.edgeDragging.circleElement.attr('cy', this.edgeDragging.dragPoint2.y);

          event.preventDefault();
          event.stopPropagation();
          return false;
        } else if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
          return this.applyFunction(() => {
            this.edgeDragging.dragPoint2 = this.modelService.connectors.getCenteredCoord(connector.id);
            event.preventDefault();
            event.stopPropagation();
            return false;
          });
        }
      }
    }
  }

  public dragend(event: DragEvent) {
    if (this.edgeDragging.isDragging) {
      this.edgeDragging.isDragging = false;
      this.edgeDragging.dragPoint1 = null;
      this.edgeDragging.dragPoint2 = null;
      this.edgeDragging.dragLabel = null;
      event.stopPropagation();

      if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
        this.edgeDragging.gElement.css('display', 'none');
      }
      if (this.edgeDragging.prevEdge) {
        const edge = this.edgeDragging.prevEdge;
        this.edgeDragging.prevEdge = null;
        this.applyFunction(() => {
          this.modelService.edges.putEdge(edge);
        });
      }
    }
  }

  public drop(event: DragEvent, targetConnector: FcConnector): boolean {
    if (this.edgeDragging.isDragging) {
      try {
        this.modelValidation.validateEdges(this.model.edges.concat([{
          source: this.draggedEdgeSource.id,
          destination: targetConnector.id
        }]), this.model.nodes);
      } catch (error) {
        if (error instanceof ModelvalidationError) {
          return true;
        } else {
          throw error;
        }
      }

      if (this.isValidEdgeCallback(this.draggedEdgeSource, targetConnector)) {
        this.edgeDragging.prevEdge = null;
        this.modelService.edges._addEdge(event, this.draggedEdgeSource, targetConnector, this.edgeDragging.dragLabel);
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
    }
  }
}

export interface EdgeDragging {
  isDragging: boolean;
  shadowDragStarted: boolean;
  dragPoint1: FcCoords;
  dragPoint2: FcCoords;
  dragLabel?: string;
  prevEdge?: FcEdge;
  magnetActive?: boolean;
  gElement?: JQuery<Element>;
  pathElement?: JQuery<Element>;
  circleElement?: JQuery<Element>;
}
