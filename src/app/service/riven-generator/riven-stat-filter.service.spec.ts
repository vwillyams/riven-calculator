import { TestBed, inject } from '@angular/core/testing';

import { RivenStatFilterService } from './riven-stat-filter.service';

describe('RivenStatFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RivenStatFilterService]
    });
  });

  it('should be created', inject([RivenStatFilterService], (service: RivenStatFilterService) => {
    expect(service).toBeTruthy();
  }));
});
