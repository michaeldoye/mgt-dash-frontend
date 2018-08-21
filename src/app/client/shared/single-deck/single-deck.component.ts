import { Component, OnInit, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { routeAnimation } from '../../../route.animation';
import { FirestoreService } from '../../../core/utils/firestore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-deck',
  templateUrl: './single-deck.component.html',
  styleUrls: ['./single-deck.component.scss'],
  animations: [routeAnimation]
})
export class SingleDeckComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public deck$ = new BehaviorSubject(null);
  public deckName: string;

  constructor(
    private fs: FirestoreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.fs.setCurrentDeck(params.get('id'));
        this.deckName = params.get('name');
        return this.fs.deckCards(params.get('id'));
      })
    ).subscribe(data => this.deck$.next(data));
  }

}
