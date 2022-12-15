import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../features/register/services/register.service';
import { LoginService } from '../features/login/services/login.service';
import { PasswordToggleDirective } from './directives/password-toggle.directive';
import { MessagesComponent } from './components/messages/messages.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ProfileService } from '../features/profile/services/profile.service';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';

@NgModule({
  declarations: [
    ButtonComponent,
    AuthFormComponent,
    PasswordToggleDirective,
    MessagesComponent,
    ConfirmDialogComponent,
    ErrorMessagesComponent,
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
    PasswordToggleDirective,
    MessagesComponent,
    ConfirmDialogComponent, 
    ErrorMessagesComponent
  ],
  providers: [
    RegisterService,
    LoginService,
    ProfileService
  ]
})
export class SharedModule { }
