import { TestBed, inject } from '@angular/core/testing';

import { RivenGeneratorService } from './riven-generator.service';

describe('RivenGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RivenGeneratorService]
    });
  });

  it('should be created', inject([RivenGeneratorService], (service: RivenGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
