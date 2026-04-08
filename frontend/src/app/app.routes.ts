import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContratarComponent } from './pages/contratar/contratar.component';
import { PlanesComponent } from './components/planes/planes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'planes', component: PlanesComponent },

  // Wizard dentro de /contratar/...
  {
    path: 'contratar',
    component: ContratarComponent,
    children: [
      {
        path: 'customer',
        loadComponent: () =>
          import('./pages/contratar/customer-form/customer.component')
            .then(m => m.RegistroBasicoComponent),
          data: { animation: 'customer' }
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/contratar/product-form/product.component')
            .then(m => m.EstadoPlanComponent),
          data: { animation: 'product' }
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./pages/contratar/payment-form/payment.component')
            .then(m => m.PagoComponent),
          data: { animation: 'payment' }
      },

      {
        path: 'success',
        loadComponent: () =>
          import('./pages/contratar/success/success.component')
            .then(m => m.SuccessComponent),
          data: { animation: 'success' }
      },

      // si entran a /contratar sin nada
      { path: '', redirectTo: 'customer', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '' },
];