import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../core/utils/firestore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {

  @Input() card: any;
  public isActive: boolean;

  public imgLoaded: boolean;
  public userDoc$: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private fs: FirestoreService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.userDoc$ = this.fs.userDecks(user.uid);
      }
    });
  }

  addToDeck(id: string, card: any) {
    this.fs.addToDeck(id, card);
  }

}
