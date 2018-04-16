import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RivenGeneratorComponent} from './riven-generator/riven-generator.component';

import {RivenStatsService} from './service/riven-stats.service';
import { RestrictByWeaponPipe } from './restrict-by-weapon.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RivenGeneratorComponent,
    RestrictByWeaponPipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    RivenStatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
