import { TestBed } from '@angular/core/testing';

import { AgreementDetailsService } from './agreement-details.service';

describe('AgreementDetailsService', () => {
  let service: AgreementDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgreementDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
