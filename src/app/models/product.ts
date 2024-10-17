 export class Product
      {
      constructor(
            public id : string | undefined,public title : string , public description : string,
            public brand : string | undefined , public sizes : number[], public colors : string[],
            public imageUrl : string, public isInStock : boolean, public leftInStock : number, 
            public price : number, public discount : number, public rating : number, public dateAdded : Date
            ){}
      }