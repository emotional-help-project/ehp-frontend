import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  testId: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private testService: TestsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tests = this.testService.test;
    this.testId = this.route.snapshot.paramMap.get('id') ?? '';

    this.form = new FormGroup({});
    this.tests.items.forEach(formItem => {
      if (!formItem.allowsMultipleAnswers) {
        this.form.addControl(
          formItem.questionId.toString(),
          this.fb.control('', Validators.required)
        );
      } else {
        formItem.answers.forEach(item =>
          this.form.addControl(
            item.answerId.toString(),
            this.fb.control(false)
          )
        );
      }
    });
  }

  finish() {
    this.submitted = true;
    if (this.form.valid) {
      this.testService.finishTest(this.form.value, this.testId);
      this.submitted = false;
      this.form.reset();
    }
  }
}
