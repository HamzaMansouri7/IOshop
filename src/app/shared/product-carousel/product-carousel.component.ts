import { Component, HostListener, OnInit } from '@angular/core';
import { FilterDto } from 'src/app/filter.dto';
import { Product } from 'src/app/product-list/product';
import { ProductService } from 'src/app/product-list/product.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent implements OnInit {
  mobileMode: boolean;
  innerWidth: number;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.innerWidth = this.GlobalObjectServiceService.getWindow().innerWidth;
  }
  data: Product[] = [];
  product: Product[] = [];

  constructor(private productService: ProductService,private GlobalObjectServiceService: GlobalObjectServiceService) {
    this.getScreenSize();

    if (this.innerWidth < 426) {
      this.mobileMode = true
    }
    else  {
      this.mobileMode=false
    }

  }
  ngOnInit(): void {
    let filter: FilterDto = new FilterDto()
    filter.where = { active: true }
    filter.select=["id","name","price","description","reference"]
    filter.relations=["pictures","categoryId","shopProductdetailsId","productPrices"]
    this.productService.getProductList(filter).subscribe(
      data => {
        this.data = data[0]
        for (let i = 0; i < 6; i++) {
          this.product.push(this.data[i])
        }
      }
    );
  }
}