import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, take } from 'rxjs/operators';
import { LoadingService } from '../utils/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private rt: Router,
    private sb: MatSnackBar,
    public auth: AngularFireAuth,
    private loader: LoadingService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.loader.isLoading.next(true);

      return this.auth.authState.pipe(map((auth) => {
        if (!auth) {
          this.rt.navigate(['/login']);
          this.noAccessNotificaton();
          this.loader.isLoading.next(false);
          return false;
        }
        this.loader.isLoading.next(false);
        return true;
      }),
      take(1)
    );
  }

  noAccessNotificaton() {
    this.sb.open(
      'Error; You do not have permission to access this page',
      '',
      {duration: 7000, horizontalPosition: 'left'}
    );
  }

}
