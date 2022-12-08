import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { StatisticsService } from './services/statistics.service';
import { NgChartsModule } from 'ng2-charts';
import { ProfileSectionComponent } from './components/profile-section/profile-section.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginService } from '../login/services/login.service';
import { ProfileService } from './services/profile.service';
import { MatIconModule } from '@angular/material/icon';
import { EditDataDialogComponent } from './components/edit-data-dialog/edit-data-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChartComponent, ProfileSectionComponent, NavigationComponent, EditDataDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule,
    NgChartsModule,
    MatIconModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StatisticsService, LoginService, ProfileService],
})
export class ProfileModule { }
