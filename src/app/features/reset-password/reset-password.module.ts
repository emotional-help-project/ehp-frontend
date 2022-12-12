import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
   path: '',
   component: PasswordFormComponent
 },
];

@NgModule({
  declarations: [
    PasswordFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ResetPasswordModule { }
