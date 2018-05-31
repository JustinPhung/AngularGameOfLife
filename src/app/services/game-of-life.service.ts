import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GameOfLifeService {

  counterRight = 0;
  counterLeft = 0;

  /**
   * @param {MatSnackBar} toast
   * @param {HttpClient} http
   */
  constructor(private toast: MatSnackBar, private http: HttpClient) {
  }

  /**
   *
   * @param {boolean[][]} board
   * @param {boolean} isRunning - ist das Spiel von aussen angehlaten worden?
   * @param {boolean} isGame
   * @returns {any} die nächste Generation der Zellen
   */
  getNextBoard(board: boolean[][], isRunning: boolean, isGame = false) {
    if (!isRunning) {
      return board;
    }

    const nextBoard = [];

    for (let i = 0; i < board.length; i++) {
      nextBoard[i] = [];
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        nextBoard[i][j] = this.isAlive(board, i, j);

        if (isGame && j === board[i].length - 1 && nextBoard[i][j]) {
          this.handleGoalReached(nextBoard, i, j);
        }
        if (isGame && j === 0 && nextBoard[i][j]) {
          this.handleLostPoint(nextBoard, i, j);
        }
      }
    }
    return nextBoard;
  }

  /**
   * @param {number} i
   * @param {number} length
   * @returns {number}
   */
  getPredecessor(i: number, length: number): number {
    let result = i;
    if (--i >= 0) {
      --result;
    } else {
      result = length - 1;
    }
    return result;
  }

  /**
   * @param {number} i
   * @param {number} length
   * @returns {number}
   */
  getSuccessor(i: number, length: number): number {
    let result = i;
    if (++i < length) {
      ++result;
    } else {
      result = 0;
    }
    return result;
  }

  /**
   *  initalisiert ein sog. Board aus X*Y Zellen
   *
   * @param {number} rowSize
   * @param {number} columnSize
   * @returns {boolean[][]}
   */
  initializeBoard(rowSize: number, columnSize: number): boolean[][] {
    const gameBoard = [];

    for (let i = 0; i < rowSize; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < columnSize; j++) {
        gameBoard[i][j] = false;
      }
    }
    return gameBoard;
  }

  /**
   * @param {any[]} nextBoard
   * @param {number} i
   * @param {number} j
   */
  private handleGoalReached(nextBoard: any[], i: number, j: number) {
    nextBoard[i][j] = false;
    this.counterRight++;
    if (this.counterRight === 3) {
      this.reset();
      this.toast.open('Du hast gewonnen!', 'Undo', {duration: 2000});
    }
  }

  /**
   * @param {any[]} nextBoard
   * @param {number} i
   * @param {number} j
   */
  private handleLostPoint(nextBoard: any[], i: number, j: number) {
    nextBoard[i][j] = false;
    this.counterLeft++;
    if (this.counterLeft === 3) {
      this.reset();
      this.toast.open('Du hast verloren!', 'Undo', {duration: 2000});
    }
  }

  /**
   *  überprüft die nachbarn einer Zelle
   *
   * @param {boolean[][]} board
   * @param posX
   * @param posY
   * @returns {boolean} den Lebenszustand
   */
  isAlive(board: boolean[][], posX, posY) {

    let amountOfAliveNeighbours = 0;

    amountOfAliveNeighbours += board[posX][this.getPredecessor(posY, board[0].length)] ? 1 : 0;
    amountOfAliveNeighbours += board[this.getPredecessor(posX, board.length)][this.getPredecessor(posY, board[0].length)] ? 1 : 0;
    amountOfAliveNeighbours += board[this.getPredecessor(posX, board.length)][posY] ? 1 : 0;
    amountOfAliveNeighbours += board[this.getPredecessor(posX, board.length)][this.getSuccessor(posY, board[0].length)] ? 1 : 0;
    amountOfAliveNeighbours += board[posX][this.getSuccessor(posY, board[0].length)] ? 1 : 0;
    amountOfAliveNeighbours += board[this.getSuccessor(posX, board.length)][this.getSuccessor(posY, board[0].length)] ? 1 : 0;
    amountOfAliveNeighbours += board[this.getSuccessor(posX, board.length)][posY] ? 1 : 0;
    amountOfAliveNeighbours += board[this.getSuccessor(posX, board.length)][this.getPredecessor(posY, board[0].length)] ? 1 : 0;

    return (board [posX][posY] && amountOfAliveNeighbours === 2) || amountOfAliveNeighbours === 3;
  }

  /**
   *
   * @param {string} filePath
   * @returns {Promise<boolean[][]>}
   */
  async readFileRelative(filePath: string) {
    return new Promise<boolean[][]>((resolve, reject) => {
      this.http.get(filePath, {responseType: 'text'}).subscribe(data => {
        resolve(this.stringToBoolArray(data, reject));
      });
    });
  }

  /**
   *
   * @param file
   * @returns {Promise<boolean[][]>}
   */
  async readFileToGameBoard(file: any): Promise<boolean[][]> {
    return new Promise<boolean[][]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Reading line by line
        const gameBoard = this.stringToBoolArray((<FileReader>event.target).result, reject);
        resolve(gameBoard);
      };

      reader.readAsText(file);
    });
  }

  /**
   *
   * @param {string | any} data
   * @param reject
   * @returns {any[]}
   */
  private stringToBoolArray(data: string | any, reject) {
    const allLines = data.split(/\r\n|\n/);
    const gameBoard = [];
    let rowSize;
    allLines.map((line, index) => {
      const row = line.split('').reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue !== '0');
      }, []);

      if (row.length > 0) {
        gameBoard[index] = row;

        if (rowSize && row.length !== rowSize) {
          reject('Zeilenlänge stimmmen nicht überein');
        }
      }
      rowSize = row.length;
    });
    return gameBoard;
  }

  /**
   */
  reset(): void {
    this.counterRight = 0;
    this.counterLeft = 0;
  }
}


