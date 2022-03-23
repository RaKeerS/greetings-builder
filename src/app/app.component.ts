import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { SelectCategory, SelectRouterOutlet, SetFormDirtyStatus } from './actions/greetings-actions';
import { HelpComponent } from './components/help/help.component';
import { GreetingsState } from './store/greetings-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, DialogService] // This is done since this service is currently needed in just one component, hence it is scoped to be provided in only this component to improve app efficiency
})
export class AppComponent {
  title = 'birthday-greetings';

  ref!: DynamicDialogRef;

  public items: MenuItem[];

  // Currently the 3 declarations below have no intended purpose or use in the code.
  @Select(GreetingsState.getCurrentTemplateCategory) currentTemplateCategory$!: Observable<string>;
  @Select(GreetingsState.getCurrentTemplateType) currentTemplateType$!: Observable<string>;
  @Select(GreetingsState.getCurrentTemplateId) currentTemplateId$!: Observable<number>;
  @Select(GreetingsState.getCurrentRouterOutletName) currentRouterOutletName$!: Observable<string>;

  @ViewChild('customcontainer1') customcontainer1!: ElementRef;
  @ViewChild('customcard1') customcard1!: ElementRef;
  @ViewChild('Cards') Cards!: ElementRef;

  constructor(private primengConfig: PrimeNGConfig, private store: Store, private confirmationService: ConfirmationService,
    private router: Router, private dialogService: DialogService) {
    this.items = [
      {
        label: 'Anime',
        icon: 'pi pi-fw pi-file fs-custom-2',
        // routerLink: this.isFormEdited ? ' ' : 'home', // removing this piece of code as, adding undefined or a whitespace would trigger it to be redirected to '/home', which in turn always triggers the routing module.
        command: () => this.isFormEdited ? this.showConfirmationDialog('anime-greetings') : this.redirectUrl('anime-greetings')
      },
      {
        label: 'Birthday',
        icon: 'pi pi-fw pi-pencil fs-custom-2',
        // routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('birthday-greetings') : this.redirectUrl('birthday-greetings')
      },
      {
        label: 'Best Wishes',
        icon: 'pi pi-fw pi-user fs-custom-2',
        // routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('best-wishes-greetings') : this.redirectUrl('best-wishes-greetings')
      },
      {
        label:'Miscellanous',
        icon:'pi pi-fw pi-star fs-custom-2',
        // routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('miscellanous-greetings') : this.redirectUrl('miscellanous-greetings')
      },
      {
        label:'Check my other projects here!',
        icon:'pi pi-fw pi-github fs-custom-1',
        url: 'https://github.com/RaKeerS'
      }
    ];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.store.dispatch(new SelectRouterOutlet('greetings')); // TODO: Will have to remove this later on, as it is not needed.
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  redirectUrl(category: string): void {
    this.router.navigate(['/home']);
    this.store.dispatch(new SelectCategory(category))
  }

  showHelpDialog() {
    this.ref = this.dialogService.open(
      HelpComponent, {
        header: 'Help Page',
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000,
        dismissableMask: true,
      }
    )
  }

  showConfirmationDialog(category: string): void {
    this.confirmationService.confirm({
        message: 'You will lose all current changes. Are you sure that you want to perform this action?',
        header: 'Confirmation',
        accept: () => {
            //Actual logic to perform a confirmation
            this.store.dispatch(new SelectCategory(category));
            this.router.navigate(['/home']);
            this.store.dispatch(new SetFormDirtyStatus(false));
        }
    });
  }

  get isFormEdited(): boolean {
    return this.store.selectSnapshot(state => state.global.isFormDirty);
  }

  get routerName(): string {
    return this.store.selectSnapshot(state => state.global.currentRouterOutletName);
  }



}
