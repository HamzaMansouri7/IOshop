export class CustomerType {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public createdBy?: number,
      public createdAt?: string,
      public updatedAt?: string,
      public updatedBy?: number,
      public active?: boolean,
    ) { }
  }

  export class Customer {
    constructor(
      public id?: number,
      public name?: string,
      public mf?: string,
      public description?: string,
      public customerType?: string,
      public pictures?: string | [],
      public createdBy?: number,
      public createdAt?: string,
      public updatedAt?: string,
      public updatedBy?: number,
      public active?: boolean,
      public contacts?: Contact[],
      public adress?: Address[],
      // public ville?: string,
      public customerTypeId?:number | CustomerType,
      public userId?:number | Customer,
      public password?:string


    ) { }
  }


  export class Contact {
    public id? : number;
    public firstName?: string
    public lastName?: string;
    public tel?: number;
    public fax?: number;
    public email? : string;
    public createdAt? : string;
    public updatedAt? : string;
    public createdBy? : number;
    public active? : boolean;
    public providerId? : number;
    public customerId? : number;
    public carrierId? : number;
    public userId? : number;
    public updatedBy? :number;

  }
  export class Address {
    constructor(
      public id?: number,
      public city?: string,
      public state?: string,
      public street?: string,
      public number?: number,
      public geoCode?: number,
      public updatedAt?: Date,
      public createdAt?: Date,
      public active?: boolean,
      public providerId?: number,
      public userId?: number,
      public customerId?: number

    ) { }
  }


  export class User {
    constructor(
      public id? : number,
      public name? : string,
      public email? : string,
      public oldPassword? : string,
      public password? : string,
      public repassword?:string,
      public resToken?:string,
      public pictures?: string | [],
      public active? : boolean,
      public contactId?: Contact,
      public role?: string,
      public createdBy?:number,
      public updatedBy?:number,
      public customerId?:number | Customer


    ) {}
  }