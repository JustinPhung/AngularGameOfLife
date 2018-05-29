import { Injectable } from '@angular/core';

@Injectable()
export class HelpService {

  constructor() { }

  getTooltip() {
    return 'Im Edit Modus können die einzelnen Kacheln angeklickt werden.' +
      ' Eine Kachel steht dabei für eine Zelle.' +
      ' Durch das Anklicken wechselt die Zelle ihren Zustand.';
  }
}
