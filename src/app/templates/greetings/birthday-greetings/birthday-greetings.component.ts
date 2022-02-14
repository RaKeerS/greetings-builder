import { Component, OnInit } from '@angular/core';
import { GreetingsTemplateTypeEnum } from 'src/app/enums/greetings-template-enum';

import { TemplatedummyComponent } from '../../miscellaneous/templatedummy/templatedummy.component';
import { BgTemplate1Component } from './bg-template1/bg-template1.component';
import { BgTemplate2Component } from './bg-template2/bg-template2.component';
import { BgTemplate3Component } from './bg-template3/bg-template3.component';
import { BgTemplate4Component } from './bg-template4/bg-template4.component';

@Component({
  selector: 'app-birthday-greetings',
  templateUrl: './birthday-greetings.component.html',
  styleUrls: ['./birthday-greetings.component.css']
})
export class BirthdayGreetingsComponent implements OnInit {

  ngOnInit(): void {
  }

  static getComponentType(componentType: string) {
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
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case 'dummy' : return 'dummy';
      case '1' : return BgTemplate1Component;
      case '2' : return BgTemplate2Component;
      case '3' : return BgTemplate3Component;
      case '4' : return BgTemplate4Component;
      case '5' : return TemplatedummyComponent;
      default: return 'dummy';
      }
  }

}
