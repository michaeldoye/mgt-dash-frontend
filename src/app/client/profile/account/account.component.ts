import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { routeAnimation } from '../../../route.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [routeAnimation]
})
export class AccountComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(
    public auth: AngularFireAuth,
  ) { }

  ngOnInit() { }


}
