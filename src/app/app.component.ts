import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';

import { SelectCategory, SelectRouterOutlet, SetFormDirtyStatus } from './actions/greetings-actions';
import { GreetingsState } from './store/greetings-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService] // This is done since this service is currently needed in just one component, hence it is scoped to be provided in only this component to improve app efficiency
})
export class AppComponent {
  title = 'birthday-greetings';

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
    private router: Router) {
    this.items = [
      {
        label: 'Anime',
        icon: 'pi pi-fw pi-file',
        routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('anime-greetings') : this.store.dispatch(new SelectCategory('anime-greetings'))
      },
      {
        label: 'Birthday',
        icon: 'pi pi-fw pi-pencil',
        routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('birthday-greetings') : this.store.dispatch(new SelectCategory('birthday-greetings'))
      },
      {
        label: 'Best Wishes',
        icon: 'pi pi-fw pi-user',
        routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('best-wishes-greetings') : this.store.dispatch(new SelectCategory('best-wishes-greetings'))
      },
      {
        label:'Miscellanous',
        icon:'pi pi-fw pi-star',
        routerLink: this.isFormEdited ? undefined : 'home',
        command: () => this.isFormEdited ? this.showConfirmationDialog('miscellanous-greetings') : this.store.dispatch(new SelectCategory('miscellanous-greetings'))
      },
      {
        label:'Quit',
        icon:'pi pi-fw pi-power-off'
      }
    ];

    // this.tempLabel = this.store.select(state => state.global.currentTemplateLabel);
    // this.tempLabel = this.store.selectSnapshot(state => state.global.currentTemplateLabel);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.store.dispatch(new SelectRouterOutlet('greetings')); // TODO: Will have to remove this later on, as it is not needed.
  }

  ngAfterViewInit() {
    // let abc = Math.floor(this.customcontainer1.nativeElement.clientWidth / this.customcard1.nativeElement.clientWidth);
    // let bbc = this.Cards;
  }

  showConfirmationDialog(category: string) {
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

  get containerWidth(): number {
    // return 0;
    // return Math.floor(this.customcontainer1?.nativeElement.clientWidth / this.customcard1?.nativeElement.clientWidth);
    return Math.floor(this.customcontainer1?.nativeElement.clientWidth / 100);
    // return Math.floor(($('#custom-container-1')).clientWidth / (<any>$('#custom-card-1')).clientWidth);
  }

  get routerName(): string {
    return this.store.selectSnapshot(state => state.global.currentRouterOutletName);
  }



}
