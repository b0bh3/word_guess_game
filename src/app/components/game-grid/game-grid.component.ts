import { Component, Input, OnInit } from '@angular/core';
import { LetterService } from '../../services/letter.service';
import { WordService, LetterInWord } from 'src/app/services/word.service';
import { ToastService, Message } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { Colors } from 'Color';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css']
})
export class GameGridComponent implements OnInit {
  lineSubscription: Subscription;
  letterSubscription: Subscription;

  @Input() set pressedKey(newPressedKey) {
    let isEnter = this._letterService.handleNewLetter(newPressedKey);
    if(isEnter) {
      this.wordService.checkWord();
    }
  }

  gridLines = Array(6);
  activeLine: number;
  activeLetter: number;

  private _letterService: LetterService;
  private _wordService: WordService;

  constructor(private letterService:LetterService, private wordService: WordService, private toastService: ToastService) { 
    this._letterService = letterService;
    this._wordService = wordService;
    this.lineSubscription = this.letterService.onActiveLineChange().subscribe((newActiveLine) => {
      // console.log(`[game-grid] new activeLine: ${newActiveLine}`);
      this.activeLine = newActiveLine;
    });
    this.letterSubscription = this.letterService.onActiveLetterChangeAll().subscribe((newActiveLetter) => {
      // console.log(`[game-grid] new activeLetter: ${newActiveLetter}`);
      this.activeLetter = newActiveLetter;
    });
  }

  ngOnInit(): void {
    this.activeLine = this.letterService.getActiveLine();
    this.activeLetter = this.letterService.getActiveLetter();
  }

}
