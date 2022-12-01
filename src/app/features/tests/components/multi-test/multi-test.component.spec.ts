import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTestComponent } from './multi-test.component';

describe('MultiTestComponent', () => {
  let component: MultiTestComponent;
  let fixture: ComponentFixture<MultiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
