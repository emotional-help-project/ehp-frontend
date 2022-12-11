import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotService } from 'src/app/features/forgot/service/forgot.service';

import { LoginService } from 'src/app/features/login/services/login.service';
import { RegisterService } from 'src/app/features/register/services/register.service';
import { createEmailStrengthValidator } from 'src/app/shared/validators/email-strength.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';
import { User } from '../../models/user';
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
  @Input() forgotForm: boolean;
  @Input() resetForm: boolean;



  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private loginService: LoginService,
    private forgotService: ForgotService,
    private router: Router,
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
    } if (this.forgotForm) {
      this.form = this.fb.group({
        email: [null, [Validators.required, Validators.email, Validators.minLength(10), createEmailStrengthValidator()]]
      });
    }
    if (this.resetForm) {
      this.form = this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator(), matchPasswordValidator()]],
        confirmPassword: [null, [Validators.required]]
      });
    }
    else {
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
        console.log(value);
        this.router.navigateByUrl('/');
        this.submitted = false;
      },
      error: () => this.submitted = false
    });
  }
  //for send token email. Token  and message came form backend
  forgot() {
    const value = this.form.value.email;
    console.log(value);
    this.submitted = true;

    this.forgotService.forgotService(value).subscribe(
      {//TODO We need to navigate back and after send need to show message we send reset link check your email.
        // this all process happen without singing in 

        next: () => {

          console.log(value);
          this.router.navigateByUrl('/');
          this.submitted = false;
        },
        error: () => this.submitted = false
      }

    );
    this.reset();
  }
  reset() {
    const value1 = this.form.value.resetPasswordToken;
    const value2 = this.form.value.password;
    
    console.log(value1);
    console.log(value2);
    
    this.submitted = true;
    this.forgotService.resetForm(value1,value2).subscribe(
      {//TODO We need to navigate back and after send need to show message we send reset link check your email.
        // this all process happen without singing in 
        next: () => {
          console.log(value1);
          this.router.navigateByUrl('/');
          this.submitted = false;
        },
        error: () => this.submitted = false
      }
    );
  }
}
