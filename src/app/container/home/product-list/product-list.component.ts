import { ChangeDetectorRef, Component, inject} from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  constructor(private cd : ChangeDetectorRef){}

  headerText : string = '';
  isLoading : boolean = true;
  products : Product[] | undefined  = [];

  router : Router = inject(Router);
  prodService = inject(ProductService);
  notifyService : NotificationService = inject(NotificationService);
  
  ngOnInit(){
    this.isLoading = true;
    this.prodService.GetAllProducts();
    this.prodService.GetProductsFiltered();
    this.prodService.SubscribeToProducts().subscribe({
      next : (prodArray) => { this.products = prodArray;},
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    })
    this.prodService.textSubject.subscribe({
      next : (text) => {
      this.headerText = text;
      this.cd.detectChanges(); },
      error : (error) => { this.notifyService.ShowErrorNotification(error) }
    });
  }
}