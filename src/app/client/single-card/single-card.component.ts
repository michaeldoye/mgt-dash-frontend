import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

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

  private userDocRef: AngularFirestoreDocument<any>;
  public userDoc$: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.userDocRef = this.afs.doc<any>(`users/${user.uid}`);
        this.userDoc$ = this.userDocRef.valueChanges();
      }
    });
  }

  addToDeck(index: string, card: any) {

  }

}
