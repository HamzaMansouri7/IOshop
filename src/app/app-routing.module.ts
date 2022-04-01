import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListModule } from './product-list/product-list.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./product-info/product-info.module').then(m => m.ProductInfoModule)
  },
  {
    path: 'contactez-nous',
    loadChildren: () => import('./page-contact/page-contact.module').then(m => m.PageContactModule)
  },
  {
    path: 'E-Boutique',
    loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.ECommerceModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
