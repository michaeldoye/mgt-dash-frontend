import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private userDocRef: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private sb: MatSnackBar,
    private loader: LoadingService
  ) { }

  userDecks(uid: string): Observable<any> {
    const decks = this.afs.doc<any>(`users/${uid}`).collection('decks');
    return decks.snapshotChanges().pipe(
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
      .add(card)
      .then(() => { this.sb.open(
          `${card.name} Added added to deck ${deckId}!`, '',
          {duration: 5000, horizontalPosition: 'left'}
        );
        this.loader.isLoading.next(false);
      })
      .catch(error => { this.sb.open(
          `There was a problem adding the card; ${error}`, '',
          {duration: 5000, horizontalPosition: 'left'}
        );
        this.loader.isLoading.next(false);
      });
  }

  deckCards(uid: string, deckId: string): Observable<any> {
    const cards =  this.afs.doc<any>(`users/${uid}`)
      .collection('decks')
      .doc(deckId)
      .collection('cards');
    return cards.valueChanges();
  }
}
