import { Component, OnInit } from '@angular/core';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-birthday-greetings',
  templateUrl: './birthday-greetings.component.html',
  styleUrls: ['./birthday-greetings.component.css']
})
export class BirthdayGreetingsComponent implements OnInit {

  constructor(public modalData: ModalData<GreetingData>) { }

  ngOnInit(): void {
    console.log('GreetingStyle1 InputData: ', this.modalData.inputData);
  }
}
