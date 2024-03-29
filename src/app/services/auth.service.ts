import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../model/auth/authentication-request';
import { RegisterRequest } from '../model/auth/register-request';
import { environment } from 'src/environments/environment';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private router: Router
    ) { }

  login(request: AuthenticationRequest): Observable<any> {
    return this.http.post<any>(environment.backendUrl + '/auth/authenticate', request)
      .pipe(tap((response: { token: string }) => {
        this.tokenService.setToken(response.token);
      }));
  }

  logout() {
    this.tokenService.clear();
    this.router.navigate(['login']);
    return this.http.get<any>(environment.backendUrl + '/auth/logout');
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(environment.backendUrl + '/auth/regist', request)
      .pipe(tap(response => localStorage.setItem('token', response.token)));
  }
}
