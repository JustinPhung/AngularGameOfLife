import { TestBed, inject } from '@angular/core/testing';

import { GameOfLifeService } from './game-of-life.service';

describe('GameOfLifeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameOfLifeService]
    });
  });

  it('should be created', inject([GameOfLifeService], (service: GameOfLifeService) => {
    expect(service).toBeTruthy();
  }));
});
