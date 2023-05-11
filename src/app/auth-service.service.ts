import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  username: any;
  private jwtHelper = new JwtHelperService();


  constructor(private cookieService: CookieService, private http: HttpClient) {
   }


   getUniqueId(username: any): Observable<string> {
    const user = username;
    return this.http.get<string>(`http://localhost:9000/unique/${user}`);
  }




  public async isLoggedIn(): Promise<boolean> {
    const token = this.cookieService.get('jwt');
      if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      
      if (!isExpired) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        // Check for specific claims in the decoded token
        if (decodedToken.UserId && decodedToken.UniqueId) {
          const userName = decodedToken.sub;
            if (decodedToken.UserId.startsWith(userName)) {
              if(decodedToken.UniqueId.length === 12 && typeof decodedToken.UniqueId === "string"){
                const uniqueId = await firstValueFrom(
                  this.getUniqueId(userName)
                );
                console.log(uniqueId);
                if(uniqueId === decodedToken.UniqueId){
                  return !isExpired;
                }
              }
            } 
        }
      }
    }
  
    alert('Token has expired or does not contain the required claims. Please log in to continue.');
    return false;
  }


  
  
}


