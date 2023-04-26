import { Injectable } from '@angular/core';
import { Payload } from '../model/payload';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private static payload?: Payload | null;

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
    TokenService.payload = JSON.parse(atob(token.split('.')[1]));
  }

  clear() {
    localStorage.removeItem('token');
    TokenService.payload = null;
  }

  getPayload() {
    this.reloadPayload();
    return TokenService.payload;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthor() {
    this.reloadPayload();
    return TokenService.payload!.sub;
  }

  isNotNull() {
    return localStorage.getItem('token') !== null;
  }

  isAdmin() {
    this.reloadPayload();
    return TokenService.payload!.Role === 'ADMIN';
  }

  reloadPayload() {
    TokenService.payload = JSON.parse(atob(localStorage.getItem('token')!.split('.')[1]));
  }
}
