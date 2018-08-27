import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../core/utils/firestore.service';
import { Observable } from 'rxjs';
import { MatMenu } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-deck-menu',
  templateUrl: './deck-menu.component.html',
  styleUrls: ['./deck-menu.component.scss'],
  exportAs: 'deckMenu'
})
export class DeckMenuComponent implements OnInit {
  @ViewChild(MatMenu) deckMenu: MatMenu;

  @Output() addToDeck = new EventEmitter();
  @Output() createDeck = new EventEmitter();

  public decks$: Observable<any>;

  constructor(private fs: FirestoreService) { }

  ngOnInit() {
    this.decks$ = this.fs.userDecks();
  }

  add(deckId: string) {
    this.addToDeck.emit(deckId);
  }

  create() {
    this.createDeck.emit();
  }
}
