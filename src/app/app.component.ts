import { Component, OnInit, HostListener } from '@angular/core';
import { LetterService } from './services/letter.service';
import { WordService } from './services/word.service';
import { SettingService, Preferences } from './services/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'word-guess-game';
  pressedKey: string;
  private _wordServiceSubscription: Subscription;
  private _settingServiceSubscription: Subscription;

  isGameOver = false;

  @HostListener('window:keydown', ['$event']) keyDown(event: any) {
    let key = event.key.toUpperCase();
    let asciiValue = key.charCodeAt(0);

    // only set if 'A' to 'Z'
    if (asciiValue >= 65 && asciiValue <= 90) {
      // fix for @Input() only updating on differen valuea
      if(key == this.pressedKey) {
        this.pressedKey = '';
      }
      setTimeout(()=> {
        this.pressedKey = key;
      }, 50);
      
    }
  }

  constructor(private _letterService: LetterService, private _wordService: WordService, private _settingService: SettingService) {
    this._wordServiceSubscription = _wordService.onGameOver().subscribe(() => {
      this.isGameOver = true;
      this.popupOnWin = true;
      this.showStatistics();
    });
    this._settingServiceSubscription = _settingService.onPreferenceChange().subscribe((newPreferences) => {
      this.handlePreferences(newPreferences);
    });
  }

  ngOnInit() {
    this.handlePreferences(this._settingService.getPreferences());
  }

  handlePreferences(preferences: Preferences) {
    // Dark/Light Mode
    if(preferences.dark_mode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // High Contrast Mode
    if(preferences.high_contrast_mode) {
      document.documentElement.setAttribute('high-contrast-mode', 'on');
    } else {
      document.documentElement.setAttribute('high-contrast-mode', 'off');
    }
  }

  popupClass = 'hidden';
  popupTitle = '';
  popupOnWin = false;

  showStatistics(){
    this.popupClass = 'visible';
    this.popupTitle = 'STATISTICS';
    this._letterService.setLettersLocked(true);
  }

  showSettings(){
    this.popupClass = 'visible';
    this.popupTitle = 'SETTINGS';
    this._letterService.setLettersLocked(true);
  }

  showHowToPlay() {
    this.popupClass = 'visible';
    this.popupTitle = 'HOW TO PLAY';
    this._letterService.setLettersLocked(true);
  }

  dismissPopup() {
    this.popupClass = 'hidden';
    if(!this.popupOnWin) {
      this._letterService.setLettersLocked(false);
    } else {
      this.popupOnWin = false;
    }
  }

  resetColors = false;

  newGame() {
    this.isGameOver = false;
    this._wordService.reset();
    this._letterService.reset();
    this.resetColors = true;
    setTimeout(()=> this.resetColors = false, 200);
  }
}
