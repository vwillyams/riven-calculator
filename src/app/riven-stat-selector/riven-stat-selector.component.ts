import {Component, Input, OnInit} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {StatDesirability} from '../const/stat-desirability';
import {RivenGeneratorService} from '../service/riven-generator/riven-generator.service';
import {OnChanges, SimpleChanges} from '@angular/core';
import {NgClass} from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-riven-stat-selector',
  templateUrl: './riven-stat-selector.component.html',
  styleUrls: ['./riven-stat-selector.component.scss']
})
export class RivenStatSelectorComponent implements OnInit, OnChanges {

  @Input() rivenStats: RivenStat[];
  @Input() selectedType: String;
  @Input() negative: string;

  negativeAllowed: boolean;
  desirabilities: string[];

  constructor(private rivenService: RivenGeneratorService) {
    this.desirabilities = Object.values(StatDesirability);
  }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setup();
  }

  updateDesirability(statName: string, type: boolean, newValue: string) {
    if (type) {
      _.find(this.rivenStats, {name: statName}).posDesirability = newValue;
    } else {
      _.find(this.rivenStats, {name: statName}).negDesirability = newValue;
    }
    this.rivenService.updateRivens(this.rivenStats);
  }

  private setup() {
    this.negativeAllowed = this.negative !== StatDesirability.minus;
    this.rivenService.updateRivens(this.rivenStats);
  }
}
