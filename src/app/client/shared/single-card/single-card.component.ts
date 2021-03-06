import { Component, OnInit, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { slideAnimation, fadeInAnimation } from '../../../route.animation';
import { FirestoreService } from '../../../core/utils/firestore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
  animations: [slideAnimation, fadeInAnimation]
})
export class SingleCardComponent implements OnInit {
  @HostBinding('@slideAnimation') slideAnimation = true;

  @Input() card: any;
  @Output() cardClick = new EventEmitter();

  public isActive: boolean;
  public imgLoaded: boolean;
  public userDoc$: Observable<any>;
  public currentDeck: string;

  @HostListener('mouseover')
  markActive() {
    this.isActive = true;
  }

  @HostListener('mouseout')
  markInactive() {
    this.isActive = false;
  }

  constructor(private fs: FirestoreService) { }

  ngOnInit() {
    this.userDoc$ = this.fs.userDecks() || null;
    this.currentDeck = this.fs.currentDeck;
  }

  addToDeck(id: string, card: any) {
    this.fs.addToDeck(id, card);
  }

  createDeck(card: any) {
    this.fs.createDeck(card);
  }

  removeCard(cardId: string) {
    this.fs.removeCardFromDeck(this.fs.currentDeck, cardId);
  }

  setClicked() {
    this.cardClick.emit();
  }
}
