import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class ProductService{

   productClicked : BehaviorSubject<any> = new BehaviorSubject<any>('');
   filteredProdArray : any[] = [];
   
   ViewProduct(prod : any){
    this.productClicked.next(prod);
   }
   GetProductsFiltered(filterText? : string){
     if(filterText == '' || filterText == 'All'){
       this.filteredProdArray = this.products;
       this.filteredProdsSub.next(this.filteredProdArray);
       return this.filteredProdArray;
      }
      if(filterText == 'Popular'){
        this.filteredProdArray = this.products.filter(prod => prod.rating > 4);
        this.filteredProdsSub.next(this.filteredProdArray);
       return this.filteredProdArray;
      }
      if(filterText == 'NewArrivals'){
        this.filteredProdArray = this.products.filter(prod => this.IsNewProduct(prod));
        this.filteredProdsSub.next(this.filteredProdArray);
       return this.filteredProdArray;
      }
       return this.products;
   }

    GetProducts(){ 
          return this.filteredProdsSub.asObservable();
    }
    IsNewProduct(prod : Product){
      const date1 = prod.dateAdded;
      const date2 = new Date();
      const differenceInMilliseconds = date2.getTime() - date1.getTime();
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      if(differenceInDays >= 30){
        return false;
      }
      else{
        return true;
      }
    }

    products : Product[]  = [
        {
          id: 1,
          title: "Woven Tassel Loafer",
          price: 3509.00,
          description: "Formal shoes for men.",
          image: "./assets/images/image (8).webp",
          sizes: [8,9,10],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 15,
          discount: 0.15,
          rating: 4,
          dateAdded : new Date("2024/09/10")
        },
        {
          id: 2,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for all men.",
          image: "./assets/images/image (1).jpg",
          sizes: [7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 4,
          discount: 0.20,
          rating: 4.5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 3,
          title: "Prestige Leather Lace-Up",
          price: 2999.99,
          description: "Men formal shoe for all occassions.",
          image: "./assets/images/image (12).jpg",
          sizes: [6,7],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 8,
          discount: 0,
          rating: 3,
          dateAdded : new Date("2024/08/28")
        },
        {
          id: 4,
          title: "Classic Craft Loafer",
          price: 3294.99,
          description: "Elegant formal loafers for men.",
          image: "./assets/images/image (11).jpg",
          sizes: [6,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 3,
          discount: 0.10,
          rating: 1,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 5,
          title: "Laptop Backpack",
          price: 109.95,
          description: "A cool laptop backpack",
          image: "./assets/images/image (1).jpg",
          sizes: [7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 5,
          discount: 0.20,
          rating: 2,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 6,
          title: "Stride Leather Brogue",
          price: 3999.90,
          description: "Formal Brogue shoes for men.",
          image: "./assets/images/image (14).webp",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : false,
          leftInStock: 0,
          discount: 0,
          rating: 4,
          dateAdded : new Date("2024/09/08")
        },
        {
          id: 7,
          title: "Classic Leather Derby",
          price: 9699.90,
          description: "Elegant Derby formal shoes for all occassions",
          image: "./assets/images/image (14).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 7,
          discount: 0,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 8,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 3.5,
          discount: 0.20,
          rating: 5,
          dateAdded : new Date("2024/09/18")
        },
        {
          id: 9,
          title: "Mayor-N Black Leather",
          price: 2299.90,
          description: "Elegant Mayor-N shoes for men.",
          image: "./assets/images/image (14).webp",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 6,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 10,
          title: "Formal Derby",
          price: 3499.90,
          description: "Formal Derby shoes for men.",
          image: "./assets/images/image (9).jpg",
          sizes: [7],
          colors: ["Black","Tan"],
          isInStock : true,
          leftInStock: 12,
          discount: 0.15,
          rating: 3,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 11,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Elegant shoes for all men.",
          image: "./assets/images/image (1).jpg",
          sizes: [7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 4,
          discount: 0.20,
          rating: 2,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 12,
          title: "Formal Patent Lace-Up",
          price: 12499.99,
          description: "Formal Patent Lace-Up shoes for men.",
          image: "./assets/images/image (15).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 6,
          discount: 0.05,
          rating: 4,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 13,
          title: "Detailed Snake Lace-Up",
          price: 6199.90,
          description: "Stylish snake shoes for men.",
          image: "./assets/images/image (8).jpg",
          sizes: [6,7,8,9],
          colors: ["Beige"],
          isInStock : false,
          leftInStock: 0,
          discount: 0.10,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
      
        {
          id: 14,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [8],
          colors: ["Black","Brown"],
          isInStock : false,
          leftInStock: 0,
          discount: 0,
          rating: 4,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 15,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 16,
          discount: 0.15,
          rating: 3,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 16,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Stylish shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : false,
          leftInStock: 0,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 17,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,10],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 3.5,
          discount: 0.12,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 18,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Stylish shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : false,
          leftInStock: 0,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 19,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men for all occasions.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 3,
          discount: 0.10,
          rating: 4.5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 20,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for all men.",
          image: "./assets/images/image (1).jpg",
          sizes: [7,8,9],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 8,
          discount: 0.15,
          rating: 3,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 21,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Stylish shoes for all ages for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 14,
          discount: 0,
          rating: 4.,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 22,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 3,
          discount: 0,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 23,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for all occassions.",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 5,
          discount: 0.15,
          rating: 4,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 24,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Stylish shoes for men.",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 11,
          discount: 0,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 25,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 25,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 25,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 25,
          title: "Laptop Backpack",
          price: 109.95,
          description: "Formal shoes for men.",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          sizes: [6,7,8],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
      ];
   filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products);
}