import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { User } from 'src/app/order/order-parts/customer';
import { CustomerService } from 'src/app/order/order-parts/customer.service';
import { PwdObject } from 'src/app/setting/setting';
import { SettingService } from 'src/app/setting/setting.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  alertError: boolean = false
  resetPwdForm: any;
  userObject: User = new User()
  PwdObject: PwdObject = new PwdObject()
  msgAlert: string;
  alertSuccess: boolean = false;
  userId: number;
  Success: boolean
  token: string;
  hasAcces: boolean;
  constructor(private router: Router,private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, private settingService: SettingService, private customerService: CustomerService) {
    this.resetPwdForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
      const array = this.router.url.split("id");
       let tokenarray = array[0].split("=");
       this.token=tokenarray[1] 
      this.userId= + array[1]
      this.getUser(this.userId)
  }
  update() {
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    this.isIdentiquePwd()
    if(form.checkValidity() === true){
    if (this.alertSuccess && this.hasAcces) {
      this.userObject.password = this.PwdObject.password
      this.settingService.editUserById(this.userObject.id, this.userObject).subscribe(
        data => {
          this.Success = true
          this.alertError=false
          this.msgAlert = 'Votre mot de passe a été modifié avec succès'
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        err => {
          console.error('Observer got an error: ' + err)
          this.alertSuccess = false
          this.alertError = true
          this.msgAlert = 'La reinitialisation de votre mot de passe a échoué'
        },
      )
    }
  }
  }

  rePwdChanges(value) {
    if (this.PwdObject.password == value && value != undefined) {
      this.alertSuccess = true
      this.alertError = false
    } else {
      this.alertSuccess = false
    }
  }

  isIdentiquePwd() {
    if (this.PwdObject.password != this.PwdObject.rePassword && this.PwdObject.password != undefined && this.PwdObject.rePassword != undefined) {
      this.alertError = true
      this.msgAlert = 'Les mots de passe ne sont pas identiques'
    } else if (this.PwdObject.password != undefined && this.PwdObject.rePassword != undefined){
      this.alertSuccess = true
      this.alertError = false
    }
  }

  getUser(id:number) {
    let filter: FilterDto = new FilterDto()
    filter.relations = ["contactId"]
    filter.where={id:id}
    this.customerService.getAllUsers(filter).subscribe(
      user => {
        this.userObject = user[0][0]
        if(this.userObject){
          if(this.userObject.resToken==this.token){
              this.hasAcces=true
          }
        }
      },
    )
  }
}