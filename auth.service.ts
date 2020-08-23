import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  login:boolean;

  private _loginUrl = "http://localhost:5000/auth";

  constructor(private http: HttpClient,
              private _router: Router) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate([''])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn(){
  }
}
