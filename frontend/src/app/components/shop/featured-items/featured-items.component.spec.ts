import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedItemsComponent } from './featured-items.component';

describe('FeaturedItemsComponent', () => {
  let component: FeaturedItemsComponent;
  let fixture: ComponentFixture<FeaturedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
