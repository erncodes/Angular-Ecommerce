export class CartObject{
    constructor
    (
      public id : string | undefined, public title : string, public description : string,
      public brand : string | undefined, public size : number,public color : string, public imageUrl : string,
      public price : number, public quantity : number, public isInStock : boolean, public leftInStock: number,
      public colorOptions: string[], public sizeOptions: number[], public rating : number, public dateAdded : Date
    ){}
}