import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './container/header/header.component';
import { Button1Component } from './button-1/button-1.component';
import { ContainerComponent } from './container/container.component';
import { FilterComponent } from './container/filter/filter.component';
import { ProductListComponent } from './container/product-list/product-list.component';
import { BottomHeaderComponent } from './container/header/bottom-header/bottom-header.component';
import { TopHeaderComponent } from './container/header/top-header/top-header.component';
import { HomeComponent } from './container/home/home.component';
import { ProductDetailsComponent } from './container/product-details/product-details.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { FooterComponent } from './container/footer/footer.component';
import { MainheaderComponent } from './container/header/mainheader/mainheader.component';
import { SearchComboComponent } from './container/search-combo/search-combo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Button1Component,
    ContainerComponent,
    FilterComponent,
    ProductListComponent,
    BottomHeaderComponent,
    TopHeaderComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProductsCartComponent,
    FooterComponent,
    MainheaderComponent,
    NotFoundComponent,
    CheckoutComponent,
    SearchComboComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
