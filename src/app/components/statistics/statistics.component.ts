import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { StatisticData, StatisticService } from 'src/app/services/statistic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @Input() gameOver: boolean;
  @Output() onNewGame = new EventEmitter<any>();

  @ViewChild('gdb1') gdb1: ElementRef;
  @ViewChild('gdb2') gdb2: ElementRef;
  @ViewChild('gdb3') gdb3: ElementRef;
  @ViewChild('gdb4') gdb4: ElementRef;
  @ViewChild('gdb5') gdb5: ElementRef;
  @ViewChild('gdb6') gdb6: ElementRef;

  statData: StatisticData;
  private _subscription: Subscription;

  constructor(private _statisticService: StatisticService) { 
    this.statData = _statisticService.getStatData();
    this._subscription = _statisticService.onStatDataChange().subscribe((newStatData) => {
      this.statData = newStatData;
      this.renderGuessDistribution();
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderGuessDistribution();
  }

  renderGuessDistribution() { 
    const guessDist = this.statData.guessDistribution;
    let maxGuesses = 0;
    for(let i=1; i <= 6; i++) {
      maxGuesses = guessDist[i] > maxGuesses ? guessDist[i] : maxGuesses;
    }

    this.gdb1.nativeElement.style.width = guessDist[1]/maxGuesses*90 + '%';
    this.gdb2.nativeElement.style.width = guessDist[2]/maxGuesses*90 + '%';
    this.gdb3.nativeElement.style.width = guessDist[3]/maxGuesses*90 + '%';
    this.gdb4.nativeElement.style.width = guessDist[4]/maxGuesses*90 + '%';
    this.gdb5.nativeElement.style.width = guessDist[5]/maxGuesses*90 + '%';
    this.gdb6.nativeElement.style.width = guessDist[6]/maxGuesses*90 + '%';
  }

  newGame() {
    this.onNewGame.emit();
  }

}
