import { Component, Injector, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BirthdayGreetingsState } from 'src/app/store/birthday-greetings-store';
import { TemplatedummyComponent } from 'src/app/templates/miscellaneous/templatedummy/templatedummy.component';

@Component({
  selector: 'app-greeting-card',
  templateUrl: './greeting-card.component.html',
  styleUrls: ['./greeting-card.component.css']
})
export class GreetingCardComponent implements OnInit {

  @Select(BirthdayGreetingsState.getCurrentTemplateLabel) currentTemplateLabel$!: Observable<string>;
  @Select(BirthdayGreetingsState.getCurrentTemplateNumber) currentTemplateNumber$!: Observable<string>;

  public componentLabel!: any;
  public componentNumber!: string;

  public componentInjector!: Injector;

  constructor(private injector: Injector) {
   this.subscribe();
   this.initializeComponent();
   }

  ngOnInit(): void {
  }

  public subscribe() {
    this.currentTemplateLabel$.subscribe(value => this.componentLabel = this.getComponent(value));
    this.currentTemplateNumber$.subscribe(value => this.componentNumber = value);
  }

  private getComponent(componentLabel: string) {
    switch(componentLabel) {
      case 'dummy' : return TemplatedummyComponent;
      default: return TemplatedummyComponent;
    }
  }

  private initializeComponent() {
    const tempValue = 'abc';
    this.componentInjector = Injector.create({ providers: [{ provide: this.componentLabel, useClass: this.componentLabel, useValue: tempValue }], parent: this.injector });
  }

}
