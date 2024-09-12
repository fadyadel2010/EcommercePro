import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { ProductComponent } from './Components/product/product.component';
import { authGuard } from './Core/Guards/auth.guard';
import { alreadyLoggedGuard } from './Core/Guards/already-logged.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ForgetComponent } from './Components/ForgetPass/forget/forget.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { SuccespaymentComponent } from './Components/succespayment/succespayment.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'' , component:AuthLayoutComponent , canActivate:[alreadyLoggedGuard]
    , children:[
        {path: '' , redirectTo: 'login' , pathMatch:'full'},
        {path: 'login' , component:LoginComponent},
        {path: 'register' , component:RegisterComponent},
        {path: 'forget' , component:ForgetComponent},
        
    ]},

    {path: '' , component:BlankLayoutComponent , canActivate:[authGuard],
    children:[
        {path:'' , redirectTo:'home',  pathMatch:'prefix'},
        {path: 'home' , component:HomeComponent},
        {path: 'cart' , component:CartComponent},
        {path: 'categories' , component:CategoriesComponent},
        {path: 'brands' , component:BrandsComponent},
        {path:'products' , component:ProductComponent},
        {path:'details/:id' , component:ProductDetailsComponent},
        {path: 'checkout' , component:CheckoutComponent},
        {path: 'allorders' , component:AllordersComponent},
        {path: 'success' , component:SuccespaymentComponent},
        {path: 'wishlist' , component:WishlistComponent}



    ]},
    {path: '**' , component:NotfoundComponent}
];
