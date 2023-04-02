import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../model/auth/authentication-request';
import { RegisterRequest } from '../model/auth/register-request';
import { environment } from 'src/environments/environment';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: AuthenticationRequest): Observable<any> {
    return this.http.post<any>(environment.backendUrl + '/auth/authenticate', request)
      .pipe(tap((response: { token: string }) => {
        console.log('logging in');
        localStorage.setItem('token', response.token);
      }));
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(environment.backendUrl + '/auth/regist', request)
      .pipe(tap(response => localStorage.setItem('token', response.token)));
  }
}
