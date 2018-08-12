import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { LoginPageComponent } from './client/login-page/login-page.component';
import { AdminAuthGuard } from './core/auth/admin-auth.guard';
import { ExploreSetComponent } from './client/explore-set/explore-set.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { AccountComponent } from './client/account/account.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AdminAuthGuard],
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
    component: AccountComponent,
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
