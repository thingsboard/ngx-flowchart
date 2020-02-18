import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { fcTopSort, ModelvalidationError } from './ngx-flowchart.models';
var FcModelValidationService = /** @class */ (function () {
    function FcModelValidationService() {
    }
    FcModelValidationService.prototype.validateModel = function (model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    };
    FcModelValidationService.prototype.validateNodes = function (nodes) {
        var _this = this;
        var ids = [];
        nodes.forEach(function (node) {
            _this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        });
        var connectorIds = [];
        nodes.forEach(function (node) {
            node.connectors.forEach(function (connector) {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            });
        });
        return nodes;
    };
    FcModelValidationService.prototype.validateNode = function (node) {
        var _this = this;
        if (node.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (typeof node.name !== 'string') {
            throw new ModelvalidationError('Name not valid.');
        }
        if (typeof node.x !== 'number' || node.x < 0 || Math.round(node.x) !== node.x) {
            throw new ModelvalidationError('Coordinates not valid.');
        }
        if (typeof node.y !== 'number' || node.y < 0 || Math.round(node.y) !== node.y) {
            throw new ModelvalidationError('Coordinates not valid.');
        }
        if (!Array.isArray(node.connectors)) {
            throw new ModelvalidationError('Connectors not valid.');
        }
        node.connectors.forEach(function (connector) {
            _this.validateConnector(connector);
        });
        return node;
    };
    FcModelValidationService.prototype._validateEdges = function (edges, nodes) {
        var _this = this;
        edges.forEach(function (edge) {
            _this._validateEdge(edge, nodes);
        });
        edges.forEach(function (edge1, index1) {
            edges.forEach(function (edge2, index2) {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            });
        });
        if (fcTopSort({ nodes: nodes, edges: edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    };
    FcModelValidationService.prototype.validateEdges = function (edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    };
    FcModelValidationService.prototype._validateEdge = function (edge, nodes) {
        if (edge.source === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        if (edge.destination === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (edge.source === edge.destination) {
            throw new ModelvalidationError('Edge with same source and destination connectors.');
        }
        var sourceNode = nodes.filter(function (node) { return node.connectors.some(function (connector) { return connector.id === edge.source; }); })[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        var destinationNode = nodes.filter(function (node) { return node.connectors.some(function (connector) { return connector.id === edge.destination; }); })[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    };
    FcModelValidationService.prototype.validateEdge = function (edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    };
    FcModelValidationService.prototype.validateConnector = function (connector) {
        if (connector.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
            throw new ModelvalidationError('Type not valid.');
        }
        return connector;
    };
    FcModelValidationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FcModelValidationService);
    return FcModelValidationService;
}());
export { FcModelValidationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBd0MsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHL0c7SUFFRTtJQUFnQixDQUFDO0lBRVYsZ0RBQWEsR0FBcEIsVUFBcUIsS0FBYztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGdEQUFhLEdBQXBCLFVBQXFCLEtBQW9CO1FBQXpDLGlCQW1CQztRQWxCQyxJQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7UUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixNQUFNLElBQUksb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNsRDtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVB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aW1wb3J0IHsgRmNDb25uZWN0b3IsIEZjRWRnZSwgRmNNb2RlbCwgRmNOb2RlLCBmY1RvcFNvcnQsIE1vZGVsdmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIHZhbGlkYXRlTW9kZWwobW9kZWw6IEZjTW9kZWwpOiBGY01vZGVsIHtcbiAgICB0aGlzLnZhbGlkYXRlTm9kZXMobW9kZWwubm9kZXMpO1xuICAgIHRoaXMuX3ZhbGlkYXRlRWRnZXMobW9kZWwuZWRnZXMsIG1vZGVsLm5vZGVzKTtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVOb2Rlcyhub2RlczogQXJyYXk8RmNOb2RlPik6IEFycmF5PEZjTm9kZT4ge1xuICAgIGNvbnN0IGlkczogc3RyaW5nW10gPSBbXTtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlTm9kZShub2RlKTtcbiAgICAgIGlmIChpZHMuaW5kZXhPZihub2RlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdW5pcXVlLicpO1xuICAgICAgfVxuICAgICAgaWRzLnB1c2gobm9kZS5pZCk7XG4gICAgfSk7XG4gICAgY29uc3QgY29ubmVjdG9ySWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5vZGUuY29ubmVjdG9ycy5mb3JFYWNoKChjb25uZWN0b3IpID0+IHtcbiAgICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGNvbm5lY3Rvci5pZCkgIT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdW5pcXVlLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3Rvcklkcy5wdXNoKGNvbm5lY3Rvci5pZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVOb2RlKG5vZGU6IEZjTm9kZSk6IEZjTm9kZSB7XG4gICAgaWYgKG5vZGUuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZS5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdOYW1lIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlLnggIT09ICdudW1iZXInIHx8IG5vZGUueCA8IDAgfHwgTWF0aC5yb3VuZChub2RlLngpICE9PSBub2RlLngpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignQ29vcmRpbmF0ZXMgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUueSAhPT0gJ251bWJlcicgfHwgbm9kZS55IDwgMCB8fCBNYXRoLnJvdW5kKG5vZGUueSkgIT09IG5vZGUueSkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdDb29yZGluYXRlcyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlLmNvbm5lY3RvcnMpKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Nvbm5lY3RvcnMgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBub2RlLmNvbm5lY3RvcnMuZm9yRWFjaCgoY29ubmVjdG9yKSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ29ubmVjdG9yKGNvbm5lY3Rvcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZUVkZ2VzKGVkZ2VzOiBBcnJheTxGY0VkZ2U+LCBub2RlczogQXJyYXk8RmNOb2RlPik6IEFycmF5PEZjRWRnZT4ge1xuICAgIGVkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRlRWRnZShlZGdlLCBub2Rlcyk7XG4gICAgfSk7XG4gICAgZWRnZXMuZm9yRWFjaCgoZWRnZTEsIGluZGV4MSkgPT4ge1xuICAgICAgZWRnZXMuZm9yRWFjaCgoZWRnZTIsIGluZGV4MikgPT4ge1xuICAgICAgICBpZiAoaW5kZXgxICE9PSBpbmRleDIpIHtcbiAgICAgICAgICBpZiAoKGVkZ2UxLnNvdXJjZSA9PT0gZWRnZTIuc291cmNlICYmIGVkZ2UxLmRlc3RpbmF0aW9uID09PSBlZGdlMi5kZXN0aW5hdGlvbikgfHxcbiAgICAgICAgICAgIChlZGdlMS5zb3VyY2UgPT09IGVkZ2UyLmRlc3RpbmF0aW9uICYmIGVkZ2UxLmRlc3RpbmF0aW9uID09PSBlZGdlMi5zb3VyY2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0R1cGxpY2F0ZWQgZWRnZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChmY1RvcFNvcnQoe25vZGVzLCBlZGdlc30pID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0dyYXBoIGhhcyBhIGNpcmNsZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlRWRnZXMoZWRnZXM6IEFycmF5PEZjRWRnZT4sIG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNFZGdlPiB7XG4gICAgdGhpcy52YWxpZGF0ZU5vZGVzKG5vZGVzKTtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVFZGdlcyhlZGdlcywgbm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGVFZGdlKGVkZ2U6IEZjRWRnZSwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBGY0VkZ2Uge1xuICAgIGlmIChlZGdlLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1NvdXJjZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChlZGdlLmRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRGVzdGluYXRpb24gbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAoZWRnZS5zb3VyY2UgPT09IGVkZ2UuZGVzdGluYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRWRnZSB3aXRoIHNhbWUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBjb25uZWN0b3JzLicpO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VOb2RlID0gbm9kZXMuZmlsdGVyKChub2RlKSA9PiBub2RlLmNvbm5lY3RvcnMuc29tZSgoY29ubmVjdG9yKSA9PiBjb25uZWN0b3IuaWQgPT09IGVkZ2Uuc291cmNlKSlbMF07XG4gICAgaWYgKHNvdXJjZU5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdTb3VyY2Ugbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBjb25zdCBkZXN0aW5hdGlvbk5vZGUgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+IG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5kZXN0aW5hdGlvbikpWzBdO1xuICAgIGlmIChkZXN0aW5hdGlvbk5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdEZXN0aW5hdGlvbiBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChzb3VyY2VOb2RlID09PSBkZXN0aW5hdGlvbk5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRWRnZSB3aXRoIHNhbWUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBub2Rlcy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGVkZ2U7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVFZGdlKGVkZ2U6IEZjRWRnZSwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBGY0VkZ2Uge1xuICAgIHRoaXMudmFsaWRhdGVOb2Rlcyhub2Rlcyk7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlRWRnZShlZGdlLCBub2Rlcyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVDb25uZWN0b3IoY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IEZjQ29ubmVjdG9yIHtcbiAgICBpZiAoY29ubmVjdG9yLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignSWQgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAoY29ubmVjdG9yLnR5cGUgPT09IHVuZGVmaW5lZCB8fCBjb25uZWN0b3IudHlwZSA9PT0gbnVsbCB8fCB0eXBlb2YgY29ubmVjdG9yLnR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1R5cGUgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICByZXR1cm4gY29ubmVjdG9yO1xuICB9XG5cbn1cbiJdfQ==