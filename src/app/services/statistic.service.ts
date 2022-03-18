import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subject } from 'rxjs';

export class StatisticData {
  gamesPlayed: number;
  gamesWon: number;
  percentWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Object;

  constructor(gamesPlayed: number, gamesWon: number, percentWon: number, currentStreak: number, maxStreak: number, guessDistribution: Object) {
    this.gamesPlayed = gamesPlayed;
    this.gamesWon = gamesWon;
    this.percentWon = percentWon;
    this.currentStreak = currentStreak;
    this.maxStreak = maxStreak;
    this.guessDistribution = guessDistribution;
  }

}

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private _storageToken = 'wordguess-statistics';
  private _statData: StatisticData;
  private _subjectStatDataChange = new Subject<StatisticData>();
  
  constructor(private _localStorageService: LocalStorageService) { 
    if(this._localStorageService.isDataPresent(this._storageToken)) {
      this.loadStatData();
    }
    else {
      this.initStatData();
    }
  }

  initStatData() {
    const guessDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      fail: 0
    };

    this._statData = new StatisticData(0, 0, 0, 0, 0, guessDistribution);

    this.saveStatData();
    console.log('inititalized statData');
  }

  loadStatData() {
    console.log('loaded statData');
    this._statData = this._localStorageService.readData(this._storageToken);
  }

  saveStatData() {
    console.log('saved statData');
    this._localStorageService.writeData(this._storageToken, this._statData);
  }

  getStatData() {
    return this._statData;
  }

  addLoss() {
    this._statData.gamesPlayed++;
    this._statData.percentWon = Math.round( this._statData.gamesWon / this._statData.gamesPlayed *100);
    this._statData.guessDistribution['fail'] = this._statData.guessDistribution['fail'] + 1;
    this._statData.currentStreak = 0;

    this.saveStatData();
    this._subjectStatDataChange.next(this._statData);
  }

  addWin(activeLine: number) {
    this._statData.gamesPlayed++;
    this._statData.gamesWon++;
    this._statData.percentWon = Math.round( this._statData.gamesWon / this._statData.gamesPlayed *100);
    this._statData.guessDistribution[activeLine+1] = this._statData.guessDistribution[activeLine+1] + 1;
    this._statData.currentStreak++;
    if(this._statData.currentStreak > this._statData.maxStreak) {
      this._statData.maxStreak = this._statData.currentStreak;
    }

    this.saveStatData();
    this._subjectStatDataChange.next(this._statData);
  }

  onStatDataChange(): Observable<StatisticData> {
    return this._subjectStatDataChange.asObservable();
  }
  
}
