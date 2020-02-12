import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, Directive,
  ElementRef, HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  FC_NODE_COMPONENT_CONFIG,
  FcCallbacks,
  FcConnector,
  FcNode,
  FcNodeComponentConfig, FcNodeRectInfo,
  FlowchartConstants,
  UserNodeCallbacks
} from './ngx-flowchart.models';
import { FcModelService } from './model.service';

@Component({
  selector: 'fc-node',
  template: '<ng-template #nodeContent></ng-template>',
  styleUrls: ['./node.component.scss']
})
export class FcNodeContainerComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  callbacks: FcCallbacks;

  @Input()
  userNodeCallbacks: UserNodeCallbacks;

  @Input()
  node: FcNode;

  @Input()
  selected: boolean;

  @Input()
  edit: boolean;

  @Input()
  underMouse: boolean;

  @Input()
  mouseOverConnector: FcConnector;

  @Input()
  modelservice: FcModelService;

  @Input()
  dragging: boolean;

  @HostBinding('attr.id')
  get nodeId(): string {
    return this.node.id;
  }

  @HostBinding('style.top')
  get top(): string {
    return this.node.y + 'px';
  }

  @HostBinding('style.left')
  get left(): string {
    return this.node.x + 'px';
  }

  nodeComponent: FcNodeComponent;

  @ViewChild('nodeContent', {read: ViewContainerRef, static: true}) nodeContentContainer: ViewContainerRef;

  constructor(@Inject(FC_NODE_COMPONENT_CONFIG) private nodeComponentConfig: FcNodeComponentConfig,
              private elementRef: ElementRef<HTMLElement>,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    if (!this.userNodeCallbacks) {
      this.userNodeCallbacks = {};
    }
    this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (() => {});
    this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (() => {});
    this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (() => {});
    this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (() => {});
    this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (() => {});

    const element = $(this.elementRef.nativeElement);
    element.addClass(FlowchartConstants.nodeClass);
    if (!this.node.readonly) {
      element.attr('draggable', 'true');
    }
    this.updateNodeClass();
    this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
    this.nodeContentContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
    const componentRef = this.nodeContentContainer.createComponent(componentFactory);
    this.nodeComponent = componentRef.instance;
    this.nodeComponent.callbacks = this.callbacks;
    this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
    this.nodeComponent.node = this.node;
    this.nodeComponent.modelservice = this.modelservice;
    this.updateNodeComponent();
    this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
    this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
  }

  ngAfterViewInit(): void {
    this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
    this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updateNode = false;
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      if (!change.firstChange && change.currentValue !== change.previousValue) {
        if (['selected', 'edit', 'underMouse', 'mouseOverConnector', 'dragging'].includes(propName)) {
          updateNode = true;
        }
      }
    }
    if (updateNode) {
      this.updateNodeClass();
      this.updateNodeComponent();
    }
  }

  private updateNodeClass() {
    const element = $(this.elementRef.nativeElement);
    this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
    this.toggleClass(element, FlowchartConstants.editClass, this.edit);
    this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
    this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
  }

  private updateNodeComponent() {
    this.nodeComponent.selected = this.selected;
    this.nodeComponent.edit = this.edit;
    this.nodeComponent.underMouse = this.underMouse;
    this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
    this.nodeComponent.dragging = this.dragging;
  }

  private toggleClass(element: JQuery<HTMLElement>, clazz: string, set: boolean) {
    if (set) {
      element.addClass(clazz);
    } else {
      element.removeClass(clazz);
    }
  }

  @HostListener('mousedown', ['$event'])
  mousedown(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('dragstart', ['$event'])
  dragstart(event: DragEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeDragstart(event, this.node);
    }
  }

  @HostListener('dragend', ['$event'])
  dragend(event: DragEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeDragend(event);
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeClicked(event, this.node);
    }
  }

  @HostListener('mouseover', ['$event'])
  mouseover(event: MouseEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeMouseOver(event, this.node);
    }
  }

  @HostListener('mouseout', ['$event'])
  mouseout(event: MouseEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeMouseOut(event, this.node);
    }
  }

}

@Directive()
export abstract class FcNodeComponent implements OnInit {

  @Input()
  callbacks: FcCallbacks;

  @Input()
  userNodeCallbacks: UserNodeCallbacks;

  @Input()
  node: FcNode;

  @Input()
  selected: boolean;

  @Input()
  edit: boolean;

  @Input()
  underMouse: boolean;

  @Input()
  mouseOverConnector: FcConnector;

  @Input()
  modelservice: FcModelService;

  @Input()
  dragging: boolean;

  flowchartConstants = FlowchartConstants;

  width: number;

  height: number;

  nodeRectInfo: FcNodeRectInfo = {
    top: () => {
      return this.node.y;
    },

    left: () => {
      return this.node.x;
    },

    bottom: () => {
      return this.node.y + this.height;
    },

    right: () => {
      return this.node.x + this.width;
    },

    width: () => {
      return this.width;
    },

    height: () => {
      return this.height;
    }
  };

  ngOnInit(): void {
  }

}
