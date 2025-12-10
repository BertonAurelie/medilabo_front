import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private baseUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post(this.baseUrl, { email, password }, { responseType: 'text', withCredentials: true  });
  }
}
