import { Component, OnInit } from '@angular/core';
import { GreetingsTemplateTypeEnum } from 'src/app/enums/greetings-template-enum';

import { TemplatedummyComponent } from '../../miscellaneous/templatedummy/templatedummy.component';
import { AgTemplate1Component } from './ag-template1/ag-template1.component';
import { AgTemplate2Component } from './ag-template2/ag-template2.component';
import { AgTemplate3Component } from './ag-template3/ag-template3.component';
import { AgTemplate4Component } from './ag-template4/ag-template4.component';

@Component({
  selector: 'app-anime-greetings',
  templateUrl: './anime-greetings.component.html',
  styleUrls: ['./anime-greetings.component.css']
})
export class AnimeGreetingsComponent implements OnInit {

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
      case '1' : return AgTemplate1Component;
      case '2' : return AgTemplate2Component;
      case '3' : return AgTemplate3Component;
      case '4' : return AgTemplate4Component;
      case '5' : return TemplatedummyComponent;
      default: return 'dummy';
    }
  }

}
