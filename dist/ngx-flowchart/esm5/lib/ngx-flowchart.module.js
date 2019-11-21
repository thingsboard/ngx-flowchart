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
var ɵ0 = {
    nodeComponentType: DefaultFcNodeComponent
};
var NgxFlowchartModule = /** @class */ (function () {
    function NgxFlowchartModule() {
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
    return NgxFlowchartModule;
}());
export { NgxFlowchartModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL25neC1mbG93Y2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztTQWdCbEQ7SUFDUixpQkFBaUIsRUFBRSxzQkFBc0I7Q0FDMUM7QUFoQlA7SUFBQTtJQTJCa0MsQ0FBQzs7Z0JBM0JsQyxRQUFRLFNBQUM7b0JBQ1IsZUFBZSxFQUFFO3dCQUNmLHNCQUFzQjtxQkFDdkI7b0JBQ0QsWUFBWSxFQUFFLENBQUMscUJBQXFCO3dCQUNsQyxpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsd0JBQXdCO3dCQUN4QixzQkFBc0IsQ0FBQztvQkFDekIsU0FBUyxFQUFFO3dCQUNULHdCQUF3Qjt3QkFDeEIsb0JBQW9CO3dCQUNwQjs0QkFDRSxPQUFPLEVBQUUsd0JBQXdCOzRCQUNqQyxRQUFRLElBRVA7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCO3dCQUM3QixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsc0JBQXNCLENBQUM7aUJBQzFCOztJQUNpQyx5QkFBQztDQUFBLEFBM0JuQyxJQTJCbUM7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neEZsb3djaGFydENvbXBvbmVudCB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmNNb2RlbFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbHZhbGlkYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGY0VkZ2VEcmF3aW5nU2VydmljZSB9IGZyb20gJy4vZWRnZS1kcmF3aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZjTWFnbmV0RGlyZWN0aXZlIH0gZnJvbSAnLi9tYWduZXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZjQ29ubmVjdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZjTm9kZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRkNfTk9ERV9DT01QT05FTlRfQ09ORklHIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgeyBEZWZhdWx0RmNOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9kZWZhdWx0LW5vZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgRGVmYXVsdEZjTm9kZUNvbXBvbmVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hGbG93Y2hhcnRDb21wb25lbnQsXG4gICAgRmNNYWduZXREaXJlY3RpdmUsXG4gICAgRmNDb25uZWN0b3JEaXJlY3RpdmUsXG4gICAgRmNOb2RlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIERlZmF1bHRGY05vZGVDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgRmNFZGdlRHJhd2luZ1NlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogRkNfTk9ERV9DT01QT05FTlRfQ09ORklHLFxuICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgbm9kZUNvbXBvbmVudFR5cGU6IERlZmF1bHRGY05vZGVDb21wb25lbnRcbiAgICAgIH1cbiAgICB9XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW05neEZsb3djaGFydENvbXBvbmVudCxcbiAgICBGY01hZ25ldERpcmVjdGl2ZSxcbiAgICBGY0Nvbm5lY3RvckRpcmVjdGl2ZSxcbiAgICBEZWZhdWx0RmNOb2RlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGbG93Y2hhcnRNb2R1bGUgeyB9XG4iXX0=