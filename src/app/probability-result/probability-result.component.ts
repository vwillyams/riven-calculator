import {Component, Input, OnInit} from '@angular/core';
import {ProbabilityResult} from '../service/riven-generator/dto/probability-result.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-probability-result',
  templateUrl: './probability-result.component.html',
  styleUrls: ['./probability-result.component.scss']
})
export class ProbabilityResultComponent implements OnInit {

  @Input() result: ProbabilityResult;
  resultText: string;

  constructor() {
  }

  ngOnInit() {
    this.resultText = JSON.stringify(this.result);
  }

}
