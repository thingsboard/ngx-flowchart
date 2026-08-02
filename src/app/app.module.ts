///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
///
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFlowchartModule } from 'ngx-flowchart-dev';
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
