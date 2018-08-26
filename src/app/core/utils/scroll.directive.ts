import { Directive, Output, EventEmitter, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs/';
// import 'rxjs/add/observable/fromEvent';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[scroll]'
})
export class ScrollEventDirective implements OnDestroy {
  @Output() scrollPosition: EventEmitter<number> = new EventEmitter<number>();

  private scrollEvent$;

  constructor(private el: ElementRef) {
    this.scrollEvent$ = fromEvent(this.el.nativeElement, 'scroll').subscribe((e: any) => {
      this.scrollPosition.emit(e.target.scrollTop);
    });
  }

  ngOnDestroy() {
    this.scrollEvent$.unsubscribe();
  }
}
