import { inject, Injectable } from "@angular/core";
import { Product } from "../models/product";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})
export class ProductService{
   productClicked : BehaviorSubject<any> = new BehaviorSubject<any>('');
   filteredProdArray : any[] = [];
   httpClient : HttpClient = inject(HttpClient);
   textSubject : BehaviorSubject<string> = new BehaviorSubject<string>('Popular');
   
   ViewProduct(prod : any){
    this.productClicked.next(prod);
   }
   //Filter products based on filter text,return all if no text passed
   GetProductsFiltered(filterText? : string){
     if(filterText == '' || filterText == 'All'){
       this.filteredProdArray = this.products;
       this.filteredProdsSub.next(this.filteredProdArray);
       this.textSubject.next('All Products');
       return this.filteredProdArray;
      }
      if(filterText == 'Popular'){
        this.filteredProdArray = this.products.filter(prod => prod.rating > 4);
        this.filteredProdsSub.next(this.filteredProdArray);
        this.textSubject.next('Popular Kicks');
       return this.filteredProdArray;
      }
      if(filterText == 'NewArrivals'){
        this.filteredProdArray = this.products.filter(prod => this.IsNewProduct(prod));
        this.filteredProdsSub.next(this.filteredProdArray);
        this.textSubject.next('New Kicks This Month');
       return this.filteredProdArray;
      }
       return this.products;
   }
   //Get all products
    GetProducts(){ 
          return this.filteredProdsSub.asObservable();
    }
    //Search products based on title
    Searchproducts(text: string){
      this.filteredProdArray = this.products.filter( prod => prod.title.toLowerCase().includes(text.toLocaleLowerCase()));
      this.productSearch.next(this.filteredProdArray);
      return this.filteredProdArray;
    }
    //Check if the product was added in the last 30 days
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
    GetSimilarProducts(product : Product){
      let returnProducts = this.products.filter( prod => (prod.rating == product.rating || prod.title.includes(product.title)) && prod.id != product.id);
      if(returnProducts.length > 3){
        return returnProducts.slice(0,3);
      }
      else if(returnProducts.length < 2)
      {
        return this.products.slice(0,3);
      }
      return returnProducts;
    }
    PostProductsToApi(){
      this.products.forEach((prod)=>{
        this.httpClient.post('https://urbanstrides-640e5-default-rtdb.europe-west1.firebasedatabase.app/products.json',prod).subscribe();
      })
    }

