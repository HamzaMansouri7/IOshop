import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-boutique',
  templateUrl: './card-boutique.component.html',
  styleUrls: ['./card-boutique.component.css']
})
export class CardBoutiqueComponent {
 @Input() cards:any
  constructor() { }

}
