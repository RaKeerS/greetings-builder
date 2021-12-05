import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/birthday-greetings-actions';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-ag-template1',
  templateUrl: './ag-template1.component.html',
  styleUrls: ['./ag-template1.component.css']
})
export class AgTemplate1Component implements OnInit {

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store) {
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.senderName = this.modalData.inputData?.senderName || '';
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.store.dispatch(new SelectTemplateDOMString(this.greetingTemplate.nativeElement.outerHTML));
  }

}
