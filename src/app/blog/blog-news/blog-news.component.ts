import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-news',
  templateUrl: './blog-news.component.html',
  styleUrls: ['./blog-news.component.css']
})
export class BlogNewsComponent implements OnInit {
  @Input() data: Blog = new Blog();

  constructor() { }

  ngOnInit(): void {
  }

}