import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../order/order-parts/customer';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient) { }


  editUser(ID: number,userObject:User): Observable<User>{
    return this.http.patch<User>(environment.api+'/user/'+JSON.stringify(ID),userObject);
  }

  //this route without auth guard for resetting pwd 
  editUserById(ID: number,userObject:User): Observable<User>{
    return this.http.patch<User>(environment.api+'/user-shop/'+JSON.stringify(ID),userObject);
  }
}







