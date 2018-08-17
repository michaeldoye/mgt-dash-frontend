import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private userDocRef: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private sb: MatSnackBar,
    private loader: LoadingService,
    private router: Router
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
    this.loader.isLoading.next(true);
    this.userDocRef.doc(deckId)
      .collection('cards')
      .add(card).then(() => { 
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
    const cards = this.afs.doc<any>(`users/${uid}`)
      .collection('decks')
      .doc(deckId)
      .collection('cards');
    return cards.valueChanges();
  }

  createDeck(uid: string, deck: any) {
    this.loader.isLoading.next(true);
    return this.afs.doc<any>(`users/${uid}`)
      .collection('decks')
      .add({name: deck.name})
      .then(doc => this.addToDeck(doc.id, deck.card));
  }

  deleteDeck(uid: string, deckId: string, deckName: string) {
    this.loader.isLoading.next(true);
    return this.afs.doc<any>(`users/${uid}`)
      .collection('decks')
      .doc(deckId)
      .delete().then(() => {
        this.loader.isLoading.next(false);
        this.sb.open(`Deck ${deckName} Permanently Deleted;`, 'OK', 
          {duration: 5000, horizontalPosition: 'left'})
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
}
