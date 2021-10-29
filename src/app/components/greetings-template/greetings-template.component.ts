import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectTemplate } from 'src/app/actions/birthday-greetings-actions';

@Component({
  selector: 'app-greetings-template',
  templateUrl: './greetings-template.component.html',
  styleUrls: ['./greetings-template.component.css']
})
export class GreetingsTemplateComponent implements OnInit {

  public displayDialog: boolean;

  constructor(private store: Store) {
    this.displayDialog = false;
   }

  ngOnInit(): void {
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
