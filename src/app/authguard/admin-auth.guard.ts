import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');

      const isLocalStorageEmpty = token === null;
      if(isLocalStorageEmpty) return false;
      
      const isAdmin = JSON.parse(atob(token!.split('.')[1])).Role === 'ADMIN';

      if(isAdmin) return true;
      return !(state.url.startsWith('/admin'));
  }
  
}
