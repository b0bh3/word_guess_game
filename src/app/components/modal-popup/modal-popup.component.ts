import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {
  @Input() title: string;
  @Input() gameOver: boolean;
  @Output() onDismiss = new EventEmitter<any>();
  @Output() onNewGame = new EventEmitter<any>();
  icon = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  dismissPopup() {
    this.onDismiss.emit();
  }

  newGame() {
    this.onDismiss.emit();
    this.onNewGame.emit();
  }

}
