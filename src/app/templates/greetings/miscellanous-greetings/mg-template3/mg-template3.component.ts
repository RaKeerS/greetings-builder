import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString, SetTemplatePresetMessages } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData, TemplatePresetMessageType } from 'src/app/types/modal-types';

@Component({
  selector: 'app-mg-template3',
  templateUrl: './mg-template3.component.html',
  styleUrls: ['./mg-template3.component.css']
})
export class MgTemplate3Component implements OnInit {

  private imageUrl1: string = './../../assets/greetings/miscellanous-greetings/mg-template3/images/travel-image.png';
  private templatePresetMessagesUrl: string = '../../../assets/greetings/miscellanous-greetings/mg-template3/template-preset-messages/mg-template3-preset-messages.json';

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  public enableRecipientName: boolean = true;
  public enableSenderName: boolean = true;
  public enableCustomMessage: boolean = true;

  public templatePresetMessage: TemplatePresetMessageType;

  public domTemplateString: string = '';

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store, private modalSvc: ModalTemplateService) {
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.senderName = this.modalData.inputData?.senderName || '';
    this.enableRecipientName = this.modalData.inputData?.enableRecipientName!;
    this.enableSenderName = this.modalData.inputData?.enableSenderName!;
    this.enableCustomMessage = this.modalData.inputData?.enableCustomMessage!;
    this.templatePresetMessage = this.modalData.inputData?.selectedTemplatePresetMessage!;
   }

  ngOnInit(): void {
    this.fetchTemplatePresetMessages();
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
    return this.templatePresetMessage?.message ?? "<< Type text in the 'Custom Message' in the left section to see the changes here! >>";
  }

  get defaultRecipientName(): string {
    return `${this.leftQuote}Recipient Name${this.rightQuote}`;
  }

  get defaultSenderName(): string {
    return `${this.leftQuote}Sender Name${this.rightQuote}`;
  }

  private storeImageData(imageUrl: string): void {
    this.modalSvc.toDataURL(imageUrl)
      .then(response => {
        const imageBase64String = response?.toString() ?? '';

        this.domTemplateString = this.domTemplateString.replace(imageUrl, imageBase64String);

        this.store.dispatch(new SelectTemplateDOMString(this.domTemplateString));
    });
  }

  private fetchTemplatePresetMessages(): void {
    this.modalSvc.fetchTemplatePresetMessages(this.templatePresetMessagesUrl)
      .then(data => this.store.dispatch(new SetTemplatePresetMessages(data)));
  }

}
