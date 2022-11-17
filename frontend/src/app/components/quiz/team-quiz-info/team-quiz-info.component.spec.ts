import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamQuizInfoComponent } from './team-quiz-info.component';

describe('TeamQuizInfoComponent', () => {
  let component: TeamQuizInfoComponent;
  let fixture: ComponentFixture<TeamQuizInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamQuizInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamQuizInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
