import {AfterViewInit, Component} from '@angular/core';
import {GameOfLifeService} from './services/game-of-life.service';
import {IconService} from './services/icon.service';
import {HelpService} from './services/help-service.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  gameBoard: boolean[][];
  isRunning = false;
  interval: any;
  rowSize = 8;
  columnSize = 8;
  time = 1000;

  constructor(private gameOfLifeService: GameOfLifeService,
              private iconService: IconService,
              private helpService: HelpService,
              private toast: MatSnackBar) {

    this.gameBoard = [];

    for (let i = 0; i < this.rowSize; i++) {
      this.gameBoard[i] = [];
      for (let j = 0; j < this.columnSize; j++) {
        this.gameBoard[i][j] = false;
      }
    }

  }

  sizeChanged(): void {
    if (this.isRunning) {
      this.isRunning = false;
      this.toast.open('Zum Edit Modus gewechselt.', 'Undo', {duration: 2000});
    }
    clearTimeout(this.interval);
    this.gameBoard = this.instanciateGameBoard();
    this.startInterval();
  }

  instanciateGameBoard(): boolean[][] {
    const newBoard = [];

    for (let i = 0; i < this.rowSize; i++) {
      newBoard[i] = i < this.gameBoard.length ? this.gameBoard[i] : [];
      for (let j = 0; j < this.columnSize; j++) {
        newBoard[i][j] = (i < this.gameBoard.length && j < this.gameBoard[i].length) ? this.gameBoard[i][j] : false;
      }
    }
    return newBoard;
  }

  toggleRunning(): void {
    this.isRunning = !this.isRunning;

  }

  ngAfterViewInit(): void {
    this.startInterval();
  }

  startInterval(): void {
    this.interval = setInterval(
      () => {
        this.gameBoard = this.gameOfLifeService.getNextBoard(this.gameBoard, this.isRunning);
      },
      this.time);
  }

  changeTime(event: any) {
    if (this.isRunning) {
      this.isRunning = false;
      this.toast.open('Zum Edit Modus gewechselt.', 'Undo', {duration: 2000});
    }
    this.time = event.value;
    clearTimeout(this.interval);
    this.startInterval();

  }

  formatValue(value: number | null) {
    if (!value) {
      return 0;
    }
    return value + 'ms';
  }

  getTooltip(): string {
    return this.helpService.getTooltip();
  }
}
