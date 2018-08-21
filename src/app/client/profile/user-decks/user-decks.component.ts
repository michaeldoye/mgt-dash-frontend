import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { routeAnimation } from '../../../route.animation';
import { FirestoreService } from '../../../core/utils/firestore.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-user-decks',
  templateUrl: './user-decks.component.html',
  styleUrls: ['./user-decks.component.scss'],
  animations: [routeAnimation]
})
export class UserDecksComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public userDoc$: Observable<any>;
  private uid: string;

  constructor(
    public auth: AngularFireAuth,
    private fs: FirestoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userDoc$ = this.fs.userDecks();
  }

  deleteDeck(deckId: string, deckName: string) {
    this.dialog.open(ConfirmDialogComponent, {data: {name: deckName}})
      .afterClosed().subscribe(result => {
        if (result) {
          this.fs.deleteDeck(deckId, deckName);
        }
      });
  }

}
