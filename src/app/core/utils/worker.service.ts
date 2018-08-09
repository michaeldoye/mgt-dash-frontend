import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(public updates: SwUpdate, public snackBar: MatSnackBar) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates() {
    this.updates.available.subscribe(event => this.promptUser(event));
  }

  private promptUser(e): void {
    const snackBarRef = this.snackBar.open(
      'A new version is available',
      'Refresh',
      {horizontalPosition: 'left'}
    );
    snackBarRef.onAction().subscribe(() =>
      this.updates.activateUpdate().then(() => document.location.reload()));
  }
}
