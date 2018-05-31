import { Injectable } from '@angular/core';

@Injectable()
export class HelpService {

  constructor() { }

  /**
   * Tooltip für die Game-of-life Seite
   * @returns {string}
   */
  getTooltip() {
    return 'Im Edit Modus können die einzelnen Kacheln angeklickt werden.' +
      ' Eine Kachel steht dabei für eine Zelle.' +
      ' Durch das Anklicken wechselt die Zelle ihren Zustand.';
  }

  /**
   * Tooltip für das Spiel
   */
  getTooltipGame() {
    return 'Ziel des Spiels ist 3 Zellen bis zum generischen Lager zu bringen.' +
      ' In deinem Lager kannst du Zellen zusammenstellen, ' +
      'die alle 10 Sekunden auf die ersten Felder des Spielfeldes übertragen werden. #Convay\'sDame';
  }
}
