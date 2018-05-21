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

  getCellStyle(rowsCount: number, row: boolean) {

    return {
      'width': ((window.innerHeight / rowsCount) - 1) + 'px',
      'height': ((window.innerHeight / rowsCount) - 1) + 'px',
      'background-color': row ? '#5ec8ff' : 'white'
    };
  }
}
