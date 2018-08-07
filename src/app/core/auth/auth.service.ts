import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoadingService } from '../utils/loading.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private loading: LoadingService,
    private router: Router,
    private sb: MatSnackBar,
  ) { }

  public emailSignUp(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => this.handleNewUser(user))
      .catch((error) => this.loginResultNotificaton(error));
  }

  public emailLogin(email: string, password: string): Promise<any> {
    this.loading.isLoading.next(true);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.handleLogin(user))
      .catch((error) => this.loginResultNotificaton(error));
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
      this.router.navigate(['/']);
      this.loading.isLoading.next(false);
    }    
  }

  private handleNewUser(user: any) {
    console.log(user);
  }

  private loginResultNotificaton(message: string) {
    this.loading.isLoading.next(false);
    this.sb.open(
      message, 
      'OK', 
      {duration: 7000, horizontalPosition: 'left'}
    );    
  }
}