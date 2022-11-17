import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component'; 
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogModule } from '../blog/blog.module';
// import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';
// import { FormErrorMsgDirective } from 'src/app/Directives/formErrorMsg/form-error-msg.directive';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusinessRegisComponent } from './business-regis/business-regis.component';
import { LeftSidebarComponent } from '../shop/products/left-sidebar/left-sidebar.component';
import { ShopModule } from '../shop/shop.module';
import { ViewCartComponent } from './view-cart/view-cart.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    NgxPaginationModule,
    BlogModule,
    ShopModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule

  ],
  declarations: [
    CartComponent,
    // FormErrorMsgDirective,
    ContactComponent,
    WishlistComponent,
    CompareComponent,
    CheckoutComponent,
    MyAccountComponent,
    FaqComponent,
    AboutUsComponent,
    // ErrorPageComponent,
    AuthComponent,
    SignupComponent,
    ForgotPasswordComponent,
    BusinessRegisComponent,
    ViewCartComponent,


  ]
})
export class PagesModule { }
