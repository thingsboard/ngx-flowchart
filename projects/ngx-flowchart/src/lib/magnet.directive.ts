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
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FcCallbacks, FcConnector, FlowchartConstants } from './ngx-flowchart.models';

@Directive({
  selector: '[fc-magnet]',
  standalone: false
})
export class FcMagnetDirective implements OnInit {

  @Input()
  callbacks: FcCallbacks;

  @Input()
  connector: FcConnector;

  constructor(public elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    const element = $(this.elementRef.nativeElement);
    element.addClass(FlowchartConstants.magnetClass);
  }

  @HostListener('dragover', ['$event'])
  dragover(event: Event | any) {
    return this.callbacks.edgeDragoverMagnet(event, this.connector);
  }

  @HostListener('dragleave', ['$event'])
  dragleave(event: Event | any) {
    this.callbacks.edgeDragleaveMagnet(event);
  }

  @HostListener('drop', ['$event'])
  drop(event: Event | any) {
    return this.callbacks.edgeDrop(event, this.connector);
  }

  @HostListener('dragend', ['$event'])
  dragend(event: Event | any) {
    this.callbacks.edgeDragend(event);
  }

}
