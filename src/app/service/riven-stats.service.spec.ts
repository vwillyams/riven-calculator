import { TestBed, inject } from '@angular/core/testing';

import { RivenStatsService } from './riven-stats.service';

describe('RivenStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RivenStatsService]
    });
  });

  it('should be created', inject([RivenStatsService], (service: RivenStatsService) => {
    expect(service).toBeTruthy();
  }));
});
