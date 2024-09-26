import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { AboutComponent } from './features/about/about.component';
import { AddProductComponent } from './features/admin/add-product/add-product.component';
import { CartComponent } from './features/cart/cart.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { PhotoEditorComponent } from './shared/components/photo-editor/photo-editor.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'cart', component: CartComponent },
  { path: 'uploader', component: PhotoEditorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'shop',
    loadChildren: () =>
      import('./features/shop/routes').then((m) => m.shopRoutes),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/routes').then((mod) => mod.checkoutRoutes),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/routes').then((mod) => mod.orderRoutes),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/routes').then((mod) => mod.accountRoutes),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [adminGuard, adminGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [adminGuard, adminGuard],
  },
  { path: 'error', component: TestErrorComponent, canActivate: [adminGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
