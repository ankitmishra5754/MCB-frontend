import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Authentication } from '../models/authentication';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';
  errorMessage = '';
  redirectURL = '/';
  subscriptions: Subscription[] = [];
  readonly REDIRECT_URL = 'redirectURL';

  constructor(private authService: AuthService,
    private router: Router) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

 ngOnInit(): void {
  }

 login(){
  this.authService.getTokenByUserName(this.userName).subscribe(
    (data: Authentication) => {
      if (data[0] && data[0].jwt) {
        localStorage.setItem('userName', this.userName);
        localStorage.setItem('token', data[0].jwt);
        localStorage.setItem('role', data[0].role!);
        this.router.navigateByUrl('/dashboard');
      }else{
        this.errorMessage = 'Invalid data';
      }  
    });
  }

}
