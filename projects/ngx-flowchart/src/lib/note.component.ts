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
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FC_NOTE_COMPONENT_CONFIG, FcNote, FcNoteComponentConfig, FlowchartConstants, UserNoteCallbacks } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import { FcNoteDraggingService, NoteDragMode } from './note-dragging.service';

@Component({
  selector: 'fc-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  standalone: false
})
export class FcNoteContainerComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() note: FcNote;
  @Input() modelservice: FcModelService;
  @Input() noteDraggingService: FcNoteDraggingService;
  @Input() userNoteCallbacks: UserNoteCallbacks;
  @Input() selected: boolean;
  @Input() edit: boolean;
  @Input() dragging: boolean;

  noteComponent: FcNoteComponent;

  @ViewChild('noteContent', { read: ViewContainerRef, static: true })
  noteContentContainer: ViewContainerRef;

  @HostBinding('attr.id')
  get noteId(): string { return this.note.id; }

  @HostBinding('style.top')
  get top(): string { return this.note.y + 'px'; }

  @HostBinding('style.left')
  get left(): string { return this.note.x + 'px'; }

  @HostBinding('style.width')
  get width(): string { return this.note.width + 'px'; }

  @HostBinding('style.height')
  get height(): string { return this.note.height + 'px'; }

  constructor(@Inject(FC_NOTE_COMPONENT_CONFIG) private noteComponentConfig: FcNoteComponentConfig,
              private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    if (!this.userNoteCallbacks) {
      this.userNoteCallbacks = {};
    }
    this.userNoteCallbacks.noteEdit = this.userNoteCallbacks.noteEdit || (() => {});
    this.userNoteCallbacks.doubleClick = this.userNoteCallbacks.doubleClick || (() => {});
    this.userNoteCallbacks.mouseEnter = this.userNoteCallbacks.mouseEnter || (() => {});
    this.userNoteCallbacks.mouseLeave = this.userNoteCallbacks.mouseLeave || (() => {});

    const element = this.elementRef.nativeElement;
    element.classList.add(FlowchartConstants.noteClass);
    this.updateNoteClass();

    this.noteContentContainer.clear();
    const componentRef = this.noteContentContainer.createComponent(
      this.noteComponentConfig.noteComponentType
    );
    this.noteComponent = componentRef.instance;
    this.noteComponent.note = this.note;
    this.noteComponent.modelservice = this.modelservice;
    this.noteComponent.userNoteCallbacks = this.userNoteCallbacks;
    this.updateNoteComponent();
  }

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    let update = false;
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      if (!change.firstChange && change.currentValue !== change.previousValue) {
        if (['selected', 'edit', 'dragging'].includes(propName)) {
          update = true;
        }
      }
    }
    if (update) {
      this.updateNoteClass();
      this.updateNoteComponent();
    }
  }

  private updateNoteClass() {
    const el = this.elementRef.nativeElement;
    this.toggleClass(el, FlowchartConstants.selectedClass, this.selected);
    this.toggleClass(el, FlowchartConstants.editClass, this.edit);
    this.toggleClass(el, FlowchartConstants.draggingClass, this.dragging);
  }

  private updateNoteComponent() {
    if (!this.noteComponent) { return; }
    this.noteComponent.selected = this.selected;
    this.noteComponent.edit = this.edit;
  }

  private toggleClass(el: HTMLElement, clazz: string, set: boolean) {
    if (set) {
      el.classList.add(clazz);
    } else {
      el.classList.remove(clazz);
    }
  }

  @HostListener('mousedown', ['$event'])
  mousedown(event: MouseEvent) {
    if (!this.note.readonly && this.modelservice.isEditable()) {
      if ((event.target as HTMLElement).closest('.fc-note-resize-handle')) {
        return;
      }
      event.stopPropagation();
      this.noteDraggingService.startMove(event, this.note);
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    if (!this.note.readonly) {
      this.modelservice.notes.handleClicked(this.note, event.ctrlKey);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  @HostListener('mouseenter', ['$event'])
  mouseenter(event: MouseEvent) {
    if (!this.note.readonly && this.userNoteCallbacks) {
      this.userNoteCallbacks.mouseEnter(event, this.note);
    }
  }

  @HostListener('mouseleave', ['$event'])
  mouseleave(event: MouseEvent) {
    if (!this.note.readonly && this.userNoteCallbacks) {
      this.userNoteCallbacks.mouseLeave(event, this.note);
    }
  }

  startResize(event: MouseEvent, mode: NoteDragMode) {
    if (!this.note.readonly && this.modelservice.isEditable()) {
      this.noteDraggingService.startResize(event, this.note, mode);
    }
  }

  get noteDragMode() {
    return NoteDragMode;
  }
}

@Directive()
export abstract class FcNoteComponent implements OnInit {

  @Input() note: FcNote;
  @Input() selected: boolean;
  @Input() edit: boolean;
  @Input() modelservice: FcModelService;
  @Input() userNoteCallbacks: UserNoteCallbacks;

  flowchartConstants = FlowchartConstants;

  ngOnInit(): void {}
}
