import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { CartService } from 'src/app/services/productCart.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  constructor(){
  }
  selectedProd : any;
  prodService : ProductService = inject(ProductService);
  cartService : CartService = inject(CartService);
  cartProducts : Product[] = [];

  ngOnInit(){

    this.prodService.productClicked.subscribe((prod : Product)=>{
      this.selectedProd = prod;
    });
  }
  AddToCart(prod : Product){
    this.cartService.AddToCart(prod);
  }
}
