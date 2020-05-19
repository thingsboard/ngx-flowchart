import { OnInit } from '@angular/core';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FcCallbacks, FcConnector, FlowchartConstants } from './ngx-flowchart.models';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fc-magnet]'
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
