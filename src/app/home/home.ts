
export class Banniere {
  constructor(
    public id?:number,
    public bgPicture? : string,
    public pathUrl? : string,
    public smallTitle?: string,
    public bigTitle?: string,
    public content?: string,
    public isShow?:boolean,
    public isBigOffer?:boolean,
    public position?:number,
    public baniereType?:number,
    public createdAt?:string,
    public updatedAt?:string,
    public createdBy?: number,
    public updatedBy?: number,
    public active?: boolean,

  ) {}
}