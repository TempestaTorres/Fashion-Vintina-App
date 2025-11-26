import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {About} from './pages/about/about';
import {Product} from './components/product/product';
import {Category} from './components/category/category';
import {ShopComponent} from './components/shop.component/shop.component';
import {CartComponent} from './components/cart.component/cart.component';
import {BridalShapewear} from './posts/bridal-shapewear/bridal-shapewear';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'about', component: About},
  {path: 'shop', component: ShopComponent},
  {path: 'product/:type', component: Product},
  {path: 'product-category/:name', component: Category},
  {path: 'product-tag/:tag', component: Category},
  {path: 'cart', component: CartComponent},
  {path: 'bridal-shapewear', component: BridalShapewear},
];
