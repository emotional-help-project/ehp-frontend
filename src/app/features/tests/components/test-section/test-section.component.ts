import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';

@Component({
  selector: 'app-test-section',
  templateUrl: './test-section.component.html',
  styleUrls: ['./test-section.component.scss']
})
export class TestSectionComponent {

  constructor(private dialog: MatDialog){ }

  openDialog() {
    this.dialog.open(TestDialogComponent, {
      minWidth: '400px',
      minHeight: '400px'
    });
  }

}
