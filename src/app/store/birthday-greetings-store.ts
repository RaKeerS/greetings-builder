import { Selector, State } from "@ngxs/store";
import { BirthdayGreetingsModel } from "../model/birthday-greetings-model";

@State<BirthdayGreetingsModel>({
  name: 'global',
  defaults: {
    currentTemplateLabel: 'initial',
    currentTemplateNumber: 0,
    isEdit: false,
    isSaved: false
  }
})
export class BirthdayGreetingsState {

  @Selector()
  static getCurrentTemplateLabel(state: BirthdayGreetingsModel): string {
    return state.currentTemplateLabel;
  }

  @Selector()
  static getCurrentTemplateNumber(state: BirthdayGreetingsModel): number {
    return state.currentTemplateNumber;
  }

}
