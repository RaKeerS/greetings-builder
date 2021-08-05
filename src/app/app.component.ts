import { Component } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

import { Select, Store } from '@ngxs/store';

import { BirthdayGreetingsState } from './store/birthday-greetings-store';

import { Observable } from 'rxjs';
import { SelectTemplate } from './actions/birthday-greetings-actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'birthday-greetings';

  items: MenuItem[];
  tempLabel!: any;
  tempNumber!: number;

  @Select(BirthdayGreetingsState.getCurrentTemplateLabel) currentTemplateLabel$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateNumber) currentTemplateNumber$!: Observable<number>;

  constructor(private primengConfig: PrimeNGConfig, private store: Store) {
    this.items = [
      {
        label: 'Menu Item 1',
        icon: 'pi pi-fw pi-file'
      },
      {
        label: 'Menu Item 2',
        icon: 'pi pi-fw pi-pencil'
      },
      {
        label: 'Menu Item 3',
        icon: 'pi pi-fw pi-user'
      },
      {
        label:'Quit',
        icon:'pi pi-fw pi-power-off'
      }
    ];

    // this.tempLabel = this.store.select(state => state.global.currentTemplateLabel);
    // this.tempLabel = this.store.selectSnapshot(state => state.global.currentTemplateLabel);
  }

  public get currentTemplateLabel(): string {
    return this.store.selectSnapshot(state => state.global.currentTemplateLabel);
  }

  public get currentTemplateNumber(): string {
    return this.store.selectSnapshot(state => state.global.currentTemplateNumber);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  public doThis() {
    this.store.dispatch(new SelectTemplate('changed', 1));
  }
}
