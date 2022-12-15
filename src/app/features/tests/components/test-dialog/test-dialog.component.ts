import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TestsService } from '../../services/tests.service';
import { TestListItem } from '../../models/test-list-item.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
  styleUrls: ['./test-dialog.component.scss']
})
export class TestDialogComponent implements OnInit {
  testForm!: FormGroup;
  tests$: Observable<TestListItem[]>;

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: TestListItem,
     private formBuilder: FormBuilder,
      public tests: TestsService,
      private ref: MatDialogRef<ItemDialogComponent>,){}

      ngOnInit(): void {
        //this.getAllTypes()
        this.tests$ = this.tests.tests$.pipe(map(res => res));
        this.testForm = this.formBuilder.group({ 
          url: ['', Validators.required],
          testTitle: ['', Validators.required],
          description: ['', Validators.required],
          testType:  this.formBuilder.group({
            title:['', Validators.required],
          })
        })
      }

  openDialog(){
/*     const test = this.testForm.value;
    const mappedTest: TestListItem = {
      //id: Date.now(),
      description: test.description,
      title: test.testTitle,
      imageUrl: test.url,
      testType: {
        id: 1,
        title: test.title
      }
    }
    this.tests.addTestCard(mappedTest).subscribe(response => {
      console.log(response);
      this.ref.close();
    }) */
    //this.tests.testList.push(mappedTest)
    //this.tests.addTestCard().subscribe()
    this.tests.addTestCard({
            //id: Date.now(),
             description: this.testForm.value.description,
            title: this.testForm.value.testTitle,
            imageUrl: this.testForm.value.url,
            testType: {
              id: 1,
              title: this.testForm.value.testType,
            }
    }).subscribe((res)=>{
      console.log(res)
      this.dialog.open(ItemDialogComponent, {
        width: '500px',
        height: '500px',
        data: {
          testId: res.id
        }
      });
    })
//    ref.afterClosed().subscribe(data => console.log(data))
  }

/*   getAllTypes(){
    this.tests.getTestType()
    .subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  } */
}
