import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/features/login/services/login.service';
import { ProfileService } from 'src/app/features/profile/services/profile.service';
import { RegisterService } from 'src/app/features/register/services/register.service';
import { createEmailStrengthValidator } from 'src/app/shared/validators/email-strength.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';
import { MessagesService } from '../../services/messages.service';
import { matchPasswordValidator } from '../../validators/match-password.validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  @Input() registerForm: boolean;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router,
    public messages: MessagesService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    if (this.registerForm) {
      this.form = this.fb.group({
        firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        age: [null, [Validators.required]],
        gender: ['OTHER', [Validators.required]],
        email: [null, [Validators.required, Validators.email, createEmailStrengthValidator()]],
        password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator(), matchPasswordValidator()]],
        confirmPassword: [null, [Validators.required]]
      }, {
        validators: matchPasswordValidator()
      });
    } else {
        this.form = this.fb.group({
          email: [null, [Validators.required, Validators.email, Validators.minLength(10), createEmailStrengthValidator()]],
          password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      });
    }  
   }

   register() {
    const value = this.form.value;
    this.submitted = true;
    this.registerService.register(value).subscribe({
      next: () => {
        this.submitted = false;
        this.router.navigateByUrl('/login');
      },
      error: () => this.submitted = false
    });
  }

  login() {
    const value = this.form.value;
    this.submitted = true;
    this.loginService.login(value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.submitted = false;
      },
      error: () => this.submitted = false
    });
  }


  forgotPassword() {
    const email = this.form.value.email;
    this.loginService.sendEmail(email).subscribe({
      next: () => {
        this.submitted = false;
      },
      error: () => this.submitted = false
    });
  }
}
