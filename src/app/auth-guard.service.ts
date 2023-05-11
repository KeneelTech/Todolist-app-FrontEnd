import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (await this.authService.isLoggedIn()===false) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}