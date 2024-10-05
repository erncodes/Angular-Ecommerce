import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoutingModule } from './routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { BottomHeaderComponent } from './container/header/bottom-header/bottom-header.component';
import { CheckoutComponent } from './container/home/products-cart/checkout/checkout.component';
import { ContainerComponent } from './container/container.component';
import { FilterComponent } from './container/filter/filter.component';
import { FooterComponent } from './container/footer/footer.component';
import { HeaderComponent } from './container/header/header.component';
import { HeroComponent } from './container/home/hero/hero.component';
import { HomeComponent } from './container/home/home.component';
import { MainheaderComponent } from './container/header/mainheader/mainheader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './container/product-list/product-list.component';
import { ProductDetailsComponent } from './container/home/product-details/product-details.component';
import { ProductsCartComponent } from './container/home/products-cart/products-cart.component'; 
import { SearchComboComponent } from './container/search-combo/search-combo.component';
import { TopHeaderComponent } from './container/header/top-header/top-header.component';
import { SnackbarComponent } from './container/home/snackbar/snackbar.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    SearchComboComponent,
    HeroComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RoutingModule,
    BreadcrumbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
