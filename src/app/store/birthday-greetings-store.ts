import { Selector, State } from "@ngxs/store";
import { BirthdayGreetingsActionsModel } from "../model/birthday-greetings-actions-model";
import { BirthdayGreetingsModel } from "../model/birthday-greetings-model";

@State<BirthdayGreetingsModel>({
  name: 'global',
  defaults: {
    currentTemplateLabel: 'initial ',
    currentTemplateNumber: 0,
    isEdit: false,
    isSaved: false
  }
})
export class BirthdayGreetingsState extends BirthdayGreetingsActionsModel {

  @Selector()
  static getCurrentTemplateLabel(state: BirthdayGreetingsModel): string {
    return state.currentTemplateLabel;
  }

  @Selector()
  static getCurrentTemplateNumber(state: BirthdayGreetingsModel): number {
    return state.currentTemplateNumber;
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
