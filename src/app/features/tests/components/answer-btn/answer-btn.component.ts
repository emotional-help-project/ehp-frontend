import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer-btn',
  templateUrl: './answer-btn.component.html',
  styleUrls: ['./answer-btn.component.scss'],
})
export class AnswerBtnComponent {
  @Input() readonly: boolean;
  checked = [false, false, false, false, false]
  answers: any[] = [
    {
      id: 1,
      answer: 'Strongly disagree',
    },
    {
      id: 2,
      answer: 'Disagree',
    },
    {
      id: 3,
      answer: 'Neutral',
    },
    {
      id: 4,
      answer: 'Agree',
    },
    {
      id: 5,
      answer: 'Strongly agree',
    }
  ];

  
  onClick(id: number) {
    if (this.readonly) {
      return;
    }
    this.checked = [false, false, false, false, false];
    this.checked[id-1] = true;
  }
}
