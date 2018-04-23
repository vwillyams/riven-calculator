import {RivenStat} from '../../../model/riven-stat.model';

export class SingleRiven {
  attempts?: number;
  negative?: RivenStat;
  positives?: RivenStat[];
  error?: string;
  debug?: string;
}
