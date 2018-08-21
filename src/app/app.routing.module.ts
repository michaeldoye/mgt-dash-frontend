import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { LoginPageComponent } from './client/login-page/login-page.component';
import { AdminAuthGuard } from './core/auth/admin-auth.guard';
import { ProfileComponent } from './client/profile/profile.component';
import { UserIdResolver } from './core/auth/uid-resolver.service';
import { AccountComponent } from './client/profile/account/account.component';
import { UserDecksComponent } from './client/profile/user-decks/user-decks.component';
import { DashboardComponent } from './client/home/dashboard/dashboard.component';
import { ExploreSetComponent } from './client/home/explore-set/explore-set.component';
import { SingleDeckComponent } from './client/shared/single-deck/single-deck.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: [UserIdResolver],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'explore/:set',
        component: ExploreSetComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'account',
    component: ProfileComponent,
    canActivate: [AdminAuthGuard],
    resolve: [UserIdResolver],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: AccountComponent
      },
      {
        path: 'deck/:id/:name',
        component: SingleDeckComponent
      },
      {
        path: 'decks',
        component: UserDecksComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
