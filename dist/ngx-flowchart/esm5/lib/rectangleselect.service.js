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
var FcRectangleSelectService = /** @class */ (function () {
    function FcRectangleSelectService(modelService, selectElement, applyFunction) {
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
    FcRectangleSelectService.prototype.mousedown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && this.selectElement.hidden) {
            this.selectElement.hidden = false;
            /** @type {?} */
            var offset = this.$canvasElement.offset();
            this.selectRect.x1 = Math.round(e.pageX - offset.left);
            this.selectRect.y1 = Math.round(e.pageY - offset.top);
            this.selectRect.x2 = this.selectRect.x1;
            this.selectRect.y2 = this.selectRect.y1;
            this.updateSelectRect();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FcRectangleSelectService.prototype.mousemove = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            var offset = this.$canvasElement.offset();
            this.selectRect.x2 = Math.round(e.pageX - offset.left);
            this.selectRect.y2 = Math.round(e.pageY - offset.top);
            this.updateScroll(offset);
            this.updateSelectRect();
        }
    };
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    FcRectangleSelectService.prototype.updateScroll = /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        /** @type {?} */
        var rect = this.$scrollParent[0].getBoundingClientRect();
        /** @type {?} */
        var bottom = rect.bottom - offset.top;
        /** @type {?} */
        var right = rect.right - offset.left;
        /** @type {?} */
        var top = rect.top - offset.top;
        /** @type {?} */
        var left = rect.left - offset.left;
        if (this.selectRect.y2 - top < 25) {
            /** @type {?} */
            var topScroll = 25 - (this.selectRect.y2 - top);
            /** @type {?} */
            var scroll_1 = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll_1 - topScroll);
        }
        else if (bottom - this.selectRect.y2 < 40) {
            /** @type {?} */
            var bottomScroll = 40 - (bottom - this.selectRect.y2);
            /** @type {?} */
            var scroll_2 = this.$scrollParent.scrollTop();
            this.$scrollParent.scrollTop(scroll_2 + bottomScroll);
        }
        if (this.selectRect.x2 - left < 25) {
            /** @type {?} */
            var leftScroll = 25 - (this.selectRect.x2 - left);
            /** @type {?} */
            var scroll_3 = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll_3 - leftScroll);
        }
        else if (right - this.selectRect.x2 < 40) {
            /** @type {?} */
            var rightScroll = 40 - (right - this.selectRect.x2);
            /** @type {?} */
            var scroll_4 = this.$scrollParent.scrollLeft();
            this.$scrollParent.scrollLeft(scroll_4 + rightScroll);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FcRectangleSelectService.prototype.mouseup = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.modelService.isEditable() && !e.ctrlKey && !e.metaKey && e.button === 0
            && !this.selectElement.hidden) {
            /** @type {?} */
            var rectBox = (/** @type {?} */ (this.selectElement.getBoundingClientRect()));
            this.selectElement.hidden = true;
            this.selectObjects(rectBox);
        }
    };
    /**
     * @private
     * @return {?}
     */
    FcRectangleSelectService.prototype.updateSelectRect = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var x3 = Math.min(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        var x4 = Math.max(this.selectRect.x1, this.selectRect.x2);
        /** @type {?} */
        var y3 = Math.min(this.selectRect.y1, this.selectRect.y2);
        /** @type {?} */
        var y4 = Math.max(this.selectRect.y1, this.selectRect.y2);
        this.selectElement.style.left = x3 + 'px';
        this.selectElement.style.top = y3 + 'px';
        this.selectElement.style.width = x4 - x3 + 'px';
        this.selectElement.style.height = y4 - y3 + 'px';
    };
    /**
     * @private
     * @param {?} rectBox
     * @return {?}
     */
    FcRectangleSelectService.prototype.selectObjects = /**
     * @private
     * @param {?} rectBox
     * @return {?}
     */
    function (rectBox) {
        var _this = this;
        this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.modelService.selectAllInRect(rectBox);
        }));
    };
    return FcRectangleSelectService;
}());
export { FcRectangleSelectService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlc2VsZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL3JlY3RhbmdsZXNlbGVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUUxQyx3QkFLQzs7O0lBSkMsdUJBQVc7O0lBQ1gsdUJBQVc7O0lBQ1gsdUJBQVc7O0lBQ1gsdUJBQVc7O0FBR2I7SUFlRSxrQ0FBWSxZQUE0QixFQUM1QixhQUEwQixFQUMxQixhQUFrRDtRQWY3QyxlQUFVLEdBQWM7WUFDdkMsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7U0FDTixDQUFDO1FBV0EsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVNLDRDQUFTOzs7O0lBQWhCLFVBQWlCLENBQWE7UUFDNUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO2VBQzNFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxhQUFhLENB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SUFDOUMsaURBQTRDOzs7OztJQUM1QyxrREFBcUQ7Ozs7O0lBQ3JELGlEQUFvRDs7Ozs7SUFDcEQsaURBQW9FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmNSZWN0Qm94IH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5pbXBvcnQgc2Nyb2xscGFyZW50IGZyb20gJy4vc2Nyb2xscGFyZW50JztcblxuaW50ZXJmYWNlIFJlY3RhbmdsZSB7XG4gIHgxOiBudW1iZXI7XG4gIHgyOiBudW1iZXI7XG4gIHkxOiBudW1iZXI7XG4gIHkyOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGY1JlY3RhbmdsZVNlbGVjdFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0UmVjdDogUmVjdGFuZ2xlID0ge1xuICAgIHgxOiAwLFxuICAgIHgyOiAwLFxuICAgIHkxOiAwLFxuICAgIHkyOiAwXG4gIH07XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb2RlbFNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5ICRjYW52YXNFbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlIHJlYWRvbmx5ICRzY3JvbGxQYXJlbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwbHlGdW5jdGlvbjogPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpID0+IFQ7XG5cbiAgY29uc3RydWN0b3IobW9kZWxTZXJ2aWNlOiBGY01vZGVsU2VydmljZSxcbiAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgIGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUKSB7XG4gICAgdGhpcy5tb2RlbFNlcnZpY2UgPSBtb2RlbFNlcnZpY2U7XG4gICAgdGhpcy5zZWxlY3RFbGVtZW50ID0gc2VsZWN0RWxlbWVudDtcbiAgICB0aGlzLiRjYW52YXNFbGVtZW50ID0gJCh0aGlzLm1vZGVsU2VydmljZS5jYW52YXNIdG1sRWxlbWVudCk7XG4gICAgdGhpcy4kc2Nyb2xsUGFyZW50ID0gJChzY3JvbGxwYXJlbnQodGhpcy5tb2RlbFNlcnZpY2UuY2FudmFzSHRtbEVsZW1lbnQpKTtcbiAgICB0aGlzLmFwcGx5RnVuY3Rpb24gPSBhcHBseUZ1bmN0aW9uO1xuICB9XG5cbiAgcHVibGljIG1vdXNlZG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9kZWxTZXJ2aWNlLmlzRWRpdGFibGUoKSAmJiAhZS5jdHJsS2V5ICYmICFlLm1ldGFLZXkgJiYgZS5idXR0b24gPT09IDBcbiAgICAgICYmIHRoaXMuc2VsZWN0RWxlbWVudC5oaWRkZW4pIHtcbiAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuJGNhbnZhc0VsZW1lbnQub2Zmc2V0KCk7XG4gICAgICB0aGlzLnNlbGVjdFJlY3QueDEgPSBNYXRoLnJvdW5kKGUucGFnZVggLSBvZmZzZXQubGVmdCk7XG4gICAgICB0aGlzLnNlbGVjdFJlY3QueTEgPSBNYXRoLnJvdW5kKGUucGFnZVkgLSBvZmZzZXQudG9wKTtcbiAgICAgIHRoaXMuc2VsZWN0UmVjdC54MiA9IHRoaXMuc2VsZWN0UmVjdC54MTtcbiAgICAgIHRoaXMuc2VsZWN0UmVjdC55MiA9IHRoaXMuc2VsZWN0UmVjdC55MTtcbiAgICAgIHRoaXMudXBkYXRlU2VsZWN0UmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtb3VzZW1vdmUoZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGVsU2VydmljZS5pc0VkaXRhYmxlKCkgJiYgIWUuY3RybEtleSAmJiAhZS5tZXRhS2V5ICYmIGUuYnV0dG9uID09PSAwXG4gICAgICAmJiAhdGhpcy5zZWxlY3RFbGVtZW50LmhpZGRlbikge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy4kY2FudmFzRWxlbWVudC5vZmZzZXQoKTtcbiAgICAgIHRoaXMuc2VsZWN0UmVjdC54MiA9IE1hdGgucm91bmQoZS5wYWdlWCAtIG9mZnNldC5sZWZ0KTtcbiAgICAgIHRoaXMuc2VsZWN0UmVjdC55MiA9IE1hdGgucm91bmQoZS5wYWdlWSAtIG9mZnNldC50b3ApO1xuICAgICAgdGhpcy51cGRhdGVTY3JvbGwob2Zmc2V0KTtcbiAgICAgIHRoaXMudXBkYXRlU2VsZWN0UmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2Nyb2xsKG9mZnNldDogSlF1ZXJ5LkNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuJHNjcm9sbFBhcmVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBib3R0b20gPSByZWN0LmJvdHRvbSAtIG9mZnNldC50b3A7XG4gICAgY29uc3QgcmlnaHQgPSByZWN0LnJpZ2h0IC0gb2Zmc2V0LmxlZnQ7XG4gICAgY29uc3QgdG9wID0gcmVjdC50b3AgLSBvZmZzZXQudG9wO1xuICAgIGNvbnN0IGxlZnQgPSByZWN0LmxlZnQgLSBvZmZzZXQubGVmdDtcbiAgICBpZiAodGhpcy5zZWxlY3RSZWN0LnkyIC0gdG9wIDwgMjUpIHtcbiAgICAgIGNvbnN0IHRvcFNjcm9sbCA9IDI1IC0gKHRoaXMuc2VsZWN0UmVjdC55MiAtIHRvcCk7XG4gICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKCk7XG4gICAgICB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKHNjcm9sbCAtIHRvcFNjcm9sbCk7XG4gICAgfSBlbHNlIGlmIChib3R0b20gLSB0aGlzLnNlbGVjdFJlY3QueTIgPCA0MCkge1xuICAgICAgY29uc3QgYm90dG9tU2Nyb2xsID0gNDAgLSAoYm90dG9tIC0gdGhpcy5zZWxlY3RSZWN0LnkyKTtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxUb3AoKTtcbiAgICAgIHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxUb3Aoc2Nyb2xsICsgYm90dG9tU2Nyb2xsKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0UmVjdC54MiAtIGxlZnQgPCAyNSkge1xuICAgICAgY29uc3QgbGVmdFNjcm9sbCA9IDI1IC0gKHRoaXMuc2VsZWN0UmVjdC54MiAtIGxlZnQpO1xuICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbExlZnQoKTtcbiAgICAgIHRoaXMuJHNjcm9sbFBhcmVudC5zY3JvbGxMZWZ0KHNjcm9sbCAtIGxlZnRTY3JvbGwpO1xuICAgIH0gZWxzZSBpZiAocmlnaHQgLSB0aGlzLnNlbGVjdFJlY3QueDIgPCA0MCkge1xuICAgICAgY29uc3QgcmlnaHRTY3JvbGwgPSA0MCAtIChyaWdodCAtIHRoaXMuc2VsZWN0UmVjdC54Mik7XG4gICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLiRzY3JvbGxQYXJlbnQuc2Nyb2xsTGVmdCgpO1xuICAgICAgdGhpcy4kc2Nyb2xsUGFyZW50LnNjcm9sbExlZnQoc2Nyb2xsICsgcmlnaHRTY3JvbGwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtb3VzZXVwKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb2RlbFNlcnZpY2UuaXNFZGl0YWJsZSgpICYmICFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiBlLmJ1dHRvbiA9PT0gMFxuICAgICAgJiYgIXRoaXMuc2VsZWN0RWxlbWVudC5oaWRkZW4pIHtcbiAgICAgIGNvbnN0IHJlY3RCb3ggPSB0aGlzLnNlbGVjdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgYXMgRmNSZWN0Qm94O1xuICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LmhpZGRlbiA9IHRydWU7XG4gICAgICB0aGlzLnNlbGVjdE9iamVjdHMocmVjdEJveCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTZWxlY3RSZWN0KCkge1xuICAgIGNvbnN0IHgzID0gTWF0aC5taW4odGhpcy5zZWxlY3RSZWN0LngxLCB0aGlzLnNlbGVjdFJlY3QueDIpO1xuICAgIGNvbnN0IHg0ID0gTWF0aC5tYXgodGhpcy5zZWxlY3RSZWN0LngxLCB0aGlzLnNlbGVjdFJlY3QueDIpO1xuICAgIGNvbnN0IHkzID0gTWF0aC5taW4odGhpcy5zZWxlY3RSZWN0LnkxLCB0aGlzLnNlbGVjdFJlY3QueTIpO1xuICAgIGNvbnN0IHk0ID0gTWF0aC5tYXgodGhpcy5zZWxlY3RSZWN0LnkxLCB0aGlzLnNlbGVjdFJlY3QueTIpO1xuICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS5sZWZ0ID0geDMgKyAncHgnO1xuICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS50b3AgPSB5MyArICdweCc7XG4gICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLndpZHRoID0geDQgLSB4MyArICdweCc7XG4gICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmhlaWdodCA9IHk0IC0geTMgKyAncHgnO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RPYmplY3RzKHJlY3RCb3g6IEZjUmVjdEJveCkge1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLm1vZGVsU2VydmljZS5zZWxlY3RBbGxJblJlY3QocmVjdEJveCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG4iXX0=