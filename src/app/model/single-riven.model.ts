import {RivenStat} from './riven-stat.model';

export class SingleRiven {
  attempts?: number;
  negative?: RivenStat;
  positives?: RivenStat[];
  error?: string;
  debug?: string;
}
