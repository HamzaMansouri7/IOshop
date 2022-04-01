import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './order';
import { FilterDto } from '../filter.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(environment.api + '/order-shop', order)
  }

  sendMail(mail){
    return this.http.post( "https://iotech-mailer.ioc.tn/api/mails", mail)
  }


}

