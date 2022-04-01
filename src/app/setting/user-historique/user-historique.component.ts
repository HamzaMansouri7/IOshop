import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { CustomerService } from 'src/app/order/order-parts/customer.service';

@Component({
  selector: 'app-user-historique',
  templateUrl: './user-historique.component.html',
  styleUrls: ['./user-historique.component.css']
})
export class UserHistoriqueComponent implements OnInit {
  userId: number;
  customerId:number
  orderArray=[]
  constructor(private route: ActivatedRoute,private customerService:CustomerService,private formBuilder: FormBuilder) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = +params.get('id')
    })

  }
  ngOnInit(): void {
    this.getCustomerHistory()
  }
  getCustomerHistory(){
    let filter: FilterDto = new FilterDto()
    filter.where = { id: this.userId }
    filter.relations = ["customerId"]
    this.customerService.getUser(filter).subscribe(
      user => {
        this.customerId=user[0][0].customerId.id
        filter.where={customerId:this.customerId}
        this.customerService.getOrders(filter).subscribe(
          order => {
            this.orderArray=order[0]
          }
        )
      }
    )
  }
}
