var FcMouseOverService = /** @class */ (function () {
    function FcMouseOverService(applyFunction) {
        this.mouseoverscope = {
            connector: null,
            edge: null,
            node: null
        };
        this.applyFunction = applyFunction;
    }
    FcMouseOverService.prototype.nodeMouseOver = function (event, node) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.node = node;
        });
    };
    FcMouseOverService.prototype.nodeMouseOut = function (event, node) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.node = null;
        });
    };
    FcMouseOverService.prototype.connectorMouseEnter = function (event, connector) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.connector = connector;
        });
    };
    FcMouseOverService.prototype.connectorMouseLeave = function (event, connector) {
        var _this = this;
        return this.applyFunction(function () {
            _this.mouseoverscope.connector = null;
        });
    };
    FcMouseOverService.prototype.edgeMouseEnter = function (event, edge) {
        this.mouseoverscope.edge = edge;
    };
    FcMouseOverService.prototype.edgeMouseLeave = function (event, edge) {
        this.mouseoverscope.edge = null;
    };
    return FcMouseOverService;
}());
export { FcMouseOverService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2VvdmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vdXNlb3Zlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBVUUsNEJBQVksYUFBa0Q7UUFSOUQsbUJBQWMsR0FBbUI7WUFDL0IsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUtBLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFTSwwQ0FBYSxHQUFwQixVQUFxQixLQUFpQixFQUFFLElBQVk7UUFBcEQsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDeEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHlDQUFZLEdBQW5CLFVBQW9CLEtBQWlCLEVBQUUsSUFBWTtRQUFuRCxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN4QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sZ0RBQW1CLEdBQTFCLFVBQTJCLEtBQWlCLEVBQUUsU0FBc0I7UUFBcEUsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDeEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGdEQUFtQixHQUExQixVQUEyQixLQUFpQixFQUFFLFNBQXNCO1FBQXBFLGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwyQ0FBYyxHQUFyQixVQUFzQixLQUFpQixFQUFFLElBQVk7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFTSwyQ0FBYyxHQUFyQixVQUFzQixLQUFpQixFQUFFLElBQVk7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNFZGdlLCBGY05vZGUgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIEZjTW91c2VPdmVyU2VydmljZSB7XG5cbiAgbW91c2VvdmVyc2NvcGU6IE1vdXNlT3ZlclNjb3BlID0ge1xuICAgIGNvbm5lY3RvcjogbnVsbCxcbiAgICBlZGdlOiBudWxsLFxuICAgIG5vZGU6IG51bGxcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUO1xuXG4gIGNvbnN0cnVjdG9yKGFwcGx5RnVuY3Rpb246IDxUPihmbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSA9PiBUKSB7XG4gICAgdGhpcy5hcHBseUZ1bmN0aW9uID0gYXBwbHlGdW5jdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBub2RlTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VvdmVyc2NvcGUubm9kZSA9IG5vZGU7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbm9kZU1vdXNlT3V0KGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseUZ1bmN0aW9uKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VvdmVyc2NvcGUubm9kZSA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdG9yTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZW92ZXJzY29wZS5jb25uZWN0b3IgPSBjb25uZWN0b3I7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY29ubmVjdG9yTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCwgY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmFwcGx5RnVuY3Rpb24oKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZW92ZXJzY29wZS5jb25uZWN0b3IgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGVkZ2VNb3VzZUVudGVyKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlcnNjb3BlLmVkZ2UgPSBlZGdlO1xuICB9XG5cbiAgcHVibGljIGVkZ2VNb3VzZUxlYXZlKGV2ZW50OiBNb3VzZUV2ZW50LCBlZGdlOiBGY0VkZ2UpIHtcbiAgICB0aGlzLm1vdXNlb3ZlcnNjb3BlLmVkZ2UgPSBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VPdmVyU2NvcGUge1xuICBjb25uZWN0b3I6IEZjQ29ubmVjdG9yO1xuICBlZGdlOiBGY0VkZ2U7XG4gIG5vZGU6IEZjTm9kZTtcbn1cbiJdfQ==