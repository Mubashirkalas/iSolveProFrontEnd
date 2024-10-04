import { TestBed } from '@angular/core/testing';

import { ProjectmaterialService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
