import {Component, OnInit} from '@angular/core';
import {RivenStatsService} from '../service/riven-stats.service';
import {RivenStat} from '../model/riven-stat.model';
import {WeaponTypes} from '../const/weapon-type.values';
import {StatDesirability} from '../const/stat-desirability';
import {RivenGeneratorService} from '../service/riven-generator/riven-generator.service';
import {SingleRiven} from '../service/riven-generator/dto/single-riven.model';

@Component({
  selector: 'app-riven-generator',
  templateUrl: './riven-generator.component.html',
  styleUrls: ['./riven-generator.component.scss']
})
export class RivenGeneratorComponent implements OnInit {

  rivenStats: RivenStat[];
  weaponTypes: string[];
  selectedType: string;
  desirabilities: string[];
  negativeStats: string;
  rivenResult: SingleRiven;
  resultString: string; // TODO

  constructor(private rivenStatsService: RivenStatsService, private rivenGenerator: RivenGeneratorService) {
    this.weaponTypes = Object.values(WeaponTypes);
    this.selectedType = this.weaponTypes[0];
    this.desirabilities = Object.values(StatDesirability);
    this.negativeStats = this.desirabilities[0];
  }

  ngOnInit() {
    this.rivenStatsService.getRivenStats().subscribe(rivenStats => {
      this.rivenStats = rivenStats;
    });
  }

  generateOne(weaponType: string, negativeAllowed: boolean) {
    this.rivenGenerator.generate(weaponType, negativeAllowed).subscribe(results => {
      this.rivenResult = results;
      this.resultString = JSON.stringify(results);
    });
  }

  calculate(weaponType: string, negativeAllowed: boolean) {
    this.rivenGenerator.calculate(weaponType, negativeAllowed).subscribe(results => {
      this.resultString = JSON.stringify(results);
    });
  }

}
