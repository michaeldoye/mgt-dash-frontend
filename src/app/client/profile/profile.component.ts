import { Component, OnInit, HostBinding } from '@angular/core';
import { routeAnimation } from '../../route.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routeAnimation]
})
export class ProfileComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
