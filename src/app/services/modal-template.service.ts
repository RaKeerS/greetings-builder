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
      .toPromise().catch(error => error) // 'catch' needs to be added here in the pipeline, as when there is any error in the get call, it would be captured in 'catch' block
      .then(res => <ModalTypes>res?.data) // nextly, it would forward the flow to this block, where we check if the 'response' contains data if and typecast it.
      .then(data => data); // lastly, in this last block we get the typecasted 'res.data' value, however, if there is any api error, it would not contain the 'data' property, and it will return undefined
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
          resolve(reader.result);
        }
        reader.onerror = error => reject(error);
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  public async fetchTemplatePresetMessages(url: string): Promise<any> {
    return await this.http.get<any>(url)
    .toPromise()
    .then(res => res?.data)
    .then(data => data);
  }

}
