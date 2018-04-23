import {Injectable} from '@angular/core';
import {StatDesirability} from '../../const/stat-desirability';
import {RivenStat} from '../../model/riven-stat.model';

@Injectable()
export class RivenStatFilterService {

  filter(positiveStats: RivenStat[], negativeStats: RivenStat[], weaponType: string, negativeAllowed: boolean) {
    const existingPositives = positiveStats.filter(stat => (!stat.restrict || stat.restrict === weaponType));

    const positives = {
      plus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.plus),
      plusPlus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.plusPlus),
      minus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.minus),
      existing: existingPositives
    };

    const positiveString = `POSITIVES: ${JSON.stringify(positives)}`;

    let negatives;
    if (negativeAllowed) {
      const existingNegatives = negativeStats.filter(stat =>
        (!stat.restrict || stat.restrict === weaponType) && !stat.negativeBlocked);

      negatives = {
        plus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plus),
        plusPlus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plusPlus),
        minus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.minus),
        existing: existingNegatives
      };

      const negativeString = `NEGATIVES: ${JSON.stringify(negatives)}`;
    }
    return {positives, negatives};
  }

}
