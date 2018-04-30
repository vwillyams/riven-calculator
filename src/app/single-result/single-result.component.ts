import {Component, Input, OnInit} from '@angular/core';
import {SingleRiven} from '../service/riven-generator/dto/single-riven.model';

@Component({
  selector: 'app-single-result',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.scss']
})
export class SingleResultComponent implements OnInit {

  @Input() result: SingleRiven;
  resultString: string;

  constructor() {
  }

  ngOnInit() {
    this.resultString = JSON.stringify(this.result);
    console.log(this.result);
  }

}
