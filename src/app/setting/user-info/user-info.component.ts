import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { Address, Contact, Customer } from 'src/app/order/order-parts/customer';
import { CustomerService } from 'src/app/order/order-parts/customer.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userId: number
  customerObject: Customer = new Customer()
  contactObject: Contact = new Contact()
  contactForm: any;
  alertSuccess: boolean;
  alertError:boolean

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private formBuilder: FormBuilder) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = +params.get('id')
    })

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{​​​​​​​​2,4}​​​​​​​​$")]],
      tel: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    let filter: FilterDto = new FilterDto()
    filter.where = { id: this.userId }
    filter.relations = ["customerId", "customerId.adress", "customerId.contacts"]
    this.customerService.getUser(filter).subscribe(
      user => {
        this.customerObject = user[0][0].customerId
        this.contactObject = this.customerObject.contacts[0]
      }
    )
  }
  update() {
    this.customerObject.contacts[0].tel=this.contactObject.tel
    this.customerObject.contacts[0].firstName=this.customerObject.name
    this.customerService.editCustomer(this.customerObject.id,this.customerObject).subscribe(
      data => {
        this.alertSuccess=true
      },
      err => {
        this.alertError = true
      }
    )
  }
}
