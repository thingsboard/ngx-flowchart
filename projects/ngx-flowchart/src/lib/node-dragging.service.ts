import { FcModelService } from './model.service';
import { FcCoords, FcNode, FlowchartConstants } from './ngx-flowchart.models';

const nodeDropScope: NodeDropScope = {
  dropElement: null
};

export class FcNodeDraggingService {

  nodeDraggingScope: NodeDraggingScope = {
    shadowDragStarted: false,
    dropElement: null,
    draggedNodes: [],
    shadowElements: []
  };

  private dragOffsets: FcCoords[] = [];
  private draggedElements: HTMLElement[] = [];

  private destinationHtmlElements: HTMLElement[] = [];
  private oldDisplayStyles: string[] = [];

  private readonly modelService: FcModelService;
  private readonly automaticResize: boolean;
  private readonly dragAnimation: string;
  private readonly applyFunction: <T>(fn: (...args: any[]) => T) => T;

  constructor(modelService: FcModelService,
              applyFunction: <T>(fn: (...args: any[]) => T) => T,
              automaticResize: boolean, dragAnimation: string) {
    this.modelService = modelService;
    this.automaticResize = automaticResize;
    this.dragAnimation = dragAnimation;
    this.applyFunction = applyFunction;
  }

  private getCoordinate(coordinate: number, max: number): number {
    coordinate = Math.max(coordinate, 0);
    coordinate = Math.min(coordinate, max);
    return coordinate;
  }

  private getXCoordinate(x: number): number {
    return this.getCoordinate(x, this.modelService.canvasHtmlElement.offsetWidth);
  }

  private getYCoordinate(y: number): number {
    return this.getCoordinate(y, this.modelService.canvasHtmlElement.offsetHeight);
  }

  private resizeCanvas(draggedNode: FcNode, nodeElement: HTMLElement) {
    if (this.automaticResize && !this.modelService.isDropSource()) {
      const canvasElement = this.modelService.canvasHtmlElement;
      if (canvasElement.offsetWidth < draggedNode.x + nodeElement.offsetWidth + FlowchartConstants.canvasResizeThreshold) {
        canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
      }
      if (canvasElement.offsetHeight < draggedNode.y + nodeElement.offsetHeight + FlowchartConstants.canvasResizeThreshold) {
        canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
      }
    }
  }

  public isDraggingNode(node: FcNode): boolean {
    return this.nodeDraggingScope.draggedNodes.includes(node);
  }

