import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from '../../models/test.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent implements OnInit {
  tests: Test;
  testItemForm!: FormGroup;

  constructor(
    private ref: MatDialogRef<ItemDialogComponent>,
    public testService: TestsService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { testId: number }
  ) {}
  ngOnInit() {
    //this.tests = this.testService.test;
    this.testItemForm = this.formBuilder.group({
      question: ['', Validators.required],
      firstItem: ['', Validators.required],
      secondItem: ['', Validators.required],
      thirdItem: ['', Validators.required],
    });
  }
  saveAll() {
    this.testService.addQuestion({
      questionTitle: this.testItemForm.value.question,
      allowsMultipleAnswers: false,
      questionNumber: 1,
      testId: this.data.testId,
      answers: [
        {
          title: this.testItemForm.value.firstItem,
          score: 1,
        },
        {
          title: this.testItemForm.value.secondItem,
          score: 2,
        },
        {
          title: this.testItemForm.value.thirdItem,
          score: 3,
        },
      ],
    }).subscribe(response => {
      console.log(response);
      this.ref.close();
    })
  }
}
