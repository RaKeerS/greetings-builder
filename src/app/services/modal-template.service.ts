import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalTypes } from '../types/modal-types';


@Injectable({
  providedIn: 'root'
})
export class ModalTemplateService {

  constructor(private http: HttpClient) { }

  public getTemplateData(): Promise<any> {
    return this.http.get<any>('assets/templateData.json')
    .toPromise()
    .then(res => <ModalTypes>res.data)
    .then(data => data);
  }
}
