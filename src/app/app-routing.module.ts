import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/components/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.module').then(_ => _.RegisterModule)
  },
  {
    path: 'tests',
    loadChildren: () => import('./features/tests/tests.module').then(_ => _.TestsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(_ => _.ProfileModule)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
