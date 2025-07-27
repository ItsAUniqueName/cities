import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../model/City.type';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  http: HttpClient = inject(HttpClient);
  
  constructor() { }

  get(id: number) {
    let url = environment.apiUrl+'city/'+id;
    return this.http.get<City>(url);
  }

  getByCounty(id: number){
    let url = environment.apiUrl+'city/county'+id;
    return this.http.get<City[]>(url);
  }

  getAll() {
    let url = environment.apiUrl+'city/';
    return this.http.get<City[]>(url);
  }

  create(countyId: number, name: string){
    const body = new URLSearchParams();
    body.set('countyId', countyId.toString());
    body.set('name', name);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<City>(environment.apiUrl+'city', body, {headers: headers});
  }

  update(id: number, name: string){
    const body = new URLSearchParams();
    body.set('id', id.toString());
    body.set('name', name);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<City>(environment.apiUrl+'city', body, {headers: headers});
  }

  delete(id: number){
    let url = environment.apiUrl+'city/'+id;
    return this.http.delete<City>(url);
  }
}
