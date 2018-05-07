import {TestBed, inject} from '@angular/core/testing';

import {RivenGeneratorService} from './riven-generator.service';
import {RivenStats} from '../../const/riven-stat.values';
import {RivenStatFilterService} from './riven-stat-filter.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {RivenStatisticsService} from './internals/riven-statistics.service';
import {SingleRivenGeneratorService} from './internals/single-riven-generator.service';

describe('RivenGeneratorService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RivenGeneratorService, RivenStatFilterService, SingleRivenGeneratorService, RivenStatisticsService]
    });
    service = new RivenGeneratorService(new RivenStatFilterService(), new SingleRivenGeneratorService(), new RivenStatisticsService());
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
    calculated.subscribe(value => {
      calculatedResult = value.getRolls();
    });

    forkJoin(observables).subscribe(() => {
      const monteCarloResult = generatedResult / NUM_ATTEMPTS;
      expect(monteCarloResult).toEqual(jasmine.any(Number));
      expect(calculatedResult).toEqual(jasmine.any(Number));
      console.log(monteCarloResult);
      console.log(calculatedResult);
      // We round the monteCarloResult because otherwise it has too much noise at small values
      const difference = Math.abs(Math.round(monteCarloResult) - calculatedResult);
      expect(difference).toEqual(0);
      done();
    });
  });

  it('should generate similar results from calculate and monte carlo when running complex simulations', (done: DoneFn) => {
    service.updateRivens(RivenStats);
    const weaponType = 'Melee';
    const negativeAllowed = false;
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
    calculated.subscribe(value => {
      calculatedResult = value.getRolls();
    });

    forkJoin(observables).subscribe(() => {
      const monteCarloResult = generatedResult / NUM_ATTEMPTS;
      expect(monteCarloResult).toEqual(jasmine.any(Number));
      expect(calculatedResult).toEqual(jasmine.any(Number));
      console.log(monteCarloResult);
      console.log(calculatedResult);
      // We round the monteCarloResult because otherwise it has too much noise at small values
      const difference = Math.abs(Math.round(monteCarloResult) - calculatedResult);
      expect(difference).toEqual(0);
      done();
    });
  });

});
