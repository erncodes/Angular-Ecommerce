import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import {  HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './container/home/home.component';
import { LoginComponent } from './container/login/login.component';
import { FooterComponent } from './container/footer/footer.component';
import { NotFoundComponent } from './container/not-found/not-found.component';
import { MainheaderComponent } from './container/header/mainheader/mainheader.component';
import { ProductListComponent } from './container/home/product-list/product-list.component';
import { ProductsCartComponent } from './container/home/products-cart/products-cart.component'; 
import { PaymentComponent } from './container/home/products-cart/checkout/payment/payment.component';
import { ProductDetailsComponent } from './container/home/product-list/product-details/product-details.component';
import { SearchComboComponent } from './container/header/mainheader/search-combo/search-combo.component';
import { BottomHeaderComponent } from './container/header/bottom-header/bottom-header.component';
import { CheckoutComponent } from './container/home/products-cart/checkout/checkout.component';
import { TopHeaderComponent } from './container/header/top-header/top-header.component';
import { WishlistComponent } from './container/wishlist/wishlist.component';
import { HeaderComponent } from './container/header/header.component';
import { HeroComponent } from './container/home/hero/hero.component';
import { ContainerComponent } from './container/container.component';
import { LoaderComponent } from './container/loader/loader.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    ProductListComponent,
    BottomHeaderComponent,
    ProductDetailsComponent,
    ProductsCartComponent,
    SearchComboComponent,
    MainheaderComponent,
    TopHeaderComponent,
    CheckoutComponent,
    NotFoundComponent,
    PaymentComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    HeroComponent,
    LoaderComponent,
    WishlistComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RoutingModule,
    BreadcrumbModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide : HTTP_INTERCEPTORS,useClass : AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
