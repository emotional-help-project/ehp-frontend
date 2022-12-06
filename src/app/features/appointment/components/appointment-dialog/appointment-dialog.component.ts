import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
})
export class AppointmentDialogComponent {
  form: FormGroup;
  @Output() showModal = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<boolean>();
  submitted = false;
  psychologists = [
    {
      id: 1,
      name: 'Psychologist 1',
    },
    {
      id: 1,
      name: 'Psychologist 2',
    },
    {
      id: 1,
      name: 'Psychologist 3',
    },
  ];

  constructor(public fb: FormBuilder) {
  this.form = this.fb.group({
    psychologistId : ['', [Validators.required]],
    desiredDate: ['', [Validators.required]],
    userPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]]
  });
  }

  makeAppointment() {
    const data = this.form.value;
    this.data.emit(data);
    this.showModal.emit(false);
  }

  closeModal() {
    this.showModal.emit(false);
  }

}
