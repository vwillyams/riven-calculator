import {TestBed, inject} from '@angular/core/testing';

import {RivenGeneratorService} from './riven-generator.service';
import {RivenStats} from '../../const/riven-stat.values';
import {RivenStatFilterService} from './riven-stat-filter.service';
import {forkJoin} from 'rxjs/observable/forkJoin';

describe('RivenGeneratorService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RivenGeneratorService, RivenStatFilterService]
    });
    service = new RivenGeneratorService(new RivenStatFilterService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate similar results from calculate as it does from a monte carlo of generateOne', (done: DoneFn) => {
    service.updateRivens(RivenStats);
    const weaponType = 'Melee';
    const negativeAllowed = true;
    const observables = [];

    const calculated = service.calculate(weaponType, negativeAllowed);
    observables.push(calculated);

    const NUM_ATTEMPTS = 10000;
    let generatedResult = 0;
    for (let attempt = 0; attempt < NUM_ATTEMPTS; attempt++) {
      const thisAttempt = service.generate(weaponType, negativeAllowed);
      observables.push(thisAttempt);
      thisAttempt.subscribe(value => generatedResult += value.attempts);
    }

    let calculatedResult;
    calculated.subscribe(value => calculatedResult = value.requiredRolls);

    forkJoin(observables).subscribe(() => {
      const monteCarloResult = generatedResult / NUM_ATTEMPTS;
      const difference = Math.abs(monteCarloResult - calculatedResult);
      expect(difference).toBeLessThan(0.2);
      done();
    });
  });

});
