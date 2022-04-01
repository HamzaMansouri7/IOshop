import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { Address, Customer } from 'src/app/order/order-parts/customer';
import { CustomerService } from 'src/app/order/order-parts/customer.service';

@Component({
  selector: 'app-user-adress',
  templateUrl: './user-adress.component.html',
  styleUrls: ['./user-adress.component.css']
})
export class UserAdressComponent implements OnInit {

  userId:number
  customerObject:Customer=new Customer()
  adressObject:Address = new Address
  adressForm: any;
  alertSuccess: boolean;
  alertError: boolean;

   constructor(private route: ActivatedRoute,private customerService:CustomerService,private formBuilder: FormBuilder) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = +params.get('id')
    })

    this.adressForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      street: ['', [Validators.required]],
      geoCode: ['', [Validators.required]],


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
          this.customerObject=user[0][0].customerId
          this.adressObject=this.customerObject.adress[0]
        }
      )
  }

  update() {
    this.customerObject.adress[0]=this.adressObject
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
