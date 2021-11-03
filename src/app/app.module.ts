import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { MenubarModule } from 'primeng/menubar';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingCardComponent } from './components/greeting-card/greeting-card.component';
import { GreetingsTemplateComponent } from './components/greetings-template/greetings-template.component';
import { HomeComponent } from './components/home/home.component';
import { PrimeNGModules } from './prime-ng/prime-ng-modules';
import { ModalTemplateService } from './services/modal-template.service';
import { BirthdayGreetingsState } from './store/birthday-greetings-store';

@NgModule({
  declarations: [
    AppComponent,
    GreetingsTemplateComponent,
    HomeComponent,
    GreetingCardComponent
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
    FormsModule,
    AppRoutingModule

  ],
  providers: [ModalTemplateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
