import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

import { BirthdayGreetingsActionsModel } from '../model/birthday-greetings-actions-model';
import { BirthdayGreetingsModel } from '../model/birthday-greetings-model';

@State<BirthdayGreetingsModel>({
  name: 'global',
  defaults: {
    currentTemplateCategory: 'initial ',
    currentTemplateType: 'type ',
    currentTemplateId: 0,
    currentRouterOutletName: ' ',
    currentTemplateDOMString: ' ',
    isEdit: false,
    isSaved: false
  }
})
@Injectable() // 'BirthdayGreetingsState' class should be decorated with @Injectable() right after the @State() decorator
export class BirthdayGreetingsState extends BirthdayGreetingsActionsModel {

  @Selector()
  static getCurrentTemplateCategory(state: BirthdayGreetingsModel): string {
    return state.currentTemplateCategory;
  }

  @Selector()
  static getCurrentTemplateType(state: BirthdayGreetingsModel): string {
    return state.currentTemplateType;
  }

  @Selector()
  static getCurrentTemplateId(state: BirthdayGreetingsModel): number {
    return state.currentTemplateId;
  }

  @Selector()
  static getCurrentRouterOutletName(state: BirthdayGreetingsModel): string {
    return state.currentRouterOutletName;
  }

  @Selector()
  static getCurrentTemplateDOMString(state: BirthdayGreetingsModel): string {
    return state.currentTemplateDOMString;
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
