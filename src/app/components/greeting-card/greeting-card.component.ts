import { Component, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import * as download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { SelectRouterOutlet, SetFormDirtyStatus } from 'src/app/actions/greetings-actions';
import { GreetingsTemplateCategoryEnum } from 'src/app/enums/greetings-template-enum';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingsState } from 'src/app/store/greetings-store';
import { AnimeGreetingsComponent } from 'src/app/templates/greetings/anime-greetings/anime-greetings.component';
import {
  BestWishesGreetingsComponent,
} from 'src/app/templates/greetings/best-wishes-greetings/best-wishes-greetings.component';
import { BirthdayGreetingsComponent } from 'src/app/templates/greetings/birthday-greetings/birthday-greetings.component';
import {
  MiscellanousGreetingsComponent,
} from 'src/app/templates/greetings/miscellanous-greetings/miscellanous-greetings.component';
import { TemplatedummyComponent } from 'src/app/templates/miscellaneous/templatedummy/templatedummy.component';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-greeting-card',
  templateUrl: './greeting-card.component.html',
  styleUrls: ['./greeting-card.component.css']
})
export class GreetingCardComponent implements OnInit {

  @Select(GreetingsState.getCurrentTemplateCategory) currentTemplateCategory$!: Observable<string>;
  @Select(GreetingsState.getCurrentTemplateType) currentTemplateType$!: Observable<string>;
  @Select(GreetingsState.getCurrentTemplateId) currentTemplateId$!: Observable<string>;
  @Select(GreetingsState.getCurrentTemplateDOMString) currentTemplateDOMString$!: Observable<string>;

  @ViewChild('greetingCardForm') greetingCardForm!: NgForm;

  public componentInjector!: Injector;

  private subscription: Subscription | undefined;

  public componentName!: any;
  public componentCategory!: string;
  public componentType!: string;
  public componentId!: string;
  public componentDOMString!: string;

  private componentData: unknown;

  public emailSubject!: string;
  public recipientName!: string;
  public customMessage: string = '';
  public recipientAddress!: string[];
  public recipientAddressCC: string[] = [];
  public recipientAddressBCC: string[] = [];
  public senderAddress!: string;
  public senderName: string = '';

  constructor(private injector: Injector, private actions$: Actions,
    private router: ActivatedRoute, private modalTemplateSvc: ModalTemplateService,
    private toastr: ToastrService, private store: Store) {
  }

