import { Component, OnInit } from '@angular/core';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-greeting-style1',
  templateUrl: './greeting-style1.component.html',
  styleUrls: ['./greeting-style1.component.css']
})
export class GreetingStyle1Component implements OnInit {

  constructor(public modalData: ModalData<GreetingData>) { }

  ngOnInit(): void {
    console.log('GreetingStyle1 InputData: ', this.modalData.inputData);
  }

}
