import { Component, OnInit } from '@angular/core';
import { GreetingsTemplateTypeEnum } from 'src/app/enums/greetings-template-enum';

import { BgTemplate1Component } from '../../greetings/birthday-greetings/bg-template1/bg-template1.component';

@Component({
  selector: 'app-templatedummy',
  templateUrl: './templatedummy.component.html',
  styleUrls: ['./templatedummy.component.css']
})
export class TemplatedummyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static getComponentType(componentType: string) {
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case 'dummy' : return 'dummy';
      case '1' : return 'bg-template1';
      case '2' : return 'bg-template2';
      case '3' : return 'bg-template3';
      case '4' : return 'bg-template4';
      case '5' : return 'bg-template5';
      default: return 'dummy';
      }
  }

  static getComponent(componentType: string) {
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case 'dummy' : return 'dummy';
      case '1' : return BgTemplate1Component;
      case '2' : return 'bg-template2';
      case '3' : return 'bg-template3';
      case '4' : return 'bg-template4';
      case '5' : return 'bg-template5';
      default: return 'dummy';
      }
  }

}
