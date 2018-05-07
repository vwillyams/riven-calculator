import {Injectable} from '@angular/core';
import {RivenStat} from '../../model/riven-stat.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {SingleRiven} from './dto/single-riven.model';
import {RivenStatFilterService} from './riven-stat-filter.service';
import {ProbabilityResult} from './dto/probability-result.model';
import {SingleRivenGeneratorService} from './internals/single-riven-generator.service';
import {RivenStatisticsService} from './internals/riven-statistics.service';
import * as _ from 'lodash';

@Injectable()
export class RivenGeneratorService {

  rivenStats: RivenStat[];

  constructor(private rivenFilter: RivenStatFilterService, private singleRivenGenerator: SingleRivenGeneratorService, private statisticsService: RivenStatisticsService) {

  }

  updateRivens(stats: RivenStat[]) {
    this.rivenStats = stats;
  }


  calculate(weaponType: string, negativeAllowed: boolean): Observable<ProbabilityResult> {
    const filtered = this.rivenFilter.filter(this.rivenStats, weaponType, negativeAllowed);
    const result = new ProbabilityResult();
    result.rolls = [
      this.statisticsService.calcProbability(filtered.positives, filtered.negatives, 2, 0),
      this.statisticsService.calcProbability(filtered.positives, filtered.negatives, 3, 0),
      negativeAllowed ? this.statisticsService.calcProbability(filtered.positives, filtered.negatives, 2, 1) : 0,
      negativeAllowed ? this.statisticsService.calcProbability(filtered.positives, filtered.negatives, 3, 1) : 0
    ];
    result.mean = _.mean(result.rolls);
    console.log(result.rolls);
    console.log(result.mean);
    return of(result);
  }

  generate(weaponType: string, negativeAllowed: boolean): Observable<SingleRiven> {
    const filtered = this.rivenFilter.filter(this.rivenStats, weaponType, negativeAllowed);
    return of(this.singleRivenGenerator.generateOne(filtered.positives, filtered.negatives));
  }
}
