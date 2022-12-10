import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Test } from '../../models/test.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-multi-test',
  templateUrl: './multi-test.component.html',
  styleUrls: ['./multi-test.component.scss'],
})
export class MultiTestComponent implements OnInit, OnDestroy {
  form: FormGroup;
  test: Test;
  testId: string;
  submitted = false;
  showResult = false;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private testService: TestsService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('id') ?? '';
    this.test = this.testService.test
    // this.subscription = this.testService.loadTestById(this.testId).subscribe(test => this.test = test as Test);

    this.form = new FormGroup({});
    if (this.test) {
      this.test.items.forEach(formItem => {
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
  }

  finish() {
    this.submitted = true;
    if (this.form.valid) {
      this.testService.finishTest(this.form.value, this.testId);
      this.submitted = false;
      this.form.reset();
      this.showResult = true;
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
