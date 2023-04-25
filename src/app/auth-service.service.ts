import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service/public-api';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private jwtHelper = new JwtHelperService();



  constructor(private cookieSerivce: CookieService) { }


   isLoggedIn(): boolean {
    const token = this.cookieSerivce.get('jwt');
    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }
  }


