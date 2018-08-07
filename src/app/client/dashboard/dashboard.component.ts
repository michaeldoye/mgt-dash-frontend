import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../../route.animation';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { BackendService } from '../../core/utils/backend.service';

@Component({
  selector: 'ngxtemplate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [flyInOut]
})
export class DashboardComponent implements OnInit {

  public sets$: Observable<ApolloQueryResult<any>>;
  public sortBy: string = 'releaseDate';
  public query: string = '';
  public sortOptions = [
    {name: "Name", value: "name"},
    {name: "Type", value: "type"},
    {name: "Code", value: "code"},
    {name: "Release Date", value: "releaseDate"},
  ];

  constructor(private api: BackendService) {}

  ngOnInit(): void {
    this.fetchSets(this.sortBy);
  }

  fetchSets(filter: string) {
    if (filter) {
      this.sets$ = this.api.getSets(filter);
    }
  }
}
