import { Component, inject } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search-combo.component.html',
  styleUrls: ['./search-combo.component.css']
})
export class SearchComboComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  searchMode : boolean = false;
  prodService : ProductService = inject(ProductService);
  products : Product[] = [];
  SearchText : string = '';
  router : Router = inject(Router);

  ToggleSearch(){
    this.searchMode = !this.searchMode
  }
  ngOnInit(){
    this.prodService.productSearch.subscribe((data)=>{
      this.products = data;
    })
  }
  SearchProduct(text : any){
     this.prodService.Searchproducts(text);
  }
  ViewProduct(prod : any){
    this.prodService.ViewProduct(prod);
    this.router.navigate(['Home','Product-view']);
    this.ToggleSearch();
  }
}
