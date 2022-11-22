import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    component: RegisterComponent
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class RegisterModule { }
