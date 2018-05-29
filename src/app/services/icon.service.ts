import { Injectable } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'play',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/play.svg'));
      iconRegistry.addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/pencil-alt.svg'));
      iconRegistry.addSvgIcon(
        'help',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/question-circle.svg'));
  }
}
