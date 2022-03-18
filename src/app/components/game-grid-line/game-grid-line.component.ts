import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LetterService } from 'src/app/services/letter.service';
import { Subscription } from 'rxjs';
import { Colors } from 'Color';

@Component({
  selector: 'app-game-grid-line',
  templateUrl: './game-grid-line.component.html',
  styleUrls: ['./game-grid-line.component.css']
})
export class GameGridLineComponent implements OnInit {
  
  letter: string;

  @Output() submitLine = new EventEmitter();
  @Input() lineIndex: number;

  lineItems = Array(5);
  activeLetter: number;

  private _letterService: LetterService;
  private _subscription: Subscription;

  constructor(private letterService: LetterService) { 
    this._letterService = letterService;
  }

  ngOnInit(): void {
    // console.log('[game-grid-line] lineIndex: ', this.lineIndex);
    this._subscription = this.letterService.onActiveLetterChange(this.lineIndex).subscribe((newActiveLetter) => {
      this.activeLetter = newActiveLetter;
      // console.log(`[game-grid-line] new activeLetter: ${newActiveLetter}`);
    });
    this.activeLetter = this.letterService.getActiveLetter();
  }

  retrieveLetter(letterIndex: number) {
    return this.letterService.getLetter(this.lineIndex, letterIndex);
  }

  retrieveBackgroundColor(lettterIndex: number) {
    return this.letterService.getLetterBackgroundColor(this.lineIndex, lettterIndex);
  }

  retrieveBorderColor(letterIndex: number) {
    return this.letterService.getLetterBorderColor(this.lineIndex, letterIndex);
  }

}
