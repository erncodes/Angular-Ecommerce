export class CartObject{
    id: number;
    title: string;
    description: string;
    size: number;
    sizeOptions: number[];
    color: string;
    colorOptions: string[];
    imageUrl: string;
    price: number;
    isInStock : boolean;
    leftInStock: number;
    quantity: number = 1;

    constructor(id : number, title : string ,description : string , size : number, 
          color : string,imageUrl : string, price : number, quantity : number,isInStock : boolean,leftInStock: number,
          colorOptions: string[],sizeOptions: number[])
          {
            this.id = id;
            this.title = title;
            this.description = description;
            this.size = size;
            this.color = color;
            this.imageUrl = imageUrl;
            this.price = price;
            this.quantity = quantity;
            this.isInStock = isInStock;
            this.leftInStock = leftInStock;
            this.colorOptions = colorOptions;
            this.sizeOptions = sizeOptions;
           }
}