import { Component, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  router : Router = inject(Router);
  SelectedProd : EventEmitter<Product> = new EventEmitter<Product>()
}
