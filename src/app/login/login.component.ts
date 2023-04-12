import {  Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './login.component.spec';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class JwtService {
    constructor(private jwtHelper: JwtHelperService) { }

    decodeToken(token: string): any {
        return this.jwtHelper.decodeToken(token);
    }

    isTokenExpired(token: string): boolean {
        return this.jwtHelper.isTokenExpired(token);

    }
    
}


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }

    CanActivate(): boolean{
        if(this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }



}

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private authService: AuthService, private jwtService: JwtService) { }

    getProtectedData(): Observable<any> {
        const token = localStorage.getItem('token');

        if(token && !this.jwtService.isTokenExpired(token)) {

            const headers = new HttpHeaders({
                'Authorization': 'Bearer' + token
            });


            return this.http.get<any>('https://example.com/api/protected', { headers });
        } else {
             // Redirect to login page or handle unauthorized access
      // You can also implement token refresh logic here
      return throwError('Unauthorized');
        }

    }


}


