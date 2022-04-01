import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sharedService:SharedService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.sharedService.tokenGetter()}`,
      },
    });
    return next.handle(req);
  }
}