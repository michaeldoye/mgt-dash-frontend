import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '../../core/utils/loading.service';

@Component({
  selector: 'mtg-dash-card-sets',
  templateUrl: './card-sets.component.html',
  styleUrls: ['./card-sets.component.scss']
})
export class CardSetsComponent implements OnInit {

  @Input() set: any;
  public isActive: boolean;

  constructor(public loader: LoadingService) { }

  ngOnInit() {
  }

}
