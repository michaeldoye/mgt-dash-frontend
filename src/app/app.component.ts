import { Component } from '@angular/core';
import { NetworkService } from './core/utils/network.service';
import { WorkerService } from './core/utils/worker.service';
import { ThemeService } from './core/utils/theme.service';
import { fadeInOut } from './route.animation';
import { LoadingService } from './core/utils/loading.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngxtemplate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut]
})
export class AppComponent {

  public title = 'MTGdash';

  constructor(
    public theme: ThemeService,
    public network: NetworkService,
    public loader: LoadingService,
    private sw: WorkerService) {

      // check the service worker for updates
      this.sw.checkForUpdates();
  }
}
