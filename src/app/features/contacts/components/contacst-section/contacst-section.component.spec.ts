import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacstSectionComponent } from './contacst-section.component';

describe('ContacstSectionComponent', () => {
  let component: ContacstSectionComponent;
  let fixture: ComponentFixture<ContacstSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContacstSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContacstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
