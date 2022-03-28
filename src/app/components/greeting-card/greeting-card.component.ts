import { Component, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import * as download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { SelectRouterOutlet, SetFormDirtyStatus } from 'src/app/actions/greetings-actions';
import { GreetingsTemplateCategoryEnum } from 'src/app/enums/greetings-template-enum';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingsState } from 'src/app/store/greetings-store';
import { TemplatedummyComponent } from 'src/app/templates/dummy/templatedummy/templatedummy.component';
import { AnimeGreetingsComponent } from 'src/app/templates/greetings/anime-greetings/anime-greetings.component';
import {
  BestWishesGreetingsComponent,
} from 'src/app/templates/greetings/best-wishes-greetings/best-wishes-greetings.component';
import { BirthdayGreetingsComponent } from 'src/app/templates/greetings/birthday-greetings/birthday-greetings.component';
import {
  MiscellanousGreetingsComponent,
} from 'src/app/templates/greetings/miscellanous-greetings/miscellanous-greetings.component';
import { GreetingData, ModalData, TemplatePresetMessageType } from 'src/app/types/modal-types';

import { HelpComponent } from '../help/help.component';

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
  @Select(GreetingsState.getCurrentTemplatePresetMessages) currentTemplatePresetMessages$!: Observable<TemplatePresetMessageType[]>;

  @ViewChild('greetingCardForm') greetingCardForm!: NgForm;

  public componentInjector!: Injector;

  private subscription: Subscription | undefined;

  public componentName!: any;
  public componentCategory!: string;
  public componentType!: string;
  public componentId!: string;
  public componentDOMString!: string;
  public componentTemplatePresetMessages!: TemplatePresetMessageType[];

  private componentData: unknown;

  public emailSubject!: string;
  public recipientName!: string;
  public customMessage: string = '';
  public recipientAddress!: string[];
  public recipientAddressCC: string[] = [];
  public recipientAddressBCC: string[] = [];
  public ref!: DynamicDialogRef;
  public senderAddress!: string;
  public senderName: string = '';
  public selectedTemplatePresetMessage!: TemplatePresetMessageType;
  public enableRecipientName: boolean = true;
  public enableSenderName: boolean = true;
  public enableCustomMessage: boolean = true;

  constructor(private injector: Injector, private actions$: Actions,
    private router: ActivatedRoute, private modalTemplateSvc: ModalTemplateService,
    private toastr: ToastrService, private store: Store,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('keyup')
  onInputKeyDown() {
    this.initializeComponent(this.componentCategory, this.componentType);
    this.store.dispatch(new SetFormDirtyStatus(this.greetingCardForm.form.dirty));
  }

  public subscribe() {
    this.subscription = this.currentTemplateType$.subscribe(value => this.componentType = value);
    this.subscription = this.currentTemplateCategory$.subscribe(value => this.initializeComponent(value, this.componentType));
    this.subscription = this.currentTemplateId$.subscribe(value => this.componentId = value);
    this.subscription = this.currentTemplateDOMString$.subscribe(value => this.componentDOMString = value);
    this.subscription = this.currentTemplatePresetMessages$.subscribe(value => this.componentTemplatePresetMessages = value);

    let urlSegment: string;
    this.subscription = this.router.firstChild?.url.subscribe(value => urlSegment = value[0].toString());
    this.subscription = this.router.firstChild?.params.subscribe((params: Params) => this.initializeComponent(urlSegment, params.id));
  }

  private getComponent(componentCategory: GreetingsTemplateCategoryEnum, componentType: string) {
    (this.componentData as ModalData<GreetingData>) = {
      inputData: {
        emailSubject: this.emailSubject,
        recipientName: this.recipientName,
        customMessage: this.customMessage,
        recipientAddress: this.recipientAddress,
        recipientAddressCC: this.recipientAddressCC,
        recipientAddressBCC: this.recipientAddressBCC,
        senderAddress: this.senderAddress,
        senderName: this.senderName,
        selectedTemplatePresetMessage: this.selectedTemplatePresetMessage,
        enableRecipientName: this.enableRecipientName,
        enableSenderName: this.enableSenderName,
        enableCustomMessage: this.enableCustomMessage,
      }
    };

    switch(componentCategory) {
      case GreetingsTemplateCategoryEnum['anime-greetings'] : {
        this.componentType = AnimeGreetingsComponent.getComponentType(componentType);
        return AnimeGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum['birthday-greetings'] : {
        this.componentType = BirthdayGreetingsComponent.getComponentType(componentType);
        return BirthdayGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum['best-wishes-greetings'] : {
        this.componentType = BestWishesGreetingsComponent.getComponentType(componentType);
        return BestWishesGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum['miscellanous-greetings'] : {
        this.componentType = MiscellanousGreetingsComponent.getComponentType(componentType);
        return MiscellanousGreetingsComponent.getComponent(componentType);
      };
      case GreetingsTemplateCategoryEnum.dummy : return TemplatedummyComponent;
      default:
        this.componentType = TemplatedummyComponent.getComponentType(componentType);
        return TemplatedummyComponent.getComponent(componentType);
    }
  }

  private initializeComponent(componentCategory: string, componentType: string): void {
    this.componentCategory = componentCategory;
    this.componentName = this.getComponent((<any>GreetingsTemplateCategoryEnum)[componentCategory], componentType);
    this.componentInjector = Injector.create({ providers: [{ provide: ModalData, useClass: ModalData, useValue: this.componentData }], parent: this.injector });
  }

  private refreshRouterOutlet() {
    this.actions$.pipe()
    this.actions$.pipe(ofActionDispatched(SelectRouterOutlet)).subscribe(payload => this.initializeComponent(payload.selectedRouterOutletId, this.componentType));
  }

  public submitTemplateDetails() {
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
    const tempDom: any = document.getElementById('greetingTemplate');
    tempDom.style.overflow = 'unset';

    htmlToImage.toPng<any>(tempDom)
    .then((dataUrl) => {
      let date = new Date();
      download(dataUrl, `output-image-${date.getTime()}.png`);
      this.toastr.info('Please check your browser\'s download section', 'Info');
      tempDom.style.overflow = 'auto';
    }, error => this.toastr.error(error, 'Error'));
  }

  showHelpDialog() {
    this.ref = this.dialogService.open(
      HelpComponent, {
        header: 'Help Page',
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
      }
    )
  }

}
