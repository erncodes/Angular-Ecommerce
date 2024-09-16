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

      constructor(id : number, title : string ,description : string , sizes : number[], 
            colors : string[],image : string,isInStock : boolean,
            leftInStock : number, price : number, discount : number)
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
             }
}