import {Injectable} from '@angular/core';
import {StatResult} from '../dto/stat-result.model';
import {SingleRiven} from '../dto/single-riven.model';
import * as _ from 'lodash';

@Injectable()
export class SingleRivenGeneratorService {

  generateOne(positives, negatives): SingleRiven {
    const MAX_ATTEMPTS = 10000;
    const result = new SingleRiven();
    result.debug = `DEBUG INFO: POSITIVES: ${JSON.stringify(positives)}, NEGATIVES: ${JSON.stringify(negatives)}`;

    if (_.get(negatives, 'plusPlus.length') > 1) {
      result.error = 'CANNOT GENERATE A RIVEN WITH MORE THAN ONE NEGATIVE PROPERTY';
      return result;
    }

    for (let attempts = 1; attempts < MAX_ATTEMPTS; attempts++) {

      const hasNegatives = _.random(1) === 1; // Fuck typescript
      const negativeResult = this.generateNegativeStats(negatives, hasNegatives);
      if (negativeResult.reject) {
        continue;
      }

      const positiveInstance = _.cloneDeep(positives);
      if (negativeResult.stats.length && !_.isUndefined(negativeResult.stats[0])) {
        _.remove(positiveInstance.existing, {name: negativeResult.stats[0].name});
      }

      const numPositives = _.random(1) + 2;
      const positiveResult = this.generatePositiveStats(positiveInstance, numPositives);
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

  generateNegativeStats(negatives, hasNegatives: boolean): StatResult {
    if (!negatives) {
      if (hasNegatives) {
        return {reject: true};
      }
      return {stats: []};
    } else if (!hasNegatives) {
      return {stats: []};
    }

    const stat = negatives.existing[_.random(negatives.existing.length - 1)];
    if (negatives.plusPlus.length && negatives.plusPlus.indexOf(stat) === -1) {
      return {reject: true};
    }
    if (negatives.minus.indexOf(stat) !== -1) {
      return {reject: true};
    }
    return {stats: [stat]};
  }

  generatePositiveStats(positives, numPositives: number): StatResult {
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
