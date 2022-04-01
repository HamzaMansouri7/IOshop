import { Component} from '@angular/core';

@Component({
  selector: 'app-avantage-commerce',
  templateUrl: './avantage-commerce.component.html',
  styleUrls: ['./avantage-commerce.component.css']
})
export class AvantageCommerceComponent{

  constructor() { }
  cards=[
          {"title":"Livraison sous 72h","description":"Herbabio vous offre, dès 60dt d’achat, une  livraison gratuite à domicile sur tout le territoire Tunisien.","icon":"assets/truck.png","route":"livraison" },
          {"title":"Cadeaux surprises","description":"Pour vous remercier de votre commande, Herbabio vous offre des petits cadeaux .","icon":"assets/wallet.png","route":"echantillons" },
          {"title":"Emballage Cadeau Offert","description":"Pour que vos cadeaux soient encore plus magnefique, Herbabio les livres dans des emballages cadeaux .","icon":"assets/gift.png","route":"emballage" },
          {"title":"Retours Faciles","description":"Avec Herbabio , vous pouvez échanger ou retourner votre produit en toute simplicité.","icon":"assets/arrow-back.png","route":"retours" },
          {"title":"Paiement Sécurisé","description":"Le paiement sera sécurisé et confidentiel.","icon":"assets/locked.png","route":"paiement" }
        ]

}
