
  export class Product {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public reference?:string,
      public price?: number,
      public categoryId?: number & Category,
      public shopProductdetailsId?: number | ShopProductdetails ,
      public pictures?:[] | string,
      public quantity?:number
    ) { }
  }

  export class Category {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public createdBy?: number,
        public createdAt?: Date,
        public updatedBy?: number,
        public updatedAt?: Date,
        public active?: boolean,
      ) { }
}

export class ShopProductdetails {
  constructor(
      public id?: number,
      public deliveryPolicy?: string,
      public description?: string,
      public exchangePolicy?: string,
      public customerReviews?: string,
      public sizeGuide?: string,
      public video?: string,
      public active?:boolean,
      public createdAt?:string,
      public updatedAt?:string

    ) { }
}

export class Mark {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public updatedAt?: string,
    public createdAt?: string,
    public updatedBy?: number,
    public createdBy?: number,
    public active?: boolean,
  ) { }
}

