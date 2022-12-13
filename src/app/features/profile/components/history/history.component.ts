import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { History } from '../../models/history.interface';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent  {
  
  history$: Observable<History[]>;
  history: History[];

  constructor(private statisticsService: StatisticsService) {
    this.history = this.statisticsService.hisrory
  }

  // ngOnInit(): void {
  //   this.history$ = this.statisticsService.loadHistory().pipe(map(res => res));
  // }
}

