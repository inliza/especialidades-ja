import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }


  getCategoriesWithSpecialties(): Observable<any> {
    const urlAPI = this.globals.urlApi + `specialties/categories`;
    return this.http.get<any>(urlAPI);
  }

  getSpecialties(): Observable<any> {
    const urlAPI = this.globals.urlApi + `specialties/get`;
    return this.http.get<any>(urlAPI);
  }

  createCategory(category: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `specialties/categories/create`;
    return this.http.post<any>(urlAPI, category);
  }

  createSpeciality(speciality: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `specialties/create`;
    return this.http.post<any>(urlAPI, speciality);
  }

  getUserSpecialties(): Observable<any> {
    const urlAPI = this.globals.urlApi + `specialties/user-specialties`;
    return this.http.get<any>(urlAPI);
  }
  
  upsertUserSpecialties(body: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `specialties/user-specialties/upsert`;
    return this.http.post<any>(urlAPI, body);
  }


  

}