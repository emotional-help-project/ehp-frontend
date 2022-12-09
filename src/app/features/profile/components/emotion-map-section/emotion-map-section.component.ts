import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PassedTest } from '../../models/passedTest.interface';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-emotion-map-section',
  templateUrl: './emotion-map-section.component.html',
  styleUrls: ['./emotion-map-section.component.scss']
})
export class EmotionMapSectionComponent implements OnInit {
  tests: PassedTest[];
  tests$: Observable<PassedTest[]>;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.tests = this.statisticsService.passedTestList;
    this.tests$ = this.statisticsService.passedTestList$.pipe(map(res => res));
  }

  addBackgraund(url: string) {
    return `linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${url})`;
  }
}
