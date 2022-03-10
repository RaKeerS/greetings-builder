import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { GreetingsTemplateTypeEnum } from 'src/app/enums/greetings-template-enum';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-templatedummy',
  templateUrl: './templatedummy.component.html',
  styleUrls: ['./templatedummy.component.css']
})
export class TemplatedummyComponent implements OnInit {

  public recipientName: string;
  public customMessage: string;
  public senderName: string;

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store) {
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.senderName = this.modalData.inputData?.senderName || '';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new SelectTemplateDOMString(this.greetingTemplate.nativeElement.outerHTML));
  }

  static getComponentType(componentType: string) {
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case '1' : return 'bg-template1';
      case 'dummy' : return 'dummy';
      default: return 'dummy';
      }
  }

  static getComponent(componentType: string) {
    const componentTypeValue = isNaN(Number(componentType)) ? (<any>GreetingsTemplateTypeEnum)[componentType] : componentType;
    switch(componentTypeValue) {
      case '1' : return 'bg-template1';
      case 'dummy' : return 'dummy';
      default: return 'dummy';
      }
  }

}
