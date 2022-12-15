import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { matchPasswordValidator } from 'src/app/shared/validators/match-password.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  token: string;

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';

      this.form = this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator(), matchPasswordValidator()]],
        confirmPassword: [null, [Validators.required]]
      }, {
        validators: matchPasswordValidator()
      });
   }

   savePassword() {
    const password = this.form.value.password;
    this.resetPasswordService.resetPassword(password, this.token).subscribe();
  }
}
