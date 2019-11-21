/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { fcTopSort, ModelvalidationError } from './ngx-flowchart.models';
export class FcModelValidationService {
    constructor() { }
    /**
     * @param {?} model
     * @return {?}
     */
    validateModel(model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    validateNodes(nodes) {
        /** @type {?} */
        const ids = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        }));
        /** @type {?} */
        const connectorIds = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            node.connectors.forEach((/**
             * @param {?} connector
             * @return {?}
             */
            (connector) => {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            }));
        }));
        return nodes;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    validateNode(node) {
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
        (connector) => {
            this.validateConnector(connector);
        }));
        return node;
    }
    /**
     * @private
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    _validateEdges(edges, nodes) {
        edges.forEach((/**
         * @param {?} edge
         * @return {?}
         */
        (edge) => {
            this._validateEdge(edge, nodes);
        }));
        edges.forEach((/**
         * @param {?} edge1
         * @param {?} index1
         * @return {?}
         */
        (edge1, index1) => {
            edges.forEach((/**
             * @param {?} edge2
             * @param {?} index2
             * @return {?}
             */
            (edge2, index2) => {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            }));
        }));
        if (fcTopSort({ nodes, edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    }
    /**
     * @param {?} edges
     * @param {?} nodes
     * @return {?}
     */
    validateEdges(edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    }
    /**
     * @private
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    _validateEdge(edge, nodes) {
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
        const sourceNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => connector.id === edge.source))))[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        /** @type {?} */
        const destinationNode = nodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => node.connectors.some((/**
         * @param {?} connector
         * @return {?}
         */
        (connector) => connector.id === edge.destination))))[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    }
    /**
     * @param {?} edge
     * @param {?} nodes
     * @return {?}
     */
    validateEdge(edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    }
    /**
     * @param {?} connector
     * @return {?}
     */
    validateConnector(connector) {
        if (connector.id === undefined) {
            throw new ModelvalidationError('Id not valid.');
        }
        if (connector.type === undefined || connector.type === null || typeof connector.type !== 'string') {
            throw new ModelvalidationError('Type not valid.');
        }
        return connector;
    }
}
FcModelValidationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FcModelValidationService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZmxvd2NoYXJ0LyIsInNvdXJjZXMiOlsibGliL21vZGVsdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBd0MsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHL0csTUFBTSxPQUFPLHdCQUF3QjtJQUVuQyxnQkFBZ0IsQ0FBQzs7Ozs7SUFFVixhQUFhLENBQUMsS0FBYztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFTSxhQUFhLENBQUMsS0FBb0I7O2NBQ2pDLEdBQUcsR0FBYSxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxFQUFDLENBQUM7O2NBQ0csWUFBWSxHQUFhLEVBQUU7UUFDakMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FB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Ozs7UUFBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekgsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxVQUFVLEtBQUssZUFBZSxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFTSxZQUFZLENBQUMsSUFBWSxFQUFFLEtBQW9CO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVNLGlCQUFpQixDQUFDLFNBQXNCO1FBQzdDLElBQUksU0FBUyxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDOUIsTUFBTSxJQUFJLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLFNBQVMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2pHLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7O1lBcEhGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY0Nvbm5lY3RvciwgRmNFZGdlLCBGY01vZGVsLCBGY05vZGUsIGZjVG9wU29ydCwgTW9kZWx2YWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL25neC1mbG93Y2hhcnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZjTW9kZWxWYWxpZGF0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgdmFsaWRhdGVNb2RlbChtb2RlbDogRmNNb2RlbCk6IEZjTW9kZWwge1xuICAgIHRoaXMudmFsaWRhdGVOb2Rlcyhtb2RlbC5ub2Rlcyk7XG4gICAgdGhpcy5fdmFsaWRhdGVFZGdlcyhtb2RlbC5lZGdlcywgbW9kZWwubm9kZXMpO1xuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZU5vZGVzKG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNOb2RlPiB7XG4gICAgY29uc3QgaWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVOb2RlKG5vZGUpO1xuICAgICAgaWYgKGlkcy5pbmRleE9mKG5vZGUuaWQpICE9PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB1bmlxdWUuJyk7XG4gICAgICB9XG4gICAgICBpZHMucHVzaChub2RlLmlkKTtcbiAgICB9KTtcbiAgICBjb25zdCBjb25uZWN0b3JJZHM6IHN0cmluZ1tdID0gW107XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5jb25uZWN0b3JzLmZvckVhY2goKGNvbm5lY3RvcikgPT4ge1xuICAgICAgICBpZiAoY29ubmVjdG9ySWRzLmluZGV4T2YoY29ubmVjdG9yLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB1bmlxdWUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdG9ySWRzLnB1c2goY29ubmVjdG9yLmlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZU5vZGUobm9kZTogRmNOb2RlKTogRmNOb2RlIHtcbiAgICBpZiAobm9kZS5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0lkIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ05hbWUgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUueCAhPT0gJ251bWJlcicgfHwgbm9kZS54IDwgMCB8fCBNYXRoLnJvdW5kKG5vZGUueCkgIT09IG5vZGUueCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdDb29yZGluYXRlcyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZS55ICE9PSAnbnVtYmVyJyB8fCBub2RlLnkgPCAwIHx8IE1hdGgucm91bmQobm9kZS55KSAhPT0gbm9kZS55KSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Nvb3JkaW5hdGVzIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGUuY29ubmVjdG9ycykpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignQ29ubmVjdG9ycyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIG5vZGUuY29ubmVjdG9ycy5mb3JFYWNoKChjb25uZWN0b3IpID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVDb25uZWN0b3IoY29ubmVjdG9yKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlRWRnZXMoZWRnZXM6IEFycmF5PEZjRWRnZT4sIG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNFZGdlPiB7XG4gICAgZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgdGhpcy5fdmFsaWRhdGVFZGdlKGVkZ2UsIG5vZGVzKTtcbiAgICB9KTtcbiAgICBlZGdlcy5mb3JFYWNoKChlZGdlMSwgaW5kZXgxKSA9PiB7XG4gICAgICBlZGdlcy5mb3JFYWNoKChlZGdlMiwgaW5kZXgyKSA9PiB7XG4gICAgICAgIGlmIChpbmRleDEgIT09IGluZGV4Mikge1xuICAgICAgICAgIGlmICgoZWRnZTEuc291cmNlID09PSBlZGdlMi5zb3VyY2UgJiYgZWRnZTEuZGVzdGluYXRpb24gPT09IGVkZ2UyLmRlc3RpbmF0aW9uKSB8fFxuICAgICAgICAgICAgKGVkZ2UxLnNvdXJjZSA9PT0gZWRnZTIuZGVzdGluYXRpb24gJiYgZWRnZTEuZGVzdGluYXRpb24gPT09IGVkZ2UyLnNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRHVwbGljYXRlZCBlZGdlLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGZjVG9wU29ydCh7bm9kZXMsIGVkZ2VzfSkgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignR3JhcGggaGFzIGEgY2lyY2xlLicpO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVFZGdlcyhlZGdlczogQXJyYXk8RmNFZGdlPiwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBBcnJheTxGY0VkZ2U+IHtcbiAgICB0aGlzLnZhbGlkYXRlTm9kZXMobm9kZXMpO1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUVkZ2VzKGVkZ2VzLCBub2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZUVkZ2UoZWRnZTogRmNFZGdlLCBub2RlczogQXJyYXk8RmNOb2RlPik6IEZjRWRnZSB7XG4gICAgaWYgKGVkZ2Uuc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignU291cmNlIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKGVkZ2UuZGVzdGluYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdEZXN0aW5hdGlvbiBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChlZGdlLnNvdXJjZSA9PT0gZWRnZS5kZXN0aW5hdGlvbikge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdFZGdlIHdpdGggc2FtZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGNvbm5lY3RvcnMuJyk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+IG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5zb3VyY2UpKVswXTtcbiAgICBpZiAoc291cmNlTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1NvdXJjZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gbm9kZS5jb25uZWN0b3JzLnNvbWUoKGNvbm5lY3RvcikgPT4gY29ubmVjdG9yLmlkID09PSBlZGdlLmRlc3RpbmF0aW9uKSlbMF07XG4gICAgaWYgKGRlc3RpbmF0aW9uTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Rlc3RpbmF0aW9uIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZU5vZGUgPT09IGRlc3RpbmF0aW9uTm9kZSkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdFZGdlIHdpdGggc2FtZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG5vZGVzLicpO1xuICAgIH1cbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUVkZ2UoZWRnZTogRmNFZGdlLCBub2RlczogQXJyYXk8RmNOb2RlPik6IEZjRWRnZSB7XG4gICAgdGhpcy52YWxpZGF0ZU5vZGVzKG5vZGVzKTtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVFZGdlKGVkZ2UsIG5vZGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZUNvbm5lY3Rvcihjb25uZWN0b3I6IEZjQ29ubmVjdG9yKTogRmNDb25uZWN0b3Ige1xuICAgIGlmIChjb25uZWN0b3IuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChjb25uZWN0b3IudHlwZSA9PT0gdW5kZWZpbmVkIHx8IGNvbm5lY3Rvci50eXBlID09PSBudWxsIHx8IHR5cGVvZiBjb25uZWN0b3IudHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignVHlwZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBjb25uZWN0b3I7XG4gIH1cblxufVxuIl19