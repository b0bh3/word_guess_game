import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onShowStats = new EventEmitter<any>();
  @Output() onShowSettings = new EventEmitter<any>();
  @Output() onShowHowToPlay = new EventEmitter<any>();
  faQuestions = faQuestionCircle;
  faSettings = faCog;
  faStats = faChartBar;

  constructor() { }

  ngOnInit(): void {
  }

  showStats() {
    this.onShowStats.emit();
  }

  showSettings() {
    this.onShowSettings.emit();
  }

  showHowToPlay() {
    this.onShowHowToPlay.emit();
  }

}
