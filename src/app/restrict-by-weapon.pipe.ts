import {Pipe, PipeTransform} from '@angular/core';
import {RivenStat} from './model/riven-stat.model';

@Pipe({
  name: 'restrictByWeapon'
})
export class RestrictByWeaponPipe implements PipeTransform {

  transform(values: RivenStat[], weaponType: string): RivenStat[] {
    return values.filter(value => !value.restrict || value.restrict === weaponType);
  }

}
