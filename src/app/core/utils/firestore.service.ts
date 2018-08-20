import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { DeckDialogComponent } from '../../client/add-to-deck-dialog/add-to-deck-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private userDocRef: AngularFirestoreCollection<any>;
  public currentDeck: string;

  constructor(
    private afs: AngularFirestore,
    private sb: MatSnackBar,
    private loader: LoadingService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  userDecks(uid: string): Observable<any> {
    this.userDocRef = this.afs.doc<any>(`users/${uid}`).collection('decks');
    return this.userDocRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addToDeck(deckId: string, card: any) {
    const extesnibleCard = Object.assign({}, card);
    extesnibleCard.canRemove = true;
    this.loader.isLoading.next(true);
    this.userDocRef.doc(deckId)
      .collection('cards')
      .add(extesnibleCard).then(() => {
        this.successSnackBar(card.name, deckId);
        this.loader.isLoading.next(false);
      }).catch(error => {
        this.sb.open(
          `There was a problem adding the card; ${error}`, '',
          {duration: 5000, horizontalPosition: 'left'}
        );
        this.loader.isLoading.next(false);
      });
  }

  deckCards(uid: string, deckId: string): Observable<any> {
    const cards = this.afs.doc<any>(`users/${uid}`).collection('decks');
    return cards.doc(deckId).collection('cards').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  createDeck(uid: string, card: any) {
    this.loader.isLoading.next(true);
    this.dialog.open(
      DeckDialogComponent,
      {width: '450px', data: card}).afterClosed().subscribe((deckName) => {
      if (deckName) {
        this.afs.doc<any>(`users/${uid}`)
          .collection('decks')
          .add({name: deckName})
          .then(doc => this.addToDeck(doc.id, card));
      }
    });
  }

  deleteDeck(uid: string, deckId: string, deckName: string) {
    this.loader.isLoading.next(true);
    return this.afs.doc<any>(`users/${uid}`)
      .collection('decks')
      .doc(deckId).delete().then(() => {
        this.loader.isLoading.next(false);
        this.sb.open(`Deck ${deckName} Permanently Deleted;`, 'OK',
          {duration: 5000, horizontalPosition: 'left'});
      });
  }

  successSnackBar(cardName: string, deckId: string) {
    this.sb.open(
      `${cardName} Added;`, 'View Deck',
      {duration: 10000, horizontalPosition: 'left'}
    ).onAction().subscribe(() => {
      this.router.navigate(['account/deck', deckId]);
    });
  }

  batchAddCards(deckId: string, cards: any[]) {
    this.loader.isLoading.next(true);
    const deck = this.userDocRef.doc(deckId);
    const batch = this.afs.firestore.batch();
    cards.forEach(card => {
      const extCard = Object.assign({}, card);
      extCard.canRemove = true;
      const deckCards = deck.collection('cards');
      deckCards.add(extCard);
    });
    return batch.commit().then(() => {
      this.loader.isLoading.next(false);
      this.successSnackBar(`${cards.length} Cards`, deckId);
    });
  }

  removeCardFromDeck(deckId: string, cardId: string) {
    return this.userDocRef.doc(deckId)
      .collection('cards')
      .doc(cardId)
      .delete().then(() => {
        this.sb.open(`${cardId} Removed From Deck;`, 'OK',
          {duration: 5000, horizontalPosition: 'left'});
      });
  }

  setCurrentDeck(deck: string) {
    this.currentDeck = deck;
  }
}
