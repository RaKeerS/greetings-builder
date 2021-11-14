import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public postTemplateData(body: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/submitForm', JSON.stringify({ data: body }));
  }

}
