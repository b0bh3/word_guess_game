import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  isDataPresent(key: string) {
    const isDataPresent = localStorage.getItem(key) == null ? false : true;
    return isDataPresent;
  }

  writeData(key: string, data: any ) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  readData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  deleteData(key: string) {
    localStorage.removeItem(key);
  }

  clearAllData() {
    localStorage.clear();
  }
  
}
