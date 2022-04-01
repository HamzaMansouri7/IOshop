import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css']
})
export class BlogArticleComponent implements OnInit {
  news: Blog = new Blog();
  date:string
  author:string
  filter: FilterDto<Blog> =new FilterDto<Blog>();
  id: number;
  constructor(private blogService: BlogService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    this.getNews();
  }
  getNews() {
    this.filter.relations=["pictureId"]
    this.filter.where={id:this.id}
    this.blogService.getNews(this.filter).subscribe(
      data => {
        this.news = data[0]
        this.date=this.news[0].createdAt
        this.author=this.news[0].author
   
      }
    )
  }

}