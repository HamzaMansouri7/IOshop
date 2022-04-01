import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './auth';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private GlobalObjectServiceService: GlobalObjectServiceService,@Inject(DOCUMENT) private document: Document) { }

login(user:Login): Observable<any> {
    return this.http.post<Login>(environment.api+'/auth/login',user)
}

logout(){
    var cookies = this.document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        this.document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
  }

sendMail(mail){
    return this.http.post( "https://iotech-mailer.ioc.tn/api/mails", mail)
  }
}
