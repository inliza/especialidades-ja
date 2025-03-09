import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  logIn(data: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/login`;
    return this.http.post<any>(urlAPI, data);
  }

  signUp(data: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/create`;
    return this.http.post<any>(urlAPI, data);
  }

  getZones(): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/zones`;
    return this.http.get<any>(urlAPI);
  }

  getRanks(): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/ranks`;
    return this.http.get<any>(urlAPI);
  }

  getLogged(): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/profile`;
    return this.http.get<any>(urlAPI);
  }

  getAll(): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/get-all`;
    return this.http.get<any>(urlAPI);
  }

  update(data: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/update`;
    return this.http.put<any>(urlAPI, data);
  }

  updateStatus(data: any): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/update-status`;
    return this.http.put<any>(urlAPI, data);
  }

  getSpecialtiesByUser(id:string): Observable<any> {
    const urlAPI = this.globals.urlApi + `users/profile/${id}`;
    return this.http.get<any>(urlAPI);
  }

}
