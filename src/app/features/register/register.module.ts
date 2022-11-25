import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register.component';
import { RegisterService } from './services/register.service';

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
    HttpClientModule
  ],
  providers: [RegisterService],
})
export class RegisterModule { }
