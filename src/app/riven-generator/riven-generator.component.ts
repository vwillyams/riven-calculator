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

  rivenStats: RivenStat[];
  weaponTypes: string[];
  desirabilities: string[];
  selectedType: string;

  constructor(private rivenStatsService: RivenStatsService) {
    this.weaponTypes = Object.values(WeaponTypes);
    this.desirabilities = Object.values(StatDesirability);
    this.selectedType = Object.values(WeaponTypes)[0];
  }

  ngOnInit() {
    this.rivenStatsService.getRivenStats().subscribe(rivenStats => this.rivenStats = rivenStats);
  }

}
