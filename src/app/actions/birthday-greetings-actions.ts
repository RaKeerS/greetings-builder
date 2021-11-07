export class SelectTemplate {
  static readonly type = '[Main Page] Select Template';
  constructor(public selectedTemplateLabel: string, public selectedTemplateNumber: number) {

  }
}

export class SelectRouterOutlet {
  static readonly type = '[Main Page] Select Router Outlet';
  constructor(public selectedRouterOutlet: string, public selectedRouterOutletId?: number) {}
}
