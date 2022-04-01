import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

const routes: Routes = [
  {path : '', component :  BlogPageComponent},
  {path : 'article/:id', component :  BlogArticleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
