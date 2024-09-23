 export class Product{
      id: number;
      title: string;
      description: string;
      sizes: number[];
      colors: string[];
      image: string;
      isInStock: boolean;
      leftInStock: number;
      price: number;
      discount: number;
      rating : number = 0;
      dateAdded : Date;

      constructor(id : number, title : string ,description : string , sizes : number[], 
            colors : string[],image : string,isInStock : boolean,
            leftInStock : number, price : number, discount : number,rating : number,dateAdded : Date)
            {
            this.id = id;
            this.title = title;
            this.description = description;
            this.sizes = sizes;
            this.colors = colors;
            this.image = image;
            this.isInStock = isInStock;
            this.leftInStock = leftInStock;
            this.price = price;
            this.discount = discount;
            this.rating = rating;
            this.dateAdded = dateAdded;
             }
}