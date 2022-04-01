import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MonirexComponent } from './top-product/monirex/monirex.component';
import { NaturexComponent } from './top-product/naturex/naturex.component';
import { PromoComponent } from './top-product/promo/promo.component';

const routes: Routes = [
  {path : '', component : HomePageComponent },
  {path : 'monirex', component : MonirexComponent },
  {path : 'naturex', component : NaturexComponent },
  {path : 'promo', component : PromoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
