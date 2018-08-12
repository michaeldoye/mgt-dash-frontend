import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

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

}
