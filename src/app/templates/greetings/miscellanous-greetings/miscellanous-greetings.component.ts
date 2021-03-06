import { Component, OnInit } from '@angular/core';

import { TemplatedummyComponent } from '../../dummy/templatedummy/templatedummy.component';
import { MgTemplate1Component } from './mg-template1/mg-template1.component';
import { MgTemplate2Component } from './mg-template2/mg-template2.component';
import { MgTemplate3Component } from './mg-template3/mg-template3.component';
import { MgTemplate4Component } from './mg-template4/mg-template4.component';

@Component({
  selector: 'app-miscellanous-greetings',
  templateUrl: './miscellanous-greetings.component.html',
  styleUrls: ['./miscellanous-greetings.component.css']
})
export class MiscellanousGreetingsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  static getComponentType(componentType: string) {
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
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
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
    const componentTypeValue = !isNaN(Number(componentType)) ? 'template'+componentType : componentType;
    switch(componentTypeValue) {
      case 'template1' : return MgTemplate1Component;
      case 'template2' : return MgTemplate2Component;
      case 'template3' : return MgTemplate3Component;
      case 'template4' : return MgTemplate4Component;
      case 'dummy' : return TemplatedummyComponent;
      default: return TemplatedummyComponent;
      }
  }

}
