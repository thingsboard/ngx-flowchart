import { AfterViewInit, Component, HostBinding, HostListener, ViewChild } from '@angular/core';
import { FcModel, FcNode, FlowchartConstants, NgxFlowchartComponent, UserCallbacks } from 'ngx-flowchart-dev';
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
    edges: []
  };
  nextNodeID = 10;
  nextConnectorID = 20;

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
