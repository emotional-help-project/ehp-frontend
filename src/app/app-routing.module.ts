import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContacstSectionComponent } from './features/contacts/components/contacst-section/contacst-section.component';
import { CoursesComponent } from './features/home/courses/courses.component';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/components/login.component';
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
    component: ProfileSectionComponent
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
    path: 'courses',
    component: CoursesComponent
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
