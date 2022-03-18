import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  content: string;
  display: boolean = true;

  constructor(content) {
    this.content = content;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _messages = Array<Message>(0);
  private _subject =  new Subject<Message[]>();


  
  constructor() { }

  onNewMessage(): Observable<Message[]> {
    return this._subject.asObservable();
  }

  sendMessage(message: Message): number {
    let index = this._messages.length;
    this._messages.push(message);
    this._subject.next(this._messages);
    return index;
  }

  editMessage(index: number, editedMessage: Message) {
    this._messages[index] = editedMessage;
    this._subject.next(this._messages);
  }

}
