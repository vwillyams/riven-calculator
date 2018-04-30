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

  @Input() positiveStats: RivenStat[];
  @Input() selectedType: String;
  @Input() negativeStats: RivenStat[];
  @Input() negative: string;

  negativeAllowed: boolean;
  combined: object;
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
      _.find(this.positiveStats, {name: statName}).posDesirability = newValue;
    } else {
      _.find(this.negativeStats, {name: statName}).negDesirability = newValue;
    }
    this.setup();
    if (newValue === StatDesirability.plusPlus) {
      // Update opposite value
      if (!type) {
        _.find(this.positiveStats, {name: statName}).posDesirability = StatDesirability.minus;
        this.combined[statName].class = 'required-negative';
      } else {
        _.find(this.negativeStats, {name: statName}).negDesirability = StatDesirability.minus;
        this.combined[statName].class = 'required-positive';
      }
    }
  }

  private setup() {
    this.rivenService.updateNegatives(this.positiveStats);
    this.rivenService.updatePositives(this.negativeStats);
    this.negativeAllowed = this.negative !== StatDesirability.minus;
    this.combined = {};
    if (this.positiveStats) {
      this.positiveStats.forEach(stat => {
        this.combined[stat.name] = {
          positive: stat,
          negative: this.negativeAllowed ? _.find(this.negativeStats, {name: stat['name']}) : null
        };
        if (_.get(this.combined, `${stat.name}.positive.posDesirability`) === StatDesirability.plusPlus) {
          _.find(this.negativeStats, {name: stat.name}).negDesirability = StatDesirability.minus;
          this.combined[stat.name].class = 'required-positive';
        }
        if (_.get(this.combined, `${stat.name}.negative.negDesirability`) === StatDesirability.plusPlus) {
          _.find(this.positiveStats, {name: stat.name}).posDesirability = StatDesirability.minus;
          this.combined[stat.name].class = 'required-negative';
        }
      });
    }
    this.rivenService.updateNegatives(this.positiveStats);
    this.rivenService.updatePositives(this.negativeStats);
  }
}
