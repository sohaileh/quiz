import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTitleDialogComponent } from './group-title-dialog.component';

describe('GroupTitleDialogComponent', () => {
  let component: GroupTitleDialogComponent;
  let fixture: ComponentFixture<GroupTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTitleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
