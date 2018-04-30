import {StatDesirability} from '../const/stat-desirability';

export class RivenStat {
  name: string;
  prefix?: string;
  suffix?: string;
  restrict?: string;
  negativeBlocked: boolean;
  class: string;

  private _posDesirability?: string;
  private _negDesirability?: string;

  get posDesirability(): string {
    return this._posDesirability;
  }

  set posDesirability(desirability: string) {
    this._posDesirability = desirability;
    this.updateOpposite(desirability, '_negDesirability', 'required-positive');
  }

  get negDesirability(): string {
    return this._negDesirability;
  }

  set negDesirability(desirability: string) {
    this._negDesirability = desirability;
    this.updateOpposite(desirability, '_posDesirability', 'required-negative');
  }

  private updateOpposite(desirability: string, oppType: string, targetClass: string) {
    if (desirability === StatDesirability.plusPlus) {
      this[oppType] = StatDesirability.minus;
      this.class = targetClass;
    } else if (this[oppType] === StatDesirability.plusPlus) {
      if (desirability === StatDesirability.plus) {
        this[oppType] = StatDesirability.plus;
        this.class = null;
      }
    } else {
      this.class = null;
    }
  }

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
