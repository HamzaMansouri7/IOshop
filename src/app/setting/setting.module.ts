import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserAdressComponent } from './user-adress/user-adress.component';
import { UserHistoriqueComponent } from './user-historique/user-historique.component';
import { UserSecurityComponent } from './user-security/user-security.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    UserAdressComponent,
    UserHistoriqueComponent,
    UserSecurityComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingModule { }
