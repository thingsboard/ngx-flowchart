import { Injectable } from '@angular/core';
import { fcTopSort, ModelvalidationError } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
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
    FcModelValidationService.ɵfac = function FcModelValidationService_Factory(t) { return new (t || FcModelValidationService)(); };
    FcModelValidationService.ɵprov = i0.ɵɵdefineInjectable({ token: FcModelValidationService, factory: FcModelValidationService.ɵfac });
    return FcModelValidationService;
}());
export { FcModelValidationService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FcModelValidationService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF3QyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFL0c7SUFHRTtJQUFnQixDQUFDO0lBRVYsZ0RBQWEsR0FBcEIsVUFBcUIsS0FBYztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGdEQUFhLEdBQXBCLFVBQXFCLEtBQW9CO1FBQXpDLGlCQW1CQztRQWxCQyxJQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7UUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDakIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixNQUFNLElBQUksb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNsRDtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVB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Z3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNFZGdlLCBGY01vZGVsLCBGY05vZGUsIGZjVG9wU29ydCwgTW9kZWx2YWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgdmFsaWRhdGVNb2RlbChtb2RlbDogRmNNb2RlbCk6IEZjTW9kZWwge1xuICAgIHRoaXMudmFsaWRhdGVOb2Rlcyhtb2RlbC5ub2Rlcyk7XG4gICAgdGhpcy5fdmFsaWRhdGVFZGdlcyhtb2RlbC5lZGdlcywgbW9kZWwubm9kZXMpO1xuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZU5vZGVzKG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNOb2RlPiB7XG4gICAgY29uc3QgaWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVOb2RlKG5vZGUpO1xuICAgICAgaWYgKGlkcy5pbmRleE9mKG5vZGUuaWQpICE9PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB1bmlxdWUuJyk7XG4gICAgICB9XG4gICAgICBpZHMucHVzaChub2RlLmlkKTtcbiAgICB9KTtcbiAgICBjb25zdCBjb25uZWN0b3JJZHM6IHN0cmluZ1tdID0gW107XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5jb25uZWN0b3JzLmZvckVhY2goKGNvbm5lY3RvcikgPT4ge1xuICAgICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoY29ubmVjdG9yLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB1bmlxdWUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdG9ySWRzLnB1c2goY29ubmVjdG9yLmlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZU5vZGUobm9kZTogRmNOb2RlKTogRmNOb2RlIHtcbiAgICBpZiAobm9kZS5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ05hbWUgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUueCAhPT0gJ251bWJlcicgfHwgbm9kZS54IDwgMCB8fCBNYXRoLnJvdW5kKG5vZGUueCkgIT09IG5vZGUueCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdDb29yZGluYXRlcyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZS55ICE9PSAnbnVtYmVyJyB8fCBub2RlLnkgPCAwIHx8IE1hdGgucm91bmQobm9kZS55KSAhPT0gbm9kZS55KSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Nvb3JkaW5hdGVzIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGUuY29ubmVjdG9ycykpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignQ29ubmVjdG9ycyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIG5vZGUuY29ubmVjdG9ycy5mb3JFYWNoKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVDb25uZWN0b3IoY29ubmVjdG9yKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlRWRnZXMoZWRnZXM6IEFycmF5PEZjRWRnZT4sIG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNFZGdlPiB7XG4gICAgZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5fdmFsaWRhdGVFZGdlKGVkZ2UsIG5vZGVzKTtcbiAgICB9KTtcbiAgICBlZGdlcy5mb3JFYWNoKChlZGdlMSwgaW5kZXgxKSA9PiB7XG4gICAgICBlZGdlcy5mb3JFYWNoKChlZGdlMiwgaW5kZXgyKSA9PiB7XG4gICAgICAgIGlmIChpbmRleDEgIT09IGluZGV4Mikge1xuICAgICAgICAgIGlmICgoZWRnZTEuc291cmNlID09PSBlZGdlMi5zb3VyY2UgJiYgZWRnZTEuZGVzdGluYXRpb24gPT09IGVkZ2UyLmRlc3RpbmF0aW9uKSB8fFxuICAgICAgICAgICAgKGVkZ2UxLnNvdXJjZSA9PT0gZWRnZTIuZGVzdGluYXRpb24gJiYgZWRnZTEuZGVzdGluYXRpb24gPT09IGVkZ2UyLnNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRHVwbGljYXRlZCBlZGdlLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGZjVG9wU29ydCh7bm9kZXMsIGVkZ2VzfSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignR3JhcGggaGFzIGEgY2lyY2xlLicpO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVFZGdlcyhlZGdlczogQXJyYXk8RmNFZGdlPiwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBBcnJheTxGY0VkZ2U+IHtcbiAgICB0aGlzLnZhbGlkYXRlTm9kZXMobm9kZXMpO1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUVkZ2VzKGVkZ2VzLCBub2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZUVkZ2UoZWRnZTogRmNFZGdlLCBub2RlczogQXJyYXk8RmNOb2RlPik6IEZjRWRnZSB7XG4gICAgaWYgKGVkZ2Uuc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignU291cmNlIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKGVkZ2UuZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdEZXN0aW5hdGlvbiBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChlZGdlLnNvdXJjZSA9PT0gZWRnZS5kZXN0aW5hdGlvbikge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdFZGdlIHdpdGggc2FtZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGNvbm5lY3RvcnMuJyk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+IG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5zb3VyY2UpKVswXTtcbiAgICBpZiAoc291cmNlTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1NvdXJjZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gbm9kZS5jb25uZWN0b3JzLnNvbWUoKGNvbm5lY3RvcikgPT4gY29ubmVjdG9yLmlkID09PSBlZGdlLmRlc3RpbmF0aW9uKSlbMF07XG4gICAgaWYgKGRlc3RpbmF0aW9uTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Rlc3RpbmF0aW9uIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZU5vZGUgPT09IGRlc3RpbmF0aW9uTm9kZSkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdFZGdlIHdpdGggc2FtZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG5vZGVzLicpO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUVkZ2UoZWRnZTogRmNFZGdlLCBub2RlczogQXJyYXk8RmNOb2RlPik6IEZjRWRnZSB7XG4gICAgdGhpcy52YWxpZGF0ZU5vZGVzKG5vZGVzKTtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVFZGdlKGVkZ2UsIG5vZGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUNvbm5lY3Rvcihjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogRmNDb25uZWN0b3Ige1xuICAgIGlmIChjb25uZWN0b3IuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChjb25uZWN0b3IudHlwZSA9PT0gdW5kZWZpbmVkIHx8IGNvbm5lY3Rvci50eXBlID09PSBudWxsIHx8IHR5cGVvZiBjb25uZWN0b3IudHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignVHlwZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBjb25uZWN0b3I7XG4gIH1cblxufVxuIl19