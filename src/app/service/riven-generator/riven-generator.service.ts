import {Injectable} from '@angular/core';
import {RivenStat} from '../../model/riven-stat.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {StatResult} from './dto/stat-result.model';
import {SingleRiven} from './dto/single-riven.model';
import {RivenStatFilterService} from './riven-stat-filter.service';
import {ProbabilityResult} from './dto/probability-result.model';
import * as _ from 'lodash';

@Injectable()
export class RivenGeneratorService {

  positiveStats: RivenStat[];
  negativeStats: RivenStat[];

  constructor(private rivenFilter: RivenStatFilterService) {

  }

  updatePositives(stats: RivenStat[]) {
    this.positiveStats = stats;
  }

  updateNegatives(stats: RivenStat[]) {
    this.negativeStats = stats;
  }

  calculate(weaponType: string, negativeAllowed: boolean): Observable<ProbabilityResult> {
    const filtered = this.rivenFilter.filter(this.positiveStats, this.negativeStats, weaponType, negativeAllowed);
    const result = new ProbabilityResult();
    result.rolls = [
      this.calcProbability(filtered.positives, filtered.negatives, 2, 0),
      this.calcProbability(filtered.positives, filtered.negatives, 3, 0),
      this.calcProbability(filtered.positives, filtered.negatives, 2, 1),
      this.calcProbability(filtered.positives, filtered.negatives, 3, 1)
    ];
    result.mean = _.mean(result.rolls);
    return of(result);
  }

  private calcProbability(positives, negatives, numPositives: number, numNegatives: number): number {
    const requiredNegatives = _.get(negatives, 'plusPlus', []);
    // Cover all failure cases up front
    if (requiredNegatives.length > numNegatives) {
      return 0;
    }
    if (requiredNegatives.length > 1) {
      console.error('what the fuck happened here? numNegatives greater than 1 are not supported');
      return 0;
    }
    const allowedNegatives = _.get(negatives, 'plus', []);
    if (requiredNegatives.length + allowedNegatives.length < numNegatives) {
      return 0;
    }
    const requiredPositives = _.get(positives, 'plusPlus', []);
    if (requiredPositives.length > numPositives) {
      return 0;
    }
    const allowedPositives = _.get(positives, 'plus', []);
    if (requiredPositives.length + allowedPositives.length < numNegatives) {
      return 0;
    }
    const requiredOverlap = _.intersection(requiredNegatives, requiredPositives);
    if (requiredOverlap.length) {
      console.error('You should not have a stat be required as both a negative and a positive!');
      return 0;
    }

    let positiveChance = 1;
    let negativeChance = 1;
    let numRequired = requiredPositives.length;
    let numExisting = positives.existing.length;
    let numAllowed = allowedPositives.length;

    let allowedOverlap = _.intersectionBy(requiredNegatives, allowedPositives, item => item['name']);
    if (allowedOverlap.length) {
      console.log(`allowedOverlap 1: ${allowedOverlap}`);
      numAllowed--;
      numExisting--;
    }

    let numAllowedNegatives = allowedNegatives.length;
    let numExistingNegatives = negatives.existing.length;

    allowedOverlap = _.intersectionBy(requiredPositives, allowedNegatives, item => item['name']);
    if (allowedOverlap.length) {
      console.log(`allowedOverlap 2: ${allowedOverlap}`);
      numAllowedNegatives--;
      numExistingNegatives--;
    }

    if (numNegatives) {
      if (requiredNegatives.length) {
        console.log(`requiredNegatives: ${requiredNegatives}`);
        negativeChance = 1 / numExistingNegatives;
      } else if (allowedNegatives.length) {
        console.log(`allowedNegatives: ${allowedNegatives}`);
        negativeChance = numAllowedNegatives / numExistingNegatives;
        allowedOverlap = _.intersectionBy(requiredNegatives, allowedPositives, item => item['name']);
        if (allowedOverlap.length) {
          console.log(`allowedOverlap 3: ${allowedOverlap}`);
          const overlapProbability = (allowedOverlap.length / allowedNegatives.length);
          numAllowed -= overlapProbability;
          numExisting -= overlapProbability;
        }
      }
    }

    console.log(`NEGATIVE CHANCE: ${negativeChance}`);

    for (let i = 0; i < numPositives; i++) {
      if (numExisting < 1) {
        // TODO I could probably handle fractional remainders lmao
        console.error(`RAN OUT OF ALLOWED POSITIVES (and I'm too lazy to do fractional remainders), remaining numExisting was ${numExisting}`);
        return numExisting;
      }
      if (numRequired >= 1) {
        positiveChance = positiveChance * (numRequired / numExisting);
        numRequired--;
        numExisting--;
      } else if (numAllowed > 0) {
        positiveChance = positiveChance * (numAllowed / numExisting);
        numAllowed--;
        numExisting--;
      } else {
        console.error('NOT ENOUGH ALLOWED STATISTICS');
        return 0;
      }
    }
    console.log(`POSITIVE CHANCE: ${positiveChance}`);
    return positiveChance * negativeChance;
  }

