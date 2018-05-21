import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import {GameOfLifeService} from './game-of-life.service';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameOfLifeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
