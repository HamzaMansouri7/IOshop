export class Login {
    constructor(
        public email? : string,
        public password? : string,
        public rememberMe? : boolean
      ) {}
}


export class signUp {
  constructor(
      public name? : string,
      public email? : string,
      public password? : string,
      public tel? : string,
      public street? : string,
      public geoCode? : number,
      public city? : string,
    ) {}
}

