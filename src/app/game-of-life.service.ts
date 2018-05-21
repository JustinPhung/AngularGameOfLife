import {Injectable} from '@angular/core';

@Injectable()
export class GameOfLifeService {

  constructor() {
  }

  getNextBoard(board: boolean[][]) {
    const nextBoard = [];

    for (let i = 0; i < 8; i++) {
      nextBoard[i] = [];
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        nextBoard[i][j] = this.isAlive(board, i, j);
      }
    }
    return nextBoard;
  }

  isAlive(board: boolean[][], posX, posY) {

    let amountOfAliveNeighbours = 0;
    /*
    console.log(posX, this.getPredecessor(posY, board[0].length));
    console.log(this.getPredecessor(posX, board.length), this.getPredecessor(posY, board[0].length));
    console.log(this.getPredecessor(posX, board.length), posY);
    console.log(this.getPredecessor(posX, board.length), this.getPredecessor(posY, board[0].length));
    console.log(posX, this.getSuccessor(posY, board[0].length));
    console.log(this.getSuccessor(posX, board.length), this.getSuccessor(posY, board[0].length));
    console.log(this.getSuccessor(posX, board.length), posY );
    console.log(this.getSuccessor(posX, board.length), this.getSuccessor(posY, board[0].length));
    */

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

  getPredecessor(i: number, length: number): number {
    let result =  i;
    if (--i >= 0) {
      --result;
    } else {
      result = length - 1;
    }
    return result;
  }

  getSuccessor(i: number, length: number): number {
    let result =  i;
    if (++i < length) {
      ++result;
    } else {
      result = 0;
    }
    return result;
  }
}


