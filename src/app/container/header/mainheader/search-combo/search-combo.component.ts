import { Component, inject } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.services';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-combo.component.html',
  styleUrls: ['./search-combo.component.css']
})
export class SearchComboComponent {
  SearchText : string = '';
  products : Product[] = [];
  searchMode : boolean = false;
  
  router : Router = inject(Router);
  prodService : ProductService = inject(ProductService);
  notifyService : NotificationService = inject(NotificationService);

  ToggleSearch(){
      this.searchMode = !this.searchMode
    }

  ngOnInit(){
      this.prodService.productSearch.subscribe({
        next : (data) => {this.products = data;},
        error: (error)=>{ this.notifyService.ShowErrorNotification(error) }
      })
    }

  SearchProduct(text : any){
      this.prodService.Searchproducts(text);
    }
    
  ViewProduct(prod : any){
      this.ToggleSearch();
    }
}
