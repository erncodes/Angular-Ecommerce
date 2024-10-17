import { CartObject } from "./cartObject";

export class Order{
    constructor
        (
            public FirstName : string, public LastName : string, public Email : string, public Contact_No : number,
            public Address1 : string, public Address2 : string, public PostalCode : number, public Province : string,
            public Country : string, public DeliveryFee : number,public CartTotal : number, public OrderProducts : CartObject[]
        ){}
}