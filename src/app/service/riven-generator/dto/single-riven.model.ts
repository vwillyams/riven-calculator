import {RivenStat} from '../../../model/riven-stat.model';

export class SingleRiven {
  attempts?: number;
  negative?: RivenStat;
  positives?: RivenStat[];
  error?: string;
  debug?: string;

  // TODO super class
  getKuva(): number {
    const KUVA_REQS = [
      900,
      1000,
      1200,
      1400,
      1700,
      2000,
      2350,
      2750,
      3150,
      3500
    ];
    let sum = 0;
    const numRolls = Math.floor(this.attempts);
    let roll;
    for (roll = 0; roll < numRolls; roll++) {
      if (roll < KUVA_REQS.length) {
        sum += KUVA_REQS[roll];
      } else {
        sum += 3500;
      }
    }
    const lastKuva = roll > KUVA_REQS.length ? 3500 : KUVA_REQS[roll];
    sum += lastKuva * (this.attempts - numRolls);
    return sum;
  }
}
