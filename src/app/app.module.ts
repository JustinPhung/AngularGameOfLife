import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import {GameOfLifeService} from './services/game-of-life.service';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {HelpService} from './services/help-service.service';
import {IconService} from './services/icon.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSliderModule
  ],
  providers: [GameOfLifeService, HelpService, IconService, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
