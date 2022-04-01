import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoList } from '../photo-list';
import { Product } from '../../product-list/product';
import { Router } from '@angular/router';
import { CartService } from '../../shared/cart.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  @Input() product: any

  photoList: PhotoList = new PhotoList();
  photoLength: number;
  first: number = 0;
  last: number = 5;
  activeIndex: number = 0;
  tabImages = []
  qte: number = 1
  productObject = []
  productArray: any;
  itemNumber: number;
  oldQte:number
  constructor(private modalService: NgbModal, private router: Router, private cartService: CartService,private cartservice:CartService,
    private GlobalObjectServiceService: GlobalObjectServiceService,private sharedService:SharedService) { }

  ngOnInit() {
    this.productArray = this.cartservice.getProductCart()
    if (this.productArray.length < 1) {
      let cookie: any
      cookie = this.sharedService.getAllCookies()
      Object.entries(cookie).forEach(([key, val]) => {
        var element = JSON.stringify(val);
        if(element.length > 1000){
          var parsed = JSON.parse(JSON.parse(element));
          this.productArray.push(parsed)
        }
      }
      );
    }
    this.itemNumber = this.sharedService.cartItemNumber(this.productArray)
    this.verifOldQuantity(this.product)
  }

  ngOnChanges() {
    this.product?.pictures?.forEach(element => {
      this.tabImages.push(element.url)
    });
    this.photoList.photos = this.tabImages;
    this.photoList.imgObject = []
    this.photoLength = this.photoList.photos.length
    this.initImgArray(0)
  }

  initImgArray(first: number) {
    if (this.photoList.photos) {
      this.photoList.imgObject = []
      this.photoList.imgObject = [
        { active: false, img: this.photoList.photos[Math.abs(first % this.photoLength)] },
        { active: false, img: this.photoList.photos[Math.abs((first + 1) % this.photoLength)] },
        { active: false, img: this.photoList.photos[Math.abs((first + 2) % this.photoLength)] },
        { active: false, img: this.photoList.photos[Math.abs((first + 3) % this.photoLength)] },
        { active: false, img: this.photoList.photos[Math.abs((first + 4) % this.photoLength)] },
      ]
      this.photoList.imgObject[this.activeIndex].active = true
    }
  }

  fullSceenAction(content: any,product:Product) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
  increaseValue() {
    this.qte = this.qte + 1
  }
  decreaseValue() {
    if (this.qte > 0) {
      this.qte = this.qte - 1
    }
  }

  sendToCart() {
    this.verifOldQuantity(this.product)
    let prod = new Product()
    prod = this.product
    if(this.oldQte>0){
      prod.quantity = this.oldQte +this.qte
    }else{
      prod.quantity = this.qte
    }  
    this.cartService.addProduct(prod);
    this.itemNumber = this.sharedService.cartItemNumber(this.productArray)
    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
    this.qte=1
    this.verifOldQuantity(this.product)
  }

  verifOldQuantity(products) {
    if (this.productArray.length>0) {
      this.productArray.forEach(element => {
          if(element.id==products.id){
            this.oldQte=element.quantity
          }
      });
    }

  }

}