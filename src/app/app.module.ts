import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimeNGModules } from './prime-ng/prime-ng-modules';
import { MenubarModule } from 'primeng/menubar';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    PrimeNGModules,
    MenubarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
