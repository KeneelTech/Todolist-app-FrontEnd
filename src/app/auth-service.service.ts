import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private jwtHelper = new JwtHelperService();



  constructor() { }


  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }
  }


