/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { fcTopSort, ModelvalidationError } from './ngx-flowchart.models';
var FcModelValidationService = /** @class */ (function () {
    function FcModelValidationService() {
    }
    /**
     * @param {?} model
     * @return {?}
     */
    FcModelValidationService.prototype.validateModel = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype.validateNodes = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var _this = this;
        /** @type {?} */
        var ids = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            _this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        }));
        /** @type {?} */
        var connectorIds = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            node.connectors.forEach((/**
             * @param {?} connector
             * @return {?}
             */
            function (connector) {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            }));
        }));
        return nodes;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FcModelValidationService.prototype.validateNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
        node.connectors.forEach((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) {
            _this.validateConnector(connector);
        }));
        return node;
    };
    /**
     * @private
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype._validateEdges = /**
     * @private
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    function (edges, nodes) {
        var _this = this;
        edges.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        function (edge) {
            _this._validateEdge(edge, nodes);
        }));
        edges.forEach((/**
         * @param {?} edge1
         * @param {?} index1
         * @return {?}
         */
        function (edge1, index1) {
            edges.forEach((/**
             * @param {?} edge2
             * @param {?} index2
             * @return {?}
             */
            function (edge2, index2) {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            }));
        }));
        if (fcTopSort({ nodes: nodes, edges: edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    };
    /**
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype.validateEdges = /**
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    function (edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    };
    /**
     * @private
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype._validateEdge = /**
     * @private
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    function (edge, nodes) {
        if (edge.source === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        if (edge.destination === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (edge.source === edge.destination) {
            throw new ModelvalidationError('Edge with same source and destination connectors.');
        }
        /** @type {?} */
        var sourceNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) { return connector.id === edge.source; })); }))[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        /** @type {?} */
        var destinationNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        function (connector) { return connector.id === edge.destination; })); }))[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    };
    /**
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    FcModelValidationService.prototype.validateEdge = /**
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    function (edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    };
    /**
     * @param {?} connector
     * @return {?}
     */
    FcModelValidationService.prototype.validateConnector = /**
     * @param {?} connector
     * @return {?}
     */
    function (connector) {
        if (connector.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
            throw new ModelvalidationError('Type not valid.');
        }
        return connector;
    };
    FcModelValidationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FcModelValidationService.ctorParameters = function () { return []; };
    return FcModelValidationService;
}());
export { FcModelValidationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBd0MsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0c7SUFHRTtJQUFnQixDQUFDOzs7OztJQUVWLGdEQUFhOzs7O0lBQXBCLFVBQXFCLEtBQWM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRU0sZ0RBQWE7Ozs7SUFBcEIsVUFBcUIsS0FBb0I7UUFBekMsaUJBbUJDOztZQWxCTyxHQUFHLEdBQWEsRUFBRTtRQUN4QixLQUFLLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsSUFBSTtZQUNqQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxFQUFDLENBQUM7O1lBQ0csWUFBWSxHQUFhLEVBQUU7UUFDakMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLElBQUk7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7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eyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNFZGdlLCBGY01vZGVsLCBGY05vZGUsIGZjVG9wU29ydCwgTW9kZWx2YWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgdmFsaWRhdGVNb2RlbChtb2RlbDogRmNNb2RlbCk6IEZjTW9kZWwge1xuICAgIHRoaXMudmFsaWRhdGVOb2Rlcyhtb2RlbC5ub2Rlcyk7XG4gICAgdGhpcy5fdmFsaWRhdGVFZGdlcyhtb2RlbC5lZGdlcywgbW9kZWwubm9kZXMpO1xuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZU5vZGVzKG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNOb2RlPiB7XG4gICAgY29uc3QgaWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVOb2RlKG5vZGUpO1xuICAgICAgaWYgKGlkcy5pbmRleE9mKG5vZGUuaWQpICE9PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB1bmlxdWUuJyk7XG4gICAgICB9XG4gICAgICBpZHMucHVzaChub2RlLmlkKTtcbiAgICB9KTtcbiAgICBjb25zdCBjb25uZWN0b3JJZHM6IHN0cmluZ1tdID0gW107XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5jb25uZWN0b3JzLmZvckVhY2goKGNvbm5lY3RvcikgPT4ge1xuICAgICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoY29ubmVjdG9yLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB1bmlxdWUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdG9ySWRzLnB1c2goY29ubmVjdG9yLmlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZU5vZGUobm9kZTogRmNOb2RlKTogRmNOb2RlIHtcbiAgICBpZiAobm9kZS5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ05hbWUgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUueCAhPT0gJ251bWJlcicgfHwgbm9kZS54IDwgMCB8fCBNYXRoLnJvdW5kKG5vZGUueCkgIT09IG5vZGUueCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdDb29yZGluYXRlcyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZS55ICE9PSAnbnVtYmVyJyB8fCBub2RlLnkgPCAwIHx8IE1hdGgucm91bmQobm9kZS55KSAhPT0gbm9kZS55KSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Nvb3JkaW5hdGVzIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGUuY29ubmVjdG9ycykpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignQ29ubmVjdG9ycyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIG5vZGUuY29ubmVjdG9ycy5mb3JFYWNoKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVDb25uZWN0b3IoY29ubmVjdG9yKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlRWRnZXMoZWRnZXM6IEFycmF5PEZjRWRnZT4sIG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNFZGdlPiB7XG4gICAgZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5fdmFsaWRhdGVFZGdlKGVkZ2UsIG5vZGVzKTtcbiAgICB9KTtcbiAgICBlZGdlcy5mb3JFYWNoKChlZGdlMSwgaW5kZXgxKSA9PiB7XG4gICAgICBlZGdlcy5mb3JFYWNoKChlZGdlMiwgaW5kZXgyKSA9PiB7XG4gICAgICAgIGlmIChpbmRleDEgIT09IGluZGV4Mikge1xuICAgICAgICAgIGlmICgoZWRnZTEuc291cmNlID09PSBlZGdlMi5zb3VyY2UgJiYgZWRnZTEuZGVzdGluYXRpb24gPT09IGVkZ2UyLmRlc3RpbmF0aW9uKSB8fFxuICAgICAgICAgICAgKGVkZ2UxLnNvdXJjZSA9PT0gZWRnZTIuZGVzdGluYXRpb24gJiYgZWRnZTEuZGVzdGluYXRpb24gPT09IGVkZ2UyLnNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRHVwbGljYXRlZCBlZGdlLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGZjVG9wU29ydCh7bm9kZXMsIGVkZ2VzfSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignR3JhcGggaGFzIGEgY2lyY2xlLicpO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVFZGdlcyhlZGdlczogQXJyYXk8RmNFZGdlPiwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBBcnJheTxGY0VkZ2U+IHtcbiAgICB0aGlzLnZhbGlkYXRlTm9kZXMobm9kZXMpO1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUVkZ2VzKGVkZ2VzLCBub2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZUVkZ2UoZWRnZTogRmNFZGdlLCBub2RlczogQXJyYXk8RmNOb2RlPik6IEZjRWRnZSB7XG4gICAgaWYgKGVkZ2Uuc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignU291cmNlIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKGVkZ2UuZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdEZXN0aW5hdGlvbiBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChlZGdlLnNvdXJjZSA9PT0gZWRnZS5kZXN0aW5hdGlvbikge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdFZGdlIHdpdGggc2FtZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGNvbm5lY3RvcnMuJyk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+IG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5zb3VyY2UpKVswXTtcbiAgICBpZiAoc291cmNlTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1NvdXJjZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gbm9kZS5jb25uZWN0b3JzLnNvbWUoKGNvbm5lY3RvcikgPT4gY29ubmVjdG9yLmlkID09PSBlZGdlLmRlc3RpbmF0aW9uKSlbMF07XG4gICAgaWYgKGRlc3RpbmF0aW9uTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Rlc3RpbmF0aW9uIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZU5vZGUgPT09IGRlc3RpbmF0aW9uTm9kZSkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdFZGdlIHdpdGggc2FtZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG5vZGVzLicpO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUVkZ2UoZWRnZTogRmNFZGdlLCBub2RlczogQXJyYXk8RmNOb2RlPik6IEZjRWRnZSB7XG4gICAgdGhpcy52YWxpZGF0ZU5vZGVzKG5vZGVzKTtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVFZGdlKGVkZ2UsIG5vZGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUNvbm5lY3Rvcihjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogRmNDb25uZWN0b3Ige1xuICAgIGlmIChjb25uZWN0b3IuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChjb25uZWN0b3IudHlwZSA9PT0gdW5kZWZpbmVkIHx8IGNvbm5lY3Rvci50eXBlID09PSBudWxsIHx8IHR5cGVvZiBjb25uZWN0b3IudHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignVHlwZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBjb25uZWN0b3I7XG4gIH1cblxufVxuIl19