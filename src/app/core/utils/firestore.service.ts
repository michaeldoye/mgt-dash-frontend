import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DeckDialogComponent } from '../../client/shared/add-to-deck-dialog/add-to-deck-dialog.component';

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
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  userDecks(): Observable<any> {
    const uid = this.authService.isLoggedIn;
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
    extesnibleCard.isSelected = false;
    this.loader.isLoading.next(true);
    return this.userDocRef.doc(deckId)
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

  deckCards(deckId: string): Observable<any> {
    const uid = this.authService.isLoggedIn;
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

  createDeck(card: any, multiple?: boolean): Promise<boolean> {
    const uid = this.authService.isLoggedIn;
    // TODO: prompt for login when no uid
    // TODO: add option for public decks
    if (!uid) { return; }
    this.loader.isLoading.next(true);
    return new Promise((resolve) => {
      this.dialog.open(DeckDialogComponent,  {width: '450px', data: card})
      .afterClosed().subscribe((deck) => {
        if (deck) {
          this.afs.doc<any>(`users/${uid}`)
            .collection('decks')
            .add({name: deck.name, dateAdded: new Date(), public: deck.public})
            .then(doc => {
              if (multiple) {
                this.batchAddCards(doc.id, card);
                resolve(true);
              } else {
                this.addToDeck(doc.id, card);
                resolve(true);
              }
            });
        } else {
          resolve(false);
          this.loader.isLoading.next(false);
        }
      });
    });
  }

  deleteDeck(deckId: string, deckName: string) {
    const uid = this.authService.isLoggedIn;
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
      extCard.isSelected = false;
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
