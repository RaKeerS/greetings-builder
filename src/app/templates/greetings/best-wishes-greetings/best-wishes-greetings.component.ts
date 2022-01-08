import { Component, OnInit } from '@angular/core';
import { GreetingsTemplateTypeEnum } from 'src/app/enums/greetings-template-enum';

import { TemplatedummyComponent } from '../../miscellaneous/templatedummy/templatedummy.component';
import { BwgTemplate1Component } from './bwg-template1/bwg-template1.component';

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
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case 'dummy' : return 'dummy';
      case '1' : return 'template1';
      case '2' : return 'template2';
      case '3' : return 'template3';
      case '4' : return 'template4';
      case '5' : return 'template5';
      default: return 'dummy';
    }
  }

  static getComponent(componentType: string) {
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case 'dummy' : return 'dummy';
      case '1' : return BwgTemplate1Component;
      // case '2' : return AgTemplate2Component;
      // case '3' : return BgTemplate3Component;
      // case '4' : return BgTemplate4Component;
      case '5' : return TemplatedummyComponent;
      default: return 'dummy';
    }
  }

}