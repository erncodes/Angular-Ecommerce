import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./container/home/home.component";
import { ProductsCartComponent } from "./products-cart/products-cart.component";
import { ProductDetailsComponent } from "./container/product-details/product-details.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NewArrivalsComponent } from './container/new-arrivals/new-arrivals.component';
import { ContactComponent } from './container/contact/contact.component';
import { AboutComponent } from './container/about/about.component';
import { CheckoutComponent } from "./checkout/checkout.component";


const routes : Routes = [
    { path : '', component : HomeComponent},
    { path : 'Home', component : HomeComponent},
    { path : 'Cart', component : ProductsCartComponent},
    {path : 'Details', component : ProductDetailsComponent},
    {path : 'CheckOut', component : CheckoutComponent},
    {path : '**', component : NotFoundComponent}
]
@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[ RouterModule ],
    declarations: [
      NewArrivalsComponent,
      ContactComponent,
      AboutComponent,
    ]
})
export class RoutingModule{
 
}