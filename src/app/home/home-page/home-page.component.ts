import { Component, HostListener } from '@angular/core';
import { FilterDto } from 'src/app/filter.dto';
import { Product } from 'src/app/product-list/product';
import { ProductService } from 'src/app/product-list/product.service';
import { Banniere } from '../home';
import { HomeService } from '../home.service';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  mobileMode: boolean;
  tabletteMode: boolean;
  innerWidth: number;
  loading: boolean=true


  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.innerWidth = this.GlobalObjectServiceService.getWindow().innerWidth;
  }

  offerCard: Banniere = new Banniere()
  promos: Banniere[] = [];
  carousels: Banniere[] = [];
  data: Product[] = [];
  count: number;

  constructor(private productService: ProductService, private homeService: HomeService,private GlobalObjectServiceService: GlobalObjectServiceService ) {
    this.getScreenSize();
    if (this.innerWidth < 426) {
      this.mobileMode = true
      this.tabletteMode = false
    }
    if (this.innerWidth < 769 && this.innerWidth > 450) {
      this.tabletteMode = true
      this.mobileMode = false
    }
    else if (this.innerWidth > 1020) {
      this.tabletteMode = false
      this.mobileMode = false
    }
  }

  ngOnInit() {
    let filter: FilterDto = new FilterDto()
    filter.where = { active: true }
    filter.select=["id","name","price","description","reference"]
    filter.relations=["pictures","categoryId","shopProductdetailsId","productPrices"]
    this.productService.getProductList(filter).subscribe(
      data => {
        this.data = data[0]
        this.count = data[1]
        this.loading=false
      }
    );
    this.homeService.getBanniere({}).subscribe(
      data => {
        this.carousels = data[0].filter((item) => item.isBigOffer == false && item.position == 6 && item.active == true && item.isShow == true);
        this.promos = data[0].filter((item) => item.isBigOffer == false && item.position < 4 && item.active == true && item.isShow == true);
        this.offerCard = data[0].filter((item) => item.isBigOffer == true && item.position == 5 && item.active == true && item.isShow == true);
      },
      err => console.error('Observer got an error: ', err),
    );
  }
}