import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/features/login/services/login.service';
import { RegisterService } from 'src/app/features/register/services/register.service';
import { createEmailStrengthValidator } from 'src/app/shared/validators/email-strength.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';

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
  ) { }

  ngOnInit() {
    if (this.registerForm) {
      this.form = this.fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        age: [null],
        gender: [null],
        email: [null, [Validators.required, Validators.email, Validators.minLength(10), createEmailStrengthValidator()]],
        password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
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
    console.log(value);
    this.registerService.register(value).subscribe({
      next: () => this.submitted = false,
      error: () => this.submitted = false
    });
  }

  login() {
    const value = this.form.value;
    this.submitted = true;
    console.log(value);
    this.loginService.login(value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.submitted = false;
      },
      error: () => this.submitted = false
    });
  }

}
