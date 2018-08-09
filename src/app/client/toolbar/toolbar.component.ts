import { Component, Input } from '@angular/core';
import { ThemeService } from '../../core/utils/theme.service';
import { SidenavService } from '../sidenav/sidenav.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { spinInOut, preventInitial } from '../../route.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngxtemplate-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [spinInOut, preventInitial]
})
export class ToolbarComponent {

  @Input() appTitle: string;

  constructor(
    public theme: ThemeService,
    public sidenav: SidenavService,
    public auth: AngularFireAuth
  ) { }

}
