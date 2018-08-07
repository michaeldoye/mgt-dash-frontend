import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RoutingModule } from '../app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CardSetsComponent } from './card-sets/card-sets.component';
import { FilterComponent } from './filter/filter.component';
import { ExploreSetComponent } from './explore-set/explore-set.component';
import { SearchPipe } from '../core/utils/search.pipe';
import { SingleCardComponent } from './single-card/single-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { MatProgressButtons } from 'mat-progress-buttons';
import { CardDescriptionPipe } from '../core/utils/card-description.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SatPopoverModule ,
    RoutingModule,
    InfiniteScrollModule,
    MatProgressButtons
  ],
  declarations: [
    HomeComponent,
    LoginPageComponent,
    SidenavComponent,
    DashboardComponent,
    ToolbarComponent,
    CardSetsComponent,
    FilterComponent,
    SearchPipe,
    ExploreSetComponent,
    SingleCardComponent,
    CardDescriptionPipe
  ],
  providers: [
    AngularFireAuth,
  ],
  exports: [
    HomeComponent,
    LoginPageComponent,
    SidenavComponent,
    ToolbarComponent
  ]
})
export class ClientModule { }
