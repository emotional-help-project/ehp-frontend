import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createEmailStrengthValidator } from 'src/app/shared/validators/email-strength.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(10), createEmailStrengthValidator()]],
      password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
    });
  }

  ngOnInit() { }

  register(): void {}

  login() {}

}
