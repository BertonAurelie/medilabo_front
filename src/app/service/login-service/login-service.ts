import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, {
      responseType: 'text',
      withCredentials: true
    }).pipe(
      tap(() => this.loggedInSubject.next(true))
    );
  }

  checkSession(): Observable<{ authenticated: boolean }> {
    return this.http.get<{ authenticated: boolean }>(`${this.baseUrl}/auth/me`, {
      withCredentials: true
    }).pipe(
      tap(res => this.loggedInSubject.next(!!res.authenticated)),
      catchError(() => {
        this.loggedInSubject.next(false);
        return of({ authenticated: false });
      })
    );
  }

  logout(): Observable<string> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      responseType: 'text',
      withCredentials: true
    }).pipe(
      tap(() => this.loggedInSubject.next(false))
    );
  }
}
