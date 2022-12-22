import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FlowchartConstants } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
export class FcMagnetDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.magnetClass);
    }
    dragover(event) {
        return this.callbacks.edgeDragoverMagnet(event, this.connector);
    }
    dragleave(event) {
        this.callbacks.edgeDragleaveMagnet(event);
    }
    drop(event) {
        return this.callbacks.edgeDrop(event, this.connector);
    }
    dragend(event) {
        this.callbacks.edgeDragend(event);
    }
}
FcMagnetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: FcMagnetDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
FcMagnetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.12", type: FcMagnetDirective, selector: "[fc-magnet]", inputs: { callbacks: "callbacks", connector: "connector" }, host: { listeners: { "dragover": "dragover($event)", "dragleave": "dragleave($event)", "drop": "drop($event)", "dragend": "dragend($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: FcMagnetDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fc-magnet]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { callbacks: [{
                type: Input
            }], connector: [{
                type: Input
            }], dragover: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], dragleave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }], drop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mbG93Y2hhcnQvc3JjL2xpYi9tYWduZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUE0QixrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQU10RixNQUFNLE9BQU8saUJBQWlCO0lBUTVCLFlBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQWtCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFHRCxTQUFTLENBQUMsS0FBa0I7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsSUFBSSxDQUFDLEtBQWtCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBR0QsT0FBTyxDQUFDLEtBQWtCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OytHQWxDVSxpQkFBaUI7bUdBQWpCLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUo3QixTQUFTO21CQUFDO29CQUNULDhDQUE4QztvQkFDOUMsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO2lHQUlDLFNBQVM7c0JBRFIsS0FBSztnQkFJTixTQUFTO3NCQURSLEtBQUs7Z0JBWU4sUUFBUTtzQkFEUCxZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNcEMsU0FBUztzQkFEUixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNckMsSUFBSTtzQkFESCxZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNaEMsT0FBTztzQkFETixZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNDb25uZWN0b3IsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tmYy1tYWduZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBGY01hZ25ldERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgY2FsbGJhY2tzOiBGY0NhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudCA9ICQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGVsZW1lbnQuYWRkQ2xhc3MoRmxvd2NoYXJ0Q29uc3RhbnRzLm1hZ25ldENsYXNzKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgZHJhZ292ZXIoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnb3Zlck1hZ25ldChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgZHJhZ2xlYXZlKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcmFnbGVhdmVNYWduZXQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIGRyb3AoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tzLmVkZ2VEcm9wKGV2ZW50LCB0aGlzLmNvbm5lY3Rvcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSlcbiAgZHJhZ2VuZChldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2VuZChldmVudCk7XG4gIH1cblxufVxuIl19