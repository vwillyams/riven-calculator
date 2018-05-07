import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class RivenStatisticsService {

  calcProbability(positives, negatives, numPositives: number, numNegatives: number): number {
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
}
