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

  constructor(
    private afs: AngularFirestore,
    private sb: MatSnackBar,
    private loader: LoadingService
  ) { }

  private userDocRef: AngularFirestoreCollection<any>;

  userDecks(uid: string): Observable<any> {
    this.userDocRef = this.afs.doc<any>(`users/${uid}`).collection('decks');
    return this.userDocRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )    
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
        )
        this.loader.isLoading.next(false);
      });    
  }
}
