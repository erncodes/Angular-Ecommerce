import { CartObject } from "./cartObject";

export class Order{
    FirstName : string;
    LastName : string;
    Email : string;
    Contact_No : number;
    Address1 : string;
    Address2 : string;
    PostalCode : number;
    Province : string;
    Country : string;
    DeliveryFee : number;
    CartTotal : number;
    OrderProducts : CartObject[];

    constructor(FirstName : string, LastName : string, Email : string, Contact_No : number, Address1 : string, Address2 : string,
        PostalCode : number, Province : string, Country : string, DeliveryFee : number, CartTotal : number, OrderProducts : CartObject[])
        {
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Contact_No = Contact_No;
            this.Address1 = Address1;
            this.Address2 = Address2;
            this.PostalCode = PostalCode;
            this.Province = Province;
            this.Country = Country;
            this.DeliveryFee = DeliveryFee;
            this.CartTotal = CartTotal;
            this.OrderProducts = OrderProducts;
        }
}