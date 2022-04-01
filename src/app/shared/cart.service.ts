import { Inject, Injectable, OnInit } from '@angular/core';
import { Product } from '../product-list/product';
// import { getAllCookies } from './sharedMethodes';
// import { sortData } from 'src/app/shared/sharedMethodes';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';
import { DOCUMENT } from '@angular/common';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  cart = []
  productArray = []
  existed:number=0
  constructor(private GlobalObjectServiceService: GlobalObjectServiceService,@Inject(DOCUMENT) private document: Document,private sharedService:SharedService) { }


ngOnInit() {
  this.productArray = this.cart
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
  this.cart=this.productArray
}

  addProduct(product: Product) {
    this.existed=0
    product.shopProductdetailsId=null
    if(this.cart.length>0){
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].id==product.id){
          this.cart[i].quantity=product.quantity
          this.existed=this.existed+1
        }
      }
      if(this.existed<1){
        this.cart.push(product)
      }
    }else{
      this.cart.push(product)
    }
    let newCart=this.updateCookie(this.cart)
    return newCart

  }

  updateCookie(cart){
    cart.forEach(element => {
      var json_str = JSON.stringify(element);
      this.document.cookie = "cart"+element.id +"=" + (json_str);
    });
      var event = new CustomEvent('updateCartItem', { 'detail': true });
      this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
      return this.cart
  }

  getProductCart(){
    return this.cart
  }

  deleteItemFromCart(id){
    this.document.cookie = "cart"+id+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

    deleteAllprodCart(productArray){
      productArray.forEach(element => {
        this.deleteItemFromCart(element.id)
      });
      this.cart=[]
      var event = new CustomEvent('updateCartItem', { 'detail': true });
      this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
    }
}
