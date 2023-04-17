import { Injectable } from "@angular/core";
import { JwtService } from "./login.component";



@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    
    login(username: string, password: string): void{
        
    }

    logout(): void{

    }


    isAuthenticated(): boolean { 
        const token = localStorage.getItem('token');
        if(token) {
            return !this.jwtService.isTokenExpired(token);
        } else {
            return false;
        }
    }

}