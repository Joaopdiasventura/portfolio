import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
];
