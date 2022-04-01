import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterDto } from '../filter.dto';
import { Banniere } from './home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBanniere(filter:FilterDto): Observable<Banniere> {
    return this.http.get(environment.api +'/shop/banniere?filter=' + JSON.stringify(filter) )as Observable<Banniere>;   
  }
}