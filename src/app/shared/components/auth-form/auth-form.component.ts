import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { createEmailStrengthValidator } from 'src/app/shared/validators/email-strength.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  @Input() registerForm: boolean;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.registerForm) {
      this.form = this.fb.group({
        name: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
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

  register(): void {
    const value = this.form.value;
    this.submitted = true;
  }

  login() {
    const value = this.form.value;
    this.submitted = true;    
  }

}
