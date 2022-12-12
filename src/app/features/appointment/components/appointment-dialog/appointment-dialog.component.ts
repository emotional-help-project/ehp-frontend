import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Specialist } from 'src/app/features/specialists/models/specialist';
import { SpecialistsService } from 'src/app/features/specialists/services/specialists.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
})
export class AppointmentDialogComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  psychologists$: Observable<Specialist[] | null>;
  today = new Date().toISOString().split('T')[0];
  @Output() showModal = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<boolean>();

  constructor(
    public fb: FormBuilder,
    private psychologistsService: SpecialistsService
  ) {
    this.form = this.fb.group({
      psychologistId: ['', [Validators.required]],
      desiredDate: ['', [Validators.required]],
      userPhone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.psychologists$ = this.psychologistsService.specialists$.pipe(
      res => res
    );
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
