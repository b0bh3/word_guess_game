import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { GameComponent } from './components/game/game.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';
import { GameGridLineComponent } from './components/game-grid-line/game-grid-line.component';
import { GameGridLineItemComponent } from './components/game-grid-line-item/game-grid-line-item.component';
import { ToastMessagesComponent } from './components/toast-messages/toast-messages.component';
import { ToastMessageItemComponent } from './components/toast-message-item/toast-message-item.component';
import { GameKeyboardComponent } from './components/game-keyboard/game-keyboard.component';
import { GameKeyboardItemComponent } from './components/game-keyboard-item/game-keyboard-item.component';
import { GameKeyboardLineComponent } from './components/game-keyboard-line/game-keyboard-line.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IconButtonComponent,
    GameComponent,
    GameGridComponent,
    GameGridLineComponent,
    GameGridLineItemComponent,
    ToastMessagesComponent,
    ToastMessageItemComponent,
    GameKeyboardComponent,
    GameKeyboardItemComponent,
    GameKeyboardLineComponent,
    ModalPopupComponent,
    StatisticsComponent,
    SettingsComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
