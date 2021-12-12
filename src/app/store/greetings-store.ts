import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

import { GreetingsActionsModel } from '../model/greetings-actions-model';
import { GreetingsModel } from '../model/greetings-model';

@State<GreetingsModel>({
  name: 'global',
  defaults: {
    currentTemplateCategory: 'initial ',
    currentTemplateType: 'type ',
    currentTemplateId: 0,
    currentRouterOutletName: ' ',
    currentTemplateDOMString: ' ',
    isEdit: false,
    isSaved: false,
    imageData: []
  }
})
@Injectable() // 'BirthdayGreetingsState' class should be decorated with @Injectable() right after the @State() decorator
export class GreetingsState extends GreetingsActionsModel {

  @Selector()
  static getCurrentTemplateCategory(state: GreetingsModel): string {
    return state.currentTemplateCategory;
  }

  @Selector()
  static getCurrentTemplateType(state: GreetingsModel): string {
    return state.currentTemplateType;
  }

  @Selector()
  static getCurrentTemplateId(state: GreetingsModel): number {
    return state.currentTemplateId;
  }

  @Selector()
  static getCurrentRouterOutletName(state: GreetingsModel): string {
    return state.currentRouterOutletName;
  }

  @Selector()
  static getCurrentTemplateDOMString(state: GreetingsModel): string {
    return state.currentTemplateDOMString;
  }

  @Selector()
  static getImageData(state: GreetingsModel): Array<object> {
    return state.imageData;
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
