import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQuizComponent } from './register-quiz.component';

describe('RegisterQuizComponent', () => {
  let component: RegisterQuizComponent;
  let fixture: ComponentFixture<RegisterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
