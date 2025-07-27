import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { County } from '../model/County.type';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  get(id: number) {
    let url = environment.apiUrl+'county/'+id;
    return this.http.get<County>(url);
  }

  getAll() {
    let url = environment.apiUrl+'county/';
    return this.http.get<County[]>(url);
  }
}
