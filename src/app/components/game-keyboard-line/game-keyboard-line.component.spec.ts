import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameKeyboardLineComponent } from './game-keyboard-line.component';

describe('GameKeyboardLineComponent', () => {
  let component: GameKeyboardLineComponent;
  let fixture: ComponentFixture<GameKeyboardLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameKeyboardLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameKeyboardLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
