///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
///
import { FcModelService } from './model.service';
import { FcNode, FcNote, FlowchartConstants } from './ngx-flowchart.models';
import scrollparent from './scrollparent';

export enum NoteDragMode {
  None = 'none',
  Pending = 'pending',   // mousedown recorded, waiting for drag threshold
  Move = 'move',
  ResizeN = 'resize-n',
  ResizeNE = 'resize-ne',
  ResizeE = 'resize-e',
  ResizeSE = 'resize-se',
  ResizeS = 'resize-s',
  ResizeSW = 'resize-sw',
  ResizeW = 'resize-w',
  ResizeNW = 'resize-nw'
}

const NOTE_MIN_WIDTH = 80;
const NOTE_MIN_HEIGHT = 60;
const DRAG_THRESHOLD = 4;

interface NoteDraggingState {
  mode: NoteDragMode;
  pendingNote: FcNote | null;
  notes: FcNote[];
  offsets: Array<{ x: number; y: number }>;
  nodes: FcNode[];
  nodeOffsets: Array<{ x: number; y: number }>;
  resizeNote: FcNote | null;
  startMouseX: number;
  startMouseY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
}

export class FcNoteDraggingService {

  private readonly modelService: FcModelService;
  private readonly automaticResize: boolean;
  private readonly applyFunction: <T>(fn: (...args: any[]) => T) => T;
  private readonly scrollParent: HTMLElement;

  private state: NoteDraggingState = {
    mode: NoteDragMode.None,
    pendingNote: null,
    notes: [],
    offsets: [],
    nodes: [],
    nodeOffsets: [],
    resizeNote: null,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0
  };

  private readonly onMouseMove: (e: MouseEvent) => void;
  private readonly onMouseUp: (e: MouseEvent) => void;

  constructor(modelService: FcModelService,
              applyFunction: <T>(fn: (...args: any[]) => T) => T,
              automaticResize: boolean) {
    this.modelService = modelService;
    this.automaticResize = automaticResize;
    this.applyFunction = applyFunction;
    this.scrollParent = scrollparent(this.modelService.canvasHtmlElement);

    this.onMouseMove = this.mousemove.bind(this);
    this.onMouseUp = this.mouseup.bind(this);
  }

  private updateScroll(event: MouseEvent) {
    const rect = this.scrollParent.getBoundingClientRect();
    const oldScrollLeft = this.scrollParent.scrollLeft;
    const oldScrollTop = this.scrollParent.scrollTop;

    if (event.clientY - rect.top < 25) {
      this.scrollParent.scrollTop -= 25 - (event.clientY - rect.top);
    } else if (rect.bottom - event.clientY < 40) {
      this.scrollParent.scrollTop += 40 - (rect.bottom - event.clientY);
    }
    if (event.clientX - rect.left < 25) {
      this.scrollParent.scrollLeft -= 25 - (event.clientX - rect.left);
    } else if (rect.right - event.clientX < 40) {
      this.scrollParent.scrollLeft += 40 - (rect.right - event.clientX);
    }

    // Compensate so that notes stay under the cursor after scroll
    const scrollDx = this.scrollParent.scrollLeft - oldScrollLeft;
    const scrollDy = this.scrollParent.scrollTop - oldScrollTop;
    if (scrollDx !== 0 || scrollDy !== 0) {
      for (const offset of this.state.offsets) {
        offset.x += scrollDx;
        offset.y += scrollDy;
      }
      for (const offset of this.state.nodeOffsets) {
        offset.x += scrollDx;
        offset.y += scrollDy;
      }
      // For resize: adjust startMouse so that dx/dy account for the scroll shift
      if (this.state.resizeNote) {
        this.state.startMouseX -= scrollDx;
        this.state.startMouseY -= scrollDy;
      }
    }
  }

  private resizeCanvas(note: FcNote) {
    if (this.automaticResize) {
      const canvasElement = this.modelService.canvasHtmlElement;
      if (canvasElement.offsetWidth < note.x + note.width + FlowchartConstants.canvasResizeThreshold) {
        canvasElement.style.width = canvasElement.offsetWidth + FlowchartConstants.canvasResizeStep + 'px';
      }
      if (canvasElement.offsetHeight < note.y + note.height + FlowchartConstants.canvasResizeThreshold) {
        canvasElement.style.height = canvasElement.offsetHeight + FlowchartConstants.canvasResizeStep + 'px';
      }
    }
  }

  public isDraggingNote(note: FcNote): boolean {
    return this.state.mode !== NoteDragMode.None && this.state.mode !== NoteDragMode.Pending &&
      (this.state.notes.includes(note) || this.state.resizeNote === note);
  }

