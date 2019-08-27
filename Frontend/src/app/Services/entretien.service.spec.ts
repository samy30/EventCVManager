import { TestBed } from '@angular/core/testing';

import { EntretienService } from './entretien.service';

describe('EntretienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntretienService = TestBed.get(EntretienService);
    expect(service).toBeTruthy();
  });
});
