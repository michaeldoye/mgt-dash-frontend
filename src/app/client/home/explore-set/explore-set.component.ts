import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ButtonOpts } from 'mat-progress-buttons';
import { routeAnimation, fadeInAnimation } from '../../../route.animation';
import { BackendService } from '../../../core/utils/backend.service';
import { FirestoreService } from '../../../core/utils/firestore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-dash-explore-set',
  templateUrl: './explore-set.component.html',
  styleUrls: ['./explore-set.component.scss'],
  animations: [routeAnimation, fadeInAnimation]
})
export class ExploreSetComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public cards$ = new BehaviorSubject(null);
  public query = '';
  public pageSize = 21;
  public page = 1;
  public selectedSet: string;
  public selectedCards = [];
  public isSelected: boolean;
  public fixedBar = false;

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

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY >= 128) {
      this.fixedBar = true;
    } else {
      this.fixedBar = false;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private api: BackendService,
    private fs: FirestoreService
  ) { }

  ngOnInit() {
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

  addToSelectedCards(card: any) {
    if (this.selectedCards.includes(card)) {
      this.selectedCards = this.selectedCards.filter(c => c !== card);
    } else {
      this.selectedCards.push(card);
    }
  }

  addSelectedCardsToDeck(deckId: string) {
    this.fs.batchAddCards(deckId, this.selectedCards).then(() => {
      this.selectedCards.map((card) => card.isSelected = false);
      this.selectedCards = [];
    });
  }

  createDeck() {
    this.fs.createDeck(this.selectedCards, true).then((result) => {
      if (!result) { return; }
      this.selectedCards.map((card) => card.isSelected = false);
      this.selectedCards = [];
    });
  }

}
