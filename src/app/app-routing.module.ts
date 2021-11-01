import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GreetingsTemplateComponent } from './components/greetings-template/greetings-template.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'greetings', component: GreetingsTemplateComponent }
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
