import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueMessageComponent } from './dialogue-message.component';

describe('DialogueMessageComponent', () => {
  let component: DialogueMessageComponent;
  let fixture: ComponentFixture<DialogueMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
