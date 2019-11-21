import { Component } from '@angular/core';
import { FcNodeComponent } from './node.component';

@Component({
  selector: 'fc-default-node',
  templateUrl: './default-node.component.html',
  styleUrls: ['./default-node.component.scss']
})
export class DefaultFcNodeComponent extends FcNodeComponent {

  constructor() {
    super();
  }

}
