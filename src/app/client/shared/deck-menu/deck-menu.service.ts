import { Injectable } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DeckMenuService {
  public deckMenu: MatMenuTrigger;

  setDeckMenu(menu: MatMenuTrigger) {
    this.deckMenu = menu;
  }

  open() {
    this.deckMenu.openMenu();
  }
}
