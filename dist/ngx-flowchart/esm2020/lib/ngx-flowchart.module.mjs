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
import * as i0 from "@angular/core";
export class NgxFlowchartModule {
}
NgxFlowchartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxFlowchartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxFlowchartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.5", ngImport: i0, type: NgxFlowchartModule, declarations: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        FcNodeContainerComponent,
        DefaultFcNodeComponent], imports: [CommonModule], exports: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        DefaultFcNodeComponent] });
NgxFlowchartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxFlowchartModule, providers: [
        FcModelValidationService,
        FcEdgeDrawingService,
        {
            provide: FC_NODE_COMPONENT_CONFIG,
            useValue: {
                nodeComponentType: DefaultFcNodeComponent
            }
        }
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: NgxFlowchartModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvbmd4LWZsb3djaGFydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBMEJsRSxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBdkJaLHFCQUFxQjtRQUNoQyxpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixzQkFBc0IsYUFZdEIsWUFBWSxhQUVOLHFCQUFxQjtRQUMzQixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtnSEFFakIsa0JBQWtCLGFBbEJoQjtRQUNQLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEI7WUFDSSxPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLFFBQVEsRUFBRTtnQkFDTixpQkFBaUIsRUFBRSxzQkFBc0I7YUFDNUM7U0FDSjtLQUNKLFlBRUcsWUFBWTsyRkFPUCxrQkFBa0I7a0JBeEI5QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRSxDQUFDLHFCQUFxQjt3QkFDaEMsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsc0JBQXNCLENBQUM7b0JBQzNCLFNBQVMsRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEI7NEJBQ0ksT0FBTyxFQUFFLHdCQUF3Qjs0QkFDakMsUUFBUSxFQUFFO2dDQUNOLGlCQUFpQixFQUFFLHNCQUFzQjs2QkFDNUM7eUJBQ0o7cUJBQ0o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCO3dCQUMzQixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsc0JBQXNCLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neEZsb3djaGFydENvbXBvbmVudCB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmF3aW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmF3aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZjTWFnbmV0RGlyZWN0aXZlIH0gZnJvbSAnLi9tYWduZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZjQ29ubmVjdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZjTm9kZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBEZWZhdWx0RmNOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9kZWZhdWx0LW5vZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ3hGbG93Y2hhcnRDb21wb25lbnQsXG4gICAgICAgIEZjTWFnbmV0RGlyZWN0aXZlLFxuICAgICAgICBGY0Nvbm5lY3RvckRpcmVjdGl2ZSxcbiAgICAgICAgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogRkNfTk9ERV9DT01QT05FTlRfQ09ORklHLFxuICAgICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgICAgICBub2RlQ29tcG9uZW50VHlwZTogRGVmYXVsdEZjTm9kZUNvbXBvbmVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW05neEZsb3djaGFydENvbXBvbmVudCxcbiAgICAgICAgRmNNYWduZXREaXJlY3RpdmUsXG4gICAgICAgIEZjQ29ubmVjdG9yRGlyZWN0aXZlLFxuICAgICAgICBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGbG93Y2hhcnRNb2R1bGUgeyB9XG4iXX0=