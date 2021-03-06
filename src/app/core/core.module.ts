import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent


  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    
  ]
  ,
  exports:[
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
