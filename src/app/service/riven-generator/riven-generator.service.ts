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

  rivenStats: RivenStat[];

  constructor(private rivenFilter: RivenStatFilterService) {

  }

  updateRivens(stats: RivenStat[]) {
    this.rivenStats = stats;
  }


  calculate(weaponType: string, negativeAllowed: boolean): Observable<ProbabilityResult> {
    const filtered = this.rivenFilter.filter(this.rivenStats, weaponType, negativeAllowed);
    const result = new ProbabilityResult();
    result.rolls = [
      this.calcProbability(filtered.positives, filtered.negatives, 2, 0),
      this.calcProbability(filtered.positives, filtered.negatives, 3, 0),
      negativeAllowed ? this.calcProbability(filtered.positives, filtered.negatives, 2, 1) : 0,
      negativeAllowed ? this.calcProbability(filtered.positives, filtered.negatives, 3, 1) : 0
    ];
    result.mean = _.mean(result.rolls);
    console.log(result.rolls);
    console.log(result.mean);
    return of(result);
  }

  generate(weaponType: string, negativeAllowed: boolean): Observable<SingleRiven> {
    const filtered = this.rivenFilter.filter(this.rivenStats, weaponType, negativeAllowed);
    return of(this.generateOne(filtered.positives, filtered.negatives));
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
      numAllowed--;
      numExisting--;
    }

    let numAllowedNegatives = allowedNegatives.length;
    let numExistingNegatives = _.get(negatives, 'existing.length', 0);

    allowedOverlap = _.intersectionBy(requiredPositives, allowedNegatives, item => item['name']);
    if (allowedOverlap.length) {
      numAllowedNegatives--;
      numExistingNegatives--;
    }

    if (numNegatives) {
      if (requiredNegatives.length) {
        negativeChance = 1 / numExistingNegatives;
      } else if (allowedNegatives.length) {
        negativeChance = numAllowedNegatives / numExistingNegatives;
        allowedOverlap = _.intersectionBy(requiredNegatives, allowedPositives, item => item['name']);
        if (allowedOverlap.length) {
          const overlapProbability = (allowedOverlap.length / allowedNegatives.length);
          numAllowed -= overlapProbability;
          numExisting -= overlapProbability;
        }
      }
    }

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
        return 0;
      }
    }
    return positiveChance * negativeChance;
  }

  private generateOne(positives, negatives): SingleRiven {
    const MAX_ATTEMPTS = 10000;
    const result = new SingleRiven();
    result.debug = `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`;

    if (_.get(negatives, 'plusPlus.length') > 1) {
      result.error = 'CANNOT GENERATE A RIVEN WITH MORE THAN ONE NEGATIVE PROPERTY';
      return result;
    }

    for (let attempts = 1; attempts < MAX_ATTEMPTS; attempts++) {

      const negativeResult = this.generateNegativeStats(negatives);
      if (negativeResult.reject) {
        continue;
      }

      const positiveInstance = _.cloneDeep(positives);
      if (negativeResult.stats.length && !_.isUndefined(negativeResult.stats[0])) {
        _.remove(positiveInstance.existing, {name: negativeResult.stats[0].name});
      }

      const positiveResult = this.generatePositiveStats(positiveInstance);
      if (positiveResult.reject) {
        continue;
      }

      result.attempts = attempts;
      result.negative = negativeResult.stats[0];
      result.positives = positiveResult.stats;
      result.debug = `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`;
      return result;
    }

    result.debug = `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`;
    return result;
  }

  private generateNegativeStats(negatives): StatResult {
    const hasNegatives = _.random(1);
    if (!negatives) {
      if (hasNegatives) {
        return {reject: true};
      }
      return {stats: []};
    }

    const stat = negatives.existing[_.random(negatives.existing.length - 1)];
    if (negatives.plusPlus.length && negatives.plusPlus.indexOf(stat) === -1) {
      return {reject: true};
    }
    if (negatives.minus.length && negatives.minus.indexOf(stat) !== -1) {
      return {reject: true};
    }
    return {stats: [stat]};
  }

  private generatePositiveStats(positives): StatResult {
    const numPositives = _.random(1) + 2;
    const result = {stats: []};
    const validPositives = _.clone(positives.existing);
    const requiredPositives = _.clone(positives.plusPlus);

    for (let i = 0; i < numPositives; i++) {
      const stat = validPositives[_.random(validPositives.length - 1)];

      if (requiredPositives && requiredPositives.length) {
        if (requiredPositives.indexOf(stat) === -1) {
          return {reject: true};
        } else {
          _.remove(requiredPositives, {name: stat.name});
        }
      }

      if (positives.minus.length && positives.minus.indexOf(stat) !== -1) {
        return {reject: true};
      }

      validPositives.splice(validPositives.indexOf(stat), 1);

      result.stats.push(stat);
    }
    return result;
  }
}
