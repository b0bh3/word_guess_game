import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subject } from 'rxjs';

export class Preferences {
  dark_mode: boolean;
  high_contrast_mode: boolean;

  constructor(dark_mode: boolean  = true, high_contrast_mode: boolean = false) {
    this.dark_mode = dark_mode;
    this.high_contrast_mode = high_contrast_mode;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private _storageToken = 'wordguess-preferences';
  private _preferences: Preferences;
  private _preferenceSubject = new Subject<Preferences>();

  constructor(private _localStorageService: LocalStorageService) { 
    if( _localStorageService.isDataPresent(this._storageToken) ) {
      this._loadPreferences();
    } else {
      this._preferences = new Preferences();
      this._savePreferences();
    }
  }

  private _loadPreferences() {
    this._preferences = this._localStorageService.readData(this._storageToken);
    this._preferenceSubject.next(this._preferences);
  }

  private _savePreferences() {
    this._localStorageService.writeData(this._storageToken, this._preferences);
  }

  getPreferences() {
    return this._preferences;
  }

  setPreferences(newPreferences: Preferences) {
    this._preferences = newPreferences;
    this._savePreferences();
    this._preferenceSubject.next(this._preferences);
  }

  onPreferenceChange(): Observable<Preferences> {
    return this._preferenceSubject.asObservable();
  }
  
}
