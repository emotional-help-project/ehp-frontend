import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Statistics } from '../../models/statistics.interface';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  
  title = 'Emotion map';
  statistics$: Observable<Statistics[]>;
  testId: string;
  public barChartLegend = true;
  // public lineChartData: Observable<any>;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['29.11.22', '30.11.22', '30.11.22', '01.12.22', '10.12.22', '13.12.22'],
    datasets: [
      {
        data: [17, 13, 12, 10, 10, 8],
        label: 'Depression Test',
        fill: true,
        tension: 0.5,
        borderColor: '#91d0cc',
        backgroundColor: 'rgba(217, 190, 147, 0.5)'
      }
    ]
  };

  constructor(
    private statisticsService: StatisticsService,
    private location: Location,
    private route: ActivatedRoute,
    ) {}
  
  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id') ?? '';
    // this.lineChartData = this.statisticsService.loadOneTestStatistics(this.testId).pipe(map(res => res));
  }

  goBack(): void {
    this.location.back();
  }
  
}
