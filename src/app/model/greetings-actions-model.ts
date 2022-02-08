import { Action, StateContext } from '@ngxs/store';

import {
  SelectCategory,
  SelectRouterOutlet,
  SelectTemplate,
  SelectTemplateDOMString,
  SetFormDirtyStatus,
} from '../actions/greetings-actions';
import { GreetingsModel } from './greetings-model';

export class GreetingsActionsModel {

  @Action(SelectTemplate)
  public selectTemplate(ctx: StateContext<GreetingsModel>, payload: SelectTemplate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTemplateCategory: payload.selectedTemplateCategory,
      currentTemplateType: payload.selectedTemplateType,
      currentTemplateId: payload.selectedTemplateId
    });
  }

  @Action(SelectRouterOutlet)
  public selectRouterOutlet(ctx: StateContext<GreetingsModel>, payload: SelectRouterOutlet) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentRouterOutletName: payload.selectedRouterOutlet
    });
  }

  @Action(SelectTemplateDOMString)
  public selectTemplateDOMString(ctx: StateContext<GreetingsModel>, payload: SelectTemplateDOMString) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTemplateDOMString: payload.selectedTemplateDOMString
    });
  }

  @Action(SelectCategory)
  public selectCategory(ctx: StateContext<GreetingsModel>, payload: SelectCategory) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentTemplateCategory: payload.selectedCategory
    })
  }

  @Action(SetFormDirtyStatus)
  public setFormDirtyStatus(ctx: StateContext<GreetingsModel>, payload: SetFormDirtyStatus) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isFormDirty: payload.setFormDirtyStatus
    })
  }

}
