import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-message-item',
  templateUrl: './toast-message-item.component.html',
  styleUrls: ['./toast-message-item.component.css']
})
export class ToastMessageItemComponent implements OnInit {
  @Input() message: Message;
 
  constructor() { }

  ngOnInit(): void {
  }

}
