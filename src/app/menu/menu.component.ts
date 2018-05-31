import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayName = 'Game of life';

  constructor() {
  }

  ngOnInit() {
  }

  changeName(event): void {
    this.displayName = event.path[0].text;
  }


}
