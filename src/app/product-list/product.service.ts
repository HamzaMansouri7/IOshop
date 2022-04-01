import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterDto } from '../filter.dto';
import { environment } from 'src/environments/environment';
import { Product, Mark } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList(filter:FilterDto): Observable<Product> {
    return this.http.get(environment.api +'/shop/products?filter=' + JSON.stringify(filter) )as Observable<Product>;
  }

  getMarks(filter: FilterDto<Mark>): Observable<Mark> {
    return this.http.get(environment.api + '/shop/marks?filter=' + JSON.stringify(filter))as Observable<Mark>;
  }
}
