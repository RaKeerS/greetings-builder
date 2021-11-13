import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GreetingsTemplateTypeEnum } from 'src/app/enums/greetings-template-enum';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

import { TemplatedummyComponent } from '../../miscellaneous/templatedummy/templatedummy.component';
import { BgTemplate1Component } from './bg-template1/bg-template1.component';

@Component({
  selector: 'app-birthday-greetings',
  templateUrl: './birthday-greetings.component.html',
  styleUrls: ['./birthday-greetings.component.css']
})
export class BirthdayGreetingsComponent implements OnInit {

  public recipientName: string;
  public customMessage: string;
  public recipientAddressCC: string;
  public recipientAddressBCC: string;
  public senderName: string;

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>) {
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.recipientAddressCC = this.modalData.inputData?.recipientAddressCC!;
    this.recipientAddressBCC = this.modalData.inputData?.recipientAddressBCC!;
    this.senderName = this.modalData.inputData?.senderName || '';
  }

  ngOnInit(): void {
    console.log('GreetingStyle1 InputData: ', this.modalData.inputData);
  }

  ngAfterViewInit() {
    console.log('greetingTemplate: ', this.greetingTemplate.nativeElement.outerHTML);
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
      case '2' : return TemplatedummyComponent;
      case '3' : return 'bg-template3';
      case '4' : return 'bg-template4';
      case '5' : return 'bg-template5';
      default: return 'dummy';
      }
  }
}
