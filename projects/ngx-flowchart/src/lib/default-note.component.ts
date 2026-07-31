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
