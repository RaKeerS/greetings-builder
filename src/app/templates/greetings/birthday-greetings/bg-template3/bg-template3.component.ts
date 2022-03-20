import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-bg-template3',
  templateUrl: './bg-template3.component.html',
  styleUrls: ['./bg-template3.component.css']
})
export class BgTemplate3Component implements OnInit {

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  public enableRecipientName: boolean = true;
  public enableSenderName: boolean = true;

  public imageUrl1: string = '../../../../../assets/greetings/birthday-greetings/bg-template3/images/1451577359453383.png';

  public domTemplateString: string = '';

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store, private modalSvc: ModalTemplateService) {
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.senderName = this.modalData.inputData?.senderName || '';
    this.enableRecipientName = this.modalData.inputData?.enableRecipientName!;
    this.enableSenderName = this.modalData.inputData?.enableSenderName!;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.domTemplateString = this.greetingTemplate.nativeElement.outerHTML;

    // Replace all file paths with template handlers. Call the below function multiple times in case of multiple images.
    this.storeImageData(this.imageUrl1);
  }

  get leftQuote(): string {
    return '‘';
  }

  get rightQuote(): string {
    return '’';
  }

  get defaultCustomMessage(): string {
    return "<< Type text in the 'Custom Message' in the left section to see the changes here! >>";
  }

  get defaultRecipientName(): string {
    return `${this.leftQuote}Recipient Name${this.rightQuote}`;
  }

  get defaultSenderName(): string {
    return `${this.leftQuote}Sender Name${this.rightQuote}`;
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
