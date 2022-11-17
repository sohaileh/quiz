import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeQuizComponent } from './organize-quiz.component';

describe('OrganizeQuizComponent', () => {
  let component: OrganizeQuizComponent;
  let fixture: ComponentFixture<OrganizeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizeQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
