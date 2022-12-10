import { TestBed } from '@angular/core/testing';

import { SpecialistsService } from './specialists.service';

describe('SpecialistsService', () => {
  let service: SpecialistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
