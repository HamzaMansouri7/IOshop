import { Component, OnInit } from '@angular/core';
import { FilterDto } from 'src/app/filter.dto';
import { ProductService } from '../product.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = []
  markArray =[]
  count: number;
  promoStyle: string="btn-default";
  filter: FilterDto = new FilterDto()
  allProdStyle: string="btn-change";
  id:number
  msgError:boolean=false
  loading:boolean=true
  constructor(private productService: ProductService,private GlobalObjectServiceService: GlobalObjectServiceService) { }
  ngOnInit(): void {
    this.filter.where={active:true}
    this.getProducts(this.filter)
    this.loadMarks()
    var event = new CustomEvent('updateCartItem', { 'detail': true });
    this.GlobalObjectServiceService.getWindow().dispatchEvent(event);
  }
  search(item) {
    this.id=item.id
      this.promoStyle="btn-default"
      this.allProdStyle="btn-default"
      this.filter.where={active:true,markId:item.id}
      this.getProducts(this.filter)


    if(item=='promo'){
      this.promoStyle = 'btn-change';
      this.allProdStyle="btn-default"
      this.filter.where={active:true}
      this.getProducts(this.filter)
    }

    if(item=='allProd'){
      this.promoStyle="btn-default"
      this.allProdStyle="btn-change"
      this.filter.where={active:true}
      this.getProducts(this.filter)
    }
  }

  getProducts(filter){
    filter.select=["id","name","price","description","reference"]
    filter.relations=["pictures","categoryId","shopProductdetailsId","productPrices","markId"]
    this.productService.getProductList(filter).subscribe(
      data => {
        this.products = data[0];
        this.count=data[1]
        if( this.count<1){
          this.msgError=true
          this.loading=false
        }else{
          this.msgError=false
          this.loading=false
        }
      },
      err => console.error('Observer got an error: ', err),
    );
  }

  loadMarks(){
    let search :FilterDto = new FilterDto()
    search.where={active:true}
    this.productService.getMarks(search).subscribe(
      data => {
        this.markArray = data[0];
      },
      err => console.error('Observer got an error: ', err),
    );
  }
}
