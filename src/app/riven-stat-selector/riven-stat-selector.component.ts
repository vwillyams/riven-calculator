import {Component, Input, OnInit} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {StatDesirability} from '../const/stat-desirability';
import {OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-riven-stat-selector',
  templateUrl: './riven-stat-selector.component.html',
  styleUrls: ['./riven-stat-selector.component.css']
})
export class RivenStatSelectorComponent implements OnInit, OnChanges {

  @Input() rivenStats: RivenStat[];
  @Input() selectedType: String;
  @Input() negative: Boolean;

  desirabilities: string[];

  constructor() {
    this.desirabilities = Object.values(StatDesirability);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(JSON.stringify(changes));
  }

  ngOnInit() {
  }

}
