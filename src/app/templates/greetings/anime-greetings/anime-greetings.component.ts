import { Component, OnInit } from '@angular/core';

import { TemplatedummyComponent } from '../../dummy/templatedummy/templatedummy.component';
import { AgTemplate1Component } from './ag-template1/ag-template1.component';
import { AgTemplate10Component } from './ag-template10/ag-template10.component';
import { AgTemplate2Component } from './ag-template2/ag-template2.component';
import { AgTemplate3Component } from './ag-template3/ag-template3.component';
import { AgTemplate4Component } from './ag-template4/ag-template4.component';
import { AgTemplate5Component } from './ag-template5/ag-template5.component';
import { AgTemplate6Component } from './ag-template6/ag-template6.component';
import { AgTemplate7Component } from './ag-template7/ag-template7.component';
import { AgTemplate8Component } from './ag-template8/ag-template8.component';
import { AgTemplate9Component } from './ag-template9/ag-template9.component';

@Component({
  selector: 'app-anime-greetings',
  templateUrl: './anime-greetings.component.html',
  styleUrls: ['./anime-greetings.component.css']
})
export class AnimeGreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static getComponentType(componentType: string): string {
    return !isNaN(Number(componentType)) ? 'template'+componentType : componentType;

    // return !isNaN(Number(componentType)) ? GreetingsTemplateTypeList[componentType] : componentType;

    // const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    // switch(componentTypeValue) {
    //   case 'dummy' : return 'dummy';
    //   case '1' : return 'template1';
    //   case '2' : return 'template2';
    //   case '3' : return 'template3';
    //   case '4' : return 'template4';
    //   case '5' : return 'template5';
    //   case '6' : return 'template6';
    //   case '7' : return 'template7';
    //   case '8' : return 'template8';
    //   case '9' : return 'template9';
    //   case '10' : return 'template10';
    //   default: return 'dummy';
    // }
  }

  static getComponent(componentType: string) {
    const componentTypeValue = !isNaN(Number(componentType)) ? 'template'+componentType : componentType;
    switch(componentTypeValue) {
      case 'template1' : return AgTemplate1Component;
      case 'template2' : return AgTemplate2Component;
      case 'template3' : return AgTemplate3Component;
      case 'template4' : return AgTemplate4Component;
      case 'template5' : return AgTemplate5Component;
      case 'template6' : return AgTemplate6Component;
      case 'template7' : return AgTemplate7Component;
      case 'template8' : return AgTemplate8Component;
      case 'template9' : return AgTemplate9Component;
      case 'template10' : return AgTemplate10Component;
      case 'dummy' : return TemplatedummyComponent;
      default: return TemplatedummyComponent;
    }
  }

}
