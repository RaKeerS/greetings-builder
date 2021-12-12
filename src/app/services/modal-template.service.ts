import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalTypes } from '../types/modal-types';


@Injectable({
  providedIn: 'root'
})
export class ModalTemplateService {

  constructor(private http: HttpClient) { }

  public getTemplateData(sourceDataCategory: string): Promise<any> {
    return this.http.get<any>(`assets/source-data/${sourceDataCategory}-data.json`)
      .toPromise()
      .then(res => <ModalTypes>res.data)
      .then(data => data);
  }

  public postTemplateData(body: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/submitForm', JSON.stringify({ data: body }));
  }

  public toDataURL(url: string): Promise<string | ArrayBuffer | null> {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = () => {
        var reader = new FileReader();
        reader.onloadend = () => {
          // imageUrl = callbackFn(reader.result, 'abc');
          resolve(reader.result);
          // console.log(this.imageUrl1);
        }
        reader.onerror = error => reject(error);
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

}
