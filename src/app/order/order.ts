import { Product } from "../product-list/product";
import { Customer } from './order-parts/customer';

export class Order {
    constructor(
      public id?: number,
      public deliveryPrice?: number,
      public description?: string,
      public totalPrice?: number,
      public globalDiscount?:number,
      public isCompleted?: boolean,
      public createdAt?: string,
      public createdBy?: number,
      public updatedAt?:  string,
      public updatedBy?: number,
      public active?: boolean,
      public customerId?: Customer | number,
      public orderDetails?: OrderDetail[],
      public userName?:string
    ) { }
}

export class OrderDetail {
  constructor(
    public id?: number,
    public tax?: number,
    public amount?: number,
    public price?: number,
    public quantity?: number,
    public gratuite?: number,
    public discount?: number ,
    public createdAt?: string,
    public createdBy?: number,
    public updatedAt?: string,
    public updatedBy?: number,
    public active?: boolean ,
    public productId?: Product | number,
    public orderId?: number | Order
  ){}
  }



  export class RulesAgreement {
    constructor(
      public receveOffer?: boolean,
      public confidentiality?: boolean,
      public insecription?: boolean,
      public termsAgreement?: boolean,
    ) { }
  }


