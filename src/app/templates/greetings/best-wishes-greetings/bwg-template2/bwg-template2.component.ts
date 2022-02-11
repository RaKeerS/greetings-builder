import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-bwg-template2',
  templateUrl: './bwg-template2.component.html',
  styleUrls: ['./bwg-template2.component.css']
})
export class BwgTemplate2Component implements OnInit {

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  public imageUrl1: string = '../../../../../assets/greetings/best-wishes-greetings/bwg-template2/images/happy-mothers-day-image.png';

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
