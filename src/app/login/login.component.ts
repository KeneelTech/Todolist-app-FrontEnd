import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    username: any;
    password: any;
    

    constructor(private http: HttpClient, private router: Router) { }


    

    login(){
        const credentials = { username: this.username, password: this.password };
        this.http.post('http://localhost:9000/login', credentials).subscribe(
          (response: any) => {
            localStorage.setItem('token', response.token); // store JWT token in local storage
            this.router.navigate(['http://localhost:9000/tasks']); // redirect to Todo list page
          },
          (error: any) => {
            console.log(error);
          }
        );
      }

}





