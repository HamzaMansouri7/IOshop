import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TopProductComponent } from './top-product/top-product.component';
import { SharedModule } from '../shared/shared.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { NaturexComponent } from './top-product/naturex/naturex.component';
import { PromoComponent } from './top-product/promo/promo.component';
import { MonirexComponent } from './top-product/monirex/monirex.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    HomePageComponent,
    TopProductComponent,
    MonirexComponent,
    NaturexComponent,
    PromoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule
  ] ,
  providers: [ { provide: LOCALE_ID, useValue: 'fr-FR'}],

})
export class HomeModule { }
