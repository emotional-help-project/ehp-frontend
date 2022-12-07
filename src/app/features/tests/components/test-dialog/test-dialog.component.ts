import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TestsService } from '../../services/tests.service';
import { TestListItem } from '../../models/test-list-item.interface';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent implements OnInit {
  testForm!: FormGroup;

  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: TestListItem, private formBuilder: FormBuilder, private tests: TestsService){}

  openDialog(){
    const test = this.testForm.value;
    const mappedTest: TestListItem = {
      id: Date.now(),
      description: test.description,
      title: test.testTitle,
      imgUrl: test.url,
      testType: {
        id: Date.now(),
        title: test.testTitle
      }
    }
    this.tests.testList.push(mappedTest)
    const ref = this.dialog.open(ItemDialogComponent, {
      minWidth: '400px',
      minHeight: '400px',
    });

//    ref.afterClosed().subscribe(data => console.log(data))
  }
  ngOnInit(): void {
    this.testForm = this.formBuilder.group({ 
      url: ['', Validators.required],
      testTitle: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

}
