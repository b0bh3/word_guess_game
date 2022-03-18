import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.css']
})
export class GameKeyboardComponent implements OnInit {
  @Input() resetColors: boolean;

  lines = [
    [ 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ],
    [ 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L' ],
    [ 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE' ],
  ];

  displayLines = [
    [ 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ],
    [ 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L' ],
    [ 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE' ],
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
