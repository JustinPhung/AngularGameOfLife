import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {container} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() gameBoard: boolean [][];
  @Input() clickable = true;
  @ViewChild('container') container: ElementRef;

  height = 800;

  constructor() {
  }

  ngOnInit() {
    console.log(this.container);
  }

  toggle(i: number, j: number): void {
    if (!this.clickable) {
      return;
    }
    this.gameBoard[i][j] = !this.gameBoard[i][j];
  }

  getCellStyle(columsCount: number, lives: boolean, i: number, j: number) {
    return {
      'width': ((this.height / columsCount) - 1) + 'px',
      'height': ((this.height / columsCount) - 1) + 'px',
      'background-color': lives ? '#5ec8ff' : 'white'
    };
  }
}
