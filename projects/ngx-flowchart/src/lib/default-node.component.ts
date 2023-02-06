import { Component } from '@angular/core';
import { FcNodeComponent } from './node.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fc-default-node',
  templateUrl: './default-node.component.html',
  styleUrls: ['./default-node.component.scss']
})
export class DefaultFcNodeComponent extends FcNodeComponent {

  constructor() {
    super();
  }

}
