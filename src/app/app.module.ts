// Core modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// ngMaterial
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonToggleModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {RivenGeneratorComponent} from './riven-generator/riven-generator.component';
import {RivenStatsService} from './service/riven-stats.service';
import {RestrictByWeaponPipe} from './restrict-by-weapon.pipe';
import {RivenStatSelectorComponent} from './riven-stat-selector/riven-stat-selector.component';
import {RivenGeneratorService} from './service/riven-generator/riven-generator.service';
import {RivenStatFilterService} from './service/riven-generator/riven-stat-filter.service';
import {ProbabilityResultComponent} from './probability-result/probability-result.component';
import {SimpleNumberPipe} from './simple-number.pipe';
import {SingleResultComponent} from './single-result/single-result.component';

@NgModule({
  declarations: [
    AppComponent,
    RivenGeneratorComponent,
    RestrictByWeaponPipe,
    RivenStatSelectorComponent,
    ProbabilityResultComponent,
    SimpleNumberPipe,
    SingleResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule
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
