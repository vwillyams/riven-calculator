import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simpleNumber'
})
export class SimpleNumberPipe implements PipeTransform {

  transform(value: number, sf: number = 2): string {
    let attempt = parseFloat(value.toFixed(sf)).toString();
    console.log(attempt);
    if (attempt === '0') {
      console.log(value);
      console.log(value.toPrecision(3));
      attempt = parseFloat(value.toPrecision(sf)).toString();
    }
    return attempt;
  }

}
