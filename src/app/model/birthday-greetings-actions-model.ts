import { Action, StateContext } from '@ngxs/store';

import { SelectRouterOutlet, SelectTemplate } from '../actions/birthday-greetings-actions';
import { BirthdayGreetingsModel } from './birthday-greetings-model';

export class BirthdayGreetingsActionsModel {

  @Action(SelectTemplate)
  public selectTemplate(ctx: StateContext<BirthdayGreetingsModel>, payload: SelectTemplate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTemplateLabel: payload.selectedTemplateLabel,
      currentTemplateNumber: payload.selectedTemplateNumber
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
}
