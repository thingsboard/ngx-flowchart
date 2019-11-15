import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlowchartComponent } from './ngx-flowchart.component';

describe('NgxFlowchartComponent', () => {
  let component: NgxFlowchartComponent;
  let fixture: ComponentFixture<NgxFlowchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFlowchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFlowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
