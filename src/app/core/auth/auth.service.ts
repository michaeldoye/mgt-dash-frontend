import { Injectable, Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { LoadingService } from '../utils/loading.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private loading: LoadingService,
    private router: Router,
    private sb: MatSnackBar,
    public dialog: MatDialog,
    private afs: AngularFirestore
  ) { }

  public currentUser: string;

  public setCurrentUser(uid: string): void {
    this.currentUser = uid;
  }

  public get isLoggedIn(): string | null {
    return this.currentUser || null;
  }

  public emailSignUp(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => this.handleNewUser(user))
      .catch((error) => this.loginResultNotificaton(error));
  }

  public emailLogin(email: string, password: string): Promise<any> {
    this.loading.isLoading.next(true);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.handleLogin(user))
      .catch((error) => {
        this.loginResultNotificaton(error);
        // user is not found
        if (error.code === 'auth/user-not-found') {
          // prompt user to signup
          this.openDialog(email, password);
        }
      });
  }

  public googleLogin(): Promise<any> {
    return this.socialSignIn(new auth.GoogleAuthProvider());
  }

  public facebookLogin(): Promise<any> {
    return this.socialSignIn(new auth.FacebookAuthProvider());
  }

  public githubLogin(): Promise<any> {
    return this.socialSignIn(new auth.GithubAuthProvider());
  }

  public twitterLogin(): Promise<any> {
    return this.socialSignIn(new auth.TwitterAuthProvider());
  }

  public signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  private socialSignIn(provider: any): Promise<any> {
    this.loading.isLoading.next(true);
    return this.afAuth.auth.signInWithPopup(provider)
      .then((user) => this.handleLogin(user))
      .catch((error) => this.loginResultNotificaton(error));
  }

  private handleLogin(user: any) {
    if (user.uid !== null) {
      this.router.navigate(['/home']);
      this.loading.isLoading.next(false);
    }
  }

  private handleNewUser(user: any) {
    if (user.user.uid !== null) {
      // Create user doc
      const userDoc = this.afs.doc(`users/${user.user.uid}`);
      userDoc.set({email: user.user.email, id: user.user.uid})
        .then(() => {
          this.loginResultNotificaton(`Account crated with id: ${user.user.uid}`);
          this.loading.isLoading.next(false);
          this.router.navigate(['/home']);
        });
    }
  }

  private loginResultNotificaton(message: string) {
    this.loading.isLoading.next(false);
    this.sb.open(
      message,
      'OK',
      {duration: 7000, horizontalPosition: 'left'}
    );
  }

  openDialog(email: string, password: string): void {
    const dialogRef = this.dialog.open(ConfrimDialogComponent, {
      width: '400px',
      data: {email, password}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Create User signup
      if (result) {
        this.loading.isLoading.next(true);
        this.emailSignUp(email, password)
          .catch((signupError) => this.loginResultNotificaton(signupError));
      }
    });
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirm-dialog',
  template: `
  <h1 mat-dialog-title>Create Account?</h1>
  <div mat-dialog-content>
    <p>The details you entered do not exist;</p>
    <p>Would you like to create an account?</p>
  </div>
  <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="5px">
    <button mat-raised-button color="accent" (click)="onNoClick()">No Thanks</button>
    <button mat-raised-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>Ok</button>
  </div>
  `,
})
export class ConfrimDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfrimDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
