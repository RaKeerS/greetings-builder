import { Component } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'birthday-greetings';

  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {
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
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
