export class PhotoList {
    constructor(
        public status?: boolean,
        public photos?: string[],
        public imgObject?: ImgObject[],
        public tab?: string[],
      ) { }
}
export class ImgObject {
    constructor(
      public img?: string,
      public active?: boolean
    ) { }
  }