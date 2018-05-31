import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPlayerModeComponent } from './two-player-mode.component';

describe('TwoPlayerModeComponent', () => {
  let component: TwoPlayerModeComponent;
  let fixture: ComponentFixture<TwoPlayerModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoPlayerModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoPlayerModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
