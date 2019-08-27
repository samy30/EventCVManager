import { TestBed } from '@angular/core/testing';

import { JobDemandeService } from './job-demande.service';

describe('JobDemandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobDemandeService = TestBed.get(JobDemandeService);
    expect(service).toBeTruthy();
  });
});
