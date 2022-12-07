import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Test } from '../../models/test.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent {
  tests: Test;
  constructor(
    private ref: MatDialogRef<ItemDialogComponent>,
    public testService: TestsService,
  ) {}
  ngOnInit(){
    this.tests = this.testService.test;
  }
  saveAll() {
   // this.ref.close('fs')
    //
  }
}
