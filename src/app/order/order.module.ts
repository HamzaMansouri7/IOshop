import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderAddComponent } from './order-add/order-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCartListComponent } from './product-cart-list/product-cart-list.component';


@NgModule({
  declarations: [
    OrderAddComponent,
    ProductCartListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule ,
    NgbModule,
    ReactiveFormsModule
   ],
  })
export class OrderModule { }
