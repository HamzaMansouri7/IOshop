import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../product-list/product';


@Component({
  selector: 'app-fiche-product',
  templateUrl: './fiche-product.component.html',
  styleUrls: ['./fiche-product.component.css']
})
export class FicheProductComponent implements OnInit {
@Input() product= new Product()


  constructor() {
}

  ngOnInit(): void { }

}
