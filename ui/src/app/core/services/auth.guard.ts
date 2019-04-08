import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userService.isAuth()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
