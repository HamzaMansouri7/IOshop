import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserAdressComponent } from './user-adress/user-adress.component';
import { UserHistoriqueComponent } from './user-historique/user-historique.component';
import { UserSecurityComponent } from './user-security/user-security.component';


const routes: Routes = [

  {path : '', component :  ProfileComponent},
  {path : 'user-info/:id', component :  UserInfoComponent},
  {path : 'user-adress/:id', component :  UserAdressComponent},
  {path : 'user-history/:id', component :  UserHistoriqueComponent},
  {path : 'user-resetPwd/:id', component :  UserSecurityComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
