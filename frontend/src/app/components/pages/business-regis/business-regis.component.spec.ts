import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRegisComponent } from './business-regis.component';

describe('BusinessRegisComponent', () => {
  let component: BusinessRegisComponent;
  let fixture: ComponentFixture<BusinessRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRegisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
