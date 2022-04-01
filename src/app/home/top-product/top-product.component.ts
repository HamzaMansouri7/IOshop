import { Component, Input } from '@angular/core';
import { Banniere } from '../home';


@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css']
})
export class TopProductComponent {
  @Input() promos: any
  promo1: Banniere;
  promo2: Banniere;
  promo3: Banniere;
  promo4: Banniere;
  images = ['https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1630054475/topMonirex_znzscu.png','https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1630054950/topprod3_obikw7.png','https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1630054746/topPromo_uujb0o.png'];
  constructor() { }

  ngOnChanges() {
    if (this.promos) {
      this.promo1 = this.promos.filter((item) => item.position == 1);
      this.promo2 = this.promos.filter((item) => item.position == 2);
      this.promo3 = this.promos.filter((item) => item.position == 3);
      this.promo4 = this.promos.filter((item) => item.position == 4);
    }
  }


}