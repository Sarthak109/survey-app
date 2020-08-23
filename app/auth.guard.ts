import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this._router.navigate(['login'])
      return false
    }
  }
}
