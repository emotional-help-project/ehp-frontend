import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() title: string;
  @Output() showModal = new EventEmitter<boolean>();
  @Output() confirmation = new EventEmitter<boolean>();

  toAgree() {
    this.confirmation.emit(true);
  }

  toCancel() {
    this.confirmation.emit(false);
  }

  closeModal() {
    this.showModal.emit(false);
  }
}
