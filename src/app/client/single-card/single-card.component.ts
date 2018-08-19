import { Component, OnInit, Input, Inject, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../core/utils/firestore.service';
import { slideAnimation } from '../../route.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
  animations: [slideAnimation]
})
export class SingleCardComponent implements OnInit {
  @HostBinding('@slideAnimation') slideAnimation = true;

  @Input() card: any;
  public isActive: boolean;
  public imgLoaded: boolean;
  public userDoc$: Observable<any>;
  private uid: string;
  public currentDeck: string;
  public selected = false;

  constructor(
    public auth: AngularFireAuth,
    private fs: FirestoreService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.userDoc$ = this.fs.userDecks(user.uid);
      }
    });
    this.currentDeck = this.fs.currentDeck;
  }

  addToDeck(id: string, card: any) {
    this.fs.addToDeck(id, card);
  }

  createDeck(card: any) {
    this.fs.createDeck(this.uid, card);
  }

  removeCard(cardId: string) {
    this.fs.removeCardFromDeck(this.fs.currentDeck, cardId);
  }
}
