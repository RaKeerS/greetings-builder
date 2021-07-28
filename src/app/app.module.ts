import { NgModule } from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { PrimeNGModules } from './prime-ng-modules';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    PrimeNGModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
