import { Component } from '@angular/core';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent {

  page = 1;
  questions: string[] = [
    'You are a practical-minded perfectionist.',
    'You are very rigid about the right way of doing things.',
    'You are usually straightforward and direct about your opinions on things.',
    'You tend to see the world as morally black and white rather than shades of grey.',
    'You hold yourself to a higher standard than most others.'
  ];
  question: string[] = [this.questions[0]];
  results = {};
  last: boolean;
  progress: number = 0;
  details = false;

  next() {
    if (this.page === this.questions.length) {
      this.last = true;
      return;
    }
    if (this.questions.length) {
     this.progress = 100 / this.questions.length * this.page; 
    }
    this.last = false;
    this.page += 1;
    this.question = [this.questions[this.page-1]];
  }

  result() {

  }
}
