import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignQuizDialogComponent } from './assign-quiz-dialog.component';

describe('AssignQuizDialogComponent', () => {
  let component: AssignQuizDialogComponent;
  let fixture: ComponentFixture<AssignQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignQuizDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
