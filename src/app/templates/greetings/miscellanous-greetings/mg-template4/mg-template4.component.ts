import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-mg-template4',
  templateUrl: './mg-template4.component.html',
  styleUrls: ['./mg-template4.component.css']
})
export class MgTemplate4Component implements OnInit {

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  public imageUrl1: string = './../../assets/greetings/miscellanous-greetings/mg-template4/images/happy-programming-image-1.png';
  public imageUrl2: string = './../../assets/greetings/miscellanous-greetings/mg-template4/images/happy-programming-image-2.png';
  public imageUrl3: string = './../../assets/greetings/miscellanous-greetings/mg-template4/images/happy-programming-image-3.png';
  public imageUrl4: string = './../../assets/greetings/miscellanous-greetings/mg-template4/images/happy-programming-image-4.png';
  public imageUrl5: string = './../../assets/greetings/miscellanous-greetings/mg-template4/images/happy-programming-image-5.png';
  public imageUrl6: string = './../../assets/greetings/miscellanous-greetings/mg-template4/images/happy-programming-image-6.png';

  public domTemplateString: string = '';

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store, private modalSvc: ModalTemplateService) {
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.senderName = this.modalData.inputData?.senderName || '';
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.domTemplateString = this.greetingTemplate.nativeElement.outerHTML;

    // Replace all file paths with template handlers. Call the below function multiple times in case of multiple images.
    this.storeImageData(this.imageUrl1);
    this.storeImageData(this.imageUrl2);
    this.storeImageData(this.imageUrl3);
    this.storeImageData(this.imageUrl4);
    this.storeImageData(this.imageUrl5);
    this.storeImageData(this.imageUrl6);
  }

  private storeImageData(imageUrl: string) {
    this.modalSvc.toDataURL(imageUrl)
      .then(response => {
        const imageBase64String = response?.toString() ?? '';

        this.domTemplateString = this.domTemplateString.replace(imageUrl, imageBase64String);

        this.store.dispatch(new SelectTemplateDOMString(this.domTemplateString));
    });
  }

}
