import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvantageCommerceComponent } from './avantage-commerce/avantage-commerce.component';
import { AvantageDetailsComponent } from './avantage-details/avantage-details.component';

const routes: Routes = [
  {path : '', component :  AvantageCommerceComponent},
  {path : 'livraison', component :  AvantageDetailsComponent},
  {path : 'echantillons', component :  AvantageDetailsComponent},
  {path : 'emballage', component :  AvantageDetailsComponent},
  {path : 'retours', component :  AvantageDetailsComponent},
  {path : 'paiement', component :  AvantageDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
