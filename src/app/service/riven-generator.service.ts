import {Injectable} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {StatDesirability} from '../const/stat-desirability';
import {StatResult} from '../model/stat-result.model';
import * as _ from 'lodash';

@Injectable()
export class RivenGeneratorService {

  positiveStats: RivenStat[];
  negativeStats: RivenStat[];

  updatePositives(stats: RivenStat[]) {
    this.positiveStats = stats;
  }

  updateNegatives(stats: RivenStat[]) {
    this.negativeStats = stats;
  }

  generate(weaponType: string, negativeAllowed: boolean): Observable<string[]> {
    console.log(weaponType);

    const existingPositives = this.positiveStats.filter(stat => (!stat.restrict || stat.restrict === weaponType));

    const positives = {
      plus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.plus),
      plusPlus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.plusPlus),
      minus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.minus),
      existing: existingPositives
    };

    const positiveString = `POSITIVES: ${JSON.stringify(positives)}`;
    const debugResult = [positiveString];

    let negatives;
    if (negativeAllowed) {
      const existingNegatives = this.negativeStats.filter(stat =>
        (!stat.restrict || stat.restrict === weaponType) && !stat.negativeBlocked);

      negatives = {
        plus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plus),
        plusPlus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plusPlus),
        minus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.minus),
        existing: existingNegatives
      };

      const negativeString = `NEGATIVES: ${JSON.stringify(negatives)}`;
      debugResult.push(negativeString);
    }

    // return of(debugResult);
    return of(this.generateOne(positives, negatives));
  }

  generateOne(positives, negatives): string[] {
    const MAX_ATTEMPTS = 10000;
    const result = [];

    if (_.get(negatives, 'plusPlus.length') > 1) {
      return ['CANNOT GENERATE A RIVEN WITH MORE THAN ONE NEGATIVE PROPERTY'];
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

      result.push(`ATTEMPTS: ${attempts}`);
      result.push(`NEGATIVES: ${JSON.stringify(negativeResult.stats)}`);
      result.push(`POSITIVES: ${JSON.stringify(positiveResult.stats)}`);
      result.push(`DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`);
      return result;
    }
    return [
      `NOTHING WAS GENERATED AFTER ${MAX_ATTEMPTS} ATTEMPTS, THERE IS PROBABLY AN ERROR IN YOUR SELECTIONS`,
      `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`
    ];
  }

  private generateNegativeStats(negatives): StatResult {
    const hasNegatives = this.randInt(1);
    if (!negatives && hasNegatives) {
      return {hasError: true};
    }

    const stat = negatives.existing[this.randInt(negatives.existing.length)];
    if (negatives.plusPlus.length && negatives.plusPlus.indexOf(stat) === -1) {
      return {hasError: true};
    }
    if (negatives.minus.length && negatives.minus.indexOf(stat) !== -1) {
      return {hasError: true};
    }
    return {stats: [stat]};
  }

  private generatePositiveStats(positives): StatResult {
    const numPositives = this.randInt(1) + 2;
    const result = {stats: []};
    const validPositives = _.clone(positives.existing);
    const requiredPositives = _.clone(positives.plusPlus);

    for (let i = 0; i < numPositives; i++) {
      const stat = validPositives[this.randInt(validPositives.length)];

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

  private randInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
