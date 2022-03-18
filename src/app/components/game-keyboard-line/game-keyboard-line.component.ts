import { Component, Input, OnInit } from '@angular/core';
import { LetterService } from 'src/app/services/letter.service';
import { WordService } from 'src/app/services/word.service';
import { Subscription } from 'rxjs';
import { Colors } from 'Color';

@Component({
  selector: 'app-game-keyboard-line',
  templateUrl: './game-keyboard-line.component.html',
  styleUrls: ['./game-keyboard-line.component.css']
})
export class GameKeyboardLineComponent implements OnInit {

  @Input() items: Array<string>;
  @Input() displayItems: Array<string>;
  @Input() set resetColors(resetColors: boolean) {
    if(resetColors) {
      this.initBgColorMap();
    }
  }
  private _bgColorMap = new Map<string, string>();

  private _subscription: Subscription;

  constructor(private letterService: LetterService, private wordService: WordService) { 
    this._subscription = wordService.onNewWordSubmitted().subscribe(() => {
      this.loadBgColors();
    });
  }

  ngOnInit(): void {
    this.initBgColorMap();
  }

  handleKeyPress(key: string) {
    let isEnter = this.letterService.handleNewLetter(key);
    if(isEnter) {
      this.wordService.checkWord();
    }
  }

  initBgColorMap() {
    this.items.forEach((letter) => {
      this._bgColorMap.set(letter, Colors.LighterGrey);
    }); 
  }
  
  loadBgColors() {
    const lastLine = this.letterService.getLettersLocked() ? this.letterService.getActiveLine() : this.letterService.getActiveLine()-1;
    let word = this.letterService.getWord(lastLine);
    

    word.split('').forEach((letter, index) => {
      // only if letter is in this line
      if(this.items.includes(letter)) {
        let letterBgColor = this.letterService.getLetterBackgroundColor(lastLine, index);
        // only set if not set or new val is more important (e.g. green > orange > lightgrey > lightergrey)
        const mapValue = this._bgColorMap.get(letter);
        if( (( mapValue == Colors.Orange || mapValue == Colors.LighterGrey)
          && letterBgColor == Colors.Green ) || 
          ( mapValue == Colors.LighterGrey && ( letterBgColor == Colors.Orange || Colors.LightGrey )) ) 
        {
          this._bgColorMap.set(letter, letterBgColor);
        }
      }
    });
    
  }

  getBgColorForLetter(letter: string): string {
    return this._bgColorMap.get(letter);
  }

}
