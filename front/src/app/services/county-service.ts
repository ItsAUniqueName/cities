import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { County } from '../model/County.type';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  /**
   * 
   * @param id id of County
   * @returns County with the given id
   */
  get(id: number) : Observable<County> {
    let url = environment.apiUrl+'county/'+id;
    return this.http.get<County>(url);
  }

  /**
   * Select all County
   * @returns Array of existing County
   */
  getAll() : Observable<County[]> {
    let url = environment.apiUrl+'county';
    return this.http.get<County[]>(url);
  }
}
