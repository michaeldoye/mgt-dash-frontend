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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressButtons } from 'mat-progress-buttons';
import { CardDescriptionPipe } from '../core/utils/card-description.pipe';
import { NguCarouselModule } from '@ngu/carousel';
import { AccountComponent } from './account/account.component';
import { SingleDeckComponent } from './single-deck/single-deck.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DeckDialogComponent } from './add-to-deck-dialog/add-to-deck-dialog.component';

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
    MatProgressButtons,
    NguCarouselModule
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
    CardDescriptionPipe,
    AccountComponent,
    SingleDeckComponent,
    ProfileComponent,
    DeckDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [
    AngularFireAuth,
  ],
  entryComponents: [
    DeckDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    HomeComponent,
    LoginPageComponent,
    SidenavComponent,
    ToolbarComponent
  ]
})
export class ClientModule { }