  public dragstart(event: DragEvent, node: FcNode) {
    if (node.readonly) {
      return;
    }
    this.dragOffsets.length = 0;
    this.draggedElements.length = 0;
    this.nodeDraggingScope.draggedNodes.length = 0;
    this.nodeDraggingScope.shadowElements.length = 0;
    this.destinationHtmlElements.length = 0;
    this.oldDisplayStyles.length = 0;
    const elements: Array<JQuery<HTMLElement>> = [];
    const nodes: Array<FcNode> = [];
    if (this.modelService.nodes.isSelected(node)) {
      const selectedNodes = this.modelService.nodes.getSelectedNodes();
      for (const selectedNode of selectedNodes) {
        const element = $(this.modelService.nodes.getHtmlElement(selectedNode.id));
        elements.push(element);
        nodes.push(selectedNode);
      }
    } else {
      elements.push($(event.target as HTMLElement));
      nodes.push(node);
    }
    const offsetsX: number[] = [];
    const offsetsY: number[] = [];
    for (const element of elements) {
      offsetsX.push(parseInt(element.css('left'), 10) - event.clientX);
      offsetsY.push(parseInt(element.css('top'), 10) - event.clientY);
    }
    const originalEvent: DragEvent = (event as any).originalEvent || event;
    if (this.modelService.isDropSource()) {
      if (nodeDropScope.dropElement) {
        nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
        nodeDropScope.dropElement = null;
      }
      nodeDropScope.dropElement = elements[0][0].cloneNode(true) as NodeDropElement;
      const offset = $(this.modelService.canvasHtmlElement).offset();
      nodeDropScope.dropElement.offsetInfo = {
        offsetX: Math.round(offsetsX[0] + offset.left),
        offsetY: Math.round(offsetsY[0] + offset.top)
      };
      nodeDropScope.dropElement.style.position = 'absolute';
      nodeDropScope.dropElement.style.pointerEvents = 'none';
      nodeDropScope.dropElement.style.zIndex = '9999';

      document.body.appendChild(nodeDropScope.dropElement);
      const dropNodeInfo: DropNodeInfo = {
        node,
        dropTargetId: this.modelService.dropTargetId,
        offsetX: Math.round(offsetsX[0] + offset.left),
        offsetY: Math.round(offsetsY[0] + offset.top)
      };
      originalEvent.dataTransfer.setData('text', JSON.stringify(dropNodeInfo));

      if (originalEvent.dataTransfer.setDragImage) {
        originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
      } else {
        const target: HTMLElement = event.target as HTMLElement;
        const cloneNode = target.cloneNode(true);
        target.parentNode.insertBefore(cloneNode, target);
        target.style.visibility = 'collapse';
        setTimeout(() => {
          target.parentNode.removeChild(cloneNode);
          target.style.visibility = 'visible';
        }, 0);
      }
      return;
    }
    this.nodeDraggingScope.draggedNodes = nodes;
    for (let i = 0; i < elements.length; i++) {
      this.draggedElements.push(elements[i][0]);
      this.dragOffsets.push(
        {
          x: offsetsX[i],
          y: offsetsY[i]
        }
      );
    }

    if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
      for (let i = 0; i < this.draggedElements.length; i++) {
        const dragOffset = this.dragOffsets[i];
        const draggedNode = this.nodeDraggingScope.draggedNodes[i];
        const shadowElement = $(`<div style="position: absolute; opacity: 0.7; ` +
                                `top: ${this.getYCoordinate(dragOffset.y + event.clientY)}px; ` +
                                `left: ${this.getXCoordinate(dragOffset.x + event.clientX)}px; ">` +
                                `<div class="innerNode"><p style="padding: 0 15px;">${draggedNode.name}</p> </div></div>`);
        const targetInnerNode = $(this.draggedElements[i]).children()[0];
        shadowElement.children()[0].style.backgroundColor = targetInnerNode.style.backgroundColor;
        this.nodeDraggingScope.shadowElements.push(shadowElement);
        this.modelService.canvasHtmlElement.appendChild(this.nodeDraggingScope.shadowElements[i][0]);
      }
    }
    originalEvent.dataTransfer.setData('text', 'Just to support firefox');
    if (originalEvent.dataTransfer.setDragImage) {
      originalEvent.dataTransfer.setDragImage(this.modelService.getDragImage(), 0, 0);
    } else {
      this.draggedElements.forEach((draggedElement) => {
        const cloneNode = draggedElement.cloneNode(true);
        draggedElement.parentNode.insertBefore(cloneNode, draggedElement);
        draggedElement.style.visibility = 'collapse';
        setTimeout(() => {
          draggedElement.parentNode.removeChild(cloneNode);
          draggedElement.style.visibility = 'visible';
        }, 0);
      });
      if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
        for (let i = 0; i < this.draggedElements.length; i++) {
          this.destinationHtmlElements.push(this.draggedElements[i]);
          this.oldDisplayStyles.push(this.destinationHtmlElements[i].style.display);
          this.destinationHtmlElements[i].style.display = 'none';
        }
        this.nodeDraggingScope.shadowDragStarted = true;
      }
    }
  }

  public drop(event: DragEvent): boolean {
    if (this.modelService.isDropSource()) {
      event.preventDefault();
      return false;
    }
    let dropNode: FcNode = null;
    const originalEvent: DragEvent = (event as any).originalEvent || event;
    const infoText = originalEvent.dataTransfer.getData('text');
    if (infoText) {
      let dropNodeInfo: DropNodeInfo = null;
      try {
        dropNodeInfo = JSON.parse(infoText);
      } catch (e) {}
      if (dropNodeInfo && dropNodeInfo.dropTargetId) {
        if (this.modelService.canvasHtmlElement.id &&
          this.modelService.canvasHtmlElement.id === dropNodeInfo.dropTargetId) {
          dropNode = dropNodeInfo.node;
          const offset = $(this.modelService.canvasHtmlElement).offset();
          const x = event.clientX - offset.left;
          const y = event.clientY - offset.top;
          dropNode.x = Math.round(this.getXCoordinate(dropNodeInfo.offsetX + x));
          dropNode.y = Math.round(this.getYCoordinate(dropNodeInfo.offsetY + y));
        }
      }
    }
    if (dropNode) {
      this.modelService.dropNode(event, dropNode);
      event.preventDefault();
      return false;
    } else if (this.nodeDraggingScope.draggedNodes.length) {
      return this.applyFunction(() => {
        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
          const draggedNode = this.nodeDraggingScope.draggedNodes[i];
          const dragOffset = this.dragOffsets[i];
          draggedNode.x = Math.round(this.getXCoordinate(dragOffset.x + event.clientX));
          draggedNode.y = Math.round(this.getYCoordinate(dragOffset.y + event.clientY));
        }
        event.preventDefault();
        this.modelService.notifyModelChanged();
        return false;
      });
    }
  }

  public dragover(event: DragEvent) {
    if (nodeDropScope.dropElement) {
      const offsetInfo = nodeDropScope.dropElement.offsetInfo;
      nodeDropScope.dropElement.style.left = (offsetInfo.offsetX + event.clientX) + 'px';
      nodeDropScope.dropElement.style.top = (offsetInfo.offsetY + event.clientY) + 'px';
      if (this.nodeDraggingScope.shadowDragStarted) {
        this.applyFunction(() => {
          this.destinationHtmlElements[0].style.display = this.oldDisplayStyles[0];
          this.nodeDraggingScope.shadowDragStarted = false;
        });
      }
      event.preventDefault();
      return;
    }
    if (this.modelService.isDropSource()) {
      event.preventDefault();
      return;
    }
    if (!this.nodeDraggingScope.draggedNodes.length) {
      event.preventDefault();
      return;
    }
    if (this.dragAnimation === FlowchartConstants.dragAnimationRepaint) {
      if (this.nodeDraggingScope.draggedNodes.length) {
        return this.applyFunction(() => {
          for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
            const draggedNode = this.nodeDraggingScope.draggedNodes[i];
            const dragOffset = this.dragOffsets[i];
            draggedNode.x = this.getXCoordinate(dragOffset.x + event.clientX);
            draggedNode.y = this.getYCoordinate(dragOffset.y + event.clientY);
            this.resizeCanvas(draggedNode, this.draggedElements[i]);
          }
          event.preventDefault();
          this.modelService.notifyModelChanged();
          return false;
        });
      }
    } else if (this.dragAnimation === FlowchartConstants.dragAnimationShadow) {
      if (this.nodeDraggingScope.draggedNodes.length) {
        if (this.nodeDraggingScope.shadowDragStarted) {
          this.applyFunction(() => {
            for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
              this.destinationHtmlElements[i].style.display = this.oldDisplayStyles[i];
            }
            this.nodeDraggingScope.shadowDragStarted = false;
          });
        }
        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
          const draggedNode = this.nodeDraggingScope.draggedNodes[i];
          const dragOffset = this.dragOffsets[i];
          this.nodeDraggingScope.shadowElements[i].css('left', this.getXCoordinate(dragOffset.x + event.clientX) + 'px');
          this.nodeDraggingScope.shadowElements[i].css('top', this.getYCoordinate(dragOffset.y + event.clientY) + 'px');
          this.resizeCanvas(draggedNode, this.draggedElements[i]);
        }
        event.preventDefault();
      }
    }
  }

  public dragend(event: DragEvent) {
    this.applyFunction(() => {
      if (nodeDropScope.dropElement) {
        nodeDropScope.dropElement.parentNode.removeChild(nodeDropScope.dropElement);
        nodeDropScope.dropElement = null;
      }
      if (this.modelService.isDropSource()) {
        return;
      }
      if (this.nodeDraggingScope.shadowElements.length) {
        for (let i = 0; i < this.nodeDraggingScope.draggedNodes.length; i++) {
          const draggedNode = this.nodeDraggingScope.draggedNodes[i];
          const shadowElement = this.nodeDraggingScope.shadowElements[i];
          draggedNode.x = parseInt(shadowElement.css('left').replace('px', ''), 10);
          draggedNode.y = parseInt(shadowElement.css('top').replace('px', ''), 10);
          this.modelService.canvasHtmlElement.removeChild(shadowElement[0]);
        }
        this.nodeDraggingScope.shadowElements.length = 0;
        this.modelService.notifyModelChanged();
      }

      if (this.nodeDraggingScope.draggedNodes.length) {
        this.nodeDraggingScope.draggedNodes.length = 0;
        this.draggedElements.length = 0;
        this.dragOffsets.length = 0;
      }
    });
  }

}

export interface NodeDraggingScope {
  draggedNodes: Array<FcNode>;
  shadowElements: Array<JQuery<HTMLElement>>;
  shadowDragStarted: boolean;
  dropElement: HTMLElement;
}

export interface NodeDropElement extends HTMLElement {
  offsetInfo?: {
    offsetX: number;
    offsetY: number;
  };
}

export interface NodeDropScope {
  dropElement: NodeDropElement;
}

export interface DropNodeInfo {
  node: FcNode;
  dropTargetId: string;
  offsetX: number;
  offsetY: number;
}
