import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Statistics } from '../../models/statistics.interface';
import { StatisticsService } from '../../services/statistics.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  title = 'Statistics';

  public barChartLegend = true;
  public barChartPlugins = [];
  statistics: Statistics[];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Test result' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Test result',
        fill: true,
        tension: 0.5,
        borderColor: '#91d0cc',
        backgroundColor: 'rgba(217, 190, 147, 0.5)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  constructor(private statisticsService: StatisticsService) {
    this.statistics = this.statisticsService.statistics
    this.statistics.forEach(res => {
      this.barChartData.labels?.push(res.testDateTime.slice(0, 10).split('-').reverse().join('.'));
      this.barChartData.datasets.forEach(el => el.data.push(res.result))
    })
    this.statistics.forEach(res => {
      this.lineChartData.labels?.push(res.testDateTime.slice(0, 10).split('-').reverse().join('.'));
      this.lineChartData.datasets.forEach(el => el.data.push(res.result))
    })

  }
}
