import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Colors } from 'Color';
import { ToastService, Message } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  private _letters: Array<string>[] = [ 
    Array(5).fill(null), Array(5).fill(null), Array(5).fill(null), 
    Array(5).fill(null), Array(5).fill(null), Array(5).fill(null) 
  ];

  private _letterBackgroundColors: Array<string>[] =[
    Array(5).fill(Colors.DarkGrey), Array(5).fill(Colors.DarkGrey), 
    Array(5).fill(Colors.DarkGrey), Array(5).fill(Colors.DarkGrey),
    Array(5).fill(Colors.DarkGrey), Array(5).fill(Colors.DarkGrey)
  ];

  private _letterBorderColors: Array<string>[] =[
    Array(5).fill(Colors.LightGrey), Array(5).fill(Colors.LightGrey), 
    Array(5).fill(Colors.LightGrey), Array(5).fill(Colors.LightGrey), 
    Array(5).fill(Colors.LightGrey), Array(5).fill(Colors.LightGrey), 
  ];

  private _subjectActiveLine = new Subject<number>();
  private _subjectActiveLetterArray = [ 
    new Subject<number>(), new Subject<number>(), new Subject<number>(), 
    new Subject<number>(), new Subject<number>(), new Subject<number>() 
  ];
  private _subjectActiveLetterAll = new Subject<number>();

  private _activeLine = 0;
  private _activeLetter = 0;

  private _lettersLocked = false;

  constructor(private toastService: ToastService) { 
  }

  reset() {
   this. _letters = [ 
      Array(5).fill(null), Array(5).fill(null), Array(5).fill(null), 
      Array(5).fill(null), Array(5).fill(null), Array(5).fill(null) 
    ];

    this._letterBackgroundColors = [
      Array(5).fill(Colors.DarkGrey), Array(5).fill(Colors.DarkGrey), 
      Array(5).fill(Colors.DarkGrey), Array(5).fill(Colors.DarkGrey),
      Array(5).fill(Colors.DarkGrey), Array(5).fill(Colors.DarkGrey)
    ];
  
    this._letterBorderColors = [
      Array(5).fill(Colors.LightGrey), Array(5).fill(Colors.LightGrey), 
      Array(5).fill(Colors.LightGrey), Array(5).fill(Colors.LightGrey), 
      Array(5).fill(Colors.LightGrey), Array(5).fill(Colors.LightGrey), 
    ];
  
    this._activeLine = 0;
    this._activeLetter = 0;
  
    this._lettersLocked = false;
  }

  handleNewLetter(letter: string): boolean {
    // check if there is a letter
    if( !this._lettersLocked && letter != null) {
      // Single Character
      if(letter.length == 1) 
      {
        // console.log(`ActiveLetter: ${this.activeLetter}`);
        // only add letter when line not full
        if(this._activeLetter <= 4) {
          // console.log(`Letter: ${letter}`);
          // this.currentLineLetters[this.currentLineItemIndex] = letter;
          this.setLetter(letter);
          // this.currentLineItemIndex++;
          this.setLetterBorderColor(this._activeLetter, Colors.LighterGrey);
          this.setActiveLetter(this._activeLetter+1);
        }
      }
      // Multi Character (e.g. ENTER, BACKSPACE)
      else {
        switch(letter) {
          case 'BACKSPACE': 
            // only delete when not empty
            if(this._activeLetter > 0) {
              // this.activeLetter--;
              
              this.setActiveLetter(this._activeLetter-1);
              // this.currentLineLetters[this.currentLineItemIndex] = '';
              this.setLetter(null);
              this.setLetterBorderColor(this._activeLetter, Colors.LightGrey);
            }
            break;
          case 'ENTER':
            // only possible when line is full
            if( this._activeLetter == 5 && this._activeLine <= 5) {
              // console.log('ENTER');
              return true;
            }
            else {
              let msg = new Message('Not enough letters');
              const msgIndex = this.toastService.sendMessage(msg);
              setTimeout(() => {
                msg.display = false;
                this.toastService.editMessage(msgIndex, msg);
              }, 1000);
            }
            break;
          default: break;
        }
      }
    }
    return false;
  }

  setLetter(letter:string) {
    if(!this._lettersLocked) {
      // console.log(`[Service setLetter(${letter})] actLi[${this._activeLine}] actLe[${this._activeLetter}]`);
      // console.log('Before');
      // console.log(this._letters);
      this._letters[this._activeLine][this._activeLetter] = letter;
      // console.log('After');
      // console.log(this._letters);
    }
  }

  getLetter(lineIndex: number, letterIndex: number):string {
    // console.log(`getLetter(${lineIndex}, ${letterIndex}) => ${this._letters[lineIndex][letterIndex]}`);
    return this._letters[lineIndex][letterIndex];
  }

  getWord(lineIndex: number) {
    let word = '';
    this._letters[lineIndex].forEach((letter) => word+=letter);
    return word;
  }

  setActiveLetter(newActiveLetter: number) {
    this._activeLetter = newActiveLetter;
    this._subjectActiveLetterArray[this._activeLine].next(this._activeLetter);
    this._subjectActiveLetterAll.next(this._activeLetter);
  }

  getActiveLetter(): number {
    return this._activeLetter;
  }

  onActiveLetterChange(lineIndex: number): Observable<number> {
    // console.log('[LetterService] newSub -> line: ', lineIndex);
    // console.log(this._subjectActiveLetterArray[lineIndex]);
    return this._subjectActiveLetterArray[lineIndex].asObservable();
  }

  onActiveLetterChangeAll(): Observable<number> {
    return this._subjectActiveLetterAll.asObservable();
  }

  setActiveLine(newActiveLine: number) {
    this._activeLine = newActiveLine;
    this._subjectActiveLine.next(this._activeLine);
  }

  getActiveLine(): number {
    return this._activeLine;
  }

  onActiveLineChange(): Observable<number> {
    return this._subjectActiveLine.asObservable();
  }

  setLetterBackgroundColor(letterIndex: number, color: Colors) {
    if(!this._lettersLocked) {
      this._letterBackgroundColors[this._activeLine][letterIndex] = color;
    }
  }

  setLetterBorderColor(letterIndex: number, color: Colors) {
    if(!this._lettersLocked) {
      // console.log('SET BORDER', this._activeLine, letterIndex, color);
      this._letterBorderColors[this._activeLine][letterIndex] = color;
    }
  }

  setLetterColor(letterIndex: number, color: Colors) {
    if(!this._lettersLocked) {
      this._letterBackgroundColors[this._activeLine][letterIndex] = color;
      this._letterBorderColors[this._activeLine][letterIndex] = color;
    }
  }

  getLetterBackgroundColor(lineIndex: number, letterIndex: number): string {
    return this._letterBackgroundColors[lineIndex][letterIndex];
  }

  getLetterBorderColor(lineIndex: number, letterIndex: number): string {
    return this._letterBorderColors[lineIndex][letterIndex];
  }

  setLettersLocked(newLettersLocked: boolean) {
    this._lettersLocked = newLettersLocked;
  }

  getLettersLocked(): boolean {
    return this._lettersLocked;
  }

}
