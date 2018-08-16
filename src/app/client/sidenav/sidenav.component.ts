import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../core/utils/theme.service';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';
import { CdkDragDrop, CdkDrop } from '@angular/cdk-experimental/drag-drop';
import { DragService } from '../../core/utils/drag.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngxtemplate-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  @ViewChild('parent') public parent: CdkDrop;
  public connectedChild: CdkDrop[];  

  constructor(
    public theme: ThemeService,
    public sv: SidenavService,
    private dragService: DragService
  ) { }

  ngOnInit(): void {
    // Store sidenav to service
    this.sv.setSidenav(this.sidenav);

    // Set the parent connector for the drag service
    this.dragService.setParentConnector(this.parent);
    this.connectedChild = [this.dragService.childConnector];    
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log('from parent', event.previousContainer.data[event.previousIndex]);
  }
}
