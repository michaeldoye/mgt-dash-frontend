import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../core/utils/firestore.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { routeAnimation } from '../../route.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-deck',
  templateUrl: './single-deck.component.html',
  styleUrls: ['./single-deck.component.scss'],
  host: {'[@routeAnimation]': 'true'},
  animations: [routeAnimation]
})
export class SingleDeckComponent implements OnInit {

  public deck$ = new BehaviorSubject(null);

  constructor(
    private fs: FirestoreService,
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.route.paramMap.pipe(
          switchMap((params: ParamMap) => {
            return this.fs.deckCards(user.uid, params.get('id'));
          })
        ).subscribe(data => this.deck$.next(data));
      }
    });
  }

}
