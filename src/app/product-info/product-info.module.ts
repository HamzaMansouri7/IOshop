import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoRoutingModule } from './product-info-routing.module';
import { ProductComponent } from './product/product.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { FicheProductComponent } from './fiche-product/fiche-product.component';
import { DescriptionComponent } from './description/description.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductComponent,
    CarrouselComponent,
    FicheProductComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule,
    ProductInfoRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductInfoModule { }
