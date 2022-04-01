import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { RelatedNewsComponent } from './related-news/related-news.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { FormsModule } from '@angular/forms';
import { BanniereComponent } from './banniere/banniere.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { SloganComponent } from './slogan/slogan.component';
@NgModule({
  declarations: [ProductCardComponent, NewsletterComponent,PageTitleComponent, RelatedNewsComponent, EmailFormComponent,BanniereComponent, SloganComponent,ProductCarouselComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    ProductCardComponent , NewsletterComponent,PageTitleComponent,RelatedNewsComponent,EmailFormComponent,BanniereComponent,SloganComponent,ProductCarouselComponent
  ]
})
export class SharedModule { }
