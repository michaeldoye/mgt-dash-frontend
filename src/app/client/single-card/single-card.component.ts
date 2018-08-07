import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mtg-dash-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {

  @Input() card: any;
  public isActive: boolean;
  public imgLoaded: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
