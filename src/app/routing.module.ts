import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./container/home/home.component";
import { LoginComponent } from "./container/login/login.component";
import { AboutComponent } from "./container/home/about/about.component";
import { WishlistComponent } from "./container/wishlist/wishlist.component";
import { NotFoundComponent } from "./container/not-found/not-found.component";
import { CheckoutComponent } from "./container/home/products-cart/checkout/checkout.component";
import { ProductsCartComponent } from "./container/home/products-cart/products-cart.component"; 
import { ProductDetailsComponent } from "./container/home/product-list/product-details/product-details.component";


const routes : Routes = [
    { path : '', component : HomeComponent},
    { path : 'Home', component : HomeComponent},
    { path : 'Login', component : LoginComponent},
    { path  : 'Home', children : [
        { path : 'WishList', component : WishlistComponent},
        { path : 'Cart', component : ProductsCartComponent},
        { path : 'Product-View/:id', component : ProductDetailsComponent},
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
      AboutComponent,
    ]
})
export class RoutingModule{
 
}