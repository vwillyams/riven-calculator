import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simpleNumber'
})
export class SimpleNumberPipe implements PipeTransform {

  transform(value: number, sf: number = 2): string {
    let attempt = parseFloat(value.toFixed(sf)).toString();
    if (attempt === '0') {
      attempt = parseFloat(value.toPrecision(sf)).toString();
    }
    return attempt;
  }

}
