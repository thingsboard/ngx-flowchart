# ngx-flowchart

ngx-flowchart is an Angular library for drag & drop modelling of graphs in web
applications. Its main features are:

* Drag & drop editing of nodes, connections and sticky notes
* Customizable look and feel, by supplying [your own node component](#custom-node-components)
* Rectangle selection, and dragging nodes onto the canvas from an external palette
* Automatically adjusts the canvas size to its graph

It is an Angular port of [ngFlowchart](https://github.com/DaHaiz/ngFlowchart),
originally written for AngularJS.

## Table of Contents

* [Installation](#installation)
* [Integration](#integration)
* [API](#api)
  * [The model](#the-model)
  * [fc-canvas inputs](#fc-canvas-inputs)
  * [Callbacks](#callbacks)
  * [Custom node components](#custom-node-components)
  * [Custom note components](#custom-note-components)
  * [Model service](#model-service)
* [License](#license)

## Installation

This library is **not published to npm**. The `ngx-flowchart` name on the npm
registry belongs to an unrelated package, so `npm install ngx-flowchart` will
install different software. Reference a release branch by git ref instead:

```json
{
  "dependencies": {
    "ngx-flowchart": "https://github.com/thingsboard/ngx-flowchart.git#release/4.1.1"
  }
}
```

### Peer dependencies

| Package | Version |
|---|---|
| `@angular/common` | `^20.3.0` |
| `@angular/core` | `^20.3.0` |
| `jquery` | `^3.7.1` |

jQuery must be available **as a global** — the library calls `$()` directly and
never imports it. In an Angular CLI application, add it to the `scripts` array
of your build target in `angular.json`:

```json
{
  "scripts": ["node_modules/jquery/dist/jquery.min.js"]
}
```

## Integration

Import `NgxFlowchartModule` into your module:

```typescript
import { NgxFlowchartModule } from 'ngx-flowchart';

@NgModule({
  imports: [NgxFlowchartModule]
})
export class AppModule { }
```

Use the `fc-canvas` component to display the graph:

```html
<fc-canvas [model]="model" [selectedObjects]="selected" edgeStyle="curved"></fc-canvas>
```

Declare the model and the selection array in your component:

```typescript
import { FcModel } from 'ngx-flowchart';

model: FcModel = {
  nodes: [
    {
      id: '1',
      x: 10,
      y: 10,
      name: 'My first node',
      connectors: [
        { id: '1', type: 'rightConnector' }
      ]
    },
    {
      id: '2',
      x: 200,
      y: 100,
      name: 'My second node',
      connectors: [
        { id: '2', type: 'leftConnector' }
      ]
    }
  ],
  edges: [
    { source: '1', destination: '2', active: false }
  ]
};

selected: any[] = [];
```

Your page should now show a flowchart with two connected nodes.

## API

### The model

```typescript
interface FcModel {
  nodes: FcNode[];
  edges: FcEdge[];
  notes?: FcNote[];
}
```

#### FcNode

```typescript
interface FcNode {
  id: string;
  name: string;
  x: number;              // x-coordinate relative to the canvas
  y: number;              // y-coordinate relative to the canvas
  connectors: FcConnector[];
  readonly?: boolean;     // when true, the node cannot be edited or deleted
  [key: string]: any;     // your own properties are preserved
}
```

#### FcConnector

```typescript
interface FcConnector {
  id: string;
  type: string;           // 'leftConnector' or 'rightConnector'
}
```

#### FcEdge

```typescript
interface FcEdge {
  source?: string;        // FcConnector.id
  destination?: string;   // FcConnector.id
  label?: string;
  active?: boolean;
}
```

#### FcNote

```typescript
interface FcNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  readonly?: boolean;
  [key: string]: any;
}
```

Connector types and CSS class names are available as constants:

```typescript
import { FlowchartConstants } from 'ngx-flowchart';

FlowchartConstants.leftConnectorType;    // 'leftConnector'
FlowchartConstants.rightConnectorType;   // 'rightConnector'
FlowchartConstants.curvedStyle;          // 'curved'
FlowchartConstants.lineStyle;            // 'line'
FlowchartConstants.dragAnimationRepaint; // 'repaint'
FlowchartConstants.dragAnimationShadow;  // 'shadow'
```

### fc-canvas inputs

| Input | Type | Description |
|---|---|---|
| `model` | `FcModel` | The model to render. |
| `selectedObjects` | `any[]` | Selected nodes, edges and notes, as objects from the model. Kept in sync by the canvas. |
| `edgeStyle` | `string` | `'curved'` or `'line'`. |
| `userCallbacks` | `UserCallbacks` | See [Callbacks](#callbacks). |
| `automaticResize` | `boolean` | When `true`, the canvas grows while dragging, allowing "endless" dragging. |
| `dragAnimation` | `string` | `'repaint'` repaints the whole flowchart including edges while dragging; `'shadow'` shows only a shadow at the new position and repaints edges when dragging ends. |
| `nodeWidth` | `number` | Default node width, used to place dropped nodes. |
| `nodeHeight` | `number` | Default node height, used to place dropped nodes. |
| `dropTargetId` | `string` | `id` of the canvas that nodes dragged out of this canvas should be dropped onto. |
| `fitModelSizeByDefault` | `boolean` | Whether the canvas initially resizes to fit the model. Defaults to `true`. |

Output:

| Output | Description |
|---|---|
| `modelChanged` | Emitted whenever the model is modified. |

### Callbacks

Pass an object to `userCallbacks`:

```typescript
import { UserCallbacks } from 'ngx-flowchart';

callbacks: UserCallbacks = {
  isValidEdge: (source, destination) => true,
  createEdge: (event, edge) => of(edge),
  edgeAdded: (edge) => { },
  edgeRemoved: (edge) => { },
  nodeRemoved: (node) => { },
  noteRemoved: (note) => { },
  dropNode: (event, node) => { },
  edgeDoubleClick: (event, edge) => { },
  edgeMouseOver: (event, edge) => { },
  edgeEdit: (event, edge) => { },
  nodeCallbacks: { },
  noteCallbacks: { }
};
```

| Callback | Description |
|---|---|
| `isValidEdge(source, destination)` | Called when the user tries to connect two connectors. Return `true` if the edge is valid in your application. |
| `createEdge(event, edge)` | Called before an edge is added. Returns an `Observable<FcEdge>`, so the edge may be modified or the creation rejected asynchronously. |
| `edgeAdded(edge)` | An edge has been added. |
| `edgeRemoved(edge)` | An edge has been removed. |
| `nodeRemoved(node)` | A node has been removed. |
| `noteRemoved(note)` | A note has been removed. |
| `dropNode(event, node)` | A node has been dropped onto the canvas. |
| `edgeDoubleClick(event, edge)` | An edge was double-clicked. |
| `edgeMouseOver(event, edge)` | The mouse hovers an edge. |
| `edgeEdit(event, edge)` | The edit control of an edge was activated. |
| `nodeCallbacks` | `UserNodeCallbacks`, available to node components as `userNodeCallbacks`. |
| `noteCallbacks` | `UserNoteCallbacks`, available to note components as `userNoteCallbacks`. |

`UserNodeCallbacks` accepts `nodeEdit`, `doubleClick`, `mouseDown`, `mouseEnter`
and `mouseLeave`, each called with `(event, node)`. `UserNoteCallbacks` accepts
`noteEdit`, `doubleClick`, `mouseEnter` and `mouseLeave`, each called with
`(event, note)`.

### Custom node components

The look and feel of nodes is changed by supplying your own component. Extend
`FcNodeComponent` and register it through the `FC_NODE_COMPONENT_CONFIG`
injection token.

Your component inherits these inputs from `FcNodeComponent`:

| Member | Description |
|---|---|
| `node` | The node object from the model. |
| `selected` | `true` when this node is selected. |
| `edit` | `true` when the node is in edit mode. |
| `underMouse` | `true` when the mouse hovers this node. |
| `dragging` | `true` while this node is being dragged. |
| `mouseOverConnector` | The `FcConnector` currently hovered, or `null`. |
| `modelservice` | The `FcModelService` of this canvas. |
| `userNodeCallbacks` | The object passed as `userCallbacks.nodeCallbacks`. |
| `callbacks` | Internal callbacks, to be forwarded to `fc-magnet` and `fc-connector`. |
| `nodeRectInfo` | Geometry of this node, to be forwarded to `fc-connector`. |
| `flowchartConstants` | `FlowchartConstants`, for use in the template. |

A minimal node component:

```typescript
import { Component } from '@angular/core';
import { FcNodeComponent } from 'ngx-flowchart';

@Component({
  selector: 'app-my-node',
  templateUrl: './my-node.component.html',
  standalone: false
})
export class MyNodeComponent extends FcNodeComponent {
  constructor() {
    super();
  }
}
```

Its template renders the node and its connectors. Each connector is wrapped in
an `fc-magnet` element containing an `fc-connector` element; both need the
bindings shown below for dragging and edge creation to work:

```html
<div (dblclick)="userNodeCallbacks?.doubleClick?.($event, node)">
  <div class="{{flowchartConstants.nodeOverlayClass}}"></div>

  <div class="innerNode">
    <p>{{ node.name }}</p>

    <div class="{{flowchartConstants.leftConnectorClass}}">
      @for (connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.leftConnectorType); track connector) {
        <div fc-magnet [connector]="connector" [callbacks]="callbacks">
          <div fc-connector
               [connector]="connector"
               [nodeRectInfo]="nodeRectInfo"
               [mouseOverConnector]="mouseOverConnector"
               [callbacks]="callbacks"
               [modelservice]="modelservice"></div>
        </div>
      }
    </div>

    <div class="{{flowchartConstants.rightConnectorClass}}">
      @for (connector of modelservice.nodes.getConnectorsByType(node, flowchartConstants.rightConnectorType); track connector) {
        <div fc-magnet [connector]="connector" [callbacks]="callbacks">
          <div fc-connector
               [connector]="connector"
               [nodeRectInfo]="nodeRectInfo"
               [mouseOverConnector]="mouseOverConnector"
               [callbacks]="callbacks"
               [modelservice]="modelservice"></div>
        </div>
      }
    </div>
  </div>

  @if (modelservice.isEditable() && !node.readonly) {
    <div class="fc-nodeedit" (click)="userNodeCallbacks.nodeEdit($event, node)">&#9998;</div>
    <div class="fc-nodedelete" (click)="modelservice.nodes.delete(node)">&times;</div>
  }
</div>
```

Register the component. Note that this library is NgModule-based, so the
component is declared in a module rather than being standalone:

```typescript
import { FC_NODE_COMPONENT_CONFIG, NgxFlowchartModule } from 'ngx-flowchart';

@NgModule({
  declarations: [MyNodeComponent],
  imports: [NgxFlowchartModule],
  providers: [
    {
      provide: FC_NODE_COMPONENT_CONFIG,
      useValue: {
        nodeComponentType: MyNodeComponent
      }
    }
  ]
})
export class MyModule { }
```

When the token is not provided, `DefaultFcNodeComponent` is used. It is
exported, so it can also serve as a reference implementation.

### Custom note components

Sticky notes work the same way, via `FC_NOTE_COMPONENT_CONFIG`. Extend
`FcNoteComponent`, which provides `note`, `selected`, `edit`, `modelservice`,
`userNoteCallbacks` and `flowchartConstants`:

```typescript
import { Component } from '@angular/core';
import { FcNoteComponent } from 'ngx-flowchart';

@Component({
  selector: 'app-my-note',
  template: `
    <div (dblclick)="userNoteCallbacks?.doubleClick?.($event, note)">
      {{ note.content }}
    </div>
  `,
  standalone: false
})
export class MyNoteComponent extends FcNoteComponent { }
```

```typescript
import { FC_NOTE_COMPONENT_CONFIG } from 'ngx-flowchart';

providers: [
  {
    provide: FC_NOTE_COMPONENT_CONFIG,
    useValue: {
      noteComponentType: MyNoteComponent
    }
  }
]
```

The fallback is `DefaultFcNoteComponent`.

### Model service

`FcModelService` is created by the canvas and exposes the operations it performs
on the model. Reach it from a template reference on the canvas, or from the
`modelservice` input inside a node or note component:

```html
<fc-canvas #canvas [model]="model" [selectedObjects]="selected"></fc-canvas>
<button (click)="canvas.modelService.deselectAll()">Deselect all</button>
```

It groups operations by type — `nodes`, `edges` and `notes` — for example
`modelservice.nodes.delete(node)`, `modelservice.nodes.getConnectorsByType(node, type)`,
`modelservice.edges.getSelectedEdges()` and `modelservice.notes.getSelectedNotes()`,
alongside canvas-wide methods such as `isEditable()`, `selectAll()`,
`deselectAll()` and `deleteSelected()`.

## License

Copyright 2016 ThingsBoard, Inc.

ngx-flowchart is licensed under the Apache License, Version 2.0. See
[LICENSE](LICENSE) for the full license text.

This library is an Angular port of [ngFlowchart](https://github.com/DaHaiz/ngFlowchart),
an AngularJS flowchart component developed by ONE LOGIC and licensed under the MIT
License (Copyright (c) 2015 ONE LOGIC). The original work has been modified and
extended. See [NOTICE](NOTICE) for the full attribution, and
[licenses/LICENSE-ngFlowchart](licenses/LICENSE-ngFlowchart) for the complete text of
the MIT License.
