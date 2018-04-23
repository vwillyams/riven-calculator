import {Injectable} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

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

  generate(): Observable<string[]> {
    const positiveString = `POSITIVES: ${JSON.stringify(this.positiveStats)}`;
    const negativeString = `NEGATIVES: ${JSON.stringify(this.negativeStats)}`;
    return of([positiveString, negativeString]);
  }
}
