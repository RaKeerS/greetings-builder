import { Component, OnInit } from '@angular/core';
import { ModalTemplateService } from 'src/app/services/modal-template.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public templateData: any[] = [];

  constructor(private modalSvc: ModalTemplateService) { }

  ngOnInit(): void {
    this.getTemplateData();
  }

  private getTemplateData(): any {
    this.modalSvc.getTemplateData().then(data => { this.templateData = data; console.log('data: ', data); });
  }

  public getRows(totalLength: number) {
    let count = totalLength / 4;
    count += totalLength % 4 > 0 ? 1 : 0;
    return Math.floor(count);
  }

}
