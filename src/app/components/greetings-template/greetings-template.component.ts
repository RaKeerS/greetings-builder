import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplate } from 'src/app/actions/birthday-greetings-actions';

@Component({
  selector: 'app-greetings-template',
  templateUrl: './greetings-template.component.html',
  styleUrls: ['./greetings-template.component.css']
})
export class GreetingsTemplateComponent implements OnInit {

  public displayDialog: boolean;

  public responsiveOptions: any;

  @Input('templateInfo') templateInfo: any;

  constructor(private store: Store) {
    this.displayDialog = false;
    this.setResponsiveOptions();
   }

  ngOnInit(): void {
    console.log('templateInfo', this.templateInfo);
  }

  private setResponsiveOptions() {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  public get currentTemplateLabel(): string {
    return this.store.selectSnapshot(state => state.global.currentTemplateLabel);
  }

  public get currentTemplateNumber(): string {
    return this.store.selectSnapshot(state => state.global.currentTemplateNumber);
  }

  public doThis() {
    this.store.dispatch(new SelectTemplate('changed', 1));
  }

  public showTemplate() {
    this.displayDialog = true;
  }

}
