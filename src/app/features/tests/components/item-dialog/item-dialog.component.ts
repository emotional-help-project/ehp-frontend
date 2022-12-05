import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent {
  constructor(
    private ref: MatDialogRef<ItemDialogComponent>
  ) {}
  saveAll() {
   // this.ref.close('fs')
    //
  }
}
