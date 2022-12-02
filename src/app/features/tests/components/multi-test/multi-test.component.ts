import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-test',
  templateUrl: './multi-test.component.html',
  styleUrls: ['./multi-test.component.scss'],
})
export class MultiTestComponent implements OnInit {
  test = [
    {
      id: 'fhgjh12',
      question: 'Question 1',
      type: 'radio',
      answers: [
        { id: 'fgf', answer: 'first', checked: false },
        { id: 'fg1f', answer: 'second', checked: false },
        { id: 'fg8f', answer: 'third', checked: false },
        { id: 'fg8f', answer: 'fouth', checked: false },
      ],
    },
    {
      id: 'fhgjh13',
      question: 'Question 2',
      type: 'checkbox',
      answers: [
        { id: 'fwgf', answer: 'first', checked: false },
        { id: 'fgf1f', answer: 'second', checked: false },
        { id: 'f1g8f', answer: 'third', checked: false },
      ],
    },
    {
      id: 'fhgjh14',
      question: 'Question 3',
      type: 'radio',
      answers: [
        { id: 'f74f', answer: 'first', checked: false },
        { id: 'fg71f', answer: 'second', checked: false },
        { id: 'f8g8f', answer: 'third', checked: false },
        { id: 'fg98f', answer: 'fouth', checked: false },
      ],
    },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({});
    this.test.forEach(formItem =>{
      if (formItem.type === 'radio') {
        this.form.addControl(
        formItem.id,
        this.fb.control([])
      )} else {
        formItem.answers.forEach(item =>
        this.form.addControl(
          item.id,
          this.fb.control(false)
        )
      )}
    });
  }

  next() {
  console.log(this.form.value);
}
      
}
