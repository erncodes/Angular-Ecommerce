import { inject, Injectable } from "@angular/core";
import { Product } from "../models/product";
import { BehaviorSubject,Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn : 'root'
})
export class ProductService{
  products : Product[] = [];
  filteredProdArray : any[] = [];
  searchProducts : Product[] = [];
  productClicked : Subject<any> = new Subject<any>();
  similarProds : BehaviorSubject<[]> = new BehaviorSubject<any>([]);
  textSubject : BehaviorSubject<string> = new BehaviorSubject<string>('All');
  productSearchSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  
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
      this.productSearchSub.next(this.GetProductsFiltered());
    });
   }
   GetProductById( id : string | undefined){
    this.httpClient.get<{[key : string] : Product}>('https://urbanstrides-640e5-default-rtdb.europe-west1.firebasedatabase.app/products/'+id+'.json')
    .pipe(map((response)=>{
      let prod = {};
      prod = {...response, id : id};
      return prod;
    })).subscribe((product)=>{
      this.productClicked.next(product);
    }
    )
   }
    SubscribeToProducts(){ 
      return this.filteredProdsSub.asObservable();
    }
    SubcribeToSearchProducts(){
      return this.productSearchSub.asObservable();
    }
    //Search products based on title
    Searchproducts(text: string){
      this.filteredProdArray = this.products.filter( prod => prod.title.toLowerCase().includes(text.toLocaleLowerCase()));
      this.productSearchSub.next(this.filteredProdArray);
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


}