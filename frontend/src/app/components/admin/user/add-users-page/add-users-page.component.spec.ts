import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersPageComponent } from './add-users-page.component';

describe('AddUsersPageComponent', () => {
  let component: AddUsersPageComponent;
  let fixture: ComponentFixture<AddUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
