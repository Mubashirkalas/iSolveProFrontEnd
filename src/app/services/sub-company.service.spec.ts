import { TestBed } from '@angular/core/testing';

import { SubCompanyService } from './sub-company.service';

describe('SubCompanyService', () => {
  let service: SubCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
