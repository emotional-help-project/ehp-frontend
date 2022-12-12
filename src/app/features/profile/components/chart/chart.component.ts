import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChartOptions } from 'chart.js';
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
  public lineChartData: Observable<any>;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor(
    private statisticsService: StatisticsService,
    private location: Location,
    private route: ActivatedRoute,
    ) {}
  
  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id') ?? '';
    this.lineChartData = this.statisticsService.loadOneTestStatistics(this.testId).pipe(map(res => res));
  }

  goBack(): void {
    this.location.back();
  }
  
}
