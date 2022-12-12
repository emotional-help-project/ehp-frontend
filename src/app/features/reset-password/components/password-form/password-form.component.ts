import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
      this.form = this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator(), matchPasswordValidator()]],
        confirmPassword: [null, [Validators.required]]
      }, {
        validators: matchPasswordValidator()
      });
   }

   savePassword() {
    console.log();
    
   }
}
