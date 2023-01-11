import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
   serverUrL=environment.serverUrL
   appId=environment.appId
   appURL=environment.appURL
   ClientId=environment.ClientId
  constructor(private readonly authService: AuthService,
    private readonly router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token  = localStorage.getItem('gToken')
    if (token) {
      return true
    } 
    else {
        this.router.navigate(['oauth/login'])
      return false
    }



  }

}




