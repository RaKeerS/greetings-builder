import { TemplatePresetMessageType } from '../types/modal-types';

export class SelectTemplate {
  static readonly type = '[Main Page] Select Template';
  constructor(public selectedTemplateCategory: string, public selectedTemplateType: string, public selectedTemplateId: number) { }
}

export class SelectRouterOutlet {
  static readonly type = '[Main Page] Select Router Outlet';
  constructor(public selectedRouterOutlet: string, public selectedRouterOutletId?: number) {}
}
export class SelectTemplateDOMString {
  static readonly type = '[Main Page] Select Template DOM String';
  constructor(public selectedTemplateDOMString: string) {}
}

export class SelectCategory {
  static readonly type = '[Main Page] Select Category';
  constructor(public selectedCategory: string) {}
}

export class SetFormDirtyStatus {
  static readonly type = '[Main Page] Set Form Status';
  constructor(public setFormDirtyStatus: boolean) {}
}

export class SetTemplatePresetMessages {
  static readonly type = '[Template Page] Set Template Preset Messages';
  constructor(public setTemplatePresetMessages: TemplatePresetMessageType[]) {}
}
