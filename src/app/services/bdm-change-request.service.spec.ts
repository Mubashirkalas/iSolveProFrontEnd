import { TestBed } from '@angular/core/testing';

import { BdmChangeRequestService } from './bdm-change-request.service';

describe('BdmChangeRequestService', () => {
  let service: BdmChangeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdmChangeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
