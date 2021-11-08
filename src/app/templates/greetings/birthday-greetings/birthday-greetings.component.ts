import { Component, OnInit } from '@angular/core';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

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
}
