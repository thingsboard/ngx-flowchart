/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FcMouseOverService = /** @class */ (function () {
    function FcMouseOverService(applyFunction) {
        this.mouseoverscope = {
            connector: null,
            edge: null,
            node: null
        };
        this.applyFunction = applyFunction;
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FcMouseOverService.prototype.nodeMouseOver = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.node = node;
        }));
    };
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    FcMouseOverService.prototype.nodeMouseOut = /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    function (event, node) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.node = null;
        }));
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcMouseOverService.prototype.connectorMouseEnter = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.connector = connector;
        }));
    };
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    FcMouseOverService.prototype.connectorMouseLeave = /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    function (event, connector) {
        var _this = this;
        return this.applyFunction((/**
         * @return {?}
         */
        function () {
            _this.mouseoverscope.connector = null;
        }));
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    FcMouseOverService.prototype.edgeMouseEnter = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverscope.edge = edge;
    };
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    FcMouseOverService.prototype.edgeMouseLeave = /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    function (event, edge) {
        this.mouseoverscope.edge = null;
    };
    return FcMouseOverService;
}());
export { FcMouseOverService };
if (false) {
    /** @type {?} */
    FcMouseOverService.prototype.mouseoverscope;
    /**
     * @type {?}
     * @private
     */
    FcMouseOverService.prototype.applyFunction;
}
/**
 * @record
 */
export function MouseOverScope() { }
if (false) {
    /** @type {?} */
    MouseOverScope.prototype.connector;
    /** @type {?} */
    MouseOverScope.prototype.edge;
    /** @type {?} */
    MouseOverScope.prototype.node;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2VvdmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vdXNlb3Zlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQVVFLDRCQUFZLGFBQWtEO1FBUjlELG1CQUFjLEdBQW1CO1lBQy9CLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7UUFLQSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFTSwwQ0FBYTs7Ozs7SUFBcEIsVUFBcUIsS0FBaUIsRUFBRSxJQUFZO1FBQXBELGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsYUFBYTs7O1FBQUM7WUFDeEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU0seUNBQVk7Ozs7O0lBQW5CLFVBQW9CLEtBQWlCLEVBQUUsSUFBWTtRQUFuRCxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLGFBQWE7OztRQUFDO1lBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLGdEQUFtQjs7Ozs7SUFBMUIsVUFBMkIsS0FBaUIsRUFBRSxTQUFzQjtRQUFwRSxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLGFBQWE7OztRQUFDO1lBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLGdEQUFtQjs7Ozs7SUFBMUIsVUFBMkIsS0FBaUIsRUFBRSxTQUFzQjtRQUFwRSxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLGFBQWE7OztRQUFDO1lBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLDJDQUFjOzs7OztJQUFyQixVQUFzQixLQUFpQixFQUFFLElBQVk7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUVNLDJDQUFjOzs7OztJQUFyQixVQUFzQixLQUFpQixFQUFFLElBQVk7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7Ozs7SUEzQ0MsNENBSUU7Ozs7O0lBRUYsMkNBQW9FOzs7OztBQXVDdEUsb0NBSUM7OztJQUhDLG1DQUF1Qjs7SUFDdkIsOEJBQWE7O0lBQ2IsOEJBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNFZGdlLCBGY05vZGUgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIEZjTW91c2VPdmVyU2VydmljZSB7XG5cbiAgbW91c2VvdmVyc2NvcGU6IE1vdXNlT3ZlclNjb3BlID0ge1xuICAgIGNvbm5lY3RvcjogbnVsbCxcbiAgICBlZGdlOiBudWxsLFxuICAgIG5vZGU6IG51bGxcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuXG4gIGNvbnN0cnVjdG9yKGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUKSB7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBub2RlTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VvdmVyc2NvcGUubm9kZSA9IG5vZGU7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbm9kZU1vdXNlT3V0KGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VvdmVyc2NvcGUubm9kZSA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdG9yTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZW92ZXJzY29wZS5jb25uZWN0b3IgPSBjb25uZWN0b3I7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdG9yTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZW92ZXJzY29wZS5jb25uZWN0b3IgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGVkZ2VNb3VzZUVudGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlcnNjb3BlLmVkZ2UgPSBlZGdlO1xuICB9XG5cbiAgcHVibGljIGVkZ2VNb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlcnNjb3BlLmVkZ2UgPSBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VPdmVyU2NvcGUge1xuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuICBlZGdlOiBGY0VkZ2U7XG4gIG5vZGU6IEZjTm9kZTtcbn1cbiJdfQ==