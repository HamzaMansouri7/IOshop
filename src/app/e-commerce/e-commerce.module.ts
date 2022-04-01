import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { AvantageCommerceComponent } from './avantage-commerce/avantage-commerce.component';
import { SharedModule } from '../shared/shared.module';
import { CardBoutiqueComponent } from './card-boutique/card-boutique.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvantageDetailsComponent } from './avantage-details/avantage-details.component';


@NgModule({
  declarations: [
    AvantageCommerceComponent,
    CardBoutiqueComponent,
    AvantageDetailsComponent
  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    SharedModule,
    NgbModule,
  ]
})
export class ECommerceModule { }
