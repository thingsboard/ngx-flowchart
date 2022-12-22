import { NgModule } from '@angular/core';
import { NgxFlowchartComponent } from './ngx-flowchart.component';
import { FcModelValidationService } from './modelvalidation.service';
import { FcEdgeDrawingService } from './edge-drawing.service';
import { CommonModule } from '@angular/common';
import { FcMagnetDirective } from './magnet.directive';
import { FcConnectorDirective } from './connector.directive';
import { FcNodeContainerComponent } from './node.component';
import { FC_NODE_COMPONENT_CONFIG } from './ngx-flowchart.models';
import { DefaultFcNodeComponent } from './default-node.component';

@NgModule({
    declarations: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        FcNodeContainerComponent,
        DefaultFcNodeComponent],
    providers: [
        FcModelValidationService,
        FcEdgeDrawingService,
        {
            provide: FC_NODE_COMPONENT_CONFIG,
            useValue: {
                nodeComponentType: DefaultFcNodeComponent
            }
        }
    ],
    imports: [
        CommonModule
    ],
    exports: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        DefaultFcNodeComponent]
})
export class NgxFlowchartModule { }
