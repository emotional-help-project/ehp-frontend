import { Component } from '@angular/core';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent {

  progress: number = 50;
  page = 1;
  questions: string[] = [
    'You are a practical-minded perfectionist.',
    'You are very rigid about the right way of doing things.',
    'You are usually straightforward and direct about your opinions on things.',
    'You tend to see the world as morally black and white rather than shades of grey.',
    'You hold yourself to a higher standard than most others.'
  ];
  next() {
    this.page += 1;
  }
}
