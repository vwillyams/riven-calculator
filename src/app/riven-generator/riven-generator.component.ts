import {Component, OnInit} from '@angular/core';
import {RivenStatsService} from '../service/riven-stats.service';
import {RivenStat} from '../model/riven-stat.model';
import {WeaponTypes} from '../const/weapon-type.values';
import {StatDesirability} from '../const/stat-desirability';

@Component({
  selector: 'app-riven-generator',
  templateUrl: './riven-generator.component.html',
  styleUrls: ['./riven-generator.component.css']
})
export class RivenGeneratorComponent implements OnInit {

  positiveRivenStats: RivenStat[];
  negativeRivenStats: RivenStat[];
  weaponTypes: string[];
  selectedType: string;
  desirabilities: string[];
  negativeStats: string;

  constructor(private rivenStatsService: RivenStatsService) {
    this.weaponTypes = Object.values(WeaponTypes);
    this.selectedType = this.weaponTypes[0];
    this.desirabilities = Object.values(StatDesirability);
    this.negativeStats = this.desirabilities[0];
  }

  ngOnInit() {
    this.rivenStatsService.getRivenStats().subscribe(rivenStats => {
      this.positiveRivenStats = rivenStats;
      this.negativeRivenStats = rivenStats;
    });
  }

  generate() {

  };

}
