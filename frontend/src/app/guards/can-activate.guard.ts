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
      // const appId = '63bba42e5ae42f5628b0d338';
      // const ClientId = '63bba4774f3dd05d344c5ce1';
      // const appURL = 'https://gsftestapi.educian.com/';
      // const serverURL = 'http://localhost:4200/oauth/callback';
      let url = `${this.appURL}/exgsfsso/authorize?response_type=code&redirect_uri=${this.serverUrL}&app_id=${this.appId}&client_id=${this.ClientId}&scope=openid%20profile&state=xjsueokjdi_der`;
      window.location.href=`${url}`
      return false
    }



  }

}




