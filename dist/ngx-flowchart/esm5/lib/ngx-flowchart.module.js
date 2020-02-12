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
var NgxFlowchartModule = /** @class */ (function () {
    function NgxFlowchartModule() {
    }
    NgxFlowchartModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxFlowchartModule });
    NgxFlowchartModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxFlowchartModule_Factory(t) { return new (t || NgxFlowchartModule)(); }, providers: [
            FcModelValidationService,
            FcEdgeDrawingService,
            {
                provide: FC_NODE_COMPONENT_CONFIG,
                useValue: {
                    nodeComponentType: DefaultFcNodeComponent
                }
            }
        ], imports: [[
                CommonModule
            ]] });
    return NgxFlowchartModule;
}());
export { NgxFlowchartModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxFlowchartModule, { declarations: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        FcNodeContainerComponent,
        DefaultFcNodeComponent], imports: [CommonModule], exports: [NgxFlowchartComponent,
        FcMagnetDirective,
        FcConnectorDirective,
        DefaultFcNodeComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxFlowchartModule, [{
        type: NgModule,
        args: [{
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
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUVsRTtJQUFBO0tBMkJtQzswREFBdEIsa0JBQWtCO3VIQUFsQixrQkFBa0IsbUJBbEJsQjtZQUNULHdCQUF3QjtZQUN4QixvQkFBb0I7WUFDcEI7Z0JBQ0UsT0FBTyxFQUFFLHdCQUF3QjtnQkFDakMsUUFBUSxFQUFFO29CQUNSLGlCQUFpQixFQUFFLHNCQUFzQjtpQkFDMUM7YUFDRjtTQUNGLFlBQ1E7Z0JBQ1AsWUFBWTthQUNiOzZCQWhDSDtDQXNDbUMsQUEzQm5DLElBMkJtQztTQUF0QixrQkFBa0I7d0ZBQWxCLGtCQUFrQixtQkF2QmQscUJBQXFCO1FBQ2xDLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsd0JBQXdCO1FBQ3hCLHNCQUFzQixhQVl0QixZQUFZLGFBRUoscUJBQXFCO1FBQzdCLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsc0JBQXNCO2tEQUViLGtCQUFrQjtjQTNCOUIsUUFBUTtlQUFDO2dCQUNSLGVBQWUsRUFBRTtvQkFDZixzQkFBc0I7aUJBQ3ZCO2dCQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQjtvQkFDbEMsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLHdCQUF3QjtvQkFDeEIsc0JBQXNCLENBQUM7Z0JBQ3pCLFNBQVMsRUFBRTtvQkFDVCx3QkFBd0I7b0JBQ3hCLG9CQUFvQjtvQkFDcEI7d0JBQ0UsT0FBTyxFQUFFLHdCQUF3Qjt3QkFDakMsUUFBUSxFQUFFOzRCQUNSLGlCQUFpQixFQUFFLHNCQUFzQjt5QkFDMUM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCO29CQUM3QixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsc0JBQXNCLENBQUM7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4Rmxvd2NoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZjRWRnZURyYXdpbmdTZXJ2aWNlIH0gZnJvbSAnLi9lZGdlLWRyYXdpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmNNYWduZXREaXJlY3RpdmUgfSBmcm9tICcuL21hZ25ldC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmNDb25uZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3Rvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9ub2RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcbmltcG9ydCB7IERlZmF1bHRGY05vZGVDb21wb25lbnQgfSBmcm9tICcuL2RlZmF1bHQtbm9kZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05neEZsb3djaGFydENvbXBvbmVudCxcbiAgICBGY01hZ25ldERpcmVjdGl2ZSxcbiAgICBGY0Nvbm5lY3RvckRpcmVjdGl2ZSxcbiAgICBGY05vZGVDb250YWluZXJDb21wb25lbnQsXG4gICAgRGVmYXVsdEZjTm9kZUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSxcbiAgICBGY0VkZ2VEcmF3aW5nU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBub2RlQ29tcG9uZW50VHlwZTogRGVmYXVsdEZjTm9kZUNvbXBvbmVudFxuICAgICAgfVxuICAgIH1cbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbTmd4Rmxvd2NoYXJ0Q29tcG9uZW50LFxuICAgIEZjTWFnbmV0RGlyZWN0aXZlLFxuICAgIEZjQ29ubmVjdG9yRGlyZWN0aXZlLFxuICAgIERlZmF1bHRGY05vZGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZsb3djaGFydE1vZHVsZSB7IH1cbiJdfQ==