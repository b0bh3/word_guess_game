import { Injectable } from '@angular/core';
import { LetterService } from './letter.service';
import { ToastService, Message } from './toast.service';
import { Colors } from 'Color';
import { Observable, Subject } from 'rxjs';
import { StatisticService } from './statistic.service';

export class LetterInWord {
  letter: string;
  isPresent: boolean;
  inRightPlace:boolean;

  constructor(letter: string, isPresent: boolean, inRightPlace: boolean){
    this.letter = letter;
    this.isPresent = isPresent;
    this.inRightPlace = inRightPlace;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private _knownWords: Array<string>;
  private _allWords: Array<string>;

  private _submittedWord: string = '';
  private _chosenWord: string;
  private _chosenWordLetters: Array<string>;

  private _subjectNewWord = new Subject<string>();
  private _subjectGameOver = new Subject<boolean>();

  constructor(private letterService: LetterService, private toastService: ToastService, private statisticService: StatisticService) { 
    this.loadAllWords();
    this.loadKnownWords().then(() => this.chooseRandomWord());
  }

  async loadKnownWords() {
    await fetch('./assets/known_fivecharacter_words.txt', {mode: 'no-cors'})
      .then(response => response.text())
      .then((data) => {
        this._knownWords = data.split(',');
        console.log(`Successfully loaded ${this._knownWords.length} known words`);
      })
      .catch(error => console.error(error));
  }

  async loadAllWords() {
    await fetch('./assets/all_fivecharacter_words.txt', {mode: 'no-cors'})
      .then(response => response.text())
      .then((data) => {
        this._allWords = data.split(',');
        console.log(`Successfully loaded ${this._allWords.length} words`);
      })
      .catch(error => console.error(error));
  }

  chooseRandomWord() {
    const index = Math.floor(Math.random() * (this._knownWords.length - 0));
    this._chosenWord = this._knownWords[index];
    // console.log(`Chosen Word: ${this._chosenWord}`);
    this._chosenWordLetters = this._chosenWord.split('');
    // console.log(this._chosenWordLetters);
  }

  reset() {
    this.chooseRandomWord();
  }

  onNewWordSubmitted(): Observable<string> {
    return this._subjectNewWord.asObservable();
  }

  setSubmittedWord(word: string) {
    this._submittedWord = word;
    this._subjectNewWord.next(this._submittedWord);
  }

  isWordInList(word: string): boolean {
    return this._allWords.includes(word);
  }

  // return true if won and false if lost
  onGameOver(): Observable<boolean> {
    return this._subjectGameOver.asObservable();
  }

  gameLost() {
    let msg = new Message(this._chosenWord.toUpperCase());
    this.toastService.sendMessage(msg);
    this.statisticService.addLoss();
    setTimeout(() => {
      this._subjectGameOver.next(false);
    }, 1500);
  }

  gameWon() {
    let msgText: string;
    switch(this.letterService.getActiveLine()) {
      case 0:
        msgText = 'Wow';
        break;
      case 1:
        msgText = 'Exceptional';
        break;
      case 2:
        msgText = 'Splendid';
        break;
      case 3:
        msgText = 'Great';
        break;
      case 4:
        msgText = 'Good Job';
        break;
      case 5:
        msgText = 'Mhm';
        break;
    }
    let msg = new Message(msgText);
    this.statisticService.addWin(this.letterService.getActiveLine());
    const msgIndex = this.toastService.sendMessage(msg);
    setTimeout(() => {
      msg.display = false;
      this.toastService.editMessage(msgIndex, msg);
      this._subjectGameOver.next(true);
    }, 1500);
  }

  checkWord() {
    const word = this.letterService.getWord(this.letterService.getActiveLine()).toLowerCase();

    let isWordInList = this.isWordInList(word);
    
    if(!isWordInList) {
      let msg = new Message('Word not in list');
      const msgIndex = this.toastService.sendMessage(msg);
      setTimeout(() => {
        msg.display = false;
        this.toastService.editMessage(msgIndex, msg);
      }, 1000);
    }
    else {
      const letterInWordArray = this.checkAgainstChosenWord(word);
      // console.log(letterInWordArray);
      letterInWordArray.forEach((letterInWord, index) => {
        let color = letterInWord.isPresent ?  Colors.Orange : Colors.Default;
        color = letterInWord.inRightPlace ? Colors.Green : color;
        this.letterService.setLetterColor(index, color);
      });
      // Game has been won
      if(word == this._chosenWord) {
        this.letterService.setLettersLocked(true);
        this.gameWon();
      }
      else if(this.letterService.getActiveLine() <= 4) {
        // console.log('setactiveline')
        this.letterService.setActiveLine(this.letterService.getActiveLine()+1);
        this.letterService.setActiveLetter(0);
      }
      // Game is over
      else {
        this.letterService.setLettersLocked(true);
        this.gameLost();
      }
      // set submitted word to trigger keyboardColorChange
      this.setSubmittedWord(word);
    }
  }

  checkAgainstChosenWord(word: string): Array<LetterInWord> {
    let letters =  Array<LetterInWord>(5);

    word.split('').forEach((letter, index) => {
      letters[index] = this._checkLetter(word.charAt(index), index, word);
    });

    return letters;
  }

  private _checkLetter(letter: string, index: number, word: string): LetterInWord {
    let isPresent = this._chosenWord.includes(letter);
    let inRightPlace = this._chosenWordLetters[index] === letter;

    // check if other instace of same letter isInRightPlace 
    // and if there is another instance of letter in chosen word
    if(isPresent && !inRightPlace) {
      let letterCountWord = 0;
      let letterWordIndices = Array<number>();
      let letterCountChosenWord = 0;
      this._chosenWordLetters.forEach((l) => { if(l === letter)letterCountChosenWord++ });
      word.split('').forEach((l, i) => {
        if( l === letter ) {
          letterCountWord++;
          if( l != this._chosenWordLetters[i] ) {
            letterWordIndices.push(i);
          }
        }
      });
      // console.log(letterCountWord, letterWordIndices, letterCountChosenWord);

      const letterWordIndicesReversed = new Array();
      letterWordIndices.forEach((i) => letterWordIndicesReversed.unshift(i));
      // more instances in word than chosen word
      if(letterCountWord > letterCountChosenWord) {
        letterWordIndicesReversed.forEach((i) => {
          // console.log(letterWordIndicesReversed[0] ,i, index);
          if( i == index && i == letterWordIndicesReversed[0] ) {
            isPresent = false;
          }
        });
      }
      
    }

    return new LetterInWord(letter, isPresent, inRightPlace);
  }

}
