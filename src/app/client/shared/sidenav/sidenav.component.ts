import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../core/utils/theme.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngxtemplate-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    public theme: ThemeService,
    public sv: SidenavService,
  ) { }

  ngOnInit(): void {
    // Store sidenav to service
    this.sv.setSidenav(this.sidenav);
  }
}
