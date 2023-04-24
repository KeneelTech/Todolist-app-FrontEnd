import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: any;
  password: any;

  constructor(private http: HttpClient, private router: Router) { }

  SignUp() {
    const body =  { username: this.username, password: this.password };
    this.http.post('http://localhost:9000/signUp', body)
      .subscribe({
        next: (response: any) => {
          alert('Sign up complete!');
          this.router.navigate(['login']);
        },
        error: (error: any) => {
          alert('Sign up failed!');
          console.error(error);
        }
      });
  }


  return(){
    this.router.navigate(['/login']);
  }

}
