export class CartObject{
    id?: string | undefined;
    title: string;
    description: string;
    brand? : string | undefined;
    size: number;
    sizeOptions: number[];
    color: string;
    colorOptions: string[];
    imageUrl: string;
    price: number;
    isInStock : boolean;
    leftInStock: number;
    quantity: number = 1;
    rating : number = 0;
    dateAdded : Date;

    constructor(id : string | undefined, title : string ,description : string , brand : string | undefined, size : number, 
          color : string,imageUrl : string, price : number, quantity : number,isInStock : boolean,leftInStock: number,
          colorOptions: string[],sizeOptions: number[],rating : number,dateAdded : Date)
          {
            this.id = id;
            this.title = title;
            this.description = description;
            this.brand = brand;
            this.size = size;
            this.color = color;
            this.imageUrl = imageUrl;
            this.price = price;
            this.quantity = quantity;
            this.isInStock = isInStock;
            this.leftInStock = leftInStock;
            this.colorOptions = colorOptions;
            this.sizeOptions = sizeOptions;
            this.rating = rating;
            this.dateAdded = dateAdded;
           }
}