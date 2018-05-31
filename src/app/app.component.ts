import {AfterViewInit, Component} from '@angular/core';
import {GameOfLifeService} from './services/game-of-life.service';
import {IconService} from './services/icon.service';
import {HelpService} from './services/help-service.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private iconService: IconService) {}
}
