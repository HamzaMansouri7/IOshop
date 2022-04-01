import { Component,Input } from '@angular/core';
import { Banniere } from '../../home/home';

@Component({
  selector: 'app-banniere',
  templateUrl: './banniere.component.html',
  styleUrls: ['./banniere.component.css']
})
export class BanniereComponent {
  images = ['https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1630341562/carousel2_fgeuk1.webp','https://res.cloudinary.com/http-next-ioc-tn/image/upload/f_auto/v1630341561/carousel1_bcbkac.webp'];
  @Input() carousels:Banniere[]=[];
  constructor() { }

}