import { Component, OnInit } from '@angular/core';

import { TemplatedummyComponent } from '../../dummy/templatedummy/templatedummy.component';
import { BwgTemplate1Component } from './bwg-template1/bwg-template1.component';
import { BwgTemplate2Component } from './bwg-template2/bwg-template2.component';
import { BwgTemplate3Component } from './bwg-template3/bwg-template3.component';
import { BwgTemplate4Component } from './bwg-template4/bwg-template4.component';

@Component({
  selector: 'app-best-wishes-greetings',
  templateUrl: './best-wishes-greetings.component.html',
  styleUrls: ['./best-wishes-greetings.component.css']
})
export class BestWishesGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static getComponentType(componentType: string) {
    return !isNaN(Number(componentType)) ? 'template'+componentType : componentType;
    // switch(componentTypeValue) {
    //   case 'dummy' : return 'dummy';
    //   case '1' : return 'template1';
    //   case '2' : return 'template2';
    //   case '3' : return 'template3';
    //   case '4' : return 'template4';
    //   case '5' : return 'template5';
    //   default: return 'dummy';
    // }
  }

  static getComponent(componentType: string) {
    const componentTypeValue = !isNaN(Number(componentType)) ? 'template'+componentType : componentType;
    switch(componentTypeValue) {
      case '1' : return BwgTemplate1Component;
      case '2' : return BwgTemplate2Component;
      case '3' : return BwgTemplate3Component;
      case '4' : return BwgTemplate4Component;
      case 'dummy' : return TemplatedummyComponent;
      default: return TemplatedummyComponent;
    }
  }

}
