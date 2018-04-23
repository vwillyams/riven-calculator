import {RivenStat} from '../model/riven-stat.model';
import {WeaponTypes} from './weapon-type.values';
import {StatDesirability} from './stat-desirability';

export const RivenStats: RivenStat[] = [
  new RivenStat({
    name: 'Ammo Maximum',
    prefix: 'Ampi',
    suffix: 'Bin',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Base Damage / Melee Damage',
    prefix: 'Visi',
    suffix: 'Ata',
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.minus
  }),
  new RivenStat({
    name: 'Channeling Damage',
    prefix: 'Tori',
    suffix: 'Bo',
    restrict: WeaponTypes.Melee,
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Channeling Efficiency',
    prefix: 'Uti',
    suffix: 'Tia',
    restrict: WeaponTypes.Melee,
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Cold Damage', prefix: 'Geli', suffix: 'Do'}),
  new RivenStat({name: 'Combo Duration', prefix: 'Tempi', suffix: 'Nem', restrict: WeaponTypes.Ranged}),
  new RivenStat({name: 'Critical Chance', prefix: 'Crita', suffix: 'Cron'}),
  new RivenStat({
    name: 'Critical Chance on Slide Attack',
    prefix: 'Pleci',
    suffix: 'Nent',
    restrict: WeaponTypes.Melee
  }),
  new RivenStat({name: 'Critical Damage', prefix: 'Acri', suffix: 'Tis'}),
  new RivenStat({
    name: 'Damage vs. Corpus',
    prefix: 'Manti',
    suffix: 'Tron',
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Damage vs. Grineer',
    prefix: 'Argi',
    suffix: 'Con',
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Damage vs. Infested', prefix: 'Pura', suffix: 'Ada',
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Electric Damage', prefix: 'Vexi', suffix: 'Tio'}),
  new RivenStat({
    name: 'Finisher Damage',
    prefix: 'Exi',
    suffix: 'Cta',
    restrict: WeaponTypes.Melee,
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Fire Rate / Attack Speed', prefix: 'Croni', suffix: 'Dra'}),
  new RivenStat({
    name: 'Flight Speed',
    prefix: 'Conci',
    suffix: 'Nak',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Heat Damage', prefix: 'Igni', suffix: 'Pha'}),
  new RivenStat({
    name: 'Impact Damage',
    prefix: 'Magna',
    suffix: 'Ton',
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Magazine Capacity',
    prefix: 'Arma',
    suffix: 'Tin',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Multishot', prefix: 'Sati', suffix: 'Can', restrict: WeaponTypes.Ranged}),
  new RivenStat({
    name: 'Punch Through',
    prefix: 'Lexi',
    suffix: 'Nok',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.plus,
    negativeBlocked: true
  }),
  new RivenStat({
    name: 'Puncture Damage',
    prefix: 'Insi',
    suffix: 'Cak',
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Reload Speed',
    prefix: 'Feva',
    suffix: 'Tak',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Range', prefix: 'Locti', suffix: 'Tor', restrict: WeaponTypes.Melee}),
  new RivenStat({
    name: 'Recoil',
    prefix: 'Zeti',
    suffix: 'Mag',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.plus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({
    name: 'Slash Damage',
    prefix: 'Sci',
    suffix: 'Sus',
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Status Chance', prefix: 'Hexa', suffix: 'Dex'}),
  new RivenStat({
    name: 'Status Duration',
    prefix: 'Deci',
    suffix: 'Des',
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
  new RivenStat({name: 'Toxin Damage', prefix: 'Toxi', suffix: 'Tox'}),
  new RivenStat({
    name: 'Zoom',
    prefix: 'Hera',
    suffix: 'Lis',
    restrict: WeaponTypes.Ranged,
    posDesirability: StatDesirability.minus,
    negDesirability: StatDesirability.plus
  }),
];
