import { Component, OnInit } from '@angular/core';
import { Message, ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.css']
})
export class ToastMessagesComponent implements OnInit {
  messages: Message[];  

  private _subscription: Subscription;

  constructor(private toastService:ToastService) { 
    this._subscription = toastService.onNewMessage().subscribe((newMessages) => {
      this.messages = newMessages;
    });
  }

  ngOnInit(): void {
  }

}
