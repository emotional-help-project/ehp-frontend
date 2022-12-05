import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent {

  constructor(private dialog: MatDialog){}

  openDialog(){
    const ref = this.dialog.open(ItemDialogComponent, {
      minWidth: '400px',
      minHeight: '400px'
    });

//    ref.afterClosed().subscribe(data => console.log(data))
  }

}
