import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameQuizTitleComponent } from './rename-quiz-title.component';

describe('RenameQuizTitleComponent', () => {
  let component: RenameQuizTitleComponent;
  let fixture: ComponentFixture<RenameQuizTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameQuizTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameQuizTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
