import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { RoutingModule } from '../app.routing.module';
import { SearchPipe } from '../core/utils/search.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressButtons } from 'mat-progress-buttons';
import { CardDescriptionPipe } from '../core/utils/card-description.pipe';
import { NguCarouselModule } from '@ngu/carousel';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './profile/account/account.component';
import { UserDecksComponent } from './profile/user-decks/user-decks.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ExploreSetComponent } from './home/explore-set/explore-set.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FilterComponent } from './shared/filter/filter.component';
import { DeckDialogComponent } from './shared/add-to-deck-dialog/add-to-deck-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SingleCardComponent } from './shared/single-card/single-card.component';
import { CardSetsComponent } from './shared/card-sets/card-sets.component';
import { SingleDeckComponent } from './shared/single-deck/single-deck.component';
import { DeckMenuComponent } from './shared/deck-menu/deck-menu.component';

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
    ConfirmDialogComponent,
    UserDecksComponent,
    DeckMenuComponent
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
