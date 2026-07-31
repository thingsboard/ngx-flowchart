///
/// Copyright 2016 ThingsBoard, Inc.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     https://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
import { AfterViewInit, Component, HostBinding, HostListener, ViewChild } from '@angular/core';
import { FcModel, FcNode, FcNote, FlowchartConstants, NgxFlowchartComponent, UserCallbacks } from 'ngx-flowchart-dev';
import { of } from 'rxjs';
import { DELETE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements AfterViewInit {

  @HostBinding('attr.tabindex') tabindex = '0';

  flowchartConstants = FlowchartConstants;

  nodeTypesFlowchartselected = [];
  nodeTypesModel: FcModel = {
    nodes: [],
    edges: []
  };

  flowchartselected = [];
  model: FcModel = {
    nodes: [],
    edges: [],
    notes: []
  };
  nextNodeID = 10;
  nextConnectorID = 20;
  nextNoteID = 1;

  callbacks: UserCallbacks = {
    edgeDoubleClick: (_event, _edge) => {
      console.log('Edge double clicked.');
    },
    edgeEdit: (_event, edge) => {
      const label = prompt('Enter a link label:', edge.label);
      if (label) {
        edge.label = label;
      }
    },
    edgeMouseOver: _event => {
      console.log('mouserover');
    },
    isValidEdge: (source, destination) =>
      source.type === FlowchartConstants.rightConnectorType && destination.type === FlowchartConstants.leftConnectorType
    ,
    createEdge: (_event, edge) => {
      if (!edge.label) {
        edge.label = prompt('Enter a link label:', 'New label');
      }
      return of(edge);
    },
    dropNode: (_event, node) => {
      const name = prompt('Enter a node name:', node.name);
      if (name) {
        node.name = name;
        node.id = (this.nextNodeID++) + '';
        node.connectors = [
          {
            id: (this.nextConnectorID++) + '',
            type: FlowchartConstants.leftConnectorType
          },
          {
            id: (this.nextConnectorID++) + '',
            type: FlowchartConstants.rightConnectorType
          }
        ];
        this.model.nodes.push(node);
      }
    },
    edgeAdded: edge => {
      console.log('edge added');
      console.log(edge);
    },
    nodeRemoved: node => {
      console.log('node removed');
      console.log(node);
    },
    edgeRemoved: edge => {
      console.log('edge removed');
      console.log(edge);
    },
    noteRemoved: note => {
      console.log('note removed', note);
    },
    nodeCallbacks: {
      doubleClick: _event => {
        console.log('Node was doubleclicked.');
      },
      nodeEdit: (_event, node) => {
        const name = prompt('Enter a node name:', node.name);
        if (name) {
          node.name = name;
        }
      }
    },
    noteCallbacks: {
      doubleClick: (_event, note) => {
        const content = prompt('Edit note:', note['content'] || '');
        if (content !== null) {
          note['content'] = content;
        }
      },
      noteEdit: (_event, note) => {
        const content = prompt('Edit note:', note['content'] || '');
        if (content !== null) {
          note['content'] = content;
        }
      }
    }
  };

  @ViewChild('fcCanvas', {static: true}) fcCanvas: NgxFlowchartComponent;

  constructor() {
    this.initData();
  }

  ngAfterViewInit(): void {
    console.log(this.fcCanvas.modelService);
  }

  private initData() {
    for (let i = 0; i < 10; i++) {
      const node: FcNode = {
        name: 'type' + i,
        id: (i + 1) + '',
        x: 50,
        y: 100 * (i + 1),
        connectors: [
          {
            type: FlowchartConstants.leftConnectorType,
            id: (i * 2 + 1) + ''
          },
          {
            type: FlowchartConstants.rightConnectorType,
            id: (i * 2 + 2) + ''
          }
        ]
      };
      this.nodeTypesModel.nodes.push(node);
    }
    this.model.nodes.push(...
      [
        {
          name: 'ngxFlowchart',
          readonly: true,
          id: '2',
          x: 300,
          y: 100,
          color: '#000',
          borderColor: '#000',
          connectors: [
            {
              type: FlowchartConstants.leftConnectorType,
              id: '1'
            },
            {
              type: FlowchartConstants.rightConnectorType,
              id: '2'
            }
          ]
        },
        {
          name: 'Implemented with Angular',
          id: '3',
          x: 600,
          y: 100,
          color: '#F15B26',
          connectors: [
            {
              type: FlowchartConstants.leftConnectorType,
              id: '3'
            },
            {
              type: FlowchartConstants.rightConnectorType,
              id: '4'
            }
          ]
        },
        {
          name: 'Easy Integration',
          id: '4',
          x: 1000,
          y: 100,
          color: '#000',
          borderColor: '#000',
          connectors: [
            {
              type: FlowchartConstants.leftConnectorType,
              id: '5'
            },
            {
              type: FlowchartConstants.rightConnectorType,
              id: '6'
            }
          ]
        },
        {
          name: 'Customizable templates',
          id: '5',
          x: 1300,
          y: 100,
          color: '#000',
          borderColor: '#000',
          connectors: [
            {
              type: FlowchartConstants.leftConnectorType,
              id: '7'
            },
            {
              type: FlowchartConstants.rightConnectorType,
              id: '8'
            }
          ]
        }
      ]
    );
    this.model.edges.push(...
      [
        {
          source: '2',
          destination: '3',
          label: 'label1'
        },
        {
          source: '4',
          destination: '5',
          label: 'label2'
        },
        {
          source: '6',
          destination: '7',
          label: 'label3'
        }
      ]
    );
    this.model.notes.push(...
      [
        {
          id: 'note-1',
          x: 250,
          y: 50,
          width: 200,
          height: 125,
          content: 'Sticky note behind nodes.\nDrag me, resize me!'
        },
        {
          id: 'note-2',
          x: 950,
          y: 50,
          width: 600,
          height: 150,
          content: 'Double-click to edit.\nDelete key removes selected.'
        }
      ]
    );
    this.nextNoteID = 3;
  }

  @HostListener('keydown.control.a', ['$event'])
  public onCtrlA(_event: KeyboardEvent) {
    this.fcCanvas.modelService.selectAll();
  }

  @HostListener('keydown.esc', ['$event'])
  public onEsc(_event: KeyboardEvent) {
    this.fcCanvas.modelService.deselectAll();
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    if (event.keyCode === DELETE) {
      this.fcCanvas.modelService.deleteSelected();
    }
  }

  public addNote() {
    const content = prompt('Enter a note:', 'New note');
    if (!content) {
      return;
    }
    const note: FcNote = {
      id: 'note-' + (this.nextNoteID++),
      x: 200,
      y: 300,
      width: 200,
      height: 120,
      content
    };
    this.model.notes.push(note);
  }

  public addNewNode() {
    const nodeName = prompt('Enter a node name:', 'New node');
    if (!nodeName) {
      return;
    }

    const newNode: FcNode = {
      name: nodeName,
      id: (this.nextNodeID++) + '',
      x: 200,
      y: 100,
      color: '#F15B26',
      connectors: [
        {
          id: (this.nextConnectorID++) + '',
          type: FlowchartConstants.leftConnectorType
        },
        {
          id: (this.nextConnectorID++) + '',
          type: FlowchartConstants.rightConnectorType
        }
      ]
    };
    this.model.nodes.push(newNode);
  }

  public activateWorkflow() {
    this.model.edges.forEach((edge) => {
      edge.active = !edge.active;
    });
    this.fcCanvas.modelService.detectChanges();
  }

  public deleteSelected() {
    this.fcCanvas.modelService.deleteSelected();
  }
}
