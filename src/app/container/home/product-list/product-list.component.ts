import { ChangeDetectorRef, Component, inject} from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  constructor(private cd : ChangeDetectorRef){
    
  }
  prodService = inject(ProductService);
  products : Product[] | undefined  = [];
  router : Router = inject(Router);
  headerText : string = '';
  isLoading : boolean = false;
  ngOnInit(){
    this.isLoading = true;
    this.prodService.GetAllProducts();
    this.prodService.GetProductsFiltered();
    this.prodService.SubscribeToProducts().subscribe((prodArray)=>{
      this.products = prodArray;
    })
    this.prodService.textSubject.subscribe((text)=>{
      this.headerText = text;
      this.cd.detectChanges();
    });
    this.isLoading = false;
  }
}
