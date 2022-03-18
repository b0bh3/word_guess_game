import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGridLineComponent } from './game-grid-line.component';

describe('GameGridLineComponent', () => {
  let component: GameGridLineComponent;
  let fixture: ComponentFixture<GameGridLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameGridLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGridLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
