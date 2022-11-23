import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerBtnComponent } from './answer-btn.component';

describe('AnswerBtnComponent', () => {
  let component: AnswerBtnComponent;
  let fixture: ComponentFixture<AnswerBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
