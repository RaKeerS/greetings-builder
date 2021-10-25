import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { PrimeNGModules } from './prime-ng/prime-ng-modules';
import { MenubarModule } from 'primeng/menubar';

import { AppComponent } from './app.component';
import { BirthdayGreetingsState } from './store/birthday-greetings-store';
import { GreetingsTemplateComponent } from './components/greetings-template/greetings-template.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingsTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    NgxsModule.forRoot([BirthdayGreetingsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),

    PrimeNGModules,
    MenubarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
