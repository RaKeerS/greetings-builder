import { TemplatePresetMessageType } from '../types/modal-types';

export interface GreetingsModel {
  currentTemplateCategory: string;
  currentTemplateDOMString: string,
  currentTemplateId: number;
  currentTemplatePresetMessages: TemplatePresetMessageType[],
  currentTemplateType: string;
  currentRouterOutletName: string,
  isEdit: boolean;
  isSaved: boolean;
  isFormDirty: boolean;
}
