import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../model/auth/authentication-request';
import { RegisterRequest } from '../model/auth/register-request';
import { environment } from 'src/environments/environment';
import { of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: AuthenticationRequest): void {
    this.http.post<any>(environment.backendUrl + '/auth/authenticate', request)
      .subscribe((response: { token: string }) => {
        console.log('logging in');
        localStorage.setItem('token', response.token);
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(request: RegisterRequest) {
    
  }
}
