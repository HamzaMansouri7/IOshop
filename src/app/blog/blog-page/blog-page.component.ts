import { Component, OnInit } from '@angular/core';
import { FilterDto } from 'src/app/filter.dto';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  datas: Blog[]=[];
  filter: FilterDto<Blog> =new FilterDto<Blog>();
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.getNews();
  }
  getNews() {
    this.filter.relations=["pictureId"]
    this.blogService.getNews(this.filter).subscribe(
      data => {
        this.datas = data[0]
      }
    )
  }

}