import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    <br />
    <br />
    <mat-checkbox matTooltip="Allow other users to see this deck" [(ngModel)]="isPublic">Public Deck</mat-checkbox>
    <p><em>{{card.name}}</em> will be added to your deck</p>
  </div>

  <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="5px">
    <button mat-raised-button color="warn" (click)="onNoClick()">Cancel</button>
    <button mat-raised-button color="primary" [disabled]="!deckName" [mat-dialog-close]="{name:deckName, public: isPublic}">Create</button>
  </div>
  `,
  styles: [`
    .full-width {width:100%}
  `]
})
export class DeckDialogComponent {

  deckName = '';
  isPublic = true;

  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public card: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
