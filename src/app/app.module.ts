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
import { ModalTemplateService } from './services/modal-template.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingsTemplateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgxsModule.forRoot([BirthdayGreetingsState], { developmentMode: !environment.production }), // RECOMMENDATION: Set developmentMode to true on the NgxsModule when Angular is running in development mode. NgxsModule.forRoot(states, { developmentMode: !environment.production })
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),

    PrimeNGModules,
    MenubarModule,
    AppRoutingModule

  ],
  providers: [ModalTemplateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
