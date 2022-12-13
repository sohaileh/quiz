import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishQuizComponent } from './publish-quiz.component';

describe('PublishQuizComponent', () => {
  let component: PublishQuizComponent;
  let fixture: ComponentFixture<PublishQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
