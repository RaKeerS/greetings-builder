import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

import { Select, Store } from '@ngxs/store';

import { BirthdayGreetingsState } from './store/birthday-greetings-store';

import { Observable } from 'rxjs';
import { SelectTemplate } from './actions/birthday-greetings-actions';

import * as $ from 'jquery';

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

  @ViewChild('customcontainer1') customcontainer1!: ElementRef;
  @ViewChild('customcard1') customcard1!: ElementRef;
  @ViewChild('Cards') Cards!: ElementRef;

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

  ngAfterViewInit() {
    // let abc = Math.floor(this.customcontainer1.nativeElement.clientWidth / this.customcard1.nativeElement.clientWidth);
    // let bbc = this.Cards;
  }

  public get containerWidth(): number {
    // return 0;
    // return Math.floor(this.customcontainer1?.nativeElement.clientWidth / this.customcard1?.nativeElement.clientWidth);
    return Math.floor(this.customcontainer1?.nativeElement.clientWidth / 100);
    // return Math.floor(($('#custom-container-1')).clientWidth / (<any>$('#custom-card-1')).clientWidth);
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
