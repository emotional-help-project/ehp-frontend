import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChartConfiguration, ChartOptions, ScatterDataPoint } from 'chart.js';
import { Statistics } from '../../models/statistics.interface';
import { StatisticsService } from '../../services/statistics.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  
  title = 'Emotion map';
  statistics: Statistics[];
  statistics$: Observable<Statistics[]>;
  testId: string;
  subscription: Subscription;
  public barChartLegend = true;
  public barChartPlugins = [];
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Test result',
        fill: true,
        tension: 0.5,
        borderColor: '#4bb0a9',
        backgroundColor: 'rgba(217, 190, 147, 0.5)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  constructor(
    private statisticsService: StatisticsService,
    private location: Location,
    private route: ActivatedRoute
    ) {
      this.testId = this.route.snapshot.paramMap.get('id') ?? '';
    // this.statistics = this.statisticsService.statistics.testResultStatistics
    this.statisticsService.loadOneTestStatistics(this.testId).subscribe(stat => this.statistics = stat)


    this.statistics.forEach(res => {
      this.lineChartData.labels?.push(res.testDateTime.slice(0, 10).split('-').reverse().join('.'));
      this.lineChartData.datasets.forEach(el => el.data.push(res.result))
    })
  }
  
  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id') ?? '';
    this.subscription = this.statisticsService.loadOneTestStatistics(this.testId).subscribe(map => {
      this.lineChartData.datasets[0].label = map.testTitle;

      map.testResultStatistics.forEach((el: any) => this.lineChartData.datasets[0].data.push(el.result));
      this.lineChartData.labels?.push(map.testDateTime.slice(0, 10).split('-').reverse().join('.'));
    })
  }

  goBack(): void {
    this.location.back();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
