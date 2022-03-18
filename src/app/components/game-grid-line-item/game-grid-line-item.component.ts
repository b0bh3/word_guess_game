import { Component, OnInit, Input } from '@angular/core';
import { Colors } from 'Color';

@Component({
  selector: 'app-game-grid-line-item',
  templateUrl: './game-grid-line-item.component.html',
  styleUrls: ['./game-grid-line-item.component.css']
})
export class GameGridLineItemComponent implements OnInit {
  @Input() set bgColor(bgColor: string) {
    this.myBgColor = bgColor;

    if(bgColor == Colors.Orange || bgColor == Colors.Green || bgColor == Colors.Default) {
      this.color = Colors.CheckedLetter;
    }
    else {
      this.color = Colors.UncheckedLetter;
    }
    // this.itemClass = 'rotate';
    // setTimeout(() => {
    //   this.itemClass = '';
    //   this.myBgColor = bgColor;
    // }, 600);
  }
  @Input() borderColor: string;
  @Input() set value(value: string) {
    this.myValue = value;
    if(value != null) {
      this.itemClass = 'pulse';
      setTimeout(() => {
        this.itemClass = '';
      }, 500);
    }
  }

  color = Colors.UncheckedLetter;
  myBgColor: string;
  myValue?: string;
  itemClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
