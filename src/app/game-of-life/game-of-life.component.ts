import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HelpService} from '../services/help-service.service';
import {MatSnackBar} from '@angular/material';
import {GameOfLifeService} from '../services/game-of-life.service';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements AfterViewInit {

  gameBoard: boolean[][];
  isRunning = false;
  interval: any;
  rowSize = 8;
  columnSize = 8;
  time = 1000;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private gameOfLifeService: GameOfLifeService,
              private helpService: HelpService,
              private toast: MatSnackBar) {

    this.gameBoard = gameOfLifeService.initializeBoard(this.rowSize, this.columnSize);

  }

  /**
   * ändern der Anzahl der der Zellen stoppt die Generationsbewegung
   */
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

  /**
   * Einlesen einer Datei mit passendem Schema
   *
   * @param input
   */
  handleInput(input): void {
    this.isRunning = false;
    const file = input.target.files[0];
    this.gameOfLifeService.readFileToGameBoard(file)
      .then(value => this.gameBoard = value)
      .catch(error => {
        this.toast.open(error, 'Undo', {duration: 2000});
      });
    this.fileInput.nativeElement.value = '';
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

  /**
   * ändern der Zeit stoppt die Generationsbewegung
   * @param event
   */
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
