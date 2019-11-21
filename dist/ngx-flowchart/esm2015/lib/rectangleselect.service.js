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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlc2VsZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL3JlY3RhbmdsZXNlbGVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUUxQyx3QkFLQzs7O0lBSkMsdUJBQVc7O0lBQ1gsdUJBQVc7O0lBQ1gsdUJBQVc7O0lBQ1gsdUJBQVc7O0FBR2IsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBZW5DLFlBQVksWUFBNEIsRUFDNUIsYUFBMEIsRUFDMUIsYUFBa0Q7UUFmN0MsZUFBVSxHQUFjO1lBQ3ZDLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1NBQ04sQ0FBQztRQVdBLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFTSxTQUFTLENBQUMsQ0FBYTtRQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7ZUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxD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ZXNDb250ZW50IjpbImltcG9ydCB7IEZjTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7IEZjUmVjdEJveCB9IGZyb20gJ25neC1mbG93Y2hhcnQtZGV2JztcbmltcG9ydCBzY3JvbGxwYXJlbnQgZnJvbSAnLi9zY3JvbGxwYXJlbnQnO1xuXG5pbnRlcmZhY2UgUmVjdGFuZ2xlIHtcbiAgeDE6IG51bWJlcjtcbiAgeDI6IG51bWJlcjtcbiAgeTE6IG51bWJlcjtcbiAgeTI6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEZjUmVjdGFuZ2xlU2VsZWN0U2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzZWxlY3RSZWN0OiBSZWN0YW5nbGUgPSB7XG4gICAgeDE6IDAsXG4gICAgeDI6IDAsXG4gICAgeTE6IDAsXG4gICAgeTI6IDBcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vZGVsU2VydmljZTogRmNNb2RlbFNlcnZpY2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgJGNhbnZhc0VsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gIHByaXZhdGUgcmVhZG9ubHkgJHNjcm9sbFBhcmVudDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVDtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQpIHtcbiAgICB0aGlzLm1vZGVsU2VydmljZSA9IG1vZGVsU2VydmljZTtcbiAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xuICAgIHRoaXMuJGNhbnZhc0VsZW1lbnQgPSAkKHRoaXMubW9kZWxTZXJ2aWNlLmNhbnZhc0h0bWxFbGVtZW50KTtcbiAgICB0aGlzLiRzY3JvbGxQYXJlbnQgPSAkKHNjcm9sbHBhcmVudCh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudCkpO1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbiA9IGFwcGx5RnVuY3Rpb247XG4gIH1cblxuICBwdWJsaWMgbW91c2Vkb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNFZGl0YWJsZSgpICYmICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiBlLmJ1dHRvbiA9PT0gMFxuICAgICAgJiYgdGhpcy5zZWxlY3RFbGVtZW50LmhpZGRlbikge1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy4kY2FudmFzRWxlbWVudC5vZmZzZXQoKTtcbiAgICAgIHRoaXMuc2VsZWN0UmVjdC54MSA9IE1hdGgucm91bmQoZS5wYWdlWCAtIG9mZnNldC5sZWZ0KTtcbiAgICAgIHRoaXMuc2VsZWN0UmVjdC55MSA9IE1hdGgucm91bmQoZS5wYWdlWSAtIG9mZnNldC50b3ApO1xuICAgICAgdGhpcy5zZWxlY3RSZWN0LngyID0gdGhpcy5zZWxlY3RSZWN0LngxO1xuICAgICAgdGhpcy5zZWxlY3RSZWN0LnkyID0gdGhpcy5zZWxlY3RSZWN0LnkxO1xuICAgICAgdGhpcy51cGRhdGVTZWxlY3RSZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1vdXNlbW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRWRpdGFibGUoKSAmJiAhZS5jdHJsS2V5ICYmICFlLm1ldGFLZXkgJiYgZS5idXR0b24gPT09IDBcbiAgICAgICYmICF0aGlzLnNlbGVjdEVsZW1lbnQuaGlkZGVuKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLiRjYW52YXNFbGVtZW50Lm9mZnNldCgpO1xuICAgICAgdGhpcy5zZWxlY3RSZWN0LngyID0gTWF0aC5yb3VuZChlLnBhZ2VYIC0gb2Zmc2V0LmxlZnQpO1xuICAgICAgdGhpcy5zZWxlY3RSZWN0LnkyID0gTWF0aC5yb3VuZChlLnBhZ2VZIC0gb2Zmc2V0LnRvcCk7XG4gICAgICB0aGlzLnVwZGF0ZVNjcm9sbChvZmZzZXQpO1xuICAgICAgdGhpcy51cGRhdGVTZWxlY3RSZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTY3JvbGwob2Zmc2V0OiBKUXVlcnkuQ29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy4kc2Nyb2xsUGFyZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGJvdHRvbSA9IHJlY3QuYm90dG9tIC0gb2Zmc2V0LnRvcDtcbiAgICBjb25zdCByaWdodCA9IHJlY3QucmlnaHQgLSBvZmZzZXQubGVmdDtcbiAgICBjb25zdCB0b3AgPSByZWN0LnRvcCAtIG9mZnNldC50b3A7XG4gICAgY29uc3QgbGVmdCA9IHJlY3QubGVmdCAtIG9mZnNldC5sZWZ0O1xuICAgIGlmICh0aGlzLnNlbGVjdFJlY3QueTIgLSB0b3AgPCAyNSkge1xuICAgICAgY29uc3QgdG9wU2Nyb2xsID0gMjUgLSAodGhpcy5zZWxlY3RSZWN0LnkyIC0gdG9wKTtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxUb3AoKTtcbiAgICAgIHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxUb3Aoc2Nyb2xsIC0gdG9wU2Nyb2xsKTtcbiAgICB9IGVsc2UgaWYgKGJvdHRvbSAtIHRoaXMuc2VsZWN0UmVjdC55MiA8IDQwKSB7XG4gICAgICBjb25zdCBib3R0b21TY3JvbGwgPSA0MCAtIChib3R0b20gLSB0aGlzLnNlbGVjdFJlY3QueTIpO1xuICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCgpO1xuICAgICAgdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbFRvcChzY3JvbGwgKyBib3R0b21TY3JvbGwpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3RSZWN0LngyIC0gbGVmdCA8IDI1KSB7XG4gICAgICBjb25zdCBsZWZ0U2Nyb2xsID0gMjUgLSAodGhpcy5zZWxlY3RSZWN0LngyIC0gbGVmdCk7XG4gICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsTGVmdCgpO1xuICAgICAgdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbExlZnQoc2Nyb2xsIC0gbGVmdFNjcm9sbCk7XG4gICAgfSBlbHNlIGlmIChyaWdodCAtIHRoaXMuc2VsZWN0UmVjdC54MiA8IDQwKSB7XG4gICAgICBjb25zdCByaWdodFNjcm9sbCA9IDQwIC0gKHJpZ2h0IC0gdGhpcy5zZWxlY3RSZWN0LngyKTtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxMZWZ0KCk7XG4gICAgICB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsTGVmdChzY3JvbGwgKyByaWdodFNjcm9sbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1vdXNldXAoZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0VkaXRhYmxlKCkgJiYgIWUuY3RybEtleSAmJiAhZS5tZXRhS2V5ICYmIGUuYnV0dG9uID09PSAwXG4gICAgICAmJiAhdGhpcy5zZWxlY3RFbGVtZW50LmhpZGRlbikge1xuICAgICAgY29uc3QgcmVjdEJveCA9IHRoaXMuc2VsZWN0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBGY1JlY3RCb3g7XG4gICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2VsZWN0T2JqZWN0cyhyZWN0Qm94KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNlbGVjdFJlY3QoKSB7XG4gICAgY29uc3QgeDMgPSBNYXRoLm1pbih0aGlzLnNlbGVjdFJlY3QueDEsIHRoaXMuc2VsZWN0UmVjdC54Mik7XG4gICAgY29uc3QgeDQgPSBNYXRoLm1heCh0aGlzLnNlbGVjdFJlY3QueDEsIHRoaXMuc2VsZWN0UmVjdC54Mik7XG4gICAgY29uc3QgeTMgPSBNYXRoLm1pbih0aGlzLnNlbGVjdFJlY3QueTEsIHRoaXMuc2VsZWN0UmVjdC55Mik7XG4gICAgY29uc3QgeTQgPSBNYXRoLm1heCh0aGlzLnNlbGVjdFJlY3QueTEsIHRoaXMuc2VsZWN0UmVjdC55Mik7XG4gICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmxlZnQgPSB4MyArICdweCc7XG4gICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLnRvcCA9IHkzICsgJ3B4JztcbiAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUud2lkdGggPSB4NCAtIHgzICsgJ3B4JztcbiAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0geTQgLSB5MyArICdweCc7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdE9iamVjdHMocmVjdEJveDogRmNSZWN0Qm94KSB7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLnNlbGVjdEFsbEluUmVjdChyZWN0Qm94KTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbiJdfQ==