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

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store, private modalSvc: ModalTemplateService) {
    this.customMessage = this.modalData.inputData?.customMessage!;
    this.recipientName = this.modalData.inputData?.recipientName!;
    this.senderName = this.modalData.inputData?.senderName || '';
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const tempDom: any = document.getElementById('greetingTemplate');
    tempDom.style.overflow = 'unset';

    // this.store.dispatch(new SelectTemplateDOMString(this.greetingTemplate.nativeElement.outerHTML));
    // this.toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0');

    this.storeImageData();

    // Replace all file paths with template handlers
    const domTemplateString = this.greetingTemplate.nativeElement.outerHTML.replace(this.imageUrl1, '{{imageUrl1}}');
    this.store.dispatch(new SelectTemplateDOMString(domTemplateString));
  }

  private storeImageData() {
    this.modalSvc.toDataURL(this.imageUrl1)
    .then(response => {
      this.storeImage(response);
    });
  }

  private storeImage(response: any ) {
    const imageUrl = response?.toString() ?? '';
    let imageData: Array<object> = [];
    imageData.push({ imageUrl1: imageUrl, output: '' });
    this.store.dispatch(new StoreImageData(imageData))
  }

}

