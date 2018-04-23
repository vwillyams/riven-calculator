import {Component, Input, OnInit} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {StatDesirability} from '../const/stat-desirability';
import {OnChanges, SimpleChanges} from '@angular/core';
import {RivenGeneratorService} from '../service/riven-generator.service';

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

  constructor(private rivenService: RivenGeneratorService) {
    this.desirabilities = Object.values(StatDesirability);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.negative) {
      this.rivenService.updateNegatives(changes['rivenStats'].currentValue);
    } else {
      this.rivenService.updatePositives(changes['rivenStats'].currentValue);
    }
  }

  ngOnInit() {
  }

}
