import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpiryComponent } from './session-expiry.component';

describe('SessionExpiryComponent', () => {
  let component: SessionExpiryComponent;
  let fixture: ComponentFixture<SessionExpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionExpiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
