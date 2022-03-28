import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingCardComponent } from './components/greeting-card/greeting-card.component';
import { GreetingsTemplateComponent } from './components/greetings-template/greetings-template.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { PrimeNGModules } from './prime-ng/prime-ng-modules';
import { ModalTemplateService } from './services/modal-template.service';
import { GreetingsState } from './store/greetings-store';
import { TemplatedummyComponent } from './templates/dummy/templatedummy/templatedummy.component';
import { AgTemplate1Component } from './templates/greetings/anime-greetings/ag-template1/ag-template1.component';
import { AgTemplate10Component } from './templates/greetings/anime-greetings/ag-template10/ag-template10.component';
import { AgTemplate2Component } from './templates/greetings/anime-greetings/ag-template2/ag-template2.component';
import { AgTemplate3Component } from './templates/greetings/anime-greetings/ag-template3/ag-template3.component';
import { AgTemplate4Component } from './templates/greetings/anime-greetings/ag-template4/ag-template4.component';
import { AgTemplate5Component } from './templates/greetings/anime-greetings/ag-template5/ag-template5.component';
import { AgTemplate6Component } from './templates/greetings/anime-greetings/ag-template6/ag-template6.component';
import { AgTemplate7Component } from './templates/greetings/anime-greetings/ag-template7/ag-template7.component';
import { AgTemplate8Component } from './templates/greetings/anime-greetings/ag-template8/ag-template8.component';
import { AgTemplate9Component } from './templates/greetings/anime-greetings/ag-template9/ag-template9.component';
import { AnimeGreetingsComponent } from './templates/greetings/anime-greetings/anime-greetings.component';
import { BestWishesGreetingsComponent } from './templates/greetings/best-wishes-greetings/best-wishes-greetings.component';
import { BwgTemplate1Component } from './templates/greetings/best-wishes-greetings/bwg-template1/bwg-template1.component';
import { BwgTemplate2Component } from './templates/greetings/best-wishes-greetings/bwg-template2/bwg-template2.component';
import { BwgTemplate3Component } from './templates/greetings/best-wishes-greetings/bwg-template3/bwg-template3.component';
import { BwgTemplate4Component } from './templates/greetings/best-wishes-greetings/bwg-template4/bwg-template4.component';
import { BgTemplate1Component } from './templates/greetings/birthday-greetings/bg-template1/bg-template1.component';
import { BgTemplate2Component } from './templates/greetings/birthday-greetings/bg-template2/bg-template2.component';
import { BgTemplate3Component } from './templates/greetings/birthday-greetings/bg-template3/bg-template3.component';
import { BgTemplate4Component } from './templates/greetings/birthday-greetings/bg-template4/bg-template4.component';
import { BirthdayGreetingsComponent } from './templates/greetings/birthday-greetings/birthday-greetings.component';
import { MgTemplate1Component } from './templates/greetings/miscellanous-greetings/mg-template1/mg-template1.component';
import { MgTemplate2Component } from './templates/greetings/miscellanous-greetings/mg-template2/mg-template2.component';
import { MgTemplate3Component } from './templates/greetings/miscellanous-greetings/mg-template3/mg-template3.component';
import { MgTemplate4Component } from './templates/greetings/miscellanous-greetings/mg-template4/mg-template4.component';
import {
  MiscellanousGreetingsComponent,
} from './templates/greetings/miscellanous-greetings/miscellanous-greetings.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingsTemplateComponent,
    HomeComponent,
    GreetingCardComponent,
    TemplatedummyComponent,
    BirthdayGreetingsComponent,
    BgTemplate1Component,
    BgTemplate2Component,
    BgTemplate3Component,
    BgTemplate4Component,
    AnimeGreetingsComponent,
    AgTemplate1Component,
    AgTemplate2Component,
    BestWishesGreetingsComponent,
    BwgTemplate1Component,
    AgTemplate3Component,
    AgTemplate4Component,
    AgTemplate5Component,
    AgTemplate6Component,
    AgTemplate7Component,
    AgTemplate8Component,
    AgTemplate9Component,
    AgTemplate10Component,
    BwgTemplate2Component,
    BwgTemplate3Component,
    BwgTemplate4Component,
    MiscellanousGreetingsComponent,
    MgTemplate1Component,
    MgTemplate2Component,
    MgTemplate3Component,
    MgTemplate4Component,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgxsModule.forRoot([GreetingsState], { developmentMode: !environment.production }), // RECOMMENDATION: Set developmentMode to true on the NgxsModule when Angular is running in development mode. NgxsModule.forRoot(states, { developmentMode: !environment.production })
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      // key: 'global'  // commented for now since it was saving older keys and values in the store, i.e. those properties which were created during the beginning but were later removed in the localStorage of browser.
    }),

    PrimeNGModules,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }), // ToastrModule added

    FormsModule,
    AppRoutingModule

  ],
  providers: [ModalTemplateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
