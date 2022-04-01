import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/order/order-parts/customer';
import { PwdObject } from '../setting';
import { SettingService } from '../setting.service';
import { SharedService } from '../../shared/shared.service';
import { FilterDto } from 'src/app/filter.dto';
import { CustomerService } from '../../order/order-parts/customer.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.css']
})
export class UserSecurityComponent implements OnInit {
  alertError: boolean = false
  resetPwdForm: any;
  userObject: User = new User()
  PwdObject: PwdObject = new PwdObject()
  msgAlert: string;
  alertSuccess: boolean = false;
  userId: number;
  Success: boolean
  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, private settingService: SettingService, private sharedService: SharedService, private customerService: CustomerService) {
    this.resetPwdForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userId = + this.sharedService.getCookie("userId")
    if (this.userId) {
      this.getUser()
    }
  }
  update() {
    var form = this.document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
    this.isIdentiquePwd()
    if (this.alertSuccess) {
      this.userObject.password = this.PwdObject.password
      this.settingService.editUser(this.userObject.id, this.userObject).subscribe(
        data => {
          this.Success = true
          this.msgAlert = 'Votre mot de passe a été modifié avec succès'
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

  rePwdChanges(value) {
    if (this.PwdObject.password == value && value != undefined) {
      this.alertSuccess = true
      this.alertError = false
    } else {
      this.alertSuccess = false
    }
  }

  isIdentiquePwd() {
    if (this.PwdObject.password != this.PwdObject.rePassword && (this.PwdObject.password != undefined && this.PwdObject.rePassword != undefined)) {
      this.alertError = true
      this.msgAlert = 'Les mots de passe ne sont pas identiques'
    } else {
      this.alertSuccess = true
      this.alertError = false
    }
  }

  getUser() {
    let filter: FilterDto = new FilterDto()
    filter.relations = ["contactId"]
    filter.where = { id: this.userId }
    this.customerService.getUser(filter).subscribe(
      user => {
        this.userObject = user[0][0]
      }
    )
  }
}
