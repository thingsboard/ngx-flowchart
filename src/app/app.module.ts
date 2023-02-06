import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FC_NODE_COMPONENT_CONFIG, NgxFlowchartModule } from 'ngx-flowchart-dev';
import { TestFcNodeComponent } from './test-node.component';

@NgModule({
    /*providers: [
      {
        provide: FC_NODE_COMPONENT_CONFIG,
        useValue: {
          nodeComponentType: TestFcNodeComponent
        }
      }
    ],*/
    declarations: [
        AppComponent,
        TestFcNodeComponent
    ],
    imports: [
        BrowserModule,
        NgxFlowchartModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
