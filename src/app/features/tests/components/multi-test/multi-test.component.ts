import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Test } from '../../models/test.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-multi-test',
  templateUrl: './multi-test.component.html',
  styleUrls: ['./multi-test.component.scss'],
})
export class MultiTestComponent implements OnInit {

  form: FormGroup;
  tests: Test;

  constructor(
    private fb: FormBuilder,
    private testService: TestsService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({});
    this.tests = this.testService.test;
    this.tests.items.forEach(formItem =>{
      if (!formItem.allowsMultipleAnswers) {
        this.form.addControl(
        formItem.questionId.toString(),
        this.fb.control('')
      )} else {
        formItem.answers.forEach(item =>
        this.form.addControl(
          item.answerId.toString(),
          this.fb.control(false)
        )
      )}
    });
  }

  finish() {
  console.log(this.form.value);
  }
      
}
