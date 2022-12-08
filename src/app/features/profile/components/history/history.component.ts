import { Component, OnInit } from '@angular/core';
import { History } from '../../models/history.interface';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  
  history: History[];

  constructor(private statisticsService: StatisticsService) {

  }

  ngOnInit(): void {
    this.history = this.statisticsService.hisrory;
  }
}

