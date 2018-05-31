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

  /**
   * @param {GameOfLifeService} gameOfLifeService
   * @param {HelpService} helpService
   * @param {MatSnackBar} toast
   */
  constructor(private gameOfLifeService: GameOfLifeService,
              private helpService: HelpService,
              private toast: MatSnackBar) {

    this.gameBoard = gameOfLifeService.initializeBoard(this.rowSize, this.columnSize);

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

  /**
   * @param {number | null} value
   * @returns {any}
   */
  formatValue(value: number | null) {
    if (!value) {
      return 0;
    }
    return value + 'ms';
  }

  /**
   * @returns {string}
   */
  getTooltip(): string {
    return this.helpService.getTooltip();
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

  /**
   * @returns {boolean[][]}
   */
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

  /**
   */
  ngAfterViewInit(): void {
    this.startInterval();
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

  /**
   */
  toggleRunning(): void {
    this.isRunning = !this.isRunning;
  }

  /**
   */
  startInterval(): void {
    this.interval = setInterval(
      () => {
        this.gameBoard = this.gameOfLifeService.getNextBoard(this.gameBoard, this.isRunning);
      },
      this.time);
  }

}
