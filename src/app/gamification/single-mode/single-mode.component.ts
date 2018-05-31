import {Component, OnDestroy, OnInit} from '@angular/core';
import {HelpService} from '../../services/help-service.service';
import {MatSnackBar} from '@angular/material';
import {GameOfLifeService} from '../../services/game-of-life.service';
import {EnemyService} from '../../services/enemy.service';

@Component({
  selector: 'app-single-mode',
  templateUrl: './single-mode.component.html',
  styleUrls: ['./single-mode.component.css']
})
export class SingleModeComponent implements OnInit, OnDestroy {

  gameBoard: boolean[][];
  preperationBoard: boolean[][];
  preperationBoardEnemy: boolean[][];
  interval: any;
  interval2: any;

  private preperationColumnSize = 5;
  private rowSize = 30;
  private level = 1;

  /**
   *
   * @param {GameOfLifeService} gameOfLifeService
   * @param {EnemyService} enemy
   * @param {HelpService} helpService
   * @param {MatSnackBar} toast
   */
  constructor(private gameOfLifeService: GameOfLifeService,
              private enemy: EnemyService,
              private helpService: HelpService,
              private toast: MatSnackBar) {
    this.restart();
  }

  /**
   */
  ngOnInit(): void {
    this.startIntervalGameBoard();
    this.startIntervalOverride();
  }

  /**
   * @returns {string}
   */
  getTooltip(): string {
    return this.helpService.getTooltipGame();
  }

  /**
   * startet ein neues Spiel und setzt die darunterliegenden Services zurück
   */
  restart(): void {
    this.gameOfLifeService.reset();
    this.enemy.reset();
    this.gameBoard = this.gameOfLifeService.initializeBoard(this.rowSize, this.rowSize);
    this.preperationBoard = this.gameOfLifeService.initializeBoard(this.rowSize,
      this.preperationColumnSize);
    this.preperationBoardEnemy = this.gameOfLifeService.initializeBoard(this.rowSize,
      this.preperationColumnSize);
    this.toast.open('GAME STARTED - LEVEL: ' + this.level, 'Undo', {duration: 3000});
  }

  /**
   * @param {number} level
   */
  setLevel(level: number): void {
    this.level = level;
    if (level === 3) {
      this.rowSize = 40;
      this.preperationColumnSize = 10;
      this.restart();
    } else {
      this.rowSize = 30;
      this.preperationColumnSize = 5;
      this.restart();
    }
  }

  /**
   * Generationsintervalle auf dem Spielfeld
   */
  startIntervalGameBoard(): void {
    this.interval = setInterval(
      () => {
        this.gameBoard = this.gameOfLifeService.getNextBoard(this.gameBoard, true, true);
      },
      200);
  }

  /**
   * Intervall um die Zellen vom Lager ins Spielfeld zu transferieren
   */
  startIntervalOverride(): void {
    this.interval2 = setInterval(
      () => {
        this.transferEnemyBoardToGameboard().then(() => this.transferPlayerBoardToGameboard());
      },
      10000);
  }

  /**
   * @returns {Promise<void>}
   */
  private async transferEnemyBoardToGameboard() {
    this.preperationBoardEnemy = await this.enemy.getBoard(this.level);
    this.preperationBoardEnemy.forEach((column, i) => {
        column.forEach((element, j) => {
          this.gameBoard[i][this.rowSize - (this.preperationColumnSize - j + 1)] =
            this.gameBoard[i][this.rowSize - (this.preperationColumnSize - j + 1)] || element;
        });
      }
    );
    this.preperationBoardEnemy = this.gameOfLifeService.initializeBoard(this.rowSize, this.preperationColumnSize);
  }

  /**
   */
  transferPlayerBoardToGameboard(): void {
    this.preperationBoard.forEach((column, i) => {
        column.forEach((element, j) => {
          this.gameBoard[i][j] = this.gameBoard[i][j] || element;
        });
      }
    );
    this.preperationBoard = this.gameOfLifeService.initializeBoard(this.rowSize, this.preperationColumnSize);
  }

  /**
   *  stoppt die definierten Intervalle
   */
  ngOnDestroy(): void {
    clearTimeout(this.interval);
    clearTimeout(this.interval2);
    this.toast.open('GAME LEAVED', 'Undo', {duration: 1000});

  }
}
