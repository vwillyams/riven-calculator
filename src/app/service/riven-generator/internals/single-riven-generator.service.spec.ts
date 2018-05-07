import {TestBed, inject} from '@angular/core/testing';

import {SingleRivenGeneratorService} from './single-riven-generator.service';
import {RivenStat} from '../../../model/riven-stat.model';

describe('SingleRivenGeneratorService', () => {
  let service;
  let stat1;
  let stat2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
    service = new SingleRivenGeneratorService();
    stat1 = new RivenStat({name: '0'});
    stat2 = new RivenStat({name: '1'});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateNegativeStats', () => {

    it('should return empty array if no negatives supplied or requested', () => {
      expect(service.generateNegativeStats(null, false)).toEqual({stats: []});
    });

    it('should reject if no negatives supplied and they are requested', () => {
      expect(service.generateNegativeStats(null, true)).toEqual({reject: true});
    });

    it('should return empty array if negatives supplied and not requested', () => {
      const oneStatNoSelections = {existing: [stat1], plusPlus: [], minus: []};
      expect(service.generateNegativeStats(oneStatNoSelections, false)).toEqual({stats: []});
    });

    it('should return the only option if only one option is supplied', () => {
      const oneStatNoSelections = {existing: [stat1], plusPlus: [], minus: []};
      expect(service.generateNegativeStats(oneStatNoSelections, true)).toEqual({stats: [stat1]});
    });

    it('should have a 50% chance of returning each option out of two', () => {
      const twoStatNoSelections = {existing: [stat1, stat2], plusPlus: [], minus: []};
      const ATTEMPTS = 10000;
      const results = [0, 0];
      for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
        const result = service.generateNegativeStats(twoStatNoSelections, true);
        expect(result.stats.length).toEqual(1);
        results[result.stats[0].name]++;
      }
      expect(results[0] / ATTEMPTS).toBeGreaterThan(0.49);
      expect(results[0] / ATTEMPTS).toBeLessThan(0.51);
      expect(results[1] / ATTEMPTS).toBeGreaterThan(0.49);
      expect(results[1] / ATTEMPTS).toBeLessThan(0.51);
    });

  });

});
