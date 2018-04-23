import {Injectable} from '@angular/core';
import {RivenStat} from './model/riven-stat.model';

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

  generate() {
    console.log(`POSITIVES: ${JSON.stringify(this.positiveStats)}`);
    console.log(`NEGATIVES: ${JSON.stringify(this.negativeStats)}`);
  }
}
