import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterDto } from '../../filter.dto';
import { Order } from '../order';
import { Contact, Customer, User } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }



  addCustomer(customer:Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.api+'/customer-shop',customer);
  }


  addUser(user:User): Observable<User> {
    return this.http.post<User>(environment.api+'/user-shop',user);
  }


  getContacts(filter:FilterDto<Contact>): Observable<Contact> {
    return this.http.get(environment.api+'/contacts-shop?filter='+JSON.stringify(filter)) as Observable<Contact>;
  }


  getUser(filter: FilterDto<User>): Observable<User> {
    return this.http.get(environment.api +'/users?filter=' + JSON.stringify(filter)) as Observable<User>;
  }
  getAllUsers(filter: FilterDto<User>): Observable<User> {
    return this.http.get(environment.api +'/users-shop?filter=' + JSON.stringify(filter)) as Observable<User>;
  }

  editCustomer(ID: number,customer:Customer): Observable<Customer>{
    return this.http.patch<Customer>(environment.api+'/customer/'+JSON.stringify(ID),customer);
  }
  getOrders(filter: FilterDto<Order>): Observable<[Order[], number]> {
    return this.http.get(environment.api + '/orders?filter=' + JSON.stringify(filter)) as Observable<[Order[], number]>;
  }


}


