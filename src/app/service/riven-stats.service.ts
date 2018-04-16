import { Injectable } from '@angular/core';
import {RivenStats} from '../const/riven-stat.values';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {RivenStat} from '../model/riven-stat.model';

@Injectable()
export class RivenStatsService {

  constructor() { }

  getRivenStats(): Observable<RivenStat[]> {
    return of(RivenStats);
  }
}
