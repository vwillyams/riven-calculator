import {Injectable} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {StatDesirability} from '../const/stat-desirability';

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
      minus: existingPositives.filter(stat => stat.posDesirability === StatDesirability.minus)
    };

    const positiveString = `POSITIVES: ${JSON.stringify(positives)}`;
    const debugResult = [positiveString];

    if (negativeAllowed) {
      const existingNegatives = this.negativeStats.filter(stat =>
        (!stat.restrict || stat.restrict === weaponType) && !stat.negativeBlocked);

      const negatives = {
        plus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plus),
        plusPlus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.plusPlus),
        minus: existingNegatives.filter(stat => stat.negDesirability === StatDesirability.minus)
      };

      const negativeString = `NEGATIVES: ${JSON.stringify(negatives)}`;
      debugResult.push(negativeString);
    }

    return of(debugResult);
  }
}
