import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    loadComponent: () => import('./pages/listar/listar.page').then( m => m.ListarPage)
  },
  {
    path: 'agregar',
    loadComponent: () => import('./pages/agregar/agregar.page').then( m => m.AgregarPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'testcamara',
    loadComponent: () => import('./pages/testcamara/testcamara.page').then( m => m.TestcamaraPage)
  },
  {
    path: 'testgeo',
    loadComponent: () => import('./pages/testgeo/testgeo.page').then( m => m.TestgeoPage)
  },
  {
    path: 'testapi',
    loadComponent: () => import('./pages/testapi/testapi.page').then( m => m.TestapiPage)
  },
];
