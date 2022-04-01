import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tokenGetter } from '../shared/sharedMethodes';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor() { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const routeRoles = route.data && route.data.roles;
      if (tokenGetter().length > 0 && routeRoles.includes((jwt_decode(tokenGetter())["role"])) ) {
        return true;
      }
      return false;
  }
}