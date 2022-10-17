import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  loggedInUser: string;

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loggedInUser = localStorage.getItem('token');
      if (this.loggedInUser) {
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.loggedInUser) });
      }
      if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.append('Content-Type', 'application/json') });
      }
      // setting the accept header
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
      return next.handle(req);
  }
}
