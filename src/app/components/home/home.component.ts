import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import { GreetingsState } from 'src/app/store/greetings-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public templateData: any[] = [];

  public subscription: Subscription | undefined;

  @Select(GreetingsState.getCurrentTemplateCategory) currentTemplateCategory$!: Observable<string>;

  constructor(private modalSvc: ModalTemplateService, private store: Store) { }

  ngOnInit(): void {
    this.getTemplateData();
    this.subscribe()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private getTemplateData(): any {
    const currentTemplateCategory = this.store.selectSnapshot(GreetingsState.getCurrentTemplateCategory);
    if (!!currentTemplateCategory && currentTemplateCategory.trim() != 'initial') {
      this.modalSvc.getTemplateData(currentTemplateCategory)
      .then(
        data => { this.templateData = data; },
        error => { // adding error handling
          console.error('Error Here: ', error.message);
          this.modalSvc.getTemplateData('anime-greetings').then(data => { this.templateData = data; console.log('data: ', data); });
        });
    }
    else {
      this.modalSvc.getTemplateData('anime-greetings')
        .then(data => { this.templateData = data; console.log('data: ', data); }, error => console.error('Error: ', error.message));
    }
  }

  public getRows(totalLength: number) {
    let count = totalLength / 4;
    count += totalLength % 4 > 0 ? 1 : 0;
    return Math.floor(count);
  }

  private subscribe() {
    this.subscription = this.currentTemplateCategory$.subscribe((value) => {
      if (!!value) {
        this.templateData = []; // This line is just for debugging, to check if the values actually do change or not. Remove it later on.
        this.modalSvc.getTemplateData(value).then(data => this.templateData = data );
        // alert('Changed!!!!');
      }
    })
  }

}
