import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplateDOMString } from 'src/app/actions/greetings-actions';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-bg-template1',
  templateUrl: './bg-template1.component.html',
  styleUrls: ['./bg-template1.component.css']
})
export class BgTemplate1Component implements OnInit {

  public recipientName: string;
  public senderName: string;

  public imageUrl1: string = '../../../../../assets/greetings/birthday-greetings/bg-template1/images/36441502442545607.jpg';
  public imageUrl2: string = '../../../../../assets/greetings/birthday-greetings/bg-template1/images/27021502445622301.jpg';
  public imageUrl3: string = '../../../../../assets/greetings/birthday-greetings/bg-template1/images/77061502445629778.jpg';

  private imageData: Array<object> = [];

  public domTemplateString: string = '';

  @ViewChild('greetingTemplate') greetingTemplate!: ElementRef;

  constructor(public modalData: ModalData<GreetingData>, private store: Store, private modalSvc: ModalTemplateService) {
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


    // domTemplateString = this.processImageTemplate(domTemplateString, this.imageUrl2);
    // domTemplateString = this.processImageTemplate(domTemplateString, this.imageUrl3);
  }

  // private processImageTemplate(domTemplateString: string, imageUrl: string) {
  //   return this.storeImageData(domTemplateString, imageUrl);
  // }

  private storeImageData(imageUrl: string) {
    this.modalSvc.toDataURL(imageUrl)
      .then(response => {
        const imageBase64String = response?.toString() ?? '';
        // this.imageData = [...this.imageData, JSON.parse(`{ "${imageLabel}": "${imageBase64String}" }`)]
        // this.imageData.push(JSON.parse(`{ "${imageLabel}": "${imageBase64String}", "output": "" }`));

        // this.store.dispatch(new StoreImageData(this.imageData))

        this.domTemplateString = this.domTemplateString.replace(imageUrl, imageBase64String);

        this.store.dispatch(new SelectTemplateDOMString(this.domTemplateString));
    });
  }

}
