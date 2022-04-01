import { Component, OnInit } from '@angular/core';
import { FilterDto } from '../../filter.dto';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product, ShopProductdetails } from '../../product-list/product';
import { ProductService } from 'src/app/product-list/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: number
  filter: FilterDto<Product> = new FilterDto<Product>();
  product: any
  productDetails = new ShopProductdetails()
  loading:boolean=true
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id')
    })

    this.filter.select=["id","name","price","description","reference"]
    this.filter.relations=["pictures","categoryId","shopProductdetailsId","productPrices","productDetails","productDetails.detailId"]
    this.filter.where={active:true,id:this.productId}
    this.productService.getProductList(this.filter).subscribe(
      data => {
        this.product = data[0]
        this.productDetails = this.product[0]?.shopProductdetailsId
        this.loading=false
      },
      err => console.error('Observer got an error: ', err),
    );
  }

}