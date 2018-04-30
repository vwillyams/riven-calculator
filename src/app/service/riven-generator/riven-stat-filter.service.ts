import {Injectable} from '@angular/core';
import {StatDesirability} from '../../const/stat-desirability';
import {RivenStat} from '../../model/riven-stat.model';

function validPositive(stat: RivenStat, weaponType: string): boolean {
  return (!stat.restrict || stat.restrict === weaponType);
}

function validNegative(stat: RivenStat, weaponType: string): boolean {
  return validPositive(stat, weaponType) && !stat.negativeBlocked;
}

@Injectable()
export class RivenStatFilterService {

  filter(rivenStats: RivenStat[], weaponType: string, negativeAllowed: boolean) {
    const existingPositives = rivenStats.filter(stat => validPositive(stat, weaponType));

    const positives = {
      plus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.plus),
      plusPlus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.plusPlus),
      minus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.minus),
      existing: existingPositives
    };

    let negatives;
    if (negativeAllowed) {
      const existingNegatives = rivenStats.filter(stat => validNegative(stat, weaponType));

      negatives = {
        plus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plus),
        plusPlus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plusPlus),
        minus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.minus),
        existing: existingNegatives
      };
    }
    return {positives, negatives};
  }

}
