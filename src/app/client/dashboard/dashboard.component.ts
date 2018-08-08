import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../../route.animation';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { BackendService } from '../../core/utils/backend.service';
import { NguCarousel } from '@ngu/carousel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngxtemplate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [flyInOut]
})
export class DashboardComponent implements OnInit {

  public sets$: Observable<ApolloQueryResult<any>>;
  public sortBy = 'releaseDate';
  public onHover = false;
  public query = '';
  public sortOptions = [
    {name: 'Name', value: 'name'},
    {name: 'Type', value: 'type'},
    {name: 'Code', value: 'code'},
    {name: 'Release Date', value: 'releaseDate'},
  ];
  public carouselOne: NguCarousel;

  constructor(private api: BackendService) {}

  ngOnInit(): void {
    this.fetchSets(this.sortBy);
    this.carouselOne = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
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
    }
  }
}
