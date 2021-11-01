import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

import { BirthdayGreetingsActionsModel } from '../model/birthday-greetings-actions-model';
import { BirthdayGreetingsModel } from '../model/birthday-greetings-model';

@State<BirthdayGreetingsModel>({
  name: 'global',
  defaults: {
    currentTemplateLabel: 'initial ',
    currentTemplateNumber: 0,
    currentRouterOutletName: ' ',
    isEdit: false,
    isSaved: false
  }
})
@Injectable() // 'BirthdayGreetingsState' class should be decorated with @Injectable() right after the @State() decorator
export class BirthdayGreetingsState extends BirthdayGreetingsActionsModel {

  @Selector()
  static getCurrentTemplateLabel(state: BirthdayGreetingsModel): string {
    return state.currentTemplateLabel;
  }

  @Selector()
  static getCurrentTemplateNumber(state: BirthdayGreetingsModel): number {
    return state.currentTemplateNumber;
  }

  @Selector()
  static getCurrentRouterOutletName(state: BirthdayGreetingsModel): string {
    return state.currentRouterOutletName;
  }

  // @Action(SelectTemplate)
  // public selectTemplate(ctx: StateContext<BirthdayGreetingsModel>, payload: SelectTemplate) {
  //   const state = ctx.getState();
  //   ctx.setState({
  //     ...state,
  //     currentTemplateLabel: payload.selectedTemplateLabel,
  //     currentTemplateNumber: payload.selectedTemplateNumber
  //   });
  // }

}
