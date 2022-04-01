import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContactRoutingModule } from './page-contact-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    PageContactRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PageContactModule { }
