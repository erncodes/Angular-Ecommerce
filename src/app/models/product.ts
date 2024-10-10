 export class Product{
      id: number;
      title: string;
      brand? : string | undefined;
      description: string;
      sizes: number[];
      colors: string[];
      imageUrl: string;
      isInStock: boolean;
      leftInStock: number;
      price: number;
      discount: number;
      rating : number = 0;
      dateAdded : Date;

      constructor(id : number, title : string ,description : string, brand : string | undefined , sizes : number[], 
            colors : string[],imageUrl : string,isInStock : boolean,
            leftInStock : number, price : number, discount : number,rating : number,dateAdded : Date)
            {
            this.id = id;
            this.title = title;
            this.description = description;
            this.brand = brand;
            this.sizes = sizes;
            this.colors = colors;
            this.imageUrl = imageUrl;
            this.isInStock = isInStock;
            this.leftInStock = leftInStock;
            this.price = price;
            this.discount = discount;
            this.rating = rating;
            this.dateAdded = dateAdded;
             }
}