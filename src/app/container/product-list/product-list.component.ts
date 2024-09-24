import { Component, inject, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  prodService = inject(ProductService);
  products : Product[] | undefined  = [];
  router : Router = inject(Router);

  MyMethod(prod : any){
    this.prodService.ViewProduct(prod);
    this.router.navigate(['Home','Product-view']);
  }
  ngOnInit(){
    this.prodService.GetProducts().subscribe((prodArray)=>{
      this.products = prodArray;
    })
  }

  isNewProduct(prod:Product){
   return this.prodService.IsNewProduct(prod);
  }
}
