import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { createEmailStrengthValidator } from 'src/app/shared/validators/email-strength.validator';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';

@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.scss']
})
export class EditDataDialogComponent implements OnInit {

  form: FormGroup;
  @Input() type: string;
  @Output() showModal = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<boolean>();
  submitted = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.type === 'firstName') {
      this.form = this.fb.group({
        firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      });
    }
    if (this.type === 'lastName') {
      this.form = this.fb.group({
        lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      });
    }
    if (this.type === 'age') {
      this.form = this.fb.group({
        age: [null, [Validators.required]],
      });
    }
    if (this.type === 'gender') {
      this.form = this.fb.group({
        gender: ['OTHER', [Validators.required]],
      });
    }
    if (this.type === 'email') {
      this.form = this.fb.group({
        email: [null, [Validators.required, Validators.email, createEmailStrengthValidator()]],
      });
    }
    if (this.type === 'password') {
      this.form = this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator(), matchPasswordValidator()]],
        confirmPassword: [null, [Validators.required]]
      }, {
        validators: matchPasswordValidator()
      });
    }
  }

  saveData() {
    const data = this.form.value;
    this.data.emit(data);
    this.showModal.emit(false);
  }

  closeModal() {
    this.showModal.emit(false);
  }
}
