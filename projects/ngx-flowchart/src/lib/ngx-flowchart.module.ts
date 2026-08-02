///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
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
