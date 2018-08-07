import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {FormControl } from '@angular/forms';
import { slideAnimation, preventInitial, spinInOut } from '../../route.animation';

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'mtg-dash-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [ slideAnimation, spinInOut, preventInitial ]
})
export class FilterComponent implements OnInit {

  @Input() sortOptions: any[];
  @Output() onFilterChange = new EventEmitter<string>();
  @Output() onSearchChange = new EventEmitter<string>();
  public showFilters: boolean = false;
  public sortBy = new FormControl('');
  public searchQuery = new FormControl('');

  constructor() {}

  ngOnInit() {
  }

}
