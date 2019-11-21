/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const ɵ0 = {
    nodeComponentType: DefaultFcNodeComponent
};
export class NgxFlowchartModule {
}
NgxFlowchartModule.decorators = [
    { type: NgModule, args: [{
                entryComponents: [
                    DefaultFcNodeComponent
                ],
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
                        useValue: ɵ0
                    }
                ],
                imports: [
                    CommonModule
                ],
                exports: [NgxFlowchartComponent,
                    FcMagnetDirective,
                    FcConnectorDirective,
                    DefaultFcNodeComponent]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztXQWdCbEQ7SUFDUixpQkFBaUIsRUFBRSxzQkFBc0I7Q0FDMUM7QUFXUCxNQUFNLE9BQU8sa0JBQWtCOzs7WUEzQjlCLFFBQVEsU0FBQztnQkFDUixlQUFlLEVBQUU7b0JBQ2Ysc0JBQXNCO2lCQUN2QjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUI7b0JBQ2xDLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQix3QkFBd0I7b0JBQ3hCLHNCQUFzQixDQUFDO2dCQUN6QixTQUFTLEVBQUU7b0JBQ1Qsd0JBQXdCO29CQUN4QixvQkFBb0I7b0JBQ3BCO3dCQUNFLE9BQU8sRUFBRSx3QkFBd0I7d0JBQ2pDLFFBQVEsSUFFUDtxQkFDRjtpQkFDRjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUI7b0JBQzdCLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQixzQkFBc0IsQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hGbG93Y2hhcnRDb21wb25lbnQgfSBmcm9tICcuL25neC1mbG93Y2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4vbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNFZGdlRHJhd2luZ1NlcnZpY2UgfSBmcm9tICcuL2VkZ2UtZHJhd2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGY01hZ25ldERpcmVjdGl2ZSB9IGZyb20gJy4vbWFnbmV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvckRpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGY05vZGVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL25vZGUuY29tcG9uZW50JztcbmltcG9ydCB7IEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRGVmYXVsdEZjTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdC1ub2RlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIERlZmF1bHRGY05vZGVDb21wb25lbnRcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmd4Rmxvd2NoYXJ0Q29tcG9uZW50LFxuICAgIEZjTWFnbmV0RGlyZWN0aXZlLFxuICAgIEZjQ29ubmVjdG9yRGlyZWN0aXZlLFxuICAgIEZjTm9kZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgIEZjRWRnZURyYXdpbmdTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRyxcbiAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIG5vZGVDb21wb25lbnRUeXBlOiBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XG4gICAgICB9XG4gICAgfVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtOZ3hGbG93Y2hhcnRDb21wb25lbnQsXG4gICAgRmNNYWduZXREaXJlY3RpdmUsXG4gICAgRmNDb25uZWN0b3JEaXJlY3RpdmUsXG4gICAgRGVmYXVsdEZjTm9kZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4Rmxvd2NoYXJ0TW9kdWxlIHsgfVxuIl19