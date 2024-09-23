import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./container/home/home.component";
import { ProductsCartComponent } from "./container/home/products-cart/products-cart.component"; 
import { ProductDetailsComponent } from "./container/home/product-details/product-details.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NewArrivalsComponent } from "./container/home/new-arrivals/new-arrivals.component";
import { ContactComponent } from "./container/home/contact/contact.component";
import { AboutComponent } from "./container/home/about/about.component";
import { CheckoutComponent } from "./container/home/products-cart/checkout/checkout.component";


const routes : Routes = [
    { path : '', component : HomeComponent},
    { path : 'Home', component : HomeComponent},
    { path  : 'Home', children : [
        { path : 'Product-view', component : ProductDetailsComponent},
        { path : 'Cart', component : ProductsCartComponent},
        {path : 'Cart', children: [
            {path : 'CheckOut', component : CheckoutComponent}
        ]}
    ]},
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