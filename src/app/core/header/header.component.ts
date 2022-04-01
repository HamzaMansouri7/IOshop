import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Router } from '@angular/router';
import { FilterDto } from 'src/app/filter.dto';
import { CustomerService } from '../../order/order-parts/customer.service';
import { Customer } from 'src/app/order/order-parts/customer';
import { AuthService } from '../../auth/auth.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';
import { SharedService } from '../../shared/shared.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileMode: boolean = false;
  productArray: any;
  opned: string
  itemNumber: number;
  isloggedin: number;
  customerObject: Customer = new Customer()
  userId: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if (event.target.innerWidth < 450) {
      this.mobileMode = true
    }
    else {
      this.mobileMode = false
    }
  }
  isMenuCollapsed = true;
  constructor(private cartservice: CartService, private customerService: CustomerService, private authservice: AuthService,
    private GlobalObjectServiceService: GlobalObjectServiceService, private sharedService: SharedService, @Inject(PLATFORM_ID) private platformId: Object) {


    this.GlobalObjectServiceService.getWindow().addEventListener('updateCartItem', (evt: any) => {
      if (evt.detail == true) {
        this.refreshCookie()
      }
    });

  }
  ngOnInit() {
    this.userId = + this.sharedService.getCookie("userId")
    if (this.userId) {
      this.getCustomer()
    }
    this.refreshCookie()

  }

  enableDisableRule(str: string) {
    this.opned = str
  }
  refreshCookie() {
    if (isPlatformBrowser(this.platformId)) {
      this.productArray = this.cartservice.getProductCart()
      if (this.productArray.length < 1) {
        let cookie: any
        cookie = this.sharedService.getAllCookies()
        Object.entries(cookie).forEach(([key, val]) => {
          var element = JSON.stringify(val);
          if (element.length > 1000) {
            var parsed = JSON.parse(JSON.parse(element));
            this.productArray.push(parsed)
          }
        }
        );
      }
    }
    this.itemNumber = this.sharedService.cartItemNumber(this.productArray)

  }
  getCustomer() {
    this.userId = + this.sharedService.getCookie("userId")
    if (this.userId) {
      let filter: FilterDto = new FilterDto()
      filter.where = { id: this.userId }
      filter.relations = ["customerId", "customerId.adress", "customerId.contacts"]
      this.customerService.getUser(filter).subscribe(
        user => {
          this.customerObject = user[0][0]?.customerId
        }
      )
    }

  }

  logout() {
    this.authservice.logout()
    this.cartservice.deleteAllprodCart(this.productArray)
  }
}