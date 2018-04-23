export class RivenStat {
  name: string;
  prefix?: string;
  suffix?: string;
  restrict?: string;
  posDesirability?: string;
  negDesirability?: string;
  negativeBlocked: boolean;

  constructor(obj: Object) {
    if (obj) {
      Object.assign(this, obj);
    }
    if (!this.posDesirability) {
      this.posDesirability = 'Allowed';
    }
    if (!this.negDesirability) {
      this.negDesirability = 'Not Allowed';
    }
  }
}
