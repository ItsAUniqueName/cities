import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../model/City.type';
import { Observable } from 'rxjs';
import { County } from '../model/County.type';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  http: HttpClient = inject(HttpClient);
  
  constructor() { }

  /**
   * 
   * @param id number, id of City record
   * @returns retreived City element
   */
  get(id: number) : Observable<City> {
    let url = environment.apiUrl+'city/'+id;
    return this.http.get<City>(url);
  }

  /**
   * 
   * @param id number, id of County record
   * @returns array of cities belongign to given county
   */
  getByCounty(id: number) : Observable<City[]> {
    let url = environment.apiUrl+'city/county/'+id;
    return this.http.get<City[]>(url);
  }

  /**
   * Select all City
   * @returns array of Cities
   */
  getAll() : Observable<City[]> {
    let url = environment.apiUrl+'city/';
    return this.http.get<City[]>(url);
  }

  /**
   * Create City
   * @param countyId id of county, we link the City to
   * @param name name of the City
   * @returns new city object
   */
  create(countyId: number, name: string) : Observable<City> {
    const body = {
      countyId: countyId.toString(),
      name: name
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<City>(environment.apiUrl+'city', body, {headers: headers});
  }

  /**
   * 
   * @param id id of the existing City
   * @param name new name
   * @returns updated City
   */
  update(id: number, name: string){
    const body = {
      id: id.toString(),
      name: name
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<City>(environment.apiUrl+'city', body, {headers: headers});
  }

  /**
   * 
   * @param id id of the existing City
   * @returns deleted City
   */
  delete(id: number){
    let url = environment.apiUrl+'city/'+id;
    return this.http.delete<City>(url);
  }
}
