import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(_ => _.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.module').then(_ => _.RegisterModule)
  },
  {
    path: 'tests',
    loadChildren: () => import('./features/tests/tests.module').then(_ => _.TestsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
