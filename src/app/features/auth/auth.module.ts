import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthSectionComponent } from './components/auth-section/auth-section.component';


const routes: Routes = [
  {
    path: '',
    component: AuthSectionComponent
  },
];

@NgModule({
  declarations: [
    AuthFormComponent,
    AuthSectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
