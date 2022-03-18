import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGridLineItemComponent } from './game-grid-line-item.component';

describe('GameGridLineItemComponent', () => {
  let component: GameGridLineItemComponent;
  let fixture: ComponentFixture<GameGridLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameGridLineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGridLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
