import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/services/auth.service';
import { AttemptQuizComponent } from '../components/quiz/attempt-quiz/attempt-quiz.component';
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private readonly authService: AuthService,
    private readonly router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      return true
    }
    else {
      this.router.navigate(['/auth/login'],{queryParams:{'redirectURL':state.url}})
      return false
    }

  }

}




