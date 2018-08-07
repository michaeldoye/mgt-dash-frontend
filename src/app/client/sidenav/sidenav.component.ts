import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../core/utils/theme.service';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'ngxtemplate-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    public theme: ThemeService,
    public sv: SidenavService
  ) { }

  public ngOnInit(): void {
    // Store sidenav to service
    this.sv.setSidenav(this.sidenav);
  }

}
