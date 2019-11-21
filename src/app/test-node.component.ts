import { Component } from '@angular/core';
import { FcNodeComponent } from 'ngx-flowchart-dev';

@Component({
  selector: 'app-default-node',
  templateUrl: './test-node.component.html',
  styleUrls: []
})
export class TestFcNodeComponent extends FcNodeComponent {

  constructor() {
    super();
  }

}
