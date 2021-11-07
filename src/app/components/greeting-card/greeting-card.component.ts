import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SelectRouterOutlet } from 'src/app/actions/birthday-greetings-actions';
import { BirthdayGreetingsEnum } from 'src/app/enums/birthday-greetings-enum';
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

  @Select(BirthdayGreetingsState.getCurrentTemplateLabel) currentTemplateLabel$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateNumber) currentTemplateNumber$!: Observable<string>;

  public componentInjector!: Injector;

  private subscription: Subscription | undefined;

  public componentLabel!: any;
  public componentNumber!: string;

  private componentData: unknown;

  constructor(private injector: Injector, private actions$: Actions, private router: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.subscribe();
    //  this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public subscribe() {
    // this.currentTemplateLabel$.subscribe(value => this.componentLabel = this.getComponent(value));
    this.subscription = this.currentTemplateLabel$.subscribe(value => this.initializeComponent(value));
    this.subscription = this.currentTemplateNumber$.subscribe(value => this.componentNumber = value);
    this.subscription = this.router.firstChild?.params.subscribe((params: Params) => this.initializeComponent(params.id));
    // this.refreshRouterOutlet();
  }

  private getComponent(componentLabel: string) {
    const componentLabelValue = isNaN(Number(componentLabel)) ? (<any>BirthdayGreetingsEnum)[componentLabel] : componentLabel;
    switch(componentLabelValue) {
      case 'dummy' : return TemplatedummyComponent;
      case '1' : { // TODO: Need to change the switch case option to 'birthday-greeting' instead of 'greeting-style1' and make new component titled BirthdayGreetings instead of GreetingStyle1Component
        (this.componentData as ModalData<GreetingData>) = {
          inputData: {
            name: 'Sree',
            message: 'Test Message',
            sender: 'Srikar'
          }
        };
        return BirthdayGreetingsComponent;
      }
      default: return TemplatedummyComponent;
    }
  }

  private initializeComponent(componentLabel: string) {
    this.componentLabel = this.getComponent(componentLabel);
    this.componentInjector = Injector.create({ providers: [{ provide: ModalData, useClass: ModalData, useValue: this.componentData }], parent: this.injector });
  }

  private refreshRouterOutlet() {
    this.actions$.pipe()
    this.actions$.pipe(ofActionDispatched(SelectRouterOutlet)).subscribe(payload => this.initializeComponent(payload.selectedRouterOutletId));
  }

}
