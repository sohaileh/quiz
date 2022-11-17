import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptTeamQuizComponent } from './attempt-team-quiz.component';

describe('AttemptTeamQuizComponent', () => {
  let component: AttemptTeamQuizComponent;
  let fixture: ComponentFixture<AttemptTeamQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptTeamQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptTeamQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
