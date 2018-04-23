import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RivenGeneratorComponent} from './riven-generator/riven-generator.component';

import {RivenStatsService} from './service/riven-stats.service';
import { RestrictByWeaponPipe } from './restrict-by-weapon.pipe';
import { RivenStatSelectorComponent } from './riven-stat-selector/riven-stat-selector.component';
import {FormsModule} from '@angular/forms';
import { RivenGeneratorService } from './service/riven-generator/riven-generator.service';
import { RivenStatFilterService } from './service/riven-generator/riven-stat-filter.service';

@NgModule({
  declarations: [
    AppComponent,
    RivenGeneratorComponent,
    RestrictByWeaponPipe,
    RivenStatSelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    RivenStatsService,
    RivenGeneratorService,
    RivenStatFilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
