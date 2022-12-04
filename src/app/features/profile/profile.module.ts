import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { StatisticsService } from './services/statistics.service';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent
  },
];

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgChartsModule
  ],
  providers: [StatisticsService],
})
export class ProfileModule { }
