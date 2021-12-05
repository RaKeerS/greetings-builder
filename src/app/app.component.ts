import { Component, ElementRef, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';

import { SelectCategory, SelectRouterOutlet } from './actions/birthday-greetings-actions';
import { BirthdayGreetingsState } from './store/birthday-greetings-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'birthday-greetings';

  public items: MenuItem[];

  // Currently the 3 declarations below have no intended purpose or use in the code.
  @Select(BirthdayGreetingsState.getCurrentTemplateCategory) currentTemplateCategory$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateType) currentTemplateType$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateId) currentTemplateId$!: Observable<number>;
  @Select(BirthdayGreetingsState.getCurrentRouterOutletName) currentRouterOutletName$!: Observable<string>;

  @ViewChild('customcontainer1') customcontainer1!: ElementRef;
  @ViewChild('customcard1') customcard1!: ElementRef;
  @ViewChild('Cards') Cards!: ElementRef;

  constructor(private primengConfig: PrimeNGConfig, private store: Store) {
    this.items = [
      {
        label: 'Anime',
        icon: 'pi pi-fw pi-file',
        routerLink: 'home',
        command: () => this.store.dispatch(new SelectCategory('anime-greetings'))
      },
      {
        label: 'Birthday',
        icon: 'pi pi-fw pi-pencil',
        routerLink: 'home',
        command: () => this.store.dispatch(new SelectCategory('birthday-greetings'))
      },
      {
        label: 'Miscellanous',
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

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.store.dispatch(new SelectRouterOutlet('greetings'));
  }

  ngAfterViewInit() {
    // let abc = Math.floor(this.customcontainer1.nativeElement.clientWidth / this.customcard1.nativeElement.clientWidth);
    // let bbc = this.Cards;
  }

  get routerName(): string {
    return this.store.selectSnapshot(state => state.global.currentRouterOutletName);
  }

  public get containerWidth(): number {
    // return 0;
    // return Math.floor(this.customcontainer1?.nativeElement.clientWidth / this.customcard1?.nativeElement.clientWidth);
    return Math.floor(this.customcontainer1?.nativeElement.clientWidth / 100);
    // return Math.floor(($('#custom-container-1')).clientWidth / (<any>$('#custom-card-1')).clientWidth);
  }

}
