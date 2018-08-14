import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {

  @Input() card: any;
  public isActive: boolean;
  public imgLoaded: boolean;

  private userDocRef: AngularFirestoreCollection<any>;
  public userDoc$: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private sb: MatSnackBar
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.userDocRef = this.afs.doc<any>(`users/${user.uid}`).collection('decks');
        this.userDoc$ = this.userDocRef.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          })
        )
      }
    });
  }

  addToDeck(id: string, card: any) {
    this.userDocRef.doc(id)
      .collection('cards')
      .add(card)
      .then(() => {
        this.sb.open(
          'Card Added!',
          '',
          {duration: 5000, horizontalPosition: 'left'}
        );        
      })
      .catch(error => {
        this.sb.open(
          `There was a problem adding the card; ${error}`, 
          '',
          {duration: 5000, horizontalPosition: 'left'}
        )
      });
  }

}
