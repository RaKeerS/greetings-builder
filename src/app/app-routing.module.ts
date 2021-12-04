import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GreetingCardComponent } from './components/greeting-card/greeting-card.component';
import { GreetingsTemplateComponent } from './components/greetings-template/greetings-template.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'greetings', component: GreetingsTemplateComponent },
  { path: 'greeting', component: GreetingCardComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: ':id', component: GreetingCardComponent },
      { path: 'birthday-greetings/:id', component: GreetingCardComponent },
      { path: 'anime-greetings/:id', component: GreetingCardComponent }
    ]
  },
  { path: 'temp', component: GreetingCardComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
