import {AfterContentChecked, AfterViewInit, Component} from '@angular/core';
import {GameOfLifeService} from './game-of-life.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  gameBoard: boolean[][];

  constructor(private gameOfLifeService: GameOfLifeService) {

    this.gameBoard = [];

    for (let i = 0; i < 8; i++) {
      this.gameBoard[i] = [];
      for (let j = 0; j < 8; j++) {
        this.gameBoard[i][j] = true;
      }
    }

  }

  ngAfterContentChecked(): void {
    setInterval(() => {
      this.gameBoard = this.gameOfLifeService.getNextBoard(this.gameBoard);
    }, 1000);
  }

}
