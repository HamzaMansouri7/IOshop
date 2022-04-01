import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';
import { SharedService } from 'src/app/shared/shared.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-product-cart-list',
  templateUrl: './product-cart-list.component.html',
  styleUrls: ['./product-cart-list.component.css']
})
export class ProductCartListComponent implements OnInit {

  productArray: any
  totalAmount: number = 0;
  qtError: boolean = false;
  itemNumber: number = 0;

  constructor(private cartservice: CartService, private GlobalObjectServiceService: GlobalObjectServiceService, private sharedService: SharedService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
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
    this.getItemNumber();
    this.TotalAmount()
    this.checkQuantity()
    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
  }

  TotalAmount() {
    this.totalAmount = 0
    if (this.productArray) {
      this.productArray.forEach(element => {
        this.totalAmount = this.totalAmount + element.productPrices[0]?.price * element.quantity
        this.productArray = this.sharedService.sortData(this.productArray)
      });
    }
  }

  increaseValue(quantity, id: number) {
    this.productArray.forEach(element => {
      if (element.id == id) {
        element.quantity = element.quantity + 1
      }

    });;
    this.productArray = this.sharedService.sortData(this.productArray)
    this.ResetCookie(this.productArray)
    this.getItemNumber()
    this.checkQuantity()
    this.TotalAmount()
  }
  decreaseValue(quantity, id: number) {
    if (quantity > 0) {
      this.productArray.forEach(element => {
        if (element.id == id) {
          element.quantity = element.quantity - 1
          if (element.quantity == 0) {
            element.quantity = 1
          }
        }
      });;
    }
    this.productArray = this.sharedService.sortData(this.productArray)
    this.ResetCookie(this.productArray)
    this.getItemNumber()
    this.checkQuantity()
    this.TotalAmount()

    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
  }

  deleteFromCookie(id: number) {
    var index = this.productArray.map(x => { return x.id; }).indexOf(id);
    this.productArray.splice(index, 1);
    this.cartservice.deleteItemFromCart(id)
    this.getItemNumber()
    this.TotalAmount()
    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
  }

  ResetCookie(productArray) {
    this.productArray = this.cartservice.updateCookie(productArray);
  }

  checkQuantity() {
    let count: number = 0
    if (this.productArray) {
      this.productArray.forEach(element => {
        if (element.quantity < 1) {
          count = count + 1
        }
        if (count > 0) {
          this.qtError = true
        } else {
          this.qtError = false
        }
      });
    }

  }

  getItemNumber() {
    if (this.productArray) {
      this.productArray = this.sharedService.sortData(this.productArray)
      this.itemNumber = this.sharedService.cartItemNumber(this.productArray)
    }
  }

  valuechange(value, idProduct) {
    this.productArray.forEach(element => {
      if (element.id == idProduct) {
        element.quantity = value
        this.checkQuantity()
        this.ResetCookie(this.productArray)
        this.getItemNumber()
        this.TotalAmount()
        var event = new CustomEvent('updateCartItem', { 'detail': true });
        this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
      }
    });
  }
}
