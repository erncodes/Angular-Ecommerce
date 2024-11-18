import { Component, inject,ChangeDetectorRef } from '@angular/core';
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
  constructor(private cd : ChangeDetectorRef){}
  SearchText : string = '';
  products : Product[] | undefined = [];
  searchMode : boolean = false;
  
  router : Router = inject(Router);
  prodService : ProductService = inject(ProductService);
  notifyService : NotificationService = inject(NotificationService);

  ToggleSearch(){
      this.searchMode = !this.searchMode
    }

  ngOnInit(){
    this.prodService.GetAllProducts();
      this.prodService.SubcribeToSearchProducts().subscribe({
        next : (data) => {this.products = data.filter(prod => prod.rating > 4.9);},
        error: (error)=>{ this.notifyService.ShowErrorNotification(error) }
      })
      console.log(this.products)
    }

  SearchProduct(text : any){
      this.prodService.Searchproducts(text);
    }
    
  ViewProduct(prod : Product){
      this.router.navigate(['/Home/Product-View/'+ prod.id]);
      this.cd.detectChanges();
      this.ToggleSearch();
    }
}
