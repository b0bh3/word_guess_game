import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMessageItemComponent } from './toast-message-item.component';

describe('ToastMessageItemComponent', () => {
  let component: ToastMessageItemComponent;
  let fixture: ComponentFixture<ToastMessageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastMessageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
