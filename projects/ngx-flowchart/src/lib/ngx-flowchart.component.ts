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
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  IterableDiffer,
  IterableDiffers,
  NgZone,
  OnInit,
  Output
} from '@angular/core';
import {
  FcCallbacks,
  FcEdge,
  FcModel,
  FcNode,
  FcNote,
  FlowchartConstants,
  UserCallbacks,
  UserNodeCallbacks,
  UserNoteCallbacks
} from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import { FcModelValidationService } from './modelvalidation.service';
import { FcNodeDraggingService } from './node-dragging.service';
import { FcNoteDraggingService } from './note-dragging.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { FcEdgeDraggingService } from './edge-dragging.service';
import { FcMouseOverService } from './mouseover.service';
import { FcRectangleSelectService } from './rectangleselect.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'fc-canvas',
  templateUrl: './ngx-flowchart.component.html',
  styleUrls: ['./ngx-flowchart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NgxFlowchartComponent implements OnInit, DoCheck {

  @HostBinding('attr.class')
  get canvasClass(): string {
    return FlowchartConstants.canvasClass;
  }

  @Input()
  model: FcModel;

  @Input()
  selectedObjects: any[];

  @Input()
  edgeStyle: string;

  @Input()
  userCallbacks: UserCallbacks;

  @Input()
  automaticResize: boolean;

  @Input()
  dragAnimation: string;

  @Input()
  nodeWidth: number;

  @Input()
  nodeHeight: number;

  @Input()
  dropTargetId: string;

  @Output()
  modelChanged = new EventEmitter();

  @Input({transform: booleanAttribute})
  fitModelSizeByDefault = true;

  callbacks: FcCallbacks;

  userNodeCallbacks: UserNodeCallbacks;
  userNoteCallbacks: UserNoteCallbacks;

  modelService: FcModelService;
  nodeDraggingService: FcNodeDraggingService;
  noteDraggingService: FcNoteDraggingService;
  edgeDraggingService: FcEdgeDraggingService;
  mouseoverService: FcMouseOverService;
  rectangleSelectService: FcRectangleSelectService;

  arrowDefId: string;
  arrowDefIdSelected: string;

  flowchartConstants = FlowchartConstants;

  private nodesDiffer: IterableDiffer<FcNode> = this.differs.find([]).create<FcNode>((_index, item) => item);

  private edgesDiffer: IterableDiffer<FcEdge> = this.differs.find([]).create<FcEdge>((_index, item) => item);

  private notesDiffer: IterableDiffer<FcNote> = this.differs.find([]).create<FcNote>((_index, item) => item);

  private readonly detectChangesSubject = new Subject<any>();

  constructor(private elementRef: ElementRef<HTMLElement>,
              private differs: IterableDiffers,
              private modelValidation: FcModelValidationService,
              public edgeDrawingService: FcEdgeDrawingService,
              private cd: ChangeDetectorRef,
              private zone: NgZone) {
    this.arrowDefId = 'arrow-' + Math.random();
    this.arrowDefIdSelected = this.arrowDefId + '-selected';
    this.detectChangesSubject
      .pipe(debounceTime(50))
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnInit() {
    if (!this.dropTargetId && this.edgeStyle !== FlowchartConstants.curvedStyle && this.edgeStyle !== FlowchartConstants.lineStyle) {
      throw new Error('edgeStyle not supported.');
    }
    this.nodeHeight = this.nodeHeight || 200;
    this.nodeWidth = this.nodeWidth || 200;
    this.dragAnimation = this.dragAnimation || FlowchartConstants.dragAnimationRepaint;
    this.userCallbacks = this.userCallbacks || {};
    this.automaticResize = this.automaticResize || false;

    for (const key of Object.keys(this.userCallbacks)) {
      const callback = this.userCallbacks[key];
      if (typeof callback !== 'function' && key !== 'nodeCallbacks' && key !== 'noteCallbacks') {
        throw new Error('All callbacks should be functions.');
      }
    }

    this.userNodeCallbacks = this.userCallbacks.nodeCallbacks;
    this.userNoteCallbacks = this.userCallbacks.noteCallbacks || {};

    const element = $(this.elementRef.nativeElement);

    this.modelService = new FcModelService(this.modelValidation, this.model, this.modelChanged,
      this.detectChangesSubject, this.selectedObjects,
      this.userCallbacks.dropNode, this.userCallbacks.createEdge, this.userCallbacks.edgeAdded, this.userCallbacks.nodeRemoved,
      this.userCallbacks.edgeRemoved, element[0], element[0].querySelector('svg'), this.userCallbacks.noteRemoved);

    if (this.dropTargetId) {
      this.modelService.dropTargetId = this.dropTargetId;
    }

    const applyFunction = this.zone.run.bind(this.zone);

    this.nodeDraggingService = new FcNodeDraggingService(this.modelService, applyFunction,
          this.automaticResize, this.dragAnimation);

    this.noteDraggingService = new FcNoteDraggingService(this.modelService, applyFunction, this.automaticResize);

    this.edgeDraggingService = new FcEdgeDraggingService(this.modelValidation, this.edgeDrawingService, this.modelService,
      this.model, this.userCallbacks.isValidEdge || null, applyFunction,
      this.dragAnimation, this.edgeStyle);

    this.mouseoverService = new FcMouseOverService(applyFunction);

    this.rectangleSelectService = new FcRectangleSelectService(this.modelService,
      element[0].querySelector('#select-rectangle'), applyFunction);

    this.callbacks = {
      nodeDragstart: this.nodeDraggingService.dragstart.bind(this.nodeDraggingService),
      nodeDragend: this.nodeDraggingService.dragend.bind(this.nodeDraggingService),
      edgeDragstart: this.edgeDraggingService.dragstart.bind(this.edgeDraggingService),
      edgeDragend: this.edgeDraggingService.dragend.bind(this.edgeDraggingService),
      edgeDrop: this.edgeDraggingService.drop.bind(this.edgeDraggingService),
      edgeDragoverConnector: this.edgeDraggingService.dragoverConnector.bind(this.edgeDraggingService),
      edgeDragoverMagnet: this.edgeDraggingService.dragoverMagnet.bind(this.edgeDraggingService),
      edgeDragleaveMagnet: this.edgeDraggingService.dragleaveMagnet.bind(this.edgeDraggingService),
      nodeMouseOver: this.mouseoverService.nodeMouseOver.bind(this.mouseoverService),
      nodeMouseOut: this.mouseoverService.nodeMouseOut.bind(this.mouseoverService),
      connectorMouseEnter: this.mouseoverService.connectorMouseEnter.bind(this.mouseoverService),
      connectorMouseLeave: this.mouseoverService.connectorMouseLeave.bind(this.mouseoverService),
      nodeClicked: (event, node) => {
        this.modelService.nodes.handleClicked(node, event.ctrlKey);
        event.stopPropagation();
        event.preventDefault();
      }
    };
    this.adjustCanvasSize(this.fitModelSizeByDefault);
  }

  ngDoCheck(): void {
    if (this.model) {
      const nodesChange = this.nodesDiffer.diff(this.model.nodes);
      const edgesChange = this.edgesDiffer.diff(this.model.edges);
      const notesChange = this.notesDiffer.diff(this.model.notes || []);
      let nodesChanged = false;
      let edgesChanged = false;
      let notesChanged = false;
      if (nodesChange !== null) {
        nodesChange.forEachAddedItem(() => {
          nodesChanged = true;
        });
        nodesChange.forEachRemovedItem(() => {
          nodesChanged = true;
        });
      }
      if (edgesChange !== null) {
        edgesChange.forEachAddedItem(() => {
          edgesChanged = true;
        });
        edgesChange.forEachRemovedItem(() => {
          edgesChanged = true;
        });
      }
      if (notesChange !== null) {
        notesChange.forEachAddedItem(() => {
          notesChanged = true;
        });
        notesChange.forEachRemovedItem(() => {
          notesChanged = true;
        });
      }
      if (nodesChanged || notesChanged) {
        this.adjustCanvasSize(this.fitModelSizeByDefault);
      }
      if (nodesChanged || edgesChanged || notesChanged) {
        this.detectChangesSubject.next(null);
      }
    }
  }

  getEdgeDAttribute(edge: FcEdge): string {
    return this.edgeDrawingService.getEdgeDAttribute(this.modelService.edges.sourceCoord(edge),
      this.modelService.edges.destCoord(edge), this.edgeStyle);
  }

  public adjustCanvasSize(fit?: boolean) {
    let maxX = 0;
    let maxY = 0;
    const element = $(this.elementRef.nativeElement);
    const padding = this.dropTargetId ? 0 : FlowchartConstants.canvasResizeThreshold;
    this.model.nodes.forEach((node) => {
      maxX = Math.max(node.x + this.nodeWidth + padding, maxX);
      maxY = Math.max(node.y + this.nodeHeight + padding, maxY);
    });
    if (this.model.notes) {
      this.model.notes.forEach((note) => {
        maxX = Math.max(note.x + note.width + padding, maxX);
        maxY = Math.max(note.y + note.height + padding, maxY);
      });
    }
    let width: number;
    let height: number;
    if (fit) {
      width = maxX;
      height = maxY;
    } else {
      width = Math.max(maxX, element.prop('offsetWidth'));
      height = Math.max(maxY, element.prop('offsetHeight'));
    }
    element.css('width', width + 'px');
    element.css('height', height + 'px');
  }

  canvasClick(_event: MouseEvent) {}

  edgeMouseDown(event: MouseEvent, _edge: FcEdge) {
    event.stopPropagation();
  }

  edgeClick(event: MouseEvent, edge: FcEdge) {
    this.modelService.edges.handleEdgeMouseClick(edge, event.ctrlKey);
    event.stopPropagation();
    event.preventDefault();
  }

  edgeRemove(event: Event, edge: FcEdge) {
    this.modelService.edges.delete(edge);
    event.stopPropagation();
    event.preventDefault();
  }

  edgeEdit(event: Event, edge: FcEdge) {
    if (this.userCallbacks.edgeEdit) {
      this.userCallbacks.edgeEdit(event, edge);
    }
  }

  edgeDoubleClick(event: MouseEvent, edge: FcEdge) {
    if (this.userCallbacks.edgeDoubleClick) {
      this.userCallbacks.edgeDoubleClick(event, edge);
    }
  }

  edgeMouseOver(event: MouseEvent, edge: FcEdge) {
    if (this.userCallbacks.edgeMouseOver) {
      this.userCallbacks.edgeMouseOver(event, edge);
    }
  }

  edgeMouseEnter(event: MouseEvent, edge: FcEdge) {
    this.mouseoverService.edgeMouseEnter(event, edge);
  }

  edgeMouseLeave(event: MouseEvent, edge: FcEdge) {
    this.mouseoverService.edgeMouseLeave(event, edge);
  }

  @HostListener('dragover', ['$event'])
  dragover(event: Event | any) {
    this.nodeDraggingService.dragover(event);
    this.edgeDraggingService.dragover(event);
  }

  @HostListener('drop', ['$event'])
  drop(event: Event | any) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    this.nodeDraggingService.drop(event);
  }

  @HostListener('mousedown', ['$event'])
  mousedown(event: MouseEvent) {
    this.rectangleSelectService.mousedown(event);
  }

  @HostListener('mousemove', ['$event'])
  mousemove(event: MouseEvent) {
    this.rectangleSelectService.mousemove(event);
  }

  @HostListener('mouseup', ['$event'])
  mouseup(event: MouseEvent) {
    this.rectangleSelectService.mouseup(event);
  }

}
