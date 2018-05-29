import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() gameBoard: boolean [][];
  @ViewChild('container') container: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  toggle(i: number, j: number): void {
    this.gameBoard[i][j] = !this.gameBoard[i][j];
  }

  getCellStyle(rowsCount: number, row: boolean) {

    return {
      'width': ((window.innerHeight / rowsCount) - 1) + 'px',
      'height': ((window.innerHeight / rowsCount) - 1) + 'px',
      'background-color': row ? '#5ec8ff' : 'white'
    };
  }
}
