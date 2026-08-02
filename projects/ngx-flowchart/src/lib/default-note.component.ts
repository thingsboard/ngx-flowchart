///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
///
import { Component } from '@angular/core';
import { FcNoteComponent } from './note.component';

@Component({
  selector: 'fc-default-note',
  templateUrl: './default-note.component.html',
  styleUrls: ['./default-note.component.scss'],
  standalone: false
})
export class DefaultFcNoteComponent extends FcNoteComponent {

  constructor() {
    super();
  }

  noteEdit(event: MouseEvent) {
    event.stopPropagation();
    if (this.userNoteCallbacks?.noteEdit) {
      this.userNoteCallbacks.noteEdit(event, this.note);
    }
  }

  noteDelete(event: MouseEvent) {
    event.stopPropagation();
    this.modelservice.notes.delete(this.note);
  }

}
