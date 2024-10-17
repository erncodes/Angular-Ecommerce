import { inject, Injectable } from "@angular/core";
import { Product } from "../models/product";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn : 'root'
})
export class ProductService{
  products : Product[] = [];
  filteredProdArray : any[] = [];
  productClicked : BehaviorSubject<any> = new BehaviorSubject<any>('');
  textSubject : BehaviorSubject<string> = new BehaviorSubject<string>('All');
  
  httpClient : HttpClient = inject(HttpClient);
   //Filter products based on filter text,return popular if no text passed
   GetProductsFiltered(filterText? : string){
      if(filterText == 'Popular'){
        this.filteredProdArray = this.products.filter(prod => prod.rating > 4);
        this.filteredProdsSub.next(this.filteredProdArray);
        this.textSubject.next('Popular Kicks');
       return this.filteredProdArray;
      }
      else if(filterText == 'NewArrivals'){
        this.filteredProdArray = this.products.filter(prod => this.IsNewProduct(prod));
        this.filteredProdsSub.next(this.filteredProdArray);
        this.textSubject.next('New Kicks This Month');
       return this.filteredProdArray;
      }
      else{
        this.filteredProdArray = this.products;
        this.filteredProdsSub.next(this.filteredProdArray);
        this.textSubject.next('All Products');
        return this.filteredProdArray;
       }
   }
   //Get all products
   GetAllProducts(){
    let headers = new HttpHeaders();
     headers = headers.set('Access-Control-Allow-Origin','*');
    this.httpClient.get<{ [key : string] : Product}>('https://urbanstrides-640e5-default-rtdb.europe-west1.firebasedatabase.app/products.json',{headers : headers})
      .pipe(map((data)=>{
      let items = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
        {
          items.push({...data[key],id : key})
        }
      }
      return items;
    })).subscribe((products)=>{
      this.products = products;
      this.filteredProdsSub.next(this.GetProductsFiltered());
    });
   }

    SubscribeToProducts(){ 
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
      const date1 = new Date(prod.dateAdded);
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
      let returnProducts = this.products.filter( prod => (prod.rating == product.rating || prod.title.includes(product.title)));
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
    
   filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
   productSearch : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products.slice(0,4));

}