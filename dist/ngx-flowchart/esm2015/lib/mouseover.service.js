/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class FcMouseOverService {
    /**
     * @param {?} applyFunction
     */
    constructor(applyFunction) {
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
    nodeMouseOver(event, node) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.node = node;
        }));
    }
    /**
     * @param {?} event
     * @param {?} node
     * @return {?}
     */
    nodeMouseOut(event, node) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.node = null;
        }));
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    connectorMouseEnter(event, connector) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.connector = connector;
        }));
    }
    /**
     * @param {?} event
     * @param {?} connector
     * @return {?}
     */
    connectorMouseLeave(event, connector) {
        return this.applyFunction((/**
         * @return {?}
         */
        () => {
            this.mouseoverscope.connector = null;
        }));
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseEnter(event, edge) {
        this.mouseoverscope.edge = edge;
    }
    /**
     * @param {?} event
     * @param {?} edge
     * @return {?}
     */
    edgeMouseLeave(event, edge) {
        this.mouseoverscope.edge = null;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2VvdmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vdXNlb3Zlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBVTdCLFlBQVksYUFBa0Q7UUFSOUQsbUJBQWMsR0FBbUI7WUFDL0IsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUtBLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUVNLGFBQWEsQ0FBQyxLQUFpQixFQUFFLElBQVk7UUFDbEQsT0FBTyxJQUFJLENBQUMsYUFBYTs7O1FBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLFlBQVksQ0FBQyxLQUFpQixFQUFFLElBQVk7UUFDakQsT0FBTyxJQUFJLENBQUMsYUFBYTs7O1FBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLG1CQUFtQixDQUFDLEtBQWlCLEVBQUUsU0FBc0I7UUFDbEUsT0FBTyxJQUFJLENBQUMsYUFBYTs7O1FBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM1QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLG1CQUFtQixDQUFDLEtBQWlCLEVBQUUsU0FBc0I7UUFDbEUsT0FBTyxJQUFJLENBQUMsYUFBYTs7O1FBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVNLGNBQWMsQ0FBQyxLQUFpQixFQUFFLElBQVk7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUVNLGNBQWMsQ0FBQyxLQUFpQixFQUFFLElBQVk7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Q0FDRjs7O0lBM0NDLDRDQUlFOzs7OztJQUVGLDJDQUFvRTs7Ozs7QUF1Q3RFLG9DQUlDOzs7SUFIQyxtQ0FBdUI7O0lBQ3ZCLDhCQUFhOztJQUNiLDhCQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmNDb25uZWN0b3IsIEZjRWRnZSwgRmNOb2RlIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbmV4cG9ydCBjbGFzcyBGY01vdXNlT3ZlclNlcnZpY2Uge1xuXG4gIG1vdXNlb3ZlcnNjb3BlOiBNb3VzZU92ZXJTY29wZSA9IHtcbiAgICBjb25uZWN0b3I6IG51bGwsXG4gICAgZWRnZTogbnVsbCxcbiAgICBub2RlOiBudWxsXG4gIH07XG5cbiAgcHJpdmF0ZSByZWFkb25seSBhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVDtcblxuICBjb25zdHJ1Y3RvcihhcHBseUZ1bmN0aW9uOiA8VD4oZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gVCkgPT4gVCkge1xuICAgIHRoaXMuYXBwbHlGdW5jdGlvbiA9IGFwcGx5RnVuY3Rpb247XG4gIH1cblxuICBwdWJsaWMgbm9kZU1vdXNlT3ZlcihldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlb3ZlcnNjb3BlLm5vZGUgPSBub2RlO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5vZGVNb3VzZU91dChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlGdW5jdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlb3ZlcnNjb3BlLm5vZGUgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNvbm5lY3Rvck1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VvdmVyc2NvcGUuY29ubmVjdG9yID0gY29ubmVjdG9yO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNvbm5lY3Rvck1vdXNlTGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VvdmVyc2NvcGUuY29ubmVjdG9yID0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBlZGdlTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJzY29wZS5lZGdlID0gZWRnZTtcbiAgfVxuXG4gIHB1YmxpYyBlZGdlTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSB7XG4gICAgdGhpcy5tb3VzZW92ZXJzY29wZS5lZGdlID0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vdXNlT3ZlclNjb3BlIHtcbiAgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcbiAgZWRnZTogRmNFZGdlO1xuICBub2RlOiBGY05vZGU7XG59XG4iXX0=