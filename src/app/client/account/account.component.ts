import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../core/utils/firestore.service';
import { routeAnimation } from '../../route.animation';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  host: {'[@routeAnimation]': 'true'},
  animations: [routeAnimation]
})
export class AccountComponent implements OnInit {

  public userDoc$: Observable<any>;
  private uid: string;

  constructor(
    public auth: AngularFireAuth,
    private fs: FirestoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.userDoc$ = this.fs.userDecks(user.uid);
      }
    });
  }

  deleteDeck(deckId: string, deckName: string) {
    // use confirm dialog
    this.dialog.open(ConfirmDialogComponent, {data: {name: deckName}})
      .afterClosed().subscribe(result => {
        if (result) {
          this.fs.deleteDeck(this.uid, deckId, deckName);
        }
      })
  }

}
