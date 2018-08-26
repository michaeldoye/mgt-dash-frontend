import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIdResolver implements Resolve<boolean> {
  constructor(
    private auth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(map((user) => {
      if (user) {
        this.authService.setCurrentUser(user.uid);
        return true;
      }
      this.authService.setCurrentUser(null);
      return false;
    }),
    take(1));
  }
}
