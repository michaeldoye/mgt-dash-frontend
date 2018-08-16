import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BackendService } from '../../core/utils/backend.service';
import { ButtonOpts } from 'mat-progress-buttons';
import {
  CdkDragDrop,
  CdkDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk-experimental/drag-drop';
import { SidenavService } from '../sidenav/sidenav.service';
import { DragService } from '../../core/utils/drag.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-explore-set',
  templateUrl: './explore-set.component.html',
  styleUrls: ['./explore-set.component.scss']
})
export class ExploreSetComponent implements OnInit {

  @ViewChild('child') child: CdkDrop;
  public connectedParent: CdkDrop[];

  public cards$ = new BehaviorSubject(null);
  public query = '';
  public pageSize = 21;
  public page = 1;
  public selectedSet: string;

  public sortOptions = [
    {name: 'Name', value: 'name'},
    {name: 'Type', value: 'type'},
    {name: 'Rarity', value: 'rarity'},
    {name: 'Power', value: 'power'},
    {name: 'Toughness', value: 'toughness'},
  ];

  public btnOpts: ButtonOpts = {
    active: false,
    text: 'Load More',
    spinnerSize: 18,
    raised: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(
    private route: ActivatedRoute,
    private api: BackendService,
    private nav: SidenavService,
    private dragService: DragService
  ) { }

  ngOnInit() {
    this.dragService.setChildConnector(this.child);
    this.connectedParent = [this.dragService.parentConnector];

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedSet = params.get('set');
        return this.api.getCardsBySetName(params.get('set'), this.pageSize, this.page);
      })
    ).subscribe(data => this.cards$.next(data.data.cardsBySet));
  }

  loadMore() {
    this.page++;
    this.btnOpts.active = true;
    this.api.getCardsBySetName(this.selectedSet, this.pageSize, this.page)
      .subscribe(data => this.addToCardsArray(data));
  }

  addToCardsArray(data: any) {
    const newCards = data.data.cardsBySet.cardData;
    if (newCards.length > 0) {
      const currentCards = this.cards$.getValue()['cardData'];
      this.cards$.next({
        cardData: currentCards.concat(newCards),
        setData: data.data.cardsBySet.setData,
      });

    } else {
      this.btnOpts.text = 'No more to show';
      this.btnOpts.disabled = true;
    }
    this.btnOpts.active = false;
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log('from child', event);
    this.nav.close();
    // this.dragService.drop(event);
  }

  onDragStart(event) {
    this.nav.open();
  }
}
