import { Injectable } from '@angular/core';
import { fcTopSort, ModelvalidationError } from './ngx-flowchart.models';
import * as i0 from "@angular/core";
export class FcModelValidationService {
    constructor() { }
    validateModel(model) {
        this.validateNodes(model.nodes);
        this._validateEdges(model.edges, model.nodes);
        return model;
    }
    validateNodes(nodes) {
        const ids = [];
        nodes.forEach((node) => {
            this.validateNode(node);
            if (ids.indexOf(node.id) !== -1) {
                throw new ModelvalidationError('Id not unique.');
            }
            ids.push(node.id);
        });
        const connectorIds = [];
        nodes.forEach((node) => {
            node.connectors.forEach((connector) => {
                if (connectorIds.indexOf(connector.id) !== -1) {
                    throw new ModelvalidationError('Id not unique.');
                }
                connectorIds.push(connector.id);
            });
        });
        return nodes;
    }
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
        node.connectors.forEach((connector) => {
            this.validateConnector(connector);
        });
        return node;
    }
    _validateEdges(edges, nodes) {
        edges.forEach((edge) => {
            this._validateEdge(edge, nodes);
        });
        edges.forEach((edge1, index1) => {
            edges.forEach((edge2, index2) => {
                if (index1 !== index2) {
                    if ((edge1.source === edge2.source && edge1.destination === edge2.destination) ||
                        (edge1.source === edge2.destination && edge1.destination === edge2.source)) {
                        throw new ModelvalidationError('Duplicated edge.');
                    }
                }
            });
        });
        if (fcTopSort({ nodes, edges }) === null) {
            throw new ModelvalidationError('Graph has a circle.');
        }
        return edges;
    }
    validateEdges(edges, nodes) {
        this.validateNodes(nodes);
        return this._validateEdges(edges, nodes);
    }
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
        const sourceNode = nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.source))[0];
        if (sourceNode === undefined) {
            throw new ModelvalidationError('Source not valid.');
        }
        const destinationNode = nodes.filter((node) => node.connectors.some((connector) => connector.id === edge.destination))[0];
        if (destinationNode === undefined) {
            throw new ModelvalidationError('Destination not valid.');
        }
        if (sourceNode === destinationNode) {
            throw new ModelvalidationError('Edge with same source and destination nodes.');
        }
        return edge;
    }
    validateEdge(edge, nodes) {
        this.validateNodes(nodes);
        return this._validateEdge(edge, nodes);
    }
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
FcModelValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcModelValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FcModelValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcModelValidationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.5", ngImport: i0, type: FcModelValidationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvbW9kZWx2YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXdDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQUcvRyxNQUFNLE9BQU8sd0JBQXdCO0lBRW5DLGdCQUFnQixDQUFDO0lBRVYsYUFBYSxDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxhQUFhLENBQUMsS0FBb0I7UUFDdkMsTUFBTSxHQUFHLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFDbEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JCLElB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UyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFILElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUNqQyxNQUFNLElBQUksb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksVUFBVSxLQUFLLGVBQWUsRUFBRTtZQUNsQyxNQUFNLElBQUksb0JBQW9CLENBQUMsOENBQThDLENBQUMsQ0FBQztTQUNoRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLFlBQVksQ0FBQyxJQUFZLEVBQUUsS0FBb0I7UUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxTQUFzQjtRQUM3QyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNqRDtRQUNELElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxTQUFTLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNqRyxNQUFNLElBQUksb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNuRDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O3FIQW5IVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmNDb25uZWN0b3IsIEZjRWRnZSwgRmNNb2RlbCwgRmNOb2RlLCBmY1RvcFNvcnQsIE1vZGVsdmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnLi9uZ3gtZmxvd2NoYXJ0Lm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGY01vZGVsVmFsaWRhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIHZhbGlkYXRlTW9kZWwobW9kZWw6IEZjTW9kZWwpOiBGY01vZGVsIHtcbiAgICB0aGlzLnZhbGlkYXRlTm9kZXMobW9kZWwubm9kZXMpO1xuICAgIHRoaXMuX3ZhbGlkYXRlRWRnZXMobW9kZWwuZWRnZXMsIG1vZGVsLm5vZGVzKTtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVOb2Rlcyhub2RlczogQXJyYXk8RmNOb2RlPik6IEFycmF5PEZjTm9kZT4ge1xuICAgIGNvbnN0IGlkczogc3RyaW5nW10gPSBbXTtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlTm9kZShub2RlKTtcbiAgICAgIGlmIChpZHMuaW5kZXhPZihub2RlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdW5pcXVlLicpO1xuICAgICAgfVxuICAgICAgaWRzLnB1c2gobm9kZS5pZCk7XG4gICAgfSk7XG4gICAgY29uc3QgY29ubmVjdG9ySWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5vZGUuY29ubmVjdG9ycy5mb3JFYWNoKChjb25uZWN0b3IpID0+IHtcbiAgICAgICAgaWYgKGNvbm5lY3Rvcklkcy5pbmRleE9mKGNvbm5lY3Rvci5pZCkgIT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdW5pcXVlLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3Rvcklkcy5wdXNoKGNvbm5lY3Rvci5pZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVOb2RlKG5vZGU6IEZjTm9kZSk6IEZjTm9kZSB7XG4gICAgaWYgKG5vZGUuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdJZCBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZS5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdOYW1lIG5vdCB2YWxpZC4nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub2RlLnggIT09ICdudW1iZXInIHx8IG5vZGUueCA8IDAgfHwgTWF0aC5yb3VuZChub2RlLngpICE9PSBub2RlLngpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignQ29vcmRpbmF0ZXMgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5vZGUueSAhPT0gJ251bWJlcicgfHwgbm9kZS55IDwgMCB8fCBNYXRoLnJvdW5kKG5vZGUueSkgIT09IG5vZGUueSkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdDb29yZGluYXRlcyBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlLmNvbm5lY3RvcnMpKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0Nvbm5lY3RvcnMgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBub2RlLmNvbm5lY3RvcnMuZm9yRWFjaCgoY29ubmVjdG9yKSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ29ubmVjdG9yKGNvbm5lY3Rvcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZUVkZ2VzKGVkZ2VzOiBBcnJheTxGY0VkZ2U+LCBub2RlczogQXJyYXk8RmNOb2RlPik6IEFycmF5PEZjRWRnZT4ge1xuICAgIGVkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRlRWRnZShlZGdlLCBub2Rlcyk7XG4gICAgfSk7XG4gICAgZWRnZXMuZm9yRWFjaCgoZWRnZTEsIGluZGV4MSkgPT4ge1xuICAgICAgZWRnZXMuZm9yRWFjaCgoZWRnZTIsIGluZGV4MikgPT4ge1xuICAgICAgICBpZiAoaW5kZXgxICE9PSBpbmRleDIpIHtcbiAgICAgICAgICBpZiAoKGVkZ2UxLnNvdXJjZSA9PT0gZWRnZTIuc291cmNlICYmIGVkZ2UxLmRlc3RpbmF0aW9uID09PSBlZGdlMi5kZXN0aW5hdGlvbikgfHxcbiAgICAgICAgICAgIChlZGdlMS5zb3VyY2UgPT09IGVkZ2UyLmRlc3RpbmF0aW9uICYmIGVkZ2UxLmRlc3RpbmF0aW9uID09PSBlZGdlMi5zb3VyY2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0R1cGxpY2F0ZWQgZWRnZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChmY1RvcFNvcnQoe25vZGVzLCBlZGdlc30pID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ0dyYXBoIGhhcyBhIGNpcmNsZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlRWRnZXMoZWRnZXM6IEFycmF5PEZjRWRnZT4sIG5vZGVzOiBBcnJheTxGY05vZGU+KTogQXJyYXk8RmNFZGdlPiB7XG4gICAgdGhpcy52YWxpZGF0ZU5vZGVzKG5vZGVzKTtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVFZGdlcyhlZGdlcywgbm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGVFZGdlKGVkZ2U6IEZjRWRnZSwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBGY0VkZ2Uge1xuICAgIGlmIChlZGdlLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1NvdXJjZSBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChlZGdlLmRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRGVzdGluYXRpb24gbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAoZWRnZS5zb3VyY2UgPT09IGVkZ2UuZGVzdGluYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRWRnZSB3aXRoIHNhbWUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBjb25uZWN0b3JzLicpO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VOb2RlID0gbm9kZXMuZmlsdGVyKChub2RlKSA9PiBub2RlLmNvbm5lY3RvcnMuc29tZSgoY29ubmVjdG9yKSA9PiBjb25uZWN0b3IuaWQgPT09IGVkZ2Uuc291cmNlKSlbMF07XG4gICAgaWYgKHNvdXJjZU5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdTb3VyY2Ugbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBjb25zdCBkZXN0aW5hdGlvbk5vZGUgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+IG5vZGUuY29ubmVjdG9ycy5zb21lKChjb25uZWN0b3IpID0+IGNvbm5lY3Rvci5pZCA9PT0gZWRnZS5kZXN0aW5hdGlvbikpWzBdO1xuICAgIGlmIChkZXN0aW5hdGlvbk5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IE1vZGVsdmFsaWRhdGlvbkVycm9yKCdEZXN0aW5hdGlvbiBub3QgdmFsaWQuJyk7XG4gICAgfVxuICAgIGlmIChzb3VyY2VOb2RlID09PSBkZXN0aW5hdGlvbk5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignRWRnZSB3aXRoIHNhbWUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBub2Rlcy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGVkZ2U7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVFZGdlKGVkZ2U6IEZjRWRnZSwgbm9kZXM6IEFycmF5PEZjTm9kZT4pOiBGY0VkZ2Uge1xuICAgIHRoaXMudmFsaWRhdGVOb2Rlcyhub2Rlcyk7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlRWRnZShlZGdlLCBub2Rlcyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGVDb25uZWN0b3IoY29ubmVjdG9yOiBGY0Nvbm5lY3Rvcik6IEZjQ29ubmVjdG9yIHtcbiAgICBpZiAoY29ubmVjdG9yLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBNb2RlbHZhbGlkYXRpb25FcnJvcignSWQgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICBpZiAoY29ubmVjdG9yLnR5cGUgPT09IHVuZGVmaW5lZCB8fCBjb25uZWN0b3IudHlwZSA9PT0gbnVsbCB8fCB0eXBlb2YgY29ubmVjdG9yLnR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTW9kZWx2YWxpZGF0aW9uRXJyb3IoJ1R5cGUgbm90IHZhbGlkLicpO1xuICAgIH1cbiAgICByZXR1cm4gY29ubmVjdG9yO1xuICB9XG5cbn1cbiJdfQ==