import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-bwg-template3',
  templateUrl: './bwg-template3.component.html',
  styleUrls: ['./bwg-template3.component.css']
})
export class BwgTemplate3Component implements OnInit {

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  public imageUrl1: string = '../../../../../assets/greetings/best-wishes-greetings/bwg-template3/images/happy-fathers-day-image.png';

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
    // this.store.dispatch(new SelectTemplateDOMString(this.greetingTemplate.nativeElement.outerHTML));
    // this.toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0');

    this.domTemplateString = this.greetingTemplate.nativeElement.outerHTML;

    // Replace all file paths with template handlers. Call the below function multiple times in case of multiple images.
    this.storeImageData(this.imageUrl1);
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
