import { Component, OnInit } from '@angular/core';
import { FilterDto } from 'src/app/filter.dto';
import { CustomerService } from 'src/app/order/order-parts/customer.service';
import { Customer, Contact, Address } from '../../order/order-parts/customer';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customerObject:Customer=new Customer()
  contactObject:Contact=new Contact()
  adressObject:Address = new Address
  profileChoices=[]
  userId:number
  choices=[
    {"title":"Informations","icon":"assets/person-circle.svg","router":"/setting/user-info/" },
    {"title":"Adresses","icon":"assets/geo-alt-fill.svg","router":"/setting/user-adress/" },
    {"title":"Historique et détails de mes commandes","icon":"assets/calendar2.svg","router":"/setting/user-history/" },
    {"title":"confidentialité","icon":"assets/shield-shaded.svg","router":"/setting/user-resetPwd" },

    ]
  constructor(private customerService:CustomerService,private sharedService:SharedService) { }

  ngOnInit(): void {
    this.userId = + this.sharedService.getCookie("userId")
    if(this.userId){
      this.getCustomer()
    }

  }

  getCustomer() {
      let filter: FilterDto = new FilterDto()
      filter.where = { id: this.userId }
      filter.relations = ["customerId", "customerId.adress", "customerId.contacts"]
      this.customerService.getUser(filter).subscribe(
        user => {
          this.customerObject=user[0][0].customerId
          this.contactObject=this.customerObject.contacts[0]
          this.adressObject=this.customerObject.adress[0]
        }
      )
  }

}
