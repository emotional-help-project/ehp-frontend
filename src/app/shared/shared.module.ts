import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../features/register/services/register.service';
import { LoginService } from '../features/login/services/login.service';
import { PasswordToggleDirective } from './directives/password-toggle.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    AuthFormComponent,
    PasswordToggleDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ButtonComponent,
    AuthFormComponent,
    PasswordToggleDirective
  ],
  providers: [
    RegisterService,
    LoginService
  ]
})
export class SharedModule { }