  generate(weaponType: string, negativeAllowed: boolean): Observable<SingleRiven> {
    const filtered = this.rivenFilter.filter(this.positiveStats, this.negativeStats, weaponType, negativeAllowed);
    return of(this.generateOne(filtered.positives, filtered.negatives));
  }

  private generateOne(positives, negatives): SingleRiven {
    const MAX_ATTEMPTS = 10000;
    const result = new SingleRiven();

    if (_.get(negatives, 'plusPlus.length') > 1) {
      return {error: 'CANNOT GENERATE A RIVEN WITH MORE THAN ONE NEGATIVE PROPERTY'};
    }

    for (let attempts = 1; attempts < MAX_ATTEMPTS; attempts++) {

      const negativeResult = this.generateNegativeStats(negatives);
      if (negativeResult.hasError) {
        continue;
      }

      const positiveInstance = _.cloneDeep(positives);
      if (negativeResult.stats.length) {
        _.remove(positiveInstance.existing, {name: negativeResult.stats[0].name});
      }

      const positiveResult = this.generatePositiveStats(positiveInstance);
      if (positiveResult.hasError) {
        continue;
      }

      result.attempts = attempts;
      result.negative = negativeResult.stats[0];
      result.positives = positiveResult.stats;
      result.debug = `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`;
      return result;
    }
    return {
      error: `NOTHING WAS GENERATED AFTER ${MAX_ATTEMPTS} ATTEMPTS, THERE IS PROBABLY AN ERROR IN YOUR SELECTIONS`,
      debug: `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`
    };
  }

  private generateNegativeStats(negatives): StatResult {
    const hasNegatives = _.random(1);
    if (!negatives && hasNegatives) {
      return {hasError: true};
    }

    const stat = negatives.existing[_.random(negatives.existing.length)];
    if (negatives.plusPlus.length && negatives.plusPlus.indexOf(stat) === -1) {
      return {hasError: true};
    }
    if (negatives.minus.length && negatives.minus.indexOf(stat) !== -1) {
      return {hasError: true};
    }
    return {stats: [stat]};
  }

  private generatePositiveStats(positives): StatResult {
    const numPositives = _.random(1) + 2;
    const result = {stats: []};
    const validPositives = _.clone(positives.existing);
    const requiredPositives = _.clone(positives.plusPlus);

    for (let i = 0; i < numPositives; i++) {
      const stat = validPositives[_.random(validPositives.length)];

      if (requiredPositives && requiredPositives.length) {
        if (requiredPositives.indexOf(stat) === -1) {
          return {hasError: true};
        } else {
          _.remove(requiredPositives, {name: stat.name});
        }
      }

      if (positives.minus.length && positives.minus.indexOf(stat) !== -1) {
        return {hasError: true};
      }

      validPositives.splice(validPositives.indexOf(stat), 1);

      result.stats.push(stat);
    }
    return result;
  }
}