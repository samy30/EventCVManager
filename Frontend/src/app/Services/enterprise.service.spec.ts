import { TestBed } from '@angular/core/testing';

import { EnterpriseService } from './enterprise.service';

describe('EnterpriseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterpriseService = TestBed.get(EnterpriseService);
    expect(service).toBeTruthy();
  });
});
