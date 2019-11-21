/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import scrollparent from './scrollparent';
/**
 * @record
 */
function Rectangle() { }
if (false) {
    /** @type {?} */
    Rectangle.prototype.x1;
    /** @type {?} */
    Rectangle.prototype.x2;
    /** @type {?} */
    Rectangle.prototype.y1;
    /** @type {?} */
    Rectangle.prototype.y2;
}
export class FcRectangleSelectService {
    /**
     * @param {?} modelService
     * @param {?} selectElement
     * @param {?} applyFunction
     */
    constructor(modelService, selectElement, applyFunction) {
        this.selectRect = {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        };
        this.modelService = modelService;
        this.selectElement = selectElement;
        this.$canvasElement = $(this.modelService.canvasHtmlElement);
        this.$scrollParent = $(scrollparent(this.modelService.canvasHtmlElement));
        this.applyFunction = applyFunction;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mousedown(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && this.selectElement.hidden) {
            this.selectElement.hidden = false;
            /** @type {?} */
            const offset = this.$canvasElement.offset();
            this.selectRect.x1 = Math.round(e.pageX - offset.left);
            this.selectRect.y1 = Math.round(e.pageY - offset.top);
            this.selectRect.x2 = this.selectRect.x1;
            this.selectRect.y2 = this.selectRect.y1;
            this.updateSelectRect();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mousemove(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            const offset = this.$canvasElement.offset();
            this.selectRect.x2 = Math.round(e.pageX - offset.left);
            this.selectRect.y2 = Math.round(e.pageY - offset.top);
            this.updateScroll(offset);
            this.updateSelectRect();
        }
    }
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    updateScroll(offset) {
        /** @type {?} */
        const rect = this.$scrollParent[0].getBoundingClientRect();
        /** @type {?} */
        const bottom = rect.bottom - offset.top;
        /** @type {?} */
        const right = rect.right - offset.left;
        /** @type {?} */
        const top = rect.top - offset.top;
        /** @type {?} */
        const left = rect.left - offset.left;
        if (this.selectRect.y2 - top < 25) {
            /** @type {?} */
            const topScroll = 25 - (this.selectRect.y2 - top);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll - topScroll);
        }
        else if (bottom - this.selectRect.y2 < 40) {
            /** @type {?} */
            const bottomScroll = 40 - (bottom - this.selectRect.y2);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll + bottomScroll);
        }
        if (this.selectRect.x2 - left < 25) {
            /** @type {?} */
            const leftScroll = 25 - (this.selectRect.x2 - left);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll - leftScroll);
        }
        else if (right - this.selectRect.x2 < 40) {
            /** @type {?} */
            const rightScroll = 40 - (right - this.selectRect.x2);
            /** @type {?} */
            const scroll = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll + rightScroll);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseup(e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            const rectBox = (/** @type {?} */ (this.selectElement.getBoundingClientRect()));
            this.selectElement.hidden = true;
            this.selectObjects(rectBox);
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateSelectRect() {
        /** @type {?} */
        const x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        const x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        const y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
        /** @type {?} */
        const y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
        this.selectElement.style.left = x3 + 'px';
        this.selectElement.style.top = y3 + 'px';
        this.selectElement.style.width = x4 - x3 + 'px';
        this.selectElement.style.height = y4 - y3 + 'px';
    }
    /**
     * @private
     * @param {?} rectBox
     * @return {?}
     */
    selectObjects(rectBox) {
        this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.modelService.selectAllInRect(rectBox);
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.selectRect;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.modelService;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.selectElement;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.$canvasElement;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.$scrollParent;
    /**
     * @type {?}
     * @private
     */
    FcRectangleSelectService.prototype.applyFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlc2VsZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL3JlY3RhbmdsZXNlbGVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUUxQyx3QkFLQzs7O0lBSkMsdUJBQVc7O0lBQ1gsdUJBQVc7O0lBQ1gsdUJBQVc7O0lBQ1gsdUJBQVc7O0FBR2IsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBZW5DLFlBQVksWUFBNEIsRUFDNUIsYUFBMEIsRUFDMUIsYUFBa0Q7UUFmN0MsZUFBVSxHQUFjO1lBQ3ZDLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1NBQ04sQ0FBQztRQVdBLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSxTQUFTLENBQUMsQ0FBYTtRQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7ZUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxD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ZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjUmVjdEJveCB9IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHNjcm9sbHBhcmVudCBmcm9tICcuL3Njcm9sbHBhcmVudCc7XG5cbmludGVyZmFjZSBSZWN0YW5nbGUge1xuICB4MTogbnVtYmVyO1xuICB4MjogbnVtYmVyO1xuICB5MTogbnVtYmVyO1xuICB5MjogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRmNSZWN0YW5nbGVTZWxlY3RTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdFJlY3Q6IFJlY3RhbmdsZSA9IHtcbiAgICB4MTogMCxcbiAgICB4MjogMCxcbiAgICB5MTogMCxcbiAgICB5MjogMFxuICB9O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcbiAgcHJpdmF0ZSByZWFkb25seSBzZWxlY3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSByZWFkb25seSAkY2FudmFzRWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcbiAgcHJpdmF0ZSByZWFkb25seSAkc2Nyb2xsUGFyZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVCkge1xuICAgIHRoaXMubW9kZWxTZXJ2aWNlID0gbW9kZWxTZXJ2aWNlO1xuICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XG4gICAgdGhpcy4kY2FudmFzRWxlbWVudCA9ICQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpO1xuICAgIHRoaXMuJHNjcm9sbFBhcmVudCA9ICQoc2Nyb2xscGFyZW50KHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KSk7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBtb3VzZWRvd24oZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0VkaXRhYmxlKCkgJiYgIWUuY3RybEtleSAmJiAhZS5tZXRhS2V5ICYmIGUuYnV0dG9uID09PSAwXG4gICAgICAmJiB0aGlzLnNlbGVjdEVsZW1lbnQuaGlkZGVuKSB7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XG4gICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLiRjYW52YXNFbGVtZW50Lm9mZnNldCgpO1xuICAgICAgdGhpcy5zZWxlY3RSZWN0LngxID0gTWF0aC5yb3VuZChlLnBhZ2VYIC0gb2Zmc2V0LmxlZnQpO1xuICAgICAgdGhpcy5zZWxlY3RSZWN0LnkxID0gTWF0aC5yb3VuZChlLnBhZ2VZIC0gb2Zmc2V0LnRvcCk7XG4gICAgICB0aGlzLnNlbGVjdFJlY3QueDIgPSB0aGlzLnNlbGVjdFJlY3QueDE7XG4gICAgICB0aGlzLnNlbGVjdFJlY3QueTIgPSB0aGlzLnNlbGVjdFJlY3QueTE7XG4gICAgICB0aGlzLnVwZGF0ZVNlbGVjdFJlY3QoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbW91c2Vtb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNFZGl0YWJsZSgpICYmICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiBlLmJ1dHRvbiA9PT0gMFxuICAgICAgJiYgIXRoaXMuc2VsZWN0RWxlbWVudC5oaWRkZW4pIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuJGNhbnZhc0VsZW1lbnQub2Zmc2V0KCk7XG4gICAgICB0aGlzLnNlbGVjdFJlY3QueDIgPSBNYXRoLnJvdW5kKGUucGFnZVggLSBvZmZzZXQubGVmdCk7XG4gICAgICB0aGlzLnNlbGVjdFJlY3QueTIgPSBNYXRoLnJvdW5kKGUucGFnZVkgLSBvZmZzZXQudG9wKTtcbiAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKG9mZnNldCk7XG4gICAgICB0aGlzLnVwZGF0ZVNlbGVjdFJlY3QoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNjcm9sbChvZmZzZXQ6IEpRdWVyeS5Db29yZGluYXRlcykge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLiRzY3JvbGxQYXJlbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgYm90dG9tID0gcmVjdC5ib3R0b20gLSBvZmZzZXQudG9wO1xuICAgIGNvbnN0IHJpZ2h0ID0gcmVjdC5yaWdodCAtIG9mZnNldC5sZWZ0O1xuICAgIGNvbnN0IHRvcCA9IHJlY3QudG9wIC0gb2Zmc2V0LnRvcDtcbiAgICBjb25zdCBsZWZ0ID0gcmVjdC5sZWZ0IC0gb2Zmc2V0LmxlZnQ7XG4gICAgaWYgKHRoaXMuc2VsZWN0UmVjdC55MiAtIHRvcCA8IDI1KSB7XG4gICAgICBjb25zdCB0b3BTY3JvbGwgPSAyNSAtICh0aGlzLnNlbGVjdFJlY3QueTIgLSB0b3ApO1xuICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCgpO1xuICAgICAgdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbFRvcChzY3JvbGwgLSB0b3BTY3JvbGwpO1xuICAgIH0gZWxzZSBpZiAoYm90dG9tIC0gdGhpcy5zZWxlY3RSZWN0LnkyIDwgNDApIHtcbiAgICAgIGNvbnN0IGJvdHRvbVNjcm9sbCA9IDQwIC0gKGJvdHRvbSAtIHRoaXMuc2VsZWN0UmVjdC55Mik7XG4gICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKCk7XG4gICAgICB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKHNjcm9sbCArIGJvdHRvbVNjcm9sbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdFJlY3QueDIgLSBsZWZ0IDwgMjUpIHtcbiAgICAgIGNvbnN0IGxlZnRTY3JvbGwgPSAyNSAtICh0aGlzLnNlbGVjdFJlY3QueDIgLSBsZWZ0KTtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxMZWZ0KCk7XG4gICAgICB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsTGVmdChzY3JvbGwgLSBsZWZ0U2Nyb2xsKTtcbiAgICB9IGVsc2UgaWYgKHJpZ2h0IC0gdGhpcy5zZWxlY3RSZWN0LngyIDwgNDApIHtcbiAgICAgIGNvbnN0IHJpZ2h0U2Nyb2xsID0gNDAgLSAocmlnaHQgLSB0aGlzLnNlbGVjdFJlY3QueDIpO1xuICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbExlZnQoKTtcbiAgICAgIHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxMZWZ0KHNjcm9sbCArIHJpZ2h0U2Nyb2xsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbW91c2V1cChlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRWRpdGFibGUoKSAmJiAhZS5jdHJsS2V5ICYmICFlLm1ldGFLZXkgJiYgZS5idXR0b24gPT09IDBcbiAgICAgICYmICF0aGlzLnNlbGVjdEVsZW1lbnQuaGlkZGVuKSB7XG4gICAgICBjb25zdCByZWN0Qm94ID0gdGhpcy5zZWxlY3RFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGFzIEZjUmVjdEJveDtcbiAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5oaWRkZW4gPSB0cnVlO1xuICAgICAgdGhpcy5zZWxlY3RPYmplY3RzKHJlY3RCb3gpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2VsZWN0UmVjdCgpIHtcbiAgICBjb25zdCB4MyA9IE1hdGgubWluKHRoaXMuc2VsZWN0UmVjdC54MSwgdGhpcy5zZWxlY3RSZWN0LngyKTtcbiAgICBjb25zdCB4NCA9IE1hdGgubWF4KHRoaXMuc2VsZWN0UmVjdC54MSwgdGhpcy5zZWxlY3RSZWN0LngyKTtcbiAgICBjb25zdCB5MyA9IE1hdGgubWluKHRoaXMuc2VsZWN0UmVjdC55MSwgdGhpcy5zZWxlY3RSZWN0LnkyKTtcbiAgICBjb25zdCB5NCA9IE1hdGgubWF4KHRoaXMuc2VsZWN0UmVjdC55MSwgdGhpcy5zZWxlY3RSZWN0LnkyKTtcbiAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUubGVmdCA9IHgzICsgJ3B4JztcbiAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUudG9wID0geTMgKyAncHgnO1xuICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS53aWR0aCA9IHg0IC0geDMgKyAncHgnO1xuICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSB5NCAtIHkzICsgJ3B4JztcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0T2JqZWN0cyhyZWN0Qm94OiBGY1JlY3RCb3gpIHtcbiAgICB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgdGhpcy5tb2RlbFNlcnZpY2Uuc2VsZWN0QWxsSW5SZWN0KHJlY3RCb3gpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuIl19