import { TestBed } from '@angular/core/testing';

import { NgxFlowchartService } from './ngx-flowchart.service';

describe('NgxFlowchartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFlowchartService = TestBed.get(NgxFlowchartService);
    expect(service).toBeTruthy();
  });
});
