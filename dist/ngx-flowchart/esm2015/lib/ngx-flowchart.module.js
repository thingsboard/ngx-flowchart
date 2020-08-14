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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvbmd4LWZsb3djaGFydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7V0FnQmxEO0lBQ1IsaUJBQWlCLEVBQUUsc0JBQXNCO0NBQzFDO0FBV1AsTUFBTSxPQUFPLGtCQUFrQjs7O1lBM0I5QixRQUFRLFNBQUM7Z0JBQ1IsZUFBZSxFQUFFO29CQUNmLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMscUJBQXFCO29CQUNsQyxpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixzQkFBc0IsQ0FBQztnQkFDekIsU0FBUyxFQUFFO29CQUNULHdCQUF3QjtvQkFDeEIsb0JBQW9CO29CQUNwQjt3QkFDRSxPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxRQUFRLElBRVA7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCO29CQUM3QixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsc0JBQXNCLENBQUM7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4Rmxvd2NoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmNNYWduZXREaXJlY3RpdmUgfSBmcm9tICcuL21hZ25ldC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmNDb25uZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3Rvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9ub2RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IERlZmF1bHRGY05vZGVDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHQtbm9kZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05neEZsb3djaGFydENvbXBvbmVudCxcbiAgICBGY01hZ25ldERpcmVjdGl2ZSxcbiAgICBGY0Nvbm5lY3RvckRpcmVjdGl2ZSxcbiAgICBGY05vZGVDb250YWluZXJDb21wb25lbnQsXG4gICAgRGVmYXVsdEZjTm9kZUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBub2RlQ29tcG9uZW50VHlwZTogRGVmYXVsdEZjTm9kZUNvbXBvbmVudFxuICAgICAgfVxuICAgIH1cbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbTmd4Rmxvd2NoYXJ0Q29tcG9uZW50LFxuICAgIEZjTWFnbmV0RGlyZWN0aXZlLFxuICAgIEZjQ29ubmVjdG9yRGlyZWN0aXZlLFxuICAgIERlZmF1bHRGY05vZGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZsb3djaGFydE1vZHVsZSB7IH1cbiJdfQ==