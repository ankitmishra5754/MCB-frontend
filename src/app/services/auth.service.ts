import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth';
  authEmmiter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private httpClient: HttpClient) { }

  getTokenByUserName(userName:string): any {
    return this.httpClient.get(this.url+"?userName="+userName);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload: any = decode(token);
      if (Date.now() >= tokenPayload.exp * 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.authEmmiter.next(1);
        return false;
      } else {
        this.authEmmiter.next(2);
        return true;
      }
    } else {
      this.authEmmiter.next(3);
      return false;
    }
  }
}