    products : Product[]  = [
        {
          id: 1,
          title: "Woven Tassel Loafer",
          price: 3509.00,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (8).webp",
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
          title: "Jonathan D Derby",
          price: 1249.95,
          description: "Stylish shoes for all men.",
          brand: "Jonathan D",
          imageUrl: "./assets/images/image (2)w.jpg",
          sizes: [7,8,9],
          colors: ["Black","Brown"],
          isInStock : true,
          leftInStock: 4,
          discount: 0.20,
          rating: 4.8,
          dateAdded : new Date("2024/07/28")
        },
        {
          id: 3,
          title: "Prestige Leather Lace-Up",
          price: 2999.99,
          description: "Men formal shoe for all occassions.",
          brand: "Prestige",
          imageUrl: "./assets/images/image (12).jpg",
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
          imageUrl: "./assets/images/image (11).jpg",
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
          title: "Fabiani Strap Shoes",
          price: 3500,
          description: "Elegant shoes for men.",
          brand: "Fabiani",
          imageUrl: "./assets/images/image (3)w.jpg",
          sizes: [7,8],
          colors: ["Black"],
          isInStock : true,
          leftInStock: 5,
          discount: 0.20,
          rating: 5,
          dateAdded : new Date("2024/09/20")
        },
        {
          id: 6,
          title: "Stride Leather Brogue",
          price: 3999.90,
          description: "Formal Brogue shoes for men.",
          imageUrl: "./assets/images/image (10).jpg",
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
          imageUrl: "./assets/images/image (14).jpg",
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
          title: "Fabiani Derby Formal",
          price: 2850,
          description: "Formal shoes for men.",
          brand: "Fabiani",
          imageUrl: "./assets/images/image (4)w.jpg",
          sizes: [7,8],
          colors: ["Black"],
          isInStock : true,
          leftInStock: 3.5,
          discount: 0.20,
          rating: 4,
          dateAdded : new Date("2024/09/18")
        },
        {
          id: 9,
          title: "Mayor-N Black Leather",
          price: 2299.90,
          description: "Elegant Mayor-N shoes for men.",
          brand: "Mayor-N",
          imageUrl: "./assets/images/image (14).webp",
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
          imageUrl: "./assets/images/image (9).jpg",
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
          title: "Monk Buckle Loafer",
          price: 1200,
          description: "Elegant shoes for all men.",
          imageUrl: "./assets/images/image (6)w.jpg",
          sizes: [7,8],
          colors: ["Brown"],
          isInStock : true,
          leftInStock: 4,
          discount: 0.20,
          rating: 3.8,
          dateAdded : new Date("2024/07/28")
        },
        {
          id: 12,
          title: "Formal Patent Lace-Up",
          price: 12499.99,
          description: "Formal Patent Lace-Up shoes for men.",
          imageUrl: "./assets/images/image (15).jpg",
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
          imageUrl: "./assets/images/image (8).jpg",
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
          title: "Stylish Leather Shoes",
          price: 1500,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (1).jfif",
          sizes: [8],
          colors: ["Brown"],
          isInStock : false,
          leftInStock: 0,
          discount: 0,
          rating: 3.5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 15,
          title: "Contemporary Brogue-Grey",
          price: 3500,
          description: "Morden design shoes for men.",
          imageUrl: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Grey"],
          isInStock : true,
          leftInStock: 16,
          discount: 0.15,
          rating: 3.8,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 16,
          title: "Prestige Horsebit Loafers",
          price: 3800,
          description: "Stylish shoes for men.",
          imageUrl: "./assets/images/image (2).jpg",
          sizes: [6,7,8],
          colors: ["Black"],
          isInStock : false,
          leftInStock: 0,
          discount: 0,
          rating: 3,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 17,
          title: "Formal Leather Shoes",
          price: 3499,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (1).jfif",
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
          title: "Leather Bow Loafer",
          price: 2509,
          description: "Stylish shoes for men.",
          imageUrl: "./assets/images/image (4).jpg",
          sizes: [6,7,8],
          colors: ["Blue"],
          isInStock : true,
          leftInStock: 3,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 19,
          title: "Faris Leather",
          price: 2001.95,
          description: "Formal shoes for men for all occasions.",
          imageUrl: "./assets/images/image (9).webp",
          sizes: [6,7,8],
          colors: ["Black"],
          isInStock : true,
          leftInStock: 3,
          discount: 0.10,
          rating: 4.5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 20,
          title: "Formal Leather Loafer",
          price: 2799.95,
          description: "Formal shoes for all men.",
          imageUrl: "./assets/images/image (3).jpg",
          sizes: [7,8,9],
          colors: ["White"],
          isInStock : true,
          leftInStock: 8,
          discount: 0.15,
          rating: 4.9,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 21,
          title: "Oxford Brogue",
          price: 5195.95,
          description: "Stylish shoes for all ages for men.",
          imageUrl: "./assets/images/image (1).jpg",
          sizes: [6,7,8],
          colors: ["Green"],
          isInStock : true,
          leftInStock: 14,
          discount: 0,
          rating: 4.6,
          dateAdded : new Date("2024/09/28")
        },
        {
          id: 22,
          title: "Rio Formal Shoe",
          price: 2795.95,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (1).webp",
          sizes: [6,7,8],
          colors: ["Black"],
          isInStock : true,
          leftInStock: 3,
          discount: 0,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 23,
          title: "Perry Leather",
          price: 2309.95,
          description: "Formal shoes for all occassions.",
          imageUrl: "./assets/images/image (11).webp",
          sizes: [6,7,8],
          colors: ["Black"],
          isInStock : true,
          leftInStock: 5,
          discount: 0.15,
          rating: 4,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 24,
          title: "Jabian Leather",
          price: 2309.95,
          description: "Stylish shoes for men.",
          imageUrl: "./assets/images/image (10).webp",
          sizes: [6,7,8],
          colors: ["Black"],
          isInStock : true,
          leftInStock: 11,
          discount: 0,
          rating: 4.2,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 25,
          title: "Perry Cognac",
          price: 2309.95,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (12).webp",
          sizes: [6,7,8],
          colors: ["Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
        {
          id: 25,
          title: "Jamaal Derby Leather",
          price: 1599.95,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (10).webp",
          sizes: [6,7,8],
          colors: ["Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 2.6,
          dateAdded : new Date("2024/09/18")
        },
        {
          id: 25,
          title: "Fabiani Cleated Derby",
          price: 2699.95,
          description: "Formal shoes for men.",
          imageUrl: "./assets/images/image (7)w.jpg",
          sizes: [6,7,8],
          colors: ["Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/07/28")
        },
        {
          id: 25,
          title: "Jonathan D Franklin",
          price: 845.99,
          description: "Formal shoes for men.",
          brand: "Jonathan D",
          imageUrl: "./assets/images/image (3.)j.jpg",
          sizes: [6,7,8],
          colors: ["Brown"],
          isInStock : true,
          leftInStock: 2,
          discount: 0.15,
          rating: 5,
          dateAdded : new Date("2024/06/28")
        },
      ];

   filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products);
   productSearch : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products.slice(0,4));

}