  ngOnInit(): void {
    this.subscribe();
    //  this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('keyup')
  onInputKeyDown(event: KeyboardEvent) {
    this.initializeComponent(this.componentCategory, this.componentType);
    // console.log('this.greetingCardForm.form.dirty: ', this.greetingCardForm.form.dirty);
    this.store.dispatch(new SetFormDirtyStatus(this.greetingCardForm.form.dirty));
  }

  public subscribe() {
    // this.currentTemplateLabel$.subscribe(value => this.componentLabel = this.getComponent(value));
    this.subscription = this.currentTemplateType$.subscribe(value => this.componentType = value);
    this.subscription = this.currentTemplateCategory$.subscribe(value => this.initializeComponent(value, this.componentType));
    this.subscription = this.currentTemplateId$.subscribe(value => this.componentId = value);
    this.subscription = this.currentTemplateDOMString$.subscribe(value => this.componentDOMString = value);

    let urlSegment: string;
    this.subscription = this.router.firstChild?.url.subscribe(value => urlSegment = value[0].toString());
    this.subscription = this.router.firstChild?.params.subscribe((params: Params) => this.initializeComponent(urlSegment, params.id));
    // this.refreshRouterOutlet();
  }

  private getComponent(componentCategory: GreetingsTemplateCategoryEnum, componentType: string) {
    // const componentCategoryValue = isNaN(Number(componentCategory)) ? (<any>GreetingsTemplateEnum)[componentCategory] : componentCategory;
    switch(componentCategory) {
      case GreetingsTemplateCategoryEnum.dummy : return TemplatedummyComponent;
      case GreetingsTemplateCategoryEnum['anime-greetings'] : {
        (this.componentData as ModalData<GreetingData>) = {
          inputData: {
            emailSubject: this.emailSubject,
            recipientName: this.recipientName,
            customMessage: this.customMessage,
            recipientAddress: this.recipientAddress,
            recipientAddressCC: this.recipientAddressCC,
            recipientAddressBCC: this.recipientAddressBCC,
            senderAddress: this.senderAddress,
            senderName: this.senderName
          }
        };
        this.componentType = AnimeGreetingsComponent.getComponentType(componentType);
        return AnimeGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum['birthday-greetings'] : { // TODO: Need to change the switch case option to 'birthday-greeting' instead of 'greeting-style1' and make new component titled BirthdayGreetings instead of GreetingStyle1Component
        (this.componentData as ModalData<GreetingData>) = {
          inputData: {
            emailSubject: this.emailSubject,
            recipientName: this.recipientName,
            customMessage: this.customMessage,
            recipientAddress: this.recipientAddress,
            recipientAddressCC: this.recipientAddressCC,
            recipientAddressBCC: this.recipientAddressBCC,
            senderAddress: this.senderAddress,
            senderName: this.senderName
          }
        };
        this.componentType = BirthdayGreetingsComponent.getComponentType(componentType);
        return BirthdayGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum['best-wishes-greetings'] : {
        (this.componentData as ModalData<GreetingData>) = {
          inputData: {
            emailSubject: this.emailSubject,
            recipientName: this.recipientName,
            customMessage: this.customMessage,
            recipientAddress: this.recipientAddress,
            recipientAddressCC: this.recipientAddressCC,
            recipientAddressBCC: this.recipientAddressBCC,
            senderAddress: this.senderAddress,
            senderName: this.senderName
          }
        };
        this.componentType = BestWishesGreetingsComponent.getComponentType(componentType);
        return BestWishesGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum['miscellanous-greetings'] : {
        (this.componentData as ModalData<GreetingData>) = {
          inputData: {
            emailSubject: this.emailSubject,
            recipientName: this.recipientName,
            customMessage: this.customMessage,
            recipientAddress: this.recipientAddress,
            recipientAddressCC: this.recipientAddressCC,
            recipientAddressBCC: this.recipientAddressBCC,
            senderAddress: this.senderAddress,
            senderName: this.senderName
          }
        };
        this.componentType = MiscellanousGreetingsComponent.getComponentType(componentType);
        return MiscellanousGreetingsComponent.getComponent(componentType);
      };
      default:
        this.componentType = TemplatedummyComponent.getComponentType(componentType);
        return TemplatedummyComponent.getComponent(componentType);
    }
  }

  private initializeComponent(componentCategory: string, componentType: string) {
    this.componentCategory = componentCategory;
    // this.componentType = componentType;
    this.componentName = this.getComponent((<any>GreetingsTemplateCategoryEnum)[componentCategory], componentType);
    this.componentInjector = Injector.create({ providers: [{ provide: ModalData, useClass: ModalData, useValue: this.componentData }], parent: this.injector });
  }

  private refreshRouterOutlet() {
    this.actions$.pipe()
    this.actions$.pipe(ofActionDispatched(SelectRouterOutlet)).subscribe(payload => this.initializeComponent(payload.selectedRouterOutletId, this.componentType));
  }

  public submitTemplateDetails() {
    // this.initializeComponent(this.componentCategory, this.componentType);
    this.getComponent((<any>GreetingsTemplateCategoryEnum)[this.componentCategory], this.componentType);
    const requestBody = {
      params: (this.componentData as ModalData<GreetingData>).inputData,
      payload: this.componentDOMString,
    }
    this.modalTemplateSvc.postTemplateData(requestBody)
      .subscribe(response => this.toastr.success(response.success, 'Success'), err => this.toastr.error(err.error, 'Error'));
    this.toastr.info('Sending Email, Please Wait...', 'Info')
  }

  public downloadTemplate() {
    // import * as htmlToImage from 'html-to-image';
  // let htmlToImage = require('html-to-image');

    // console.log('Inside html-to-image: ', domElement);

    console.log('greetingTemplate: ', document.getElementById('greetingTemplate'));

    const tempDom: any = document.getElementById('greetingTemplate');
    tempDom.style.overflow = 'unset';

    htmlToImage.toPng<any>(tempDom)
    .then((dataUrl) => {
      console.log('Inside html-to-image: ', dataUrl);
      let date = new Date();
      download(dataUrl, `output-image-${date.getTime()}.png`);
      this.toastr.info('Please check your browser\'s download section', 'Info');
      tempDom.style.overflow = 'auto';
    }, error => this.toastr.error(error, 'Error'));
  }

}
