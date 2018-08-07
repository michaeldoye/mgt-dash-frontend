import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private online$: Observable<boolean>;
  private _isOnline: boolean;

  constructor() {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
    this.online$.subscribe(s => this._isOnline = s);    
  }

  public get isOnline(): boolean {
    return this._isOnline; 
  }
}
