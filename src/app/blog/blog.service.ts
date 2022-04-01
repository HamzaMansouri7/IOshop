import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterDto } from '../filter.dto';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getNews(filter:FilterDto): Observable<Blog> {
    return this.http.get(environment.api +'/shop/article?filter=' + JSON.stringify(filter) )as Observable<Blog>;   
  }
}