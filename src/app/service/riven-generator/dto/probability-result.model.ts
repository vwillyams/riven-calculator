export class ProbabilityResult {
  errors?: string;
  mean?: number;
  rolls: number[] = [];

  getRolls(target = 0.5): number {
    const MAX_ATTEMPTS = 10000;
    let chance = 1;
    let attempts;
    for (attempts = 1; attempts < MAX_ATTEMPTS; attempts++) {
      chance *= (1 - this.mean);
      if (chance <= target) {
        break;
      }
    }
    return attempts;
  }

  getKuva(rolls: number): number {
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
    const numRolls = Math.floor(rolls);
    let roll;
    for (roll = 0; roll < numRolls; roll++) {
      if (roll < KUVA_REQS.length) {
        sum += KUVA_REQS[roll];
      } else {
        sum += 3500;
      }
    }
    const lastKuva = roll > KUVA_REQS.length ? 3500 : KUVA_REQS[roll];
    sum += lastKuva * (rolls - numRolls);
    return sum;
  }
}
