import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-bg-template2',
  templateUrl: './bg-template2.component.html',
  styleUrls: ['./bg-template2.component.css']
})
export class BgTemplate2Component implements OnInit {

  public recipientName: string;
  public senderName: string;

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store) {
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.senderName = this.modalData.inputData?.senderName || '';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('greetingTemplate: ', this.greetingTemplate.nativeElement.outerHTML);
    this.store.dispatch(new SelectTemplateDOMString(this.greetingTemplate.nativeElement.outerHTML));
  }

}
