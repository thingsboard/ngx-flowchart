import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FcCallbacks, FcConnector, FcConnectorRectInfo, FcNodeRectInfo, FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fc-connector]'
})
export class FcConnectorDirective implements OnInit, OnChanges {

  @Input()
  callbacks: FcCallbacks;

  @Input()
  modelservice: FcModelService;

  @Input()
  connector: FcConnector;

  @Input()
  nodeRectInfo: FcNodeRectInfo;

  @Input()
  mouseOverConnector: FcConnector;

  constructor(public elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    const element = $(this.elementRef.nativeElement);
    element.addClass(FlowchartConstants.connectorClass);
    if (this.modelservice.isEditable()) {
      element.attr('draggable', 'true');
      this.updateConnectorClass();
    }
    const connectorRectInfo: FcConnectorRectInfo = {
      type: this.connector.type,
      width: this.elementRef.nativeElement.offsetWidth,
      height: this.elementRef.nativeElement.offsetHeight,
      nodeRectInfo: this.nodeRectInfo
    };
    this.modelservice.connectors.setConnectorRectInfo(this.connector.id, connectorRectInfo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updateConnector = false;
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      if (!change.firstChange && change.currentValue !== change.previousValue) {
        if (propName === 'mouseOverConnector') {
          updateConnector = true;
        }
      }
    }
    if (updateConnector && this.modelservice.isEditable()) {
      this.updateConnectorClass();
    }
  }

  private updateConnectorClass() {
    const element = $(this.elementRef.nativeElement);
    if (this.connector === this.mouseOverConnector) {
      element.addClass(FlowchartConstants.hoverClass);
    } else {
      element.removeClass(FlowchartConstants.hoverClass);
    }
  }

  @HostListener('dragover', ['$event'])
  dragover(event: DragEvent) {
    // Skip - conflict with magnet
    /* if (this.modelservice.isEditable()) {
      return this.callbacks.edgeDragoverConnector(event, this.connector);
    }*/
  }

  @HostListener('drop', ['$event'])
  drop(event: DragEvent) {
    if (this.modelservice.isEditable()) {
      return this.callbacks.edgeDrop(event, this.connector);
    }
  }

  @HostListener('dragend', ['$event'])
  dragend(event: DragEvent) {
    if (this.modelservice.isEditable()) {
      this.callbacks.edgeDragend(event);
    }
  }

  @HostListener('dragstart', ['$event'])
  dragstart(event: DragEvent) {
    if (this.modelservice.isEditable()) {
      this.callbacks.edgeDragstart(event, this.connector);
    }
  }

  @HostListener('mouseenter', ['$event'])
  mouseenter(event: MouseEvent) {
    if (this.modelservice.isEditable()) {
      this.callbacks.connectorMouseEnter(event, this.connector);
    }
  }

  @HostListener('mouseleave', ['$event'])
  mouseleave(event: MouseEvent) {
    if (this.modelservice.isEditable()) {
      this.callbacks.connectorMouseLeave(event, this.connector);
    }
  }

}
