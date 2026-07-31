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
import { NgModule } from '@angular/core';
import { NgxFlowchartComponent } from './ngx-flowchart.component';
import { FcModelValidationService } from './modelvalidation.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { CommonModule } from '@angular/common';
import { FcMagnetDirective } from './magnet.directive';
import { FcConnectorDirective } from './connector.directive';
import { FcNodeContainerComponent } from './node.component';
import { FcNoteContainerComponent } from './note.component';
import { FC_NODE_COMPONENT_CONFIG, FC_NOTE_COMPONENT_CONFIG } from './ngx-flowchart.models';
import { DefaultFcNodeComponent } from './default-node.component';
import { DefaultFcNoteComponent } from './default-note.component';

@NgModule({
    declarations: [
        NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        FcNodeContainerComponent,
        DefaultFcNodeComponent,
        FcNoteContainerComponent,
        DefaultFcNoteComponent
    ],
    providers: [
        FcModelValidationService,
        FcEdgeDrawingService,
        {
            provide: FC_NODE_COMPONENT_CONFIG,
            useValue: {
                nodeComponentType: DefaultFcNodeComponent
            }
        },
        {
            provide: FC_NOTE_COMPONENT_CONFIG,
            useValue: {
                noteComponentType: DefaultFcNoteComponent
            }
        }
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        DefaultFcNodeComponent,
        FcNoteContainerComponent,
        DefaultFcNoteComponent
    ]
})
export class NgxFlowchartModule { }
