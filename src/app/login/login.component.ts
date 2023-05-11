import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    username: any;
    password: any;
    

    constructor(private http: HttpClient, private router: Router, private cookieservice: CookieService) { }



    login(){
        const credentials = { username: this.username, password: this.password };
        this.http.post('http://localhost:9000/login', credentials)
          .subscribe({
          next: (response: any) => {
            this.cookieservice.set('jwt', response); 
            this.router.navigate(['tasks']); 
          },
          error: (error: any) => {
            alert('Invalid username/password')
            console.log(error);
          }
        });
      }


}





