import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { StatisticsService } from './services/statistics.service';
import { NgChartsModule } from 'ng2-charts';
import { ProfileSectionComponent } from './components/profile-section/profile-section.component';
import { AuthGuard } from '../login/services/auth.guard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginService } from '../login/services/login.service';
import { ProfileService } from './services/profile.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'password',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    component: ChartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'advices',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'links',
    component: ProfileSectionComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [ChartComponent, ProfileSectionComponent, NavigationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgChartsModule
  ],
  providers: [StatisticsService, LoginService, ProfileService],
})
export class ProfileModule { }
