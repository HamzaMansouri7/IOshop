export class Blog {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string,
        public price?: number,
        public content?:string,
        public pictureId?: number,
        public createdAt?: string,
        public createdBy?: number,
        public updatedAt?: string,
        public updatedBy?: number,
        public active?: boolean,
    
      ) { }
}
