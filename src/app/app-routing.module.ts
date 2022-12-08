import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContacstSectionComponent } from './features/contacts/components/contacst-section/contacst-section.component';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/components/login.component';
import { AuthGuard } from './features/login/services/auth.guard';
import { ChartComponent } from './features/profile/components/chart/chart.component';
import { ProfileSectionComponent } from './features/profile/components/profile-section/profile-section.component';

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
    path: 'contacts',
    component: ContacstSectionComponent
  },
  {
    path: 'profile',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/statistics',
    component: ChartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/advices',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/links',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
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
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
