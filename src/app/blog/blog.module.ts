import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogNewsComponent } from './blog-news/blog-news.component';
import { SharedModule } from '../shared/shared.module';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { LineArticleComponent } from './line-article/line-article.component';


@NgModule({
  declarations: [
    BlogPageComponent,
    BlogNewsComponent,
    BlogArticleComponent,
    LineArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
