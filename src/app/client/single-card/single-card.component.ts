import { Component, OnInit, Input, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../core/utils/firestore.service';
import { slideAnimation } from '../../route.animation';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
  host: {'[@slideAnimation]': 'true'},
  animations: [slideAnimation]  
})
export class SingleCardComponent implements OnInit {

  @Input() card: any;
  public isActive: boolean;

  public imgLoaded: boolean;
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

  addToDeck(id: string, card: any) {
    this.fs.addToDeck(id, card);
  }

  createDeck(card: any) {
    this.dialog.open(DeckDialogComponent, {width: '450px', data: card})
      .afterClosed().subscribe(deck => {
        if (deck) {
          this.fs.createDeck(this.uid, deck);
        }
      });
  }

}



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-deck-dialog',
  template: `
  <h1 mat-dialog-title>Create a new deck</h1>
  <div mat-dialog-content>
    <mat-form-field class="full-width">
      <input #name [(ngModel)]="deckName" maxlength="30" matInput placeholder="Deck Name" value="My cool deck" required cdkFocusInitial>
      <button mat-button *ngIf="deckName" matSuffix mat-icon-button aria-label="Clear" (click)="deckName=''">
        <mat-icon>close</mat-icon>
      </button>
      <mat-hint align="start"><strong>Give your new deck a name</strong></mat-hint>
      <mat-hint align="end">{{name.value.length}} / 30</mat-hint>
      <mat-error *ngIf="!deckName">
        This is <strong>required</strong>
      </mat-error>          
    </mat-form-field>  
    <p><em>{{card.name}}</em> will be added to your deck</p>
  </div>

  <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="5px">
    <button mat-raised-button color="warn" (click)="onNoClick()">Cancel</button>
    <button mat-raised-button color="primary" [disabled]="!deckName" [mat-dialog-close]="{name: deckName, card: card}">Create</button>
  </div>
  `,
  styles: [`
    .full-width {width:100%}
  `]
})
export class DeckDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public card: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}