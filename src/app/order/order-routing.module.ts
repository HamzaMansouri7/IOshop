import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderAddComponent } from './order-add/order-add.component';
import { ProductCartListComponent } from './product-cart-list/product-cart-list.component';

const routes: Routes = [
  {path : '', component :  ProductCartListComponent},
  {path : 'order-add', component : OrderAddComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
