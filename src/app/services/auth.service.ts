import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Globals } from "../global";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private globals: Globals,
        private router: Router
    ) { }


    public isUserBOLoggedIn: boolean = false;
    private loggedUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public loggedUser$: Observable<any> = this.loggedUserSubject.asObservable();


    public logout() {
        localStorage.clear();
        this.isUserBOLoggedIn = false;
        this.loggedUserSubject.next(null);
        this.router.navigate(['login']);
    }

    public setLoginValue(): boolean {
        let Token = localStorage.getItem('token');
        Token
            ? (this.isUserBOLoggedIn = true)
            : (this.isUserBOLoggedIn = false);
        return this.isUserBOLoggedIn;
    }

    getLoggedUser(): Observable<any> {
        return this.loggedUser$;
    }

    getLoggedRequest(): Observable<any> {
        const urlAPI = this.globals.urlApi + `users/profile`;
        return this.http.get<any>(urlAPI).pipe(
          tap(data => this.loggedUserSubject.next(data))
        );
      }

}