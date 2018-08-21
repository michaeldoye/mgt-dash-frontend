import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {FormControl } from '@angular/forms';
import { slideAnimation, spinInOut, preventInitial } from '../../../route.animation';

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [ slideAnimation, spinInOut, preventInitial ]
})
export class FilterComponent implements OnInit {

  @Input() sortOptions: any[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilterChange = new EventEmitter<string>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearchChange = new EventEmitter<string>();
  public showFilters = false;
  public sortBy = new FormControl('');
  public searchQuery = new FormControl('');

  constructor() {}

  ngOnInit() {
  }

}
