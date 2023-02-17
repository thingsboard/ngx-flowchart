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
FcMagnetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcMagnetDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
FcMagnetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.1.5", type: FcMagnetDirective, selector: "[fc-magnet]", inputs: { callbacks: "callbacks", connector: "connector" }, host: { listeners: { "dragover": "dragover($event)", "dragleave": "dragleave($event)", "drop": "drop($event)", "dragend": "dragend($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcMagnetDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFnbmV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mbG93Y2hhcnQvc3JjL2xpYi9tYWduZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUE0QixrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQU10RixNQUFNLE9BQU8saUJBQWlCO0lBUTVCLFlBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQWtCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFHRCxTQUFTLENBQUMsS0FBa0I7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsSUFBSSxDQUFDLEtBQWtCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBR0QsT0FBTyxDQUFDLEtBQWtCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OzhHQWxDVSxpQkFBaUI7a0dBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUo3QixTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO2lHQUlDLFNBQVM7c0JBRFIsS0FBSztnQkFJTixTQUFTO3NCQURSLEtBQUs7Z0JBWU4sUUFBUTtzQkFEUCxZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNcEMsU0FBUztzQkFEUixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNckMsSUFBSTtzQkFESCxZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNaEMsT0FBTztzQkFETixZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0NhbGxiYWNrcywgRmNDb25uZWN0b3IsIEZsb3djaGFydENvbnN0YW50cyB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbZmMtbWFnbmV0XSdcbn0pXG5leHBvcnQgY2xhc3MgRmNNYWduZXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5tYWduZXRDbGFzcyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIGRyYWdvdmVyKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ292ZXJNYWduZXQoZXZlbnQsIHRoaXMuY29ubmVjdG9yKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIGRyYWdsZWF2ZShldmVudDogRXZlbnQgfCBhbnkpIHtcbiAgICB0aGlzLmNhbGxiYWNrcy5lZGdlRHJhZ2xlYXZlTWFnbmV0KGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wKGV2ZW50OiBFdmVudCB8IGFueSkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5lZGdlRHJvcChldmVudCwgdGhpcy5jb25uZWN0b3IpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgdGhpcy5jYWxsYmFja3MuZWRnZURyYWdlbmQoZXZlbnQpO1xuICB9XG5cbn1cbiJdfQ==