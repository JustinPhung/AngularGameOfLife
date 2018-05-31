import {Injectable} from '@angular/core';
import {GameOfLifeService} from './game-of-life.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  private isFirst = true;

  constructor(private gameOfLifeService: GameOfLifeService) {
  }

  /**
   *  Das Lager wird in Abhängigkeit vom Level mit eines der untern Dateien vorbefüllt.
   *
   * @param {number} level
   * @returns {Promise<boolean[][]>}
   */
  async getBoard(level: number): Promise<boolean[][]> {
    switch (level) {
      case 2:
        return await this.gameOfLifeService.readFileRelative('assets/boardFiles/level2.txt');
      case 3:
        if (this.isFirst) {
          this.isFirst = false;
          return await this.gameOfLifeService.readFileRelative('assets/boardFiles/level3.txt');
        } else {
          return await this.gameOfLifeService.readFileRelative('assets/boardFiles/level3_2.txt');
        }
      default:
        return await this.gameOfLifeService.readFileRelative('assets/boardFiles/level1.txt');
    }
  }

  reset(): void {
    this.isFirst = true;
  }
}