  public startMove(event: MouseEvent, note: FcNote) {
    if (note.readonly || this.state.mode !== NoteDragMode.None) {
      return;
    }
    event.stopPropagation();

    // Do not touch selection here — wait for the drag threshold before committing.
    // This avoids a brief flash of magnet nodes being selected when the user just clicks.
    this.state = {
      mode: NoteDragMode.Pending,
      pendingNote: note,
      notes: [],
      offsets: [],
      nodes: [],
      nodeOffsets: [],
      resizeNote: null,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0
    };

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private commitMove(event: MouseEvent) {
    const note = this.state.pendingNote;
    const notesToMove: FcNote[] = [];
    const nodesToMove: FcNode[] = [];

    if (this.modelService.notes.isSelected(note)) {
      // Group drag: move exactly what the user selected — no magnet.
      notesToMove.push(...this.modelService.notes.getSelectedNotes());
      nodesToMove.push(...this.modelService.nodes.getSelectedNodes());
    } else {
      // Solo drag: deselect everything, then magnet — pick up nodes and nested notes
      // whose center lies within this note's bounds.
      this.modelService.deselectAll();
      this.modelService.notes.select(note);
      notesToMove.push(note);

      const magnetNodes = this.modelService.getNodesInNoteBounds(note);
      magnetNodes.forEach(n => this.modelService.nodes.select(n));
      nodesToMove.push(...magnetNodes);

      const magnetNotes = this.modelService.getNotesInNoteBounds(note);
      magnetNotes.forEach(n => this.modelService.notes.select(n));
      notesToMove.push(...magnetNotes);
    }

    // Offsets encode (canvas_pos - mouse_pos) so that on each mousemove:
    // new_pos = offset + current_mouse = start_pos + delta_mouse
    const offsets = notesToMove.map(n => ({
      x: n.x - event.clientX,
      y: n.y - event.clientY
    }));

    const nodeOffsets = nodesToMove.map(n => ({
      x: n.x - event.clientX,
      y: n.y - event.clientY
    }));

    this.state = {
      ...this.state,
      mode: NoteDragMode.Move,
      pendingNote: null,
      notes: notesToMove,
      offsets,
      nodes: nodesToMove,
      nodeOffsets
    };
  }

  public startResize(event: MouseEvent, note: FcNote, mode: NoteDragMode) {
    if (note.readonly || this.state.mode !== NoteDragMode.None) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    this.state = {
      mode,
      pendingNote: null,
      notes: [],
      offsets: [],
      nodes: [],
      nodeOffsets: [],
      resizeNote: note,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      startX: note.x,
      startY: note.y,
      startWidth: note.width,
      startHeight: note.height
    };

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private mousemove(event: MouseEvent) {
    if (this.state.mode === NoteDragMode.Pending) {
      const absDx = Math.abs(event.clientX - this.state.startMouseX);
      const absDy = Math.abs(event.clientY - this.state.startMouseY);
      if (absDx > DRAG_THRESHOLD || absDy > DRAG_THRESHOLD) {
        // Threshold crossed — commit selection and switch to Move.
        // Offsets are computed from this event so the note starts tracking
        // from its current canvas position without any visual jump.
        this.applyFunction(() => this.commitMove(event));
      }
      return;
    }

    this.updateScroll(event);
    this.applyFunction(() => {
      const dx = event.clientX - this.state.startMouseX;
      const dy = event.clientY - this.state.startMouseY;

      if (this.state.mode === NoteDragMode.Move) {
        // Find the max correction needed so no element goes below 0
        let minX = 0;
        let minY = 0;
        for (const offset of this.state.offsets) {
          minX = Math.min(minX, offset.x + event.clientX);
          minY = Math.min(minY, offset.y + event.clientY);
        }
        for (const offset of this.state.nodeOffsets) {
          minX = Math.min(minX, offset.x + event.clientX);
          minY = Math.min(minY, offset.y + event.clientY);
        }
        const clampedClientX = event.clientX - minX;
        const clampedClientY = event.clientY - minY;

        for (let i = 0; i < this.state.notes.length; i++) {
          const note = this.state.notes[i];
          const offset = this.state.offsets[i];
          note.x = Math.round(offset.x + clampedClientX);
          note.y = Math.round(offset.y + clampedClientY);
          this.resizeCanvas(note);
        }
        for (let i = 0; i < this.state.nodes.length; i++) {
          const node = this.state.nodes[i];
          const offset = this.state.nodeOffsets[i];
          node.x = Math.round(offset.x + clampedClientX);
          node.y = Math.round(offset.y + clampedClientY);
        }
      } else if (this.state.resizeNote) {
        const note = this.state.resizeNote;
        const mode = this.state.mode;

        // Horizontal component
        const resizesE = mode === NoteDragMode.ResizeE || mode === NoteDragMode.ResizeSE || mode === NoteDragMode.ResizeNE;
        const resizesW = mode === NoteDragMode.ResizeW || mode === NoteDragMode.ResizeSW || mode === NoteDragMode.ResizeNW;
        // Vertical component
        const resizesS = mode === NoteDragMode.ResizeS || mode === NoteDragMode.ResizeSE || mode === NoteDragMode.ResizeSW;
        const resizesN = mode === NoteDragMode.ResizeN || mode === NoteDragMode.ResizeNE || mode === NoteDragMode.ResizeNW;

        if (resizesE) {
          note.width = Math.max(NOTE_MIN_WIDTH, Math.round(this.state.startWidth + dx));
        }
        if (resizesW) {
          const rightEdge = this.state.startX + this.state.startWidth;
          note.x = Math.max(0, Math.round(Math.min(rightEdge - NOTE_MIN_WIDTH, this.state.startX + dx)));
          note.width = rightEdge - note.x;
        }
        if (resizesS) {
          note.height = Math.max(NOTE_MIN_HEIGHT, Math.round(this.state.startHeight + dy));
        }
        if (resizesN) {
          const bottomEdge = this.state.startY + this.state.startHeight;
          note.y = Math.max(0, Math.round(Math.min(bottomEdge - NOTE_MIN_HEIGHT, this.state.startY + dy)));
          note.height = bottomEdge - note.y;
        }
        this.resizeCanvas(note);
      }
    });
  }

  private mouseup(_event: MouseEvent) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    this.applyFunction(() => {
      if (this.state.mode !== NoteDragMode.Pending) {
        this.modelService.notifyModelChanged();
      }
      this.state.mode = NoteDragMode.None;
      this.state.pendingNote = null;
      this.state.notes = [];
      this.state.offsets = [];
      this.state.nodes = [];
      this.state.nodeOffsets = [];
      this.state.resizeNote = null;
    });
  }
}
