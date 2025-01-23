import { Routes } from '@angular/router';
import { StoresComponent } from './pages/shops/stores.component';
import { StoreDetailsComponent } from './pages/store-details/store-details/store-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'stores', pathMatch: 'full' },
  { path: 'stores', component: StoresComponent },
  { path: 'stores/:id', component: StoreDetailsComponent },
];
