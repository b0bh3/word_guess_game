import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameKeyboardItemComponent } from './game-keyboard-item.component';

describe('GameKeyboardItemComponent', () => {
  let component: GameKeyboardItemComponent;
  let fixture: ComponentFixture<GameKeyboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameKeyboardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameKeyboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
