import { Action, StateContext } from '@ngxs/store';

import { SelectRouterOutlet, SelectTemplate, SelectTemplateDOMString } from '../actions/birthday-greetings-actions';
import { BirthdayGreetingsModel } from './birthday-greetings-model';

export class BirthdayGreetingsActionsModel {

  @Action(SelectTemplate)
  public selectTemplate(ctx: StateContext<BirthdayGreetingsModel>, payload: SelectTemplate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTemplateCategory: payload.selectedTemplateCategory,
      currentTemplateType: payload.selectedTemplateType,
      currentTemplateId: payload.selectedTemplateId
    });
  }

  @Action(SelectRouterOutlet)
  public selectRouterOutlet(ctx: StateContext<BirthdayGreetingsModel>, payload: SelectRouterOutlet) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentRouterOutletName: payload.selectedRouterOutlet
    });
  }

  @Action(SelectTemplateDOMString)
  public selectTemplateDOMString(ctx: StateContext<BirthdayGreetingsModel>, payload: SelectTemplateDOMString) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTemplateDOMString: payload.selectTemplateDOMString
    });
  }
}
