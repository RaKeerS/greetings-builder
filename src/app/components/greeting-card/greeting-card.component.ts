import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SelectRouterOutlet } from 'src/app/actions/birthday-greetings-actions';
import { GreetingsTemplateCategoryEnum } from 'src/app/enums/greetings-template-enum';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { BirthdayGreetingsState } from 'src/app/store/birthday-greetings-store';
import { BirthdayGreetingsComponent } from 'src/app/templates/greetings/birthday-greetings/birthday-greetings.component';
import { TemplatedummyComponent } from 'src/app/templates/miscellaneous/templatedummy/templatedummy.component';
import { GreetingData, ModalData } from 'src/app/types/modal-types';

@Component({
  selector: 'app-greeting-card',
  templateUrl: './greeting-card.component.html',
  styleUrls: ['./greeting-card.component.css']
})
export class GreetingCardComponent implements OnInit {

  @Select(BirthdayGreetingsState.getCurrentTemplateCategory) currentTemplateCategory$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateType) currentTemplateType$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateId) currentTemplateId$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateDOMString) currentTemplateDOMString$!: Observable<string>;

  public componentInjector!: Injector;

  private subscription: Subscription | undefined;

  public componentName!: any;
  public componentCategory!: string;
  public componentType!: string;
  public componentId!: string;
  public componentDOMString!: string;

  private componentData: unknown;

  public recipientName!: string;
  public customMessage!: string;
  public recipientAddress!: string;
  public recipientAddressCC!: string;
  public recipientAddressBCC: string = '';
  public senderName: string = '';

  constructor(private injector: Injector, private actions$: Actions, private router: ActivatedRoute, private modalTemplateSvc: ModalTemplateService) {
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
      case GreetingsTemplateCategoryEnum['birthday-greetings'] : { // TODO: Need to change the switch case option to 'birthday-greeting' instead of 'greeting-style1' and make new component titled BirthdayGreetings instead of GreetingStyle1Component
        (this.componentData as ModalData<GreetingData>) = {
          inputData: {
            recipientName: this.recipientName,
            customMessage: this.customMessage,
            recipientAddress: this.recipientAddress,
            recipientAddressCC: this.recipientAddressCC,
            recipientAddressBCC: this.recipientAddressBCC,
            senderName: this.senderName
          }
        };
        this.componentType = BirthdayGreetingsComponent.getComponentType(componentType);
        return BirthdayGreetingsComponent.getComponent(componentType);
      }
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
    this.modalTemplateSvc.postTemplateData(this.componentDOMString)
      .subscribe(data => console.log('Success: ', data), error => console.log('Error: ', error));
  }

}
