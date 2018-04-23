import {Component, Input, OnInit} from '@angular/core';
import {RivenStat} from '../model/riven-stat.model';
import {StatDesirability} from '../const/stat-desirability';
import {RivenGeneratorService} from '../service/riven-generator/riven-generator.service';

@Component({
  selector: 'app-riven-stat-selector',
  templateUrl: './riven-stat-selector.component.html',
  styleUrls: ['./riven-stat-selector.component.css']
})
export class RivenStatSelectorComponent implements OnInit {

  @Input() rivenStats: RivenStat[];
  @Input() selectedType: String;
  @Input() negative: Boolean;

  desirabilities: string[];

  constructor(private rivenService: RivenGeneratorService) {
    this.desirabilities = Object.values(StatDesirability);
  }

  ngOnInit() {
    if (this.negative) {
      this.rivenService.updateNegatives(this.rivenStats);
    } else {
      this.rivenService.updatePositives(this.rivenStats);
    }
  }

}
