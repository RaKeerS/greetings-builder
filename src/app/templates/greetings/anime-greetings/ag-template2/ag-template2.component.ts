import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString, StoreImageData } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-ag-template2',
  templateUrl: './ag-template2.component.html',
  styleUrls: ['./ag-template2.component.css']
})
export class AgTemplate2Component implements OnInit {

  public customMessage: string;
  public recipientName: string;
  public senderName: string;

  public imageUrl1: string = '../../../../../assets/greetings/anime-greetings/ag-template2/images/Pain-1-Wallpaper.jpg';

  private imageData: Array<object> = [];

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

    let domTemplateString = this.greetingTemplate.nativeElement.outerHTML;

    // Replace all file paths with template handlers. Call the below function multiple times in case of multiple images.
    domTemplateString = this.processImageTemplate(domTemplateString, this.imageUrl1, 'imageUrl1');

    this.store.dispatch(new SelectTemplateDOMString(domTemplateString));
  }

  private processImageTemplate(domTemplateString: string, imageUrl: string, imageLabel: string) {
    this.storeImageData(imageUrl);
    return domTemplateString.replace(imageUrl, `{{${imageLabel}}}`);
  }

  private storeImageData(imageUrl: string) {
    this.modalSvc.toDataURL(imageUrl)
      .then(response => {
        this.storeImage(response, imageUrl);
    });
  }

  private storeImage(response: any, imageUrl: string) {
    const imageBase64String = response?.toString() ?? '';
    this.imageData.push({ imageUrl: imageBase64String, output: '' });
    this.store.dispatch(new StoreImageData(this.imageData))
  }

}

