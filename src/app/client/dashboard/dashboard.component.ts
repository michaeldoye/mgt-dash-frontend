import { Component, OnInit } from '@angular/core';
import { flyInOut, slideAnimation } from '../../route.animation';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { BackendService } from '../../core/utils/backend.service';
import { NguCarousel } from '@ngu/carousel';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngxtemplate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [flyInOut, slideAnimation]
})
export class DashboardComponent implements OnInit {

  public sets$: Observable<ApolloQueryResult<any>>;
  public sortBy = 'releaseDate';
  public carouselOne: NguCarousel;
  public latestSetCards$: Observable<ApolloQueryResult<any>>;
  public newsFeed$:  Observable<ApolloQueryResult<any>>;

  constructor(private api: BackendService, public auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.fetchSets(this.sortBy);
    this.carouselOne = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 5,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false,
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner',
      easing: 'ease'
    };
  }

  myfunc(event: Event) {
    console.log('e', event);
  }

  fetchSets(filter: string) {
    if (filter) {
      this.sets$ = this.api.getSets(filter);
      this.latestSetCards$ = this.api.getCardsBySetName('m19', 20, 1);
      this.newsFeed$ = this.api.getNewsFeed();
    }
  }
}
