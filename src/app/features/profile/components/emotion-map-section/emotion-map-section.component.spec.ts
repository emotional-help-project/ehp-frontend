import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionMapSectionComponent } from './emotion-map-section.component';

describe('EmotionMapSectionComponent', () => {
  let component: EmotionMapSectionComponent;
  let fixture: ComponentFixture<EmotionMapSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotionMapSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmotionMapSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
