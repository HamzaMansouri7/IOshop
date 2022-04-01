import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoList } from 'src/app/product-info/photo-list';
import { Product } from '../../product-list/product';
import { CartService } from '../cart.service';
import { SharedService } from '../shared.service';

@Component({
  selector:'app-product-card',
  templateUrl:'./product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() products:any
  photoList: PhotoList=new PhotoList();
  photoLength: number;
  tabImages=[]
  productArray: any;
  itemNumber: number;
  cart:any
  qte: number = 1
  oldQte:number
  constructor(private modalService: NgbModal,private cartService:CartService,private sharedService:SharedService){}
  ngOnChanges() {
    this.products?.pictures?.forEach(element => {
      this.tabImages.push(element.url)
    });
    this.photoList.photos = this.tabImages;
    this.photoList.imgObject = []
    this.photoLength = this.photoList.photos.length
    if (this.photoList.photos) {
      this.photoList.imgObject = []
      this.photoList.imgObject = [{active : false , img : this.photoList.photos[Math.abs(0 % this.photoLength)]}]
      this.photoList.imgObject[0].active = true
    }
  }
  fullSceenAction(content: any,products:Product) {
    this.modalService.open(content, { size: 'lg',centered: true});
    this.getOldData()
    this.verifOldQuantity(products);
    this.qte=1
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


  sendToCart() {
    let prod = new Product()
    prod = this.products
    if(this.oldQte>0){
      prod.quantity = this.oldQte +this.qte
    }else{
      prod.quantity = this.qte
    }
    this.cartService.addProduct(prod);
    this.itemNumber = this.sharedService.cartItemNumber(this.productArray)
  }

  increaseValue() {
    this.qte = this.qte + 1
  }
  decreaseValue() {
    if (this.qte > 0) {
      this.qte = this.qte - 1
    }

  }
  getOldData(){
    this.productArray = this.cartService.getProductCart()
    if (this.productArray?.length < 1) {
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
    this.itemNumber = this.sharedService.cartItemNumber(this.productArray)
  }

}
